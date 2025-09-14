// // app/contacts/error.tsx
// 'use client'

// import { useEffect, useState } from 'react'

// export default function ContactsError({
//     error,
//     reset,
// }: {
//     error: Error & { digest?: string }
//     reset: () => void
// }) {
//     const [progress, setProgress] = useState(0)
//     const [timeLeft, setTimeLeft] = useState(5)

//     useEffect(() => {
//         const totalTime = 5000 // 3 секунды
//         const interval = 50 // обновляем каждые 50мс

//         const timer = setInterval(() => {
//             setProgress(prev => {
//                 const newProgress = prev + (interval / totalTime) * 100
//                 if (newProgress >= 100) {
//                     reset()
//                     return 100
//                 }
//                 return newProgress
//             })

//             setTimeLeft(prev => Math.max(0, prev - interval / 1000))
//         }, interval)

//         return () => clearInterval(timer)
//     }, [reset])

//     return (
//         <div className="pt-12 flex items-center justify-center bg-white">
//             <div className="text-center p-12 max-w-md mx-auto">
//                 {/* Иконка витамина/капсулы */}
//                 <div className="mb-8">
//                     <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center">
//                         <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
//                         </svg>
//                     </div>
//                 </div>

//                 <h2 className="text-2xl font-light text-gray-900 mb-3">
//                     Временная неполадка
//                 </h2>

//                 <p className="text-gray-500 text-sm mb-8 leading-relaxed">
//                     Автоматическая перезагрузка через<br />
//                     <span className="font-medium text-orange-500">{Math.ceil(timeLeft)}с</span>
//                 </p>

//                 {/* Реальный прогресс бар */}
//                 <div className="w-full bg-gray-200 rounded-full h-2 mb-6 overflow-hidden">
//                     <div
//                         className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full transition-all duration-75 ease-linear"
//                         style={{ width: `${progress}%` }}
//                     ></div>
//                 </div>

//                 <button
//                     onClick={reset}
//                     className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md"
//                 >
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//                     </svg>
//                     Обновить сейчас
//                 </button>

//                 <p className="text-xs text-gray-400 mt-4">
//                     Если проблема повторяется, <a className="text-orange-400 hover:text-orange-500 underline" href="https://t.me/abdelmansur">свяжитесь с поддержкой</a>
//                 </p>
//             </div>
//         </div>
//     )
// }










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