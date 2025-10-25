// // // src/app/search-results/ClientSearchResults.tsx
// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { liteClient as algoliasearch } from 'algoliasearch/lite';
// import instantsearch from 'instantsearch.js';
// import { configure } from 'instantsearch.js/es/widgets';
// import Link from 'next/link';
// import Image from 'next/image';
// import '../shop/shop.css';
// import AddToCartButtonInList from '@/components/add_to_cart_popup/AddToCartButtonInList';
// import { MiniCartProvider } from '@/app/[locale]/context/MiniCartContext';

// interface AlgoliaHit {
//     objectID: string;
//     name: string;
//     sku?: string;
//     url?: string;
//     thumbnail_url?: string;
//     image_url: string;
//     categories?: string[];
//     stock_status?: string;
//     usd_price?: string;
//     stock_quantity?: number;
//     brands?: Array<{
//         name: string;
//         slug: string;
//     }>;
// }

// interface SearchParamsProps {
//     [key: string]: string | string[] | undefined;
// }

// const encodeProductId = (id: string | number): string => {
//     return Buffer.from(`post:${id}`).toString('base64');
// };

// const parsePrice = (price: string): number => {
//     if (!price) return 0;
//     const cleanedPrice = price.replace(/[^\d.]/g, '');
//     const num = parseFloat(cleanedPrice);
//     return isNaN(num) ? 0 : num;
// };

// export default function ClientSearchResults({
//     searchParams: initialSearchParams,
//     userType
// }: {
//     searchParams: SearchParamsProps;
//     userType: string | null
// }) {
//     const router = useRouter();
//     const searchParams = useSearchParams(); // Используем useSearchParams для доступа к params из URL
//     const [results, setResults] = useState<AlgoliaHit[]>([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [searchInput, setSearchInput] = useState('');

//     // Получаем поисковый запрос из URL параметров
//     const searchQuery = searchParams.get('query') || (
//         typeof initialSearchParams['query'] === 'string'
//             ? initialSearchParams['query']
//             : Array.isArray(initialSearchParams['query'])
//                 ? initialSearchParams['query'][0]
//                 : ''
//     );

//     useEffect(() => {
//         console.log('Client side - Search Query:', searchQuery);
//         console.log('Client side - User Type:', userType);
//         setSearchInput(searchQuery);
//     }, [searchQuery]);

//     const handleSearch = (e: React.FormEvent) => {
//         e.preventDefault();
//         if (searchInput.trim()) {
//             router.push(`/search-results?query=${encodeURIComponent(searchInput.trim())}`);
//         }
//     };

//     useEffect(() => {
//         if (!searchQuery) {
//             setIsLoading(false);
//             return;
//         }

//         try {
//             const searchClient = algoliasearch(
//                 'TJRO96P4LZ',
//                 'e9cd85a57dcba249ac8ca48023342b99'
//             );

//             // Выбираем индекс на основе userType
//             const indexName = userType === 'restricted' ? 'vt_trade_cuted_' : 'vt_trade_';
//             console.log(`Using Algolia index: ${indexName} for user type: ${userType || 'default'}`);

//             const search = instantsearch({
//                 indexName,
//                 searchClient,
//             });

//             const customWidget = {
//                 $$type: 'custom.results' as const,
//                 init() { },
//                 render(options: { results: { hits: any[] } | null }) {
//                     if (options.results?.hits) {
//                         const inStockItems = options.results.hits.filter(
//                             item => item.stock_status === 'instock'
//                         );
//                         console.log('Found items in stock:', inStockItems.length);
//                         setResults(inStockItems as AlgoliaHit[]);
//                         setIsLoading(false);
//                     } else {
//                         console.log('No hits found in Algolia response');
//                         setResults([]);
//                         setIsLoading(false);
//                     }
//                 },
//                 dispose() {
//                     setResults([]);
//                 }
//             } as const;

//             search.addWidgets([
//                 configure({
//                     hitsPerPage: 100,
//                     query: searchQuery
//                 }),
//                 customWidget
//             ]);

//             search.start();

//             return () => {
//                 search.dispose();
//             };
//         } catch (error) {
//             console.error('Error initializing Algolia search:', error);
//             setIsLoading(false);
//             setResults([]);
//         }
//     }, [searchQuery, userType]);

