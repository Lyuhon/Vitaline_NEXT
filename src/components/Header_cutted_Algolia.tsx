// // 'use client'

// // import React, { useEffect, useState, useRef } from 'react';
// // import Link from 'next/link';
// // import Image from 'next/image';
// // import CartCounter from '@/components/CartCounter';
// // import { liteClient as algoliasearch } from 'algoliasearch/lite';
// // import instantsearch from 'instantsearch.js';
// // import {
// //     searchBox,
// //     hits,
// //     configure,
// //     poweredBy,
// // } from 'instantsearch.js/es/widgets';
// // import 'instantsearch.css/themes/reset.css';
// // import { WidgetFactory } from 'instantsearch.js';
// // import '@/app/header.css';

// // interface AlgoliaHit {
// //     objectID: string;
// //     name: string;
// //     sku?: string;
// //     url?: string;
// //     thumbnail_url?: string;
// //     categories?: string[];
// // }

// // const Header = () => {
// //     const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
// //     const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
// //     const [isClosing, setIsClosing] = useState<boolean>(false);
// //     const [searchTerm, setSearchTerm] = useState<string>('');
// //     const [searchResults, setSearchResults] = useState<AlgoliaHit[]>([]);
// //     const [isLoading, setIsLoading] = useState<boolean>(false);
// //     const searchInstanceRef = useRef<any>(null);

// //     useEffect(() => {
// //         if (typeof window !== 'undefined') {
// //             const token = localStorage.getItem('authToken');
// //             setIsAuthenticated(!!token);
// //         }
// //     }, []);

// //     useEffect(() => {
// //         const searchClient = algoliasearch(
// //             'TJRO96P4LZ',
// //             'e9cd85a57dcba249ac8ca48023342b99'
// //         );

// //         const search = instantsearch({
// //             indexName: 'vt_trade_',
// //             searchClient,
// //             onStateChange({ uiState, setUiState }) {
// //                 const query = uiState['vt_trade_']?.query || '';
// //                 setSearchTerm(query);
// //                 setIsLoading(false);
// //                 setUiState(uiState);
// //             },
// //         });

// //         const customWidget = {
// //             $$type: 'custom.results' as const,
// //             init(options: { helper: any }) {
// //                 // Initialization logic if needed
// //             },
// //             render(options: { results: { hits: any[] } | null; helper: any }) {
// //                 if (options.results?.hits) {
// //                     setSearchResults(options.results.hits as AlgoliaHit[]);
// //                 }
// //             },
// //             dispose() {
// //                 setSearchResults([]);
// //             }
// //         } as const;

// //         search.addWidgets([
// //             configure({
// //                 hitsPerPage: 6,
// //             }),
// //             customWidget
// //         ]);

// //         search.start();
// //         searchInstanceRef.current = search;

// //         return () => {
// //             search.dispose();
// //         };
// //     }, []);

// //     useEffect(() => {
// //         if (isPopupVisible) {
// //             document.body.style.overflow = 'hidden';
// //         } else {
// //             document.body.style.overflow = '';
// //         }

// //         return () => {
// //             document.body.style.overflow = '';
// //         };
// //     }, [isPopupVisible]);

// //     const closePopup = () => {
// //         setIsClosing(true);
// //         setTimeout(() => {
// //             setIsPopupVisible(false);
// //             setIsClosing(false);
// //             if (searchInstanceRef.current) {
// //                 searchInstanceRef.current.helper.setQuery('').search();
// //             }
// //         }, 300);
// //     };

// //     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //         const value = e.target.value;
// //         setSearchTerm(value);
// //         setIsLoading(true);

// //         if (searchInstanceRef.current) {
// //             searchInstanceRef.current.helper.setQuery(value).search();
// //         }

// //         if (value.length < 3) {
// //             setSearchResults([]);
// //             setIsLoading(false);
// //         }
// //     };

// //     return (
// //         <>
// //             <header className="header">
// //                 <div className="header__main pc_visible">
// //                     <div className="header__logo__info">
// //                         <Link href="/">
// //                             <Image
// //                                 src="https://nuxt.vitaline.uz/wp-content/uploads/2025/01/vitaline-trade-logo.png"
// //                                 alt="Vitaline Logo"
// //                                 className="header__logo-image"
// //                                 width={240}
// //                                 height={100}
// //                             />
// //                         </Link>
// //                         <span>
// //                             Оптовый интернет магазин витаминов и БАДов от лучших мировых брендов
// //                         </span>
// //                     </div>

