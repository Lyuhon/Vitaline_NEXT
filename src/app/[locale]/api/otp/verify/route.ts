// // src/app/api/otp/verify/route.ts
// import { NextRequest, NextResponse } from 'next/server';

// export async function POST(request: NextRequest) {
//     try {
//         const { phone, otp } = await request.json();

//         if (!phone || !otp) {
//             return NextResponse.json(
//                 { success: false, message: 'Номер телефона и OTP код обязательны' },
//                 { status: 400 }
//             );
//         }

//         const formData = new FormData();
//         formData.append('phone', phone);
//         formData.append('otp', otp);

//         const response = await fetch(
//             'https://retail.vitaline.uz/wp-json/eskiz-otp/v1/verify',
//             {
//                 method: 'POST',
//                 headers: {
//                     'X-API-Key': '83LvG9gl7HxKTZwQFBxz9tSS55YMn4TM',
//                 },
//                 body: formData,
//             }
//         );

//         const data = await response.json();

//         return NextResponse.json(data);
//     } catch (error) {
//         console.error('OTP verify error:', error);
//         return NextResponse.json(
//             { success: false, message: 'Ошибка сервера при проверке OTP' },
//             { status: 500 }
//         );
//     }
// }

// src/app/api/otp/verify/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { phone, otp } = await request.json();

        if (!phone || !otp) {
            return NextResponse.json(
                { success: false, message: 'Номер телефона и OTP код обязательны' },
                { status: 400 }
            );
        }

        const formData = new FormData();
        formData.append('phone', phone);
        formData.append('otp', otp);

        console.log('Sending OTP verification request for phone:', phone, 'OTP:', otp);

        const response = await fetch(
            'https://retail.vitaline.uz/wp-json/eskiz-otp/v1/verify',
            {
                method: 'POST',
                headers: {
                    'X-API-Key': '83LvG9gl7HxKTZwQFBxz9tSS55YMn4TM',
                },
                body: formData,
            }
        );

        const data = await response.json();
        console.log('OTP verification response from external API:', data);

        // Нормализуем ответ для фронтенда
        const normalizedResponse = {
            success: data.success,
            message: data.message,
            verified: data.success && (data.verified === true || data.message === 'OTP код подтвержден')
        };

        console.log('Normalized response:', normalizedResponse);

        return NextResponse.json(normalizedResponse);
    } catch (error) {
        console.error('OTP verify error:', error);
        return NextResponse.json(
            { success: false, message: 'Ошибка сервера при проверке OTP' },
            { status: 500 }
        );
    }
}