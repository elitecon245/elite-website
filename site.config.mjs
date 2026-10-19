// Single source of truth for site / client project configuration.
// Edit THIS file when changing domain.
// Environment domain used during build.
// PLACEHOLDER: replace with the confirmed Elite Consolidated production domain
// (and update company.json siteUrl) before launch. Indexing stays disabled in
// src/data/global/seo.json until then.
export const SITE_URL = 'https://www.example.com/';
export const ACTIVE_TEMPLATE = 'nova';

// The site is published in English only. The Polish demo route and the
// language switcher were removed during the Elite Consolidated rebrand.
export const SITE_LOCALE = 'en';

// BUILD_SCOPE — what goes into build (dist/) and what stays dev-only.
// Dev has everything (for prototyping), build is clean per project scope.
// One-page site: keeps the homepage, the legal pages and 404, and removes
// other subpages (blog, contact, services...).
export const BUILD_SCOPE = {
  // Allowlist of paths to keep in build. Empty [] = all.
  // Prefix works: '/cookies' keeps '/cookies/' etc.
  // 404 is always kept regardless of this list.
  pages: ['/', '/cookies', '/privacy-policy'],
  // Denylist — always removed from dist/ (dev-only, prototypes, demo).
  // Entry matches by first path segment. Dev and QA stay out of production build.
  forceRemove: ['starwind-demo', 'layout-test', 'roofing', 'dev', 'qa'],
  // Whether to clean unused media (images, videos, fonts) from dist/.
  images: true,
};
