// Переделал bcg на <Image>
// /components/HomeSlider.tsx
import React from "react";
import Image from 'next/image';
import HomeSliderSwiper from './HomeSliderSwiper';

const slides = [
    {
        id: 1,
        background: "/banner/califonria-gold-banner.jpg",
        text: "California",
        link: "/product-brands/california-gold-nutrition", // Добавляем ссылки для каждого слайда
    },
    {
        id: 2,
        background: "/banner/vitaline_trade_good_prices.webp",
        text: "Цены от дистрибьютора",
        // link: "/product-brands/childlife", // Добавляем ссылки для каждого слайда
    },
    // {
    //     id: 2,
    //     background: "/banner/banner-carlson.webp",
    //     text: "Carlson Labs",
    //     link: "/product-brands/carlson-labs",
    // },
    {
        id: 3,
        background: "/banner/vitaline_trade_new_rpoducts.webp",
        text: "Новинки",
        link: "/category/novye-postupleniya", // Добавляем ссылки для каждого слайда

    },
];

export default function SimpleSlider() {
    return (
        <section className="home_slider">
            <div className="swiper home_slider_info">
                <div className="swiper-wrapper">
                    {slides.map((slide) => (
                        <div
                            key={slide.id}
                            className="swiper-slide relative"
                        >
                            {/* Next.js Image компонент */}
                            <Image
                                src={slide.background}
                                alt={slide.text}
                                fill
                                className="object-cover object-left rounded-[10px]"
                                priority={slide.id <= 2} // Приоритет для первых двух изображений
                            />

                            {/* Ссылка-обертка, закрывающая весь слайд */}
                            <a
                                href={slide.link}
                                className="absolute inset-0 z-10 cursor-pointer"
                                aria-label={`Перейти к ${slide.text}`}
                            />

                            <div className="overlay_home_sldr relative">
                                <span className="slider_text">{slide.text}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="swiper-button-next sldr_info"></div>
            <div className="swiper-button-prev sldr_info"></div>
            <div className="swiper-pagination"></div>

            <HomeSliderSwiper />
        </section>
    );
}