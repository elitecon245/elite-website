# Elite Consolidated, content guide

This site is the one-page Nova template rebranded for Elite Consolidated Business Nig Ltd and its three businesses: Starling Bottle and Pure Water Factory (Abijo and Bogije), Royal Retreat Bakery, and Elite Royal Suite and Hotel.

## Content rules

- Only publish facts the company has confirmed. Do not invent addresses, phone numbers, statistics, testimonials, staff or history.
- Keep one clear H1 on the homepage.
- Keep CTA labels action-oriented.
- Keep internal URLs with trailing slashes. Homepage anchors use the `/#section` form so they also work from the legal pages.
- Replace the brand graphics for the bakery and hotel with real, licensed photography when it is available.

## Where content lives

- Homepage copy: the `en` object in `src/data/i18n/nova.json` (navigation, sections and footer).
- Section defaults: `src/data/sections/nova-*.json` and `faq3.json` mirror the English copy.
- Company details, logo and subsidiaries: `src/data/global/company.json`. Empty contact fields are hidden on the site and in the structured data.
- SEO defaults and indexing: `src/data/global/seo.json`. Indexing is disabled (`"index": false`) until launch.
- Domain and build scope: `site.config.mjs`.
- Colours: `design/nova.md`, then run `npm run design:sync`.
- Images: put source files in `src/assets/raw/elite/` and run `npm run assets:img`.

## Business pages

Each business has its own landing page, opened from its homepage card and footer link:

- `/starling-water/` (includes the Starling phone numbers)
- `/royal-retreat-bakery/`
- `/elite-royal-suite-hotel/`

Each page is configured in `src/data/pages/<slug>.json` and uses three sections whose copy lives in `src/data/sections/`: `<business>-hero.json`, `<business>-about.json` and `<business>-contact.json` (`starling`, `bakery`, `hotel`). The section variants are registered in `src/config/section-registry/` (hero, about and cta). New pages must also be added to `BUILD_SCOPE.pages` in `site.config.mjs`.

## Active sections

The homepage uses navigation, hero, our businesses, values, about, FAQ and the contact footer. Testimonials are not shown because no verified reviews have been supplied; the component remains available.

The section order is defined in `src/data/pages/index.json`.

## Homepage anchors

`#businesses`, `#starling-water`, `#royal-retreat-bakery`, `#elite-royal-suite-hotel`, `#values`, `#about`, `#faq`, `#contact`.

## Language

The site is published in English only. The Polish demo route and the language switcher have been removed.
