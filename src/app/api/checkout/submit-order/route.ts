// // COOKIES
// // src/app/api/checkout/submit-order/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { createOrder } from '@/lib/woocommerce';



// // Опционально можно также указать runtime
// export const runtime = 'nodejs';
// // Увеличиваем время ожидания до 120 секунд
// export const maxDuration = 60;


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

// // Функция для отправки данных о неудачном заказе
// async function sendFailedOrderData(orderData: any, error: any) {
//     try {
//         const failedOrderData = {
//             ...orderData,
//             error_message: error.message || 'Unknown error',
//             failed_at: new Date().toISOString()
//         };

//         const response = await fetch('https://nuxt.vitaline.uz/wp-content/api/failed_orders.php', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(failedOrderData),
//         });

//         if (!response.ok) {
//             console.error('Ошибка при отправке данных о неудачном заказе:', await response.text());
//         }
//     } catch (sendError) {
//         console.error('Ошибка при отправке данных о неудачном заказе:', sendError);
//     }
// }

// export async function POST(request: NextRequest) {
//     let orderData;
//     try {
//         orderData = await request.json();
//         console.log('Получены данные заказа:', JSON.stringify(orderData, null, 2));

//         if (!orderData?.items || !Array.isArray(orderData.items)) {
//             const error = new Error('Неверный формат данных заказа: не найдены items');
//             await sendFailedOrderData(orderData, error);
//             return NextResponse.json(
//                 { message: error.message },
//                 { status: 400 }
//             );
//         }

//         const lineItems = orderData.items.map((item: any) => {
//             return {
//                 product_id: decodeProductId(item.productId),
//                 quantity: item.qty ?? item.quantity ?? 1,
//             };
//         });

//         const formattedOrderData = {
//             payment_method: orderData.paymentMethod || 'cod',
//             payment_method_title: orderData.paymentMethodTitle || 'Оплата при доставке',
//             set_paid: orderData.isPaid || false,
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
//             shipping_lines: [
//                 {
//                     method_id: 'flat_rate',
//                     method_title: orderData.myDeliveryPrice === 500
//                         ? 'Доставка за город'
//                         : 'Доставка по Ташкенту',
//                     total: orderData.myDeliveryPrice === 500
//                         ? '60000'
//                         : '25000'
//                 }
//             ],
//             line_items: lineItems,
//             customer_note: orderData.comment || '',
//         };

//         console.log('Форматированные данные для WooCommerce:', JSON.stringify(formattedOrderData, null, 2));

//         const wooCommerceResponse = await createOrder(formattedOrderData);
//         console.log('Ответ от WooCommerce:', JSON.stringify(wooCommerceResponse, null, 2));

//         const telegramResponse = await fetch('https://nuxt.vitaline.uz/wp-content/api/web_tg.php', {
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
//             const error = new Error(`Ошибка при отправке данных в Telegram: ${errorText}`);
//             await sendFailedOrderData(orderData, error);
//             return NextResponse.json(
//                 { message: 'Ошибка при отправке данных в Telegram', error: errorText },
//                 { status: 500 }
//             );
//         }
//     } catch (error: any) {
//         console.error('Внутренняя ошибка сервера:', error.message);
//         // Отправляем данные о неудачном заказе
//         if (orderData) {
//             await sendFailedOrderData(orderData, error);
//         }
//         return NextResponse.json(
//             { message: 'Внутренняя ошибка сервера', error: error.message },
//             { status: 500 }
//         );
//     }
// }




// // Обогащение но не норм
// // src/app/api/checkout/submit-order/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { createOrder } from '@/lib/woocommerce';

// // Опционально можно также указать runtime
// export const runtime = 'nodejs';
// // Увеличиваем время ожидания до 120 секунд
// export const maxDuration = 60;

// // Интерфейсы для типизации
// interface OrderItem {
//     productId: string;
//     qty: number;
//     selected?: boolean;
// }

// interface WooCommerceLineItem {
//     name: string;
//     price: number;
//     total: string;
//     image: { src: string };
//     sku: string;
// }

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

// // Функция для отправки данных о неудачном заказе
// async function sendFailedOrderData(orderData: any, error: any) {
//     try {
//         const failedOrderData = {
//             ...orderData,
//             error_message: error.message || 'Unknown error',
//             failed_at: new Date().toISOString()
//         };

//         const response = await fetch('https://nuxt.vitaline.uz/wp-content/api/failed_orders.php', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(failedOrderData),
//         });

