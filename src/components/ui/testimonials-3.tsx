import type * as React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Adapted from 21st.dev "testimonials-3": testimonials come in as props (one set per
// business page), the photo is optional with initials as the fallback, and colours use
// the site's brand tokens so each page's theme (blue or bakery orange) carries through.
// It reuses the project's existing Base UI avatar instead of the Radix version.

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  image?: string;
};

function DecorIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute top-0 left-0 z-[1] size-3.5 shrink-0 -translate-x-[calc(50%+0.5px)] -translate-y-[calc(50%+0.5px)] stroke-1 text-brand-primary",
        className,
      )}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function QuoteIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
    </svg>
  );
}

export function TestimonialsSection({
  testimonials,
  className,
}: {
  testimonials: Testimonial[];
  className?: string;
}) {
  return (
    // Bottom padding leaves room for the staggered cards on tablet and desktop.
    <div className={cn("mx-auto grid w-full max-w-5xl gap-8 md:grid-cols-3 md:gap-6 md:pb-24", className)}>
      {testimonials.map((testimonial, index) => (
        <TestimonialCard index={index} key={`${testimonial.name}-${index}`} testimonial={testimonial} />
      ))}
    </div>
  );
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

function TestimonialCard({
  testimonial,
  index,
  className,
  ...props
}: React.ComponentProps<"figure"> & {
  testimonial: Testimonial;
  index: number;
}) {
  const { quote, name, role, company, image } = testimonial;

  return (
    <figure
      className={cn(
        "group relative flex flex-col justify-between gap-6 bg-surface px-8 pt-8 pb-6 shadow-xs md:translate-y-[calc(3rem*var(--t-card-index))]",
        className,
      )}
      style={{ "--t-card-index": index } as React.CSSProperties}
      {...props}
    >
      <div className="absolute -inset-y-4 -left-px w-px bg-outline-variant" />
      <div className="absolute -inset-y-4 -right-px w-px bg-outline-variant" />
      <div className="absolute -inset-x-4 -top-px h-px bg-outline-variant" />
      <div className="absolute -right-4 -bottom-px -left-4 h-px bg-outline-variant" />
      <DecorIcon />

      <blockquote className="m-0 flex gap-4">
        <QuoteIcon aria-hidden="true" className="size-6 shrink-0 stroke-1 text-brand-primary" />
        <p className="m-0 flex-1 text-base leading-relaxed text-brand-dark/75">{quote}</p>
      </blockquote>

      <figcaption className="flex items-center gap-3">
        <Avatar className="size-10 rounded-full ring-2 ring-outline-variant ring-offset-2 ring-offset-surface transition-shadow group-hover:ring-brand-primary/40">
          {image && <AvatarImage alt={`${name}'s profile picture`} src={image} />}
          <AvatarFallback className="bg-brand-primary/10 text-sm font-semibold text-brand-primary">{getInitials(name)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <cite className="text-sm font-semibold not-italic text-brand-dark">{name}</cite>
          <p className="m-0 text-xs text-brand-dark/65">
            {role}, <span className="text-brand-dark/85">{company}</span>
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

export default TestimonialsSection;
