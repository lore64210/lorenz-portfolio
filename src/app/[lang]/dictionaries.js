import "server-only";

import { DEFAULT_LOCALE, getLocale } from "@/constants/i18n";

const dictionaries = {
    en: () => import("./dictionaries/en.json").then((module) => module.default),
    es: () => import("./dictionaries/es.json").then((module) => module.default),
};

export const getDictionary = async (locale) =>
    dictionaries[getLocale(locale) ?? DEFAULT_LOCALE]();
