// // app/brand/[slug]/page.tsx
// import Link from 'next/link';
// import { fetchBrandInfo, fetchBrandProducts } from '@/lib/brand/fetchBrandData';
// import '@/app/shop/shop.css';
// import './brands.css';


// // Описываем типы, если нужно
// interface BrandPageProps {
//     params: {
//         slug: string;
//     };
//     searchParams?: {
//         after?: string;
//     };
// }

// // 1. Функция generateMetadata - для динамического SEO
// export async function generateMetadata({ params }: BrandPageProps) {
//     const { slug } = params;
//     // Пытаемся получить данные о бренде (чтобы формировать title, description)
//     const brandInfo = await fetchBrandInfo(slug);

//     // Если бренд не найден, вернём какие-то дефолтные мета
//     if (!brandInfo) {
//         return {
//             title: 'Бренд не найден',
//             description: 'Указанного бренда не существует',
//         };
//     }

//     // Если бренд найден, выставляем заголовок = название бренда
//     // и description = 'Купить продукцию [brand name] в Ташкенте'
//     return {
//         title: brandInfo.name,
//         description: `Купить продукцию ${brandInfo.name} в Ташкенте`,
//     };
// }

// // 2. Основной компонент страницы
// export default async function BrandPage({ params, searchParams }: BrandPageProps) {
//     const { slug } = params;
//     const after = searchParams?.after || '';



//     // Получаем данные о бренде
//     const brandInfo = await fetchBrandInfo(slug);
//     // Получаем товары бренда
//     const productsData = await fetchBrandProducts(slug, after);

//     // Проверка на наличие данных
//     if (!brandInfo || !productsData) {
//         return (
//             <div className="shop_page">
//                 <div className="shop_page_wrapper">
//                     <h2>Бренд не найден</h2>
//                 </div>
//             </div>
//         );
//     }

//     const products = productsData.nodes || [];
//     const { hasNextPage, endCursor } = productsData.pageInfo || {};

//     // Форматирование цены
//     function formatPrice(price: string | undefined) {
//         if (!price) return 'Цена не указана';
//         return price.replace(/\u00A0/g, ' ').replace('UZS', 'сӯм');
//     }

//     return (
//         <div className="shop_page brands-page">
//             <div className="shop_page_wrapper">

//                 <div className="category_filter_side"></div>

//                 <div className="products_side">
//                     {/* Баннер бренда */}
//                     {brandInfo.brandBanner && (
//                         <div className="brand-banner" style={{ marginBottom: '20px' }}>
//                             <img
//                                 src={brandInfo.brandBanner}
//                                 alt={brandInfo.name}
//                                 style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
//                             />
//                         </div>
//                     )}

//                     {/* Название бренда */}
//                     <h1 className="shop_page_title">{brandInfo.name}</h1>


//                     {/* Описание бренда */}
//                     {brandInfo.description && (
//                         <div
//                             className="brand-description"
//                             style={{ marginTop: '10px', marginBottom: '20px' }}
//                             dangerouslySetInnerHTML={{ __html: brandInfo.description }}
//                         />
//                     )}

//                     {/* Вывод общего количества товаров (если запросили count) */}
//                     {typeof brandInfo.count === 'number' && (
//                         <p className='brandsCount' style={{ marginTop: '10px' }}>
//                             Всего товаров: <strong>{brandInfo.count}</strong>
//                         </p>
//                     )}


//                     {/* Сетка товаров (как на /shop) */}
//                     <div className="shop_page_prod_grid">
//                         {products.map((p: any) => {
//                             const formattedPrice = formatPrice(p.price);

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

//                                         <Link
//                                             href={`/product-brands/${p.brands.nodes[0].slug}`}
//                                             className="product_item__brand"
//                                         >
//                                             {p.brands.nodes[0].name}
//                                         </Link>

//                                         <div className="line_highlight"></div>
//                                         <Link href={`/product/${p.slug}`} className="product_item__name">
//                                             {p.name}
//                                         </Link>
//                                         <span className="product_item__price">{formattedPrice}</span>
//                                     </div>

//                                     <button className="product_item__add_to_cart">В корзину</button>
//                                 </div>
//                             );
//                         })}
//                     </div>

