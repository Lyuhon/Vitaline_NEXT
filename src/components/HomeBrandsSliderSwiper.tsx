// src/components/HomeBrandsSliderSwiper.tsx
"use client";

import { useEffect } from 'react';

export default function ProductsSliderClient() {
    useEffect(() => {
        const interval = setInterval(() => {
            if (typeof window !== 'undefined' && (window as any).Swiper) {
                const Swiper = (window as any).Swiper;
                new Swiper('.brands_list_slider', {
                    loop: true,
                    // Автоскролл каждые 5 секунд
                    autoplay: {
                        delay: 5000,
                        disableOnInteraction: false,
                    },
                    // Количество одновременно видимых слайдов
                    // и количество пролистываемых за раз (slidesPerGroup)
                    slidesPerView: 4,
                    slidesPerGroup: 3,
                    spaceBetween: 12,

                    // Буллет-пагинация
                    // pagination: {
                    //     el: '.swiper-pagination',
                    //     clickable: true,
                    // },

                    // Если хотите стрелки (просто для примера):
                    // navigation: {
                    //   nextEl: '.swiper-button-next',
                    //   prevEl: '.swiper-button-prev',
                    // },

                    // Адаптив (пример):
                    breakpoints: {
                        // Мобильные
                        0: {
                            slidesPerView: 4,
                            // slidesPerGroup: 4,
                            spaceBetween: 10,
                        },
                        // Планшеты
                        768: {
                            slidesPerView: 6,
                            // slidesPerGroup: 5,
                            spaceBetween: 16,
                        },
                        // Десктоп
                        1024: {
                            slidesPerView: 8,
                            // slidesPerGroup: 3,
                            spaceBetween: 12,
                        },
                    },
                });

                clearInterval(interval);
            }
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return null;
}
