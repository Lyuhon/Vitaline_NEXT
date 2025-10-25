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
//         path === "/vitaline-logo.webp" ||
//         path.startsWith("/images/")
//     ) {
//         return NextResponse.next();
//     }

//     const authToken = request.cookies.get("auth_token")?.value;
//     const userType = request.cookies.get("user_type")?.value; // Добавляем чтение user_type

//     const isAuthenticated = authToken === "authenticated_4";

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
// }

// export const config = {
//     matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };















// // // src/middleware.ts
// // // ПЕРЕУЧЕТ ТОВАРОВ
// // import { NextResponse } from "next/server";
// // import type { NextRequest } from "next/server";

// // export function middleware(request: NextRequest) {
// //     const path = request.nextUrl.pathname;

// //     // Пропускаем статические файлы и /vitaline-logo.webp
// //     if (
// //         path.startsWith("/icons/") ||
// //         path.startsWith("/_next/") ||
// //         path.startsWith("/api/") ||
// //         path === "/vitaline-logo.webp" ||
// //         path === "/notification" // Не перенаправляем саму страницу уведомления
// //     ) {
// //         return NextResponse.next();
// //     }

// //     // Временное перенаправление всех запросов на страницу уведомления о переучете
// //     return NextResponse.redirect(new URL("/notification", request.url));

// //     // Закомментированная оригинальная логика - можно будет вернуть после переучета
// //     /*
// //     const authToken = request.cookies.get("auth_token")?.value;
// //     const userType = request.cookies.get("user_type")?.value;

// //     const isAuthenticated = authToken === "authenticated";

// //     // Если не авторизован и не на странице логина, редиректим
// //     if (path !== "/login" && !isAuthenticated) {
// //         return NextResponse.redirect(new URL("/login", request.url));
// //     }

// //     // Если авторизован и на странице логина, редиректим на главную
// //     if (path === "/login" && isAuthenticated) {
// //         return NextResponse.redirect(new URL("/", request.url));
// //     }

// //     // Передаем userType в заголовки для использования на страницах
// //     const response = NextResponse.next();
// //     if (userType) {
// //         response.headers.set("x-user-type", userType);
// //     }

// //     return response;
// //     */
// // }

// // export const config = {
// //     matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// // };









//MULTILANG
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale, type Locale } from "@/i18n/config";

// Функция для определения языка из различных источников
function getLocale(request: NextRequest): Locale {
    // 1. Проверяем cookie
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
    if (cookieLocale && locales.includes(cookieLocale as Locale)) {
        return cookieLocale as Locale;
    }

    // 2. Проверяем Accept-Language header
    const acceptLanguage = request.headers.get("accept-language");
    if (acceptLanguage) {
        for (const locale of locales) {
            if (acceptLanguage.includes(locale)) {
                return locale;
            }
        }
    }

    // 3. Возвращаем дефолтный язык
    return defaultLocale;
}

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Пропускаем статические файлы
    if (
        path.startsWith("/icons/") ||
        path.startsWith("/_next/") ||
        path.startsWith("/api/") ||
        path === "/vitaline-logo.webp" ||
        path.startsWith("/images/") ||
        path.endsWith(".png") ||
        path.endsWith(".jpg") ||
        path.endsWith(".webp")
    ) {
        return NextResponse.next();
    }

    // Получаем текущую локаль
    const locale = getLocale(request);

    // Проверяем авторизацию
    const authToken = request.cookies.get("auth_token")?.value;
    const userType = request.cookies.get("user_type")?.value;
    const isAuthenticated = authToken === "authenticated_4";

    // Если не авторизован и не на странице логина
    if (path !== `/${locale}/login` && path !== "/login" && !isAuthenticated) {
        const response = NextResponse.redirect(new URL(`/${locale}/login`, request.url));
        response.cookies.set("NEXT_LOCALE", locale, { path: "/" });
        return response;
    }

    // Если авторизован и на странице логина
    if ((path === `/${locale}/login` || path === "/login") && isAuthenticated) {
        const response = NextResponse.redirect(new URL(`/${locale}`, request.url));
        response.cookies.set("NEXT_LOCALE", locale, { path: "/" });
        return response;
    }

    // Если путь не начинается с локали, редиректим
    const pathnameIsMissingLocale = locales.every(
        (locale) => !path.startsWith(`/${locale}/`) && path !== `/${locale}`
    );

    if (pathnameIsMissingLocale) {
        const response = NextResponse.redirect(
            new URL(`/${locale}${path === "/" ? "" : path}`, request.url)
        );
        response.cookies.set("NEXT_LOCALE", locale, { path: "/" });
        return response;
    }

    // Передаем данные через headers
    const response = NextResponse.next();
    response.cookies.set("NEXT_LOCALE", locale, { path: "/" });

    if (userType) {
        response.headers.set("x-user-type", userType);
    }
    response.headers.set("x-locale", locale);

    return response;
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};