import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Language = "es" | "en";
export const defaultLanguage: Language = "es";

const en = {
  navAbout: "About", navProjects: "Projects", navSkills: "Skills", navEducation: "Education", navExperience: "Experience", navContact: "Contact",
  mainNavigation: "Main navigation", mobileNavigation: "Mobile navigation", openNavigation: "Open navigation", closeNavigation: "Close navigation", languageSelector: "Language selector", backLabel: "Mariel Obregón, back to top",
  heroEyebrow: "Web & software development", role: "Informatics student", futureRole: "Web & software developer in training",
  intro: "I build web projects with HTML, CSS and JavaScript, from interactive interfaces to applications with database integration. I’m looking for internships and opportunities to grow as a developer.",
  explore: "Explore my projects", connect: "Let's connect", location: "La Chorrera, Panama", moreAbout: "A little more about me",
  aboutEyebrow: "01 / About me", aboutTitle: "From an idea", aboutPrefix: "to a ", aboutEmphasis: "working application", aboutSuffix: ".", aboutNote: "University of Panama · Panama Oeste Regional Center",
  aboutFirst: "I’m studying for a Bachelor’s degree in Informatics for Educational and Business Management at the University of Panama, Panama Oeste Regional Center.",
  aboutSecond: "My focus is web and software development: building interfaces, implementing application logic, organizing information and integrating databases. My projects include an interactive programming platform, an event-rental application and an informational website.",
  aboutThird: "I want to keep developing my frontend and application-building skills through hands-on projects and collaborative work.",
  projectsLabel: "Projects",
  skillsEyebrow: "03 / Technical skills", skillsPrefix: "Tools for ", skillsEmphasis: "building.", skillsIntro: "Technologies I use and study in web and software development.",
  programming: "Programming languages", web: "Web development", databases: "Databases", tools: "Development tools", skillsPending: "Specific technologies and proficiency to be confirmed.",
  interestsTitle: "Professional interests", interestsNote: "My development focus.", software: "Software development", ai: "Frontend development", cybersecurity: "Application development", edtech: "Databases", dataScience: "Digital solutions",
  educationEyebrow: "04 / Education", educationTitle: "A foundation", educationPrefix: "to ", educationEmphasis: "grow.", degreeStatus: "Currently pursuing", degree: "Bachelor’s in Informatics for Educational and Business Management", university: "University of Panama", trainingTitle: "Additional training", trainingDescription: "Complementary training through a technology education program.",
  experienceEyebrow: "05 / Technology participation", experienceTitle: "Building and", experiencePrefix: "learning ", experienceEmphasis: "together.", experienceIntro: "Team challenges that complement my development training; not formal employment.", eventsPending: "", participationPending: "",
  contactEyebrow: "06 / Let's connect", contactTitle: "Let’s work on", contactPrefix: "the next ", contactEmphasis: "project.", contactIntro: "I’m open to internships, junior web and software development opportunities, and collaborative development projects.", linkedin: "LinkedIn", github: "GitHub", footerNote: "Web & software development.", backTop: "Back to top",
  notFound: "Page not found", notFoundMessage: "The page you're looking for doesn't exist or has been moved.", goHome: "Go home", errorTitle: "This page didn't load", errorMessage: "Something went wrong on our end. You can try refreshing or head back home.", tryAgain: "Try again",
  pageTitle: "Mariel Obregón — Web & Software Development", description: "Mariel Obregón’s portfolio: web and software projects, HTML, CSS, JavaScript and databases. Informatics student in Panama seeking internships and junior opportunities.", socialDescription: "Discover Academia Robo-B, Festín and CONAC, Mariel Obregón’s technologies and development journey.",
  projectsEyebrow: "02 / Selected projects", projectsTitle: "Ideas turned into ", projectsEmphasis: "software.", projectsIntro: "Three projects that show my work on interfaces, application logic and web publishing.",
  demo: "View project", repository: "Source code", development: "In development", publicDemo: "Public demo", objective: "Objective", features: "Implemented", screenshot: "Actual project screenshot", sourceCapture: "Screenshot of the repository version", pending: "Still in development", deployment: "Deployment & publishing",
  roboDescription: "The currently published version of Academia Robo-B is only a web prototype, not the final product. It allows visitors to explore the platform’s structure, design and some initial functionality for introducing children to programming and computational thinking. Its functionality is not fully implemented; the final project will use a different implementation.", roboObjective: "Make the first steps in programming approachable through an interactive application.", roboFeatures: "Home screen with Robo-B; navigation to a four-lesson selector; separate HTML, CSS and JavaScript files for each screen.", roboPending: "Lesson activities and instruction-block logic are not connected yet.", roboAlt: "Academia Robo-B home screen with the robot mascot and Start button",
  festinDescription: "Web application for event rentals, with a product catalog, shopping cart and reservation forms.", festinObjective: "Organize the selection of rental products, services and event dates in one application.", festinFeatures: "Product catalog and cart; reservation forms; account and reservation integration with Supabase; date and stock validation in the source code.", festinPending: "The public interface and source code were reviewed; live reservation processing has not been verified.", festinAlt: "Festín homepage with navigation, event banner and product categories",
  conacDescription: "Collaborative team project: a multi-page informational website for the Confederación Nacional de Asentamientos Campesinos in Panama, developed jointly with other team members.", conacObjective: "Organize access to the organization’s history, activities and community information.", conacFeatures: "Pages for the organization, settlements, campaigns, gallery and news; mobile navigation; responsive layout; publishing on GitHub Pages.", conacPending: "I took part in the development as a member of the team; the work was shared among all participants.", conacAlt: "CONAC homepage with its name, rural landscape and introduction",
  regionalCenter: "Panama Oeste Regional Center", present: "present", languagesTitle: "Languages", spanish: "Spanish", english: "English", native: "Native", upperIntermediate: "B2 · Upper intermediate",
  copaRole: "Frontend · Team challenge", copaDescription: "Frontend participation in a team flight-monitoring solution using Azure technologies, within a challenge involving DevOps, APIs and observability. Focused on interfaces and collaborative development.", hackrocksRole: "Collaborative technology challenge", hackrocksDescription: "Participation in a technology challenge, collaborating with a team to address problems together.",
  availability: "Professional opportunities", internship: "Internships", junior: "Junior web & software roles", collaboration: "Development collaborations", resumeTitle: "Résumé",
};

