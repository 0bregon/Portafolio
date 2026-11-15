import { describe, expect, it } from "vitest";
import { confirmedSkills, educationPeriod, projects, resumeUrl, skillGroups, socialLinks, spokenLanguages } from "@/lib/portfolio";

describe("Confirmed portfolio facts", () => {
  it("only publishes the three supplied projects, not Exploradores Digitales", () => {
    expect(projects.map(project => project.name)).toEqual(["Academia Robo-B", "Festín", "CONAC - Proyecto Colaborativo"]);
  });
  it("includes exactly the confirmed technical skills", () => {
    expect(confirmedSkills).toEqual(["HTML", "CSS", "JavaScript", "Python", "Java", "C++", "SQL", "Supabase", "Visual Studio Code", "Git", "GitHub", "GitHub Pages", "Netlify", "Cloudflare"]);
    expect(skillGroups).toHaveLength(5);
  });
  it("prioritizes web development while preserving the requested category order", () => {
    expect(skillGroups.map(group => group.id)).toEqual(["web", "programming", "databases", "tools", "deployment"]);
    expect(skillGroups[0].technologies).toEqual(["HTML", "CSS", "JavaScript"]);
  });
  it("keeps Robo-B in development with no fabricated public demo", () => {
    expect(projects[0].status).toBe("development");
    expect(projects[0].demo).toBeNull();
    expect(projects[0].repository).toBe("https://github.com/0bregon/Academia_Robo-B");
  });
  it("uses the supplied public demonstrations", () => {
    expect(projects[1].demo).toBe("https://0bregon.github.io/Festin/");
    expect(projects[2].demo).toBe("https://0bregon.github.io/CONAC/");
  });
  it("records studies from 2024 to present", () => {
    expect(educationPeriod).toEqual({ start: 2024, ongoing: true });
  });
  it("records native Spanish and B2 English without scores", () => {
    expect(spokenLanguages).toEqual([{ id: "es", level: "native" }, { id: "en", level: "B2" }]);
  });
  it("does not fabricate a downloadable résumé", () => {
    expect(resumeUrl).toBeNull();
  });
  it("connects to the provided LinkedIn profile", () => {
    expect(socialLinks.linkedin).toBe("https://www.linkedin.com/in/marielobregon");
  });
  it("links to the provided GitHub profile", () => {
    expect(socialLinks.github).toBe("https://github.com/0bregon");
  });
});