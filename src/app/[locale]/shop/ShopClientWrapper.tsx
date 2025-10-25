// // src/app/shop/ShopClientWrapper.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { ProductGrid } from './ProductGrid';
// import { Pagination } from './Pagination';
// import { useRouter, useSearchParams } from 'next/navigation';

// interface ShopClientWrapperProps {
//     initialProducts: any[];
//     initialTotal: number;
//     initialTotalPages: number;
//     currentPage: number;
//     perPage: number;
//     showStock: boolean;
// }

// export function ShopClientWrapper({
//     initialProducts,
//     initialTotal,
//     initialTotalPages,
//     currentPage,
//     perPage,
//     showStock
// }: ShopClientWrapperProps) {
//     const [products, setProducts] = useState(initialProducts);
//     const [isLoadingMore, setIsLoadingMore] = useState(false);
//     const [currentLoadedPage, setCurrentLoadedPage] = useState(currentPage);
//     const searchParams = useSearchParams();
//     const router = useRouter();

//     const [isLoadMore, setIsLoadMore] = useState(false);

//     // Сброс состояния при изменении страницы через пагинацию, но не при "Load More"
//     useEffect(() => {
//         if (!isLoadMore) {
//             setProducts(initialProducts);
//             setCurrentLoadedPage(currentPage);
//         }
//         setIsLoadMore(false);
//     }, [searchParams.get('page'), initialProducts]);

//     const loadMore = async () => {
//         setIsLoadingMore(true);
//         setIsLoadMore(true); // Устанавливаем флаг, что это загрузка через "Load More"
//         try {
//             const nextPage = currentLoadedPage + 1;
//             const queryParams = new URLSearchParams(searchParams.toString());
//             queryParams.set('page', nextPage.toString());

//             const response = await fetch(`/api/products?${queryParams.toString()}`);
//             const data = await response.json();

//             if (data.products) {
//                 setProducts([...products, ...data.products]);
//                 setCurrentLoadedPage(nextPage);

//                 // Обновляем URL без перезагрузки страницы
//                 router.push(`/shop?page=${nextPage}`, { scroll: false });
//             }
//         } catch (error) {
//             console.error('Error loading more products:', error);
//         }
//         setIsLoadingMore(false);
//     };

//     return (
//         <>
//             <h2 style={{ marginBottom: '15px' }}>
//                 Отображено {(currentPage - 1) * perPage + 1}–
//                 {Math.min((currentLoadedPage) * perPage, initialTotal)} из {initialTotal}
//             </h2>

//             <ProductGrid products={products} showStock={showStock} />

//             <div className="shop_actions">
//                 {/* Кнопка "Загрузить еще" */}
//                 {currentLoadedPage < initialTotalPages && (
//                     <div className="load_more_container">
//                         <button
//                             onClick={loadMore}
//                             disabled={isLoadingMore}
//                             className="load_more_button"
//                         >
//                             {isLoadingMore ? 'Загрузка...' : 'Загрузить еще'}
//                         </button>
//                     </div>
//                 )}

//                 {/* Пагинация */}
//                 <div className="pagination_controls">
//                     {initialTotalPages > 1 && (
//                         <Pagination
//                             currentPage={currentPage}
//                             totalPages={initialTotalPages}
//                         />
//                     )}
//                 </div>
//             </div>
//         </>
//     );
// }





// src/app/shop/ShopClientWrapper.tsx
'use client';

import { useState, useEffect } from 'react';
import { ProductGrid } from './ProductGrid';
import { Pagination } from './Pagination';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface ShopClientWrapperProps {
    initialProducts: any[];
    initialTotal: number;
    initialTotalPages: number;
    currentPage: number;
    perPage: number;
    showStock: boolean;
}

export function ShopClientWrapper({
    initialProducts,
    initialTotal,
    initialTotalPages,
    currentPage,
    perPage,
    showStock
}: ShopClientWrapperProps) {
    const [products, setProducts] = useState(initialProducts);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [currentLoadedPage, setCurrentLoadedPage] = useState(currentPage);
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [isLoadMore, setIsLoadMore] = useState(false);

    const t = useTranslations('shop');

    // Сброс состояния при изменении страницы через пагинацию, но не при "Load More"
    useEffect(() => {
        if (!isLoadMore) {
            setProducts(initialProducts);
            setCurrentLoadedPage(currentPage);
        }
        setIsLoadMore(false);
    }, [searchParams.get('page'), initialProducts]);

    const loadMore = async () => {
        setIsLoadingMore(true);
        setIsLoadMore(true); // Устанавливаем флаг, что это загрузка через "Load More"
        try {
            const nextPage = currentLoadedPage + 1;
            const queryParams = new URLSearchParams(searchParams.toString());
            queryParams.set('page', nextPage.toString());

            const response = await fetch(`/api/products?${queryParams.toString()}`);
            const data = await response.json();

            if (data.products) {
                setProducts([...products, ...data.products]);
                setCurrentLoadedPage(nextPage);

                // Обновляем URL без перезагрузки страницы
                router.push(`${pathname}?page=${nextPage}`, { scroll: false });
            }
        } catch (error) {
            console.error('Error loading more products:', error);
        }
        setIsLoadingMore(false);
    };

    const from = (currentPage - 1) * perPage + 1;
    const to = Math.min((currentLoadedPage) * perPage, initialTotal);

    return (
        <>
            <h2 style={{ marginBottom: '15px' }}>
                {t('displayed', { from, to, total: initialTotal })}
            </h2>

            <ProductGrid products={products} showStock={showStock} />

            <div className="shop_actions">
                {/* Кнопка "Загрузить еще" */}
                {currentLoadedPage < initialTotalPages && (
                    <div className="load_more_container">
                        <button
                            onClick={loadMore}
                            disabled={isLoadingMore}
                            className="load_more_button hover:bg-[#ebebeb] bg-[#ebebeb] text-black"
                        >
                            {isLoadingMore ? t('loading') : t('loadMore')}
                        </button>
                    </div>
                )}

                {/* Пагинация */}
                <div className="pagination_controls">
                    {initialTotalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={initialTotalPages}
                        />
                    )}
                </div>
            </div>
        </>
    );
}