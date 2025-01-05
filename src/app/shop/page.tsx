// src/app/shop/page.tsx

import { fetchProductsForCatalog } from '@/lib/fetchProductsForCatalog';
import { fetchProductTags } from '@/lib/fetchProductTags';
import Link from 'next/link';
import Image from 'next/image';
import './shop.css';

type ProductTagNode = {
    name: string;
    slug: string;
};

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

// Устанавливаем типы для `searchParams`, поддерживающие асинхронность
interface ShopPageProps {
    searchParams: Promise<Record<string, string | undefined>>;
}

// export const dynamic = 'force-static';
export const dynamic = 'force-dynamic';

export const generateMetadata = () => {
    return {
        title: 'Каталог товаров - Vitaline',
        description: 'Оптовый каталог товаров Американских витаминов.',
    };
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
    // Ждём асинхронный объект searchParams
    const params = await searchParams;
    const tag = params.tag;     // например, ?tag=some-slug
    const after = params.after; // например, ?after=abc123...

    // Загружаем теги и данные о продуктах
    // Обратите внимание, что во второй аргумент передаём tag (если используем фильтрацию на бекенде)
    const [tags, productsData] = await Promise.all([
        fetchProductTags(),
        fetchProductsForCatalog(after), // tag не передаём
    ]);


    const products = productsData.nodes;
    const { hasNextPage, endCursor } = productsData.pageInfo;

    return (
        <div className="shop_page">
            <div className="shop_page_wrapper">

                {/* Сайдбар с тегами */}
                <div className="category_filter_side">
                    <div className="tag_filt_list">
                        <div className="tags-checkbox-list">
                            {tags.map((t: ProductTagNode) => {
                                const isSelected = tag === t.slug;

                                // Соберём новый URL c учётом фильтра
                                // Если кликнули на тег, то в query ставим ?tag=...
                                const queryString = new URLSearchParams();
                                if (t.slug) {
                                    queryString.set('tag', t.slug);
                                }

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

                {/* Список товаров */}
                <div className="products_side">
                    <h1 className="shop_page_title">Каталог товаров</h1>
                    {/* <h2>
                        Товаров на странице: <b>{products.length}</b>
                    </h2> */}

                    <div className="shop_page_prod_grid">
                        {products.map((p: ProductNode) => {
                            let formattedPrice = p.price ? p.price : 'Цена не указана';
                            if (formattedPrice !== 'Цена не указана') {
                                formattedPrice = formattedPrice.replace(/\u00A0/g, ' ').replace('UZS', 'сӯм');
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
                                        <span className="product_item__price">{p.convertedPrice}</span>
                                    </div>

                                    <button className="product_item__add_to_cart">В корзину</button>
                                </div>
                            );
                        })}
                    </div>

                    {/* Блок пагинации: кнопка "Следующие товары" (если есть hasNextPage) */}
                    <div className="pagination_controls">
                        {hasNextPage && (
                            <PaginationButtonAfter
                                params={params}
                                endCursor={endCursor}
                                label="Показать ещё"
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Дополнительный маленький компонент кнопки/ссылки на следующую страницу
function PaginationButtonAfter({
    params,
    endCursor,
    label,
}: {
    params: Record<string, string | undefined>;
    endCursor?: string;
    label?: string;
}) {
    // Если endCursor нет, не показываем кнопку
    if (!endCursor) return null;

    // Фильтруем undefined, чтобы TS не ругался
    const filteredParams = Object.entries(params)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => [key, value as string]);

    // Теперь создаём URLSearchParams
    const nextPageParams = new URLSearchParams(filteredParams);

    // Перезаписываем параметр `after`
    nextPageParams.set('after', endCursor);

    const nextPageHref = `/shop?${nextPageParams.toString()}`;

    return (
        <a href={nextPageHref} className="next_page_button">
            {label || 'Показать ещё'}
        </a>
    );
}





// // src/app/shop/page.tsx
// import { fetchProductsForCatalog } from '@/lib/fetchProductsForCatalog';
// import { fetchProductTags } from '@/lib/fetchProductTags';
// import LoadMoreGrid from './LoadMoreGrid';  // <-- наш клиентский компонент
// import Link from 'next/link';
// import './shop.css';

// // Включаем ISR (по желанию):
// export const revalidate = 60; // Каждые 60 сек пересоздавать static

// export default async function ShopPage() {
//     // 1. Грузим теги и первую порцию товаров.
//     const [tags, productsData] = await Promise.all([
//         fetchProductTags(),
//         fetchProductsForCatalog(), // первая страница (последующие будут подгружать на клиенте)
//     ]);

//     // Разбиваем данные
//     const products = productsData.nodes;
//     const { hasNextPage, endCursor } = productsData.pageInfo;

//     return (
//         <div className="shop_page">
//             <div className="shop_page_wrapper">

//                 {/* Сайдбар с тегами */}
//                 <div className="category_filter_side">
//                     <div className="tag_filt_list">
//                         <div className="tags-checkbox-list">
//                             {tags.map((t) => {
//                                 const queryString = new URLSearchParams({ tag: t.slug });
//                                 const tagURL = `/shop?${queryString.toString()}`;

//                                 return (
//                                     <Link key={t.slug} href={tagURL}>
//                                         <label className="checkbox-label">
//                                             <input type="checkbox" readOnly />
//                                             {t.name}
//                                         </label>
//                                     </Link>
//                                 );
//                             })}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Подключаем клиентский компонент, которому передаём
//             первую порцию товаров и pageInfo. */}
//                 <LoadMoreGrid
//                     initialProducts={products}                   // товары
//                     initialPageInfo={{
//                         hasNextPage,
//                         endCursor,
//                     }}
//                 />
//             </div>
//         </div>
//     );
// }
