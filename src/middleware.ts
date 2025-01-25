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

// src/middleware.ts (если файла нет, создайте его в корне src)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Проверяем, что это страница чекаута
    if (request.nextUrl.pathname === '/checkout') {
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
    matcher: '/checkout'
}