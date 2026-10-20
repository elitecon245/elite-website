import type { StudioTemplateId } from "@/studio/engine/schema";
import { eliteStudioAdapter } from "./elite.adapter";
import type { StudioAdapter } from "./types";

const ADAPTERS: Record<StudioTemplateId, StudioAdapter> = {
  elite: eliteStudioAdapter,
};

export function getStudioAdapter(template: StudioTemplateId): StudioAdapter {
  return ADAPTERS[template];
}

export function listStudioAdapters(): StudioAdapter[] {
  return Object.values(ADAPTERS);
}
