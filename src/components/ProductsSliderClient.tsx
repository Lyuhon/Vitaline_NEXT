// // // src/components/ProductsSliderClient.tsx
// // "use client";

// // import { useEffect } from 'react';

// // export default function ProductsSliderClient() {
// //     useEffect(() => {
// //         if (typeof window !== 'undefined') {
// //             // Предполагаем, что глобальный Swiper уже доступен, так как мы подключили скрипт в layout.tsx
// //             // Если нет, можно импортировать Swiper из 'swiper' пакета.
// //             const Swiper = (window as any).Swiper;
// //             new Swiper('#slider_sales .products_slider', {
// //                 loop: true,
// //                 slidesPerView: 2,
// //                 spaceBetween: 20,
// //                 autoplay: {
// //                     delay: 3000,
// //                     disableOnInteraction: false,
// //                 },
// //                 navigation: {
// //                     nextEl: '#slider_sales .swiper-button-next',
// //                     prevEl: '#slider_sales .swiper-button-prev',
// //                 },
// //                 breakpoints: {
// //                     640: {
// //                         slidesPerView: 2,
// //                         spaceBetween: 20,
// //                     },
// //                     768: {
// //                         slidesPerView: 3,
// //                         spaceBetween: 30,
// //                     },
// //                     1024: {
// //                         slidesPerView: 4,
// //                         spaceBetween: 30,
// //                     },
// //                 },
// //             });

// //             new Swiper('#slider_bestsellers .products_slider', {
// //                 loop: true,
// //                 slidesPerView: 2,
// //                 spaceBetween: 20,
// //                 autoplay: {
// //                     delay: 3000,
// //                     disableOnInteraction: false,
// //                 },
// //                 navigation: {
// //                     nextEl: '#slider_bestsellers .swiper-button-next',
// //                     prevEl: '#slider_bestsellers .swiper-button-prev',
// //                 },
// //                 breakpoints: {
// //                     640: {
// //                         slidesPerView: 2,
// //                         spaceBetween: 20,
// //                     },
// //                     768: {
// //                         slidesPerView: 3,
// //                         spaceBetween: 30,
// //                     },
// //                     1024: {
// //                         slidesPerView: 4,
// //                         spaceBetween: 30,
// //                     },
// //                 },
// //             });

// //             new Swiper('#slider_newarrivals .products_slider', {
// //                 loop: true,
// //                 slidesPerView: 2,
// //                 spaceBetween: 20,
// //                 autoplay: {
// //                     delay: 3000,
// //                     disableOnInteraction: false,
// //                 },
// //                 navigation: {
// //                     nextEl: '#slider_newarrivals .swiper-button-next',
// //                     prevEl: '#slider_newarrivals .swiper-button-prev',
// //                 },
// //                 breakpoints: {
// //                     640: {
// //                         slidesPerView: 2,
// //                         spaceBetween: 20,
// //                     },
// //                     768: {
// //                         slidesPerView: 3,
// //                         spaceBetween: 30,
// //                     },
// //                     1024: {
// //                         slidesPerView: 4,
// //                         spaceBetween: 30,
// //                     },
// //                 },
// //             });
// //         }
// //     }, []);

// //     return null;
// // }


// "use client";

// import { useEffect } from "react";
// import Swiper from "swiper"; // Импортируем основной конструктор Swiper
// import { Autoplay, Navigation } from "swiper/modules"; // Импортируем модули
// import "swiper/css"; // Основные стили
// import "swiper/css/navigation"; // Стили для навигации
// import "swiper/css/autoplay"; // Стили для автоплея

// export default function ProductsSliderClient() {
//     useEffect(() => {
//         if (typeof window !== "undefined") {
//             // Инициализация Swiper для #slider_sales
//             new Swiper("#slider_sales .products_slider", {
//                 loop: true,
//                 slidesPerView: 2,
//                 spaceBetween: 20,
//                 autoplay: {
//                     delay: 3000,
//                     disableOnInteraction: false,
//                 },
//                 navigation: {
//                     nextEl: "#slider_sales .swiper-button-next",
//                     prevEl: "#slider_sales .swiper-button-prev",
//                 },
//                 modules: [Autoplay, Navigation], // Подключаем модули
//                 breakpoints: {
//                     640: {
//                         slidesPerView: 2,
//                         spaceBetween: 20,
//                     },
//                     768: {
//                         slidesPerView: 3,
//                         spaceBetween: 30,
//                     },
//                     1024: {
//                         slidesPerView: 4,
//                         spaceBetween: 30,
//                     },
//                 },
//             });

