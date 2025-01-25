// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { token, user, displayName, rememberMe } = body;

        // Вычисляем время жизни куки
        const maxAge = rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60; // 30 дней или 1 день

        const cookieStore = await cookies();

        // Устанавливаем основные куки для авторизации
        await cookieStore.set('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge
        });

        // Сохраняем email пользователя (не httpOnly, чтобы был доступ из JS)
        await cookieStore.set('userEmail', user, {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge
        });

        // Сохраняем имя пользователя
        await cookieStore.set('userName', displayName, {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Cookie set error:', error);
        return NextResponse.json(
            { error: 'Failed to set cookies' },
            { status: 500 }
        );
    }
}