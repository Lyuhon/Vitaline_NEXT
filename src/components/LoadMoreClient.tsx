// // src/components/LoadMoreClient.tsx
// "use client";

// import { useState } from 'react';
// import { ProductNode } from '@/lib/fetchProductsByCategory';
// import Link from 'next/link'

// import AddToCartButtonInList from '@/components/add_to_cart_popup/AddToCartButtonInList';
// import { MiniCartProvider } from '@/app/context/MiniCartContext';

// interface LoadMoreClientProps {
//     initialProducts: ProductNode[];
//     initialEndCursor?: string;
//     initialHasNextPage: boolean;
//     category: string;
// }

// export default function LoadMoreClient({ initialProducts, initialEndCursor, initialHasNextPage, category }: LoadMoreClientProps) {
//     const [products, setProducts] = useState<ProductNode[]>(initialProducts);
//     const [endCursor, setEndCursor] = useState<string | undefined>(initialEndCursor);
//     const [hasNextPage, setHasNextPage] = useState(initialHasNextPage);
//     const [loading, setLoading] = useState(false);

//     const formatPrice = (price?: string): string => {
//         if (!price) return 'Цена не указана';
//         const p = price.replace('&nbsp;', ' ').replace('UZS', 'сӯм');
//         return p;
//     };

//     const loadMore = async () => {
//         if (!hasNextPage) return;
//         setLoading(true);

//         // Запросим новые товары через GraphQL
//         // Можно сделать через API route или напрямую:
//         const query = `
//       query ProductsByCategory($category: String!, $after: String, $first: Int = 8) {
//         products(first: $first, after: $after, where: { category: $category, stockStatus: IN_STOCK }) {
//           pageInfo {
//             hasNextPage
//             endCursor
//           }
//           nodes {
//             id
//             name
//             slug
//             image {
//               sourceUrl
//               altText
//             }
//             ... on SimpleProduct {
//               price
//               convertedPrice
//               brands {
//                 nodes {
//                   id
//                   name
//                   slug
//                   brandId
//                 }
//               }
//             }
//           }
//         }
//       }
//     `;
//         const res = await fetch('https://nuxt.vitaline.uz/graphql', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ query, variables: { category, after: endCursor } })
//         });
//         const json = await res.json();
//         const newNodes: ProductNode[] = json.data.products.nodes;
//         const newEndCursor = json.data.products.pageInfo.endCursor;
//         const newHasNextPage = json.data.products.pageInfo.hasNextPage;

//         setProducts(prev => [...prev, ...newNodes]);
//         setEndCursor(newEndCursor);
//         setHasNextPage(newHasNextPage);
//         setLoading(false);
//     };

//     return (
//         <>
//             {products.map((p) => (
//                 <div className="product_item" key={p.id}>
//                     <Link href={`/product/${p.slug}`}>
//                         <img
//                             className="product_item__image"
//                             src={p.image?.sourceUrl || '/images/products/default.jpg'}
//                             alt={p.image?.altText || p.name}
//                         />
//                     </Link>

//                     <div className="product_meta_box">
//                         <Link href="#" className="product_item__brand"></Link>
//                         <div className="line_highlight"></div>

//                         <Link href={`/product/${p.slug}`} className="product_item__name">
//                             {p.name}
//                         </Link>

//                         <span className="product_item__price">
//                             {/* {formatPrice(p.price)} */}
//                             {formatPrice(p.convertedPrice)}

//                         </span>
//                     </div>

//                     {/* <button className="product_item__add_to_cart">
//                         Добавить в корзину
//                     </button> */}
//                     <MiniCartProvider>

//                         <AddToCartButtonInList
//                             productId={p.id}
//                             productName={p.name}
//                             productImage={p.image?.sourceUrl ?? '/images/products/default.jpg'}
//                             productPrice={p.convertedPrice}
//                         // maxQuantity={p.stockQuantity || 0}
//                         />

//                     </MiniCartProvider>
//                 </div>
//             ))}

//             {hasNextPage && (
//                 <div style={{ marginTop: '20px' }}>
//                     <button onClick={loadMore} disabled={loading}>
//                         {loading ? 'Загрузка...' : 'Загрузить еще'}
//                     </button>
//                 </div>
//             )}
//         </>
//     );

// }


// src/components/LoadMoreClient.tsx
"use client";

import { useState } from 'react';
import { ProductNode } from '@/lib/fetchProductsByCategory';
import Link from 'next/link';

import AddToCartButtonInList from '@/components/add_to_cart_popup/AddToCartButtonInList';
import { MiniCartProvider } from '@/app/context/MiniCartContext';

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
        const p = price.replace('&nbsp;', ' ').replace('UZS', 'сӯм');
        return p;
    };

    const loadMore = async () => {
        if (!hasNextPage) return;
        setLoading(true);

        // Запросим новые товары через GraphQL
        const query = `
          query ProductsByCategory($category: String!, $after: String, $first: Int = 8) {
            products(first: $first, after: $after, where: { category: $category, stockStatus: IN_STOCK }) {
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
                  convertedPrice
                  stockStatus
                  brands {
                    nodes {
                      id
                      name
                      slug
                      brandId
                    }
                  }
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
            {products.map((p) => {
                // Парсим цену с поддержкой десятичных знаков
                const numericPrice = p.convertedPrice ? parseFloat(p.convertedPrice.replace(/[^\d.]/g, '')) / 1 : 0;

                // Определяем наличие товара
                const inStock = p.stockStatus === 'IN_STOCK';

                return (
                    <div className="product_item" key={p.id}>
                        <Link href={`/product/${p.slug}`}>
                            <img
                                className="product_item__image"
                                src={p.image?.sourceUrl || '/images/products/default.jpg'}
                                alt={p.image?.altText || p.name}
                            />
                        </Link>

                        <div className="product_meta_box">
                            {/* Добавьте ссылку на бренд, если она есть */}
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

                            <span className="product_item__price">
                                {numericPrice.toFixed(2)} $
                            </span>
                        </div>

                        <MiniCartProvider>
                            <AddToCartButtonInList
                                productId={p.id}
                                productName={p.name}
                                productImage={p.image?.sourceUrl ?? '/images/products/default.jpg'}
                                productPrice={numericPrice} // Передаем числовое значение цены
                                maxQuantity={p.stockQuantity || 0}
                                stock={inStock}
                            />
                        </MiniCartProvider>
                    </div>
                );
            })}

            {hasNextPage && (
                <div style={{ marginTop: '20px' }}>
                    <button className='load_mmmore' onClick={loadMore} disabled={loading}>
                        {loading ? 'Загрузка...' : 'Загрузить еще'}
                    </button>
                </div>
            )}
        </>
    );
}
