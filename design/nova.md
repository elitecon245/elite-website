---
name: Nova, Elite Consolidated Business
colors:
  surface: "#ffffff"
  surface-dim: "#f3f4f8"
  surface-bright: "#ffffff"
  surface-container-lowest: "#ffffff"
  surface-container-low: "#f6f7fa"
  surface-container: "#eceef4"
  surface-container-high: "#dcdfe8"
  surface-container-highest: "#b4b8c7"
  on-surface: "#20223a"
  on-surface-variant: "#5c5f74"
  outline: "#b4b8c7"
  outline-variant: "#dcdfe8"
  surface-tint: "#1800ad"
  primary: "#1800ad"
  accent: "#8a84ff"
  on-primary: "#ffffff"
  primary-container: "#e6e4ff"
  on-primary-container: "#1800ad"
  secondary: "#5c5f74"
  on-secondary: "#ffffff"
  secondary-container: "#f3f4f8"
  on-secondary-container: "#20223a"
  tertiary: "#8a84ff"
  on-tertiary: "#20223a"
  tertiary-container: "#e6e4ff"
  on-tertiary-container: "#1800ad"
  error: "#b42318"
  on-error: "#ffffff"
  error-container: "#fddbd7"
  on-error-container: "#641b16"
  success: "#2f6b4f"
  on-success: "#ffffff"
  success-container: "#dcefe4"
  on-success-container: "#173d2b"
  warning: "#9a621b"
  on-warning: "#ffffff"
  warning-container: "#f8e7c8"
  on-warning-container: "#59370d"
  info: "#285b77"
  on-info: "#ffffff"
  info-container: "#dcecf4"
  on-info-container: "#17394b"
  background: "#ffffff"
  on-background: "#20223a"
  brand-primary: "#1800ad"
  brand-accent: "#8a84ff"
  brand-dark: "#20223a"
  brand-light: "#ffffff"
  brand-cream: "#f3f4f8"
typography:
  display:
    fontFamily: Satoshi, sans-serif
    fontSize: 64px
    fontWeight: "700"
    lineHeight: 0.96
    letterSpacing: -0.065em
  headline:
    fontFamily: Satoshi, sans-serif
    fontSize: 42px
    fontWeight: "700"
    lineHeight: 0.98
    letterSpacing: -0.055em
  title:
    fontFamily: Satoshi, sans-serif
    fontSize: 20px
    fontWeight: "700"
    lineHeight: 1.3
  body:
    fontFamily: Satoshi, sans-serif
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 1.65
  label:
    fontFamily: Satoshi, sans-serif
    fontSize: 11px
    fontWeight: "600"
    lineHeight: 1.2
    letterSpacing: 0.18em
rounded:
  sm: 0.5rem
  DEFAULT: 0.75rem
  md: 1rem
  lg: 1.5rem
  xl: 2rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 32px
  xl: 64px
  container-px: "clamp(1rem, 4vw, 4rem)"
  section-py: "clamp(4rem, 8vw, 7.5rem)"
elevation:
  soft: "0 14px 40px -24px rgb(32 34 58 / 0.28)"
  strong: "0 28px 80px -32px rgb(32 34 58 / 0.38)"
ui:
  text-on-light: "#20223a"
  text-on-light-subtle: "rgba(32, 34, 58, 0.66)"
  text-on-dark: "#ffffff"
  text-on-dark-subtle: "rgba(255, 255, 255, 0.7)"
  type-lead-tracking: "-0.01em"
  type-lead-leading: "1.55"
  type-body-leading: "1.65"
  type-heading-tracking: "-0.065em"
  button-radius: "9999px"
  button-hover-effect: "lift"
  bg-base: "var(--color-brand-cream)"
  bg-page: "var(--color-brand-light)"
  bg-surface: "var(--color-surface)"
  bg-accent: "var(--color-brand-accent)"
fonts:
  sans: "Satoshi, sans-serif"
  heading: "Satoshi, sans-serif"
animations:
  scroll: "scroll 36s linear infinite"
---

# Nova, Visual Direction

This Nova profile is branded for Elite Consolidated Business Nig Ltd. The site should feel modern, corporate, approachable and trustworthy. Clear hierarchy, strong imagery and controlled contrast are the priorities.

## Composition Principles

- Keep the main background white and light grey, with subtle tonal changes between sections.
- Use dark navy (`brand-dark`) for text, navigation and the closing call to action, and the logo blue (`brand-primary`, #1800AD) for primary buttons and key highlights.
- Use the light brand-blue accent sparingly for icons, hover states and highlights on dark backgrounds.
- Cards should have soft corners, thin borders and generous internal space.
- Break the regular grid with a large image, 2+1 proportions and wide content bands.
- Keep motion calm: section reveals, subtle image zoom and scrolling logos without pulsing effects.

## Homepage Order

1. Floating navigation over a light hero.
2. Hero with a large headline, portrait, two CTAs and four metrics.
3. Trust bar with logos.
4. Bento portfolio with two main projects and one wider frame.
5. Four services in cards with simple icons.
6. Team section with an image and a list of benefits.
7. Dark CTA with a mountain photograph as the strong closing section.
8. Minimal footer on a dark background.

## Photography

Nova production assets live in `public/assets/images/t001-nova/`. The source reference is kept in Templar documentation and is not used as a production image. Every asset should have alt text, and images must keep the proportions expected by the component.

## Main Constraints

- Do not use purple gradients, arbitrary badges or decorative dots.
- Do not make sections dense with too many cards or evenly repeated columns.
- Do not add new fonts from a CDN. Use `Outfit` for headings and `Satoshi` for body text.
- Do not apply colors directly in components. Colors must come from the `nova` profile tokens.
