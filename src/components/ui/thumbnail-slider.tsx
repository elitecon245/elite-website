import { Carousel, Slider, SliderContainer, ThumbsSlider } from "@/components/ui/thumbnail-slider-utils/carousel";
import type { EmblaOptionsType } from "embla-carousel";

// Adapted from 21st.dev "thumbnail-slider": the slides come in as props instead of being
// hard-coded, images get real alt text, and styling uses the site's brand tokens.

export type ThumbnailSlide = {
  src: string;
  thumbnailSrc?: string;
  alt: string;
  width: number;
  height: number;
};

function ThumbnailSlider({ slides, label }: { slides: ThumbnailSlide[]; label?: string }) {
  const OPTIONS: EmblaOptionsType = { loop: false };
  return (
    <div className="mx-auto w-full">
      <Carousel options={OPTIONS} className="relative" label={label}>
        <SliderContainer className="gap-2">
          {slides.map((slide) => (
            <Slider
              key={slide.src}
              className="h-[300px] w-full sm:h-[420px] xl:h-[560px]"
              thumbnailSrc={slide.thumbnailSrc ?? slide.src}
              thumbnailAlt={slide.alt}
            >
              <img
                src={slide.src}
                width={slide.width}
                height={slide.height}
                alt={slide.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full rounded-[var(--ui-radius-xl)] object-cover"
              />
            </Slider>
          ))}
        </SliderContainer>
        <ThumbsSlider className="px-1 pb-1" thumbsClassName="basis-[30%] h-20 sm:basis-[18%] sm:h-24 lg:basis-[14%]" />
      </Carousel>
    </div>
  );
}

export default ThumbnailSlider;
