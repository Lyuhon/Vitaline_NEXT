// src/app/api/otp/generate/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { phone } = await request.json();

        if (!phone) {
            return NextResponse.json(
                { success: false, message: 'Номер телефона обязателен' },
                { status: 400 }
            );
        }

        const formData = new FormData();
        formData.append('phone', phone);

        const response = await fetch(
            'https://retail.vitaline.uz/wp-json/eskiz-otp/v1/generate',
            {
                method: 'POST',
                headers: {
                    'X-API-Key': '83LvG9gl7HxKTZwQFBxz9tSS55YMn4TM',
                },
                body: formData,
            }
        );

        const data = await response.json();

        return NextResponse.json(data);
    } catch (error) {
        console.error('OTP generate error:', error);
        return NextResponse.json(
            { success: false, message: 'Ошибка сервера при отправке OTP' },
            { status: 500 }
        );
    }
}