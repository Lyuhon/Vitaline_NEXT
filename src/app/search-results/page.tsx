// // // 'use client';

// // // import React, { useEffect, useState } from 'react';
// // // import { useSearchParams } from 'next/navigation';
// // // import { liteClient as algoliasearch } from 'algoliasearch/lite';
// // // import instantsearch from 'instantsearch.js';
// // // import { configure } from 'instantsearch.js/es/widgets';
// // // import Link from 'next/link';
// // // import Image from 'next/image';

// // // interface AlgoliaHit {
// // //     objectID: string;
// // //     name: string;
// // //     sku?: string;
// // //     url?: string;
// // //     thumbnail_url?: string;
// // //     categories?: string[];
// // // }

// // // export default function SearchResultsPage() {
// // //     const searchParams = useSearchParams();
// // //     const [results, setResults] = useState<AlgoliaHit[]>([]);
// // //     const [isLoading, setIsLoading] = useState(true);

// // //     // Получаем параметр поиска из URL
// // //     const searchQuery = searchParams.get('query') || '';

// // //     useEffect(() => {
// // //         const searchClient = algoliasearch(
// // //             'TJRO96P4LZ',
// // //             'e9cd85a57dcba249ac8ca48023342b99'
// // //         );

// // //         const search = instantsearch({
// // //             indexName: 'vt_trade_',
// // //             searchClient,
// // //             searchFunction(helper) {
// // //                 // Устанавливаем поисковый запрос из URL
// // //                 helper.setQuery(searchQuery).search();
// // //             }
// // //         });

// // //         const customWidget = {
// // //             $$type: 'custom.results' as const,
// // //             init() { },
// // //             render(options: { results: { hits: any[] } | null }) {
// // //                 if (options.results?.hits) {
// // //                     setResults(options.results.hits as AlgoliaHit[]);
// // //                     setIsLoading(false);
// // //                 }
// // //             },
// // //             dispose() {
// // //                 setResults([]);
// // //             }
// // //         } as const;

// // //         search.addWidgets([
// // //             configure({
// // //                 hitsPerPage: 100,
// // //             }),
// // //             customWidget
// // //         ]);

// // //         search.start();

// // //         return () => {
// // //             search.dispose();
// // //         };
// // //     }, [searchQuery]); // Перезапускаем эффект при изменении searchQuery

// // //     if (!searchQuery) {
// // //         return (
// // //             <div className="container mx-auto p-4">
// // //                 <h1 className="text-2xl font-bold mb-6">Поиск товаров</h1>
// // //                 <div>Пожалуйста, введите поисковый запрос в параметр query</div>
// // //             </div>
// // //         );
// // //     }

// // //     return (
// // //         <div className="container mx-auto p-4">
// // //             <h1 className="text-2xl font-bold mb-6">
// // //                 Результаты поиска по запросу "{searchQuery}"
// // //             </h1>

// // //             {isLoading ? (
// // //                 <div className="text-center py-8">Загрузка...</div>
// // //             ) : results.length === 0 ? (
// // //                 <div className="py-8">По вашему запросу ничего не найдено</div>
// // //             ) : (
// // //                 <>npmn
// // //                     <div className="mb-4">Найдено товаров: {results.length}</div>
// // //                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
// // //                         {results.map((hit) => (
// // //                             <Link
// // //                                 key={hit.objectID}
// // //                                 href={`/product/${hit.url?.split('/').pop()}`}
// // //                                 className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
// // //                             >
// // //                                 <div className="p-4">
// // //                                     {hit.thumbnail_url && (
// // //                                         <div className="aspect-square relative mb-4">
// // //                                             <Image
// // //                                                 src={hit.thumbnail_url}
// // //                                                 alt={hit.name}
// // //                                                 fill
// // //                                                 className="object-contain"
// // //                                             />
// // //                                         </div>
// // //                                     )}
// // //                                     <h2 className="font-semibold mb-2">{hit.name}</h2>
// // //                                     {hit.sku && (
// // //                                         <p className="text-sm text-gray-600">
// // //                                             Артикул: {hit.sku}
// // //                                         </p>
// // //                                     )}
// // //                                 </div>
// // //                             </Link>
// // //                         ))}
// // //                     </div>
// // //                 </>
// // //             )}
// // //         </div>
// // //     );
// // // }

