import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowDown, ArrowRight, ArrowUp, ArrowUpRight, Braces, CodeXml, Database, Github, GraduationCap, Linkedin, MapPin, Menu, Terminal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/project-card";
import { events, interests, projects, socialLinks } from "@/lib/portfolio";
import roboImage from "@/assets/robo-concept.jpg";
import safetyImage from "@/assets/safety-concept.jpg";

// The home route ships no og:image, so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Mariel Obregón — Technology with purpose" },
    { name: "description", content: "Meet Mariel Obregón, Information Technology student in Panama exploring software development, educational technology, and purposeful digital solutions." },
    { property: "og:title", content: "Mariel Obregón — Technology with purpose" },
    { property: "og:description", content: "Explore Mariel's educational technology projects, academic journey, and interests in software development." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

const navigation = [["About", "about"], ["Projects", "projects"], ["Skills", "skills"], ["Education", "education"], ["Experience", "experience"], ["Contact", "contact"]];

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div id="top">
      <header className="site-header">
        <div className="portfolio-container header-inner">
          <a className="monogram" href="#top" aria-label="Mariel Obregón, back to top">mo<span>.</span></a>
          <nav className="desktop-nav" aria-label="Main navigation">{navigation.map(([label, id]) => <a key={id} className="nav-link" href={`#${id}`}>{label}</a>)}</nav>
          <Button className="mobile-menu-toggle" variant="ghost" size="icon" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
        </div>
        {menuOpen && <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation">{navigation.map(([label, id]) => <a className="nav-link" key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>}
      </header>
      <main>
        <section className="hero portfolio-container" aria-labelledby="intro-heading">
          <p className="eyebrow">Curiosity meets purpose</p>
          <h1 id="intro-heading">Mariel <em>Obregón</em></h1>
          <p className="hero-role">Information Technology Student <span aria-hidden="true">|</span> Future Software Developer</p>
          <p className="hero-intro">I’m drawn to the possibilities where technology, education, and real-world needs meet. I’m learning to turn that curiosity into thoughtful digital solutions that make a difference.</p>
          <div className="hero-actions">
            <Button asChild variant="portfolio" className="h-11 px-5 text-xs"><a href="#projects">Explore my projects <ArrowDown /></a></Button>
            <Button asChild variant="portfolioOutline" className="h-11 px-5 text-xs"><a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">Let's connect <ArrowUpRight /></a></Button>
          </div>
          <div className="hero-footer"><span className="flex items-center gap-2"><MapPin size={12} /> La Chorrera, Panama</span><a href="#about">A little more about me <ArrowDown size={13} /></a></div>
        </section>
        <section className="section paper-section" id="about">
          <div className="portfolio-container about-layout">
            <div><p className="eyebrow">01 / About me</p><h2 className="section-heading">A curious mind.<br />A <em>purposeful</em> path.</h2><p className="about-note"><GraduationCap size={16} /> Learning today. Building for tomorrow.</p></div>
            <div><p className="section-copy">I’m an Information Technology student at the University of Panama, pursuing a Bachelor’s degree in Information Technology for Educational and Business Management.</p><p className="section-copy mt-4">I enjoy exploring new technologies, developing digital projects, and finding creative ways to solve problems. My academic and personal journey has brought me into technology challenges, educational projects, and learning programs—experiences that continue to shape the developer I hope to become.</p><p className="section-copy mt-4">My goal is to create useful, thoughtful solutions that connect people with the possibilities of technology.</p><div className="interest-list">{interests.map(interest => <span className="interest-tag" key={interest}>{interest}</span>)}</div></div>
          </div>
        </section>
        <section className="section" id="projects">
          <div className="portfolio-container">
            <div className="section-top"><div><p className="eyebrow">02 / Featured projects</p><h2 className="section-heading">Ideas with <em>intention.</em></h2></div><p className="section-copy">Exploring how technology can make learning more accessible, engaging, and meaningful.</p></div>
            <div className="project-grid">{projects.map((project, index) => <ProjectCard key={project.id} project={project} image={index === 0 ? roboImage : safetyImage} />)}</div>
          </div>
        </section>
        <section className="section paper-section" id="skills"><div className="portfolio-container">
          <p className="eyebrow">03 / Technical skills</p><h2 className="section-heading">Always <em>learning.</em></h2><p className="section-copy">A growing technical foundation, guided by curiosity and continuous practice.</p>
          <div className="skills-grid">{[{ title: "Programming languages", icon: Braces }, { title: "Web development", icon: CodeXml }, { title: "Databases", icon: Database }, { title: "Development tools", icon: Terminal }].map(({ title, icon: Icon }) => <div className="skill-item" key={title}><Icon className="skill-icon" /><h3>{title}</h3><p className="placeholder">Specific technologies and proficiency<br />to be confirmed.</p></div>)}</div>
          <div className="interest-row"><div><h3 className="text-xs font-medium">Areas of interest</h3><p className="placeholder mt-1">Exploring, not claiming expertise.</p></div><div className="interest-list">{[...interests, "Data science"].map(interest => <span className="interest-tag" key={interest}>{interest}</span>)}</div></div>
        </div></section>
        <section className="section" id="education"><div className="portfolio-container education-layout">
          <div><p className="eyebrow">04 / Education</p><h2 className="section-heading">The foundation<br />for <em>what’s next.</em></h2></div>
          <div><div className="degree"><span className="degree-status"><GraduationCap size={14} /> Currently pursuing</span><h3>Bachelor’s in Information Technology for Educational and Business Management</h3><p>University of Panama</p></div><div className="education-pending"><h4 className="text-xs font-medium">Courses, certifications & additional training</h4><p className="placeholder mt-2">Details to be added once confirmed.</p></div></div>
        </div></section>
        <section className="section paper-section" id="experience"><div className="portfolio-container">
          <div className="section-top"><div><p className="eyebrow">05 / Experience & technology events</p><h2 className="section-heading">Learning beyond<br />the <em>classroom.</em></h2></div><p className="section-copy">Technology challenges and learning programs, separate from formal employment.</p></div>
          <p className="placeholder">Events mentioned for this portfolio; participation details, dates, and roles are awaiting confirmation.</p>
          <div className="events-grid">{events.map((event, index) => <article className="event-item" key={event}><span className="event-number">0{index + 1}</span><h3>{event}</h3><p className="placeholder">Participation & learning details to be confirmed.</p></article>)}</div>
        </div></section>
        <section className="section contact-section" id="contact"><div className="portfolio-container"><p className="eyebrow">06 / Let's connect</p><h2 className="section-heading">Good things start with<br />a <em>conversation.</em></h2><p className="section-copy">I’d love to connect with people who share a curiosity for technology, education, and meaningful ideas.</p><div className="social-links"><Button asChild variant="portfolio" className="h-11 px-5 text-xs"><a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin /> LinkedIn <ArrowUpRight /></a></Button><Button asChild variant="portfolioOutline" className="h-11 px-5 text-xs"><a href={socialLinks.github} target="_blank" rel="noopener noreferrer"><Github /> GitHub <ArrowUpRight /></a></Button></div><p className="placeholder mt-6 flex justify-center items-center gap-2"><MapPin size={12} /> La Chorrera, Panama</p></div></section>
      </main>
      <footer className="site-footer"><div className="portfolio-container footer-inner"><span>© 2026 Mariel Obregón</span><span>Made with curiosity & intention.</span><a href="#top">Back to top <ArrowUp size={13} /></a></div></footer>
    </div>
  );
}
