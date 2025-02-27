// // // src/app/api/consultation/route.ts

// // import { NextResponse } from 'next/server';

// // // Замените на ваш бот-токен и chat_id
// // const BOT_TOKEN = "7891057087:AAH2c1jOUna7ioHg0AUXzH_ih3fndMr8bDY";
// // const CHAT_ID = "-4669675964";

// // export async function POST(request: Request) {
// //     try {
// //         const data = await request.json();
// //         const { phone, page_url } = data;

// //         // Валидация данных
// //         if (!phone || !page_url) {
// //             return NextResponse.json({ success: false, message: 'Неверные данные.' }, { status: 400 });
// //         }

// //         // Формирование сообщения
// //         const message = `
// // 📋 *Новая заявка на консультацию*

// // *Номер телефона:* ${phone}
// // *Страница:* [Перейти](${page_url})
// //         `;

// //         // Отправка сообщения в Telegram
// //         const telegramResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
// //             method: 'POST',
// //             headers: {
// //                 'Content-Type': 'application/json',
// //             },
// //             body: JSON.stringify({
// //                 chat_id: CHAT_ID,
// //                 text: message,
// //                 parse_mode: 'Markdown',
// //             }),
// //         });

// //         const telegramResult = await telegramResponse.json();

// //         if (telegramResult.ok) {
// //             return NextResponse.json({ success: true, message: 'Заявка успешно отправлена.' });
// //         } else {
// //             console.error('Telegram API Error:', telegramResult);
// //             return NextResponse.json({ success: false, message: 'Ошибка при отправке заявки в Telegram.' }, { status: 500 });
// //         }

// //     } catch (error: any) {
// //         console.error('API Route Error:', error);
// //         return NextResponse.json({ success: false, message: 'Произошла ошибка при обработке запроса.' }, { status: 500 });
// //     }
// // }


// // src/app/api/consultation/route.ts

// import { NextResponse } from 'next/server';

// // Замените на ваш бот-токен и chat_id
// const BOT_TOKEN = "7891057087:AAH2c1jOUna7ioHg0AUXzH_ih3fndMr8bDY";
// const CHAT_ID = "-4669675964";

// export async function POST(request: Request) {
//     try {
//         const data = await request.json();
//         const { phone, page_url } = data;

//         console.log("Полученные данные:", data); // Для отладки

//         // Валидация данных
//         if (!phone || !page_url) {
//             return NextResponse.json({ success: false, message: 'Неверные данные.' }, { status: 400 });
//         }

//         // Формирование сообщения
//         const message = `
// 📋 *Новая заявка на консультацию*

// *Номер телефона:* ${phone}
//         `;

//         console.log("Отправляемое сообщение:", message); // Для отладки

//         // Отправка сообщения в Telegram
//         const telegramResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 chat_id: CHAT_ID,
//                 text: message,
//                 parse_mode: 'Markdown',
//             }),
//         });

//         const telegramResult = await telegramResponse.json();

//         console.log("Ответ Telegram API:", telegramResult); // Для отладки

//         if (telegramResult.ok) {
//             return NextResponse.json({ success: true, message: 'Заявка успешно отправлена.' });
//         } else {
//             console.error('Telegram API Error:', telegramResult);
//             return NextResponse.json({ success: false, message: 'Ошибка при отправке заявки в Telegram.' }, { status: 500 });
//         }

//     } catch (error: any) {
//         console.error('API Route Error:', error);
//         return NextResponse.json({ success: false, message: 'Произошла ошибка при обработке запроса.' }, { status: 500 });
//     }
// }


import { NextResponse } from 'next/server';

const BOT_TOKEN = "7891057087:AAH2c1jOUna7ioHg0AUXzH_ih3fndMr8bDY";
const CHAT_ID = "-4703246839";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { phone, page_path } = data;

        console.log("Полученные данные:", data);

        if (!phone || !page_path) {
            return NextResponse.json({ success: false, message: 'Неверные данные.' }, { status: 400 });
        }

        // Определяем текст страницы заявки
        let pageText = '';
        switch (page_path) {
            case '/login':
                pageText = '*Страница заявки:* Страница входа';
                break;
            case '/about':
                pageText = '*Страница заявки:* О нас';
                break;
            case '/contacts':
                pageText = '*Страница заявки:* Контакты';
                break;
            case '/cart':
                pageText = '*Страница заявки:* Корзина';
                break;
            case '/checkout':
                pageText = '*Страница заявки:* Оплата';
                break;
            case '/checkout/success':
                pageText = '*Страница заявки:* Оформленный заказ';
                break;
            case '/shop':
                pageText = '*Страница заявки:* Каталог';
                break;
            default:
                if (page_path.startsWith('/product/')) {
                    pageText = '*Страница заявки:* Товар';
                } else if (page_path.startsWith('/product-brands/')) {
                    pageText = '*Страница заявки:* Бренд';
                }
            // Для всех остальных страниц pageText останется пустым
        }

        // Форматирование номера телефона для Telegram ссылки
        const cleanPhone = phone.replace(/[\s\(\)\-]/g, '');

        // Формирование сообщения
        const message = `
📋 *Новая заявка на консультацию*

*Номер телефона:* [${phone}](t.me/${cleanPhone})
${pageText ? pageText : ''}
        `.trim();

        console.log("Отправляемое сообщение:", message);

        const telegramResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'Markdown',
            }),
        });

        const telegramResult = await telegramResponse.json();

        console.log("Ответ Telegram API:", telegramResult);

        if (telegramResult.ok) {
            return NextResponse.json({ success: true, message: 'Заявка успешно отправлена.' });
        } else {
            console.error('Telegram API Error:', telegramResult);
            return NextResponse.json({ success: false, message: 'Ошибка при отправке заявки в Telegram.' }, { status: 500 });
        }

    } catch (error: any) {
        console.error('API Route Error:', error);
        return NextResponse.json({ success: false, message: 'Произошла ошибка при обработке запроса.' }, { status: 500 });
    }
}