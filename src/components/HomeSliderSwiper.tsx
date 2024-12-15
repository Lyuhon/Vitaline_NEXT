// src/components/HomeSliderSwiper.tsx
"use client";

import { useEffect } from 'react';

export default function ProductsSliderClient() {
    useEffect(() => {
        const interval = setInterval(() => {
            if (typeof window !== 'undefined' && (window as any).Swiper) {
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
                clearInterval(interval);
            }
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return null;
}
