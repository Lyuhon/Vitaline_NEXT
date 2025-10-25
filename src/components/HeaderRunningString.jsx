'use client'

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';

export default function HeaderRunningString() {
    const t = useTranslations('runningString');
    const locale = useLocale();

    const handleClick = () => {
        window.open('https://t.me/vt_trade_news_bot', '_blank');
    };

    const BellIcon = () => (
        <span className="relative inline-flex items-center justify-center w-8 h-8 border border-black rounded-full bg-[#eeeeee] z-[2]"
            style={{ border: '1px solid #000', borderRadius: '50%' }}>
            <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-black"
            >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <span className="absolute top-[0px] right-[0px] w-2 h-2 bg-red-600 rounded-full"></span>
        </span>
    );

    const TextContent = () => {
        if (locale === 'uz') {
            return (
                <>
                    {t('icon')} <span className="font-medium">{t('newProducts')}</span> {t('and')} {t('newsAbout')} {t('inOurBot')} <span className="font-medium">{t('botName')}</span> <span className="px-2">{t('separator')}</span>
                </>
            );
        }

        // Русский (по умолчанию)
        return (
            <>
                {t('icon')} {t('news')} <span className="font-medium">{t('assortment')}</span> {t('canLearn')} <span className="font-medium">{t('botName')}</span> <span className="px-2">{t('separator')}</span>
            </>
        );
    };

    return (
        <div
            onClick={handleClick}
            className="w-full bg-[#eeeeee] pl-2 md:pl-[unset] md:pt-3 pt-4 py-3 overflow-hidden shadow-lg cursor-pointer hover:bg-gray-200 transition-colors relative"
        >
            <div className="flex items-center md:pl-8">
                {/* Фиксированный колокольчик слева */}
                <div className="absolute left-0 bg-[#eeeeee] pl-2"
                    style={{ borderRadius: '0 50% 50% 0' }}>
                    <BellIcon />
                </div>

                {/* Прокручивающийся текст */}
                <div className="flex overflow-hidden w-full">
                    <div className="flex animate-scroll whitespace-nowrap">
                        <span className="text-black font-normal text-sm md:text-sm">
                            <TextContent />
                        </span>
                        <span className="text-black font-normal text-sm md:text-sm">
                            <TextContent />
                        </span>
                        <span className="text-black font-normal text-sm md:text-sm">
                            <TextContent />
                        </span>
                        <span className="text-black font-normal text-sm md:text-sm">
                            <TextContent />
                        </span>
                        <span className="text-black font-normal text-sm md:text-sm">
                            <TextContent />
                        </span>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-33.333%);
                    }
                }

                .animate-scroll {
                    animation: scroll 30s linear infinite;
                }

                @media (max-width: 768px) {
                    .animate-scroll {
                        animation: scroll 20s linear infinite;
                    }
                }
            `}</style>
        </div>
    );
}