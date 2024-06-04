import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

import type { NextRequest } from "next/server";
import { Database } from "@/shared/types/supabase";

let locales = ["en", "jp"];

// Get the preferred locale, similar to the above or using a library
function getLocale(request = {}) {
  let headers = { "accept-language": "en,en;q=0.5" };
  let languages = new Negotiator({ headers }).languages();
  let locales = ["en", "jp"];
  let defaultLocale = "en";
  let locale = match(languages, locales, defaultLocale);
  return locale;
}

export async function middleware(req: NextRequest) {
  // Supabase authentication middleware
  // const res = NextResponse.next()
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", req.nextUrl.pathname);
  const res = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  const supabase = createMiddlewareClient<Database>({ req, res });
  await supabase.auth.getSession();

  // Localization redirect middleware
  const { pathname } = req.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (!pathnameHasLocale) {
    // Redirect if there is no locale
    const locale = getLocale(req);
    req.nextUrl.pathname = `/${locale}${pathname}`;
    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return Response.redirect(req.nextUrl);
  }

  return res;
}

// Dont edit this
export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!robots|sitemap|_next).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
