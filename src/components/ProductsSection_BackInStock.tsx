// src/components/ProductsSection_BackInStock.tsx
"use client";

import React from 'react';
import ProductsSliderClient from './ProductsSliderClient';
import Link from 'next/link';
import Image from 'next/image';
import AddToCartButtonInList from '@/components/add_to_cart_popup/AddToCartButtonInList';
import { MiniCartProvider } from '@/app/context/MiniCartContext';

type Brand = {
    id: string;
    name: string;
    slug: string;
};

type Product = {
    id: string;
    name: string;
    slug: string;
    price?: string;
    stockQuantity?: number;
    convertedPrice?: string;
    image?: {
        sourceUrl?: string;
        altText?: string;
    };
    brands?: {
        nodes: Brand[];
    };
};

export default function FeaturedProductsSection({ products }: { products: Product[] }) {
    const formatPrice = (price: string | undefined): string => {
        if (!price) {
            return "Цена не указана";
        }
        return price
            .replace(/&nbsp;/g, " ")
            .replace(/\u00A0/g, " ")
            .replace("UZS", "сӯм");
    };

    return (
        <section className="home_product_section" id='slider_newarrivals'>
            <div className="products_section_heading">
                <div className="general_heading_block">
                    <div className="prods_sec_nav">
                        <h2 className="active__">Новые поступления</h2>
                    </div>
                    {/* <Link className="section_read_more" href="/sales-of-month">Все предложения</Link> */}
                </div>
                <div className="orange_heading_divider"></div>
            </div>

            <div className="swiper products_slider">
                <div className="swiper-wrapper">
                    {products.map((product) => {
                        const numericPrice = product.convertedPrice
                            ? parseFloat(product.convertedPrice.replace(/[^\d.]/g, '')) / 1
                            : 0;

                        return (
                            <div className="swiper-slide product_item" key={product.id}>
                                <Link href={`/product/${product.slug}`}>
                                    <Image
                                        className="product_item__image"
                                        src={product.image?.sourceUrl ?? '/images/products/default.jpg'}
                                        alt={product.image?.altText ?? product.name}
                                        width={200}
                                        height={200}
                                    />
                                </Link>
                                <div className="product_meta_box">
                                    {product.brands && product.brands.nodes.length > 0 ? (
                                        <Link
                                            href={`/product-brands/${product.brands.nodes[0].slug}`}
                                            className="product_item__brand"
                                        >
                                            {product.brands.nodes[0].name}
                                        </Link>
                                    ) : (
                                        <span className="product_item__brand">Без бренда</span>
                                    )}

                                    <div className="line_highlight"></div>

                                    <Link href={`/product/${product.slug}`} className="product_item__name">
                                        {product.name}
                                    </Link>

                                    <span className="product_item__price">
                                        {numericPrice > 0 ? `${numericPrice.toFixed(2)} $` : 'Цена не указана'}
                                    </span>
                                </div>
                                <MiniCartProvider>
                                    <AddToCartButtonInList
                                        productId={product.id}
                                        productName={product.name}
                                        productImage={product.image?.sourceUrl ?? '/images/products/default.jpg'}
                                        productPrice={numericPrice}
                                        maxQuantity={product.stockQuantity || 0}
                                    />
                                </MiniCartProvider>
                            </div>
                        );
                    })}
                </div>
                {/* <div className="swiper-button-next"></div>
                <div className="swiper-button-prev"></div> */}
            </div>
            <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div>
            <ProductsSliderClient />
        </section>
    );
}
