// app/api/client_error/route.js
import { NextResponse } from 'next/server'

const BOT_TOKEN = "7891057087:AAH2c1jOUna7ioHg0AUXzH_ih3fndMr8bDY"
const CHAT_ID = "-4725311276"

export async function POST(request) {
    try {
        const errorData = await request.json()

        // Локальное логирование для отладки
        console.error('Client Error:', {
            timestamp: errorData.timestamp,
            page: errorData.page,
            error: errorData.errorMessage
        })

        // Отправка в Telegram
        await sendToTelegram(errorData)

        return NextResponse.json({
            success: true,
            message: 'Error sent to Telegram successfully'
        })

    } catch (error) {
        console.error('Failed to process client error:', error)

        return NextResponse.json(
            { success: false, message: 'Failed to send error notification' },
            { status: 500 }
        )
    }
}

async function sendToTelegram(errorData) {
    const message = formatErrorMessage(errorData)

    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`

    try {
        const response = await fetch(telegramUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'HTML',
                disable_web_page_preview: true
            })
        })

        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`Telegram API error: ${response.status} - ${errorText}`)
        }

        const result = await response.json()
        console.log('Message sent to Telegram:', result.message_id)

    } catch (error) {
        console.error('Failed to send to Telegram:', error)
        throw error
    }
}

function formatErrorMessage(errorData) {
    const date = new Date(errorData.timestamp)
    const formattedDate = date.toLocaleString('ru-RU', {
        timeZone: 'Asia/Tashkent',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })

    // Получаем браузер из user agent
    const browser = getBrowserFromUserAgent(errorData.userAgent)

    return `🚨 <b>Ошибка на сайте</b>

<b>Время:</b> ${formattedDate}
<b>URL:</b> <code>${errorData.url}</code>

<b>Платформа:</b> ${errorData.platform}
<b>Браузер:</b> ${browser}

<b>Ошибка:</b> 
<code>${errorData.errorMessage}</code>

${errorData.errorDigest ? `🔍 <b>ID ошибки:</b> <code>${errorData.errorDigest}</code>` : ''}

<i>Пользователь увидел экран "Проверьте интернет-соединение"</i>`
}

function getBrowserFromUserAgent(userAgent) {
    if (!userAgent) return 'Неизвестно'

    if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) return 'Chrome'
    if (userAgent.includes('Firefox')) return 'Firefox'
    if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari'
    if (userAgent.includes('Edg')) return 'Edge'
    if (userAgent.includes('Opera')) return 'Opera'

    return 'Другой'
}

// Опционально: функция для отправки в внешние сервисы
async function sendToMonitoringService(errorData) {
    // Пример интеграции с Sentry
    // Sentry.captureException(new Error(errorData.errorMessage), {
    //     tags: {
    //         page: errorData.page,
    //         platform: errorData.platform
    //     },
    //     extra: errorData
    // })
}

// Опционально: сохранение в базу данных
async function saveErrorToDatabase(errorData) {
    // Пример с Prisma
    // await prisma.clientError.create({
    //     data: {
    //         timestamp: new Date(errorData.timestamp),
    //         page: errorData.page,
    //         platform: errorData.platform,
    //         userAgent: errorData.userAgent,
    //         url: errorData.url,
    //         errorMessage: errorData.errorMessage,
    //         errorStack: errorData.errorStack,
    //         errorDigest: errorData.errorDigest
    //     }
    // })
}