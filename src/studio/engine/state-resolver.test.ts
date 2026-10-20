import { describe, expect, it } from "vitest";
import { getStudioAdapter } from "../adapters";
import {
  resolveStudioState,
  resolveTemplateFromUrl,
  serializeStudioStateToSearchParams,
} from "./state-resolver";

describe("resolveTemplateFromUrl", () => {
  it("uses Elite as fallback template", () => {
    const url = new URL("https://example.com/dev/components/");
    expect(resolveTemplateFromUrl(url)).toBe("elite");
  });

  it("accepts known template id", () => {
    const url = new URL("https://example.com/dev/components/?template=elite");
    expect(resolveTemplateFromUrl(url)).toBe("elite");
  });
});

describe("resolveStudioState", () => {
  it("merges profile defaults with valid URL overrides", () => {
    const adapter = getStudioAdapter("elite");
    const url = new URL(
      "https://example.com/dev/components/?template=elite&hero=registry-centered&pricing=minimal&studio=pricing",
    );

    const resolved = resolveStudioState(url, adapter);

    expect(resolved.template).toBe("elite");
    expect(resolved.state.hero).toBe("registry-centered");
    expect(resolved.state.pricing).toBe("minimal");
    expect(resolved.state.features).toBe("grid");
    expect(resolved.studioTab).toBe("pricing");
  });

  it("ignores invalid section variants", () => {
    const adapter = getStudioAdapter("elite");
    const url = new URL(
      "https://example.com/dev/components/?template=elite&features=unknown-layout",
    );

    const resolved = resolveStudioState(url, adapter);

    expect(resolved.state.features).toBe("grid");
  });
});

describe("serializeStudioStateToSearchParams", () => {
  it("serializes template, section state and active tab", () => {
    const state = {
      navbar: "centered",
      hero: "service",
      features: "cards-grid",
      pricing: "simple",
      cta: "centered",
      "section-pattern": "off",
      footer: "columns",
      theme: "elite",
    } as const;

    const params = serializeStudioStateToSearchParams("elite", state, "hero");

    expect(params.get("template")).toBe("elite");
    expect(params.get("hero")).toBe("service");
    expect(params.get("studio")).toBe("hero");
  });
});
