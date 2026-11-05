import fs from "node:fs";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { CV } from "./cv-data.mjs";

const execFileAsync = promisify(execFile);

const root = path.resolve(import.meta.dirname, "..");
const outDir = path.join(root, "cv", "out");
const htmlDir = path.join(outDir, "html");
const chrome =
    process.env.CHROME_PATH ||
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const escapeHtml = (value) =>
    String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");

const link = (href, label) =>
    `<a href="${escapeHtml(href)}">${escapeHtml(label)}</a>`;

const styles = `
@page {
    size: A4;
    margin: 13mm 15mm;
}

* {
    box-sizing: border-box;
}

html {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
}

body {
    margin: 0;
    color: #1f2933;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 10pt;
    line-height: 1.35;
}

a {
    color: #9a3412;
    text-decoration: none;
}

.header {
    margin-bottom: 12px;
    padding-bottom: 10px;
    border-bottom: 2px solid #9a3412;
}

h1 {
    margin: 0 0 4px;
    color: #111827;
    font-size: 24pt;
    letter-spacing: -0.01em;
    line-height: 1.05;
}

.header-role {
    margin: 0 0 8px;
    color: #9a3412;
    font-size: 11.5pt;
    font-weight: 700;
}

.contact {
    margin: 0;
    color: #374151;
    font-size: 9.6pt;
    line-height: 1.45;
}

.contact p {
    margin: 0;
}

.label {
    color: #111827;
    font-weight: 700;
}

section {
    margin-top: 16px;
}

h2 {
    margin: 0 0 6px;
    padding-bottom: 3px;
    border-bottom: 1px solid #d1d5db;
    color: #111827;
    font-size: 12pt;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    break-after: avoid;
}

h3 {
    margin: 0 0 2px;
    color: #111827;
    font-size: 11.2pt;
    break-after: avoid;
}

h4 {
    margin: 0 0 3px;
    color: #111827;
    font-size: 10.4pt;
    break-after: avoid;
}

p {
    margin: 0;
}

.summary {
    text-align: left;
}

ul {
    margin: 0;
    padding-left: 16px;
}

li {
    margin: 0 0 3px;
    break-inside: avoid;
}

.skills li {
    margin-bottom: 2.5px;
}

.job {
    margin-top: 12px;
}

.job:first-of-type {
    margin-top: 0;
}

.job-role {
    margin-top: 6px;
}

.job-role:first-of-type {
    margin-top: 0;
}

.dates {
    color: #4b5563;
    font-weight: 400;
}

.company-context {
    color: #4b5563;
    font-size: 9.8pt;
    font-weight: 400;
}

.job-break h3 {
    font-size: 10.4pt;
}

.job-break p {
    margin-top: 2px;
}

.education {
    margin-top: 0;
}

.project-line {
    margin: 0 0 2px;
}

.project-line strong {
    color: #111827;
}

.project-stack {
    color: #4b5563;
}

.education p {
    margin-top: 2px;
}
`;

function renderContact(cv) {
    const c = cv.contact;
    const languages = cv.languages
        .map(([label, value]) => `${label}: ${value}`)
        .join(" · ");

    return `
        <div class="contact">
            <p>${escapeHtml(c.location)}</p>
            <p>${link(`tel:${c.phone.replaceAll(" ", "")}`, c.phone)} · ${link(`mailto:${c.email}`, c.email)}</p>
            <p><span class="label">LinkedIn:</span> ${link(c.linkedin, c.linkedinLabel)}</p>
            <p><span class="label">Portfolio:</span> ${link(c.portfolio, c.portfolioLabel)}</p>
            <p><span class="label">GitHub:</span> ${link(c.github, c.githubLabel)}</p>
            <p><span class="label">${escapeHtml(cv.sections.languages)}:</span> ${escapeHtml(languages)}</p>
        </div>
    `;
}

function renderSkills(cv) {
    return cv.skills
        .map(
            ([label, value]) =>
                `<li><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</li>`,
        )
        .join("\n");
}

