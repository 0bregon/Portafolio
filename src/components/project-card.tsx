import { ArrowUpRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n";
import { projects } from "@/lib/portfolio";
import { projectImage } from "@/lib/project-media";

export function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const { t } = useLanguage();
  const title = project.id === "conac" ? t.conacTitle : project.name;
  const demoLabel = project.id === "piensa" ? t.piensaDemo : t.demo;
  const repositoryLabel = project.id === "piensa" ? t.piensaRepository : t.repository;
  const content = {
    piensa: { image: projectImage("piensa"), alt: t.piensaAlt, description: t.piensaDescription, objective: t.piensaObjective, features: t.piensaFeatures, pending: t.piensaPending },
    festin: { image: projectImage("festin"), alt: t.festinAlt, description: t.festinDescription, objective: t.festinObjective, features: t.festinFeatures, pending: t.festinPending },
    conac: { image: projectImage("conac"), alt: t.conacAlt, description: t.conacDescription, objective: t.conacObjective, features: t.conacFeatures, pending: t.conacPending },
  }[project.id];
  return <article className={`project-card project-${project.id}`} aria-labelledby={`project-${project.id}`}>
    <figure className="project-image"><img src={content.image} alt={content.alt} width={1280} height={project.id === "piensa" ? 1280 : 800} loading="lazy" decoding="async" /><figcaption className="image-caption">{t.screenshot}</figcaption></figure>
    <div className="project-body">
      <p className="project-category">{project.id === "piensa" ? t.piensaCategory : t.publicDemo}</p>
      <h3 className="project-title" id={`project-${project.id}`}>{title}</h3>
      <p className="project-description">{content.description}</p>
      <dl className="project-facts"><div><dt>{t.objective}</dt><dd>{content.objective}</dd></div><div><dt>{t.features}</dt><dd>{content.features}</dd></div>{project.id === "piensa" && <div><dt>{t.pedagogy}</dt><dd>{t.piensaPedagogy}</dd></div>}</dl>
      <ul className="technology-list" aria-label={t.skillsEyebrow}>{project.technologies.map(tech => <li key={tech}>{tech}</li>)}</ul>
      {content.pending && <p className="project-details">{content.pending}</p>}
      <div className="project-actions">
        {project.demo && <Button asChild variant="portfolio" size="sm"><a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label={`${demoLabel}: ${title}`}>{demoLabel}<ArrowUpRight /></a></Button>}
        <Button asChild variant="portfolioOutline" size="sm"><a href={project.repository} target="_blank" rel="noopener noreferrer" aria-label={`${repositoryLabel}: ${title}`}><Github />{repositoryLabel}<ArrowUpRight /></a></Button>
      </div>
    </div>
  </article>;
}