//                     {/* Пагинация */}
//                     {hasNextPage && endCursor && (
//                         <div
//                             className="pagination_block"
//                             style={{
//                                 gridColumn: '1 / -1',
//                                 marginTop: '20px',
//                                 display: 'flex',
//                                 gap: '10px',
//                             }}
//                         >
//                             <Link
//                                 href={`/brand/${slug}?after=${endCursor}`}
//                                 className="next_page_link"
//                             >
//                                 Следующая страница →
//                             </Link>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }


// // app/product-brands/[slug]/page.tsx

// import Link from 'next/link';
// import { fetchBrandInfo, fetchBrandProducts } from '@/lib/brand/fetchBrandData';
// import '@/app/shop/shop.css';
// import './brands.css';

// interface BrandPageProps {
//     params: {
//         slug: string;
//     };
//     searchParams?: {
//         after?: string;
//     };
// }

// // 1. Функция generateMetadata - для динамического SEO
// export async function generateMetadata({ params }: BrandPageProps) {
//     const { slug } = params; // теперь доступно без await
//     const brandInfo = await fetchBrandInfo(slug);

//     if (!brandInfo) {
//         return {
//             title: 'Бренд не найден',
//             description: 'Указанного бренда не существует',
//         };
//     }
//     return {
//         title: brandInfo.name,
//         description: `Купить продукцию ${brandInfo.name} в Ташкенте`,
//     };
// }

// // 2. Основной компонент страницы (async, но params уже как объект)
// export default async function BrandPage({ params, searchParams }: BrandPageProps) {
//     const { slug } = params; // без await
//     const after = searchParams?.after || '';

//     // Получаем данные о бренде
//     const brandInfo = await fetchBrandInfo(slug);
//     // Получаем товары бренда
//     const productsData = await fetchBrandProducts(slug, after);

//     if (!brandInfo || !productsData) {
//         return (
//             <div className="shop_page">
//                 <div className="shop_page_wrapper">
//                     <h2>Бренд не найден</h2>
//                 </div>
//             </div>
//         );
//     }

//     const products = productsData.nodes || [];
//     const { hasNextPage, endCursor } = productsData.pageInfo || {};

//     function formatPrice(price: string | undefined) {
//         if (!price) return 'Цена не указана';
//         return price.replace(/\u00A0/g, ' ').replace('UZS', 'сӯм');
//     }

//     return (
//         <div className="shop_page brands-page">
//             <div className="shop_page_wrapper">
//                 <div className="category_filter_side"></div>

//                 <div className="products_side">
//                     {brandInfo.brandBanner && (
//                         <div className="brand-banner" style={{ marginBottom: '20px' }}>
//                             <img
//                                 src={brandInfo.brandBanner}
//                                 alt={brandInfo.name}
//                                 style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
//                             />
//                         </div>
//                     )}

//                     <h1 className="shop_page_title">{brandInfo.name}</h1>

//                     {brandInfo.description && (
//                         <div
//                             className="brand-description"
//                             style={{ marginTop: '10px', marginBottom: '20px' }}
//                             dangerouslySetInnerHTML={{ __html: brandInfo.description }}
//                         />
//                     )}

//                     {typeof brandInfo.count === 'number' && (
//                         <p className="brandsCount" style={{ marginTop: '10px' }}>
//                             Всего товаров: <strong>{brandInfo.count}</strong>
//                         </p>
//                     )}

//                     <div className="shop_page_prod_grid">
//                         {products.map((p: any) => {
//                             const formattedPrice = formatPrice(p.price);

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
//                                         <Link
//                                             href={`/product-brands/${p.brands.nodes[0]?.slug || ''}`}
//                                             className="product_item__brand"
//                                         >
//                                             {p.brands.nodes[0]?.name || 'Бренд не указан'}
//                                         </Link>

//                                         <div className="line_highlight"></div>
//                                         <Link href={`/product/${p.slug}`} className="product_item__name">
//                                             {p.name}
//                                         </Link>
//                                         <span className="product_item__price">{formattedPrice}</span>
//                                     </div>

//                                     <button className="product_item__add_to_cart">В корзину</button>
//                                 </div>
//                             );
//                         })}
//                     </div>

