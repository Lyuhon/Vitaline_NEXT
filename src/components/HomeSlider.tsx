import React from "react";

import HomeSliderSwiper from './HomeSliderSwiper';

const slides = [
    {
        id: 1,
        background: "https://www.vitaline.uz/wp-content/uploads/2024/05/child-min.jpg",
        text: "Child Life",
    },
    {
        id: 2,
        background: "https://www.vitaline.uz/wp-content/uploads/2021/03/carlson-min.jpg",
        text: "Carlson labs",
    },
    {
        id: 3,
        background: "https://www.vitaline.uz/wp-content/uploads/2024/05/oblozhka-dlya-sajta3-2-min.jpg",
        text: "DR. Mercola",
    },
    {
        id: 4,
        background: "https://www.vitaline.uz/wp-content/uploads/2021/03/62e2dff2-4958-409a-b9b3-034fda03ddc1.jpeg",
        text: "Solgar",
    },
    {
        id: 5,
        background: "https://www.vitaline.uz/wp-content/uploads/2022/12/2.jpg",
        text: "ПЕРЕЙТИ",
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
                            className="swiper-slide"
                            style={{
                                backgroundImage: `url(${slide.background})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            <div className="overlay_home_sldr">
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
