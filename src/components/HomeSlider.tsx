// import React from "react";

// import HomeSliderSwiper from './HomeSliderSwiper';

// const slides = [
//     {
//         id: 1,
//         background: "https://retail.vitaline.uz/wp-content/uploads/2025/07/califonria-gold-banner.jpg",
//         text: "California",
//     },
//     {
//         id: 2,
//         background: "https://nuxt.vitaline.uz/wp-content/next_images/vitaline_trade_good_prices.webp",
//         text: "Цены от дистрибьютора",
//     },
//     {
//         id: 4,
//         background: "https://nuxt.vitaline.uz/wp-content/next_images/vitaline_trade_new_rpoducts.webp",
//         text: "Новинки",
//     },
//     // {
//     //     id: 3,
//     //     background: "https://www.vitaline.uz/wp-content/uploads/2024/05/oblozhka-dlya-sajta3-2-min.jpg",
//     //     text: "DR. Mercola",
//     // },
//     // {
//     //     id: 4,
//     //     background: "https://www.vitaline.uz/wp-content/uploads/2021/03/62e2dff2-4958-409a-b9b3-034fda03ddc1.jpeg",
//     //     text: "Solgar",
//     // },
//     // {
//     //     id: 5,
//     //     background: "https://www.vitaline.uz/wp-content/uploads/2022/12/2.jpg",
//     //     text: "ПЕРЕЙТИ",
//     // },
// ];

// export default function SimpleSlider() {
//     return (
//         <section className="home_slider">

//             <div className="swiper home_slider_info">
//                 <div className="swiper-wrapper">
//                     {slides.map((slide) => (
//                         <div
//                             key={slide.id}
//                             className="swiper-slide"
//                             style={{
//                                 backgroundImage: `url(${slide.background})`,
//                                 backgroundSize: "cover",
//                                 backgroundPosition: "left center",
//                             }}
//                         >
//                             <div className="overlay_home_sldr">
//                                 <span className="slider_text">{slide.text}</span>
//                             </div>

//                         </div>
//                     ))}
//                 </div>

//             </div>

//             <div className="swiper-button-next sldr_info"></div>
//             <div className="swiper-button-prev sldr_info"></div>
//             <div className="swiper-pagination"></div>

//             <HomeSliderSwiper />

//         </section>
//     );
// }











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