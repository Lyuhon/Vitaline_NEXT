// // app/contacts/error.tsx
'use client'

import { useEffect } from 'react'

export default function ContactsError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    // Отправка информации об ошибке на сервер
    useEffect(() => {
        const sendErrorInfo = async () => {
            try {
                await fetch('/api/client_error', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        timestamp: new Date().toISOString(),
                        platform: navigator.platform,
                        userAgent: navigator.userAgent,
                        errorMessage: error.message,
                        errorStack: error.stack,
                        errorDigest: error.digest,
                        url: window.location.href,
                        page: window.location.pathname
                    })
                })
            } catch (e) {
                // Игнорируем ошибки отправки логов
                console.warn('Failed to send error info:', e)
            }
        }

        sendErrorInfo()
    }, [error])

    const handleGoHome = () => {
        // Hard redirect на главную страницу (как переход по ссылке)
        window.location.href = '/'
    }

    return (
        <div className="md:min-h-screen min-h-[70vh] flex items-center justify-center p-4">
            <div className="text-center p-8 max-w-md mx-auto">
                {/* Иконка подключения */}
                <div className="mb-8">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/25">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                        </svg>
                    </div>
                </div>

                <h2 className="md:text-3xl text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
                    Проблемы с подключением
                </h2>

                <p className="text-gray-600 text-base mb-8 leading-relaxed">
                    Проверьте интернет-соединение или попробуйте позже
                </p>

                <button
                    onClick={handleGoHome}
                    className="group inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white md:px-8 px-6 md:py-4 py-3 rounded-xl transition-all duration-300 text-base font-[500] shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 hover:scale-105 active:scale-95"
                >
                    {/* <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m0 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10M9 21h6" />
                    </svg> */}
                    обновить страницу
                </button>

                <div className="md:mt-8 mt-4 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                        Если проблема повторяется,{' '}
                        <a
                            className="text-orange-500 hover:text-orange-600 font-medium underline underline-offset-2 decoration-2 hover:decoration-orange-600 transition-colors"
                            href="https://t.me/abdelmansur"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            обратитесь в поддержку
                        </a>
                    </p>
                </div>

                {/* Декоративные элементы */}
                <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-orange-400/10 to-red-400/10 rounded-full blur-xl"></div>
                <div className="absolute bottom-4 left-4 w-24 h-24 bg-gradient-to-br from-red-400/10 to-orange-400/10 rounded-full blur-xl"></div>
            </div>
        </div>
    )
}