// src/app/loyalty_program/page.tsx
import React from 'react';
import './loyalty_program.css';

export const generateMetadata = () => {
    return {
        title: 'Накопительная система - Vitaline',
        description: 'Контактная информация магазина Vitaline в Ташкенте. Адрес, телефон, график работы.',
    };
};

const LoyaltyProgramPage = () => {
    return (
        <section className="loyalty_program_page">

            <div className="loyalty_hero pc_visible"></div>

            <h1>Как воспользоваться нашей накопительной системой?</h1>

            <div className="loyalty_hero mobile_visible"></div>

            <div className="steps">
                <div className="step">
                    <h3>Шаг 1</h3>
                    <p>Зарегистрируйтесь через наш телеграм бот <a href="https://t.me/vitalineuz_bot">@vitalineuz_bot</a>
                    </p>
                </div>
                <div className="step">
                    <h3>Шаг 2</h3>
                    <p>Укажите ваши данные: Ф.И.О и номер телефона</p>
                </div>
                <div className="step">
                    <h3>Шаг 3</h3>
                    <p>Ваша накопительная карта готова 🪪</p>
                </div>
            </div>

            <div className="info">
                <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/image-5.png" alt="Продукты Vitaline" />

                <div className="info_text_block">
                    <p className="big_info">
                        ❇️ При покупке наших товаров отправляйте нам скриншот вашей карты и следите за вашими покупками, и
                        программой лояльности прямо внутри телеграм-бота.
                    </p>

                    <div className="loyalty_info_hero mobile_visible"></div>

                    <p className="regular_inf">
                        Программа лояльности Vitaline направлена на создание долгосрочных отношений с клиентами,
                        предлагая им не только выгодные условия, но и возможность быть частью сообщества,
                        заботящегося о здоровье.
                    </p>
                    <p className="regular_inf">
                        С помощью этой программы Vitaline стремится сделать каждую покупку более приятной и выгодной для
                        своих
                        клиентов.
                    </p>
                </div>

            </div>

        </section>
    );
};

export default LoyaltyProgramPage;