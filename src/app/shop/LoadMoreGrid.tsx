'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './shop.css';

// Типы, как у вас:
type Brand = {
    id: string;
    name: string;
    slug: string;
    brandId?: string;
};

type ProductNode = {
    id: string;
    name: string;
    slug: string;
    image?: {
        sourceUrl?: string;
        altText?: string;
    };
    price?: string;
    convertedPrice?: string;
    brands?: {
        nodes: Brand[];
    };
};

type PageInfo = {
    hasNextPage: boolean;
    endCursor?: string;
};

export default function LoadMoreGrid({
    initialProducts,
    initialPageInfo,
}: {
    initialProducts: ProductNode[];
    initialPageInfo: PageInfo;
}) {
    // Список товаров в состоянии
    const [products, setProducts] = useState<ProductNode[]>(initialProducts);
    // Инфа о пагинации (hasNextPage, endCursor) тоже в состоянии
    const [pageInfo, setPageInfo] = useState<PageInfo>(initialPageInfo);
    const [loading, setLoading] = useState(false);

    // Подгрузка следующей страницы
    async function handleLoadMore() {
        if (!pageInfo.hasNextPage || !pageInfo.endCursor) return;
        setLoading(true);

        try {
            // Стучимся на наш локальный эндпоинт
            const res = await fetch(`/api/shop/products?after=${pageInfo.endCursor}`);
            if (!res.ok) {
                throw new Error('Failed to load more products');
            }

            const data = await res.json() as {
                nodes: ProductNode[];
                pageInfo: PageInfo;
            };

            // Склеиваем новые товары со старыми
            // setProducts((prev) => [...prev, ...data.nodes]);
            setProducts((prev) => {
                // Склеиваем старые товары + новые
                const combined = [...prev, ...data.nodes];

                // Убираем дубли по `id`
                const unique = combined.filter(
                    (item, index, arr) => arr.findIndex((x) => x.id === item.id) === index
                );

                return unique;
            });


            // Обновляем pageInfo
            setPageInfo(data.pageInfo);
        } catch (err) {
            console.error('Error loading more products:', err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="products_side">
            <h1 className="shop_page_title">Каталог товаров</h1>
            <h2>
                Товаров на странице: <b>{products.length}</b>
            </h2>

            <div className="shop_page_prod_grid">
                {products.map((p) => {
                    let formattedPrice = p.price ? p.price : 'Цена не указана';
                    if (formattedPrice !== 'Цена не указана') {
                        formattedPrice = formattedPrice
                            .replace(/\u00A0/g, ' ')
                            .replace('UZS', 'сӯм');
                    }

                    return (
                        <div className="product_item" key={p.id}>
                            <Link href={`/product/${p.slug}`}>
                                <Image
                                    className="product_item__image"
                                    src={p.image?.sourceUrl || '/images/products/default.jpg'}
                                    alt={p.image?.altText || p.name}
                                    width={220}
                                    height={220}
                                />
                            </Link>

                            <div className="product_meta_box">
                                {p.brands && p.brands.nodes.length > 0 && (
                                    <Link
                                        href={`/product-brands/${p.brands.nodes[0].slug}`}
                                        className="product_item__brand"
                                    >
                                        {p.brands.nodes[0].name}
                                    </Link>
                                )}

                                <div className="line_highlight"></div>

                                <Link href={`/product/${p.slug}`} className="product_item__name">
                                    {p.name}
                                </Link>

                                {/* <span className="product_item__price">{formattedPrice}</span> */}
                                <span className="product_item__price">
                                    {p.convertedPrice}
                                </span>
                            </div>

                            <button className="product_item__add_to_cart">В корзину</button>
                        </div>
                    );
                })}
            </div>

            {/* Кнопка Показать ещё */}
            {pageInfo.hasNextPage && (
                <button
                    onClick={handleLoadMore}
                    disabled={loading}
                    className="next_page_button"
                >
                    {loading ? 'Загрузка...' : 'Показать ещё'}
                </button>
            )}
        </div>
    );
}
