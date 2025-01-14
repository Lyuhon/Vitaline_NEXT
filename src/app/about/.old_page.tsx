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
                    <p>Vitaline — это бренд, который олицетворяет <span className="accent_t">стремление к здоровью и качеству
                        жизни</span> через
                        биологически активные добавки (БАДы). Основанная в 1994 году в Калифорнии, компания с гордостью
                        демонстрирует более чем 26-летний опыт работы на рынке, предлагая продукты, которые соответствуют
                        самым высоким стандартам качества и безопасности.</p>
                    <p>На протяжении своего существования Vitaline активно сотрудничает с ведущими медицинскими центрами и
                        специалистами, что позволяет компании внедрять новейшие научные достижения в свои продукты. </p>
                    <p>Все добавки производятся на современном фармацевтическом заводе Nittany Pharmaceuticals в
                        Пенсильвании, что гарантирует их высокое качество и безопасность. Продукция Vitaline сертифицирована
                        в странах Европейского Союза и других регионах, что подтверждает ее соответствие строгим стандартам.
                    </p>
                </div>
            </div>

            <div className="key_adv">
                <h2 className="pc_visible">Ключевые особенности бренда Vitaline</h2>

                <div className="key_adv_image_text_block">
                    <img className="key_adv_image" src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/image-2.png" alt="Изображение Vitaline" />
                    <h2 className="mobile_visible">Ключевые особенности бренда Vitaline</h2>
                    <div className="key_adv_text">
                        <p>Основная миссия Vitaline заключается в том, чтобы помочь людям вести <span
                            className="accent_t">здоровый
                            образ жизни</span> через
                            правильное питание и использование БАДов.</p>

                        <p>Компания предлагает более 100 наименований продуктов, которые разрабатываются с учетом
                            потребностей
                            современного человека. Эти добавки помогают не только в профилактике заболеваний, но и в
                            поддержании
                            общего состояния здоровья.</p>
                    </div>
                </div>

                <div className="additional_key_adv">
                    <p>Vitaline придерживается строгих стандартов GMP (Good Manufacturing Practice), что обеспечивает <span
                        className="accent_t">контроль качества на всех этапах</span> — от разработки до производства. </p>

                    <p>Каждая партия продукции проходит тщательную экспертизу на безопасность и эффективность, что делает ее
                        надежной для потребителей.</p>
                </div>
            </div>


            <div className="abot_vitaline_bottom">

                <div className="about_descript_bottom">
                    <p>Vitaline — это не просто магазин БАДов. </p>
                    <p>Это <span className="accent_t">философия здоровья и благополучия,</span> основанная на научных
                        исследованиях и высоких стандартах качества.
                        С каждым продуктом Vitaline вы получаете уверенность в том, что заботитесь о своем здоровье с
                        помощью проверенных и эффективных решений.</p>
                </div>

                <div className="about_image_bottom">
                    <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/image-3.png" alt="Изображение Vitaline" />
                </div>

            </div>

        </section>
    );
};

export default AboutPage;
