// app/contacts/error.tsx
'use client'

import { useEffect, useState } from 'react'

export default function ContactsError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    const [progress, setProgress] = useState(0)
    const [timeLeft, setTimeLeft] = useState(5)

    useEffect(() => {
        const totalTime = 5000 // 3 секунды
        const interval = 50 // обновляем каждые 50мс

        const timer = setInterval(() => {
            setProgress(prev => {
                const newProgress = prev + (interval / totalTime) * 100
                if (newProgress >= 100) {
                    reset()
                    return 100
                }
                return newProgress
            })

            setTimeLeft(prev => Math.max(0, prev - interval / 1000))
        }, interval)

        return () => clearInterval(timer)
    }, [reset])

    return (
        <div className="pt-12 flex items-center justify-center bg-white">
            <div className="text-center p-12 max-w-md mx-auto">
                {/* Иконка витамина/капсулы */}
                <div className="mb-8">
                    <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>

                <h2 className="text-2xl font-light text-gray-900 mb-3">
                    Временная неполадка
                </h2>

                <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                    Автоматическая перезагрузка через<br />
                    <span className="font-medium text-orange-500">{Math.ceil(timeLeft)}с</span>
                </p>

                {/* Реальный прогресс бар */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-6 overflow-hidden">
                    <div
                        className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full transition-all duration-75 ease-linear"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                <button
                    onClick={reset}
                    className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Обновить сейчас
                </button>

                <p className="text-xs text-gray-400 mt-4">
                    Если проблема повторяется, <a className="text-orange-400 hover:text-orange-500 underline" href="https://t.me/abdelmansur">свяжитесь с поддержкой</a>
                </p>
            </div>
        </div>
    )
}