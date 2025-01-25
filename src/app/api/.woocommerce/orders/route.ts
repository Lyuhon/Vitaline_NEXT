// // app/api/woocommerce/orders/route.ts
// import { NextResponse } from 'next/server';
// import { cookies } from 'next/headers';

// export async function GET() {
//     try {
//         const cookieStore = await cookies();
//         const token = cookieStore.get('authToken');

//         if (!token) {
//             return NextResponse.json(
//                 { error: 'Unauthorized' },
//                 { status: 401 }
//             );
//         }

//         const response = await fetch(`${process.env.WOOCOMMERCE_API_URL}/orders`, {
//             headers: {
//                 'Authorization': `Basic ${Buffer.from(
//                     `${process.env.WOOCOMMERCE_CONSUMER_KEY}:${process.env.WOOCOMMERCE_CONSUMER_SECRET}`
//                 ).toString('base64')}`
//             }
//         });

//         const orders = await response.json();

//         if (!response.ok) {
//             throw new Error('Failed to fetch orders');
//         }

//         return NextResponse.json(orders);
//     } catch (error) {
//         console.error('Orders fetch error:', error);
//         return NextResponse.json(
//             { error: 'Failed to fetch orders' },
//             { status: 500 }
//         );
//     }
// }


import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const authToken = cookieStore.get('authToken');

        if (!authToken) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Получаем данные пользователя через WordPress API
        const userResponse = await fetch('https://nuxt.vitaline.uz/wp-json/wp/v2/users/me', {
            headers: {
                'Authorization': `Bearer ${authToken.value}`
            }
        });

        if (!userResponse.ok) {
            throw new Error('Failed to fetch user data');
        }

        const userData = await userResponse.json();
        const userId = userData.id;

        // Теперь fetchим только заказы для текущего пользователя
        const ordersResponse = await fetch(`${process.env.WOOCOMMERCE_API_URL}/orders?customer=${userId}`, {
            headers: {
                'Authorization': `Basic ${Buffer.from(
                    `${process.env.WOOCOMMERCE_CONSUMER_KEY}:${process.env.WOOCOMMERCE_CONSUMER_SECRET}`
                ).toString('base64')}`
            }
        });

        const orders = await ordersResponse.json();

        if (!ordersResponse.ok) {
            throw new Error('Failed to fetch orders');
        }

        return NextResponse.json(orders);
    } catch (error) {
        console.error('Orders fetch error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch orders' },
            { status: 500 }
        );
    }
}