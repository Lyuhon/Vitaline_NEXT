// src/app/about/page.tsx
import React from 'react';
import './rules.css';
import AnimatedWrapper from '@/components/animation/AnimatedWrapper'; // Импортируем AnimatedWrapper

// import YandexMap from '@/components/YandexMap'; // Импортируем компонент карты

export const generateMetadata = () => {
    return {
        title: 'Правила оформления заказа - Vitaline',
        description: 'Условия и правила.',
    };
};

const AboutPage = () => {
    return (
        <AnimatedWrapper>
            <section className="about_page">

                <div className="abot_vitaline">

                    <div className="about_descript">
                        <h1 className="">Правила покупки в интернет-магазине Vitaline</h1>
                        <div className='rules_text'>
                            <strong>1. Обмен и возврат товара</strong>
                            <br></br>
                            Согласно законодательству Республики Узбекистан, витамины и пищевые добавки не подлежат обмену и возврату.
                            <br></br>
                            <br></br>
                            <strong>2. Проверка товара при получении</strong>
                            <br></br>
                            Покупатель обязан проверить товар на наличие повреждений упаковки и соответствие сроков годности в момент получения.
                            <br></br>
                            <br></br>
                            <ul>
                                <li>После того как курьер уехал, претензии по качеству или состоянию товара не принимаются.</li>
                            </ul>
                            <br></br>
                            <br></br>
                            Пожалуйста, внимательно проверяйте заказы при доставке, чтобы убедиться, что товар соответствует вашим ожиданиям.
                        </div>
                    </div>
                </div>

            </section>
        </AnimatedWrapper>
    );
};

export default AboutPage;
