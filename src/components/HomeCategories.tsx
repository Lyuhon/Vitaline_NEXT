import React from "react";

const HomeCategories = () => {
    return (
        <section className="home_categories">
            {/* Заголовок секции */}
            <div className="home_categories_section_heading">
                <div className="general_heading_block">
                    <h2>Популярные категории</h2>
                    <a className="section_read_more" href="/shop">
                        Вся продукция
                    </a>
                </div>
                <div className="orange_heading_divider"></div>
            </div>

            {/* Облако категорий */}
            <div className="cats_cloud">
                <a href="#">Омега 3</a>
                <a href="#">Кальций</a>
                <a href="#">Цинк</a>
                <a href="#">Коллаген</a>
                <a href="#">Магний</a>
                <a href="#">Витамин C</a>
                <a href="#">Мультивитамины</a>
                <a href="#">Минералы</a>
                <a href="#">Пробиотики</a>
            </div>

            {/* Сетка категорий */}
            <div className="cats_grid">
                <a
                    href="/sportivnoe-pitanie/"
                    className="cats_grid_item"
                    style={{
                        backgroundColor: "#EBFFA380",
                        backgroundImage: "url(https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Screenshot_22-removebg-preview-1-2.png)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <span>Спортивное питание</span>
                </a>
                <a
                    href="/dlya-mozga/"
                    className="cats_grid_item"
                    style={{
                        backgroundColor: "#D9F7F5",
                        backgroundImage: "url(https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Screenshot_22-removebg-preview-2.png)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <span>Для мозга и памяти</span>
                </a>
                <a
                    href="/zdorovyj-son/"
                    className="cats_grid_item"
                    style={{
                        backgroundColor: "#E9F0F6",
                        backgroundImage: "url(https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Screenshot_22-removebg-preview-3.png)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <span>Здоровый сон</span>
                </a>
                <a
                    href="/immunnaya-sistema/"
                    className="cats_grid_item"
                    style={{
                        backgroundColor: "#F7F3E8",
                        backgroundImage: "url(https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Screenshot_22-removebg-preview-4.png)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <span>Иммунитет</span>
                </a>
                <a
                    href="/dlya-beremennyh/"
                    className="cats_grid_item"
                    style={{
                        backgroundColor: "#F6EEFB",
                        backgroundImage: "url(https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Screenshot_22-removebg-preview-5.png)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <span>Беременным и кормящим</span>
                </a>
                <a
                    href="/detskoe-zdorove/"
                    className="/detskoe-zdorove/"
                    style={{
                        backgroundColor: "#FFFFE7",
                        backgroundImage: "url(https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Screenshot_22-removebg-preview-6.png)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <span>Детские витамины</span>
                </a>
                <a
                    href="/kozha-nogti-i-volosy/"
                    className="cats_grid_item"
                    style={{
                        backgroundColor: "#EDDFD4",
                        backgroundImage: "url(https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Screenshot_22-removebg-preview-7.png)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <span>Волосы, ногти и кожа</span>
                </a>
                <a
                    href="/mineraly/"
                    className="cats_grid_item"
                    style={{
                        backgroundColor: "#D0D4DD",
                        backgroundImage: "url(https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Screenshot_22-removebg-preview-8.png)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <span>Минералы</span>
                </a>
                <a
                    href="/kosti-i-sustavykalczii/"
                    className="cats_grid_item"
                    style={{
                        backgroundColor: "#DCE7DF",
                        backgroundImage: "url(https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Screenshot_22-removebg-preview-9.png)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <span>Кости и суставы</span>
                </a>
                <a
                    href="/muzhskoe-zdorove/"
                    className="cats_grid_item"
                    style={{
                        backgroundColor: "#F3C7AE",
                        backgroundImage: "url(https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Screenshot_22-removebg-preview-10.png)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <span>Энергия</span>
                </a>
                <a
                    href="/antioksidanty/"
                    className="cats_grid_item"
                    style={{
                        backgroundColor: "#DFD2FF",
                        backgroundImage: "url(https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Screenshot_22-removebg-preview-11.png)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <span>Антиоксиданты</span>
                </a>
                <a
                    href="/aminokisloty/"
                    className="cats_grid_item"
                    style={{
                        backgroundColor: "#D9F7F5",
                        backgroundImage: "url(https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Screenshot_22-removebg-preview-12.png)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <span>Аминокислоты</span>
                </a>
                <a
                    href="/product-tag/b-comlex/"
                    className="cats_grid_item"
                    style={{
                        backgroundColor: "#DCE7DF",
                        backgroundImage: "url(https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Screenshot_22-removebg-preview-13.png)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <span>Комплексы</span>
                </a>
            </div>
        </section>
    );
};

export default HomeCategories;
