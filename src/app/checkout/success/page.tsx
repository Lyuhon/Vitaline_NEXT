import React from 'react';
import './thanks.css';
import '@/app/contacts/contacts.css';
import Image from 'next/image';

export const generateMetadata = () => {
    return {
        title: 'Ваш заказ успешно оформлен - Vitaline',
        description: 'Подтверждение заказа товара.',
    };
};


const SuccessPage = () => {
    return (
        <section className='thanks_page'>
            <h1>Спасибо за ваш заказ!</h1>

            <div className="thanks_wrapper">
                {/* Изображение товаров */}
                <div className="hello_image">
                    {/* <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/image-1.png" alt="Изображение витрин с товарами" /> */}
                </div>

                {/* Основной блок с информацией */}
                <div className='main_info_block'>

                    <div className="text_thanks_block">

                        <div className="line_block">
                            <div className="line">

                            </div>

                            <div>
                                <div className="f_irst">
                                    <p className='first_info'>Перейдите в наш Телеграм-бот, чтобы
                                        {/* <br /> */}
                                        <strong> вы могли получить ответ о заказе от менеджера:</strong></p>

                                    <div >
                                        <a className='tg_button' href="https://t.me/abdelmansur" target="_blank" rel="noopener noreferrer">

                                            <Image
                                                src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Artboard.svg"
                                                alt="Иконка ТГ"
                                                width={22}
                                                height={22}
                                            />
                                            {/* <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Artboard.svg" alt="" /> */}
                                            <span>Телеграм-чат Vitaline</span>
                                        </a>
                                    </div>
                                </div>

                                <div className="s_econd">
                                    <p>Если у вас возникнут вопросы – напишите нам в Телеграм или <strong>позвоните</strong> нашим операторам.</p>
                                </div>
                            </div>

                        </div>

                        <div className="support_bottom_block">
                            <h2>Служба поддержки Vitaline</h2>
                            <div className="support_bottom_block_inner_wrap">
                                <a href="https://t.me/abdelmansur" className="tg_chat_btn" target="_blank" rel="noopener noreferrer">
                                    <Image
                                        src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Artboard.svg"
                                        alt="Иконка ТГ"
                                        width={22}
                                        height={22}
                                    />
                                    <span>Открыть чат</span>
                                </a>
                                <div className="support-contacts">
                                    <p><a href="tel:+998 91 166 00 90">+998 91 166 00 90</a></p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

        </section>
    );
};

export default SuccessPage;
