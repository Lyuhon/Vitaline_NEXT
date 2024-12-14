// src/components/ProductsSliderClient.tsx
"use client";

import { useEffect } from 'react';

export default function ProductsSliderClient() {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Предполагаем, что глобальный Swiper уже доступен, так как мы подключили скрипт в layout.tsx
            // Если нет, можно импортировать Swiper из 'swiper' пакета.
            const Swiper = (window as any).Swiper;
            new Swiper('.products_slider', {
                loop: true,
                slidesPerView: 1,
                spaceBetween: 20,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    },
                },
            });
        }
    }, []);

    return null;
}
