import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Language = "es" | "en";
export const defaultLanguage: Language = "es";

const en = {
  navAbout: "About", navProjects: "Projects", navSkills: "Skills", navEducation: "Education", navExperience: "Experience", navContact: "Contact",
  mainNavigation: "Main navigation", mobileNavigation: "Mobile navigation", openNavigation: "Open navigation", closeNavigation: "Close navigation", languageSelector: "Language selector", backLabel: "Mariel Obregón, back to top",
  heroEyebrow: "Curiosity meets purpose", role: "Information Technology Student", futureRole: "Future Software Developer",
  intro: "I’m drawn to the possibilities where technology, education, and real-world needs meet. I’m learning to turn that curiosity into thoughtful digital solutions that make a difference.",
  explore: "Explore my projects", connect: "Let's connect", location: "La Chorrera, Panama", moreAbout: "A little more about me",
  aboutEyebrow: "01 / About me", aboutTitle: "A curious mind.", aboutPrefix: "A ", aboutEmphasis: "purposeful", aboutSuffix: " path.", aboutNote: "Learning today. Building for tomorrow.",
  aboutFirst: "I’m an Information Technology student at the University of Panama, pursuing a Bachelor’s degree in Information Technology for Educational and Business Management.",
  aboutSecond: "I enjoy exploring new technologies, developing digital projects, and finding creative ways to solve problems. My academic and personal journey has brought me into technology challenges, educational projects, and learning programs—experiences that continue to shape the developer I hope to become.",
  aboutThird: "My goal is to create useful, thoughtful solutions that connect people with the possibilities of technology.",
  projectsLabel: "Projects",
  skillsEyebrow: "03 / Technical skills", skillsPrefix: "Always ", skillsEmphasis: "learning.", skillsIntro: "A growing technical foundation, guided by curiosity and continuous practice.",
  programming: "Programming languages", web: "Web development", databases: "Databases", tools: "Development tools", skillsPending: "Specific technologies and proficiency to be confirmed.",
  interestsTitle: "Areas of interest", interestsNote: "Exploring, not claiming expertise.", software: "Software development", ai: "Artificial intelligence", cybersecurity: "Cybersecurity", edtech: "Educational technology", dataScience: "Data science",
  educationEyebrow: "04 / Education", educationTitle: "The foundation", educationPrefix: "for ", educationEmphasis: "what’s next.", degreeStatus: "Currently pursuing", degree: "Bachelor’s in Information Technology for Educational and Business Management", university: "University of Panama", trainingTitle: "Courses, certifications & additional training", trainingPending: "Details to be added once confirmed.",
  experienceEyebrow: "05 / Experience & technology events", experienceTitle: "Learning beyond", experiencePrefix: "the ", experienceEmphasis: "classroom.", experienceIntro: "Technology challenges and learning programs, separate from formal employment.", eventsPending: "Events mentioned for this portfolio; participation details, dates, and roles are awaiting confirmation.", participationPending: "Participation & learning details to be confirmed.",
  contactEyebrow: "06 / Let's connect", contactTitle: "Good things start with", contactPrefix: "a ", contactEmphasis: "conversation.", contactIntro: "I’d love to connect with people who share a curiosity for technology, education, and meaningful ideas.", linkedin: "LinkedIn", github: "GitHub", footerNote: "Made with curiosity & intention.", backTop: "Back to top",
  notFound: "Page not found", notFoundMessage: "The page you're looking for doesn't exist or has been moved.", goHome: "Go home", errorTitle: "This page didn't load", errorMessage: "Something went wrong on our end. You can try refreshing or head back home.", tryAgain: "Try again",
  pageTitle: "Mariel Obregón — Technology with purpose", description: "Meet Mariel Obregón, Information Technology student in Panama exploring software development, educational technology, and purposeful digital solutions.", socialDescription: "Explore Mariel's academic journey and interests in technology and software development.",
};

