import React from "react";

const HomeAdvantages = () => {
    return (
        <section className="home_advantages">
            <div className="home_advantages_section_heading">
                <div className="general_heading_block">
                    <h2>Преимущества нашего магазина</h2>
                </div>
                <div className="orange_heading_divider"></div>
            </div>

            <div className="grid_adv">
                <div
                    className="grid_adv_item"
                    style={{
                        backgroundImage: "url(https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Rectangle-50.png)",
                    }}
                >
                    <span>Оригинальные витамины из Америки</span>
                </div>
                <div
                    className="grid_adv_item"
                    style={{
                        backgroundImage: "url(https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Rectangle-57.png)",
                    }}
                >
                    <span>Большой ассортимент</span>
                </div>
                <div
                    className="grid_adv_item"
                    style={{
                        backgroundImage: "url(https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Rectangle-67.png)",
                    }}
                >
                    <span>Различные методы оплаты</span>
                </div>
                <div
                    className="grid_adv_item"
                    style={{
                        backgroundImage: "url(https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Rectangle-71.png)",
                    }}
                >
                    <span>Приемлемые цены</span>
                </div>
                <div
                    className="grid_adv_item"
                    style={{
                        backgroundImage: "url(https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Rectangle-69.png)",
                    }}
                >
                    <span>Быстрая и надежная доставка</span>
                </div>
                <div
                    className="grid_adv_item"
                    style={{
                        backgroundImage: "url(https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Rectangle-73.png)",
                    }}
                >
                    <span>Наличие сертифицированного склада</span>
                </div>
            </div>
        </section>
    );
};

export default HomeAdvantages;
