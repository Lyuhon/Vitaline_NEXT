// src/components/ProductsSection.tsx
import React from 'react';
import ProductsSliderClient from './ProductsSliderClient';
import Link from 'next/link';

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
    convertedPrice?: string;
    image?: {
        sourceUrl?: string;
        altText?: string;
    };

    brands?: {
        nodes: Brand[];
    };
};

export default function ProductsSection({ products }: { products: Product[] }) {

    const formatPrice = (price: string | undefined): string => {
        if (!price) {
            return "Цена не указана";
        }
        return price
            .replace(/&nbsp;/g, " ") // Заменяем &nbsp; на обычный пробел
            .replace(/\u00A0/g, " ") // Заменяем неразрывный пробел
            .replace("UZS", "сӯм"); // Заменяем валюту
    };

    return (
        <section className="home_product_section">
            <div className="products_section_heading">
                <div className="general_heading_block">
                    <div className="prods_sec_nav">
                        <h2 className="active__">Бестселлеры</h2>
                        {/* <h2>Новые поступления</h2> */}
                    </div>
                    <Link className="section_read_more" href="/shop">Каталог товаров</Link>
                </div>
                <div className="orange_heading_divider"></div>
            </div>

            <div className="swiper products_slider">
                <div className="swiper-wrapper">
                    {products.map((product) => (
                        <div className="swiper-slide product_item" key={product.id}>
                            {/* Ссылка на страницу товара при клике на изображение */}
                            <Link href={`/product/${product.slug}`}>
                                <img
                                    className="product_item__image"
                                    src={product.image?.sourceUrl ?? '/images/products/default.jpg'}
                                    alt={product.image?.altText ?? product.name}
                                />
                            </Link>
                            <div className="product_meta_box">

                                <Link
                                    href={`/product-brands/${product.brands?.nodes[0]?.slug ?? ''}`}
                                    className="product_item__brand"
                                >
                                    {product.brands?.nodes[0]?.name ?? 'Без бренда'}
                                </Link>

                                <div className="line_highlight"></div>

                                {/* Ссылка на страницу товара при клике на название товара */}
                                <Link href={`/product/${product.slug}`} className="product_item__name">
                                    {product.name}
                                </Link>

                                {/* Форматируем цену перед выводом */}
                                {/* <span className="product_item__price">
                                    {formatPrice(product.price)}
                                </span> */}
                                <span className="product_item__price">
                                    {product.convertedPrice}
                                </span>

                            </div>
                            <button className="product_item__add_to_cart">
                                В корзину
                            </button>
                        </div>
                    ))}
                </div>
                <div className="swiper-button-next"></div>
                <div className="swiper-button-prev"></div>
            </div>

            <ProductsSliderClient />
        </section>
    );
}