// // 'use client';

// // import React, { useEffect, useState } from 'react';
// // import { useSearchParams } from 'next/navigation';
// // import { liteClient as algoliasearch } from 'algoliasearch/lite';
// // import instantsearch from 'instantsearch.js';
// // import { configure } from 'instantsearch.js/es/widgets';
// // import Link from 'next/link';
// // import Image from 'next/image';
// // import '../shop/shop.css';


// // interface AlgoliaHit {
// //     objectID: string;
// //     name: string;
// //     sku?: string;
// //     url?: string;
// //     thumbnail_url?: string;
// //     categories?: string[];
// // }

// // export default function SearchResultsPage() {
// //     const searchParams = useSearchParams();
// //     const [results, setResults] = useState<AlgoliaHit[]>([]);
// //     const [isLoading, setIsLoading] = useState(true);

// //     const searchQuery = searchParams.get('query') || '';

// //     useEffect(() => {
// //         const searchClient = algoliasearch(
// //             'TJRO96P4LZ',
// //             'e9cd85a57dcba249ac8ca48023342b99'
// //         );

// //         const search = instantsearch({
// //             indexName: 'vt_trade_',
// //             searchClient,
// //             searchFunction(helper) {
// //                 helper.setQuery(searchQuery).search();
// //             }
// //         });

// //         const customWidget = {
// //             $$type: 'custom.results' as const,
// //             init() { },
// //             render(options: { results: { hits: any[] } | null }) {
// //                 if (options.results?.hits) {
// //                     setResults(options.results.hits as AlgoliaHit[]);
// //                     setIsLoading(false);
// //                 }
// //             },
// //             dispose() {
// //                 setResults([]);
// //             }
// //         } as const;

// //         search.addWidgets([
// //             configure({
// //                 hitsPerPage: 100,
// //             }),
// //             customWidget
// //         ]);

// //         search.start();

// //         return () => {
// //             search.dispose();
// //         };
// //     }, [searchQuery]);

// //     if (!searchQuery) {
// //         return (
// //             <div className="shop_page">
// //                 <div className="shop_page_wrapper">
// //                     <div className="products_side">
// //                         <h1 className="shop_page_title">Поиск товаров</h1>
// //                         <div>Пожалуйста, введите поисковый запрос в параметр query</div>
// //                     </div>
// //                 </div>
// //             </div>
// //         );
// //     }

// //     return (
// //         <div className="shop_page">
// //             <div className="shop_page_wrapper">
// //                 <div className="products_side">
// //                     <h1 className="shop_page_title">
// //                         Результаты поиска по запросу "{searchQuery}"
// //                     </h1>

// //                     {isLoading ? (
// //                         <div className="text-center py-8">Загрузка...</div>
// //                     ) : results.length === 0 ? (
// //                         <div className="py-8">По вашему запросу ничего не найдено</div>
// //                     ) : (
// //                         <>
// //                             <h2 style={{ marginBottom: '15px' }}>
// //                                 Найдено товаров: {results.length}
// //                             </h2>
// //                             <div className="shop_page_prod_grid">
// //                                 {results.map((hit) => (
// //                                     <div className="product_item" key={hit.objectID}>
// //                                         {/* <Link href={`/product/${hit.url}`}> */}
// //                                         <Link href={`${hit.url?.replace("nuxt.vitaline.uz", "vitaline-trade.com")}`}>
// //                                             {hit.thumbnail_url && (
// //                                                 <Image
// //                                                     className="product_item__image"
// //                                                     src={hit.thumbnail_url}
// //                                                     alt={hit.name}
// //                                                     width={300}
// //                                                     height={300}
// //                                                 />
// //                                             )}
// //                                         </Link>
// //                                         <div className="product_meta_box">
// //                                             <div className="line_highlight"></div>
// //                                             <Link
// //                                                 href={`${hit.url?.replace("nuxt.vitaline.uz", "vitaline-trade.com")}`}
// //                                                 className="product_item__name"
// //                                             >
// //                                                 {hit.name}
// //                                             </Link>
// //                                             {hit.sku && (
// //                                                 <span className="product_item__sku">
// //                                                     Артикул: {hit.sku}
// //                                                 </span>
// //                                             )}
// //                                         </div>
// //                                     </div>
// //                                 ))}
// //                             </div>
// //                         </>
// //                     )}
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }






// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useSearchParams } from 'next/navigation';
// import { liteClient as algoliasearch } from 'algoliasearch/lite';
// import instantsearch from 'instantsearch.js';
// import { configure } from 'instantsearch.js/es/widgets';
// import Link from 'next/link';
// import Image from 'next/image';
// import '../shop/shop.css';

// interface AlgoliaHit {
//     objectID: string;
//     name: string;
//     sku?: string;
//     url?: string;
//     thumbnail_url?: string;
//     categories?: string[];
//     stock_status?: string;
// }

// export default function SearchResultsPage() {
//     const searchParams = useSearchParams();
//     const [results, setResults] = useState<AlgoliaHit[]>([]);
//     const [isLoading, setIsLoading] = useState(true);

//     const searchQuery = searchParams.get('query') || '';

//     useEffect(() => {
//         const searchClient = algoliasearch(
//             'TJRO96P4LZ',
//             'e9cd85a57dcba249ac8ca48023342b99'
//         );

//         const search = instantsearch({
//             indexName: 'vt_trade_',
//             searchClient,
//         });

//         const customWidget = {
//             $$type: 'custom.results' as const,
//             init() { },
//             render(options: { results: { hits: any[] } | null }) {
//                 if (options.results?.hits) {
//                     // Фильтруем только товары в наличии
//                     const inStockItems = options.results.hits.filter(
//                         item => item.stock_status === 'instock'
//                     );
//                     setResults(inStockItems as AlgoliaHit[]);
//                     setIsLoading(false);
//                 }
//             },
//             dispose() {
//                 setResults([]);
//             }
//         } as const;

//         search.addWidgets([
//             configure({
//                 hitsPerPage: 100,
//                 query: searchQuery
//             }),
//             customWidget
//         ]);

//         search.start();

//         return () => {
//             search.dispose();
//         };
//     }, [searchQuery]);

//     if (!searchQuery) {
//         return (
//             <div className="shop_page">
//                 <div className="shop_page_wrapper">
//                     <div className="products_side">
//                         <h1 className="shop_page_title">Поиск товаров</h1>
//                         <div>Пожалуйста, введите поисковый запрос в параметр query</div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="shop_page">
//             <div className="shop_page_wrapper">
//                 <div className="products_side">
//                     <h1 className="shop_page_title">
//                         Результаты поиска по запросу "{searchQuery}"
//                     </h1>

//                     {isLoading ? (
//                         <div className="text-center py-8">Загрузка...</div>
//                     ) : results.length === 0 ? (
//                         <div className="py-8">По вашему запросу товаров в наличии не найдено</div>
//                     ) : (
//                         <>
//                             <h2 style={{ marginBottom: '15px' }}>
//                                 Найдено товаров в наличии: {results.length}
//                             </h2>
//                             <div className="shop_page_prod_grid">
//                                 {results.map((hit) => (
//                                     <div className="product_item" key={hit.objectID}>
//                                         <Link href={`${hit.url?.replace("nuxt.vitaline.uz", "vitaline-trade.com")}`}>
//                                             {hit.thumbnail_url && (
//                                                 <Image
//                                                     className="product_item__image"
//                                                     src={hit.thumbnail_url}
//                                                     alt={hit.name}
//                                                     width={300}
//                                                     height={300}
//                                                 />
//                                             )}
//                                         </Link>
//                                         <div className="product_meta_box">
//                                             <div className="line_highlight"></div>
//                                             <Link
//                                                 href={`${hit.url?.replace("nuxt.vitaline.uz", "vitaline-trade.com")}`}
//                                                 className="product_item__name"
//                                             >
//                                                 {hit.name}
//                                             </Link>
//                                             {hit.sku && (
//                                                 <span className="product_item__sku">
//                                                     Артикул: {hit.sku}
//                                                 </span>
//                                             )}
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }


