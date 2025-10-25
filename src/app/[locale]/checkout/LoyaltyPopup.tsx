// // src/app/checkout/LoyaltyPopup.tsx
// 'use client';

// import { useState, useEffect, useRef } from 'react';

// interface LoyaltyPopupProps {
//     isOpen: boolean;
//     onClose: () => void;
// }

// export default function LoyaltyPopup({ isOpen, onClose }: LoyaltyPopupProps) {
//     const popupRef = useRef<HTMLDivElement>(null);
//     const [fadeIn, setFadeIn] = useState(false);

//     // Управление анимацией и стилями элементов корзины
//     useEffect(() => {
//         const summaryElement = document.querySelector('.cart_fill_info .summary_green');

//         if (isOpen) {
//             // Меняем стиль для summary_green при открытии
//             if (summaryElement) {
//                 (summaryElement as HTMLElement).style.position = 'static';
//             }

//             // Небольшая задержка для правильной работы CSS-анимации
//             setTimeout(() => {
//                 setFadeIn(true);
//             }, 10);
//         } else {
//             setFadeIn(false);

//             // Возвращаем исходное значение position при закрытии
//             if (summaryElement) {
//                 (summaryElement as HTMLElement).style.position = '';
//             }
//         }

//         // Очистка при размонтировании
//         return () => {
//             if (summaryElement) {
//                 (summaryElement as HTMLElement).style.position = '';
//             }
//         };
//     }, [isOpen]);

//     // Close when clicking outside the popup
//     useEffect(() => {
//         function handleClickOutside(event: MouseEvent) {
//             if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
//                 // Плавное закрытие
//                 setFadeIn(false);
//                 setTimeout(() => {
//                     onClose();
//                 }, 300); // Совпадает с длительностью transition
//             }
//         }

//         if (isOpen) {
//             document.addEventListener('mousedown', handleClickOutside);
//         }

//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [isOpen, onClose]);

//     // Обработчик плавного закрытия
//     const handleClose = () => {
//         setFadeIn(false);
//         setTimeout(() => {
//             onClose();
//         }, 300); // Совпадает с длительностью transition
//     };

//     if (!isOpen) return null;

//     return (
//         <div
//             className={`fixed inset-0 bg-black z-100 flex items-center justify-center p-4 transition-all duration-300 ease-in-out ${fadeIn ? 'bg-opacity-50' : 'bg-opacity-0'}`}
//             style={{ top: '0', left: '0', right: '0', bottom: '0' }}
//         >
//             <div
//                 ref={popupRef}
//                 className={`bg-white rounded-lg shadow-xl max-w-md w-full p-6 max-h-[70vh] overflow-y-auto transition-transform duration-300 ease-in-out ${fadeIn ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
//             >
//                 <div className="flex justify-between items-center mb-8">
//                     <h2 className="text-xl font-bold text-gray-800">Накопительная система</h2>
//                     <button
//                         onClick={handleClose}
//                         className="text-gray-400 hover:text-gray-600 transition-colors"
//                     >
//                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
//                         </svg>
//                     </button>
//                 </div>

//                 <div className="space-y-4">
//                     <p className="font-bold text-gray-800">💰 Как воспользоваться нашей накопительной системой?</p>
//                     <ol className="list-none space-y-2 text-[#000]">
//                         <li><span className="font-semibold">1️⃣</span> Зарегистрируйтесь через наш телеграм бот <a href="https://t.me/vitalineuz_bot" className="text-orange-500 hover:underline" target="_blank">@vitalineuz_bot</a></li>
//                         <li><span className="font-semibold">2️⃣</span> Укажите Ф.И.О и номер телефона</li>
//                         <li><span className="font-semibold">3️⃣</span> Ву-а-ля! Ваша накопительная карта готова💳</li>
//                     </ol>
//                     <p className="text-[#000]">❇️ При покупке наших товаров отправляйте нам скриншот вашей карты и следите за вашими покупками, и программой лояльности прямо внутри бота.</p>

//                     <div style={{ marginBottom: "40px" }}></div>