//     return (
//         <MiniCartProvider>
//             <div className="shop_page">
//                 <div className="shop_page_wrapper">
//                     <div className="products_side">
//                         <form
//                             onSubmit={handleSearch}
//                             style={{
//                                 display: 'flex',
//                                 gap: '12px',
//                                 marginBottom: '20px',
//                                 width: '100%'
//                             }}
//                         >
//                             <input
//                                 type="text"
//                                 value={searchInput}
//                                 onChange={(e) => setSearchInput(e.target.value)}
//                                 placeholder="Введите поисковый запрос"
//                                 style={{
//                                     padding: '12px 16px',
//                                     fontSize: '16px',
//                                     border: '1px solid #ddd',
//                                     borderRadius: '4px',
//                                     flex: '1',
//                                     minWidth: 0
//                                 }}
//                             />
//                             <button
//                                 type="submit"
//                                 style={{
//                                     padding: '12px 24px',
//                                     fontSize: '16px',
//                                     backgroundColor: 'rgb(255 121 0)',
//                                     color: 'white',
//                                     border: 'none',
//                                     borderRadius: '4px',
//                                     cursor: 'pointer',
//                                     whiteSpace: 'nowrap'
//                                 }}
//                             >
//                                 Поиск
//                             </button>
//                         </form>

//                         <h1 className="shop_page_title">
//                             {searchQuery
//                                 ? `Результаты поиска по запросу "${searchQuery}"`
//                                 : 'Поиск товаров'}
//                         </h1>

//                         {!searchQuery ? (
//                             <div>Пожалуйста, введите поисковый запрос</div>
//                         ) : isLoading ? (
//                             <div className="text-center py-8">Загрузка...</div>
//                         ) : results.length === 0 ? (
//                             <div className="py-8">По вашему запросу товаров в наличии не найдено</div>
//                         ) : (
//                             <>
//                                 <h2 style={{ marginBottom: '15px' }}>
//                                     Найдено товаров в наличии: {results.length}
//                                 </h2>
//                                 <div className="shop_page_prod_grid">
//                                     {results.map((hit) => {
//                                         const numericPrice = hit.usd_price ? parsePrice(hit.usd_price) : 0;
//                                         const inStock = hit.stock_status === 'instock';

//                                         return (
//                                             <div className="product_item" key={hit.objectID}>
//                                                 <Link href={hit.url ? `${hit.url.replace("nuxt.vitaline.uz", "vitaline-trade.com")}` : '#'}>
//                                                     {hit.image_url && (
//                                                         <Image
//                                                             className="product_item__image"
//                                                             src={hit.image_url}
//                                                             alt={hit.name}
//                                                             width={300}
//                                                             height={300}
//                                                         />
//                                                     )}
//                                                 </Link>

//                                                 <div className="product_meta_box">
//                                                     {hit.brands && hit.brands.length > 0 && (
//                                                         <Link
//                                                             href={`/product-brands/${hit.brands[0].slug}`}
//                                                             className="product_item__brand"
//                                                         >
//                                                             {hit.brands[0].name}
//                                                         </Link>
//                                                     )}
//                                                     <div className="line_highlight"></div>
//                                                     <Link
//                                                         href={hit.url ? `${hit.url.replace("nuxt.vitaline.uz", "vitaline-trade.com")}` : '#'}
//                                                         className="product_item__name"
//                                                     >
//                                                         {hit.name}
//                                                     </Link>

//                                                     <span className="product_item__price">
//                                                         {hit.usd_price}
//                                                     </span>
//                                                 </div>

//                                                 <AddToCartButtonInList
//                                                     productId={encodeProductId(hit.objectID)}
//                                                     productName={hit.name}
//                                                     productImage={hit.image_url}
//                                                     productPrice={numericPrice}
//                                                     maxQuantity={hit.stock_quantity || 1}
//                                                     stock={inStock}
//                                                 />
//                                             </div>
//                                         );
//                                     })}
//                                 </div>
//                             </>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </MiniCartProvider>
//     );
// }




// src/app/[locale]/search-results/ClientSearchResults.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js';
import { configure } from 'instantsearch.js/es/widgets';
import Link from 'next/link';
import Image from 'next/image';
import '../shop/shop.css';
import AddToCartButtonInList from '@/components/add_to_cart_popup/AddToCartButtonInList';
import { MiniCartProvider } from '@/app/[locale]/context/MiniCartContext';
import { useTranslations } from 'next-intl';

interface AlgoliaHit {
    objectID: string;
    name: string;
    sku?: string;
    url?: string;
    thumbnail_url?: string;
    image_url: string;
    categories?: string[];
    stock_status?: string;
    usd_price?: string;
    stock_quantity?: number;
    brands?: Array<{
        name: string;
        slug: string;
    }>;
}

interface SearchParamsProps {
    [key: string]: string | string[] | undefined;
}

const encodeProductId = (id: string | number): string => {
    return Buffer.from(`post:${id}`).toString('base64');
};

const parsePrice = (price: string): number => {
    if (!price) return 0;
    const cleanedPrice = price.replace(/[^\d.]/g, '');
    const num = parseFloat(cleanedPrice);
    return isNaN(num) ? 0 : num;
};