'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js';
import { configure } from 'instantsearch.js/es/widgets';
import Link from 'next/link';
import Image from 'next/image';
import '../shop/shop.css';

interface AlgoliaHit {
    objectID: string;
    name: string;
    sku?: string;
    url?: string;
    thumbnail_url?: string;
    categories?: string[];
    stock_status?: string;
}

export default function SearchResultsPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [results, setResults] = useState<AlgoliaHit[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchInput, setSearchInput] = useState('');

    const searchQuery = searchParams.get('query') || '';

    useEffect(() => {
        setSearchInput(searchQuery); // Устанавливаем значение инпута при загрузке страницы
    }, [searchQuery]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchInput.trim()) {
            router.push(`/search-results?query=${encodeURIComponent(searchInput.trim())}`);
        }
    };

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
            init() { },
            render(options: { results: { hits: any[] } | null }) {
                if (options.results?.hits) {
                    // Фильтруем только товары в наличии
                    const inStockItems = options.results.hits.filter(
                        item => item.stock_status === 'instock'
                    );
                    setResults(inStockItems as AlgoliaHit[]);
                    setIsLoading(false);
                }
            },
            dispose() {
                setResults([]);
            }
        } as const;

        search.addWidgets([
            configure({
                hitsPerPage: 100,
                query: searchQuery
            }),
            customWidget
        ]);

        search.start();

        return () => {
            search.dispose();
        };
    }, [searchQuery]);

    return (
        <div className="shop_page">
            <div className="shop_page_wrapper">
                <div className="products_side">
                    <form
                        onSubmit={handleSearch}
                        style={{
                            display: 'flex',
                            gap: '12px',
                            marginBottom: '20px',
                            width: '100%'
                        }}
                    >
                        <input
                            type="text"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            placeholder="Введите поисковый запрос"
                            style={{
                                padding: '12px 16px',
                                fontSize: '16px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                flex: '1',
                                minWidth: 0 // Это позволит инпуту сжиматься
                            }}
                        />
                        <button
                            type="submit"
                            style={{
                                padding: '12px 24px',
                                fontSize: '16px',
                                backgroundColor: 'rgb(255 121 0)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap' // Предотвращает перенос текста кнопки
                            }}
                        >
                            Поиск
                        </button>
                    </form>

                    <h1 className="shop_page_title">
                        {searchQuery
                            ? `Результаты поиска по запросу "${searchQuery}"`
                            : 'Поиск товаров'
                        }
                    </h1>

                    {!searchQuery ? (
                        <div>Пожалуйста, введите поисковый запрос</div>
                    ) : isLoading ? (
                        <div className="text-center py-8">Загрузка...</div>
                    ) : results.length === 0 ? (
                        <div className="py-8">По вашему запросу товаров в наличии не найдено</div>
                    ) : (
                        <>
                            <h2 style={{ marginBottom: '15px' }}>
                                Найдено товаров в наличии: {results.length}
                            </h2>
                            <div className="shop_page_prod_grid">
                                {results.map((hit) => (
                                    <div className="product_item" key={hit.objectID}>
                                        <Link href={`${hit.url?.replace("nuxt.vitaline.uz", "vitaline-trade.com")}`}>
                                            {hit.thumbnail_url && (
                                                <Image
                                                    className="product_item__image"
                                                    src={hit.thumbnail_url}
                                                    alt={hit.name}
                                                    width={300}
                                                    height={300}
                                                />
                                            )}
                                        </Link>
                                        <div className="product_meta_box">
                                            <div className="line_highlight"></div>
                                            <Link
                                                href={`${hit.url?.replace("nuxt.vitaline.uz", "vitaline-trade.com")}`}
                                                className="product_item__name"
                                            >
                                                {hit.name}
                                            </Link>
                                            {hit.sku && (
                                                <span className="product_item__sku">
                                                    Артикул: {hit.sku}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}