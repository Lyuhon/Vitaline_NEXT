// // \app\category\[slug]\page.tsx

// import { fetchProductsByCategory } from '@/lib/category_page/fetchProductsByCategory';
// import { fetchProductTags } from '@/lib/fetchProductTags';
// import { fetchAllBrands } from '@/lib/brand/fetchBrandDataComponent';
// import { Metadata, ResolvingMetadata } from 'next';
// import Link from 'next/link';
// import Image from 'next/image';
// import AddToCartButtonInList from '@/components/add_to_cart_popup/AddToCartButtonInList';
// import { MiniCartProvider } from '@/app/context/MiniCartContext';
// import { GraphQLClient, gql } from 'graphql-request';

// import '@/app/shop/shop.css'
// import './cat.css'


// async function getCategoryName(slug: string) {
//     const client = new GraphQLClient('https://nuxt.vitaline.uz/graphql');
//     const query = gql`
//         query CategoryName($slug: ID!) {
//             productCategory(id: $slug, idType: SLUG) {
//                 name
//             }
//         }
//     `;

//     try {
//         const response: any = await client.request(query, { slug });
//         return response.productCategory?.name || slug;
//     } catch (error) {
//         console.error('Error fetching category name:', error);
//         return slug;
//     }
// }

// type ProductNode = {
//     id: string;
//     name: string;
//     slug: string;
//     image?: {
//         sourceUrl?: string;
//         altText?: string;
//     };
//     price?: string;
//     convertedPrice?: string;
//     stockStatus?: string;
//     stockQuantity?: number;
//     brands?: {
//         nodes: {
//             id: string;
//             name: string;
//             slug: string;
//             brandId?: string;
//         }[];
//     };
// };

// interface CategoryPageProps {
//     params: Promise<{ slug: string }>;
//     searchParams: Promise<{ after?: string }>;
// }

// export const dynamic = 'force-dynamic';

// // Обновленная функция generateMetadata
// export async function generateMetadata(
//     { params }: { params: Promise<{ slug: string }> },
//     parent: ResolvingMetadata
// ): Promise<Metadata> {
//     const resolvedParams = await params;
//     const categoryName = await getCategoryName(resolvedParams.slug);

//     const title = categoryName
//         ? `Купить витамины оптом: ${categoryName}`
//         : 'Каталог витаминов - Vitaline';

//     const description = categoryName
//         ? `Купить витамины оптом в Ташкенте: ${categoryName}`
//         : 'Купить витамины оптом в Ташкенте с доставкой';

//     return {
//         title,
//         description,
//         openGraph: {
//             title,
//             description,
//             type: 'website',
//         },
//         alternates: {
//             canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/category/${resolvedParams.slug}`,
//         },
//     };
// }

// const parsePrice = (price: string): number => {
//     const cleanedPrice = price.replace(/[^\d.]/g, '');
//     const num = parseFloat(cleanedPrice);
//     return isNaN(num) ? 0 : num;
// };

// export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
//     const [resolvedParams, resolvedSearchParams] = await Promise.all([
//         params,
//         searchParams
//     ]);

//     const { slug } = resolvedParams;
//     const { after } = resolvedSearchParams;

//     const [tags, productsData, brands] = await Promise.all([
//         fetchProductTags(),
//         fetchProductsByCategory(slug, after),
//         fetchAllBrands(),
//     ]);

//     const products = productsData.nodes;
//     const { hasNextPage, endCursor } = productsData.pageInfo;
//     const categoryName = productsData.categoryName || slug;

//     return (
//         <MiniCartProvider>
//             <div className="shop_page categories_page">

//                 <h1 className="shop_page_title">🌿 {categoryName}</h1>

