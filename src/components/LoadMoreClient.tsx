// src/components/LoadMoreClient.tsx
"use client";

import { useState } from 'react';
import { ProductNode } from '@/lib/fetchProductsByCategory';

interface LoadMoreClientProps {
    initialProducts: ProductNode[];
    initialEndCursor?: string;
    initialHasNextPage: boolean;
    category: string;
}

export default function LoadMoreClient({ initialProducts, initialEndCursor, initialHasNextPage, category }: LoadMoreClientProps) {
    const [products, setProducts] = useState<ProductNode[]>(initialProducts);
    const [endCursor, setEndCursor] = useState<string | undefined>(initialEndCursor);
    const [hasNextPage, setHasNextPage] = useState(initialHasNextPage);
    const [loading, setLoading] = useState(false);

    const formatPrice = (price?: string): string => {
        if (!price) return 'Цена не указана';
        let p = price.replace('&nbsp;', ' ').replace('UZS', 'сӯм');
        return p;
    };

    const loadMore = async () => {
        if (!hasNextPage) return;
        setLoading(true);

        // Запросим новые товары через GraphQL
        // Можно сделать через API route или напрямую:
        const query = `
      query ProductsByCategory($category: String!, $after: String, $first: Int = 8) {
        products(first: $first, after: $after, where: { category: $category }) {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            id
            name
            slug
            image {
              sourceUrl
              altText
            }
            ... on SimpleProduct {
              price
            }
          }
        }
      }
    `;
        const res = await fetch('https://nuxt.vitaline.uz/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables: { category, after: endCursor } })
        });
        const json = await res.json();
        const newNodes: ProductNode[] = json.data.products.nodes;
        const newEndCursor = json.data.products.pageInfo.endCursor;
        const newHasNextPage = json.data.products.pageInfo.hasNextPage;

        setProducts(prev => [...prev, ...newNodes]);
        setEndCursor(newEndCursor);
        setHasNextPage(newHasNextPage);
        setLoading(false);
    };

    return (
        <>
            {products.map((p) => (
                <div className="product_item" key={p.id}>
                    <a href={`/product/${p.slug}`}>
                        <img
                            className="product_item__image"
                            src={p.image?.sourceUrl || '/images/products/default.jpg'}
                            alt={p.image?.altText || p.name}
                        />
                    </a>

                    <div className="product_meta_box">
                        <a href="#" className="product_item__brand"></a>
                        <div className="line_highlight"></div>

                        <a href={`/product/${p.slug}`} className="product_item__name">
                            {p.name}
                        </a>

                        <span className="product_item__price">
                            {formatPrice(p.price)}
                        </span>
                    </div>

                    <button className="product_item__add_to_cart">
                        Добавить в корзину
                    </button>
                </div>
            ))}

            {hasNextPage && (
                <div style={{ marginTop: '20px' }}>
                    <button onClick={loadMore} disabled={loading}>
                        {loading ? 'Загрузка...' : 'Загрузить еще'}
                    </button>
                </div>
            )}
        </>
    );
}
