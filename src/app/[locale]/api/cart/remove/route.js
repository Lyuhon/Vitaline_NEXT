// import { NextResponse } from 'next/server';
// import { cookies } from 'next/headers';

// export async function POST(request) {
//     const { productId } = await request.json();
//     const cartCookieName = 'vitaline_cart';

//     if (!productId) {
//         return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
//     }

//     const cookieStore = cookies();
//     const cartCookie = cookieStore.get(cartCookieName)?.value;
//     let cart = cartCookie ? JSON.parse(cartCookie) : { items: [] };

//     cart.items = cart.items.filter((item) => item.productId !== productId);

//     const cookieStr = JSON.stringify(cart);
//     return NextResponse.json(cart, {
//         headers: {
//             'Set-Cookie': `${cartCookieName}=${encodeURIComponent(cookieStr)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=31536000`
//         }
//     });
// }

// \app\api\cart\remove\route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
    const { productId } = await request.json();
    const cartCookieName = 'vitaline_cart';

    const cookieStore = await cookies();
    const cartCookie = cookieStore.get(cartCookieName)?.value;
    let cart = cartCookie ? JSON.parse(cartCookie) : { items: [] };

    cart.items = cart.items.filter((item) => item.productId !== productId);

    const cookieStr = JSON.stringify(cart);
    return NextResponse.json(cart, {
        headers: {
            'Set-Cookie': `${cartCookieName}=${encodeURIComponent(cookieStr)}; Path=/; Max-Age=31536000`
        }
    });
}
