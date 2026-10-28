export const previewLinks = {
    github: "https://github.com/lore64210",
    linkedin: "https://www.linkedin.com/in/lorenzo-matias-lopez/",
    email: "mailto:lore64210@gmail.com",
};

export const skillGroups = [
    {
        key: "frontend",
        items: [
            "JavaScript",
            "TypeScript",
            "React",
            "Next.js",
            "Vue.js",
            "HTML",
            "CSS",
            "Sass",
        ],
    },
    {
        key: "backend",
        items: ["Node.js", "Java", "Spring Boot", "Python", "Django"],
    },
    {
        key: "data",
        items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
    },
    {
        key: "cloud",
        items: ["Docker", "AWS", "GCP", "Vercel", "Jenkins", "Git"],
    },
];

export const projectItems = [
    {
        key: "organizer",
        image: "/static/images/organizer.jpeg",
        href: "https://play.google.com/store/apps/details?id=com.lore64210.Organizer",
        stack: "React Native",
        fit: "cover",
        tone: "navy",
    },
    {
        key: "spring-crud-initializr",
        image: "/static/images/spring-crud-initializr.png",
        href: "https://spring-crud-initializr-pkecm27xsq-uc.a.run.app/",
        stack: "React · Spring Boot",
        fit: "contain",
        tone: "mint",
    },
];

export const playgroundItems = [
    {
        key: "maze",
        image: "/static/images/maze.gif",
        href: "maze",
    },
    {
        key: "balls",
        image: "/static/images/balls.gif",
        href: "balls",
    },
    {
        key: "path-finder",
        image: "/static/images/path-finder.gif",
        href: "path-finder",
        tone: "light",
    },
    {
        key: "terrain",
        image: "/static/images/terrain.gif",
        href: "terrain",
    },
];

