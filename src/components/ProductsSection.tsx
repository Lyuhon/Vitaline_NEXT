// // src/components/ProductsSection.tsx
// import React from 'react';
// import ProductsSliderClient from './ProductsSliderClient';
// import Link from 'next/link';

// import AddToCartButtonInList from '@/components/add_to_cart_popup/AddToCartButtonInList';
// import { MiniCartProvider } from '@/app/context/MiniCartContext';

// type Brand = {
//     id: string;
//     name: string;
//     slug: string;
// };

// type Product = {
//     id: string;
//     name: string;
//     slug: string;
//     price?: string;
//     stockQuantity?: number;
//     convertedPrice?: string;
//     image?: {
//         sourceUrl?: string;
//         altText?: string;
//     };

//     brands?: {
//         nodes: Brand[];
//     };
// };

// export default function ProductsSection({ products }: { products: Product[] }) {

//     const formatPrice = (price: string | undefined): string => {
//         if (!price) {
//             return "Цена не указана";
//         }
//         return price
//             .replace(/&nbsp;/g, " ") // Заменяем &nbsp; на обычный пробел
//             .replace(/\u00A0/g, " ") // Заменяем неразрывный пробел
//             .replace("UZS", "сӯм"); // Заменяем валюту
//     };

//     return (
//         <section className="home_product_section">
//             <div className="products_section_heading">
//                 <div className="general_heading_block">
//                     <div className="prods_sec_nav">
//                         <h2 className="active__">Бестселлеры</h2>
//                         {/* <h2>Новые поступления</h2> */}
//                     </div>
//                     <Link className="section_read_more" href="/shop">Каталог товаров</Link>
//                 </div>
//                 <div className="orange_heading_divider"></div>
//             </div>

//             <div className="swiper products_slider">
//                 <div className="swiper-wrapper">
//                     {products.map((product) => (

//                         <div className="swiper-slide product_item" key={product.id}>
//                             {/* Ссылка на страницу товара при клике на изображение */}
//                             <Link href={`/product/${product.slug}`}>
//                                 <img
//                                     className="product_item__image"
//                                     src={product.image?.sourceUrl ?? '/images/products/default.jpg'}
//                                     alt={product.image?.altText ?? product.name}
//                                 />
//                             </Link>
//                             <div className="product_meta_box">

//                                 <Link
//                                     href={`/product-brands/${product.brands?.nodes[0]?.slug ?? ''}`}
//                                     className="product_item__brand"
//                                 >
//                                     {product.brands?.nodes[0]?.name ?? 'Без бренда'}
//                                 </Link>

//                                 <div className="line_highlight"></div>

//                                 {/* Ссылка на страницу товара при клике на название товара */}
//                                 <Link href={`/product/${product.slug}`} className="product_item__name">
//                                     {product.name}
//                                 </Link>

//                                 {/* Форматируем цену перед выводом */}
//                                 {/* <span className="product_item__price">
//                                     {formatPrice(product.price)}
//                                 </span> */}
//                                 <span className="product_item__price">
//                                     {product.convertedPrice}
//                                 </span>

//                             </div>
//                             {/* <button className="product_item__add_to_cart">
//                                 В корзину
//                             </button> */}


//                             <MiniCartProvider>

//                                 <AddToCartButtonInList
//                                     productId={product.id}
//                                     productName={product.name}
//                                     productImage={product.image?.sourceUrl ?? '/images/products/default.jpg'}
//                                     productPrice={product.convertedPrice}
//                                     maxQuantity={product.stockQuantity || 0}
//                                 />

//                             </MiniCartProvider>
//                         </div>
//                     ))}
//                 </div>
//                 <div className="swiper-button-next"></div>
//                 <div className="swiper-button-prev"></div>
//             </div>

//             <ProductsSliderClient />
//         </section>
//     );
// }






// src/components/ProductsSection.tsx
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

export default function ProductsSection({ products }: { products: Product[] }) {

    const formatPrice = (price: string | undefined): string => {
        if (!price) {
            return "Цена не указана";
        }
        // Здесь мы не используем форматирование сумов, так как хотим отображать доллары
        return price
            .replace(/&nbsp;/g, " ") // Заменяем &nbsp; на обычный пробел
            .replace(/\u00A0/g, " ") // Заменяем неразрывный пробел
            .replace("UZS", "сӯм"); // Заменяем валюту
    };

    return (

        <section className="home_product_section" id='slider_bestsellers'>
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
                    {products.map((product) => {
                        // Парсим цену из строки в число с поддержкой десятичных знаков
                        const numericPrice = product.convertedPrice
                            ? parseFloat(product.convertedPrice.replace(/[^\d.]/g, '')) / 1
                            : 0;

                        // Определяем наличие товара
                        // const inStock = product.stockStatus === 'IN_STOCK';

                        return (
                            <div className="swiper-slide product_item" key={product.id}>
                                {/* Ссылка на страницу товара при клике на изображение */}
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

                                    {/* Ссылка на бренд, если она есть */}
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

                                    {/* Ссылка на страницу товара при клике на название товара */}
                                    <Link href={`/product/${product.slug}`} className="product_item__name">
                                        {product.name}
                                    </Link>

                                    {/* Отображаем цену в формате "140.16 $" */}
                                    <span className="product_item__price">
                                        {numericPrice > 0 ? `${numericPrice.toFixed(2)} $` : 'Цена не указана'}
                                    </span>

                                </div>
                                <MiniCartProvider>
                                    <AddToCartButtonInList
                                        productId={product.id}
                                        productName={product.name}
                                        productImage={product.image?.sourceUrl ?? '/images/products/default.jpg'}
                                        productPrice={numericPrice} // Передаем числовое значение цены
                                        maxQuantity={product.stockQuantity || 0}
                                    // stock={inStock}
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
