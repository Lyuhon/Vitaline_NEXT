// // src/middleware.ts
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//     const path = request.nextUrl.pathname;

//     // Пропускаем статические файлы и /vitaline-logo.webp
//     if (
//         path.startsWith("/icons/") ||
//         path.startsWith("/_next/") ||
//         path.startsWith("/api/") ||
//         path === "/vitaline-logo.webp"
//     ) {
//         return NextResponse.next();
//     }

//     const authToken = request.cookies.get("auth_token");
//     const isAuthenticated = authToken && authToken.value === "authenticated";

//     // Если не авторизован и не на странице логина, редиректим
//     if (path !== "/login" && !isAuthenticated) {
//         return NextResponse.redirect(new URL("/login", request.url));
//     }

//     // Если авторизован и на странице логина, редиректим на главную
//     if (path === "/login" && isAuthenticated) {
//         return NextResponse.redirect(new URL("/", request.url));
//     }

//     return NextResponse.next();
// }

// export const config = {
//     matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };

// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Пропускаем статические файлы и /vitaline-logo.webp
    if (
        path.startsWith("/icons/") ||
        path.startsWith("/_next/") ||
        path.startsWith("/api/") ||
        path === "/vitaline-logo.webp"
    ) {
        return NextResponse.next();
    }

    const authToken = request.cookies.get("auth_token")?.value;
    const userType = request.cookies.get("user_type")?.value; // Добавляем чтение user_type

    const isAuthenticated = authToken === "authenticated";

    // Если не авторизован и не на странице логина, редиректим
    if (path !== "/login" && !isAuthenticated) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Если авторизован и на странице логина, редиректим на главную
    if (path === "/login" && isAuthenticated) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // Передаем userType в заголовки для использования на страницах
    const response = NextResponse.next();
    if (userType) {
        response.headers.set("x-user-type", userType);
    }

    return response;
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};