const copy = {
    es: {
        nav: {
            home: "Inicio",
            about: "Sobre mí",
            skills: "Skills",
            projects: "Proyectos",
            playground: "Playground",
            contact: "Contacto",
            cv: "CV",
            menu: "Abrir menú",
            language: "EN",
        },
        cvOptions: {
            es: "Español (ES)",
            en: "English (EN)",
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
                "Personaje 3D de Lorenzo, de Winston's Paradigm, de pie con distintas animaciones idle y un efecto de pixelado que oculta el rostro",
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
            homeImageAlt:
                "Personaje 3D de Lorenzo, de Winston's Paradigm, bailando con un efecto de pixelado que oculta el rostro",
            imageAlt:
                "Personaje 3D de Lorenzo, de Winston's Paradigm, saludando y mandando un beso con un efecto de pixelado que oculta el rostro",
        },
        aboutPage: {
            eyebrow: "01 — Sobre mí",
            title: "Un poco más sobre mí",
            lead: "Soy Lorenzo, desarrollador full stack. Me gusta construir productos web que se sientan simples, rápidos y cuidados, y entender todo lo que pasa entre una idea y algo que funciona.",
            back: "Volver al inicio",
            meta: [
                "Full Stack Developer",
                "React · Next · Spring",
            ],
            sections: [
                {
                    title: "Cómo empecé",
                    paragraphs: [
                        "Empecé a programar por curiosidad, casi como un juego. La posibilidad de crear algo desde cero me enganchó y con el tiempo se transformó en mi forma de trabajar.",
                        "Fui probando herramientas y lenguajes a medida que los proyectos lo pedían. Esa costumbre de aprender haciendo sigue siendo la forma en la que me muevo hoy.",
                    ],
                },
                {
                    title: "Cómo trabajo",
                    paragraphs: [
                        "Me muevo entre el frontend y el backend: React y Next para construir interfaces, y Spring Boot, Django o Node para resolver la lógica. Me interesa entender el producto completo, no solo la parte que me toca.",
                        "Trato de escribir código claro, cuidar los detalles de la experiencia y dejar las cosas un poco mejor de como las encontré.",
                    ],
                },
                {
                    title: "Lo que me importa",
                    paragraphs: [
                        "Me importa que las cosas funcionen, pero también cómo se sienten. Disfruto trabajar con gente que se toma en serio lo que hace, comparte lo que sabe y se anima a probar.",
                        "No me considero la persona más rápida ni la más original; lo que sí tengo es constancia, curiosidad y ganas de que cada proyecto quede bien.",
                    ],
                },
            ],
            ctaTitle: "¿Seguimos la charla?",
            ctaText: "Si tenés una idea, una propuesta o simplemente ganas de escribirme, estoy del otro lado.",
            cta: "Hablemos",
        },
        skills: {
            eyebrow: "02 — Skills",
            title: "Herramientas con las que trabajo",
            description:
                "Un stack que mezcla frontend, backend y despliegue. Me gusta entender el producto de punta a punta.",
            groups: {
                frontend: "Frontend",
                backend: "Backend",
                data: "Datos",
                cloud: "Cloud & DevOps",
            },
        },
        projects: {
            eyebrow: "03 — Proyectos",
            title: "Cosas que construí",
            description:
                "Proyectos donde puse en práctica el stack y el detalle. Algunos están online; otros siguen creciendo.",
            items: {
                organizer: {
                    title: "Organizer",
                    label: "App mobile",
                    description:
                        "Una app mobile para organizar el día: tareas, fotos y audios en un solo lugar. Nació como un proyecto para aprender React Native y terminó siendo una app publicada.",
                    link: "Ver en Play Store",
                },
                "spring-crud-initializr": {
                    title: "Spring CRUD Initializr",
                    label: "Herramienta para devs",
                    description:
                        "Una herramienta para generar APIs CRUD con Spring a partir de tus entidades: servicios, controladores, tests y schema.sql, listos para arrancar.",
                    link: "Ver proyecto",
                },
            },
        },
        playground: {
            eyebrow: "04 — Playground",
            title: "Experimentos visuales",
            description:
                "Mini proyectos con p5.js para probar ideas, algoritmos y movimiento.",
            items: {
                maze: {
                    title: "Maze Generator",
                    description: "Laberintos generados con grafos y búsqueda.",
                },
                balls: {
                    title: "Ball Ecosystem",
                    description: "Agentes que se mueven, comen y evolucionan.",
                },
                "path-finder": {
                    title: "Path Finder",
                    description: "A* encontrando el camino más corto.",
                },
                terrain: {
                    title: "Terrain",
                    description: "Terrenos generados con ruido y geometría.",
                },
            },
        },
        playgroundPage: {
            eyebrow: "04 — Playground",
            back: "Volver al playground",
            notes: "Cómo funciona",
            secondExperiment: "Segundo experimento",
            ballTitle: "Ball Ecosystem",
            ballLead: "Dos experimentos con agentes que se mueven, se conectan y evolucionan.",
        },
        contact: {
            eyebrow: "05 — Contacto",
            title: "¿Construimos algo?",
            description:
                "Si tenés una idea, una propuesta o simplemente ganas de charlar, escribime. Me gusta escuchar qué está haciendo la gente.",
            cards: {
                project: {
                    title: "¿Tenés un proyecto?",
                    text: "Contame qué tenés en mente y vemos cómo encararlo.",
                    cta: "Escribime",
                },
                connect: {
                    title: "¿Conectamos?",
                    text: "Estoy en GitHub y LinkedIn. Siempre está bueno charlar con gente que hace cosas.",
                    cta: "Ver perfiles",
                },
                cv: {
                    title: "¿Querés ver mi CV?",
                    text: "Está en español e inglés, listo para descargar.",
                    cta: "Descargar CV",
                },
            },
            emailLabel: "O escribime directo a",
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
            skills: "Skills",
            projects: "Projects",
            playground: "Playground",
            contact: "Contact",
            cv: "Resume",
            menu: "Open menu",
            language: "ES",
        },
        cvOptions: {
            es: "Español (ES)",
            en: "English (EN)",
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
                "3D character of Lorenzo from Winston's Paradigm standing with different idle animations and a pixelated effect that hides his face",
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
            homeImageAlt:
                "3D character of Lorenzo from Winston's Paradigm dancing with a pixelated effect that hides his face",
            imageAlt:
                "3D character of Lorenzo from Winston's Paradigm waving and blowing a kiss with a pixelated effect that hides his face",
        },
        aboutPage: {
            eyebrow: "01 — About",
            title: "A little more about me",
            lead: "I'm Lorenzo, a full stack developer. I like building web products that feel simple, fast and carefully made, and understanding everything that happens between an idea and something that works.",
            back: "Back to home",
            meta: [
                "Full Stack Developer",
                "React · Next · Spring",
            ],
            sections: [
                {
                    title: "How I started",
                    paragraphs: [
                        "I started programming out of curiosity, almost like a game. The possibility of creating something from scratch hooked me, and over time it became the way I work.",
                        "I kept trying tools and languages as projects demanded them. That habit of learning by building is still how I move today.",
                    ],
                },
                {
                    title: "How I work",
                    paragraphs: [
                        "I move between frontend and backend: React and Next to build interfaces, and Spring Boot, Django or Node to solve the logic. I care about understanding the whole product, not just the part I'm working on.",
                        "I try to write clear code, take care of the details of the experience, and leave things a little better than I found them.",
                    ],
                },
                {
                    title: "What matters to me",
                    paragraphs: [
                        "I care about whether things work, but also how they feel. I enjoy working with people who take what they do seriously, share what they know, and are willing to try.",
                        "I'm not the fastest or the most original person; what I do have is persistence, curiosity and the desire to make every project feel right.",
                    ],
                },
            ],
            ctaTitle: "Shall we keep talking?",
            ctaText: "If you have an idea, a proposal, or just want to write to me, I'm around.",
            cta: "Let's talk",
        },
        skills: {
            eyebrow: "02 — Skills",
            title: "Tools I work with",
            description:
                "A stack that blends frontend, backend and deployment. I like understanding the product end to end.",
            groups: {
                frontend: "Frontend",
                backend: "Backend",
                data: "Data",
                cloud: "Cloud & DevOps",
            },
        },
        projects: {
            eyebrow: "03 — Projects",
            title: "Things I've built",
            description:
                "Projects where I put the stack and the details into practice. Some are online; others keep growing.",
            items: {
                organizer: {
                    title: "Organizer",
                    label: "Mobile app",
                    description:
                        "A mobile app to organize your day: tasks, photos and audio in one place. It started as a React Native learning project and ended up as a published app.",
                    link: "View on Play Store",
                },
                "spring-crud-initializr": {
                    title: "Spring CRUD Initializr",
                    label: "Developer tool",
                    description:
                        "A tool to generate CRUD APIs with Spring from your entities: services, controllers, tests and schema.sql, ready to start.",
                    link: "View project",
                },
            },
        },
        playground: {
            eyebrow: "04 — Playground",
            title: "Visual experiments",
            description:
                "Small p5.js projects to test ideas, algorithms and motion.",
            items: {
                maze: {
                    title: "Maze Generator",
                    description: "Mazes generated with graphs and search.",
                },
                balls: {
                    title: "Ball Ecosystem",
                    description: "Agents that move, eat and evolve.",
                },
                "path-finder": {
                    title: "Path Finder",
                    description: "A* finding the shortest path.",
                },
                terrain: {
                    title: "Terrain",
                    description: "Terrain generated with noise and geometry.",
                },
            },
        },
        playgroundPage: {
            eyebrow: "04 — Playground",
            back: "Back to playground",
            notes: "How it works",
            secondExperiment: "Second experiment",
            ballTitle: "Ball Ecosystem",
            ballLead: "Two experiments with agents that move, connect and evolve.",
        },
        contact: {
            eyebrow: "05 — Contact",
            title: "Let's build something",
            description:
                "If you have an idea, a proposal, or just want to chat, write to me. I like hearing what people are building.",
            cards: {
                project: {
                    title: "Have a project?",
                    text: "Tell me what you have in mind and let's see how to approach it.",
                    cta: "Write to me",
                },
                connect: {
                    title: "Let's connect?",
                    text: "I'm on GitHub and LinkedIn. It's always good to talk to people who build things.",
                    cta: "See profiles",
                },
                cv: {
                    title: "Want to see my resume?",
                    text: "It's available in Spanish and English, ready to download.",
                    cta: "Download resume",
                },
            },
            emailLabel: "Or email me directly at",
        },
        footer: {
            tagline: "Building things with intention.",
            rights: "All rights reserved.",
        },
    },
};

export const getPreviewCopy = (lang) => copy[lang] ?? copy.es;
