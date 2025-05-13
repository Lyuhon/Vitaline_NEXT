'use client';

import React, { useEffect, useState } from 'react';
import './thanks.css';
import '@/app/contacts/contacts.css';
import Image from 'next/image';
import Link from 'next/link';

const SuccessPage = () => {
    // Состояние для хранения информации о заказе
    const [orderInfo, setOrderInfo] = useState({
        orderNumber: '',
        orderDate: '',
        totalAmount: 0,
        customerName: '',
        customerPhone: ''
    });

    // Загрузка данных о заказе при монтировании компонента
    useEffect(() => {
        // Получаем информацию о заказе из localStorage
        const savedOrderInfo = localStorage.getItem('vitaline_last_order');

        if (savedOrderInfo) {
            try {
                const parsedInfo = JSON.parse(savedOrderInfo);
                setOrderInfo(parsedInfo);
            } catch (error) {
                console.error('Ошибка при чтении информации о заказе:', error);
            }
        }
    }, []);

    return (
        <section className='thanks_page'>
            <h1>Спасибо за ваш заказ!</h1>

            {/* Блок информации о заказе с использованием Tailwind */}
            {orderInfo.orderNumber && (
                <div className="mb-6 md:mb-10 mt-6 md:mt-[-20px]">
                    {/* <h2 className="text-xl font-semibold mb-4 text-center">Информация о заказе</h2> */}
                    <div className="w-full">
                        <div className="flex bg-[#EBFFA380] rounded-lg py-4 mb-3">
                            <div className="w-1/2 font-normal pl-4">Номер заказа:</div>
                            <div className="w-1/2 text-right pr-4 font-bold">#{orderInfo.orderNumber}</div>
                        </div>
                        <div className="flex border-b border-gray-200 py-3">
                            <div className="w-1/2 font-normal pl-2 md:pl-4">Дата заказа:</div>
                            <div className="w-1/2 text-right pr-2 md:pr-4">{orderInfo.orderDate}</div>
                        </div>
                        <div className="flex border-b border-gray-200 py-3">
                            <div className="w-1/2 font-normal pl-2 md:pl-4">Сумма заказа:</div>
                            <div className="w-1/2 text-right pr-2 md:pr-4 font-semibold">
                                {(orderInfo.totalAmount / 100).toFixed(2).replace('.', '.')}$
                            </div>
                        </div>
                        <div className="flex border-b border-gray-200 py-3">
                            <div className="w-1/2 font-normal pl-2 md:pl-4">Получатель:</div>
                            <div className="w-1/2 text-right pr-2 md:pr-4">{orderInfo.customerName}</div>
                        </div>
                        {/* <div className="flex py-3">
                            <div className="w-1/2 text-gray-700 font-medium pl-4">Телефон:</div>
                            <div className="w-1/2 text-right pr-4">{orderInfo.customerPhone}</div>
                        </div> */}
                    </div>
                </div>
            )}

            <div className="thanks_wrapper">
                {/* Изображение товаров */}
                <div className="hello_image relative">
                    {orderInfo.orderNumber && (
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg">
                            #{orderInfo.orderNumber}
                        </div>
                    )}
                </div>

                {/* Основной блок с информацией */}
                <div className='main_info_block'>

                    <div className="text_thanks_block">

                        <div className="line_block">
                            <div className="line">

                            </div>

                            <div>
                                <div className="f_irst">
                                    <p className='first_info'>После оформления заказа, пожалуйста, <strong>напишите нам в Telegram для подтверждения.</strong></p>

                                    <p className='first_info' style={{ marginTop: "20px" }}><strong>Buyurtma berganingizdan</strong> soʻng, iltimos.<strong>Telegram orqali yozing.</strong></p>

                                    <div >
                                        <Link className='tg_button' href="https://t.me/abdelmansur" target="_blank" rel="noopener noreferrer">

                                            <Image
                                                src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Artboard.svg"
                                                alt="Иконка ТГ"
                                                width={22}
                                                height={22}
                                            />
                                            {/* <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Artboard.svg" alt="" /> */}
                                            <span>Wholesale Vitaline</span>
                                        </Link>
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
                                <a style={{ display: 'none' }} href="https://t.me/abdelmansur" className="tg_chat_btn" target="_blank" rel="noopener noreferrer">
                                    <Image
                                        src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Artboard.svg"
                                        alt="Иконка ТГ"
                                        width={22}
                                        height={22}
                                    />
                                    <span>Открыть чат</span>
                                </a>
                                <div className="support-contacts">
                                    <p><a href="tel:+998911660090">+998 91 166 00 90</a></p>
                                </div>
                            </div>
                        </div>

                        <Link href="/" className="back-home-link">
                            🠔 Вернуться на главную
                        </Link>

                    </div>

                </div>
            </div>


        </section>
    );
};

export default SuccessPage;