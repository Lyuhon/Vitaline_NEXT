// // COOKIES
// // \app\api\cart\remove-selected\route.js
// import { NextResponse } from 'next/server';
// import { cookies } from 'next/headers';

// export async function POST(request) {
//     const cartCookieName = 'vitaline_cart';

//     // Считываем куку
//     const cookieStore = await cookies();
//     const cartCookie = cookieStore.get(cartCookieName)?.value;
//     let cart = cartCookie ? JSON.parse(cartCookie) : { items: [] };

//     // Убираем из корзины товары, у которых selected === true
//     cart.items = cart.items.filter((item) => item.selected !== true);

//     // Перезаписываем куку
//     const cookieStr = JSON.stringify(cart);
//     return NextResponse.json(cart, {
//         headers: {
//             'Set-Cookie': `${cartCookieName}=${encodeURIComponent(cookieStr)}; Path=/; Max-Age=31536000`,
//         },
//     });
// }


// LOCAL STORAGE
// \app\api\cart\remove-selected\route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        // Возвращаем успешный ответ, так как логика удаления 
        // будет происходить на клиенте средствами localStorage
        return NextResponse.json({
            message: 'Запрос на удаление обработан',
            success: true
        });
    } catch (error) {
        return NextResponse.json({
            message: 'Ошибка при удалении товаров',
            success: false
        }, { status: 500 });
    }
}