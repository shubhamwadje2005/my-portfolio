// import { NextRequest, NextResponse } from "next/server";

// export function middleware(req: NextRequest) {
//     const token = req.cookies.get("ADMIN")?.value

//     if (!token) {
//         return NextResponse.redirect(new URL("/login", req.url))
//     }

//     return NextResponse.next()
// }

// export const config = {
//     matcher: ["/admin/:path*"]
// }

import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("ADMIN")?.value
    const url = req.nextUrl

    // ❌ Not logged in → block admin
    if (!token && url.pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/login", req.url))
    }

    // ✅ Already logged in → block login page
    if (token && url.pathname === "/login") {
        return NextResponse.redirect(new URL("/admin", req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/admin/:path*", "/login"]
}