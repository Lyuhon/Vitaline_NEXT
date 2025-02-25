// // // src/middleware.ts (если файла нет, создайте его в корне src)
// // import { NextResponse } from 'next/server'
// // import type { NextRequest } from 'next/server'

// // export function middleware(request: NextRequest) {
// //     // Проверяем, что это страница чекаута
// //     if (request.nextUrl.pathname === '/checkout') {
// //         // Создаем новый Response с теми же заголовками
// //         const response = NextResponse.next()

// //         // Добавляем заголовки, которые отключают кэширование
// //         response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
// //         response.headers.set('Pragma', 'no-cache')
// //         response.headers.set('Expires', '0')

// //         return response
// //     }

// //     return NextResponse.next()
// // }

// // // Указываем для каких путей срабатывает middleware
// // export const config = {
// //     matcher: '/checkout'
// // }

// // src/middleware.ts (если файла нет, создайте его в корне src)
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export function middleware(request: NextRequest) {
//     // Проверяем, что это страница чекаута
//     if (request.nextUrl.pathname === '/checkout') {
//         // Создаем новый Response с теми же заголовками
//         const response = NextResponse.next()

//         // Добавляем заголовки, которые отключают кэширование
//         response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
//         response.headers.set('Pragma', 'no-cache')
//         response.headers.set('Expires', '0')

//         return response
//     }

//     return NextResponse.next()
// }

// // Указываем для каких путей срабатывает middleware
// export const config = {
//     matcher: '/checkout'
// }


// src/middleware.ts 
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Получаем текущий путь
    const path = request.nextUrl.pathname;

    // Исключаем пути для статических ресурсов из проверки
    if (path.startsWith('/icons/')) {
        return NextResponse.next();
    }

    // Получаем токен из cookies
    const authToken = request.cookies.get('auth_token');

    // Проверяем, авторизован ли пользователь
    const isAuthenticated = authToken && authToken.value === 'authenticated';

    // Проверка аутентификации для всех путей, кроме логина
    if (path !== '/login' && !isAuthenticated) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Если это страница логина, и пользователь авторизован, перенаправляем на главную
    if (path === '/login' && isAuthenticated) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Проверяем, что это страница чекаута
    if (path === '/checkout') {
        // Создаем новый Response с теми же заголовками
        const response = NextResponse.next()

        // Добавляем заголовки, которые отключают кэширование
        response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
        response.headers.set('Pragma', 'no-cache')
        response.headers.set('Expires', '0')

        return response
    }

    return NextResponse.next()
}

// Указываем для каких путей срабатывает middleware
export const config = {
    matcher: [
        // Применяем ко всем путям, кроме API, _next и других системных
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}