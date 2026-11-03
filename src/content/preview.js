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

export const experienceItems = [
    {
        key: "houm-product-engineer",
        company: "HOUM",
        stack: ["React", "TypeScript", "Spring Boot", "OpenAI API"],
    },
    {
        key: "houm-senior-frontend",
        company: "HOUM",
        stack: ["React", "TypeScript", "MUI", "Design System"],
    },
    {
        key: "minutentag-frontend",
        company: "MinutenTag",
        stack: ["React", "Redux", "Django", "Firebase", "Three.js"],
    },
    {
        key: "connectis-fullstack",
        company: "Connectis",
        stack: ["React", "TypeScript", "Spring Boot", "Vue.js"],
    },
    {
        key: "botmaker-fullstack",
        company: "Botmaker",
        stack: ["React", "WebSockets"],
    },
    {
        key: "onready-fullstack",
        company: "OnReady",
        stack: ["React Native", "React", "Spring Boot", "RabbitMQ"],
    },
];

export const projectItems = [
    {
        key: "organizer",
        images: [
            {
                src: "/static/images/organizer.jpeg",
                fit: "cover",
            },
            {
                src: "/static/images/organizer/home-dark.png",
                fit: "cover",
            },
            {
                src: "/static/images/organizer/home-light.png",
                fit: "cover",
            },
            {
                src: "/static/images/organizer/reminder-light.png",
                fit: "cover",
            },
        ],
        href: "https://lore64210.github.io/organizer/",
        stack: "React Native · Expo",
        tone: "navy",
    },
    {
        key: "spring-crud-initializr",
        images: [
            {
                src: "/static/images/spring-crud-initializr-logo.png",
                fit: "cover",
            },
            {
                src: "/static/images/spring-crud-initializr-app.png",
                fit: "cover",
            },
        ],
        href: "https://spring-crud-initializr-pkecm27xsq-uc.a.run.app/",
        stack: "React · Spring Boot",
        tone: "mint",
    },
    {
        key: "musikit",
        images: [
            {
                type: "musikit-logo",
            },
            {
                src: "/static/images/musikit.png",
                fit: "cover",
            },
            {
                src: "/static/images/musikit-home.png",
                fit: "cover",
            },
        ],
        href: "https://musikitstudio.vercel.app/#/music",
        stack: "React · Tone.js",
        tone: "ink",
        wide: true,
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
            experience: "Experiencia",
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
                "Personaje 3D de Lorenzo, de Winston's Paradigm, saludando y mandando un beso con un efecto de pixelado que oculta el rostro",
            imageAlt:
                "Personaje 3D de Lorenzo, de Winston's Paradigm, bailando con un efecto de pixelado que oculta el rostro",
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
        experience: {
            eyebrow: "03 — Experiencia",
            title: "Dónde trabajé",
            description:
                "Seis años de recorrido: desde apps mobile y APIs hasta producto, liderazgo y automatización con IA.",
            items: {
                "houm-product-engineer": {
                    role: "Product Engineer",
                    period: "Sept. 2025 — Oct. 2026",
                    bullets: [
                        "Relevé necesidades directamente con usuarios finales y las transformé en requerimientos de producto.",
                        "Planifiqué las soluciones con producto, diseño y desarrollo, y lideré su implementación end-to-end.",
                        "Construí un agente con la API de OpenAI que detecta inconsistencias entre contratos y datos, abre un ticket y adjunta una propuesta de fix en un Pull Request.",
                    ],
                },
                "houm-senior-frontend": {
                    role: "Frontend Developer SR",
                    period: "Abr. 2024 — Sept. 2025",
                    bullets: [
                        "Desarrollé vistas centralizadas para gestionar el proceso de alquileres, cubriendo gaps operativos que las herramientas existentes no resolvían.",
                        "Construí la mayor parte del frontend del sistema de comentarios y notificaciones internas que reemplazó a Slack y Google Chat.",
                        "Lideré el frontend de un sistema de asignación de tareas con panel de disponibilidad, vacaciones y licencias.",
                        "Contribuí a la migración al design system interno, reemplazando MUI en una codebase de gran escala.",
                        "Resolví deuda técnica transversal: filtros, tablas, validaciones y parseos.",
                        "Apliqué mejoras de seguridad para auditorías internas y amplié mi participación a proyectos Django.",
                    ],
                },
                "minutentag-frontend": {
                    role: "Frontend Developer SSR",
                    period: "Nov. 2022 — Abr. 2023",
                    bullets: [
                        "Desarrollé features en React para clientes de Estados Unidos, integrando la lógica de negocio con backends en Django y Firebase.",
                        "Mantuve aplicaciones y resolví bugs con Redux, React Drag & Drop y Three.js.",
                    ],
                },
                "connectis-fullstack": {
                    role: "Full Stack Developer SSR / Team Leader",
                    period: "Ago. 2021 — Sept. 2022",
                    bullets: [
                        "Lideré el relevamiento de necesidades del cliente y la definición del backlog, como nexo entre negocio y equipo técnico.",
                        "Desarrollé soluciones administrativas internas para equipos de Movistar con Spring Boot y React, incluido el formulario público de portabilidad numérica.",
                        "Construí APIs REST con Spring Boot para proyectos internos.",
                        "Impulsé la adopción de React y TypeScript en una empresa orientada a Vue.js, iniciando proyectos como referente técnico.",
                        "Di charlas internas sobre TypeScript y React para el equipo.",
                        "Crecí de Junior a Team Lead liderando equipos de 2 a 4 personas.",
                    ],
                },
                "botmaker-fullstack": {
                    role: "Full Stack Developer JR",
                    period: "Mar. 2021 — Ago. 2021",
                    bullets: [
                        "Migré componentes de clase a hooks en la plataforma interna.",
                        "Mejoré la UI de herramientas administrativas e implementé actualizaciones en tiempo real con WebSockets.",
                    ],
                },
                "onready-fullstack": {
                    role: "Full Stack Developer JR",
                    period: "Ago. 2019 — Mar. 2021",
                    bullets: [
                        "Participé en proyectos variados dando soporte al backlog y asistiendo a reuniones de relevamiento con clientes.",
                        "Colaboré en la app mobile de PaQuery con React Native: vistas de choferes, mapa con ruteo, cámara y lector de QR/barcode.",
                        "Participé del rediseño de Alternativa Teatral y de su nuevo sistema de pagos con Mercado Pago y Spring Boot.",
                        "Implementé control de sesiones simultáneas para streams en vivo con RabbitMQ.",
                    ],
                },
            },
        },
        projects: {
            eyebrow: "04 — Proyectos",
            title: "Cosas que construí",
            description:
                "Proyectos donde puse en práctica el stack y el detalle. Algunos están online; otros siguen creciendo.",
            previousImage: "Imagen anterior",
            nextImage: "Imagen siguiente",
            items: {
                organizer: {
                    title: "Organizer",
                    label: "App mobile",
                    description:
                        "Una app mobile para organizar el día que funciona 100% offline: listas, notas, fotos, audios y alarmas, todo guardado en el teléfono. Sin cuentas, sin servidores y sin analytics.",
                    link: "Ver proyecto",
                },
                "spring-crud-initializr": {
                    title: "Spring CRUD Initializr",
                    label: "Herramienta para devs",
                    description:
                        "Una herramienta para generar APIs CRUD con Spring a partir de tus entidades: servicios, controladores, tests y schema.sql, listos para arrancar.",
                    link: "Ver proyecto",
                },
                musikit: {
                    title: "Musikit",
                    label: "Estudio de música",
                    description:
                        "Un estudio para crear música y exportar archivos de audio a partir de lo que compones. Todo el front está hecho con React y Tone.js.",
                    link: "Ver proyecto",
                },
            },
        },
        playground: {
            eyebrow: "05 — Playground",
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
            eyebrow: "05 — Playground",
            back: "Volver al playground",
            notes: "Cómo funciona",
            secondExperiment: "Segundo experimento",
            ballTitle: "Ball Ecosystem",
            ballLead: "Dos experimentos con agentes que se mueven, se conectan y evolucionan.",
        },
        contact: {
            eyebrow: "06 — Contacto",
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
            experience: "Experience",
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
                "3D character of Lorenzo from Winston's Paradigm waving and blowing a kiss with a pixelated effect that hides his face",
            imageAlt:
                "3D character of Lorenzo from Winston's Paradigm dancing with a pixelated effect that hides his face",
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
        experience: {
            eyebrow: "03 — Experience",
            title: "Where I've worked",
            description:
                "Six years across mobile apps, APIs, product work, leadership and AI automation.",
            items: {
                "houm-product-engineer": {
                    role: "Product Engineer",
                    period: "Sep. 2025 — Oct. 2026",
                    bullets: [
                        "Gathered needs directly from end users and turned them into product requirements.",
                        "Planned solutions with product, design and engineering, and led their end-to-end implementation.",
                        "Built an OpenAI API agent that detects inconsistencies between contracts and system data, opens a support ticket and attaches a proposed fix in a Pull Request.",
                    ],
                },
                "houm-senior-frontend": {
                    role: "Senior Frontend Developer",
                    period: "Apr. 2024 — Sep. 2025",
                    bullets: [
                        "Built centralized views to manage the rental process, closing operational gaps existing tools did not cover.",
                        "Built most of the frontend of an internal comments and notifications system, replacing Slack and Google Chat.",
                        "Led the frontend of a task assignment system with an admin panel for availability, vacations and leaves.",
                        "Contributed to the migration to the in-house design system, progressively replacing MUI in a large-scale codebase.",
                        "Reduced technical debt across the platform: filters, tables, validations and parsing.",
                        "Applied security improvements for internal audits and extended my work to Django backend projects.",
                    ],
                },
                "minutentag-frontend": {
                    role: "Semi-Senior Frontend Developer",
                    period: "Nov. 2022 — Apr. 2023",
                    bullets: [
                        "Built React features for US clients, integrating business logic with Django and Firebase backends.",
                        "Maintained applications and fixed bugs using Redux, React Drag & Drop and Three.js.",
                    ],
                },
                "connectis-fullstack": {
                    role: "Semi-Senior Full Stack Developer / Team Leader",
                    period: "Aug. 2021 — Sep. 2022",
                    bullets: [
                        "Led client requirements gathering and backlog definition, acting as the link between business and engineering.",
                        "Built internal admin solutions for several Movistar teams with Spring Boot and React, including the public number portability form.",
                        "Developed REST APIs with Spring Boot for internal projects.",
                        "Drove React and TypeScript adoption in a Vue.js-oriented company, starting projects as technical referent.",
                        "Gave internal talks on TypeScript and React.",
                        "Grew from Junior developer to Team Lead, leading teams of 2 to 4 people.",
                    ],
                },
                "botmaker-fullstack": {
                    role: "Junior Full Stack Developer",
                    period: "Mar. 2021 — Aug. 2021",
                    bullets: [
                        "Migrated class components to hooks on the internal platform.",
                        "Improved admin UI and implemented real-time updates with WebSockets.",
                    ],
                },
                "onready-fullstack": {
                    role: "Junior Full Stack Developer",
                    period: "Aug. 2019 — Mar. 2021",
                    bullets: [
                        "Supported the backlog across projects and joined client requirements meetings.",
                        "Contributed to the PaQuery mobile app with React Native: driver views, routing map, camera and QR/barcode reader.",
                        "Helped redesign Alternativa Teatral and build its new payment system with Mercado Pago and Spring Boot.",
                        "Implemented concurrent session control for live streams with RabbitMQ.",
                    ],
                },
            },
        },
        projects: {
            eyebrow: "04 — Projects",
            title: "Things I've built",
            description:
                "Projects where I put the stack and the details into practice. Some are online; others keep growing.",
            previousImage: "Previous image",
            nextImage: "Next image",
            items: {
                organizer: {
                    title: "Organizer",
                    label: "Mobile app",
                    description:
                        "A mobile app to organize your day that works 100% offline: lists, notes, photos, audio and alarms, all stored on your phone. No accounts, no servers and no analytics.",
                    link: "View project",
                },
                "spring-crud-initializr": {
                    title: "Spring CRUD Initializr",
                    label: "Developer tool",
                    description:
                        "A tool to generate CRUD APIs with Spring from your entities: services, controllers, tests and schema.sql, ready to start.",
                    link: "View project",
                },
                musikit: {
                    title: "Musikit",
                    label: "Music studio",
                    description:
                        "A studio to create music and export audio files from what you compose. The whole front end is built with React and Tone.js.",
                    link: "View project",
                },
            },
        },
        playground: {
            eyebrow: "05 — Playground",
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
            eyebrow: "05 — Playground",
            back: "Back to playground",
            notes: "How it works",
            secondExperiment: "Second experiment",
            ballTitle: "Ball Ecosystem",
            ballLead: "Two experiments with agents that move, connect and evolve.",
        },
        contact: {
            eyebrow: "06 — Contact",
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
