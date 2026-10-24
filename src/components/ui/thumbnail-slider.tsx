import * as React from "react";
import { Carousel, Lightbox, Slider, SliderContainer, ThumbsSlider, useCarouselContext } from "@/components/ui/thumbnail-slider-utils/carousel";
import type { EmblaOptionsType } from "embla-carousel";

// Adapted from 21st.dev "thumbnail-slider": the slides come in as props instead of being
// hard-coded, images get real alt text, and styling uses the site's brand tokens. It plays
// slowly on its own and the main image opens a full-screen viewer.

export type ThumbnailSlide = {
  src: string;
  thumbnailSrc?: string;
  alt: string;
  width: number;
  height: number;
};

/** Main-slide image as a button that opens the viewer and pauses autoplay meanwhile. */
function SlideImage({ slide, index, onOpen }: { slide: ThumbnailSlide; index: number; onOpen: (index: number) => void }) {
  const { setPaused } = useCarouselContext();
  return (
    <button
      type="button"
      onClick={() => {
        setPaused(true);
        onOpen(index);
      }}
      aria-label={`View larger: ${slide.alt}`}
      className="group block h-full w-full cursor-zoom-in overflow-hidden rounded-[var(--ui-radius-xl)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
    >
      <img
        src={slide.src}
        width={slide.width}
        height={slide.height}
        alt=""
        loading={index < 2 ? "eager" : "lazy"}
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] motion-reduce:transition-none"
      />
    </button>
  );
}

function ViewerBridge({ slides, openIndex, setOpenIndex }: { slides: ThumbnailSlide[]; openIndex: number | null; setOpenIndex: (index: number | null) => void }) {
  const { mainApi, setPaused } = useCarouselContext();
  return (
    <Lightbox
      images={slides}
      index={openIndex}
      onIndexChange={(index) => {
        setOpenIndex(index);
        mainApi?.scrollTo(index, true);
      }}
      onClose={() => {
        setOpenIndex(null);
        setPaused(false);
      }}
    />
  );
}

function ThumbnailSlider({ slides, label, autoplayMs = 5000 }: { slides: ThumbnailSlide[]; label?: string; autoplayMs?: number }) {
  // A higher Embla duration makes each slide change glide more slowly.
  const OPTIONS: EmblaOptionsType = { loop: false, duration: 55 };
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  return (
    <div className="mx-auto w-full">
      <Carousel options={OPTIONS} className="relative" label={label} autoplayMs={autoplayMs}>
        <SliderContainer className="gap-2">
          {slides.map((slide, index) => (
            <Slider
              key={slide.src}
              className="h-[300px] w-full sm:h-[420px] xl:h-[560px]"
              thumbnailSrc={slide.thumbnailSrc ?? slide.src}
              thumbnailAlt={slide.alt}
            >
              <SlideImage slide={slide} index={index} onOpen={setOpenIndex} />
            </Slider>
          ))}
        </SliderContainer>
        <ThumbsSlider className="px-1 pb-1" thumbsClassName="basis-[30%] h-20 sm:basis-[18%] sm:h-24 lg:basis-[14%]" />
        <ViewerBridge slides={slides} openIndex={openIndex} setOpenIndex={setOpenIndex} />
      </Carousel>
    </div>
  );
}

export default ThumbnailSlider;
