// // // src/app/api/checkout/submit-order/route.ts
// // import { NextRequest, NextResponse } from 'next/server';

// // export async function POST(request: NextRequest) {
// //     try {
// //         const orderData = await request.json();
// //         console.log('Получены данные заказа:', orderData);

// //         const response = await fetch('https://nuxt.vitaline.uz/wp-content/api/web_tg_test.php', {
// //             // const response = await fetch('https://nuxt.vitaline.uz/wp-content/api/web_tg_test.php', {
// //             method: 'POST',
// //             headers: {
// //                 'Content-Type': 'application/json',
// //             },
// //             body: JSON.stringify(orderData),
// //         });

// //         console.log('Ответ от web_tg.php:', response.status);

// //         if (response.ok) {
// //             return NextResponse.json({ message: 'Order submitted successfully' }, { status: 200 });
// //         } else {
// //             const errorText = await response.text();
// //             console.error('Ошибка при отправке данных:', errorText);
// //             return NextResponse.json({ message: 'Ошибка при отправке данных' }, { status: 500 });
// //         }
// //     } catch (error) {
// //         console.error('Внутренняя ошибка сервера:', error);
// //         return NextResponse.json({ message: 'Внутренняя ошибка сервера' }, { status: 500 });
// //     }
// // }







// // src/app/api/checkout/submit-order/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { createOrder } from '@/lib/woocommerce';

// function decodeProductId(encodedId: string): number {
//     try {
//         const decodedString = Buffer.from(encodedId, 'base64').toString('utf-8');
//         const parts = decodedString.split(':');
//         if (parts.length !== 2) {
//             throw new Error('Неверный формат decodedString');
//         }
//         const numericId = parseInt(parts[1], 10);
//         if (isNaN(numericId)) {
//             throw new Error('Не удалось преобразовать ID в число');
//         }
//         return numericId;
//     } catch (error) {
//         console.error('Ошибка декодирования productId:', error);
//         throw new Error('Invalid product ID format');
//     }
// }

// export async function POST(request: NextRequest) {
//     try {
//         const orderData = await request.json();
//         console.log('Получены данные заказа:', JSON.stringify(orderData, null, 2));

//         if (!orderData?.items || !Array.isArray(orderData.items)) {
//             return NextResponse.json(
//                 { message: 'Неверный формат данных заказа: не найдены items' },
//                 { status: 400 }
//             );
//         }

//         // ВАЖНО: убедитесь, какое поле реально приходит с фронта, "quantity" или "qty"
//         const lineItems = orderData.items.map((item: any) => {
//             return {
//                 product_id: decodeProductId(item.productId),
//                 // quantity: item.quantity,
//                 // Если ваше поле называется "qty", используйте:
//                 quantity: item.qty ?? item.quantity ?? 1,
//             };
//         });

//         const formattedOrderData = {
//             payment_method: orderData.paymentMethod || 'cod',
//             payment_method_title: orderData.paymentMethodTitle || 'Оплата при доставке',
//             set_paid: orderData.isPaid || false,

//             // Добавляем статус "processing"
//             status: 'processing',

//             billing: {
//                 first_name: orderData.customerInfo?.firstName || '',
//                 last_name: orderData.customerInfo?.shopName || '',
//                 address_1: orderData.deliveryAddress?.full_address || '',
//                 city: orderData.deliveryAddress?.city || '',
//                 postcode: '100000',
//                 country: 'UZ',
//                 email: orderData.customerInfo?.email || 'customer@vitaline-trade.com',
//                 phone: orderData.customerInfo?.phone || '',
//             },
//             shipping: {
//                 first_name: orderData.customerInfo?.firstName || '',
//                 last_name: orderData.customerInfo?.shopName || '',
//                 address_1: orderData.deliveryAddress?.full_address || '',
//                 city: orderData.deliveryAddress?.city || '',
//                 postcode: '100000',
//                 country: 'UZ',
//             },
//             line_items: lineItems,
//             customer_note: orderData.comment || '',
//         };

//         console.log('Форматированные данные для WooCommerce:', JSON.stringify(formattedOrderData, null, 2));

//         const wooCommerceResponse = await createOrder(formattedOrderData);
//         console.log('Ответ от WooCommerce:', JSON.stringify(wooCommerceResponse, null, 2));

//         const telegramResponse = await fetch('https://nuxt.vitaline.uz/wp-content/api/web_tg_.php', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(orderData),
//         });

//         console.log('Ответ от Telegram:', telegramResponse.status);

//         if (telegramResponse.ok) {
//             return NextResponse.json(
//                 {
//                     message: 'Order submitted successfully',
//                     wooCommerceResponse,
//                 },
//                 { status: 200 }
//             );
//         } else {
//             const errorText = await telegramResponse.text();
//             console.error('Ошибка при отправке данных в Telegram:', errorText);
//             return NextResponse.json(
//                 { message: 'Ошибка при отправке данных в Telegram', error: errorText },
//                 { status: 500 }
//             );
//         }
//     } catch (error: any) {
//         console.error('Внутренняя ошибка сервера:', error.message);
//         return NextResponse.json(
//             { message: 'Внутренняя ошибка сервера', error: error.message },
//             { status: 500 }
//         );
//     }
// }