type Messages = Record<keyof typeof en, string>;
const es: Messages = {
  navAbout: "Sobre mí", navProjects: "Proyectos", navSkills: "Habilidades", navEducation: "Educación", navExperience: "Experiencia", navContact: "Contacto",
  mainNavigation: "Navegación principal", mobileNavigation: "Navegación móvil", openNavigation: "Abrir navegación", closeNavigation: "Cerrar navegación", languageSelector: "Selector de idioma", backLabel: "Mariel Obregón, volver al inicio",
  heroEyebrow: "Curiosidad con propósito", role: "Estudiante de Tecnología de la Información", futureRole: "Futura desarrolladora de software",
  intro: "Me inspiran las posibilidades que surgen cuando la tecnología, la educación y las necesidades reales se encuentran. Estoy aprendiendo a transformar esa curiosidad en soluciones digitales con propósito que marquen la diferencia.",
  explore: "Explorar mis proyectos", connect: "Conectemos", location: "La Chorrera, Panamá", moreAbout: "Un poco más sobre mí",
  aboutEyebrow: "01 / Sobre mí", aboutTitle: "Una mente curiosa.", aboutPrefix: "Un camino ", aboutEmphasis: "con propósito", aboutSuffix: ".", aboutNote: "Aprendiendo hoy. Construyendo el mañana.",
  aboutFirst: "Soy estudiante de Tecnología de la Información en la Universidad de Panamá, donde curso la Licenciatura en Tecnología de la Información para la Gestión Educativa y Empresarial.",
  aboutSecond: "Disfruto explorar nuevas tecnologías, desarrollar proyectos digitales y encontrar formas creativas de resolver problemas. Mi trayectoria académica y personal me ha permitido participar en retos tecnológicos, proyectos educativos y programas de aprendizaje: experiencias que siguen formando a la desarrolladora que aspiro a ser.",
  aboutThird: "Mi objetivo es crear soluciones útiles y bien pensadas que conecten a las personas con las posibilidades de la tecnología.",
  projectsLabel: "Proyectos",
  skillsEyebrow: "03 / Habilidades técnicas", skillsPrefix: "Siempre ", skillsEmphasis: "aprendiendo.", skillsIntro: "Una base técnica en crecimiento, guiada por la curiosidad y la práctica continua.",
  programming: "Lenguajes de programación", web: "Desarrollo web", databases: "Bases de datos", tools: "Herramientas de desarrollo", skillsPending: "Tecnologías específicas y niveles de dominio por confirmar.",
  interestsTitle: "Áreas de interés", interestsNote: "Intereses en exploración, no experiencia profesional.", software: "Desarrollo de software", ai: "Inteligencia artificial", cybersecurity: "Ciberseguridad", edtech: "Tecnología educativa", dataScience: "Ciencia de datos",
  educationEyebrow: "04 / Educación", educationTitle: "La base", educationPrefix: "para ", educationEmphasis: "lo que viene.", degreeStatus: "En curso", degree: "Licenciatura en Tecnología de la Información para la Gestión Educativa y Empresarial", university: "Universidad de Panamá", trainingTitle: "Cursos, certificaciones y formación adicional", trainingPending: "Se añadirán los detalles una vez confirmados.",
  experienceEyebrow: "05 / Experiencia y eventos tecnológicos", experienceTitle: "Aprender más allá", experiencePrefix: "del ", experienceEmphasis: "aula.", experienceIntro: "Retos tecnológicos y programas de aprendizaje, distintos de la experiencia laboral formal.", eventsPending: "Eventos mencionados para este portafolio; los detalles de participación, las fechas y los roles están pendientes de confirmación.", participationPending: "Detalles de participación y aprendizaje por confirmar.",
  contactEyebrow: "06 / Conectemos", contactTitle: "Las buenas ideas empiezan", contactPrefix: "con una ", contactEmphasis: "conversación.", contactIntro: "Me encantaría conectar con personas que compartan la curiosidad por la tecnología, la educación y las ideas con propósito.", linkedin: "LinkedIn", github: "GitHub", footerNote: "Hecho con curiosidad y propósito.", backTop: "Volver al inicio",
  notFound: "Página no encontrada", notFoundMessage: "La página que buscas no existe o ha cambiado de ubicación.", goHome: "Ir al inicio", errorTitle: "No se pudo cargar esta página", errorMessage: "Algo salió mal. Puedes intentar actualizar la página o volver al inicio.", tryAgain: "Reintentar",
  pageTitle: "Mariel Obregón — Tecnología con propósito", description: "Conoce a Mariel Obregón, estudiante de Tecnología de la Información en Panamá que explora el desarrollo de software, la tecnología educativa y las soluciones digitales con propósito.", socialDescription: "Descubre la trayectoria académica de Mariel y sus intereses en tecnología y desarrollo de software.",
};

export const translations: Record<Language, Messages> = { es, en };
export type TranslationKey = keyof Messages;
const LanguageContext = createContext({ language: defaultLanguage, setLanguage: (_language: Language) => {}, t: translations[defaultLanguage] });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(defaultLanguage);
  const t = translations[language];
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = t.pageTitle;
    for (const [selector, content] of [
      ['meta[name="description"]', t.description],
      ['meta[property="og:title"]', t.pageTitle],
      ['meta[property="og:description"]', t.socialDescription],
    ]) document.querySelector(selector)?.setAttribute("content", content);
  }, [language, t]);
  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() { return useContext(LanguageContext); }