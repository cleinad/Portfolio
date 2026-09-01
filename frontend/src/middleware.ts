import { NextResponse, type NextRequest } from "next/server";

const LOCALE_COOKIE = "portfolio_locale";

export function middleware(request: NextRequest) {
    const preference = request.cookies.get(LOCALE_COOKIE)?.value;
    const country = request.headers.get("x-vercel-ip-country");

    if (preference === "zh-Hans" || (!preference && country === "CN")) {
        const response = NextResponse.redirect(new URL("/zh", request.url), 307);
        if (!preference) {
            response.cookies.set(LOCALE_COOKIE, "zh-Hans", { path: "/", sameSite: "lax" });
        }
        response.headers.set("Cache-Control", "private, no-store");
        return response;
    }

    if (preference || country !== "CN") {
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = { matcher: "/" };