// src/app/api/checkout/submit-order/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createOrder } from '@/lib/woocommerce';



// Опционально можно также указать runtime
export const runtime = 'nodejs';
// Увеличиваем время ожидания до 120 секунд
export const maxDuration = 60;


function decodeProductId(encodedId: string): number {
    try {
        const decodedString = Buffer.from(encodedId, 'base64').toString('utf-8');
        const parts = decodedString.split(':');
        if (parts.length !== 2) {
            throw new Error('Неверный формат decodedString');
        }
        const numericId = parseInt(parts[1], 10);
        if (isNaN(numericId)) {
            throw new Error('Не удалось преобразовать ID в число');
        }
        return numericId;
    } catch (error) {
        console.error('Ошибка декодирования productId:', error);
        throw new Error('Invalid product ID format');
    }
}

// Функция для отправки данных о неудачном заказе
async function sendFailedOrderData(orderData: any, error: any) {
    try {
        const failedOrderData = {
            ...orderData,
            error_message: error.message || 'Unknown error',
            failed_at: new Date().toISOString()
        };

        const response = await fetch('https://nuxt.vitaline.uz/wp-content/api/failed_orders.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(failedOrderData),
        });

        if (!response.ok) {
            console.error('Ошибка при отправке данных о неудачном заказе:', await response.text());
        }
    } catch (sendError) {
        console.error('Ошибка при отправке данных о неудачном заказе:', sendError);
    }
}

export async function POST(request: NextRequest) {
    let orderData;
    try {
        orderData = await request.json();
        console.log('Получены данные заказа:', JSON.stringify(orderData, null, 2));

        if (!orderData?.items || !Array.isArray(orderData.items)) {
            const error = new Error('Неверный формат данных заказа: не найдены items');
            await sendFailedOrderData(orderData, error);
            return NextResponse.json(
                { message: error.message },
                { status: 400 }
            );
        }

        const lineItems = orderData.items.map((item: any) => {
            return {
                product_id: decodeProductId(item.productId),
                quantity: item.qty ?? item.quantity ?? 1,
            };
        });

        const formattedOrderData = {
            payment_method: orderData.paymentMethod || 'cod',
            payment_method_title: orderData.paymentMethodTitle || 'Оплата при доставке',
            set_paid: orderData.isPaid || false,
            status: 'processing',
            billing: {
                first_name: orderData.customerInfo?.firstName || '',
                last_name: orderData.customerInfo?.shopName || '',
                address_1: orderData.deliveryAddress?.full_address || '',
                city: orderData.deliveryAddress?.city || '',
                postcode: '100000',
                country: 'UZ',
                email: orderData.customerInfo?.email || 'customer@vitaline-trade.com',
                phone: orderData.customerInfo?.phone || '',
            },
            shipping: {
                first_name: orderData.customerInfo?.firstName || '',
                last_name: orderData.customerInfo?.shopName || '',
                address_1: orderData.deliveryAddress?.full_address || '',
                city: orderData.deliveryAddress?.city || '',
                postcode: '100000',
                country: 'UZ',
            },
            shipping_lines: [
                {
                    method_id: 'flat_rate',
                    method_title: orderData.myDeliveryPrice === 500
                        ? 'Доставка за город'
                        : 'Доставка по Ташкенту',
                    total: orderData.myDeliveryPrice === 500
                        ? '60000'
                        : '25000'
                }
            ],
            line_items: lineItems,
            customer_note: orderData.comment || '',
        };

        console.log('Форматированные данные для WooCommerce:', JSON.stringify(formattedOrderData, null, 2));

        const wooCommerceResponse = await createOrder(formattedOrderData);
        console.log('Ответ от WooCommerce:', JSON.stringify(wooCommerceResponse, null, 2));

        const telegramResponse = await fetch('https://nuxt.vitaline.uz/wp-content/api/web_tg.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });

        console.log('Ответ от Telegram:', telegramResponse.status);

        if (telegramResponse.ok) {
            return NextResponse.json(
                {
                    message: 'Order submitted successfully',
                    wooCommerceResponse,
                },
                { status: 200 }
            );
        } else {
            const errorText = await telegramResponse.text();
            console.error('Ошибка при отправке данных в Telegram:', errorText);
            const error = new Error(`Ошибка при отправке данных в Telegram: ${errorText}`);
            await sendFailedOrderData(orderData, error);
            return NextResponse.json(
                { message: 'Ошибка при отправке данных в Telegram', error: errorText },
                { status: 500 }
            );
        }
    } catch (error: any) {
        console.error('Внутренняя ошибка сервера:', error.message);
        // Отправляем данные о неудачном заказе
        if (orderData) {
            await sendFailedOrderData(orderData, error);
        }
        return NextResponse.json(
            { message: 'Внутренняя ошибка сервера', error: error.message },
            { status: 500 }
        );
    }
}