//                     <p className="mt-8 font-bold text-gray-800">💰 Jamg&apos;arma sistemasidan qanday foydalansak bo&apos;ladi deysizmi?</p>
//                     <ol className="list-none space-y-2 text-[#000]">
//                         <li><span className="font-semibold">1️⃣</span> Telegram bot orqali <a href="https://t.me/vitalineuz_bot" className="text-orange-500 hover:underline" target="_blank">@vitalineuz_bot</a> ro&apos;yxatdan o&apos;ting</li>
//                         <li><span className="font-semibold">2️⃣</span> F.I.SH va telefon raqamingizni kiriting</li>
//                         <li><span className="font-semibold">3️⃣</span> Vu-a-lya! Sizning jamg&apos;arma kartangiz tayyor💳</li>
//                     </ol>
//                     <p className="text-[#000]">❇️ Buyurtma jarayonida jamg&apos;arma kartangizni skrinshotini bizga jonating va haridlaringiz tarixini botning o&apos;zida kuzatib boring.</p>
//                 </div>

//                 {/* <div className="mt-6 text-center">
//                     <button
//                         onClick={handleClose}
//                         className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
//                     >
//                         Закрыть
//                     </button>
//                 </div> */}
//             </div>
//         </div>
//     );
// }



// src/app/checkout/LoyaltyPopup.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

interface LoyaltyPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoyaltyPopup({ isOpen, onClose }: LoyaltyPopupProps) {
    const t = useTranslations('checkout');
    const popupRef = useRef<HTMLDivElement>(null);
    const [fadeIn, setFadeIn] = useState(false);

    // Управление анимацией и стилями элементов корзины
    useEffect(() => {
        const summaryElement = document.querySelector('.cart_fill_info .summary_green');

        if (isOpen) {
            // Меняем стиль для summary_green при открытии
            if (summaryElement) {
                (summaryElement as HTMLElement).style.position = 'static';
            }

            // Небольшая задержка для правильной работы CSS-анимации
            setTimeout(() => {
                setFadeIn(true);
            }, 10);
        } else {
            setFadeIn(false);

            // Возвращаем исходное значение position при закрытии
            if (summaryElement) {
                (summaryElement as HTMLElement).style.position = '';
            }
        }

        // Очистка при размонтировании
        return () => {
            if (summaryElement) {
                (summaryElement as HTMLElement).style.position = '';
            }
        };
    }, [isOpen]);

    // Close when clicking outside the popup
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                // Плавное закрытие
                setFadeIn(false);
                setTimeout(() => {
                    onClose();
                }, 300); // Совпадает с длительностью transition
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    // Обработчик плавного закрытия
    const handleClose = () => {
        setFadeIn(false);
        setTimeout(() => {
            onClose();
        }, 300); // Совпадает с длительностью transition
    };

    if (!isOpen) return null;

    return (
        <div
            className={`fixed inset-0 bg-black z-100 flex items-center justify-center p-4 transition-all duration-300 ease-in-out ${fadeIn ? 'bg-opacity-50' : 'bg-opacity-0'}`}
            style={{ top: '0', left: '0', right: '0', bottom: '0' }}
        >
            <div
                ref={popupRef}
                className={`bg-white rounded-lg shadow-xl max-w-md w-full p-6 max-h-[70vh] overflow-y-auto transition-transform duration-300 ease-in-out ${fadeIn ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
            >
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-bold text-gray-800">{t('loyalty_system')}</h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <div className="space-y-4">
                    <p className="font-bold text-gray-800">{t('how_to_use_loyalty')}</p>
                    <ol className="list-none space-y-2 text-[#000]">
                        <li><span className="font-semibold">1️⃣</span> {t.rich('register_via_bot', { a: (chunks) => <a href="https://t.me/vitalineuz_bot" className="text-orange-500 hover:underline" target="_blank">{chunks}</a> })}</li>
                        <li><span className="font-semibold">2️⃣</span> {t('enter_name_phone')}</li>
                        <li><span className="font-semibold">3️⃣</span> {t('card_ready')}</li>
                    </ol>
                    <p className="text-[#000]">{t('send_screenshot_track')}</p>
                </div>

            </div>
        </div>
    );
}