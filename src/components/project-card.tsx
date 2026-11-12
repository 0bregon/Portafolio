import type { projects } from "@/lib/portfolio";

export function ProjectCard({ project, image }: { project: (typeof projects)[number]; image: string }) {
  return (
    <article className="project-card" id={project.id}>
      <div className="project-image">
        <img src={image} alt={`Concept illustration for ${project.title}; not an actual project screenshot`} width={1200} height={800} loading="lazy" />
        <span className="image-caption">Concept illustration · Screenshot pending</span>
      </div>
      <p className="project-category">{project.category}</p>
      <h3 className="project-title">{project.title}</h3>
      <p className="project-description">{project.problem} {project.purpose}</p>
      <div className="project-meta"><span>{project.audience}</span><span>Project link not yet provided</span></div>
      <p className="project-details">Contribution & technologies: details to be confirmed.</p>
    </article>
  );
}