import { DEFAULT_LOCALE, getLocale } from "@/constants/i18n";

/** Next hands `params` as a promise; normalize `[lang]` to a supported locale. */
export async function resolveLocale(params) {
    const { lang = DEFAULT_LOCALE } = await params;
    return getLocale(lang);
}
