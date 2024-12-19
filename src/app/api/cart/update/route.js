import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
    const { productId, quantity } = await request.json();
    const cartCookieName = 'vitaline_cart';

    if (!productId || typeof quantity !== 'number') {
        return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const cookieStore = cookies();
    const cartCookie = cookieStore.get(cartCookieName)?.value;
    let cart = cartCookie ? JSON.parse(cartCookie) : { items: [] };

    const itemIndex = cart.items.findIndex((item) => item.productId === productId);
    if (itemIndex !== -1) {
        if (quantity <= 0) {
            // Если количество 0 или меньше — удаляем товар
            cart.items.splice(itemIndex, 1);
        } else {
            cart.items[itemIndex].qty = quantity;
        }
    }

    const cookieStr = JSON.stringify(cart);
    return NextResponse.json(cart, {
        headers: {
            'Set-Cookie': `${cartCookieName}=${encodeURIComponent(cookieStr)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=31536000`
        }
    });
}
