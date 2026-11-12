import { describe, expect, it } from "vitest";
import { confirmedSkills, projects, socialLinks } from "@/lib/portfolio";

describe("Confirmed portfolio facts", () => {
  it("targets ages 5–7 for Academia Robo-B", () => {
    expect(projects.find(project => project.id === "academia-robo-b")?.ageRange).toEqual({ min: 5, max: 7 });
  });
  it("does not invent confirmed technical skills", () => {
    expect(confirmedSkills).toEqual([]);
    expect(projects.every(project => project.technologies.length === 0 && project.contribution === null)).toBe(true);
  });
  it("connects to the provided LinkedIn profile", () => {
    expect(socialLinks.linkedin).toBe("https://www.linkedin.com/in/marielobregon");
  });
  it("links to the provided GitHub profile", () => {
    expect(socialLinks.github).toBe("https://github.com/0bregon");
  });
});