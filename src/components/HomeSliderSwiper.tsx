// src/components/HomeSliderSwiper.tsx
"use client";

import { useEffect } from 'react';

export default function ProductsSliderClient() {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Предполагаем, что глобальный Swiper уже доступен, так как мы подключили скрипт в layout.tsx
            // Если нет, можно импортировать Swiper из 'swiper' пакета.
            const Swiper = (window as any).Swiper;
            new Swiper('.home_slider_info', {
                loop: true,
                slidesPerView: 1,
                spaceBetween: 20,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                navigation: {
                    nextEl: '.swiper-button-next.sldr_info',
                    prevEl: '.swiper-button-prev.sldr_info',
                },
                breakpoints: {
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    },
                    768: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    },
                    1024: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    },
                },
            });
        }
    }, []);

    return null;
}
