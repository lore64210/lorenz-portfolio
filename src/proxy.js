import { NextResponse } from "next/server";
import { DEFAULT_LOCALE, LOCALES } from "@/constants/i18n";

export function proxy(request) {
    const { pathname } = request.nextUrl;
    const pathnameHasLocale = LOCALES.some(
        (locale) =>
            pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) return;

    // No locale in the URL: always send visitors to the default locale,
    // regardless of their Accept-Language header.
    request.nextUrl.pathname = `/${DEFAULT_LOCALE}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
}

export const config = {
    matcher: [
        // Skip API routes, Next.js internals and static files
        "/((?!api|_next|.*\\..*).*)",
    ],
};
