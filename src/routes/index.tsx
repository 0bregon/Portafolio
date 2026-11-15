import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowDown, ArrowUp, ArrowUpRight, Braces, CloudUpload, CodeXml, Database, FileDown, Github, GraduationCap, Linkedin, MapPin, Menu, Terminal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/language-switcher";
import { translations, useLanguage } from "@/lib/i18n";
import { educationPeriod, events, projects, resumeUrl, skillGroups, socialLinks, spokenLanguages } from "@/lib/portfolio";
import { ProjectCard } from "@/components/project-card";

// The home route ships no og:image, so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: translations.es.pageTitle },
    { name: "description", content: translations.es.description },
    { property: "og:title", content: translations.es.pageTitle },
    { property: "og:description", content: translations.es.socialDescription },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});



function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLanguage();
  const interests = [t.software, t.ai, t.cybersecurity, t.edtech];
  const navigation = [[t.navAbout, "about"], [t.navProjects, "projects"], [t.navSkills, "skills"], [t.navEducation, "education"], [t.navExperience, "experience"], [t.navContact, "contact"]];
  const skillPresentation = { web: { title: t.web, icon: CodeXml }, programming: { title: t.programming, icon: Braces }, databases: { title: t.databases, icon: Database }, tools: { title: t.tools, icon: Terminal }, deployment: { title: t.deployment, icon: CloudUpload } };
  return (
    <div id="top">
      <header className="site-header">
        <div className="portfolio-container header-inner">
          <a className="monogram" href="#top" aria-label={t.backLabel}>mo<span>.</span></a>
          <nav className="desktop-nav" aria-label={t.mainNavigation}>{navigation.map(([label, id]) => <a key={id} className="nav-link" href={`#${id}`}>{label}</a>)}</nav>
          <div className="header-controls"><LanguageSwitcher /><Button className="mobile-menu-toggle" variant="ghost" size="icon" aria-label={menuOpen ? t.closeNavigation : t.openNavigation} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button></div>
        </div>
        {menuOpen && <nav className="mobile-nav" id="mobile-navigation" aria-label={t.mobileNavigation}>{navigation.map(([label, id]) => <a className="nav-link" key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>}
      </header>
      <main>
        <section className="hero portfolio-container" aria-labelledby="intro-heading">
          <p className="eyebrow">{t.heroEyebrow}</p>
          <h1 id="intro-heading">Mariel <em>Obregón</em></h1>
          <p className="hero-role">{t.role} <span aria-hidden="true">|</span> {t.futureRole}</p>
          <p className="hero-intro">{t.intro}</p>
          <div className="hero-actions">
            <Button asChild variant="portfolio" className="h-11 px-5 text-xs"><a href="#projects">{t.explore} <ArrowDown /></a></Button>
            <Button asChild variant="portfolioOutline" className="h-11 px-5 text-xs"><a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">{t.connect} <ArrowUpRight /></a></Button>
          </div>
          <div className="hero-footer"><span className="flex items-center gap-2"><MapPin size={12} /> {t.location}</span><a href="#about">{t.moreAbout} <ArrowDown size={13} /></a></div>
        </section>
        <section className="section paper-section" id="about">
          <div className="portfolio-container about-layout">
            <div><p className="eyebrow">{t.aboutEyebrow}</p><h2 className="section-heading">{t.aboutTitle}<br />{t.aboutPrefix}<em>{t.aboutEmphasis}</em>{t.aboutSuffix}</h2><p className="about-note"><GraduationCap size={16} /> {t.aboutNote}</p></div>
            <div><p className="section-copy">{t.aboutFirst}</p><p className="section-copy mt-4">{t.aboutSecond}</p><p className="section-copy mt-4">{t.aboutThird}</p><div className="interest-list">{interests.map(interest => <span className="interest-tag" key={interest}>{interest}</span>)}</div></div>
          </div>
        </section>
        <section className="section" id="projects" aria-label={t.projectsLabel}>
          <div className="portfolio-container">
            <div className="section-top"><div><p className="eyebrow">{t.projectsEyebrow}</p><h2 className="section-heading">{t.projectsTitle}<em>{t.projectsEmphasis}</em></h2></div><p className="section-copy">{t.projectsIntro}</p></div>
            <div className="project-grid">{projects.map(project => <ProjectCard key={project.id} project={project} />)}</div>
          </div>
        </section>
        <section className="section paper-section" id="skills"><div className="portfolio-container">
          <p className="eyebrow">{t.skillsEyebrow}</p><h2 className="section-heading">{t.skillsPrefix}<em>{t.skillsEmphasis}</em></h2><p className="section-copy">{t.skillsIntro}</p>
          <div className="skills-grid">{skillGroups.map(group => { const { title, icon: Icon } = skillPresentation[group.id]; return <div className="skill-item" key={group.id}><Icon className="skill-icon" /><h3>{title}</h3><ul className="skill-technologies">{group.technologies.map(tech => <li key={tech}>{tech}</li>)}</ul></div>; })}</div>
        </div></section>
        <section className="section" id="education"><div className="portfolio-container education-layout">
          <div><p className="eyebrow">{t.educationEyebrow}</p><h2 className="section-heading">{t.educationTitle}<br />{t.educationPrefix}<em>{t.educationEmphasis}</em></h2></div>
          <div><div className="degree"><span className="degree-status"><GraduationCap size={14} /> {t.degreeStatus} · {educationPeriod.start} – {t.present}</span><h3>{t.degree}</h3><p>{t.university}<br />{t.regionalCenter}</p></div><div className="education-pending"><h3 className="text-xs font-medium">{t.trainingTitle}</h3><p className="training-name">Samsung Innovation Campus</p><p className="placeholder">{t.trainingPending}</p></div><div className="spoken-languages"><h3 className="text-xs font-medium">{t.languagesTitle}</h3><dl>{spokenLanguages.map(item => <div key={item.id}><dt>{item.id === "es" ? t.spanish : t.english}</dt><dd>{item.level === "native" ? t.native : t.upperIntermediate}</dd></div>)}</dl></div></div>
        </div></section>
        <section className="section paper-section" id="experience"><div className="portfolio-container">
          <div className="section-top"><div><p className="eyebrow">{t.experienceEyebrow}</p><h2 className="section-heading">{t.experienceTitle}<br />{t.experiencePrefix}<em>{t.experienceEmphasis}</em></h2></div><p className="section-copy">{t.experienceIntro}</p></div>
          <div className="events-grid">{events.map((event, index) => <article className="event-item" key={event}><span className="event-number">0{index + 1}</span><h3>{event}</h3><p className="event-role">{index === 0 ? t.copaRole : t.hackrocksRole}</p><p className="section-copy">{index === 0 ? t.copaDescription : t.hackrocksDescription}</p></article>)}</div>
        </div></section>
        <section className="section contact-section" id="contact"><div className="portfolio-container"><p className="eyebrow">{t.contactEyebrow}</p><h2 className="section-heading">{t.contactTitle}<br />{t.contactPrefix}<em>{t.contactEmphasis}</em></h2><p className="section-copy">{t.contactIntro}</p><ul className="opportunity-list" aria-label={t.availability}>{[t.internship, t.junior, t.collaboration].map(item => <li key={item}>{item}</li>)}</ul><div className="social-links"><Button asChild variant="portfolio" className="h-11 px-5 text-xs"><a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin /> {t.linkedin} <ArrowUpRight /></a></Button><Button asChild variant="portfolioOutline" className="h-11 px-5 text-xs"><a href={socialLinks.github} target="_blank" rel="noopener noreferrer"><Github /> {t.github} <ArrowUpRight /></a></Button></div><div className="resume-space">{resumeUrl ? <Button asChild variant="portfolioOutline"><a href={resumeUrl} download><FileDown />{t.resumeTitle}</a></Button> : <p className="placeholder"><span>{t.resumeTitle}</span> · {t.resumePending}</p>}</div><p className="placeholder mt-6 flex justify-center items-center gap-2"><MapPin size={12} /> {t.location}</p></div></section>
      </main>
      <footer className="site-footer"><div className="portfolio-container footer-inner"><span>© 2026 Mariel Obregón</span><span>{t.footerNote}</span><a href="#top">{t.backTop} <ArrowUp size={13} /></a></div></footer>
    </div>
  );
}
