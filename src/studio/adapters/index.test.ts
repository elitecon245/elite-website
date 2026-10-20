import { describe, expect, it } from "vitest";
import { getStudioAdapter, listStudioAdapters } from "./index";

describe("studio adapters registry", () => {
  it("exposes only the Elite adapter", () => {
    const ids = listStudioAdapters().map((adapter) => adapter.id).sort();
    expect(ids).toEqual(["elite"]);
  });

  it("contains valid section option defaults", () => {
    const adapter = getStudioAdapter("elite");

    for (const section of adapter.sections) {
      expect(section.options.length).toBeGreaterThan(0);
      expect(section.options.includes(section.defaultVariant)).toBe(true);
    }
  });
});
