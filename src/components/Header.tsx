// src/app/components/Header.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import '@/app/header.css'; // Файл для стилей хедера
import Image from 'next/image';

const Header = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false); // Состояние для показа попапа
    const [isClosing, setIsClosing] = useState<boolean>(false); // Состояние для анимации закрытия


    // Проверка авторизации пользователя
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('authToken');
            setIsAuthenticated(!!token);
        }
    }, []);

    // Обработчик закрытия попапа с анимацией
    const closePopup = () => {
        setIsClosing(true); // Добавляем состояние для анимации
        setTimeout(() => {
            setIsPopupVisible(false);
            setIsClosing(false); // Сбрасываем состояние
        }, 300); // Длительность анимации совпадает с CSS
    };

    return (<>
        <header className="header">
            {/* Верхняя полоса */}
            <div className="header__top-bar pc_visible">
                <div className="header__top-bar-content">
                    <div className="delivery_block">
                        <Image
                            className="delivery_image"
                            src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/front-view-male-courier-green-uniform-holding-food-delivery-box-pink-desk_140725-33524-removebg-preview-1-1.png"
                            alt="Доставщик"
                            width={500}
                            height={500}
                        />
                        <span className="header__delivery-info">
                            <b>Бесплатная доставка</b> – при покупке свыше <b>600 000 сум</b>
                        </span>
                    </div>
                    <a href="#" className="header__app-download">
                        <span>Скачать приложение Vitaline</span>
                        <Image
                            src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/3643758-gadget-handphone-mobile-phone-smartphone_113400-1-1.svg"
                            alt="Скачать приложение"
                            width={500}
                            height={500}
                        />
                    </a>
                </div>
            </div>

            {/* Основной хедер */}
            <div className="header__main pc_visible">
                <div className="header__logo__info">
                    <Link href="/">
                        <Image
                            src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/8e3bc2dcd6d2b7628adf6e926f325187.png"
                            alt="Vitaline Logo"
                            className="header__logo-image"
                            width={500}
                            height={500}
                        />
                    </Link>
                    <span>Интернет-магазин витаминов и БАДов от лучших мировых брендов</span>
                </div>

                <div className="header__search_and_contacts">
                    <div className="search_block">
                        <input type="text" placeholder="Поиск товаров" className="header__search-input" />
                        <button className="header__search-button">
                            <Image
                                src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/searcher_magnifyng_glass_search_locate_find_icon_123813-1.svg"
                                alt="Лупа"
                                width={20}
                                height={20}
                            />
                        </button>
                    </div>

                    <div className="header__contacts">
                        <div className="header__contacts_icon">
                            <Image
                                src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/phone_call_speaker_icon_143531-1.svg"
                                alt="Телефон"
                                width={20}
                                height={20}
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
                        <Image
                            src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/preferences_desktop_apps_icon_180940-1.svg"
                            alt="Продукция"
                            width={20}
                            height={20}
                        />
                        <span>Продукция</span>
                    </div>
                    <div className="menu_block_link_ist">
                        <Link href="/cat-list">Категории</Link>
                        <Link href="/about">О нас</Link>
                        <Link href="/warehouse">Склады</Link>
                        <Link href="/promotions">Акции</Link>
                        <Link href="/blog">Блог</Link>
                        <Link href="/loyalty-program">Программа лояльности</Link>
                        <Link href="/contacts">Контакты</Link>
                    </div>
                </div>

                <div className="header__user-section">
                    <Link href={isAuthenticated ? '/profile' : '/login'} className="header__account-link">
                        <Image
                            src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/avatar_male_man_people_person_profile_user_icon_123199-1.svg"
                            alt="Личный кабинет"
                            width={20}
                            height={20}
                        />
                        <span>Личный кабинет</span>
                    </Link>
                    <Link href="/favorites" className="header__favorites">
                        <Image
                            src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/3643770-favorite-heart-like-likes-love-loved_113432-1.svg"
                            alt="Избранное"
                            width={20}
                            height={20}
                        />
                    </Link>
                    <Link href="/cart" className="header__cart">
                        <Image
                            src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/РЎРРѕР№_1-1.svg"
                            alt="Корзина"
                            width={20}
                            height={20}
                        />
                    </Link>
                </div>
            </nav>





            {/* Хедер */}
            <div className="like_herb header__main mobile_visible">
                <a href="#footer_nav" className="mobile_links_button">
                    <svg
                        width="20"
                        height="17"
                        viewBox="0 0 20 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <line
                            x1="1.5"
                            y1="1.5"
                            x2="18.5"
                            y2="1.5"
                            stroke="#FF7900"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                        <line
                            x1="1.5"
                            y1="8.5"
                            x2="18.5"
                            y2="8.5"
                            stroke="#FF7900"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                        <line
                            x1="1.5"
                            y1="15.5"
                            x2="18.5"
                            y2="15.5"
                            stroke="#FF7900"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                </a>

                <div className="header__logo__info">
                    <Link href="/">
                        <Image
                            src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/8e3bc2dcd6d2b7628adf6e926f325187.png"
                            alt="Vitaline Logo"
                            className="header__logo-image"
                            width={240}
                            height={100}
                        />
                    </Link>
                </div>

                <div className="header__search_and_contacts">
                    <div className="search_block">
                        <input
                            id="mobile_search_call"
                            type="text"
                            placeholder="Поиск товаров"
                            className="header__search-input"
                            onClick={() => setIsPopupVisible(true)}
                        />
                    </div>
                </div>

                <div className="header__user-section">
                    <Link href="/cart" className="header__cart">
                        <Image
                            src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/РЎРРѕР№_1-1.svg"
                            alt="Корзина"
                            width={20}
                            height={20}
                        />
                    </Link>
                </div>
            </div>

            {/* Попап поиска с анимацией */}
            {isPopupVisible && (
                <div className={`search-popup ${isClosing ? 'hidden' : ''}`}>
                    <div className="search-popup-content">

                        <div className="search-popup-content-shdow-block">
                            <div className="search-popup-header">
                                <input
                                    type="text"
                                    placeholder="Поиск товаров"
                                    className="search-popup-input"
                                    autoFocus
                                />
                                <button className="close-popup" onClick={closePopup}>
                                    Закрыть
                                </button>
                            </div>
                        </div>


                        <div className="search-pop_content">
                            <div className="trending-now">
                                <h3>Популярные категории</h3>

                                <div className="text_like_iherb_cats">
                                    <div className="cat_like_items">

                                        {/* <div className="cat_like_single">
                                            <span>Магний</span>
                                            <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/9-7.png" alt="" />
                                        </div>

                                        <div className="cat_like_single">
                                            <span>Беременным</span>
                                            <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/10-3.png" alt="" />
                                        </div>

                                        <div className="cat_like_single">
                                            <span>Женщинам</span>
                                            <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/12-2.png" alt="" />
                                        </div>

                                        <div className="cat_like_single">
                                            <span>Мужчинам</span>
                                            <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/11.png" alt="" />
                                        </div>

                                        <div className="cat_like_single">
                                            <span>Витамины C</span>
                                            <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/8-7.png" alt="" />
                                        </div>

                                        <div className="cat_like_single">
                                            <span>Витамины D3</span>
                                            <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/7-9.png" alt="" />
                                        </div> */}

                                        <div className="cat_like_single">
                                            <span>Женщинам</span>
                                            <div className="icon_s">
                                                👩
                                            </div>
                                        </div>

                                        <div className="cat_like_single">
                                            <span>Мужчинам</span>
                                            <div className="icon_s">
                                                🧔
                                            </div>
                                        </div>

                                        <div className="cat_like_single">
                                            <span>Беременным</span>
                                            <div className="icon_s">
                                                🤰
                                            </div>
                                        </div>

                                        <div className="cat_like_single">
                                            <span>Рыбий жир</span>
                                            <div className="icon_s">
                                                🐟
                                            </div>
                                        </div>

                                        <div className="cat_like_single">
                                            <span>Спорт пит</span>
                                            <div className="icon_s">
                                                🏋️‍♂️
                                            </div>
                                        </div>

                                        <div className="cat_like_single">
                                            <span>Косметика</span>
                                            <div className="icon_s">
                                                💄
                                            </div>
                                        </div>






                                        {/* <div className="cat_like_single">

                                            <span>Пищевые добавки</span>
                                            <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Supplements_v2-копццция.png" alt="" />

                                        </div>

                                        <div className="cat_like_single">

                                            <span>Спорт</span>
                                            <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Sports_v2-копи234я.png" alt="" />

                                        </div>

                                        <div className="cat_like_single">

                                            <span>Пищевые добавки</span>
                                            <img src="https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/cms/homepage/L1%20Categories/Supplements_v2.png" alt="" />

                                        </div>

                                        <div className="cat_like_single">

                                            <span>Спорт</span>
                                            <img src="https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/cms/homepage/L1%20Categories/Sports_v2.png" alt="" />

                                        </div>
                                        <div className="cat_like_single">

                                            <span>Спортивное питание</span>
                                            <img src="https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/cms/homepage/L1%20Categories/Sports_v2.png" alt="" />

                                        </div>

                                        <div className="cat_like_single">

                                            <span>Спортивное питание</span>
                                            <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/6-12.png" alt="" />

                                        </div>

                                        <div className="cat_like_single">

                                            <span>Красота и здоровье</span>
                                            <img src="https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/cms/homepage/L1%20Categories/Beauty_v2.png" alt="" />

                                        </div>

                                        <div className="cat_like_single">

                                            <span>Продукты питания</span>
                                            <img src="https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/cms/homepage/L1%20Categories/Grocery_v2.png" alt="" />

                                        </div> */}
                                    </div>
                                </div>

                                <div className="pop_search_tags">
                                    <Link href="/categories/sport">
                                        <div>🏋️‍♂️ Спорт питание</div>
                                    </Link>
                                    <Link href="/categories/digestion">
                                        <div>🥣 Для пищеварения</div>
                                    </Link>
                                    <Link href="/categories/kids-health">
                                        <div>🍼 Детское здоровье</div>
                                    </Link>
                                    <Link href="/categories/vitamin-d3">
                                        <div>🔧 Витамин Д3</div>
                                    </Link>
                                    <Link href="/categories/skin-hair-nails">
                                        <div>💅 Кожа, ногти, волосы</div>
                                    </Link>
                                    <Link href="/categories/food-products">
                                        <div>🧃 Продукты питания</div>
                                    </Link>
                                    <Link href="/categories/weight-loss">
                                        <div>🍽️ Для похудения</div>
                                    </Link>
                                    <Link href="/categories/cosmetics">
                                        <div>💄 Косметика</div>
                                    </Link>
                                    <Link href="/categories/supplements">
                                        <div>🍵 Пищевые добавки</div>
                                    </Link>
                                    <Link href="/categories/pregnancy">
                                        <div>🤰 Для беременных</div>
                                    </Link>
                                    <Link href="/categories/fish-oil">
                                        <div>🐟 Рыбий жир, омега</div>
                                    </Link>
                                    <Link href="/categories/multivitamins">
                                        <div>💊 Мультивитамины</div>
                                    </Link>
                                    <Link href="/categories/eye-health">
                                        <div>👁️ Препараты для глаз</div>
                                    </Link>
                                    <Link href="/categories/women-health">
                                        <div>🙋‍♀️ Женское здоровье</div>
                                    </Link>
                                    <Link href="/categories/greens-superfoods">
                                        <div>🥬 Зелень и суперфуды</div>
                                    </Link>
                                </div>
                            </div>

                            {/* <div className="browse">
                                <h3>Browse</h3>
                                <div className="browse-grid">
                                    <div>Specials!</div>
                                    <div>Brands of the Week</div>
                                    <div>Sales & Offers</div>
                                    <div>Try</div>
                                    <div>New</div>
                                    <div>Best Sellers</div>
                                    <div>Conditions</div>
                                    <div>Supplements</div>
                                    <div>Grocery</div>
                                    <div>Bath & PersonalCare</div>
                                    <div>Sports</div>
                                    <div>Beauty</div>
                                    <div>Pets</div>
                                    <div>Baby & Kids</div>
                                    <div>Home</div>
                                </div>
                            </div> */}
                        </div>

                    </div>
                </div>
            )}





            {/* Основной хедер */}
            <div className="header__main mobile_visible temp-dn">

                <a href='#footer_nav' className="mobile_links_button">

                    <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="1.5" y1="1.5" x2="18.5" y2="1.5" stroke="#FF7900" strokeWidth="3" strokeLinecap="round" />
                        <line x1="1.5" y1="8.5" x2="18.5" y2="8.5" stroke="#FF7900" strokeWidth="3" strokeLinecap="round" />
                        <line x1="1.5" y1="15.5" x2="18.5" y2="15.5" stroke="#FF7900" strokeWidth="3" strokeLinecap="round" />
                    </svg>

                </a>

                <div className="header__logo__info">
                    <Link href="/">
                        <Image
                            src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/8e3bc2dcd6d2b7628adf6e926f325187.png"
                            alt="Vitaline Logo"
                            className="header__logo-image"
                            width={240}
                            height={100}
                        />
                    </Link>
                </div>

                <div className="header__user-section">
                    <Link href={isAuthenticated ? '/profile' : '/login'} className="header__account-link">
                        <Image
                            src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/avatar_male_man_people_person_profile_user_icon_123199-1.svg"
                            alt="Личный кабинет"
                            width={20}
                            height={20}
                        />
                    </Link>
                    <Link href="/cart" className="header__cart">
                        <Image
                            src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/РЎРРѕР№_1-1.svg"
                            alt="Корзина"
                            width={20}
                            height={20}
                        />
                    </Link>
                </div>

            </div>

            {/* Навигация */}
            <nav className="header__navigation mobile_visible temp-dn">

                <Link href="/shop" className="header__menu">
                    <div className="product_nav_button">
                        <Image
                            src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/preferences_desktop_apps_icon_180940-1.svg"
                            alt="Продукция"
                            width={20}
                            height={20}
                        />
                        <span>Продукция</span>
                    </div>
                </Link>

                <div className="header__search_and_contacts">

                    <div className="search_block">
                        <input type="text" placeholder="Поиск товаров" className="header__search-input" />
                        <button className="header__search-button">
                            <Image
                                src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/searcher_magnifyng_glass_search_locate_find_icon_123813-1.svg"
                                alt="Лупа"
                                width={14}
                                height={14}
                            />
                        </button>
                    </div>

                </div>

            </nav>

        </header >
    </>
    );
};

export default Header;