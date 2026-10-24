import type { SectionEntry } from './types';

const icon = '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"></svg>';

export const aboutSections: Record<string, SectionEntry> = {
  about: {
    id: 'about', label: 'O nas', groupId: 'about', hint: 'Sekcja o firmie z USP lub klasycznym opisem', icon,
    defaultVariant: 'default',
    variants: {
      default: { component: 'UspPremiumBlock', dataKey: 'usp-premium' },
      classic: { component: 'AboutBlock', dataKey: 'about' },
    },
  },
  marquee: {
    id: 'marquee', label: 'Marki i logotypy', groupId: 'trust', hint: 'Karuzela logotypów partnerów', icon,
    defaultVariant: 'default',
    variants: { default: { component: 'MarqueeBlock', dataKey: 'marquee' } },
  },
  trustBar: {
    id: 'trustBar', label: 'Pasek zaufania', groupId: 'trust', hint: 'Liczniki zaufania i logotypy partnerów', icon,
    defaultVariant: 'default',
    variants: { default: { component: 'TrustBarBlock', dataKey: 'trust-bar' } },
  },
  eliteTeam: {
    id: 'eliteTeam', label: 'Zespół i wartości', groupId: 'about', hint: 'Sekcja zespołu dla templateu Elite', icon,
    defaultVariant: 'default',
    variants: {
      default: { component: 'TeamBlock', dataKey: 'elite-team' },
      starling: { label: 'Starling Water', component: 'TeamBlock', dataKey: 'starling-about' },
      bakery: { label: 'Royal Retreat Bakery', component: 'TeamBlock', dataKey: 'bakery-about' },
      hotel: { label: 'Elite Royal Suite and Hotel', component: 'TeamBlock', dataKey: 'hotel-about' },
    },
  },
  product: {
    id: 'product', label: 'Product showcase', groupId: 'about', hint: 'Product image with description, ingredients and benefits', icon,
    defaultVariant: 'bakery',
    variants: {
      bakery: { label: 'Royal Retreat Bakery', component: 'ProductShowcaseBlock', dataKey: 'bakery-product' },
    },
  },
  productionProcess: {
    id: 'productionProcess', label: 'Production process', groupId: 'about', hint: 'Three-step process with images that change on scroll', icon,
    defaultVariant: 'bakery',
    variants: {
      bakery: { label: 'Royal Retreat Bakery', component: 'ProductionProcessBlock', dataKey: 'bakery-process' },
      starling: { label: 'Starling Water', component: 'ProductionProcessBlock', dataKey: 'starling-process' },
    },
  },
  roomsGallery: {
    id: 'roomsGallery', label: 'Rooms gallery', groupId: 'about', hint: 'Image slider with a thumbnail strip', icon,
    defaultVariant: 'hotel',
    variants: {
      hotel: { label: 'Elite Royal Suite and Hotel', component: 'RoomsGalleryBlock', dataKey: 'hotel-rooms' },
    },
  },
  aboutMarquee: {
    id: 'aboutMarquee', label: 'O nas z marquee', groupId: 'about', hint: 'Split tekstu, zdjęcia i przewijanych pasów', icon,
    defaultVariant: 'default',
    variants: { default: { component: 'AboutMarqueeSplitBlock', dataKey: 'about-marquee' } },
  },
  aboutSplit: {
    id: 'aboutSplit', label: 'O nas ze zdjęciem', groupId: 'about', hint: 'Split tekstu, zdjęcia i cytatu', icon,
    defaultVariant: 'default',
    variants: { default: { component: 'AboutSplitBlock', dataKey: 'about-split' } },
  },
  aboutExpert: {
    id: 'aboutExpert', label: 'Ekspert', groupId: 'about', hint: 'Split z portretem, listą kompetencji i linkiem', icon,
    defaultVariant: 'default',
    variants: { default: { component: 'AboutExpertBlock', dataKey: 'about-expert' } },
  },
  audienceSplit: {
    id: 'audienceSplit', label: 'Dla kogo', groupId: 'about', hint: 'Split z grupami docelowymi', icon,
    defaultVariant: 'default',
    variants: { default: { component: 'AudienceSplitBlock', dataKey: 'audience-split' } },
  },
  aboutSplitLean: {
    id: 'aboutSplitLean', label: 'O nas z obrazem', groupId: 'about', hint: 'Split z obrazem i gradientowym overlay', icon,
    defaultVariant: 'default',
    variants: { default: { component: 'AboutSplitLeanBlock', dataKey: 'about-split-lean' } },
  },
  logoGrid: {
    id: 'logoGrid', label: 'Logotypy', groupId: 'trust', hint: 'Statyczny grid logotypów', icon,
    defaultVariant: 'default',
    variants: { default: { component: 'LogoGridBlock', dataKey: 'logo-grid' } },
  },
};
