// // src/app/shop/page.tsx
// import { fetchProductsForCatalog } from '@/lib/fetchProductsForCatalog';
// import { fetchProductTags } from '@/lib/fetchProductTags';
// import Link from 'next/link';
// import './shop.css'
// // import { Metadata } from "next";

// type ProductTagNode = {
//     name: string;
//     slug: string;
// };

// type ProductNode = {
//     id: string;
//     name: string;
//     slug: string;
//     image?: {
//         sourceUrl?: string;
//         altText?: string;
//     };
//     price?: string;
// };

// // Функция для генерации метаданных
// // export async function generateMetadata(): Promise<Metadata> {
// //     return {
// //         title: "Магазин - Vitaline.uz",
// //         description: "Ознакомьтесь с нашим ассортиментом.",
// //     };
// // }

// // Можно оставить динамику или убрать
// export const dynamic = 'force-static';

// interface ShopPageProps {
//     searchParams?: {
//         tag?: string;
//         after?: string;
//     };
// }

// export default async function ShopPage({ searchParams }: ShopPageProps) {
//     const tag = searchParams?.tag;
//     const after = searchParams?.after;

//     const [tags, productsData] = await Promise.all([
//         fetchProductTags(),
//         fetchProductsForCatalog(tag)
//     ]);

//     const products = productsData.nodes;
//     const { hasNextPage, endCursor } = productsData.pageInfo;

//     return (
//         <div className="shop_page">
//             <div className="shop_page_wrapper">
//                 <div className="category_filter_side">
//                     <div className="tag_filt_list">
//                         <div className="tags-checkbox-list">
//                             {tags.map((t: ProductTagNode) => {
//                                 const isSelected = tag === t.slug;
//                                 const queryString = new URLSearchParams();
//                                 if (t.slug) queryString.set('tag', t.slug);

//                                 const tagURL = `/shop${queryString.toString() ? `?${queryString.toString()}` : ''}`;

//                                 return (
//                                     <Link key={t.slug} href={tagURL}>
//                                         <label className="checkbox-label">
//                                             <input
//                                                 type="checkbox"
//                                                 name="tags"
//                                                 value={t.name}
//                                                 readOnly
//                                                 checked={isSelected}
//                                             />
//                                             {t.name}
//                                         </label>
//                                     </Link>
//                                 );
//                             })}
//                         </div>
//                     </div>
//                 </div>

//                 <div className="products_side">
//                     <h1 className="shop_page_title">Каталог товаров</h1>
//                     <div className="shop_page_prod_grid">
//                         {products.map((p: ProductNode) => {
//                             let formattedPrice = p.price ? p.price : 'Цена не указана';
//                             if (formattedPrice !== 'Цена не указана') {
//                                 formattedPrice = formattedPrice.replace('&nbsp;', ' ').replace('UZS', 'сӯм');
//                             }

//                             return (
//                                 <div className="product_item" key={p.id}>
//                                     <Link href={`/product/${p.slug}`}>
//                                         <img
//                                             className="product_item__image"
//                                             src={p.image?.sourceUrl || '/images/products/default.jpg'}
//                                             alt={p.image?.altText || p.name}
//                                         />
//                                     </Link>

//                                     <div className="product_meta_box">
//                                         {/* Пока бренд пустой */}
//                                         <a href="#" className="product_item__brand"></a>
//                                         <div className="line_highlight"></div>

//                                         <Link href={`/product/${p.slug}`} className="product_item__name">
//                                             {p.name}
//                                         </Link>

//                                         <span className="product_item__price">{formattedPrice}</span>
//                                     </div>

//                                     <button className="product_item__add_to_cart">Добавить в корзину</button>
//                                 </div>
//                             );
//                         })}

//                         {/* Пагинация */}
//                         <div className="pagination_block" style={{ gridColumn: '1 / -1', marginTop: '20px', display: 'flex', gap: '10px' }}>
//                             {hasNextPage && endCursor && (() => {
//                                 const queryString = new URLSearchParams();
//                                 if (tag) queryString.set('tag', tag);
//                                 queryString.set('after', endCursor);

//                                 const nextURL = `/shop?${queryString.toString()}`;

//                                 return (
//                                     <Link href={nextURL} className="next_page_link">
//                                         Следующая страница →
//                                     </Link>
//                                 );
//                             })()}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }




import { fetchProductsForCatalog } from '@/lib/fetchProductsForCatalog';
import { fetchProductTags } from '@/lib/fetchProductTags';
import Link from 'next/link';
import './shop.css';

type ProductTagNode = {
    name: string;
    slug: string;
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
};

// Устанавливаем типы для `searchParams`, поддерживающие асинхронность
interface ShopPageProps {
    searchParams: Promise<Record<string, string | undefined>>;
}

export const dynamic = 'force-static';

export default async function ShopPage({ searchParams }: ShopPageProps) {
    const params = await searchParams; // Ждём асинхронный объект searchParams
    const tag = params.tag;
    const after = params.after;

    // Загружаем теги и данные о продуктах
    const [tags, productsData] = await Promise.all([
        fetchProductTags(),
        fetchProductsForCatalog(after) // Передаём только `after`
    ]);

    const products = productsData.nodes;
    const { hasNextPage, endCursor } = productsData.pageInfo;

    return (
        <div className="shop_page">
            <div className="shop_page_wrapper">
                <div className="category_filter_side">
                    <div className="tag_filt_list">
                        <div className="tags-checkbox-list">
                            {tags.map((t: ProductTagNode) => {
                                const isSelected = tag === t.slug;
                                const queryString = new URLSearchParams();
                                if (t.slug) queryString.set('tag', t.slug);

                                const tagURL = `/shop${queryString.toString() ? `?${queryString.toString()}` : ''}`;

                                return (
                                    <Link key={t.slug} href={tagURL}>
                                        <label className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                name="tags"
                                                value={t.name}
                                                readOnly
                                                checked={isSelected}
                                            />
                                            {t.name}
                                        </label>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="products_side">
                    <h1 className="shop_page_title">Каталог товаров</h1>
                    <div className="shop_page_prod_grid">
                        {products.map((p: ProductNode) => {
                            let formattedPrice = p.price ? p.price : 'Цена не указана';
                            if (formattedPrice !== 'Цена не указана') {
                                formattedPrice = formattedPrice.replace(/\u00A0/g, ' ').replace('UZS', 'сӯм');
                            }

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
                                        <a href="#" className="product_item__brand"></a>
                                        <div className="line_highlight"></div>

                                        <Link href={`/product/${p.slug}`} className="product_item__name">
                                            {p.name}
                                        </Link>

                                        <span className="product_item__price">{formattedPrice}</span>
                                    </div>

                                    <button className="product_item__add_to_cart">Добавить в корзину</button>
                                </div>
                            );
                        })}

                        {/* Пагинация */}
                        {hasNextPage && endCursor && (
                            <div
                                className="pagination_block"
                                style={{
                                    gridColumn: '1 / -1',
                                    marginTop: '20px',
                                    display: 'flex',
                                    gap: '10px',
                                }}
                            >
                                <Link
                                    href={`/shop?${new URLSearchParams({
                                        tag: tag || '',
                                        after: endCursor,
                                    }).toString()}`}
                                    className="next_page_link"
                                >
                                    Следующая страница →
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
