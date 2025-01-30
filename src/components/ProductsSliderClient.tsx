// src/components/ProductsSliderClient.tsx
"use client";

import { useEffect } from 'react';

export default function ProductsSliderClient() {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Предполагаем, что глобальный Swiper уже доступен, так как мы подключили скрипт в layout.tsx
            // Если нет, можно импортировать Swiper из 'swiper' пакета.
            const Swiper = (window as any).Swiper;
            new Swiper('#slider_sales .products_slider', {
                loop: true,
                slidesPerView: 2,
                spaceBetween: 20,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
                navigation: {
                    nextEl: '#slider_sales .swiper-button-next',
                    prevEl: '#slider_sales .swiper-button-prev',
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

            new Swiper('#slider_bestsellers .products_slider', {
                loop: true,
                slidesPerView: 1.8,
                spaceBetween: 20,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
                navigation: {
                    nextEl: '#slider_bestsellers .swiper-button-next',
                    prevEl: '#slider_bestsellers .swiper-button-prev',
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

            new Swiper('#slider_newarrivals .products_slider', {
                loop: true,
                slidesPerView: 1.8,
                spaceBetween: 20,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
                navigation: {
                    nextEl: '#slider_newarrivals .swiper-button-next',
                    prevEl: '#slider_newarrivals .swiper-button-prev',
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