export default function ClientSearchResults({
    searchParams: initialSearchParams,
    userType,
    locale
}: {
    searchParams: SearchParamsProps;
    userType: string | null;
    locale: string;
}) {
    const t = useTranslations('search');
    const router = useRouter();
    const searchParams = useSearchParams();
    const [results, setResults] = useState<AlgoliaHit[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchInput, setSearchInput] = useState('');

    // Получаем поисковый запрос из URL параметров
    const searchQuery = searchParams.get('query') || (
        typeof initialSearchParams['query'] === 'string'
            ? initialSearchParams['query']
            : Array.isArray(initialSearchParams['query'])
                ? initialSearchParams['query'][0]
                : ''
    );

    useEffect(() => {
        console.log('Client side - Search Query:', searchQuery);
        console.log('Client side - User Type:', userType);
        setSearchInput(searchQuery);
    }, [searchQuery]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchInput.trim()) {
            router.push(`/${locale}/search-results?query=${encodeURIComponent(searchInput.trim())}`);
        }
    };

    useEffect(() => {
        if (!searchQuery) {
            setIsLoading(false);
            return;
        }

        try {
            const searchClient = algoliasearch(
                'TJRO96P4LZ',
                'e9cd85a57dcba249ac8ca48023342b99'
            );

            // Выбираем индекс на основе userType
            const indexName = userType === 'restricted' ? 'vt_trade_cuted_' : 'vt_trade_';
            console.log(`Using Algolia index: ${indexName} for user type: ${userType || 'default'}`);

            const search = instantsearch({
                indexName,
                searchClient,
            });

            const customWidget = {
                $$type: 'custom.results' as const,
                init() { },
                render(options: { results: { hits: any[] } | null }) {
                    if (options.results?.hits) {
                        const inStockItems = options.results.hits.filter(
                            item => item.stock_status === 'instock'
                        );
                        console.log('Found items in stock:', inStockItems.length);
                        setResults(inStockItems as AlgoliaHit[]);
                        setIsLoading(false);
                    } else {
                        console.log('No hits found in Algolia response');
                        setResults([]);
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
        } catch (error) {
            console.error('Error initializing Algolia search:', error);
            setIsLoading(false);
            setResults([]);
        }
    }, [searchQuery, userType]);

    return (
        <MiniCartProvider>
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
                                placeholder={t('searchPlaceholder')}
                                style={{
                                    padding: '12px 16px',
                                    fontSize: '16px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    flex: '1',
                                    minWidth: 0
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
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {t('searchButton')}
                            </button>
                        </form>

                        <h1 className="shop_page_title">
                            {searchQuery
                                ? t('resultsFor', { query: searchQuery })
                                : t('searchProducts')}
                        </h1>

                        {!searchQuery ? (
                            <div>{t('enterQuery')}</div>
                        ) : isLoading ? (
                            <div className="text-center py-8">{t('loading')}</div>
                        ) : results.length === 0 ? (
                            <div className="py-8">{t('noResults')}</div>
                        ) : (
                            <>
                                <h2 style={{ marginBottom: '15px' }}>
                                    {t('foundProducts', { count: results.length })}
                                </h2>
                                <div className="shop_page_prod_grid">
                                    {results.map((hit) => {
                                        const numericPrice = hit.usd_price ? parsePrice(hit.usd_price) : 0;
                                        const inStock = hit.stock_status === 'instock';

                                        return (
                                            <div className="product_item" key={hit.objectID}>
                                                <Link href={hit.url ? `${hit.url.replace("nuxt.vitaline.uz", "vitaline-trade.com")}` : '#'}>
                                                    {hit.image_url && (
                                                        <Image
                                                            className="product_item__image"
                                                            src={hit.image_url}
                                                            alt={hit.name}
                                                            width={300}
                                                            height={300}
                                                        />
                                                    )}
                                                </Link>

                                                <div className="product_meta_box">
                                                    {hit.brands && hit.brands.length > 0 && (
                                                        <Link
                                                            href={`/${locale}/product-brands/${hit.brands[0].slug}`}
                                                            className="product_item__brand"
                                                        >
                                                            {hit.brands[0].name}
                                                        </Link>
                                                    )}
                                                    <div className="line_highlight"></div>
                                                    <Link
                                                        href={hit.url ? `${hit.url.replace("nuxt.vitaline.uz", "vitaline-trade.com")}` : '#'}
                                                        className="product_item__name"
                                                    >
                                                        {hit.name}
                                                    </Link>

                                                    <span className="product_item__price">
                                                        {hit.usd_price}
                                                    </span>
                                                </div>

                                                <AddToCartButtonInList
                                                    productId={encodeProductId(hit.objectID)}
                                                    productName={hit.name}
                                                    productImage={hit.image_url}
                                                    productPrice={numericPrice}
                                                    maxQuantity={hit.stock_quantity || 1}
                                                    stock={inStock}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </MiniCartProvider>
    );
}