//             // Инициализация Swiper для #slider_bestsellers
//             new Swiper("#slider_bestsellers .products_slider", {
//                 loop: true,
//                 slidesPerView: 2,
//                 spaceBetween: 20,
//                 autoplay: {
//                     delay: 3000,
//                     disableOnInteraction: false,
//                 },
//                 navigation: {
//                     nextEl: "#slider_bestsellers .swiper-button-next",
//                     prevEl: "#slider_bestsellers .swiper-button-prev",
//                 },
//                 modules: [Autoplay, Navigation],
//                 breakpoints: {
//                     640: {
//                         slidesPerView: 2,
//                         spaceBetween: 20,
//                     },
//                     768: {
//                         slidesPerView: 3,
//                         spaceBetween: 30,
//                     },
//                     1024: {
//                         slidesPerView: 4,
//                         spaceBetween: 30,
//                     },
//                 },
//             });

//             // Инициализация Swiper для #slider_newarrivals
//             new Swiper("#slider_newarrivals .products_slider", {
//                 loop: true,
//                 slidesPerView: 2,
//                 spaceBetween: 20,
//                 autoplay: {
//                     delay: 3000,
//                     disableOnInteraction: false,
//                 },
//                 navigation: {
//                     nextEl: "#slider_newarrivals .swiper-button-next",
//                     prevEl: "#slider_newarrivals .swiper-button-prev",
//                 },
//                 modules: [Autoplay, Navigation],
//                 breakpoints: {
//                     640: {
//                         slidesPerView: 2,
//                         spaceBetween: 20,
//                     },
//                     768: {
//                         slidesPerView: 3,
//                         spaceBetween: 30,
//                     },
//                     1024: {
//                         slidesPerView: 4,
//                         spaceBetween: 30,
//                     },
//                 },
//             });
//         }
//     }, []);

//     return null;
// }


"use client";

import { useEffect } from "react";
import Swiper from "swiper"; // Импортируем основной конструктор Swiper
import { Autoplay, Navigation } from "swiper/modules"; // Импортируем модули
import "swiper/css"; // Основные стили
import "swiper/css/navigation"; // Стили для навигации
import "swiper/css/autoplay"; // Стили для автоплея

export default function ProductsSliderClient() {
    useEffect(() => {
        if (typeof window !== "undefined") {
            // Инициализация Swiper для #slider_sales
            new Swiper("#slider_sales .products_slider", {
                loop: true,
                slidesPerView: 2,
                spaceBetween: 20,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
                navigation: {
                    nextEl: "#slider_sales .swiper-button-next",
                    prevEl: "#slider_sales .swiper-button-prev",
                },
                modules: [Autoplay, Navigation],
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

            // Инициализация Swiper для #slider_bestsellers
            new Swiper("#slider_bestsellers .products_slider", {
                loop: true,
                slidesPerView: 2,
                spaceBetween: 20,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
                navigation: {
                    nextEl: "#slider_bestsellers .swiper-button-next",
                    prevEl: "#slider_bestsellers .swiper-button-prev",
                },
                modules: [Autoplay, Navigation],
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

            // Инициализация Swiper для #slider_newarrivals
            new Swiper("#slider_newarrivals .products_slider", {
                loop: true,
                slidesPerView: 2,
                spaceBetween: 20,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
                navigation: {
                    nextEl: "#slider_newarrivals .swiper-button-next",
                    prevEl: "#slider_newarrivals .swiper-button-prev",
                },
                modules: [Autoplay, Navigation],
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

            // Инициализация Swiper для .brands_list_slider
            new Swiper(".brands_list_slider", {
                loop: true,
                slidesPerView: 1,
                spaceBetween: 12,
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true, // Пауза при наведении мыши
                },
                modules: [Autoplay, Navigation], // Подключаем модули
                breakpoints: {
                    0: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: 6,
                        spaceBetween: 16,
                    },
                    1024: {
                        slidesPerView: 8,
                        spaceBetween: 12,
                    },
                },
                // Если нужны стрелки (раскомментируйте и настройте под свои классы):
                // navigation: {
                //   nextEl: ".swiper-button-next",
                //   prevEl: ".swiper-button-prev",
                // },
            });
        }
    }, []);

    return null;
}