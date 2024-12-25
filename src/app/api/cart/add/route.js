// \src\app\api\cart\add\route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
    const { productId, quantity = 1, productName, productImage, productPrice, maxQuantity } = await request.json();
    const cartCookieName = 'vitaline_cart';

    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();

    console.log('--- [api/cart/add] INCOMING REQUEST ---');
    console.log('Received body:', { productId, quantity, productName, productImage, productPrice, maxQuantity });
    console.log('Existing cookies:', allCookies);

    const cartCookie = cookieStore.get(cartCookieName)?.value;
    console.log('Current cart cookie:', cartCookie);

    let cart = cartCookie ? JSON.parse(cartCookie) : { items: [] };
    console.log('Parsed cart:', cart);

    const existingItem = cart.items.find((item) => item.productId === productId);
    if (existingItem) {
        // existingItem.qty += quantity;
        existingItem.qty = quantity;
        // Обновляем информацию, если она изменилась
        existingItem.name = productName;
        existingItem.image = productImage;
        existingItem.price = productPrice;
        existingItem.maxQuantity = maxQuantity;
    } else {
        cart.items.push({
            productId,
            qty: quantity,
            name: productName,
            image: productImage,
            price: productPrice,
            maxQuantity
        });
    }

    const cookieStr = JSON.stringify(cart);
    console.log('Updated cart:', cart);

    const response = NextResponse.json(cart, {
        headers: {
            'Set-Cookie': `${cartCookieName}=${encodeURIComponent(cookieStr)}; Path=/; Max-Age=31536000`
        }
    });

    console.log('--- [api/cart/add] RESPONSE SENT ---');
    return response;
}