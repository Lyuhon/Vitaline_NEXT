// // // src/middleware.ts
// // import { NextResponse } from 'next/server';
// // import type { NextRequest } from 'next/server';

// // export function middleware(request: NextRequest) {
// //     const path = request.nextUrl.pathname;

// //     if (path.startsWith('/icons/')) {
// //         return NextResponse.next();
// //     }

// //     const authToken = request.cookies.get('auth_token');
// //     const isAuthenticated = authToken && authToken.value === 'authenticated';

// //     console.log('Middleware:', { path, isAuthenticated }); // Для отладки

// //     if (path !== '/login' && !isAuthenticated) {
// //         return NextResponse.redirect(new URL('/login', request.url));
// //     }

// //     if (path === '/login' && isAuthenticated) {
// //         return NextResponse.redirect(new URL('/', request.url));
// //     }

// //     if (path === '/checkout') {
// //         const response = NextResponse.next();
// //         response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
// //         response.headers.set('Pragma', 'no-cache');
// //         response.headers.set('Expires', '0');
// //         return response;
// //     }

// //     return NextResponse.next();
// // }

// // export const config = {
// //     matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// // };


// // src/middleware.ts
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//     const path = request.nextUrl.pathname;

//     // Пропускаем статические файлы
//     if (path.startsWith("/icons/") || path.startsWith("/_next/") || path.startsWith("/api/")) {
//         return NextResponse.next();
//     }

//     const authToken = request.cookies.get("auth_token");
//     const isAuthenticated = authToken && authToken.value === "authenticated";

//     console.log("Middleware:", {
//         path,
//         isAuthenticated,
//         cookies: request.cookies.getAll(), // Логируем все куки для отладки
//     });

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

    const authToken = request.cookies.get("auth_token");
    const isAuthenticated = authToken && authToken.value === "authenticated";

    // Если не авторизован и не на странице логина, редиректим
    if (path !== "/login" && !isAuthenticated) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Если авторизован и на странице логина, редиректим на главную
    if (path === "/login" && isAuthenticated) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};