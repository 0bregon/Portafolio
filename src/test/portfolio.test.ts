import { describe, expect, it } from "vitest";
import { confirmedSkills, projects, socialLinks } from "@/lib/portfolio";

describe("Confirmed portfolio facts", () => {
  it("keeps projects completely empty without examples or placeholders", () => {
    expect(projects).toEqual([]);
  });
  it("does not invent confirmed technical skills", () => {
    expect(confirmedSkills).toEqual([]);
  });
  it("connects to the provided LinkedIn profile", () => {
    expect(socialLinks.linkedin).toBe("https://www.linkedin.com/in/marielobregon");
  });
  it("links to the provided GitHub profile", () => {
    expect(socialLinks.github).toBe("https://github.com/0bregon");
  });
});