function renderExperience(cv) {
    return cv.experience
        .map((job) => {
            if (job.type === "break") {
                return `
                    <div class="job job-break">
                        <h3>${escapeHtml(job.company)} <span class="company-context">— ${escapeHtml(job.dates)}</span></h3>
                        <p>${escapeHtml(job.note)}</p>
                    </div>
                `;
            }

            const context = job.context
                ? ` <span class="company-context">— ${escapeHtml(job.context)}</span>`
                : "";

            return `
                <div class="job">
                    <h3>${escapeHtml(job.company)}${context}</h3>
                    ${job.roles
                        .map(
                            (role) => `
                                <div class="job-role">
                                    <h4>${escapeHtml(role.title)} <span class="dates">| ${escapeHtml(role.dates)}</span></h4>
                                    <ul>
                                        ${role.bullets
                                            .map(
                                                (bullet) =>
                                                    `<li>${escapeHtml(bullet)}</li>`,
                                            )
                                            .join("\n")}
                                    </ul>
                                </div>
                            `,
                        )
                        .join("\n")}
                </div>
            `;
        })
        .join("\n");
}

function renderProjects(cv) {
    return cv.projects
        .map(
            (project) => `
                <p class="project-line">
                    <strong>${escapeHtml(project.name)}</strong> — ${escapeHtml(project.description)}
                    <span class="project-stack">(${escapeHtml(project.stack)})</span> ·
                    ${link(project.href, project.label)}
                </p>
            `,
        )
        .join("\n");
}

function renderEducation(cv) {
    return cv.education
        .map(
            (item) => `
                <div class="education">
                    <h4>${escapeHtml(item.title)} <span class="dates">| ${escapeHtml(item.dates)}</span></h4>
                    <p><strong>${escapeHtml(item.institution)}</strong></p>
                    <p>${escapeHtml(item.details)}</p>
                </div>
            `,
        )
        .join("\n");
}

function render(cv, lang) {
    return `<!doctype html>
<html lang="${lang}">
<head>
    <meta charset="utf-8">
    <title>${escapeHtml(cv.name)} — CV</title>
    <style>${styles}</style>
</head>
<body class="lang-${lang}">
    <header class="header">
        <h1>${escapeHtml(cv.name)}</h1>
        <p class="header-role">${escapeHtml(cv.title)}</p>
        ${renderContact(cv)}
    </header>

    <section>
        <h2>${escapeHtml(cv.sections.summary)}</h2>
        <p class="summary">${escapeHtml(cv.summary)}</p>
    </section>

    <section>
        <h2>${escapeHtml(cv.sections.skills)}</h2>
        <ul class="skills">
            ${renderSkills(cv)}
        </ul>
    </section>

    <section>
        <h2>${escapeHtml(cv.sections.experience)}</h2>
        ${renderExperience(cv)}
    </section>

    <section>
        <h2>${escapeHtml(cv.sections.projects)}</h2>
        ${renderProjects(cv)}
    </section>

    <section>
        <h2>${escapeHtml(cv.sections.education)}</h2>
        ${renderEducation(cv)}
    </section>
</body>
</html>`;
}

fs.mkdirSync(htmlDir, { recursive: true });

for (const lang of ["es", "en"]) {
    const html = render(CV[lang], lang);
    const htmlPath = path.join(htmlDir, `cv-${lang}.html`);
    fs.writeFileSync(htmlPath, html, "utf8");

    const pdfPath = path.join(
        outDir,
        `CV_LORENZO_LOPEZ_${lang.toUpperCase()}.pdf`,
    );

    await execFileAsync(
        chrome,
        [
            "--headless=new",
            "--disable-gpu",
            "--no-sandbox",
            "--no-pdf-header-footer",
            "--print-to-pdf-no-header",
            `--print-to-pdf=${pdfPath}`,
            `file:///${htmlPath.replaceAll("\\", "/")}`,
        ],
        { timeout: 60000 },
    );

    console.log(`generated ${pdfPath}`);
}
