/**
 * Resume files live in `public/static/pdf`. The served path and the download
 * name are intentionally identical so the browser does not rename the file.
 */
const CV_FILES = {
    es: {
        href: "/static/pdf/CV_LORENZO_LOPEZ_ES.pdf",
        download: "CV_LORENZO_LOPEZ_ES.pdf",
    },
    en: {
        href: "/static/pdf/CV_LORENZO_LOPEZ_EN.pdf",
        download: "CV_LORENZO_LOPEZ_EN.pdf",
    },
};

export const getCvFile = (lang) => CV_FILES[lang] ?? CV_FILES.es;

/** Current language first, then the other one. */
export const getCvLangOrder = (lang) =>
    lang === "en" ? ["en", "es"] : ["es", "en"];
