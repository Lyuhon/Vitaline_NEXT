// src/app/[locale]/sales-of-month/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import './shop.css';
import AddToCartButtonInList from '@/components/add_to_cart_popup/AddToCartButtonInList';
import { MiniCartProvider } from '@/app/[locale]/context/MiniCartContext';
import { headers } from 'next/headers';
import { getTranslations } from 'next-intl/server';

interface ShopPageProps {
    params: Promise<{ locale: string }>;
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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'salesOfMonth' });
    return {
        title: t('metadataTitle'),
        description: t('metadataDescription'),
    };
}

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

export default async function ShopPage({ params, searchParams }: ShopPageProps) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'salesOfMonth' });

    const resolvedSearchParams = await searchParams;
    const showStock = resolvedSearchParams.debug === 'stock';

    // Получаем userType из заголовков
    const headersList = await headers();
    const userType = headersList.get("x-user-type") || null;

    const products = await fetchFeaturedProducts();

    // Фильтрация продуктов на основе userType
    const filteredProducts = userType === 'restricted'
        ? products.filter(product => {
            // Проверяем, есть ли бренды, и исключаем товары с запрещёнными брендами
            if (!product.brands || !product.brands.nodes.length) return true;
            const restrictedBrands = ['carlson-labs', 'childlife'];
            return !product.brands.nodes.some(brand =>
                restrictedBrands.includes(brand.slug.toLowerCase())
            );
        })
        : products;

    // Подсчет общей статистики для отфильтрованных продуктов
    const totalStock = filteredProducts.reduce((sum, p) => sum + (p.stockQuantity || 0), 0);
    const totalPrice = filteredProducts.reduce((sum, p) => {
        const price = p.convertedPrice ? parsePrice(p.convertedPrice) : 0;
        return sum + (price * (p.stockQuantity || 0));
    }, 0);

    return (
        <MiniCartProvider>
            <div className="shop_page">
                <div className="shop_page_wrapper">
                    <div className="products_side">

                        <h1 className="shop_page_title">{t('shopPageTitle')}</h1>
                        <h2 style={{ marginBottom: '15px' }}>
                            {t('promoProducts', { count: filteredProducts.length })}
                        </h2>

                        <div className="shop_page_prod_grid">
                            {filteredProducts.map((p: Product) => {
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
                                                {p.convertedPrice ? p.convertedPrice : t('priceNotSpecified')}
                                            </span>

                                            {showStock && (
                                                <div className="product_item__stock">
                                                    <span className="stock_count">{t.rich('inStock', { b: (chunks) => <b>{chunks}</b>, quantity: p.stockQuantity })}</span>
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
                                        {t.rich('totalInStock', { b: (chunks) => <b>{chunks}</b>, total: totalStock })}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MiniCartProvider>
    );
}