// //                     <div className="header__search_and_contacts">
// //                         <div className="search_block">
// //                             <input
// //                                 type="text"
// //                                 placeholder="Поиск товаров"
// //                                 className="header__search-input"
// //                                 onClick={() => setIsPopupVisible(true)}
// //                                 value={searchTerm}
// //                                 onChange={handleChange}
// //                             />
// //                             <button
// //                                 className="header__search-button"
// //                                 onClick={() => setIsPopupVisible(true)}
// //                             >
// //                                 <Image
// //                                     src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/searcher_magnifyng_glass_search_locate_find_icon_123813-1.svg"
// //                                     alt="Лупа"
// //                                     width={20}
// //                                     height={20}
// //                                 />
// //                             </button>
// //                         </div>
// //                     </div>
// //                 </div>

// //                 {isPopupVisible && (
// //                     <div className="search-popup-overlay">
// //                         <div className={`search-popup ${isClosing ? 'hidden_pop' : ''}`}>
// //                             <div className="search-popup-content">
// //                                 <div className="search-popup-content-shdow-block">
// //                                     <div className="search-popup-header">
// //                                         <input
// //                                             type="text"
// //                                             placeholder="Поиск товаров"
// //                                             className="header__search-input"
// //                                             autoFocus
// //                                             value={searchTerm}
// //                                             onChange={handleChange}
// //                                         />
// //                                         <button className="close-popup" onClick={closePopup}>
// //                                             Закрыть
// //                                         </button>
// //                                     </div>
// //                                 </div>

// //                                 <div className="search-pop_content">
// //                                     <div className={`inner_search_cats_list ${searchTerm && searchResults.length > 0 ? 'hidden_cats' : ''}`}>
// //                                         <h3>Популярные категории</h3>
// //                                         <div className="pop_search_tags">
// //                                             <Link onClick={closePopup} href="/category/sportivnoe-pitanie">
// //                                                 <div>🏋️‍♂️ Спорт питание</div>
// //                                             </Link>
// //                                         </div>
// //                                     </div>

// //                                     {isLoading && (
// //                                         <div className='loading-indicator'>Загрузка...</div>
// //                                     )}

// //                                     {searchTerm.length >= 3 && searchResults.length === 0 ? (
// //                                         <div className='nothing-found'>По вашему запросу <u>{searchTerm}</u> ничего не найдено</div>
// //                                     ) : (
// //                                         searchResults.map((hit: AlgoliaHit) => (
// //                                             <Link
// //                                                 key={hit.objectID}
// //                                                 href={`/product/${hit.url?.split('/').pop()}`}
// //                                                 className="search-result-item"
// //                                                 onClick={closePopup}
// //                                             >
// //                                                 <div>
// //                                                     {hit.thumbnail_url && (
// //                                                         <Image
// //                                                             src={hit.thumbnail_url}
// //                                                             alt={hit.name}
// //                                                             width={50}
// //                                                             height={50}
// //                                                             style={{ objectFit: 'contain' }}
// //                                                         />
// //                                                     )}
// //                                                 </div>
// //                                                 <div style={{ marginLeft: '10px' }}>
// //                                                     <p>{hit.name}</p>
// //                                                     {hit.sku && <p className="sku">{hit.sku}</p>}
// //                                                 </div>
// //                                             </Link>
// //                                         ))
// //                                     )}
// //                                 </div>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 )}
// //             </header>
// //         </>
// //     );
// // };

// // export default Header;














// // РАБОТАЕТ ПЗДЦ КАЙФ
// 'use client'

// import React, { useEffect, useState, useRef } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import CartCounter from '@/components/CartCounter';
// import { liteClient as algoliasearch } from 'algoliasearch/lite';
// import instantsearch from 'instantsearch.js';
// import { configure } from 'instantsearch.js/es/widgets';
// import 'instantsearch.css/themes/reset.css';
// import '@/app/header.css';

