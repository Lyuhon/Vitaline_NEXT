'use client';

import { usePathname, useRouter } from 'next/navigation';
import { locales, localeNames, type Locale } from '@/i18n/config';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

export default function LanguageSwitcher() {
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = useLocale() as Locale;
    const [hoveredLocale, setHoveredLocale] = useState<Locale | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Закрытие dropdown при клике вне компонента
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const switchLanguage = (newLocale: Locale) => {
        if (newLocale === currentLocale) {
            setIsOpen(false);
            return;
        }

        const segments = pathname.split('/');
        segments[1] = newLocale;
        const newPath = segments.join('/');

        document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;

        setIsOpen(false);
        router.push(newPath);
        router.refresh();
    };

    return (
        <>
            {/* Мобильная версия (до md) */}
            <div className="md:hidden relative" ref={dropdownRef}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center p-1 rounded-md bg-orange-50 ring-2 ring-[#FF7900] hover:bg-orange-100 transition-all"
                    aria-label="Выбрать язык"
                >
                    <Image
                        src={`/icons/flag_${currentLocale}.svg`}
                        alt={localeNames[currentLocale]}
                        width={30}
                        height={30}
                        className="rounded-sm"
                    />
                </button>

                {/* Dropdown меню */}
                {isOpen && (
                    <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[160px] z-50 animate-fade-in">
                        {locales.map((locale) => (
                            <button
                                key={locale}
                                onClick={() => switchLanguage(locale)}
                                className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors ${currentLocale === locale ? 'bg-orange-50 text-[#FF7900]' : 'text-gray-900 bg-white'
                                    }`}
                            >
                                <Image
                                    src={`/icons/flag_${locale}.svg`}
                                    alt={localeNames[locale]}
                                    width={24}
                                    height={24}
                                    className="rounded-sm"
                                />
                                <span className="text-sm font-medium">{localeNames[locale]}</span>
                                {currentLocale === locale && (
                                    <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Десктопная версия (от md и выше) */}
            <div className="hidden md:flex gap-2 items-center">
                {locales.map((locale) => (
                    <div key={locale} className="relative">
                        <button
                            onClick={() => switchLanguage(locale)}
                            onMouseEnter={() => setHoveredLocale(locale)}
                            onMouseLeave={() => setHoveredLocale(null)}
                            className={`relative p-1 rounded-md transition-all duration-200 ${currentLocale === locale
                                ? 'bg-orange-50 ring-1 ring-[#FF7900] hover:bg-gray-100'
                                : 'hover:bg-gray-100 bg-white opacity-60 hover:opacity-100'
                                }`}
                            aria-label={`Переключить язык на ${localeNames[locale]}`}
                        >
                            <Image
                                src={`/icons/flag_${locale}.svg`}
                                alt={localeNames[locale]}
                                width={24}
                                height={24}
                                className="rounded-sm"
                            />
                        </button>

                        {/* Tooltip */}
                        {hoveredLocale === locale && (
                            <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap z-50 animate-fade-in">
                                {localeNames[locale]}
                                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}