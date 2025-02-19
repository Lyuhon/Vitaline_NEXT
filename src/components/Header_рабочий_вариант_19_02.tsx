// src/app/components/Header.tsx
'use client'

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CartCounter from '@/components/CartCounter';
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js';
import { configure } from 'instantsearch.js/es/widgets';
// import 'instantsearch.css/themes/reset.css';

import '@/app/header.css';

interface AlgoliaHit {
    objectID: string;
    name: string;
    sku?: string;
    url?: string;
    thumbnail_url?: string;
    categories?: string[];
}


const Header = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
    const [isClosing, setIsClosing] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState<AlgoliaHit[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const searchInstanceRef = useRef<any>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('authToken');
            setIsAuthenticated(!!token);
        }
    }, []);

    useEffect(() => {
        const searchClient = algoliasearch(
            'TJRO96P4LZ',
            'e9cd85a57dcba249ac8ca48023342b99'
        );

        const search = instantsearch({
            indexName: 'vt_trade_',
            searchClient,
        });

        const customWidget = {
            $$type: 'custom.results' as const,
            init(options: { helper: any }) { },
            render(options: { results: { hits: any[] } | null; helper: any }) {
                if (options.results?.hits) {
                    setSearchResults(options.results.hits as AlgoliaHit[]);
                    setIsLoading(false);
                }
            },
            dispose() {
                setSearchResults([]);
            }
        } as const;

        search.addWidgets([
            configure({
                hitsPerPage: 6,
            }),
            customWidget
        ]);

        search.start();
        searchInstanceRef.current = search;

        return () => {
            search.dispose();
        };
    }, []);

    useEffect(() => {
        if (isPopupVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isPopupVisible]);

    const closePopup = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsPopupVisible(false);
            setIsClosing(false);
            setSearchTerm('');
            setSearchComplete(false); // Добавляем сброс флага
            if (searchInstanceRef.current) {
                searchInstanceRef.current.helper.setQuery('').search();
            }
        }, 300);
    };

    // Для дебаунса поиска 500 мс
    const [searchComplete, setSearchComplete] = useState<boolean>(false);
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        setSearchComplete(false); // Сбрасываем флаг завершения поиска

        // Очищаем предыдущий таймер, если он есть
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        if (value.length >= 2) {
            setIsLoading(true);

            searchTimeoutRef.current = setTimeout(() => {
                if (searchInstanceRef.current) {
                    searchInstanceRef.current.helper.setQuery(value).search();
                    // Устанавливаем флаг завершения поиска после задержки
                    setTimeout(() => {
                        setSearchComplete(true);
                    }, 50); // Небольшая дополнительная задержка для уверенности
                }
            }, 500);
        } else {
            setSearchResults([]);
            setIsLoading(false);
            setSearchComplete(true);
        }
        // if (value.length >= 2) {
        //     setIsLoading(true);
        //     if (searchInstanceRef.current) {
        //         searchInstanceRef.current.helper.setQuery(value).search();
        //     }
        // } else {
        //     setSearchResults([]);
        //     setIsLoading(false);
        // }
    };

    return (
        <>
            <header className="header">
                {/* Верхняя полоса */}
                <div className="header__top-bar pc_visible">
                    <div className="header__top-bar-content">
                        <div className="delivery_block">
                            <Image
                                className="delivery_image"
                                src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/front-view-male-courier-green-uniform-holding-food-delivery-box-pink-desk_140725-33524-removebg-preview-1-1.png"
                                alt="Доставщик"
                                width={120}
                                height={120}
                            />
                            <span className="header__delivery-info">
                                <b>Оптовые поставки</b> от 100$
                            </span>
                        </div>
                        <div className="header__app-download">
                            <span>
                                Оригинальные витамины из <b>США</b>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Основной хедер */}
                <div className="header__main pc_visible">
                    <div className="header__logo__info">
                        <Link href="/">
                            <Image
                                src="https://nuxt.vitaline.uz/wp-content/uploads/2025/01/vitaline-trade-logo.png"
                                alt="Vitaline Logo"
                                className="header__logo-image"
                                width={240}
                                height={100}
                            />
                        </Link>
                        <span>
                            Оптовый интернет магазин витаминов и БАДов от лучших мировых брендов
                        </span>
                    </div>

                    <div className="header__search_and_contacts">
                        <div className="search_block">
                            <input
                                type="text"
                                placeholder="Поиск товаров"
                                className="header__search-input"
                                onClick={() => setIsPopupVisible(true)}
                                value={searchTerm}
                                onChange={handleChange}
                            />
                            <button className="header__search-button"
                                onClick={() => setIsPopupVisible(true)}
                                value={searchTerm}>
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
                                <span className="header__phone">
                                    <Link href="tel:+998 95 099 00 90">95 099 00 90</Link>
                                </span>
                                <span className="header__availability">Оператор онлайн</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Навигация */}
                <nav className="header__navigation pc_visible">
                    <div className="header__menu">
                        <Link href="/shop">
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
                        <div className="menu_block_link_ist">
                            <Link href="/about">О нас</Link>
                            <Link href="/warehouse">Склады</Link>
                            <Link href="/blog">Блог</Link>
                            <Link href="/contacts">Контакты</Link>
                            <Link href="/cart">Корзина</Link>
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
                        <Link href="/cart" className="header__cart">
                            <Image
                                src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/РЎРРѕР№_1-1.svg"
                                alt="Корзина"
                                width={20}
                                height={20}
                            />
                            <CartCounter />
                        </Link>
                    </div>
                </nav>

                {/* Хедер (mobile) */}
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
                                src="https://nuxt.vitaline.uz/wp-content/uploads/2025/01/vitaline-trade-logo.png"
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
                                value={searchTerm}
                                onChange={handleChange}
                            />
                            <button
                                className="header__search-button"
                                onClick={() => setIsPopupVisible(true)}
                                value={searchTerm}
                            >
                                <Image
                                    src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/searcher_magnifyng_glass_search_locate_find_icon_123813-1.svg"
                                    alt="Лупа"
                                    width={20}
                                    height={20}
                                />
                            </button>
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

                {/* Попап поиска (mobile) */}
                {isPopupVisible && (
                    <div className="search-popup-overlay">
                        <div className={`search-popup ${isClosing ? 'hidden_pop' : ''}`}>
                            <div className="search-popup-content">
                                <div className="search-popup-content-shdow-block">
                                    <div className="search-popup-header">
                                        <input
                                            type="text"
                                            placeholder="Поиск товаров"
                                            className="header__search-input"
                                            autoFocus
                                            value={searchTerm}
                                            onChange={handleChange}
                                        />

                                        <button className="close-popup" onClick={closePopup}>
                                            Закрыть
                                        </button>
                                    </div>
                                </div>

                                {/* <div className="search-pop_content">
                                    <div className={`inner_search_cats_list ${searchTerm && searchResults.length > 0 ? 'hidden_cats' : ''}`}>

                                        <h3>Популярные категории</h3>
                                        <div className="pop_search_tags">
                                            <Link onClick={closePopup} href="/category/sportivnoe-pitanie">
                                                <div>🏋️‍♂️ Спорт питание</div>
                                            </Link>
                                            <Link onClick={closePopup} href="/category/rybij-zhiromega3">
                                                <div>🐟 Рыбий жир, омега</div>
                                            </Link>
                                            <Link onClick={closePopup} href="/category/vitamin-d-d3">
                                                <div>☀️ Витамин Д3</div>
                                            </Link>
                                            <Link onClick={closePopup} href="/category/dlya-beremennyh">
                                                <div>🤰 Для беременных</div>
                                            </Link>
                                            <Link onClick={closePopup} href="/category/detskoe-zdorove">
                                                <div>🍼 Детское здоровье</div>
                                            </Link>
                                            <Link onClick={closePopup} href="/category/pishhevye-dobavki">
                                                <div>🍵 Пищевые добавки</div>
                                            </Link>
                                            <Link onClick={closePopup} href="/category/multivitaminy">
                                                <div>💊 Мультивитамины</div>
                                            </Link>
                                            <Link onClick={closePopup} href="/category/zhenskoe-zdorove">
                                                <div>🙋‍♀️ Женское здоровье</div>
                                            </Link>
                                            <Link onClick={closePopup} href="/category/kozha-nogti-i-volosy">
                                                <div>💅 Кожа, ногти, волосы</div>
                                            </Link>
                                            <Link onClick={closePopup} href="/category/produkty-pitanie">
                                                <div>🧃 Продукты питания</div>
                                            </Link>
                                            <Link onClick={closePopup} href="/category/dlya-pohudeniya">
                                                <div>🍽️ Для похудения</div>
                                            </Link>
                                            <Link onClick={closePopup} href="/category/zelen-i-superfudy">
                                                <div>🥬 Зелень и суперфуды</div>
                                            </Link>
                                            <Link onClick={closePopup} href="/category/sistema-pishhevarenie">
                                                <div>🥣 Для пищеварения</div>
                                            </Link>
                                            <Link onClick={closePopup} href="/category/preparaty-dlya-glaz">
                                                <div>👁️ Препараты для глаз</div>
                                            </Link>
                                            <Link onClick={closePopup} href="/category/1kosmetika">
                                                <div>💄 Косметика</div>
                                            </Link>

                                        </div>
                                    </div>

                                    {isLoading && (
                                        <div className='loading-indicator'>Загрузка...</div>
                                    )}


                                    {searchTerm.length >= 2 ? (
                                        searchComplete && searchResults.length === 0 ? (
                                            <div className='nothing-found'>По вашему запросу <u>{searchTerm}</u> ничего не найдено</div>
                                        ) : (
                                            <>
                                                <Link
                                                    href={`/search-results?query=${searchTerm}`}
                                                    className="search-results-btn"
                                                    onClick={closePopup}
                                                >
                                                    Все результаты поиска ⭢
                                                </Link>
                                                {searchResults.map((hit: AlgoliaHit) => (
                                                    <Link
                                                        key={hit.objectID}
                                                        href={hit.url ? `/product/${hit.url.replace('https://nuxt.vitaline.uz/product/', '')}` : '#'}
                                                        className="search-result-item"
                                                        onClick={closePopup}
                                                    >
                                                        <div>
                                                            {hit.thumbnail_url && (
                                                                <Image
                                                                    src={hit.thumbnail_url}
                                                                    alt={hit.name}
                                                                    width={50}
                                                                    height={50}
                                                                    style={{ objectFit: 'contain' }}
                                                                />
                                                            )}
                                                        </div>
                                                        <div style={{ marginLeft: '10px' }}>
                                                            <p>{hit.name}</p>
                                                            {hit.sku && <p className="sku">{hit.sku}</p>}
                                                        </div>
                                                    </Link>
                                                ))}
                                            </>
                                        )
                                    ) : null}
                                </div> */}

                                <div className="search-pop_content">
                                    {searchTerm.length >= 2 && searchComplete && searchResults.length === 0 && (
                                        <div className='nothing-found'>По вашему запросу <u>{searchTerm}</u> ничего не найдено</div>
                                    )}

                                    <div className={`inner_search_cats_list ${searchTerm && searchResults.length > 0 ? 'hidden_cats' : ''}`}>
                                        <h3>Популярные категории</h3>
                                        <div className="pop_search_tags">
                                            <Link onClick={closePopup} href="/category/sportivnoe-pitanie">
                                                <div>🏋️‍♂️ Спорт питание</div>
                                            </Link>
                                            <Link onClick={closePopup} href="/category/rybij-zhiromega3">
                                                <div>🐟 Рыбий жир, омега</div>
                                            </Link>
                                            <Link onClick={closePopup} href="/category/vitamin-d-d3">
                                                <div>☀️ Витамин Д3</div>
                                            </Link>
                                            <Link onClick={closePopup} href="/category/dlya-beremennyh">
                                                <div>🤰 Для беременных</div>
                                            </Link>
                                            <Link onClick={closePopup} href="/category/detskoe-zdorove">
                                                <div>🍼 Детское здоровье</div>
                                            </Link>
                                            <Link onClick={closePopup} href="/category/pishhevye-dobavki">
                                                <div>🍵 Пищевые добавки</div>
                                            </Link>
                                            <Link onClick={closePopup} href="/category/multivitaminy">
                                                <div>💊 Мультивитамины</div>
                                            </Link>
                                            <Link onClick={closePopup} href="/category/zhenskoe-zdorove">
                                                <div>🙋‍♀️ Женское здоровье</div>
                                            </Link>
                                            <Link onClick={closePopup} href="/category/kozha-nogti-i-volosy">
                                                <div>💅 Кожа, ногти, волосы</div>
                                            </Link>
                                            <Link onClick={closePopup} href="/category/produkty-pitanie">
                                                <div>🧃 Продукты питания</div>
                                            </Link>
                                            <Link onClick={closePopup} href="/category/dlya-pohudeniya">
                                                <div>🍽️ Для похудения</div>
                                            </Link>
                                            <Link onClick={closePopup} href="/category/zelen-i-superfudy">
                                                <div>🥬 Зелень и суперфуды</div>
                                            </Link>
                                            <Link onClick={closePopup} href="/category/sistema-pishhevarenie">
                                                <div>🥣 Для пищеварения</div>
                                            </Link>
                                            <Link onClick={closePopup} href="/category/preparaty-dlya-glaz">
                                                <div>👁️ Препараты для глаз</div>
                                            </Link>
                                            <Link onClick={closePopup} href="/category/1kosmetika">
                                                <div>💄 Косметика</div>
                                            </Link>
                                        </div>
                                    </div>

                                    {isLoading && (
                                        <div className='loading-indicator'>Загрузка...</div>
                                    )}

                                    {searchTerm.length >= 2 && searchResults.length > 0 && (
                                        <>
                                            <Link
                                                href={`/search-results?query=${searchTerm}`}
                                                className="search-results-btn"
                                                onClick={closePopup}
                                            >
                                                Все результаты поиска ⭢
                                            </Link>
                                            {searchResults.map((hit: AlgoliaHit) => (
                                                <Link
                                                    key={hit.objectID}
                                                    href={hit.url ? `/product/${hit.url.replace('https://nuxt.vitaline.uz/product/', '')}` : '#'}
                                                    className="search-result-item"
                                                    onClick={closePopup}
                                                >
                                                    <div className='search-image-preview'>
                                                        {hit.thumbnail_url && (
                                                            <Image
                                                                src={hit.thumbnail_url}
                                                                alt={hit.name}
                                                                width={50}
                                                                height={50}
                                                                style={{ objectFit: 'contain' }}
                                                            />
                                                        )}
                                                    </div>
                                                    <div style={{ marginLeft: '10px' }}>
                                                        <p>{hit.name}</p>
                                                        {hit.sku && <p className="sku">{hit.sku}</p>}
                                                    </div>
                                                </Link>
                                            ))}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <Link href="/cart">
                    <div className="floating_cart">
                        <CartCounter />
                        <svg
                            id="Layer_1"
                            enableBackground="new 0 0 511.728 511.728"
                            height="512"
                            viewBox="0 0 511.728 511.728"
                            width="512"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                style={{ fill: '#FFF' }}
                                d="m147.925 379.116c-22.357-1.142-21.936-32.588-.001-33.68 62.135.216 226.021.058 290.132.103 17.535 0 32.537-11.933 36.481-29.017l36.404-157.641c2.085-9.026-.019-18.368-5.771-25.629s-14.363-11.484-23.626-11.484c-25.791 0-244.716-.991-356.849-1.438l-17.775-65.953c-4.267-15.761-18.65-26.768-34.978-26.768h-56.942c-8.284 0-15 6.716-15 15s6.716 15 15 15h56.942c2.811 0 5.286 1.895 6.017 4.592l68.265 253.276c-12.003.436-23.183 5.318-31.661 13.92-8.908 9.04-13.692 21.006-13.471 33.695.442 25.377 21.451 46.023 46.833 46.023h21.872c-3.251 6.824-5.076 14.453-5.076 22.501 0 28.95 23.552 52.502 52.502 52.502s52.502-23.552 52.502-52.502c0-8.049-1.826-15.677-5.077-22.501h94.716c-3.248 6.822-5.073 14.447-5.073 22.493 0 28.95 23.553 52.502 52.502 52.502 28.95 0 52.503-23.553 52.503-52.502 0-8.359-1.974-16.263-5.464-23.285 5.936-1.999 10.216-7.598 10.216-14.207 0-8.284-6.716-15-15-15zm91.799 52.501c0 12.408-10.094 22.502-22.502 22.502s-22.502-10.094-22.502-22.502c0-12.401 10.084-22.491 22.483-22.501h.038c12.399.01 22.483 10.1 22.483 22.501zm167.07 22.494c-12.407 0-22.502-10.095-22.502-22.502 0-12.285 9.898-22.296 22.137-22.493h.731c12.24.197 22.138 10.208 22.138 22.493-.001 12.407-10.096 22.502-22.504 22.502zm74.86-302.233c.089.112.076.165.057.251l-15.339 66.425h-51.942l8.845-67.023 58.149.234c.089.002.142.002.23.113zm-154.645 163.66v-66.984h53.202l-8.84 66.984zm-74.382 0-8.912-66.984h53.294v66.984zm-69.053 0h-.047c-3.656-.001-6.877-2.467-7.828-5.98l-16.442-61.004h54.193l8.912 66.984zm56.149-96.983-9.021-67.799 66.306.267v67.532zm87.286 0v-67.411l66.022.266-8.861 67.145zm-126.588-67.922 9.037 67.921h-58.287l-18.38-68.194zm237.635 164.905h-36.426l8.84-66.984h48.973l-14.137 61.217c-.784 3.396-3.765 5.767-7.25 5.767z"
                            ></path>
                        </svg>
                    </div>
                </Link>
            </header>
        </>
    );
};

export default Header;