//         if (!response.ok) {
//             console.error('Ошибка при отправке данных о неудачном заказе:', await response.text());
//         }
//     } catch (sendError) {
//         console.error('Ошибка при отправке данных о неудачном заказе:', sendError);
//     }
// }

// export async function POST(request: NextRequest) {
//     let orderData;
//     try {
//         orderData = await request.json();
//         console.log('Получены данные заказа:', JSON.stringify(orderData, null, 2));

//         if (!orderData?.items || !Array.isArray(orderData.items)) {
//             const error = new Error('Неверный формат данных заказа: не найдены items');
//             await sendFailedOrderData(orderData, error);
//             return NextResponse.json(
//                 { message: error.message },
//                 { status: 400 }
//             );
//         }

//         const lineItems = orderData.items.map((item: any) => {
//             return {
//                 product_id: decodeProductId(item.productId),
//                 quantity: item.qty ?? item.quantity ?? 1,
//             };
//         });

//         const formattedOrderData = {
//             payment_method: orderData.paymentMethod || 'cod',
//             payment_method_title: orderData.paymentMethodTitle || 'Оплата при доставке',
//             set_paid: orderData.isPaid || false,
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
//             shipping_lines: [
//                 {
//                     method_id: 'flat_rate',
//                     method_title: orderData.myDeliveryPrice === 500
//                         ? 'Доставка за город'
//                         : 'Доставка по Ташкенту',
//                     total: orderData.myDeliveryPrice === 500
//                         ? '60000'
//                         : '25000'
//                 }
//             ],
//             line_items: lineItems,
//             customer_note: orderData.comment || '',
//         };

//         console.log('Форматированные данные для WooCommerce:', JSON.stringify(formattedOrderData, null, 2));

//         const wooCommerceResponse = await createOrder(formattedOrderData);
//         console.log('Ответ от WooCommerce:', JSON.stringify(wooCommerceResponse, null, 2));

//         // Обогащаем данные о товарах недостающими полями из ответа WooCommerce
//         const enrichedOrderData = {
//             ...orderData,
//             items: orderData.items.map((item: OrderItem, index: number) => {
//                 const wooCommerceItem: WooCommerceLineItem = wooCommerceResponse.line_items[index];
//                 return {
//                     ...item,
//                     name: wooCommerceItem.name,
//                     price: wooCommerceItem.price,
//                     total: wooCommerceItem.total,
//                     image: wooCommerceItem.image.src,
//                     sku: wooCommerceItem.sku,
//                     slug: wooCommerceItem.name.toLowerCase().replace(/\s+/g, '-')
//                 };
//             })
//         };

//         const telegramResponse = await fetch('https://nuxt.vitaline.uz/wp-content/api/web_tg.php', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(enrichedOrderData),
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
//             const error = new Error(`Ошибка при отправке данных в Telegram: ${errorText}`);
//             await sendFailedOrderData(orderData, error);
//             return NextResponse.json(
//                 { message: 'Ошибка при отправке данных в Telegram', error: errorText },
//                 { status: 500 }
//             );
//         }
//     } catch (error: any) {
//         console.error('Внутренняя ошибка сервера:', error.message);
//         // Отправляем данные о неудачном заказе
//         if (orderData) {
//             await sendFailedOrderData(orderData, error);
//         }
//         return NextResponse.json(
//             { message: 'Внутренняя ошибка сервера', error: error.message },
//             { status: 500 }
//         );
//     }
// }










// // src/app/api/checkout/submit-order/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { createOrder } from '@/lib/woocommerce';

// export const runtime = 'nodejs';
// export const maxDuration = 60;

// interface OrderItem {
//     productId: string;
//     qty: number;
//     selected?: boolean;
//     slug?: string; // если передаётся с клиента
// }

// interface WooCommerceLineItem {
//     name: string;
//     price: number;
//     total: string;
//     image: { src: string };
//     sku: string;
// }

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

// // Функция для отправки данных о неудачном заказе
// async function sendFailedOrderData(orderData: any, error: any) {
//     try {
//         const failedOrderData = {
//             ...orderData,
//             error_message: error.message || 'Unknown error',
//             failed_at: new Date().toISOString(),
//         };

//         const response = await fetch('https://nuxt.vitaline.uz/wp-content/api/failed_orders.php', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(failedOrderData),
//         });

