// // api/auth_temp/check/route.ts

// import { NextResponse } from 'next/server';
// import { cookies } from 'next/headers';

// export async function GET() {
//     try {
//         // Используем await перед cookies()
//         const cookieStore = await cookies();
//         const authToken = cookieStore.get('auth_token');

//         if (authToken && authToken.value === 'authenticated') {
//             return NextResponse.json({ authenticated: true });
//         }

//         return NextResponse.json(
//             { authenticated: false },
//             { status: 401 }
//         );
//     } catch (error) {
//         console.error('Auth check API error:', error);
//         return NextResponse.json(
//             { authenticated: false, message: 'Ошибка сервера' },
//             { status: 500 }
//         );
//     }
// }


// api/auth_temp/check/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const authToken = cookieStore.get("auth_token");

        if (authToken?.value === "authenticated") {
            return NextResponse.json({ authenticated: true });
        }

        return NextResponse.json({ authenticated: false }, { status: 401 });
    } catch (error) {
        console.error("Auth check API error:", error);
        return NextResponse.json(
            { authenticated: false, message: "Ошибка сервера" },
            { status: 500 }
        );
    }
}