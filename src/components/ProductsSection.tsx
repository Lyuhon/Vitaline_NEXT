// // src/components/ProductsSection.tsx
// import React from 'react';
// import ProductsSliderClient from './ProductsSliderClient';

// type Product = {
//     id: string;
//     name: string;
//     price?: string;
//     image?: {
//         sourceUrl?: string;
//         altText?: string;
//     };
// };

// export default function ProductsSection({ products }: { products: Product[] }) {
//     return (
//         <section className="home_product_section">
//             <div className="products_section_heading">
//                 <div className="general_heading_block">
//                     <div className="prods_sec_nav">
//                         <h2 className="active">Бестселлеры</h2>
//                         <h2>Новые поступления</h2>
//                     </div>
//                     <a className="section_read_more" href="#">Каталог товаров</a>
//                 </div>
//                 <div className="orange_heading_divider"></div>
//             </div>

//             <div className="swiper products_slider">
//                 <div className="swiper-wrapper">
//                     {products.map((product) => (
//                         <div className="swiper-slide product_item" key={product.id}>
//                             <img
//                                 className="product_item__image"
//                                 src={product.image?.sourceUrl ?? '/images/products/default.jpg'}
//                                 alt={product.image?.altText ?? product.name}
//                             />
//                             <div className="product_meta_box">
//                                 <a href="#" className="product_item__brand">
//                                     {product.name.split(' ')[0]}
//                                 </a>
//                                 <div className="line_highlight"></div>
//                                 <a href="#" className="product_item__name">
//                                     {product.name}
//                                 </a>
//                                 <span className="product_item__price">
//                                     {product.price ?? 'Цена не указана'}
//                                 </span>
//                             </div>
//                             <button className="product_item__add_to_cart">
//                                 Добавить в корзину
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//                 <div className="swiper-button-next"></div>
//                 <div className="swiper-button-prev"></div>
//             </div>

//             {/* Инициализация слайдера на клиенте */}
//             <ProductsSliderClient />
//         </section>
//     );
// }



// src/components/ProductsSection.tsx
import React from 'react';
import ProductsSliderClient from './ProductsSliderClient';
import Link from 'next/link';

type Product = {
    id: string;
    name: string;
    slug: string;
    price?: string;
    image?: {
        sourceUrl?: string;
        altText?: string;
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
                        <h2 className="active">Бестселлеры</h2>
                        <h2>Новые поступления</h2>
                    </div>
                    <a className="section_read_more" href="/shop">Каталог товаров</a>
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
                                {/* Предположим, что brand пока не подтягиваем - можно оставить как есть или убрать */}
                                <a href="#" className="product_item__brand">
                                    {product.name.split(' ')[0]}
                                </a>
                                <div className="line_highlight"></div>

                                {/* Ссылка на страницу товара при клике на название товара */}
                                <Link href={`/product/${product.slug}`} className="product_item__name">
                                    {product.name}
                                </Link>

                                {/* Форматируем цену перед выводом */}
                                <span className="product_item__price">
                                    {formatPrice(product.price)}
                                </span>

                            </div>
                            <button className="product_item__add_to_cart">
                                Добавить в корзину
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
