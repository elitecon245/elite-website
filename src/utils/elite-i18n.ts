import copy from '@data/i18n/elite.json';

export type EliteLocale = 'pl' | 'en';

type EliteCopy = typeof copy.en;

// The site is published in English only; any other locale falls back to English.
export function getEliteCopy(locale: EliteLocale = 'en'): EliteCopy {
  return (copy as Partial<Record<EliteLocale, EliteCopy>>)[locale] ?? copy.en;
}

export function getEliteSectionCopy(locale: EliteLocale, dataKey?: string) {
  if (!dataKey) return undefined;
  return getEliteCopy(locale).sections[dataKey as keyof EliteCopy['sections']];
}

function withEliteBase(path: string): string {
  const configuredBase = process.env.PUBLIC_BASE_PATH || import.meta.env.BASE_URL;
  const base = configuredBase === '/'
    ? ''
    : `/${configuredBase.replace(/^\/+|\/+$/g, '')}`;
  return `${base}${path}` || '/';
}

export function getEliteLocalePath(locale: EliteLocale): string {
  return withEliteBase(locale === 'en' ? '/' : '/pl/');
}

export function getEliteNavigationPath(href: string, locale: EliteLocale): string {
  if (href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return href;
  }

  const normalized = href.startsWith('/') ? href : `/${href}`;
  if (locale === 'en') return withEliteBase(normalized);
  return withEliteBase(normalized === '/' ? '/pl/' : `/pl${normalized}`);
}
