/**
 * Contenido de los CV en español e inglés.
 *
 * Vive separado del generador para poder corregir texto sin tocar el HTML ni
 * el CSS. El build de `cv/build-cv.mjs` lo usa para producir los dos PDFs.
 */

const contact = (lang) => ({
    location:
        lang === "es"
            ? "Buenos Aires, Argentina · Abierto a trabajo remoto"
            : "Buenos Aires, Argentina · Open to remote work",
    phone: "+54 11 5690-4930",
    email: "lore64210@gmail.com",
    linkedin: "https://www.linkedin.com/in/lorenzo-matias-lopez/",
    linkedinLabel: "linkedin.com/in/lorenzo-matias-lopez",
    portfolio: `https://lorenzomatiaslopez.vercel.app/${lang}`,
    portfolioLabel: `lorenzomatiaslopez.vercel.app/${lang}`,
    github: "https://github.com/lore64210",
    githubLabel: "github.com/lore64210",
});

export const CV = {
    es: {
        name: "Lorenzo Matías López",
        title: "Desarrollador Full Stack Senior | Product Engineer",
        contact: contact("es"),
        summary:
            "Desarrollador Full Stack Senior con más de 6 años de experiencia, especializado en React y TypeScript con base sólida en Java / Spring Boot. En mi último rol asumí la posición de Product Engineer, liderando el ciclo completo de producto: relevamiento con usuarios, planificación e implementación end-to-end, incorporando herramientas de IA en el flujo de desarrollo. Me desempeño mejor en proyectos de gran escala donde la heterogeneidad tecnológica y la velocidad de entrega son el desafío central. Trabajo de forma autónoma y con foco en dejar el código mejor de como lo encontré.",
        sections: {
            summary: "Resumen profesional",
            skills: "Habilidades técnicas",
            experience: "Experiencia laboral",
            education: "Educación",
            languages: "Idiomas",
        },
        skills: [
            [
                "Frontend",
                "React (Hooks, Context, Next.js), TypeScript, JavaScript (ES6+), Redux, TanStack Query, Zustand",
            ],
            [
                "Backend",
                "Java (Spring Boot), APIs REST, arquitectura de microservicios, Node.js (Express), Python (Django)",
            ],
            [
                "IA aplicada",
                "integración de la API de OpenAI para agentes de automatización, Cursor y Claude como asistentes de desarrollo full stack",
            ],
            ["Testing", "Vitest, React Testing Library, Cypress, Jest"],
            ["Bases de datos", "PostgreSQL, MongoDB, MySQL, Oracle, Redis"],
            [
                "Cloud & DevOps",
                "AWS (S3, Lambda, RDS), Docker, CI/CD (GitLab, GitHub Actions), Jenkins, Firebase",
            ],
            [
                "Arquitecturas orientadas a eventos",
                "RabbitMQ, conocimiento de conceptos y patrones de Kafka",
            ],
            ["Mobile", "React Native"],
            ["Otros", "GraphQL (conocimiento básico)"],
        ],
        experience: [
            {
                company: "HOUM",
                context: "Plataforma de alquileres",
                roles: [
                    {
                        title: "Product Engineer",
                        dates: "Sep. 2025 – Oct. 2026",
                        bullets: [
                            "Relevé necesidades y requerimientos de producto directamente con usuarios finales.",
                            "Planifiqué las soluciones junto al equipo (producto, diseño y desarrollo) y lideré su implementación end-to-end, incorporando Cursor y Claude para ampliar mi alcance técnico y acelerar la entrega.",
                            "Desarrollé un sistema de automatización para la corrección de incidentes usando la API de OpenAI: un agente que detecta incongruencias entre los datos del sistema y los documentos de contratos generados, levanta un ticket de soporte y adjunta una propuesta de fix en un Pull Request.",
                            "Implementé múltiples mejoras en flujos de trabajo existentes, automatizando tareas manuales y reduciendo la intervención operativa de los empleados dentro de la plataforma.",
                        ],
                    },
                    {
                        title: "Desarrollador Frontend Senior",
                        dates: "Abr. 2024 – Sep. 2025",
                        bullets: [
                            "Relevé e implementé vistas centralizadas para la gestión del proceso de alquileres, resolviendo gaps operacionales que las herramientas existentes no cubrían.",
                            "Desarrollé la mayor parte del frontend de un sistema de comentarios y notificaciones internas, reemplazando el uso de Slack y Google Chat como canal de comunicación operacional.",
                            "Lideré el desarrollo frontend de un sistema de asignación de tareas con panel administrativo para configurar disponibilidad, vacaciones y licencias por empleado.",
                            "Apliqué mejoras de seguridad en la plataforma administrativa para cumplir con auditorías internas.",
                            "Contribuí activamente a la migración del sistema de diseño propio de la empresa, reemplazando progresivamente MUI en una codebase de gran escala.",
                            "Amplié mi participación a proyectos Django en el backend, colaborando en el desarrollo de APIs y servicios.",
                        ],
                    },
                ],
            },
            {
                type: "break",
                company: "Año sabático",
                dates: "Abr. 2023 – Abr. 2024",
                note: "Me tomé un año sabático con ahorros propios para descansar y recargar energía antes de retomar mi carrera.",
            },
            {
                company: "MinutenTag",
                context: "Agencia digital",
                roles: [
                    {
                        title: "Desarrollador Frontend Semi-Senior",
                        dates: "Nov. 2022 – Abr. 2023",
                        bullets: [
                            "Desarrollé features con React para clientes de Estados Unidos, integrando lógica de negocio con backends en Django y Firebase.",
                            "Mantuve aplicaciones y corregí bugs utilizando Redux, React Drag & Drop y Three.js.",
                        ],
                    },
                ],
            },
            {
                company: "Connectis",
                context: "Consultora tecnológica",
                roles: [
                    {
                        title: "Desarrollador Full Stack Semi-Senior / Team Leader",
                        dates: "Ago. 2021 – Sep. 2022",
                        bullets: [
                            "Coordiné el relevamiento de necesidades del cliente y la conformación del backlog, actuando como nexo entre el negocio y el equipo técnico.",
                            "Desarrollé y mantuve soluciones administrativas internas para distintos equipos de Movistar, incluyendo el formulario público de portabilidad numérica, con Spring Boot y React; también desarrollé APIs REST para proyectos internos.",
                            "Impulsé la adopción de React y TypeScript en una empresa mayormente orientada a Vue.js, iniciando proyectos con React + Spring Boot como referente técnico.",
                            "Di charlas técnicas internas sobre TypeScript y React para el equipo de desarrollo.",
                            "Crecí de desarrollador Junior a Team Lead dentro de la misma empresa, liderando equipos de 2 a 4 personas.",
                        ],
                    },
                ],
            },
            {
                company: "Botmaker",
                context: "Automatización de mensajería",
                roles: [
                    {
                        title: "Desarrollador Full Stack Junior",
                        dates: "Mar. 2021 – Ago. 2021",
                        bullets: [
                            "Migré React class components a hooks en la plataforma interna.",
                            "Implementé mejoras de UI en herramientas administrativas y actualizaciones en tiempo real usando WebSockets.",
                        ],
                    },
                ],
            },
            {
                company: "OnReady",
                context: "E-commerce automotriz",
                roles: [
                    {
                        title: "Desarrollador Full Stack Junior",
                        dates: "Ago. 2019 – Mar. 2021",
                        bullets: [
                            "Contribuí al desarrollo de la app mobile de PaQuery (React Native): vistas para choferes, mapa con algoritmos de ruteo, cámara, lector de QR/barcode y gestión de envíos.",
                            "Colaboré en el rediseño completo de Alternativa Teatral, modernizando la UI y desarrollando su nuevo sistema de pagos integrado con la API de Mercado Pago y Spring Boot.",
                            "Implementé un sistema de control de sesiones simultáneas orientado a eventos para streams en vivo usando RabbitMQ, limitando el acceso por sesiones activas en tiempo real.",
                        ],
                    },
                ],
            },
        ],
        education: [
            {
                title: "Ingeniería en Informática",
                dates: "2017 – 2019",
                institution:
                    "Facultad de Ingeniería, UBA — Buenos Aires.",
                details:
                    "Cursado parcial, materias completadas en el área de sistemas y matemática.",
            },
        ],
        languages: [
            ["Español", "Nativo"],
            ["Inglés", "B2, conversacional"],
        ],
    },
    en: {
        name: "Lorenzo Matías López",
        title: "Senior Full Stack Engineer | Product Engineer",
        contact: contact("en"),
        summary:
            "Senior Full Stack Developer with over 6 years of experience, specialized in React and TypeScript with a solid foundation in Java / Spring Boot. In my last role I took on a Product Engineer position, leading the full product cycle: user discovery, planning and end-to-end implementation, incorporating AI tools into the development workflow. I do my best work on large-scale projects where technology heterogeneity and delivery speed are the core challenge. I work autonomously, with a focus on leaving the code better than I found it.",
        sections: {
            summary: "Professional Summary",
            skills: "Technical Skills",
            experience: "Work Experience",
            education: "Education",
            languages: "Languages",
        },
        skills: [
            [
                "Frontend",
                "React (Hooks, Context, Next.js), TypeScript, JavaScript (ES6+), Redux, TanStack Query, Zustand",
            ],
            [
                "Backend",
                "Java (Spring Boot), REST APIs, microservices architecture, Node.js (Express), Python (Django)",
            ],
            [
                "Applied AI",
                "OpenAI API integration for automation agents, Cursor and Claude as full stack development assistants",
            ],
            ["Testing", "Vitest, React Testing Library, Cypress, Jest"],
            ["Databases", "PostgreSQL, MongoDB, MySQL, Oracle, Redis"],
            [
                "Cloud & DevOps",
                "AWS (S3, Lambda, RDS), Docker, CI/CD (GitLab, GitHub Actions), Jenkins, Firebase",
            ],
            [
                "Event-driven architectures",
                "RabbitMQ, working knowledge of Kafka concepts and patterns",
            ],
            ["Mobile", "React Native"],
            ["Other", "GraphQL (basic knowledge)"],
        ],
        experience: [
            {
                company: "HOUM",
                context: "Rental platform",
                roles: [
                    {
                        title: "Product Engineer",
                        dates: "Sep 2025 – Oct 2026",
                        bullets: [
                            "Gathered product needs and requirements directly from end users.",
                            "Planned solutions with the team (product, design and development) and led end-to-end implementation, incorporating Cursor and Claude to broaden my technical reach and speed up delivery.",
                            "Built an incident-fixing automation system using the OpenAI API: an agent that detects inconsistencies between system data and generated contract documents, opens a support ticket and attaches a proposed fix in a Pull Request.",
                            "Implemented multiple improvements to existing workflows, automating manual tasks and reducing operational overhead for employees on the platform.",
                        ],
                    },
                    {
                        title: "Senior Frontend Developer",
                        dates: "Apr 2024 – Sep 2025",
                        bullets: [
                            "Gathered requirements for and implemented centralized views to manage the rental process, closing operational gaps that existing tools did not cover.",
                            "Built most of the frontend of an internal comments and notifications system, replacing Slack and Google Chat as the operational communication channel.",
                            "Led the frontend development of a task assignment system with an admin panel to configure availability, vacations and leaves per employee.",
                            "Applied security improvements to the admin platform to meet internal audits.",
                            "Actively contributed to the migration to the company's in-house design system, progressively replacing MUI in a large-scale codebase.",
                            "Extended my participation to Django backend projects, collaborating on API and service development.",
                        ],
                    },
                ],
            },
            {
                type: "break",
                company: "Sabbatical",
                dates: "Apr 2023 – Apr 2024",
                note: "Took a year-long sabbatical using personal savings to rest and recharge before returning to my career.",
            },
            {
                company: "MinutenTag",
                context: "Digital agency",
                roles: [
                    {
                        title: "Semi-Senior Frontend Developer",
                        dates: "Nov 2022 – Apr 2023",
                        bullets: [
                            "Developed React features for US clients, integrating business logic with Django and Firebase backends.",
                            "Maintained applications and fixed bugs using Redux, React Drag & Drop and Three.js.",
                        ],
                    },
                ],
            },
            {
                company: "Connectis",
                context: "Technology consultancy",
                roles: [
                    {
                        title: "Semi-Senior Full Stack Developer / Team Leader",
                        dates: "Aug 2021 – Sep 2022",
                        bullets: [
                            "Coordinated client needs gathering and backlog definition, acting as the link between the business and the technical team.",
                            "Built and maintained internal administrative solutions for several Movistar teams, including the public number portability form, with Spring Boot and React; also developed REST APIs for internal projects.",
                            "Drove the adoption of React and TypeScript in a company mostly oriented to Vue.js, starting projects with React + Spring Boot as technical referent.",
                            "Gave internal tech talks on TypeScript and React for the development team.",
                            "Grew from Junior developer to Team Lead within the same company, leading teams of 2 to 4 people.",
                        ],
                    },
                ],
            },
            {
                company: "Botmaker",
                context: "Messaging automation",
                roles: [
                    {
                        title: "Junior Full Stack Developer",
                        dates: "Mar 2021 – Aug 2021",
                        bullets: [
                            "Migrated React class components to hooks on the internal platform.",
                            "Implemented UI improvements in admin tools and real-time updates using WebSockets.",
                        ],
                    },
                ],
            },
            {
                company: "OnReady",
                context: "Automotive e-commerce",
                roles: [
                    {
                        title: "Junior Full Stack Developer",
                        dates: "Aug 2019 – Mar 2021",
                        bullets: [
                            "Contributed to the PaQuery mobile app (React Native): driver views, map with routing algorithms, camera, QR/barcode reader and shipment management.",
                            "Collaborated on the complete redesign of Alternativa Teatral, modernizing the UI and building its new payment system integrated with the Mercado Pago API and Spring Boot.",
                            "Implemented an event-driven concurrent session control system for live streams using RabbitMQ, limiting access by active sessions in real time.",
                        ],
                    },
                ],
            },
        ],
        education: [
            {
                title: "Computer Engineering (partial)",
                dates: "2017 – 2019",
                institution:
                    "Faculty of Engineering, University of Buenos Aires (UBA) — Buenos Aires.",
                details:
                    "Completed coursework in systems and mathematics.",
            },
        ],
        languages: [
            ["Spanish", "Native"],
            ["English", "B2, conversational"],
        ],
    },
};
