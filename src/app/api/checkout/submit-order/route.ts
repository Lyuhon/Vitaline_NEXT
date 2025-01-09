// src/app/api/checkout/submit-order/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const orderData = await request.json();
        console.log('Получены данные заказа:', orderData);

        const response = await fetch('https://nuxt.vitaline.uz/wp-content/api/web_tg.php', {
            // const response = await fetch('https://nuxt.vitaline.uz/wp-content/api/web_tg_test.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });

        console.log('Ответ от web_tg.php:', response.status);

        if (response.ok) {
            return NextResponse.json({ message: 'Order submitted successfully' }, { status: 200 });
        } else {
            const errorText = await response.text();
            console.error('Ошибка при отправке данных:', errorText);
            return NextResponse.json({ message: 'Ошибка при отправке данных' }, { status: 500 });
        }
    } catch (error) {
        console.error('Внутренняя ошибка сервера:', error);
        return NextResponse.json({ message: 'Внутренняя ошибка сервера' }, { status: 500 });
    }
}

