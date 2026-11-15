export const socialLinks = {
  linkedin: "https://www.linkedin.com/in/marielobregon",
  github: "https://github.com/0bregon",
};

export const projects = [
  { id: "robo", name: "Academia Robo-B", technologies: ["HTML", "CSS", "JavaScript"], repository: "https://github.com/0bregon/Academia_Robo-B", demo: null, status: "development" },
  { id: "festin", name: "Festín", technologies: ["HTML", "CSS", "JavaScript", "Supabase", "GitHub Pages"], repository: "https://github.com/0bregon/Festin", demo: "https://0bregon.github.io/Festin/", status: "public" },
  { id: "conac", name: "CONAC - Proyecto Colaborativo", technologies: ["HTML", "CSS", "JavaScript", "GitHub Pages"], repository: "https://github.com/0bregon/CONAC", demo: "https://0bregon.github.io/CONAC/", status: "public" },
] as const;

export const skillGroups = [
  { id: "web", technologies: ["HTML", "CSS", "JavaScript"] },
  { id: "programming", technologies: ["Python", "Java", "C++"] },
  { id: "databases", technologies: ["SQL", "Supabase"] },
  { id: "tools", technologies: ["Visual Studio Code", "Git", "GitHub"] },
  { id: "deployment", technologies: ["GitHub Pages", "Netlify", "Cloudflare"] },
] as const;
export const confirmedSkills = skillGroups.flatMap(group => [...group.technologies]);
export const events = ["Hackathon Copa Airlines 2026", "HackRocks OEA"];
export const educationPeriod = { start: 2024, ongoing: true } as const;
export const spokenLanguages = [{ id: "es", level: "native" }, { id: "en", level: "B2" }] as const;
// No download action is rendered until an authentic résumé is supplied.
export const resumeUrl: string | null = null;