//                 <div className="shop_page_wrapper">
//                     {/* Сайдбар с тегами и брендами */}
//                     <div className="category_filter_side">
//                         {/* Секция тегов */}
//                         {/* <div className="filter_section">
//                             <h3 className="filter_title">Категории</h3>
//                             <div className="tag_filt_list">
//                                 <div className="tags-checkbox-list">
//                                     {tags.map((t) => (
//                                         <Link key={t.slug} href={`/category/${t.slug}`}>
//                                             <label className="checkbox-label">
//                                                 <input
//                                                     type="checkbox"
//                                                     name="tags"
//                                                     value={t.name}
//                                                     readOnly
//                                                     checked={slug === t.slug}
//                                                 />
//                                                 {t.name}
//                                             </label>
//                                         </Link>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div> */}

//                         {/* Секция брендов */}
//                         <div className="filter_section">
//                             <h3 className="filter_title mobile_visible">Бренды</h3>
//                             <div className="brands_filter_list">
//                                 {brands.map((brand: any) => (
//                                     <Link
//                                         key={brand.id}
//                                         href={`/product-brands/${brand.slug}`}
//                                         className="brand_filter_item"
//                                     >
//                                         <div className="brand_filter_image">
//                                             <Image
//                                                 src={brand.brandThumbnail || '/images/default-thumbnail.jpg'}
//                                                 alt={brand.name}
//                                                 width={120}
//                                                 height={120}
//                                                 objectFit="cover"
//                                             />
//                                         </div>
//                                         {/* <span className="brand_filter_name">{brand.name}</span> */}
//                                     </Link>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>

//                     {/* Остальная часть страницы остается без изменений */}
//                     <div className="products_side">
//                         {/* <h1 className="shop_page_title">🌿 {categoryName}</h1> */}

//                         <div className="shop_page_prod_grid">
//                             {products.map((p: ProductNode) => {
//                                 const numericPrice = p.convertedPrice ? parsePrice(p.convertedPrice) : 0;
//                                 const inStock = p.stockStatus === 'IN_STOCK';

//                                 return (
//                                     <div className="product_item" key={p.id}>
//                                         <Link href={`/product/${p.slug}`}>
//                                             <Image
//                                                 className="product_item__image"
//                                                 src={p.image?.sourceUrl || '/images/products/default.jpg'}
//                                                 alt={p.image?.altText || p.name}
//                                                 width={200}
//                                                 height={200}
//                                             />
//                                         </Link>

//                                         <div className="product_meta_box">
//                                             {p.brands && p.brands.nodes.length > 0 && (
//                                                 <Link
//                                                     href={`/product-brands/${p.brands.nodes[0].slug}`}
//                                                     className="product_item__brand"
//                                                 >
//                                                     {p.brands.nodes[0].name}
//                                                 </Link>
//                                             )}

//                                             <div className="line_highlight"></div>

//                                             <Link href={`/product/${p.slug}`} className="product_item__name">
//                                                 {p.name}
//                                             </Link>

//                                             <span className="product_item__price">
//                                                 {p.convertedPrice ? p.convertedPrice : 'Цена не указана'}
//                                             </span>
//                                         </div>

//                                         <AddToCartButtonInList
//                                             productId={p.id}
//                                             productName={p.name}
//                                             productImage={p.image?.sourceUrl ?? '/images/products/default.jpg'}
//                                             productPrice={numericPrice}
//                                             maxQuantity={p.stockQuantity || 1}
//                                             stock={inStock}
//                                         />
//                                     </div>
//                                 );
//                             })}
//                         </div>

//                         {/* Пагинация */}
//                         {hasNextPage && (
//                             <div className="pagination_controls">
//                                 <Link
//                                     href={`/category/${slug}?after=${endCursor}`}
//                                     className="next_page_button"
//                                 >
//                                     Показать ещё
//                                 </Link>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </MiniCartProvider>
//     );
// }


