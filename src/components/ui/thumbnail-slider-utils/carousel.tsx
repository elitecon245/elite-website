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
}: {
  options?: EmblaOptionsType;
  className?: string;
  children: React.ReactNode;
  label?: string;
}) {
  const [mainRef, mainApi] = useEmblaCarousel(options);
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
    <CarouselContext.Provider value={{ mainRef, thumbsRef, mainApi, selectedIndex, thumbnails, onThumbClick }}>
      <div className={cn("relative", className)} role="region" aria-roledescription="carousel" aria-label={label} onKeyDownCapture={onKeyDown}>
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