// interface AlgoliaHit {
//     objectID: string;
//     name: string;
//     sku?: string;
//     url?: string;
//     thumbnail_url?: string;
//     categories?: string[];
// }

// const Header = () => {
//     const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//     const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
//     const [isClosing, setIsClosing] = useState<boolean>(false);
//     const [searchTerm, setSearchTerm] = useState<string>('');
//     const [searchResults, setSearchResults] = useState<AlgoliaHit[]>([]);
//     const [isLoading, setIsLoading] = useState<boolean>(false);
//     const searchInstanceRef = useRef<any>(null);

//     useEffect(() => {
//         if (typeof window !== 'undefined') {
//             const token = localStorage.getItem('authToken');
//             setIsAuthenticated(!!token);
//         }
//     }, []);

//     useEffect(() => {
//         const searchClient = algoliasearch(
//             'TJRO96P4LZ',
//             'e9cd85a57dcba249ac8ca48023342b99'
//         );

//         const search = instantsearch({
//             indexName: 'vt_trade_',
//             searchClient,
//             initialUiState: {
//                 'vt_trade_': {
//                     query: searchTerm
//                 }
//             }
//         });

//         const customWidget = {
//             $$type: 'custom.results' as const,
//             init(options: { helper: any }) {
//                 // Initialization logic if needed
//             },
//             render(options: { results: { hits: any[] } | null; helper: any }) {
//                 if (options.results?.hits) {
//                     setSearchResults(options.results.hits as AlgoliaHit[]);
//                     setIsLoading(false);
//                 }
//             },
//             dispose() {
//                 setSearchResults([]);
//             }
//         } as const;

//         search.addWidgets([
//             configure({
//                 hitsPerPage: 6,
//             }),
//             customWidget
//         ]);

//         search.start();
//         searchInstanceRef.current = search;

//         return () => {
//             search.dispose();
//         };
//     }, []);

//     useEffect(() => {
//         if (isPopupVisible) {
//             document.body.style.overflow = 'hidden';
//         } else {
//             document.body.style.overflow = '';
//         }

//         return () => {
//             document.body.style.overflow = '';
//         };
//     }, [isPopupVisible]);

//     const closePopup = () => {
//         setIsClosing(true);
//         setTimeout(() => {
//             setIsPopupVisible(false);
//             setIsClosing(false);
//             setSearchTerm('');
//             if (searchInstanceRef.current) {
//                 searchInstanceRef.current.helper.setQuery('').search();
//             }
//         }, 300);
//     };

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const value = e.target.value;
//         setSearchTerm(value);
//         setIsLoading(true);

//         if (searchInstanceRef.current) {
//             searchInstanceRef.current.helper.setQuery(value).search();
//         }

//         if (value.length < 3) {
//             setSearchResults([]);
//             setIsLoading(false);
//         }
//     };

//     return (
//         <>
//             <header className="header">
//                 <div className="header__main pc_visible">
//                     <div className="header__logo__info">
//                         <Link href="/">
//                             <Image
//                                 src="https://nuxt.vitaline.uz/wp-content/uploads/2025/01/vitaline-trade-logo.png"
//                                 alt="Vitaline Logo"
//                                 className="header__logo-image"
//                                 width={240}
//                                 height={100}
//                             />
//                         </Link>
//                         <span>
//                             Оптовый интернет магазин витаминов и БАДов от лучших мировых брендов
//                         </span>
//                     </div>

