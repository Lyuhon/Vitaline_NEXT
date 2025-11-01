// src/app/components/LocaleNotice.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

const LS_KEY = 'vitaline_locale_popup_shown_v1';

export default function LocaleNotice() {
    const pathname = usePathname() || '/';
    const router = useRouter();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        try {
            if (localStorage.getItem(LS_KEY) === 'true') return;

            const path = pathname.toLowerCase();
            const hasRu = path === '/ru' || path.startsWith('/ru/');
            const hasUz = path === '/uz' || path.startsWith('/uz/');

            if (hasUz) return; // уже на узбекском — не показываем
            if (!hasRu) return; // показываем только если пользователь на /ru

            // не показываем на страницах логина и успешной оплаты
            if (path.includes('/login') || path.includes('/checkout/success')) return;

            setVisible(true);
        } catch (e) {
            console.error('LocaleNotice init error', e);
        }
    }, [pathname]);

    const markShown = () => {
        try { localStorage.setItem(LS_KEY, 'true'); } catch (e) { /* ignore */ }
    };

    const handleClose = () => {
        markShown();
        setVisible(false);
    };

    const switchToUz = () => {
        markShown();

        // заменяем первый сегмент ru -> uz, сохраняя остальное
        const segments = pathname.split('/');
        if (segments.length > 1 && segments[1] === 'ru') {
            segments[1] = 'uz';
        } else {
            // если нет сегмента — вставляем uz
            segments.splice(1, 0, 'uz');
        }
        const newPath = segments.join('/') || '/uz';

        try {
            document.cookie = `NEXT_LOCALE=uz; path=/; max-age=31536000`;
        } catch (e) { /* ignore */ }

        router.push(newPath);
        router.refresh();
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-[1200] flex items-end md:items-center justify-center p-4">
            {/* overlay */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={handleClose}
                aria-hidden
            />

            {/* dialog */}
            <div
                className="relative w-full max-w-lg bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 translate-y-6 md:translate-y-0 mb-[30px]"
                role="dialog"
                aria-modal="true"
                aria-label="Уведомление о доступности узбекского языка"
            >

                {/* body: двуязычный текст, аккуратно выровненный */}
                <div className="px-5 py-5 md:py-6">
                    <div className="block">
                        {/* Russian column */}
                        <div>
                            <h4 className="text-sl font-[500] text-gray-900 mb-1">Vitaline Trade - Теперь на узбекском!</h4>
                            <p className="text-sm text-gray-600 leading-relaxed md:mb-8 mb-4">
                                Сайт теперь доступен на узбекском языке. Все разделы и карточки товаров переведены -
                                вы можете переключиться и продолжить покупки на Oʻzbekcha.
                            </p>
                        </div>

                        {/* Uzbek column (Latin) */}
                        <div>
                            <h4 className="text-sl font-[500] text-gray-900 mb-1">Vitaline Trade - Endi o'zbek tilida!</h4>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Sayt endi oʻzbek tilida mavjud. Barcha bo‘limlar va mahsulot sahifalari tarjima qilingan -
                                o‘zbek tiliga o‘tib xaridni davom ettirishingiz mumkin.
                            </p>
                        </div>
                    </div>
                </div>

                {/* actions */}
                <div className="flex flex-col-reverse md:flex-row items-center gap-3 px-5 py-4 bg-gray-50 border-t border-gray-100">
                    <button
                        onClick={handleClose}
                        className="grow w-full md:w-auto flex-1 md:flex-none px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                        style={{ border: '1px solid black', flexGrow: 1 }}
                    >
                        Закрыть / Yopish
                    </button>

                    <button
                        onClick={switchToUz}
                        className="grow w-full md:w-auto flex-1 md:flex-none px-4 py-2 rounded-lg bg-[#ebffa380] text-black text-sm font-[500] hover:opacity-95 transition shadow-sm"
                        style={{ border: '1px solid black', flexGrow: 1 }}
                    >
                        Перейти на Oʻzbekcha
                    </button>
                </div>
            </div>
        </div>
    );
}
