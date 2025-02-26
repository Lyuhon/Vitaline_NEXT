// // // api/auth_temp/login/route.ts

// // import { NextResponse } from 'next/server';
// // import { cookies } from 'next/headers';

// // export async function POST(request: Request) {
// //     try {
// //         const body = await request.json();
// //         const { username } = body;

// //         // Устанавливаем куки с временем жизни 14 дней (2 недели)
// //         const expiresIn = 60 * 60 * 24 * 14; // 14 дней в секундах
// //         const expiration = new Date(Date.now() + expiresIn * 1000);

// //         // Используем await перед cookies()
// //         const cookieStore = await cookies();

// //         cookieStore.set({
// //             name: 'auth_token',
// //             value: 'authenticated',
// //             httpOnly: true,
// //             path: '/',
// //             expires: expiration,
// //             secure: process.env.NODE_ENV === 'production',
// //             sameSite: 'lax',
// //         });

// //         cookieStore.set({
// //             name: 'user_info',
// //             value: username,
// //             httpOnly: false, // Можно сделать false, если нужно читать имя пользователя с клиента
// //             path: '/',
// //             expires: expiration,
// //             secure: process.env.NODE_ENV === 'production',
// //             sameSite: 'lax',
// //         });

// //         return NextResponse.json({ success: true });
// //     } catch (error) {
// //         console.error('Login API error:', error);
// //         return NextResponse.json(
// //             { success: false, message: 'Ошибка сервера' },
// //             { status: 500 }
// //         );
// //     }
// // }


// // api/auth_temp/login/route.ts
// import { NextResponse } from "next/server";
// import { cookies } from "next/headers";

// export async function POST(request: Request) {
//     try {
//         const body = await request.json();
//         const { username, rememberMe } = body;

//         const expiresIn = rememberMe ? 60 * 60 * 24 * 14 : 60 * 60 * 24; // 14 дней или 1 день
//         const expiration = new Date(Date.now() + expiresIn * 1000);

//         const cookieStore = await cookies();

//         cookieStore.set({
//             name: "auth_token",
//             value: "authenticated",
//             httpOnly: true,
//             path: "/",
//             expires: expiration,
//             secure: process.env.NODE_ENV === "production", // HTTPS в продакшене
//             sameSite: "lax", // Подходит для большинства случаев
//         });

//         cookieStore.set({
//             name: "user_info",
//             value: username,
//             httpOnly: false,
//             path: "/",
//             expires: expiration,
//             secure: process.env.NODE_ENV === "production",
//             sameSite: "lax",
//         });

//         return NextResponse.json({ success: true });
//     } catch (error) {
//         console.error("Login API error:", error);
//         return NextResponse.json(
//             { success: false, message: "Ошибка сервера" },
//             { status: 500 }
//         );
//     }
// }

// api/auth_temp/login/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, rememberMe } = body;

        const expiresIn = rememberMe ? 60 * 60 * 24 * 14 : 60 * 60 * 24; // 14 дней или 1 день
        const expiration = new Date(Date.now() + expiresIn * 1000);

        const cookieStore = await cookies();

        cookieStore.set({
            name: "auth_token",
            value: "authenticated",
            httpOnly: true,
            path: "/",
            expires: expiration,
            secure: false, // Отключаем secure для локального HTTP
            sameSite: "lax",
        });

        cookieStore.set({
            name: "user_info",
            value: username,
            httpOnly: false,
            path: "/",
            expires: expiration,
            secure: false, // Отключаем secure для локального HTTP
            sameSite: "lax",
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Login API error:", error);
        return NextResponse.json(
            { success: false, message: "Ошибка сервера" },
            { status: 500 }
        );
    }
}