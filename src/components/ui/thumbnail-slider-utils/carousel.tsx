import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import { cn } from "@/lib/utils";

// Helpers for the 21st.dev thumbnail slider (the original utils file was not supplied):
// a main Embla slider kept in sync with a strip of thumbnails, plus prev/next arrows.
// Each <Slider> registers its thumbnail so <ThumbsSlider> can render the strip.

type CarouselContextValue = {
  mainRef: ReturnType<typeof useEmblaCarousel>[0];
  thumbsRef: ReturnType<typeof useEmblaCarousel>[0];
  mainApi: EmblaCarouselType | undefined;
  selectedIndex: number;
  thumbnails: { src: string; alt: string }[];
  onThumbClick: (index: number) => void;
  /** Pauses autoplay while the visitor hovers, focuses or views the full-size image. */
  setPaused: (paused: boolean) => void;
};

const CarouselContext = React.createContext<CarouselContextValue | null>(null);

function useCarouselContext() {
  const context = React.useContext(CarouselContext);
  if (!context) throw new Error("Slider components must be used inside <Carousel />");
  return context;
}

export function Carousel({
  options,
  className,
  children,
  label = "Image gallery",
  autoplayMs = 0,
}: {
  options?: EmblaOptionsType;
  className?: string;
  children: React.ReactNode;
  label?: string;
  /** Advance to the next slide every N ms (0 = off); wraps back to the first slide. */
  autoplayMs?: number;
}) {
  const [mainRef, mainApi] = useEmblaCarousel(options);
  const [paused, setPaused] = React.useState(false);
  const [thumbsRef, thumbsApi] = useEmblaCarousel({ containScroll: "keepSnaps", dragFree: true });
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  // Thumbnails come from the <Slider> children, in order.
  const thumbnails = React.useMemo(() => {
    const list: { src: string; alt: string }[] = [];
    React.Children.forEach(children, (child) => {
      if (!React.isValidElement(child)) return;
      React.Children.forEach((child.props as { children?: React.ReactNode }).children, (slide) => {
        if (React.isValidElement(slide)) {
          const props = slide.props as { thumbnailSrc?: string; thumbnailAlt?: string };
          if (props.thumbnailSrc) list.push({ src: props.thumbnailSrc, alt: props.thumbnailAlt ?? "" });
        }
      });
    });
    return list;
  }, [children]);

  const onThumbClick = React.useCallback((index: number) => mainApi?.scrollTo(index), [mainApi]);

  React.useEffect(() => {
    if (!mainApi) return;
    const onSelect = () => {
      const index = mainApi.selectedScrollSnap();
      setSelectedIndex(index);
      thumbsApi?.scrollTo(index);
    };
    onSelect();
    mainApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      mainApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [mainApi, thumbsApi]);

  // Autoplay: skipped for reduced motion, paused on hover/focus/lightbox and in hidden tabs.
  React.useEffect(() => {
    if (!mainApi || !autoplayMs || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      if (document.hidden) return;
      if (mainApi.canScrollNext()) mainApi.scrollNext();
      else mainApi.scrollTo(0);
    }, autoplayMs);
    return () => window.clearInterval(timer);
  }, [mainApi, autoplayMs, paused, selectedIndex]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      mainApi?.scrollPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      mainApi?.scrollNext();
    }
  };

  return (
    <CarouselContext.Provider value={{ mainRef, thumbsRef, mainApi, selectedIndex, thumbnails, onThumbClick, setPaused }}>
      <div
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        onKeyDownCapture={onKeyDown}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

export function SliderContainer({ className, children }: { className?: string; children: React.ReactNode }) {
  const { mainRef, mainApi, selectedIndex, thumbnails } = useCarouselContext();
  const count = thumbnails.length || React.Children.count(children);
  return (
    <div className="relative">
      <div ref={mainRef} className="overflow-hidden rounded-[var(--ui-radius-xl)]">
        <div className={cn("flex touch-pan-y", className)}>{children}</div>
      </div>
      <SliderArrow direction="prev" disabled={selectedIndex === 0} onClick={() => mainApi?.scrollPrev()} />
      <SliderArrow direction="next" disabled={selectedIndex >= count - 1} onClick={() => mainApi?.scrollNext()} />
      {/* One string, not mixed text and expressions: the build strips HTML comments, which
          React relies on to split adjacent text nodes when hydrating. */}
      <p className="sr-only" aria-live="polite">
        {`Slide ${selectedIndex + 1} of ${count}`}
      </p>
    </div>
  );
}

function SliderArrow({ direction, disabled, onClick }: { direction: "prev" | "next"; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous image" : "Next image"}
      className={cn(
        "absolute top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-surface/90 text-brand-primary shadow-lg shadow-black/15 backdrop-blur transition-[opacity,background-color,color] hover:bg-brand-primary hover:text-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary disabled:pointer-events-none disabled:opacity-0 motion-reduce:transition-none",
        direction === "prev" ? "left-3" : "right-3",
      )}
    >
      <i className={cn("ph text-xl", direction === "prev" ? "ph-caret-left" : "ph-caret-right")} aria-hidden="true"></i>
    </button>
  );
}

export function Slider({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
  /** Image shown for this slide in the thumbnail strip. */
  thumbnailSrc?: string;
  thumbnailAlt?: string;
}) {
  return (
    <div className={cn("min-w-0 shrink-0 grow-0 basis-full", className)} role="group" aria-roledescription="slide">
      {children}
    </div>
  );
}

export function ThumbsSlider({ className, thumbsClassName }: { className?: string; thumbsClassName?: string }) {
  const { thumbsRef, selectedIndex, thumbnails, onThumbClick } = useCarouselContext();
  return (
    <div ref={thumbsRef} className={cn("mt-3 overflow-hidden", className)}>
      <div className="flex gap-2">
        {thumbnails.map((thumb, index) => (
          <button
            key={`${thumb.src}-${index}`}
            type="button"
            onClick={() => onThumbClick(index)}
            aria-label={`Show image ${index + 1}${thumb.alt ? `: ${thumb.alt}` : ""}`}
            aria-current={index === selectedIndex ? "true" : undefined}
            className={cn(
              "relative min-w-0 shrink-0 grow-0 overflow-hidden rounded-[var(--ui-radius-md)] border-2 transition-[opacity,border-color] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary motion-reduce:transition-none",
              index === selectedIndex ? "border-brand-primary opacity-100" : "border-transparent opacity-60 hover:opacity-100",
              thumbsClassName,
            )}
          >
            <img src={thumb.src} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

/** Full-screen view of the gallery images, opened from the main slide. Uses a native <dialog>
    so focus is trapped and Escape closes it; arrows and keys step through the same images. */
export function Lightbox({
  images,
  index,
  onIndexChange,
  onClose,
}: {
  images: { src: string; alt: string }[];
  index: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}) {
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const open = index !== null;

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const step = (delta: number) => {
    if (index === null) return;
    onIndexChange((index + delta + images.length) % images.length);
  };

  const image = index !== null ? images[index] : undefined;

  return (
    <dialog
      ref={dialogRef}
      aria-label={image?.alt || "Image viewer"}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") step(-1);
        if (event.key === "ArrowRight") step(1);
      }}
      className="m-0 h-dvh max-h-none w-screen max-w-none border-0 bg-[rgb(12_8_10/0.94)] p-0 backdrop:bg-transparent"
    >
      {image && (
        <div className="pointer-events-none flex h-full w-full flex-col items-center justify-center gap-4 p-4 sm:p-10">
          <img src={image.src} alt={image.alt} className="pointer-events-auto max-h-[82dvh] max-w-full rounded-[var(--ui-radius-lg)] object-contain shadow-2xl" />
          <p className="m-0 text-sm text-white/80">{`${index! + 1} / ${images.length}`}{image.alt ? ` · ${image.alt}` : ""}</p>
        </div>
      )}
      <button type="button" onClick={onClose} aria-label="Close image viewer" className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white/15 text-2xl text-white transition-colors hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-white">
        <i className="ph ph-x" aria-hidden="true"></i>
      </button>
      {images.length > 1 && (
        <>
          <button type="button" onClick={() => step(-1)} aria-label="Previous image" className="absolute left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-xl text-white transition-colors hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-white sm:left-6">
            <i className="ph ph-caret-left" aria-hidden="true"></i>
          </button>
          <button type="button" onClick={() => step(1)} aria-label="Next image" className="absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-xl text-white transition-colors hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-white sm:right-6">
            <i className="ph ph-caret-right" aria-hidden="true"></i>
          </button>
        </>
      )}
    </dialog>
  );
}

export { useCarouselContext };
