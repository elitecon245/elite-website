import type { SectionEntry } from './types';

const icon = '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"></svg>';

export const ctaSections: Record<string, SectionEntry> = {
  eliteCta: {
    id: 'eliteCta', label: 'Końcowe wezwanie do działania', groupId: 'cta', hint: 'Końcowe CTA dla templateu Elite', icon,
    defaultVariant: 'default',
    variants: {
      default: { component: 'CtaBlock', dataKey: 'elite-cta' },
      starling: { label: 'Starling Water', component: 'CtaBlock', dataKey: 'starling-contact' },
      bakery: { label: 'Royal Retreat Bakery', component: 'CtaBlock', dataKey: 'bakery-contact' },
      hotel: { label: 'Elite Royal Suite and Hotel', component: 'CtaBlock', dataKey: 'hotel-contact' },
    },
  },
};
