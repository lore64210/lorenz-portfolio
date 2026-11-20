export const LOCALES = ["es", "en"];
export const DEFAULT_LOCALE = "es";

const isLocale = (value) => LOCALES.includes(value);

export const getLocale = (lang) =>
    isLocale(lang) ? lang : DEFAULT_LOCALE;

export const getOtherLocale = (lang) =>
    getLocale(lang) === "es" ? "en" : "es";

/** `/es/about` -> `/en/about`; `/about` -> `/en/about`. */
export const localizePath = (path, locale) =>
    `/${getLocale(locale)}${String(path ?? "").replace(/^\/(es|en)(?=\/|$)/, "")}`;
