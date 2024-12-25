// \app\api\cart\remove-selected\route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
    const cartCookieName = 'vitaline_cart';

    // Считываем куку
    const cookieStore = await cookies();
    const cartCookie = cookieStore.get(cartCookieName)?.value;
    let cart = cartCookie ? JSON.parse(cartCookie) : { items: [] };

    // Убираем из корзины товары, у которых selected === true
    cart.items = cart.items.filter((item) => item.selected !== true);

    // Перезаписываем куку
    const cookieStr = JSON.stringify(cart);
    return NextResponse.json(cart, {
        headers: {
            'Set-Cookie': `${cartCookieName}=${encodeURIComponent(cookieStr)}; Path=/; Max-Age=31536000`,
        },
    });
}
