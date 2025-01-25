import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const cookieStore = await cookies();
        const authToken = cookieStore.get('authToken');

        if (!authToken) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Получаем данные конкретного заказа
        const orderResponse = await fetch(`${process.env.WOOCOMMERCE_API_URL}/orders/${params.id}`, {
            headers: {
                'Authorization': `Basic ${Buffer.from(
                    `${process.env.WOOCOMMERCE_CONSUMER_KEY}:${process.env.WOOCOMMERCE_CONSUMER_SECRET}`
                ).toString('base64')}`
            }
        });

        const orderData = await orderResponse.json();

        if (!orderResponse.ok) {
            throw new Error('Failed to fetch order details');
        }

        return NextResponse.json(orderData);
    } catch (error) {
        console.error('Order details fetch error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch order details' },
            { status: 500 }
        );
    }
}