//         if (!response.ok) {
//             console.error('Ошибка при отправке данных о неудачном заказе:', await response.text());
//         }
//     } catch (sendError) {
//         console.error('Ошибка при отправке данных о неудачном заказе:', sendError);
//     }
// }

// export async function POST(request: NextRequest) {
//     let orderData;
//     try {
//         orderData = await request.json();
//         console.log('Получены данные заказа:', JSON.stringify(orderData, null, 2));

//         if (!orderData?.items || !Array.isArray(orderData.items)) {
//             const error = new Error('Неверный формат данных заказа: не найдены items');
//             await sendFailedOrderData(orderData, error);
//             return NextResponse.json({ message: error.message }, { status: 400 });
//         }

//         // Фильтруем только выбранные товары
//         const selectedItems: OrderItem[] = orderData.items.filter((item: OrderItem) => item.selected);
//         if (selectedItems.length === 0) {
//             const error = new Error('Нет выбранных товаров для заказа');
//             await sendFailedOrderData(orderData, error);
//             return NextResponse.json({ message: error.message }, { status: 400 });
//         }

//         // Формируем line_items для WooCommerce, используя только выбранные товары
//         const lineItems = selectedItems.map((item: OrderItem) => ({
//             product_id: decodeProductId(item.productId),
//             quantity: item.qty ?? 1,
//         }));

//         const formattedOrderData = {
//             payment_method: orderData.paymentMethod || 'cod',
//             payment_method_title: orderData.paymentMethodTitle || 'Оплата при доставке',
//             set_paid: orderData.isPaid || false,
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
//             shipping_lines: [
//                 {
//                     method_id: 'flat_rate',
//                     method_title:
//                         orderData.myDeliveryPrice === 500
//                             ? 'Доставка за город'
//                             : 'Доставка по Ташкенту',
//                     total: orderData.myDeliveryPrice === 500 ? '60000' : '25000',
//                 },
//             ],
//             line_items: lineItems,
//             customer_note: orderData.comment || '',
//         };

//         console.log('Форматированные данные для WooCommerce:', JSON.stringify(formattedOrderData, null, 2));

//         const wooCommerceResponse = await createOrder(formattedOrderData);
//         console.log('Ответ от WooCommerce:', JSON.stringify(wooCommerceResponse, null, 2));

//         // Обогащаем данные для Telegram, используя данные из ответа WooCommerce и только выбранные товары
//         const enrichedOrderData = {
//             ...orderData,
//             // Подменяем items на выбранные и обогащённые данные
//             items: selectedItems.map((item: OrderItem, index: number) => {
//                 const wooCommerceItem: WooCommerceLineItem = wooCommerceResponse.line_items[index];
//                 return {
//                     ...item,
//                     name: wooCommerceItem.name,
//                     // Цена теперь конвертируется: делим на 12800
//                     price: wooCommerceItem.price / 128,
//                     // Преобразуем total аналогичным образом (с двумя знаками после запятой)
//                     total: (parseFloat(wooCommerceItem.total) / 128).toFixed(2),
//                     image: wooCommerceItem.image.src,
//                     sku: wooCommerceItem.sku,
//                     // Используем slug из исходного товара, если он есть
//                     slug: item.slug || wooCommerceItem.name.toLowerCase().replace(/\s+/g, '-'),
//                 };
//             }),
//         };

//         const telegramResponse = await fetch('https://nuxt.vitaline.uz/wp-content/api/web_tg.php', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(enrichedOrderData),
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
//             const error = new Error(`Ошибка при отправке данных в Telegram: ${errorText}`);
//             await sendFailedOrderData(orderData, error);
//             return NextResponse.json({ message: 'Ошибка при отправке данных в Telegram', error: errorText }, { status: 500 });
//         }
//     } catch (error: any) {
//         console.error('Внутренняя ошибка сервера:', error.message);
//         if (orderData) {
//             await sendFailedOrderData(orderData, error);
//         }
//         return NextResponse.json({ message: 'Внутренняя ошибка сервера', error: error.message }, { status: 500 });
//     }
// }


// src/app/api/checkout/submit-order/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createOrder } from '@/lib/woocommerce';

export const runtime = 'nodejs';
export const maxDuration = 60;

interface OrderItem {
    productId: string;
    qty: number;
    selected?: boolean;
    slug?: string; // если передаётся с клиента
}

// Определяем интерфейс CartItemDetailed, если он ещё не импортирован
interface CartItemDetailed {
    productId: string;
    name: string;
    price: string;
    qty: number;
    maxQty: number;
    total: number;
    image: string;
    slug: string;
    sku: string;
}

