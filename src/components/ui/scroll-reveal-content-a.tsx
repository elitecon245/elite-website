import React from "react"
import { useRef } from "react"
import { cn } from "@/lib/utils"
import { useMotionValueEvent, useScroll } from "framer-motion"

// Adapted from 21st.dev "scroll-reveal-content-a": next/image is replaced with a plain
// <img> (this is an Astro site), motion comes from the installed framer-motion package,
// and colours/fonts use the site's brand tokens so the block follows each page's theme.

export const centralColumnStyle = "w-full max-w-[1340px] mx-auto"
const defaultTitleClass = "font-heading text-xl md:text-2xl lg:text-3xl font-semibold mb-2 text-brand-dark"
const defaultDescriptionClass = "text-base md:text-lg mb-2 text-brand-dark/80 max-w-[420px] leading-[140%]"
const imageClass =
  "absolute inset-0 h-full w-full object-cover rounded-[var(--ui-radius-xl)] transition-opacity duration-500 motion-reduce:transition-none"

export interface ItemContent {
  title: string
  description: string
  image: {
    url: string
    width: number
    height: number
    alt: string
    /** CSS object-position, so differently shaped photos keep their subject in the shared frame. */
    position?: string
  }
}

interface Props extends React.ComponentProps<"div"> {
  contentA: ItemContent
  contentB: ItemContent
  contentC: ItemContent
  titleClass?: string
  descriptionClass?: string
}

const ScrollRevealContentA = ({
  contentA,
  contentB,
  contentC,
  titleClass = defaultTitleClass,
  descriptionClass = defaultDescriptionClass,
  className,
  ...props
}: Props) => {
  const [scrollProgress, setScrollProgress] = React.useState(0)
  const ref0 = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref0,
  })
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(latest)
  })

  const items = [contentA, contentB, contentC]
  // Index of the step being read; on small screens only its description is shown so all three fit.
  const currentIndex = Math.min(items.length - 1, Math.floor(scrollProgress * items.length))
  const renderImages = () =>
    items.map((item, index) => (
      <img
        key={item.image.url}
        width={item.image.width}
        height={item.image.height}
        src={item.image.url}
        alt={item.image.alt}
        loading="lazy"
        decoding="async"
        style={item.image.position ? { objectPosition: item.image.position } : undefined}
        className={cn(imageClass, index === 0 || scrollProgress > index / 3 ? "opacity-100" : "opacity-0")}
      />
    ))

  return (
    <div className={cn("relative", className)} ref={ref0} {...props}>
      <div className="flex w-full mx-auto relative z-20">
        {/* The sticky panel clears the floating site header so the image never sits under it. */}
        <div
          className={cn(
            centralColumnStyle,
            "sticky top-0 flex h-[100svh] w-full flex-col items-start justify-center pt-[calc(var(--site-header-height,5.75rem)+1rem)] pb-8",
          )}
        >
          <div className="flex h-full w-full flex-col gap-6 lg:flex-row lg:gap-20 xl:gap-28">
            {/* Phones and tablets: the active image sits above the steps instead of beside them. */}
            <div className="relative h-[clamp(8rem,26svh,16rem)] w-full shrink-0 md:h-[38svh] md:max-h-[26rem] lg:hidden">{renderImages()}</div>
            <div className="flex h-auto w-full flex-col justify-center gap-5 md:gap-8 lg:w-1/2 lg:gap-10">
              {items.map((item, index) => (
                <PointItem
                  key={item.title}
                  number={String(index + 1).padStart(2, "0")}
                  title={item.title}
                  description={item.description}
                  thresholdStart={index / 3}
                  thresholdEnd={(index + 1) / 3}
                  scrollProgress={scrollProgress}
                  isCurrent={index === currentIndex}
                  titleClass={titleClass}
                  descriptionClass={descriptionClass}
                />
              ))}
            </div>
            <div className="relative hidden h-full flex-col items-center justify-center lg:flex lg:w-1/2">{renderImages()}</div>
          </div>
        </div>
        <div className="h-[300vh] shrink-0" aria-hidden="true" />
      </div>
    </div>
  )
}

export default ScrollRevealContentA

const getBarPercentageHeight = (scrollProgress: number, thresholdStart: number, thresholdEnd: number) => {
  if (scrollProgress < thresholdStart) {
    return 0
  }
  if (scrollProgress > thresholdEnd) {
    return 100
  }
  return ((scrollProgress - thresholdStart) / (thresholdEnd - thresholdStart)) * 100
}

const PointItem = ({
  number,
  title,
  description,
  thresholdStart,
  thresholdEnd,
  scrollProgress,
  isCurrent,
  titleClass,
  descriptionClass,
}: {
  number: string
  title: string
  description: string
  thresholdStart: number
  thresholdEnd: number
  scrollProgress: number
  isCurrent: boolean
  titleClass: string
  descriptionClass: string
}) => {
  const barHeightPercentage = getBarPercentageHeight(scrollProgress, thresholdStart, thresholdEnd)
  // The first step starts active so the section never opens fully dimmed.
  const isActive = thresholdStart === 0 || barHeightPercentage > 0
  return (
    <div className="flex w-full flex-col">
      <p
        className={cn(
          "mb-3 ml-5 text-sm font-bold tracking-[0.14em] text-brand-primary transition-opacity duration-300",
          isActive ? "opacity-100" : "opacity-40",
        )}
      >
        {number}
      </p>
      <div className="relative left-[16px] flex w-full">
        <div className="relative flex w-[40px] shrink-0 items-start justify-center" aria-hidden="true">
          <div className="absolute top-0 left-1/2 h-full w-[2px] -translate-x-1/2 bg-brand-dark/10" />
          <div
            className="absolute top-0 left-1/2 w-[2px] -translate-x-1/2 bg-brand-primary"
            style={{ height: `${barHeightPercentage}%` }}
          />
        </div>
        <div className="min-w-0 pl-4 pr-6">
          <div className="flex flex-col gap-1">
            <h3 className={cn(titleClass, "transition-opacity duration-300", isActive ? "opacity-100" : "opacity-40")}>{title}</h3>
            <p className={cn(descriptionClass, "transition-opacity duration-300", isActive ? "opacity-100" : "opacity-40", !isCurrent && "hidden lg:block")}>{description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
