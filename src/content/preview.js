export const previewLinks = {
    github: "https://github.com/lore64210",
    linkedin: "https://www.linkedin.com/in/lorenzo-matias-lopez/",
    email: "mailto:lore64210@gmail.com",
};

const copy = {
    es: {
        nav: {
            home: "Inicio",
            about: "Sobre mí",
            projects: "Proyectos",
            playground: "Playground",
            contact: "Contacto",
            cv: "CV",
            menu: "Abrir menú",
            language: "EN",
        },
        hero: {
            eyebrow: "Hola, soy",
            name: "Lorenzo López",
            role: "Desarrollador Full Stack",
            description:
                "Construyo experiencias web claras, rápidas y con personalidad. Me gusta convertir ideas en productos que se sienten bien y cuidar cada detalle del camino.",
            projectsCta: "Ver proyectos",
            cvCta: "Descargar CV",
            socialLabel: "Encontrame en",
            imageAlt:
                "Ilustración low-poly de Lorenzo saltando con los brazos levantados",
        },
        about: {
            eyebrow: "01 — Sobre mí",
            title: "Un poco sobre mí",
            intro:
                "Tres coordenadas para entender de dónde vengo, dónde estoy y para dónde voy.",
            pastTitle: "Pasado",
            past:
                "Empecé a programar por curiosidad, casi como un juego. Con el tiempo se convirtió en la forma en que pienso, resuelvo problemas y construyo cosas.",
            presentTitle: "Presente",
            present:
                "Hoy trabajo como desarrollador full stack. Me muevo entre React y Next en el frontend, y Spring Boot, Django o Node en el backend. Disfruto tanto el detalle visual como entender el producto completo.",
            futureTitle: "Futuro",
            future:
                "Quiero seguir construyendo productos que la gente disfrute usar, aprender herramientas nuevas y formar parte de equipos que cuiden lo que hacen.",
            more: "Leer más sobre mí",
            imageAlt:
                "Ilustración low-poly de Lorenzo apoyado con las manos en los bolsillos",
        },
        footer: {
            tagline: "Construyendo cosas con intención.",
            rights: "Todos los derechos reservados.",
        },
    },
    en: {
        nav: {
            home: "Home",
            about: "About",
            projects: "Projects",
            playground: "Playground",
            contact: "Contact",
            cv: "Resume",
            menu: "Open menu",
            language: "ES",
        },
        hero: {
            eyebrow: "Hi, I'm",
            name: "Lorenzo López",
            role: "Full Stack Developer",
            description:
                "I build clear, fast web experiences with personality. I enjoy turning ideas into products that feel right and taking care of every detail along the way.",
            projectsCta: "View projects",
            cvCta: "Download resume",
            socialLabel: "Find me on",
            imageAlt:
                "Low-poly illustration of Lorenzo jumping with his arms raised",
        },
        about: {
            eyebrow: "01 — About",
            title: "A little about me",
            intro:
                "Three coordinates to understand where I come from, where I am, and where I'm going.",
            pastTitle: "Past",
            past:
                "I started programming out of curiosity, almost like a game. Over time it became the way I think, solve problems, and build things.",
            presentTitle: "Present",
            present:
                "Today I work as a full stack developer. I move between React and Next on the frontend, and Spring Boot, Django or Node on the backend. I enjoy both the visual detail and understanding the whole product.",
            futureTitle: "Future",
            future:
                "I want to keep building products people enjoy using, learn new tools, and be part of teams that care about what they make.",
            more: "Read more about me",
            imageAlt:
                "Low-poly illustration of Lorenzo leaning with his hands in his pockets",
        },
        footer: {
            tagline: "Building things with intention.",
            rights: "All rights reserved.",
        },
    },
};

export const getPreviewCopy = (lang) => copy[lang] ?? copy.es;
