// import React from "react";

// const HomeAdvantages = () => {
//     return (
//         <section className="home_advantages">
//             <div className="home_advantages_section_heading">
//                 <div className="general_heading_block">
//                     <h2>Преимущества нашего магазина</h2>
//                 </div>
//                 <div className="orange_heading_divider"></div>
//             </div>

//             <div className="grid_adv">
//                 <div
//                     className="grid_adv_item"
//                     style={{
//                         backgroundImage: "url(/images/advantages-image-6.webp)",
//                     }}
//                 >
//                     <span>Оригинальные витамины из Америки</span>
//                 </div>
//                 <div
//                     className="grid_adv_item"
//                     style={{
//                         backgroundImage: "url(/images/advantages-image-5.webp)",
//                     }}
//                 >
//                     <span>Большой ассортимент</span>
//                 </div>
//                 <div
//                     className="grid_adv_item"
//                     style={{
//                         backgroundImage: "url(/images/advantages-image-4.webp)",
//                     }}
//                 >
//                     <span>Различные методы оплаты</span>
//                 </div>
//                 <div
//                     className="grid_adv_item"
//                     style={{
//                         backgroundImage: "url(/images/advantages-image-3.webp)",
//                     }}
//                 >
//                     <span>Приемлемые цены</span>
//                 </div>
//                 <div
//                     className="grid_adv_item"
//                     style={{
//                         backgroundImage: "url(/images/advantages-image-2.webp)",
//                     }}
//                 >
//                     <span>Быстрая и надежная доставка</span>
//                 </div>
//                 <div
//                     className="grid_adv_item"
//                     style={{
//                         backgroundImage: "url(/images/advantages-image-1.webp)",
//                     }}
//                 >
//                     <span>Наличие сертифицированного склада</span>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default HomeAdvantages;




// src/components/HomeAdvantages.tsx
'use client';

import React from "react";
import { useTranslations } from 'next-intl';

const HomeAdvantages = () => {
    const t = useTranslations('home');
    return (
        <section className="home_advantages">
            <div className="home_advantages_section_heading">
                <div className="general_heading_block">
                    <h2>{t('our_advantages')}</h2>
                </div>
                <div className="orange_heading_divider"></div>
            </div>

            <div className="grid_adv">
                <div
                    className="grid_adv_item"
                    style={{
                        backgroundImage: "url(/images/advantages-image-6.webp)",
                    }}
                >
                    <span>{t('original_vitamins_from_america')}</span>
                </div>
                <div
                    className="grid_adv_item"
                    style={{
                        backgroundImage: "url(/images/advantages-image-5.webp)",
                    }}
                >
                    <span>{t('large_assortment')}</span>
                </div>
                <div
                    className="grid_adv_item"
                    style={{
                        backgroundImage: "url(/images/advantages-image-4.webp)",
                    }}
                >
                    <span>{t('various_payment_methods')}</span>
                </div>
                <div
                    className="grid_adv_item"
                    style={{
                        backgroundImage: "url(/images/advantages-image-3.webp)",
                    }}
                >
                    <span>{t('affordable_prices')}</span>
                </div>
                <div
                    className="grid_adv_item"
                    style={{
                        backgroundImage: "url(/images/advantages-image-2.webp)",
                    }}
                >
                    <span>{t('fast_reliable_delivery')}</span>
                </div>
                <div
                    className="grid_adv_item"
                    style={{
                        backgroundImage: "url(/images/advantages-image-1.webp)",
                    }}
                >
                    <span>{t('certified_warehouse')}</span>
                </div>
            </div>
        </section>
    );
};

export default HomeAdvantages;