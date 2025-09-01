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
//             secure: false, // Отключаем secure для локального HTTP
//             sameSite: "lax",
//         });

//         cookieStore.set({
//             name: "user_info",
//             value: username,
//             httpOnly: false,
//             path: "/",
//             expires: expiration,
//             secure: false, // Отключаем secure для локального HTTP
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
        const { username, userType, rememberMe } = body;

        // Проверка логина и пароля
        if (
            (username === "Trade" && userType === "full") ||
            // (username === "Wholesale_v0010" && userType === "restricted") || 
            (username === "Vitaline" && userType === "restricted") ||
            (username === "vt_user224" && userType === "full")
        ) {
            const expiresIn = rememberMe ? 60 * 60 * 24 * 14 : 60 * 60 * 24; // 14 дней или
            const expiration = new Date(Date.now() + expiresIn * 1000);

            const cookieStore = await cookies();

            // Устанавливаем auth_token
            cookieStore.set({
                name: "auth_token",
                value: "authenticated",
                httpOnly: true,
                path: "/",
                expires: expiration,
                secure: false, // Отключаем secure для локального HTTP
                sameSite: "lax",
            });

            // Устанавливаем user_info
            cookieStore.set({
                name: "user_info",
                value: username,
                httpOnly: false,
                path: "/",
                expires: expiration,
                secure: false,
                sameSite: "lax",
            });

            // Устанавливаем user_type
            cookieStore.set({
                name: "user_type",
                value: userType,
                httpOnly: true,
                path: "/",
                expires: expiration,
                secure: false,
                sameSite: "lax",
            });

            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json(
                { success: false, message: "Неверный логин или пароль" },
                { status: 401 }
            );
        }
    } catch (error) {
        console.error("Login API error:", error);
        return NextResponse.json(
            { success: false, message: "Ошибка сервера" },
            { status: 500 }
        );
    }
}