// // // src/middleware.ts
// // import { NextResponse } from "next/server";
// // import type { NextRequest } from "next/server";

// // export function middleware(request: NextRequest) {
// //     const path = request.nextUrl.pathname;

// //     // Пропускаем статические файлы и /vitaline-logo.webp
// //     if (
// //         path.startsWith("/icons/") ||
// //         path.startsWith("/_next/") ||
// //         path.startsWith("/api/") ||
// //         path === "/vitaline-logo.webp"
// //     ) {
// //         return NextResponse.next();
// //     }

// //     const authToken = request.cookies.get("auth_token");
// //     const isAuthenticated = authToken && authToken.value === "authenticated";

// //     // Если не авторизован и не на странице логина, редиректим
// //     if (path !== "/login" && !isAuthenticated) {
// //         return NextResponse.redirect(new URL("/login", request.url));
// //     }

// //     // Если авторизован и на странице логина, редиректим на главную
// //     if (path === "/login" && isAuthenticated) {
// //         return NextResponse.redirect(new URL("/", request.url));
// //     }

// //     return NextResponse.next();
// // }

// // export const config = {
// //     matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// // };










// Рабочий для логина и т.д.
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
        path === "/vitaline-logo.webp" ||
        path.startsWith("/images/")
    ) {
        return NextResponse.next();
    }

    const authToken = request.cookies.get("auth_token")?.value;
    const userType = request.cookies.get("user_type")?.value; // Добавляем чтение user_type

    const isAuthenticated = authToken === "authenticated_4";

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















// // src/middleware.ts
// // ПЕРЕУЧЕТ ТОВАРОВ
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//     const path = request.nextUrl.pathname;

//     // Пропускаем статические файлы и /vitaline-logo.webp
//     if (
//         path.startsWith("/icons/") ||
//         path.startsWith("/_next/") ||
//         path.startsWith("/api/") ||
//         path === "/vitaline-logo.webp" ||
//         path === "/notification" // Не перенаправляем саму страницу уведомления
//     ) {
//         return NextResponse.next();
//     }

//     // Временное перенаправление всех запросов на страницу уведомления о переучете
//     return NextResponse.redirect(new URL("/notification", request.url));

//     // Закомментированная оригинальная логика - можно будет вернуть после переучета
//     /*
//     const authToken = request.cookies.get("auth_token")?.value;
//     const userType = request.cookies.get("user_type")?.value;

//     const isAuthenticated = authToken === "authenticated";

//     // Если не авторизован и не на странице логина, редиректим
//     if (path !== "/login" && !isAuthenticated) {
//         return NextResponse.redirect(new URL("/login", request.url));
//     }

//     // Если авторизован и на странице логина, редиректим на главную
//     if (path === "/login" && isAuthenticated) {
//         return NextResponse.redirect(new URL("/", request.url));
//     }

//     // Передаем userType в заголовки для использования на страницах
//     const response = NextResponse.next();
//     if (userType) {
//         response.headers.set("x-user-type", userType);
//     }

//     return response;
//     */
// }

// export const config = {
//     matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };