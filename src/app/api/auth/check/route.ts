// app/api/auth/check/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get('authToken');

    if (!token) {
        return NextResponse.json(
            { error: 'No token found' },
            { status: 401 }
        );
    }

    return NextResponse.json({
        authenticated: true,
        token: token.value
    });
}