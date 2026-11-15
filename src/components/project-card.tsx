import { ArrowUpRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n";
import { projects } from "@/lib/portfolio";
import roboAsset from "@/assets/robo.webp.asset.json";
import festinAsset from "@/assets/festin.webp.asset.json";
import conacAsset from "@/assets/conac.webp.asset.json";

export function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const { t } = useLanguage();
  const content = {
    robo: { image: roboAsset.url, alt: t.roboAlt, description: t.roboDescription, objective: t.roboObjective, features: t.roboFeatures, pending: t.roboPending },
    festin: { image: festinAsset.url, alt: t.festinAlt, description: t.festinDescription, objective: t.festinObjective, features: t.festinFeatures, pending: t.festinPending },
    conac: { image: conacAsset.url, alt: t.conacAlt, description: t.conacDescription, objective: t.conacObjective, features: t.conacFeatures, pending: t.conacPending },
  }[project.id];
  return <article className={`project-card project-${project.id}`} aria-labelledby={`project-${project.id}`}>
    <figure className="project-image"><img src={content.image} alt={content.alt} width={project.id === "robo" ? 800 : 1280} height={800} loading="lazy" decoding="async" /><figcaption className="image-caption">{project.id === "robo" ? t.sourceCapture : t.screenshot}</figcaption></figure>
    <div className="project-body">
      <p className="project-category">{project.status === "development" ? t.development : t.publicDemo}</p>
      <h3 className="project-title" id={`project-${project.id}`}>{project.name}</h3>
      <p className="project-description">{content.description}</p>
      <dl className="project-facts"><div><dt>{t.objective}</dt><dd>{content.objective}</dd></div><div><dt>{t.features}</dt><dd>{content.features}</dd></div></dl>
      <ul className="technology-list" aria-label={t.skillsEyebrow}>{project.technologies.map(tech => <li key={tech}>{tech}</li>)}</ul>
      {content.pending && <p className="project-details">{content.pending}</p>}
      <div className="project-actions">
        {project.demo && <Button asChild variant="portfolio" size="sm"><a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label={`${t.demo}: ${project.name}`}>{t.demo}<ArrowUpRight /></a></Button>}
        <Button asChild variant="portfolioOutline" size="sm"><a href={project.repository} target="_blank" rel="noopener noreferrer" aria-label={`${t.repository}: ${project.name}`}><Github />{t.repository}<ArrowUpRight /></a></Button>
      </div>
    </div>
  </article>;
}