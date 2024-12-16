// src/app/contacts/page.tsx
import React from 'react';
import './contacts.css';
import YandexMap from '@/components/YandexMap'; // Импортируем компонент карты

export const generateMetadata = () => {
    return {
        title: 'Контакты - Vitaline',
        description: 'Контактная информация магазина Vitaline в Ташкенте. Адрес, телефон, график работы.',
    };
};

const ContactsPage = () => {
    return (
        <div className="contacts_page">

            <div className="contacts_wrap">
                <div className="contact-info">
                    <h1 className="contact_title">Контактные данные нашего магазина</h1>

                    <div className="store-image mobile_visible">
                        <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/image.png" alt="Vitaline Store" />
                    </div>

                    <div className='address_block'>
                        <p style={{ marginBottom: '20px' }}>
                            <strong style={{ marginBottom: '10px', display: 'inline-block' }}>Адрес:</strong>
                            <br />г. Ташкент, ул. Нукус, 6
                        </p>
                        <p>
                            <strong>Ориентир:</strong> Дворец Железнодорожников
                        </p>
                    </div>

                    <div className='phone_to_connect'>
                        <p><strong>Телефон для связи:</strong></p>
                        <p>+998 90 906 69 99</p>
                    </div>

                    <p className="info_italic">
                        Рабочие дни с 9:00 до 19:00,
                        <br />
                        прием заказов online 24/7
                    </p>

                    <div className="contacts-social-links">
                        <a href="#" className="contacts_insta">
                            <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Socials.svg" alt="" />
                            <span>Инстаграм @vitaline.uz</span>
                        </a>

                        <a href="#" className="contacts_telegram">
                            <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Artboard.svg" alt="" />
                            <span>Телеграм-канал Vitaline</span>
                        </a>
                    </div>
                </div>

                <div className="support-info">
                    <div className="store-image pc_visible">
                        <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/image.png" alt="Vitaline Store" />
                    </div>

                    <div className="support_bottom_block">
                        <h2>Служба поддержки Vitaline</h2>

                        <div className="support_bottom_block_inner_wrap">
                            <a href="https://t.me/support_chat" className="tg_chat_btn" target="_blank" rel="noopener noreferrer">
                                <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Artboard.svg" alt="" />
                                <span>Открыть чат</span>
                            </a>

                            <div className="support-contacts">
                                <p>+998 90 906 69 99</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <YandexMap />

        </div>
    );
};

export default ContactsPage;
