import { describe, expect, it } from "vitest";
import { CASE_STUDIES, CLOUD_NODES, EXPERIENCE, PROFILE, SKILL_CATEGORIES } from "@/data/resume";

describe("Resume & Portfolio Data", () => {
  it("contains accurate profile identity", () => {
    expect(PROFILE.name).toBe("David Alvarez Gasca");
    expect(PROFILE.handle).toBe("Risoxas");
    expect(PROFILE.github).toContain("github.com/Risoxas");
  });

  it("includes all three free-tier cloud nodes (Vercel, GCP, AWS)", () => {
    const ids = CLOUD_NODES.map((n) => n.id);
    expect(ids).toEqual(["vercel", "gcp", "aws"]);
  });

  it("includes experience, case studies, and skill categories", () => {
    expect(EXPERIENCE.length).toBeGreaterThanOrEqual(5);
    expect(CASE_STUDIES.length).toBeGreaterThanOrEqual(4);
    expect(SKILL_CATEGORIES.length).toBe(4);
  });
});