import { fetchProductsByCategory } from '@/lib/category_page/fetchProductsByCategory';
import { fetchProductTags } from '@/lib/fetchProductTags';
import { fetchAllBrands } from '@/lib/brand/fetchBrandDataComponent';
import { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import AddToCartButtonInList from '@/components/add_to_cart_popup/AddToCartButtonInList';
import { MiniCartProvider } from '@/app/context/MiniCartContext';
import { GraphQLClient, gql } from 'graphql-request';

import '@/app/shop/shop.css';
import './cat.css';

async function getCategoryName(slug: string) {
    const client = new GraphQLClient('https://nuxt.vitaline.uz/graphql');
    const query = gql`
        query CategoryName($slug: ID!) {
            productCategory(id: $slug, idType: SLUG) {
                name
            }
        }
    `;

    try {
        const response: any = await client.request(query, { slug });
        return response.productCategory?.name || slug;
    } catch (error) {
        console.error('Error fetching category name:', error);
        return slug;
    }
}

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
    stockStatus?: string;
    stockQuantity?: number;
    brands?: {
        nodes: {
            id: string;
            name: string;
            slug: string;
            brandId?: string;
        }[];
    };
};

interface CategoryPageProps {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ after?: string }>;
}

export const dynamic = 'force-dynamic';

// Обновленная функция generateMetadata
export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> },
    parent: ResolvingMetadata
): Promise<Metadata> {
    const resolvedParams = await params;
    const categoryName = await getCategoryName(resolvedParams.slug);

    const title = categoryName
        ? `Купить витамины оптом: ${categoryName}`
        : 'Каталог витаминов - Vitaline';

    const description = categoryName
        ? `Купить витамины оптом в Ташкенте: ${categoryName}`
        : 'Купить витамины оптом в Ташкенте с доставкой';

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'website',
        },
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/category/${resolvedParams.slug}`,
        },
    };
}

const parsePrice = (price: string): number => {
    const cleanedPrice = price.replace(/[^\d.]/g, '');
    const num = parseFloat(cleanedPrice);
    return isNaN(num) ? 0 : num;
};

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
    const [resolvedParams, resolvedSearchParams] = await Promise.all([
        params,
        searchParams
    ]);

    const { slug } = resolvedParams;
    const { after } = resolvedSearchParams;

    const [tags, productsData, brands] = await Promise.all([
        fetchProductTags(),
        fetchProductsByCategory(slug, after),
        fetchAllBrands(),
    ]);

    const products = productsData.nodes;
    const { hasNextPage, endCursor } = productsData.pageInfo;
    const categoryName = productsData.categoryName || slug;

    return (
        <MiniCartProvider>
            <div className="shop_page categories_page">
                <h1 className="shop_page_title">🌿 {categoryName}</h1>

                <div className="shop_page_wrapper">
                    {/* Сайдбар с тегами и брендами */}
                    <div className="category_filter_side">
                        {/* Секция брендов */}
                        <div className="filter_section">
                            <h3 className="filter_title mobile_visible">Бренды</h3>
                            <div className="brands_filter_list">
                                {brands.map((brand: any) => (
                                    <Link
                                        key={brand.id}
                                        href={`/product-brands/${brand.slug}`}
                                        className="brand_filter_item"
                                    >
                                        <div className="brand_filter_image">
                                            <Image
                                                src={brand.brandThumbnail || '/images/default-thumbnail.jpg'}
                                                alt={brand.name}
                                                width={120}
                                                height={120}
                                                objectFit="cover"
                                            />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Остальная часть страницы */}
                    <div className="products_side">
                        <div className="shop_page_prod_grid">
                            {products.map((p: ProductNode) => {
                                const numericPrice = p.convertedPrice ? parsePrice(p.convertedPrice) : 0;
                                const inStock = p.stockStatus === 'IN_STOCK';

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
                                                {p.convertedPrice ? p.convertedPrice : 'Цена не указана'}
                                            </span>
                                        </div>

                                        <AddToCartButtonInList
                                            productId={p.id}
                                            productName={p.name}
                                            productImage={p.image?.sourceUrl ?? '/images/products/default.jpg'}
                                            productPrice={numericPrice}
                                            maxQuantity={p.stockQuantity || 1}
                                            stock={inStock}
                                        />
                                    </div>
                                );
                            })}
                        </div>

                        {/* Пагинация */}
                        {hasNextPage && (
                            <div className="pagination_controls">
                                <Link
                                    href={`/category/${slug}?after=${endCursor}`}
                                    className="next_page_button"
                                >
                                    Показать ещё
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MiniCartProvider>
    );
}