type Messages = Record<keyof typeof en, string>;
const es: Messages = {
  navAbout: "Sobre mí", navProjects: "Proyectos", navSkills: "Habilidades", navEducation: "Educación", navExperience: "Experiencia", navContact: "Contacto",
  mainNavigation: "Navegación principal", mobileNavigation: "Navegación móvil", openNavigation: "Abrir navegación", closeNavigation: "Cerrar navegación", languageSelector: "Selector de idioma", backLabel: "Mariel Obregón, volver al inicio",
  heroEyebrow: "Desarrollo web y de software", role: "Estudiante de Informática", futureRole: "Desarrolladora web y de software en formación",
  intro: "Desarrollo proyectos web con HTML, CSS y JavaScript, desde interfaces interactivas hasta aplicaciones con integración de bases de datos. Busco prácticas oportunidades para crecer como desarrolladora.",
  explore: "Explorar mis proyectos", connect: "Conectemos", location: "La Chorrera, Panamá", moreAbout: "Un poco más sobre mí",
  aboutEyebrow: "01 / Sobre mí", aboutTitle: "De una idea", aboutPrefix: "a una ", aboutEmphasis: "aplicación", aboutSuffix: ".", aboutNote: "Universidad de Panamá · Centro Regional de Panamá Oeste",
  aboutFirst: "Soy estudiante de la Licenciatura en Informática para la Gestión Educativa y Empresarial en la Universidad de Panamá, Centro Regional de Panamá Oeste.",
  aboutSecond: "Mi enfoque es el desarrollo web y de software: construir interfaces, implementar la lógica de aplicaciones, organizar información e integrar bases de datos. Mis proyectos incluyen una plataforma interactiva de programación, una aplicación de alquileres para eventos y un sitio informativo.",
  aboutThird: "Quiero seguir desarrollando mis habilidades de frontend y creación de aplicaciones mediante proyectos prácticos y trabajo colaborativo.",
  projectsLabel: "Proyectos",
  skillsEyebrow: "03 / Habilidades técnicas", skillsPrefix: "Herramientas para ", skillsEmphasis: "construir.", skillsIntro: "Tecnologías que utilizo y estudio en el desarrollo web y de software.",
  programming: "Lenguajes de programación", web: "Desarrollo web", databases: "Bases de datos", tools: "Herramientas de desarrollo", skillsPending: "Tecnologías específicas y niveles de dominio por confirmar.",
  interestsTitle: "Intereses profesionales", interestsNote: "Mi enfoque de desarrollo.", software: "Desarrollo de software", ai: "Desarrollo frontend", cybersecurity: "Desarrollo de aplicaciones", edtech: "Bases de datos", dataScience: "Soluciones digitales",
  educationEyebrow: "04 / Educación", educationTitle: "La base", educationPrefix: "para ", educationEmphasis: "crecer.", degreeStatus: "En curso", degree: "Licenciatura en Informática para la Gestión Educativa y Empresarial", university: "Universidad de Panamá", trainingTitle: "Formación complementaria", trainingDescription: "Formación complementaria mediante un programa de capacitación tecnológica.",
  experienceEyebrow: "05 / Participación tecnológica", experienceTitle: "Construir y", experiencePrefix: "aprender ", experienceEmphasis: "en equipo.", experienceIntro: "Retos en equipo que complementan mi formación en desarrollo; no son experiencia laboral formal.", eventsPending: "", participationPending: "",
  contactEyebrow: "06 / Conectemos", contactTitle: "Trabajemos en", contactPrefix: "el próximo ", contactEmphasis: "proyecto.", contactIntro: "Estoy abierta a prácticas profesionales, pasantías, oportunidades junior en desarrollo web y de software, y colaboraciones en proyectos de desarrollo.", linkedin: "LinkedIn", github: "GitHub", footerNote: "Desarrollo web y de software.", backTop: "Volver al inicio",
  notFound: "Página no encontrada", notFoundMessage: "La página que buscas no existe o ha cambiado de ubicación.", goHome: "Ir al inicio", errorTitle: "No se pudo cargar esta página", errorMessage: "Algo salió mal. Puedes intentar actualizar la página o volver al inicio.", tryAgain: "Reintentar",
  pageTitle: "Mariel Obregón — Desarrollo web y de software", description: "Portafolio de Mariel Obregón: proyectos web y de software, HTML, CSS, JavaScript y bases de datos. Estudiante de Informática en Panamá que busca prácticas y oportunidades junior.", socialDescription: "Conoce Academia Robo-B, Festín y CONAC, las tecnologías y la trayectoria de desarrollo de Mariel Obregón.",
  projectsEyebrow: "02 / Proyectos seleccionados", projectsTitle: "Ideas convertidas en ", projectsEmphasis: "software.", projectsIntro: "Tres proyectos que muestran mi trabajo en interfaces, lógica de aplicaciones y publicación web.",
  demo: "Ver proyecto", repository: "Ver código", development: "En desarrollo", publicDemo: "Demo pública", objective: "Objetivo", features: "Implementación", screenshot: "Captura real del proyecto", sourceCapture: "Captura de la versión del repositorio", pending: "En desarrollo", deployment: "Despliegue y publicación",
  roboDescription: "La versión publicada actualmente de Academia Robo-B es únicamente un prototipo web, no el producto final. Permite explorar la estructura, el diseño y algunas funcionalidades iniciales de la plataforma orientada a introducir a los niños en la programación y el pensamiento computacional. Sus funcionalidades no están completamente implementadas; el proyecto final tendrá una implementación diferente.", roboObjective: "Acercar los primeros pasos en programación a través de una aplicación interactiva.", roboFeatures: "Pantalla de inicio con Robo-B; navegación a un selector de cuatro lecciones; archivos HTML, CSS y JavaScript separados por pantalla.", roboPending: "Las actividades y la lógica de bloques de instrucciones aún no están conectadas.", roboAlt: "Pantalla inicial de Academia Robo-B con la mascota robot y el botón Inicio",
  festinDescription: "Aplicación web para alquileres de eventos, con catálogo de productos, carrito y formularios de reserva.", festinObjective: "Organizar la selección de productos, servicios y fechas de eventos en una aplicación.", festinFeatures: "Catálogo y carrito; formularios de reserva; integración de cuentas y reservas con Supabase; validación de fechas y stock en el código.", festinPending: "Se revisaron la interfaz pública y el código; el procesamiento de reservas en vivo no está verificado.", festinAlt: "Inicio de Festín con navegación, presentación de eventos y categorías de productos",
  conacDescription: "Proyecto colaborativo en equipo: sitio informativo de varias páginas para la Confederación Nacional de Asentamientos Campesinos de Panamá, desarrollado de forma conjunta con otros integrantes.", conacObjective: "Organizar el acceso a la historia, actividades e información comunitaria de la organización.", conacFeatures: "Páginas de organización, asentamientos, campañas, galería y noticias; navegación móvil; diseño responsive; publicación en GitHub Pages.", conacPending: "Participé en el desarrollo como integrante del equipo; el trabajo se realizó de manera compartida entre todos los participantes.", conacAlt: "Inicio de CONAC con el nombre de la organización, paisaje rural y presentación",
  regionalCenter: "Centro Regional de Panamá Oeste", present: "actualidad", languagesTitle: "Idiomas", spanish: "Español", english: "Inglés", native: "Nativo", upperIntermediate: "B2 · Intermedio alto",
  copaRole: "Frontend · Reto en equipo", copaDescription: "Participación frontend en una solución de monitoreo de vuelos en equipo con tecnologías de Azure, dentro de un reto de DevOps, APIs y observabilidad. Enfoque en interfaces y desarrollo colaborativo.", hackrocksRole: "Reto tecnológico colaborativo", hackrocksDescription: "Participación en un reto tecnológico, colaborando con un equipo para abordar problemas de manera conjunta.",
  availability: "Oportunidades profesionales", internship: "Prácticas y pasantías", junior: "Puestos junior web y software", collaboration: "Colaboraciones en desarrollo", resumeTitle: "Currículum",
};

export const translations: Record<Language, Messages> = { es, en };
export type TranslationKey = keyof Messages;
const LanguageContext = createContext<{ language: Language; setLanguage: (language: Language) => void; t: Messages }>({ language: defaultLanguage, setLanguage: (_language: Language) => {}, t: translations[defaultLanguage] });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(defaultLanguage);
  const t = translations[language];
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = t.pageTitle;
    const metadata: [string, string][] = [
      ['meta[name="description"]', t.description],
      ['meta[property="og:title"]', t.pageTitle],
      ['meta[property="og:description"]', t.socialDescription],
    ];
    for (const [selector, content] of metadata) document.querySelector(selector)?.setAttribute("content", content);
  }, [language, t]);
  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() { return useContext(LanguageContext); }