// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
    const cookieStore = await cookies();

    // Удаляем все куки связанные с авторизацией
    await cookieStore.delete('authToken');
    await cookieStore.delete('userEmail');
    await cookieStore.delete('userName');

    return NextResponse.json({ success: true });
}