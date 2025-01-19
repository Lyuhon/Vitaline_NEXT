// // src/app/sales-of-month/page.tsx
// import Link from 'next/link';
// import Image from 'next/image';
// import './shop.css';
// import AddToCartButtonInList from '@/components/add_to_cart_popup/AddToCartButtonInList';
// import { MiniCartProvider } from '@/app/context/MiniCartContext';
// import ShopBrandsSlider from '@/components/ShopBrandsSlider';

// interface ShopPageProps {
//     searchParams: Promise<{
//         debug?: string;
//     }>;
// }

// interface ProductImage {
//     sourceUrl: string;
//     altText: string;
// }

// interface ProductBrand {
//     id: string;
//     name: string;
//     slug: string;
// }

// interface ProductBrands {
//     nodes: ProductBrand[];
// }

// interface Product {
//     id: string;
//     name: string;
//     slug: string;
//     image?: ProductImage;
//     stockStatus: string;
//     stockQuantity: number;
//     price: string;
//     convertedPrice?: string;
//     brands?: ProductBrands;
// }

// export const dynamic = 'force-dynamic';

// export const generateMetadata = () => {
//     return {
//         title: 'Каталог сец. предложений - Vitaline',
//         description: 'Оптовый каталог товаров Американских витаминов.',
//     };
// };

// const parsePrice = (price: string): number => {
//     const cleanedPrice = price.replace(/[^\d.]/g, '');
//     const num = parseFloat(cleanedPrice);
//     return isNaN(num) ? 0 : num;
// };

// async function fetchFeaturedProducts(): Promise<Product[]> {
//     const query = `
//         query GetFeaturedProducts {
//             products(where: { stockStatus: IN_STOCK, featured: true }) {
//                 nodes {
//                     id
//                     name
//                     slug
//                     image {
//                         sourceUrl
//                         altText
//                     }
//                     ... on SimpleProduct {
//                         stockStatus
//                         stockQuantity
//                         price
//                         convertedPrice
//                         brands {
//                             nodes {
//                                 id
//                                 name
//                                 slug
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     `;

//     const res = await fetch('https://nuxt.vitaline.uz/graphql', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ query }),
//         next: { revalidate: 3600 }
//     });

//     if (!res.ok) {
//         throw new Error('Failed to fetch featured products');
//     }

//     const data = await res.json();
//     return data.data.products.nodes;
// }

// export default async function ShopPage({ searchParams }: ShopPageProps) {
//     const params = await searchParams;
//     const showStock = params.debug === 'stock';

//     const products = await fetchFeaturedProducts();

//     return (
//         <MiniCartProvider>
//             <div className="shop_page">
//                 <div className="shop_page_wrapper">
//                     <div className="products_side">
//                         {/* <ShopBrandsSlider /> */}

//                         <h1 className="shop_page_title">Каталог сец. предложений</h1>
//                         <h2 style={{ marginBottom: '15px' }}>
//                             Акционные товары ({products.length})
//                         </h2>

//                         <div className="shop_page_prod_grid">
//                             {products.map((p: Product) => {
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

//                                             {showStock && (
//                                                 <div className="product_item__stock">
//                                                     <span className="stock_count">В наличии: <b>{p.stockQuantity}</b></span>
//                                                 </div>
//                                             )}
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
//                     </div>
//                 </div>
//             </div>
//         </MiniCartProvider>
//     );
// }


// src/app/sales-of-month/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import './shop.css';
import AddToCartButtonInList from '@/components/add_to_cart_popup/AddToCartButtonInList';
import { MiniCartProvider } from '@/app/context/MiniCartContext';
import ShopBrandsSlider from '@/components/ShopBrandsSlider';

interface ShopPageProps {
    searchParams: Promise<{
        debug?: string;
    }>;
}

interface ProductImage {
    sourceUrl: string;
    altText: string;
}

interface ProductBrand {
    id: string;
    name: string;
    slug: string;
}

interface ProductBrands {
    nodes: ProductBrand[];
}

interface Product {
    id: string;
    name: string;
    slug: string;
    image?: ProductImage;
    stockStatus: string;
    stockQuantity: number;
    price: string;
    convertedPrice?: string;
    brands?: ProductBrands;
}

export const dynamic = 'force-dynamic';

export const generateMetadata = () => {
    return {
        title: 'Каталог сец. предложений - Vitaline',
        description: 'Оптовый каталог товаров Американских витаминов.',
    };
};

const parsePrice = (price: string): number => {
    const cleanedPrice = price.replace(/[^\d.]/g, '');
    const num = parseFloat(cleanedPrice);
    return isNaN(num) ? 0 : num;
};

async function fetchFeaturedProducts(): Promise<Product[]> {
    const query = `
        query GetFeaturedProducts {
            products(where: { stockStatus: IN_STOCK, featured: true }) {
                nodes {
                    id
                    name
                    slug
                    image {
                        sourceUrl
                        altText
                    }
                    ... on SimpleProduct {
                        stockStatus
                        stockQuantity
                        price
                        convertedPrice
                        brands {
                            nodes {
                                id
                                name
                                slug
                            }
                        }
                    }
                }
            }
        }
    `;

    const res = await fetch('https://nuxt.vitaline.uz/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
        next: { revalidate: 3600 }
    });

    if (!res.ok) {
        throw new Error('Failed to fetch featured products');
    }

    const data = await res.json();
    return data.data.products.nodes;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
    const params = await searchParams;
    const showStock = params.debug === 'stock';

    const products = await fetchFeaturedProducts();

    // Подсчет общей статистики
    const totalStock = products.reduce((sum, p) => sum + (p.stockQuantity || 0), 0);
    const totalPrice = products.reduce((sum, p) => {
        const price = p.convertedPrice ? parsePrice(p.convertedPrice) : 0;
        return sum + (price * (p.stockQuantity || 0));
    }, 0);

    return (
        <MiniCartProvider>
            <div className="shop_page">
                <div className="shop_page_wrapper">
                    <div className="products_side">
                        {/* <ShopBrandsSlider /> */}

                        <h1 className="shop_page_title">Каталог сец. предложений</h1>
                        <h2 style={{ marginBottom: '15px' }}>
                            Акционные товары ({products.length})
                        </h2>

                        <div className="shop_page_prod_grid">
                            {products.map((p: Product) => {
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

                                            {showStock && (
                                                <div className="product_item__stock">
                                                    <span className="stock_count">В наличии: <b>{p.stockQuantity}</b></span>
                                                </div>
                                            )}
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

                        {showStock && (
                            <div className="total_stock_info" style={{
                                marginTop: '20px',
                                padding: '15px',
                                paddingLeft: '0px',
                                borderRadius: '8px'
                            }}>
                                <div className="product_item__stock">
                                    <span className="stock_count">
                                        Общее количество в наличии: <b>{totalStock}</b>
                                    </span>
                                </div>
                                {/* <div className="product_item__stock" style={{ marginTop: '10px' }}>
                                    <span className="stock_count">
                                        Общая стоимость: <b>{totalPrice.toLocaleString()} $</b>
                                    </span>
                                </div> */}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MiniCartProvider>
    );
}