interface WooCommerceLineItem {
    name: string;
    price: number;
    total: string;
    image: { src: string };
    sku: string;
}

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
            failed_at: new Date().toISOString(),
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
            return NextResponse.json({ message: error.message }, { status: 400 });
        }

        // Фильтруем только выбранные товары
        const selectedItems: OrderItem[] = orderData.items.filter((item: OrderItem) => item.selected);
        if (selectedItems.length === 0) {
            const error = new Error('Нет выбранных товаров для заказа');
            await sendFailedOrderData(orderData, error);
            return NextResponse.json({ message: error.message }, { status: 400 });
        }

        // Формируем line_items для WooCommerce, используя только выбранные товары
        const lineItems = selectedItems.map((item: OrderItem) => ({
            product_id: decodeProductId(item.productId),
            quantity: item.qty ?? 1,
        }));

        const formattedOrderData = {
            payment_method: orderData.paymentMethod || 'cod',
            payment_method_title: orderData.paymentMethodTitle || 'Оплата при доставке',
            set_paid: orderData.isPaid || false,
            // status: 'processing',
            status: 'pending',
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
                    method_title:
                        orderData.myDeliveryPrice === 500
                            ? 'Доставка за город'
                            : 'Доставка',
                    total: orderData.myDeliveryPrice === 500 ? '32500' : '32500',
                },
            ],
            line_items: lineItems,
            customer_note: orderData.comment || '',
        };

        console.log('Форматированные данные для WooCommerce:', JSON.stringify(formattedOrderData, null, 2));

        const wooCommerceResponse = await createOrder(formattedOrderData);
        console.log('Ответ от WooCommerce:', JSON.stringify(wooCommerceResponse, null, 2));

        // Далее, при формировании enrichedOrderData, можно сделать так:
        const enrichedOrderData = {
            ...orderData,
            items: selectedItems.map((item: OrderItem, index: number): CartItemDetailed => {
                const wooCommerceItem: WooCommerceLineItem = wooCommerceResponse.line_items[index];
                return {
                    productId: item.productId,
                    name: wooCommerceItem.name,
                    // Делим цену на 12800 и приводим к строке
                    price: (wooCommerceItem.price / 128).toString(),
                    qty: item.qty,
                    // Если maxQty у вас не передаётся из WooCommerce, можно задать значение по умолчанию или вычислить его
                    maxQty: 0, // Здесь подставьте реальное значение, если оно есть
                    // Пересчитываем total и приводим к числу (или оставляем как число)
                    total: parseFloat((parseFloat(wooCommerceItem.total) / 128).toFixed(2)),
                    image: wooCommerceItem.image.src,
                    // Если в исходном объекте slug отсутствует, генерируем его из name
                    slug: item.slug || wooCommerceItem.name.toLowerCase().replace(/\s+/g, '-'),
                    sku: wooCommerceItem.sku,
                };
            }),
        };

        const telegramResponse = await fetch('https://nuxt.vitaline.uz/wp-content/api/web_tg.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(enrichedOrderData),
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
            return NextResponse.json({ message: 'Ошибка при отправке данных в Telegram', error: errorText }, { status: 500 });
        }
    } catch (error: any) {
        console.error('Внутренняя ошибка сервера:', error.message);
        if (orderData) {
            await sendFailedOrderData(orderData, error);
        }
        return NextResponse.json({ message: 'Внутренняя ошибка сервера', error: error.message }, { status: 500 });
    }
}












// Когда сайт работал на куках, «обогащение» происходило не внутри API‑роута, а на клиентской стороне, непосредственно при загрузке страниц корзины и оформления заказа. То есть:

// Из куков извлекались минимальные данные (например, productId, qty, selected).

// На страницах корзины и чекаута с помощью запросов к GraphQL (через функции вроде fetchSingleProductByID и fetchProductsByIds) получалась полная информация по каждому товару (такие поля, как name, price/convertedPrice, image.sourceUrl, sku, slug и прочее).

// Полученные детализированные объекты формировались в полноценный массив объектов корзины (например, типизированных как CartItemDetailed), который затем передавался в контекст (через CartProvider), а далее через CheckoutProvider использовался для формирования заказа.

// Таким образом, обогащение происходило до того, как данные отправлялись на сервер – клиентский код по кукам делал запросы к GraphQL и создавал обогащённый набор данных, который уже потом использовался при оформлении заказа.