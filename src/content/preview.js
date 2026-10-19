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
