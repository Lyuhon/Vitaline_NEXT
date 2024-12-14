// src/app/components/Header.tsx
import React from 'react';
import Link from 'next/link';
import '@/app/header.css'; // Файл для стилей хедера

const Header = () => {
    return (
        <header className="header">
            {/* Верхняя полоса */}
            <div className="header__top-bar pc_visible">
                <div className="header__top-bar-content">
                    <div className="delivery_block">
                        <img
                            className="delivery_image"
                            src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/front-view-male-courier-green-uniform-holding-food-delivery-box-pink-desk_140725-33524-removebg-preview-1-1.png"
                            alt="Доставщик"
                        />
                        <span className="header__delivery-info">
                            <b>Бесплатная доставка</b> – при покупке свыше <b>600 000 сум</b>
                        </span>
                    </div>
                    <a href="#" className="header__app-download">
                        <span>Скачать приложение Vitaline</span>
                        <img
                            src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/3643758-gadget-handphone-mobile-phone-smartphone_113400-1-1.svg"
                            alt="Скачать приложение"
                        />
                    </a>
                </div>
            </div>

            {/* Основной хедер */}
            <div className="header__main pc_visible">
                <div className="header__logo__info">
                    <Link href="/">
                        <img
                            src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/8e3bc2dcd6d2b7628adf6e926f325187.png"
                            alt="Vitaline Logo"
                            className="header__logo-image"
                        />
                    </Link>
                    <span>Интернет-магазин витаминов и БАДов от лучших мировых брендов</span>
                </div>

                <div className="header__search_and_contacts">
                    <div className="search_block">
                        <input type="text" placeholder="Поиск товаров" className="header__search-input" />
                        <button className="header__search-button">
                            <img
                                src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/searcher_magnifyng_glass_search_locate_find_icon_123813-1.svg"
                                alt="Лупа"
                            />
                        </button>
                    </div>

                    <div className="header__contacts">
                        <div className="header__contacts_icon">
                            <img
                                src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/phone_call_speaker_icon_143531-1.svg"
                                alt="Телефон"
                            />
                        </div>

                        <div className="desc_conts">
                            <span className="header__phone">90 906 9099</span>
                            <span className="header__availability">Оператор онлайн</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Навигация */}
            <nav className="header__navigation pc_visible">
                <div className="header__menu">
                    <div className="product_nav_button">
                        <img
                            src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/preferences_desktop_apps_icon_180940-1.svg"
                            alt="Продукция"
                        />
                        <span>Продукция</span>
                    </div>
                    <div className="menu_block_link_ist">
                        <Link href="/cat-list">Категории</Link>
                        <Link href="/about">О нас</Link>
                        <Link href="/promotions">Акции</Link>
                        <Link href="/blog">Блог</Link>
                        <Link href="/loyalty-program">Программа лояльности</Link>
                        <Link href="/contacts">Контакты</Link>
                    </div>
                </div>

                <div className="header__user-section">
                    <Link href="/account" className="header__account-link">
                        <img
                            src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/avatar_male_man_people_person_profile_user_icon_123199-1.svg"
                            alt="Личный кабинет"
                        />
                        <span>Личный кабинет</span>
                    </Link>
                    <Link href="/favorites" className="header__favorites">
                        <img
                            src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/3643770-favorite-heart-like-likes-love-loved_113432-1.svg"
                            alt="Избранное"
                        />
                    </Link>
                    <Link href="/cart" className="header__cart">
                        <img
                            src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/РЎРРѕР№_1-1.svg"
                            alt="Корзина"
                        />
                    </Link>
                </div>
            </nav>




            {/* Основной хедер */}
            <div className="header__main mobile_visible">

                <a href='#footer_nav' className="mobile_links_button">

                    <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="1.5" y1="1.5" x2="18.5" y2="1.5" stroke="#FF7900" stroke-width="3" stroke-linecap="round" />
                        <line x1="1.5" y1="8.5" x2="18.5" y2="8.5" stroke="#FF7900" stroke-width="3" stroke-linecap="round" />
                        <line x1="1.5" y1="15.5" x2="18.5" y2="15.5" stroke="#FF7900" stroke-width="3" stroke-linecap="round" />
                    </svg>

                </a>

                <div className="header__logo__info">
                    <Link href="/">
                        <img
                            src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/8e3bc2dcd6d2b7628adf6e926f325187.png"
                            alt="Vitaline Logo"
                            className="header__logo-image"
                        />
                    </Link>
                </div>

                <div className="header__user-section">
                    <Link href="/account" className="header__account-link">
                        <img
                            src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/avatar_male_man_people_person_profile_user_icon_123199-1.svg"
                            alt="Личный кабинет"
                        />
                    </Link>
                    {/* <Link href="/favorites" className="header__favorites">
                        <img
                            src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/3643770-favorite-heart-like-likes-love-loved_113432-1.svg"
                            alt="Избранное"
                        />
                    </Link> */}
                    <Link href="/cart" className="header__cart">
                        <img
                            src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/РЎРРѕР№_1-1.svg"
                            alt="Корзина"
                        />
                    </Link>
                </div>

            </div>

            {/* Навигация */}
            <nav className="header__navigation mobile_visible">

                <a href="/shop" className="header__menu">
                    <div className="product_nav_button">
                        <img
                            src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/preferences_desktop_apps_icon_180940-1.svg"
                            alt="Продукция"
                        />
                        <span>Продукция</span>
                    </div>
                </a>

                <div className="header__search_and_contacts">

                    <div className="search_block">
                        <input type="text" placeholder="Поиск товаров" className="header__search-input" />
                        <button className="header__search-button">
                            <img
                                src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/searcher_magnifyng_glass_search_locate_find_icon_123813-1.svg"
                                alt="Лупа"
                            />
                        </button>
                    </div>

                </div>

            </nav>

        </header>
    );
};

export default Header;