// src/app/about/page.tsx
import Image from 'next/image'
import React from 'react';
import './about.css';
// import YandexMap from '@/components/YandexMap'; // Импортируем компонент карты

export const generateMetadata = () => {
    return {
        title: 'Контакты - Vitaline',
        description: 'Контактная информация магазина Vitaline в Ташкенте. Адрес, телефон, график работы.',
    };
};

const AboutPage = () => {
    return (
        <section className="about_page">

            <div className="abot_vitaline">
                <div className="about_image">
                    <h1 className="mobile_visible">О нашей компании</h1>
                    <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/image-1.png" alt="Изображение Vitaline" />
                </div>

                <div className="about_descript">
                    <h1 className="pc_visible">О нашей компании</h1>
                    <p>
                        <b>Мы – Vitaline</b>, официальные оптовые дистрибьюторы витаминов и биологически активных добавок в Узбекистане.
                        <br></br> <br></br>
                        В нашем ассортименте представлена <b>только оригинальная продукция</b> от ведущих мировых брендов, гарантирующая высокое качество и эффективность.
                        <br></br> <br></br>
                        Сотрудничая с нами, вы получаете:
                        <br></br>
                    </p>
                    <ul>
                        <li>
                            Широкий выбор товаров для здоровья и иммунитета;
                        </li>
                        <li>
                            Гарантию подлинности и качества продукции;
                        </li>
                        <li>
                            Гибкие условия для оптовых партнеров и оперативную доставку.
                        </li>
                    </ul>
                    <br></br>
                    Заботьтесь о здоровье с надежными и проверенными добавками от <b>Vitaline!</b>
                </div>
            </div>

            <div className="key_adv">
                <h2 className="pc_visible">Ключевые особенности бренда Vitaline</h2>

                <div className="key_adv_image_text_block">
                    <img className="key_adv_image" src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/image-2.png" alt="Изображение Vitaline" />
                    <h2 className="mobile_visible">Ключевые особенности бренда Vitaline</h2>
                    <div className="key_adv_text">
                        <p>
                            <b>1. Высококачественная продукция:</b>
                            <br></br><br></br>Вся наша продукция соответствует строгим стандартам качества и безопасности, а также сертифицирована в соответствии с международными нормами.
                            <br></br><br></br>
                            <b>2. Широкий ассортимент:</b>
                            <br></br><br></br>Мы предлагаем большой выбор витаминов, минеральных комплексов и биологически активных добавок, включая эксклюзивные позиции и новинки, которые пользуются популярностью на рынке США и других стран.</p>
                    </div>
                </div>

                <div className="additional_key_adv" style={{ display: "none" }}>
                    <p>Vitaline придерживается строгих стандартов GMP (Good Manufacturing Practice), что обеспечивает <span
                        className="accent_t">контроль качества на всех этапах</span> — от разработки до производства. </p>

                    <p>Каждая партия продукции проходит тщательную экспертизу на безопасность и эффективность, что делает ее
                        надежной для потребителей.</p>
                </div>
            </div>


            <div className="abot_vitaline_bottom">

                <div className="about_descript_bottom">
                    <p>
                        <b>3. Гибкие условия сотрудничества:</b>
                        <br></br><br></br>
                        Мы готовы предложить конкурентные цены, удобные условия оплаты и доставки, а также возможность индивидуального подхода к каждому клиенту.
                    </p>
                </div>

                <div className="about_image_bottom">
                    <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/image-3.png" alt="Изображение Vitaline" />
                </div>

            </div>

        </section>
    );
};

export default AboutPage;
