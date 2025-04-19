// pages/notification.js или pages/notification.tsx или app/notification/page.tsx
import Head from 'next/head';
import Image from 'next/image';

export default function NotificationPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex flex-col items-center justify-center p-4">
            {/* Используем Head только если это pages директория, а не app директория */}
            {typeof Head !== 'undefined' && (
                <Head>
                    <title>VitaLine - Техническое обслуживание</title>
                    <meta name="description" content="Сайт временно не работает в связи с проведением инвентаризации" />
                </Head>
            )}

            <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Верхняя полоса с акцентным цветом */}
                <div className="h-3 bg-[#ff7900]"></div>

                <div className="p-8 md:p-12">
                    {/* Лого - скрыто */}
                    <div className="hidden flex justify-center mb-8">
                        <div className="relative h-16 w-48">
                            <Image
                                src="/vitaline-logo.webp"
                                alt="VitaLine Logo"
                                fill
                                style={{ objectFit: "contain" }}
                                priority
                            />
                        </div>
                    </div>

                    {/* Содержание уведомления */}
                    <div className="space-y-8">
                        {/* Русский текст */}
                        <div className="text-center space-y-4">
                            <h2 className="text-2xl font-bold text-gray-800">Уважаемые клиенты!</h2>
                            <p className="text-lg text-gray-700">
                                Сайт временно не работает в связи с проведением инвентаризации.
                                <br />
                                Мы скоро всё завершим и снова будем рады видеть вас онлайн!
                                <br />
                                Спасибо за понимание и поддержку.
                            </p>
                            <p className="text-lg font-medium text-gray-800">С любовью, команда Vitaline</p>
                        </div>

                        {/* Разделитель */}
                        <hr className="border-gray-200" />

                        {/* Узбекский текст - исправлен апостроф */}
                        <div className="text-center space-y-4">
                            <h2 className="text-2xl font-bold text-gray-800">Hurmatli mijozlar!</h2>
                            <p className="text-lg text-gray-700">
                                Inventarizatsiya (qayta hisob-kitob) sababli saytimiz vaqtincha ishlamayapti.
                                <br />
                                Tez orada ishni yakunlab, yana sizga xizmat ko&apos;rsatamiz!
                                <br />
                                Tushunganingiz uchun rahmat.
                            </p>
                            <p className="text-lg font-medium text-gray-800">Hurmat bilan, Vitaline jamoasi</p>
                        </div>

                        {/* Контактная информация */}
                        <div className="mt-8 flex flex-col items-center justify-center">
                            <p style={{ textAlign: "center" }} className="text-lg font-medium text-gray-800 mb-2">Остались вопросы? <br />Свяжитесь с нами:</p>
                            <a
                                href="tel:+998911660090"
                                className="flex items-center space-x-2 px-6 py-3 bg-[#ff7900] text-white font-medium rounded-lg shadow-md hover:bg-[#e66f00] transition-colors duration-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                                <span>+998 91 166 00 90</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Текущая дата */}
            <div className="mt-8 text-gray-500">
                <p>{new Date().toLocaleDateString()}</p>
            </div>
        </div>
    );
}