//                     <div className="header__search_and_contacts">
//                         <div className="search_block">
//                             <input
//                                 type="text"
//                                 placeholder="Поиск товаров"
//                                 className="header__search-input"
//                                 onClick={() => setIsPopupVisible(true)}
//                                 value={searchTerm}
//                                 onChange={handleChange}
//                             />
//                             <button
//                                 className="header__search-button"
//                                 onClick={() => setIsPopupVisible(true)}
//                             >
//                                 <Image
//                                     src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/searcher_magnifyng_glass_search_locate_find_icon_123813-1.svg"
//                                     alt="Лупа"
//                                     width={20}
//                                     height={20}
//                                 />
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {isPopupVisible && (
//                     <div className="search-popup-overlay">
//                         <div className={`search-popup ${isClosing ? 'hidden_pop' : ''}`}>
//                             <div className="search-popup-content">
//                                 <div className="search-popup-content-shdow-block">
//                                     <div className="search-popup-header">
//                                         <input
//                                             type="text"
//                                             placeholder="Поиск товаров"
//                                             className="header__search-input"
//                                             autoFocus
//                                             value={searchTerm}
//                                             onChange={handleChange}
//                                         />
//                                         <button className="close-popup" onClick={closePopup}>
//                                             Закрыть
//                                         </button>
//                                     </div>
//                                 </div>

//                                 <div className="search-pop_content">
//                                     <div className={`inner_search_cats_list ${searchTerm && searchResults.length > 0 ? 'hidden_cats' : ''}`}>
//                                         <h3>Популярные категории</h3>
//                                         <div className="pop_search_tags">
//                                             <Link onClick={closePopup} href="/category/sportivnoe-pitanie">
//                                                 <div>🏋️‍♂️ Спорт питание</div>
//                                             </Link>
//                                             {/* Добавьте остальные категории здесь */}
//                                         </div>
//                                     </div>

//                                     {isLoading && (
//                                         <div className='loading-indicator'>Загрузка...</div>
//                                     )}

//                                     {searchTerm.length >= 3 && searchResults.length === 0 ? (
//                                         <div className='nothing-found'>По вашему запросу <u>{searchTerm}</u> ничего не найдено</div>
//                                     ) : (
//                                         searchResults.map((hit: AlgoliaHit) => (
//                                             <Link
//                                                 key={hit.objectID}
//                                                 href={`/product/${hit.url?.split('/').pop()}`}
//                                                 className="search-result-item"
//                                                 onClick={closePopup}
//                                             >
//                                                 <div>
//                                                     {hit.thumbnail_url && (
//                                                         <Image
//                                                             src={hit.thumbnail_url}
//                                                             alt={hit.name}
//                                                             width={50}
//                                                             height={50}
//                                                             style={{ objectFit: 'contain' }}
//                                                         />
//                                                     )}
//                                                 </div>
//                                                 <div style={{ marginLeft: '10px' }}>
//                                                     <p>{hit.name}</p>
//                                                     {hit.sku && <p className="sku">{hit.sku}</p>}
//                                                 </div>
//                                             </Link>
//                                         ))
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </header>
//         </>
//     );
// };

// export default Header;

'use client'

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CartCounter from '@/components/CartCounter';
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js';
import { configure } from 'instantsearch.js/es/widgets';
import 'instantsearch.css/themes/reset.css';
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
            if (searchInstanceRef.current) {
                searchInstanceRef.current.helper.setQuery('').search();
            }
        }, 300);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value.length >= 2) {
            setIsLoading(true);
            if (searchInstanceRef.current) {
                searchInstanceRef.current.helper.setQuery(value).search();
            }
        } else {
            setSearchResults([]);
            setIsLoading(false);
        }
    };

    return (
        <>
            <header className="header">
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
                            <button
                                className="header__search-button"
                                onClick={() => setIsPopupVisible(true)}
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
                </div>

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

                                <div className="search-pop_content">
                                    <div className={`inner_search_cats_list ${searchTerm && searchResults.length > 0 ? 'hidden_cats' : ''}`}>
                                        <h3>Популярные категории</h3>
                                        <div className="pop_search_tags">
                                            <Link onClick={closePopup} href="/category/sportivnoe-pitanie">
                                                <div>🏋️‍♂️ Спорт питание</div>
                                            </Link>
                                            {/* Добавьте остальные категории здесь */}
                                        </div>
                                    </div>

                                    {isLoading && (
                                        <div className='loading-indicator'>Загрузка...</div>
                                    )}

                                    {searchTerm.length >= 2 ? (
                                        searchResults.length === 0 ? (
                                            <div className='nothing-found'>По вашему запросу <u>{searchTerm}</u> ничего не найдено</div>
                                        ) : (
                                            searchResults.map((hit: AlgoliaHit) => (
                                                <Link
                                                    key={hit.objectID}
                                                    href={`/product/${hit.url?.split('/').pop()}`}
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
                                            ))
                                        )) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
};

export default Header;