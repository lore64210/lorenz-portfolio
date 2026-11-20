import { NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { DEFAULT_LOCALE, LOCALES } from "@/constants/i18n";

function getLocale(request) {
    const headers = {
        "accept-language":
            request.headers.get("accept-language") ?? DEFAULT_LOCALE,
    };
    const languages = new Negotiator({ headers }).languages();
    return match(languages, LOCALES, DEFAULT_LOCALE);
}

export function proxy(request) {
    const { pathname } = request.nextUrl;
    const pathnameHasLocale = LOCALES.some(
        (locale) =>
            pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) return;

    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
}

export const config = {
    matcher: [
        // Skip API routes, Next.js internals and static files
        "/((?!api|_next|.*\\..*).*)",
    ],
};