//                     {hasNextPage && endCursor && (
//                         <div
//                             className="pagination_block"
//                             style={{
//                                 gridColumn: '1 / -1',
//                                 marginTop: '20px',
//                                 display: 'flex',
//                                 gap: '10px',
//                             }}
//                         >
//                             <Link
//                                 href={`/product-brands/${slug}?after=${endCursor}`}
//                                 className="next_page_link"
//                             >
//                                 Следующая страница →
//                             </Link>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }






// app/product-brands/[slug]/page.tsx

import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { fetchBrandInfo, fetchBrandProducts } from '@/lib/brand/fetchBrandData';
import '@/app/shop/shop.css';
import './brands.css';

// Функция generateMetadata - для динамического SEO
export async function generateMetadata({
    params,
}: any): Promise<Metadata> { // Изменено на any
    const { slug } = params;
    const brandInfo = await fetchBrandInfo(slug);

    if (!brandInfo) {
        return {
            title: 'Бренд не найден',
            description: 'Указанного бренда не существует',
        };
    }
    return {
        title: brandInfo.name,
        description: `Купить продукцию ${brandInfo.name} в Ташкенте`,
    };
}

// Основной компонент страницы с использованием any для пропсов
export default async function BrandPage({
    params,
    searchParams,
}: any) { // Здесь мы указываем тип пропсов как any
    // Явное утверждение типов внутри функции
    const { slug } = params as { slug: string };
    const after = (searchParams?.after as string) || '';

    // Получаем данные о бренде
    const brandInfo = await fetchBrandInfo(slug);
    // Получаем товары бренда
    const productsData = await fetchBrandProducts(slug, after);

    if (!brandInfo || !productsData) {
        return (
            <div className="shop_page">
                <div className="shop_page_wrapper">
                    <h2>Бренд не найден</h2>
                </div>
            </div>
        );
    }

    const products = productsData.nodes || [];
    const { hasNextPage, endCursor } = productsData.pageInfo || {};

    function formatPrice(price: string | undefined) {
        if (!price) return 'Цена не указана';
        return price.replace(/\u00A0/g, ' ').replace('UZS', 'сӯм');
    }

    return (
        <div className="shop_page brands-page">
            <div className="shop_page_wrapper">
                <div className="category_filter_side"></div>

                <div className="products_side">
                    {brandInfo.brandBanner && (
                        <div className="brand-banner" style={{ marginBottom: '20px' }}>
                            <Image
                                src={brandInfo.brandBanner}
                                alt={brandInfo.name}
                                style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
                                width={1800}
                                height={400}
                            />
                        </div>
                    )}

                    <h1 className="shop_page_title">{brandInfo.name}</h1>

                    {brandInfo.description && (
                        <div
                            className="brand-description"
                            style={{ marginTop: '10px', marginBottom: '20px' }}
                            dangerouslySetInnerHTML={{ __html: brandInfo.description }}
                        />
                    )}

                    {/* ВСЕГО ТОВАРОВ */}
                    {/* {typeof brandInfo.count === 'number' && (
                        <p className="brandsCount" style={{ marginTop: '10px' }}>
                            Всего товаров: <strong>{brandInfo.count}</strong>
                        </p>
                    )} */}

                    {products.length > 0 && (
                        <p className="brandsCount" style={{ marginTop: '10px' }}>
                            Товаров в наличии: <strong>{products.length}</strong>
                        </p>
                    )}

                    <div className="shop_page_prod_grid">
                        {products.map((p: any) => { // Здесь можно также улучшить типизацию
                            const formattedPrice = formatPrice(p.price);
                            return (
                                <div className="product_item" key={p.id}>
                                    <Link href={`/product/${p.slug}`}>
                                        <Image
                                            className="product_item__image"
                                            src={p.image?.sourceUrl || '/images/products/default.jpg'}
                                            alt={p.image?.altText || p.name}
                                            width={200}
                                            height={200}
                                        />
                                    </Link>

                                    <div className="product_meta_box">
                                        <Link
                                            href={`/product-brands/${p.brands.nodes[0]?.slug || ''}`}
                                            className="product_item__brand"
                                        >
                                            {p.brands.nodes[0]?.name || 'Бренд не указан'}
                                        </Link>

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
                            <Link href={`/product-brands/${slug}?after=${endCursor}`} className="next_page_link">
                                Следующая страница →
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
