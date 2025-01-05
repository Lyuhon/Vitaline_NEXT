// // src/app/product/[slug]/page.tsx

// src/app/product/[slug]/page.tsx
import { fetchSingleProduct } from '@/lib/fetchSingleProduct';
import { fetchRelatedProducts } from '@/lib/fetchRelatedProducts';
import ProductInteractionsClient from '@/components/ProductInteractionsClient';
import ProductGalleryClient from '@/components/ProductGalleryClient';
import SKUCopy from "@/components/SKUCopy";
// import AddToCartButton from '@/components/AddToCartButton';
import AddToCartSection from '../AddToCartSection'; // Импорт нового компонента

import { MiniCartProvider } from '@/app/context/MiniCartContext';

import Link from 'next/link';
import Image from 'next/image';
import './product.css';



// import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
type Brand = {
    id: string;
    name: string;
    slug: string;
    brandBanner?: string;
    brandId?: string;
    brandThumbnail?: string;
};

type Product = {
    id: string;
    name: string;
    slug: string;
    sku?: string;
    description: string;
    shortDescription: string;
    image?: {
        sourceUrl?: string;
        altText?: string;
    };
    galleryImages?: {
        nodes: {
            sourceUrl: string;
            altText?: string;
        }[];
    };
    price?: string;
    convertedPrice?: string;
    stockStatus?: string; // 'IN_STOCK' или 'OUT_OF_STOCK'
    stockQuantity?: number; // Добавлено для ясности
    productCategories?: {
        nodes: {
            name: string;
            slug: string;
        }[];
    };
    productTags?: {
        nodes: {
            name: string;
            slug: string;
        }[];
    };


    brands?: {
        nodes: Brand[];
    };
};

interface PageProps {
    params: { slug: string }; // slug должен быть строкой
    searchParams?: Record<string, string | string[] | undefined>; // Используйте Record
}

// Функция для генерации метаданных
// export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
//     const { slug } = params;
//     const product: Product = await fetchSingleProduct(slug);

//     return {
//         title: `${product.name} - Купить в Ташкенте`,
//         description: product.shortDescription || 'Детали товара, доступного для покупки в Ташкенте.',
//     };
// }

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params; // Ждем разрешения промиса
    const { slug } = resolvedParams; // Извлекаем slug после
    const product: Product = await fetchSingleProduct(slug);

    const mainImage = product.image?.sourceUrl || '/images/default-product.png';
    const mainImageAlt = product.image?.altText || product.name;
    const gallery = product.galleryImages?.nodes || [];

    const categories = product.productCategories?.nodes || [];
    const tags = product.productTags?.nodes || [];

    const inStock = product.stockStatus === 'IN_STOCK';
    const maxQuantity = product.stockQuantity || 0;


    // Функция для парсинга цены в число
    const parsePrice = (p: string) => {
        const num = parseInt(p.replace(/[^\d]/g, ''), 10);
        return isNaN(num) ? 0 : num;
    };

    const numericPrice = product.price && product.price !== 'Цена не указана'
        ? parsePrice(product.price)
        : 0;


    // Форматируем цену: заменяем &nbsp; на пробел, UZS на сӯм
    let formattedPrice = product.price ? product.price : 'Цена не указана';
    if (formattedPrice !== 'Цена не указана') {
        formattedPrice = formattedPrice.replace(/\u00A0/g, ' ').replace('UZS', 'сӯм');
    }

    let relatedProducts: Product[] = [];
    if (categories.length > 0) {
        const categorySlug = categories[0].slug;
        relatedProducts = await fetchRelatedProducts(categorySlug, product.slug);
    }

    return (
        <div className="woo_prod_single_template">
            {/* Остальной JSX код */}
            <div className="bread_cumbs">
                <Link href="/">Главная</Link>
                <span className="bread_divider">&gt;</span>

                <Link href="/products">Продукция</Link>
                <span className="bread_divider">&gt;</span>

                {categories.length > 0 && (
                    <>
                        <Link href={`/category/${categories[0].slug}`}>{categories[0].name}</Link>
                        <span className="bread_divider">&gt;</span>
                    </>
                )}

                <Link className="current_bread_cumb" href={`/product/${product.slug}`}>
                    {product.name}
                </Link>
                <span className="bread_divider">&gt;</span>
            </div>

            <div className="prod_layout">
                <div className="galery_and_short_info">

                    {/* Галерея вынесена в клиентский компонент */}
                    <ProductGalleryClient
                        productName={product.name}
                        mainImage={mainImage}
                        mainImageAlt={mainImageAlt}
                        gallery={gallery}
                    />

                    <div className="product_short_info_block">
                        {/* POPUP о подлинности товара */}
                        <div className="ProductAuthenticity"><span>100% Оригинальный товар!</span>
                            <div className="css-rj99sh">
                                <a>
                                    <svg className="css-xof6ih-SvgIcon egfzaxi0" color="inherit" viewBox="0 0 24 24" height="24" width="24">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M12 22.0001C6.47715 22.0001 2 17.523 2 12.0001C2 6.47727 6.47715 2.00012 12 2.00012C17.5228 2.00012 22 6.47727 22 12.0001C22 17.523 17.5228 22.0001 12 22.0001ZM12 20.0002C16.4182 20.0002 20 16.4185 20 12.0002C20 7.58194 16.4182 4.00022 12 4.00022C7.58168 4.00022 3.99995 7.58194 3.99995 12.0002C3.99995 16.4185 7.58168 20.0002 12 20.0002ZM12 10.0002C12.5523 10.0002 13 10.4479 13 11.0002V17.0002C13 17.5525 12.5523 18.0002 12 18.0002C11.4477 18.0002 11 17.5525 11 17.0002V11.0002C11 10.4479 11.4477 10.0002 12 10.0002ZM12 8.00003C11.4477 8.00003 11 7.55231 11 7.00003C11 6.44774 11.4477 6.00003 12 6.00003C12.5523 6.00003 13 6.44774 13 7.00003C13 7.55231 12.5523 8.00003 12 8.00003Z"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <h1 className="product_name">{product.name}</h1>

                        <div className="brand_info">
                            {product.brands && product.brands.nodes.length > 0 && (
                                <Link className="product_item__brand" href={`/product-brands/${product.brands.nodes[0].slug}`}>

                                    {/* Проверяем наличие brandThumbnail */}
                                    {product.brands.nodes[0].brandThumbnail && (
                                        <Image
                                            src={product.brands.nodes[0].brandThumbnail}
                                            alt={`${product.brands.nodes[0].name} Logo`}
                                            width={50} // Задайте подходящие размеры
                                            height={50} // Задайте подходящие размеры
                                            className="brand_thumbnail"
                                        />
                                    )}
                                    {product.brands.nodes[0].name}

                                </Link>
                            )}
                        </div>


                        <div className={`stock_status ${inStock ? '' : 'out_of_stock'}`}>
                            <span className={inStock ? '' : 'out_of_stock'}>{inStock ? 'В наличии' : 'Нет в наличии'}</span>
                        </div>

                        <div className="prod_meta_list">
                            {product.sku && <SKUCopy sku={product.sku} />}
                            <div className="cat_and_tag">
                                <div className="categories_list">
                                    <h3>Метки:</h3>
                                    <div className="list">
                                        {tags.map(tag => (
                                            <Link key={tag.slug} href={`/tag/${tag.slug}`}>
                                                {tag.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                <div className="categories_list">
                                    <h3>Категории:</h3>
                                    <div className="list">
                                        {categories.map(cat => (
                                            <Link key={cat.slug} href={`/category/${cat.slug}`}>
                                                {cat.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="product_price">
                                {/* {formattedPrice} */}
                                {product.convertedPrice}
                            </div>

                            <MiniCartProvider>

                                {/* Если товар в наличии, показываем блок с количеством и кнопку добавления */}
                                {inStock && (
                                    <AddToCartSection
                                        productId={product.id}
                                        productName={product.name}
                                        productImage={mainImage}
                                        productPrice={numericPrice}
                                        maxQuantity={maxQuantity}
                                        stock={inStock}
                                    />
                                )}

                            </MiniCartProvider>

                            {!inStock && (
                                <div className="product_buttons_block">

                                    <div className="one_click_order">
                                        <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/РЎРРѕР№_1-2.svg" alt="Корзина" />
                                        <span>{inStock ? 'Купить в 1 клик' : 'Сделать предзаказ'}</span>
                                    </div>
                                </div>
                            )
                            }

                            {inStock && (
                                <div className="service_info">
                                    <div className="text_info_deleviry_pay">
                                        <p>Доставка курьером в течение дня</p>
                                        <br />
                                        <p>Оплата наличными при получении или переводом через сервисы</p>
                                    </div>
                                    <img className="pay_methd_img"
                                        src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Screenshot_20.png"
                                        alt="Методы переводов" />
                                </div>
                            )}

                            {/* Если товар не в наличии, выводим дополнительный блок с формой предзаказа */}
                            {!inStock && (
                                <div className="preorder_form_block" style={{ display: 'none' }}>
                                    <h3>Предзаказ</h3>
                                    <form>
                                        <input type="text" placeholder="Ваше имя" name="customer_name" />
                                        <input type="text" placeholder="Ваш телефон" name="customer_phone" />

                                        <select className="quick_order_form" aria-required="true" aria-invalid="false" name="your-region">
                                            <option value="">Выберите Ваш город</option>
                                            <option value="Город Ташкент">Город Ташкент</option>
                                            <option value="Ташкентская область">Ташкентская область</option>
                                            <option value="Самарканд">Самарканд</option>
                                            <option value="Бухара">Бухара</option>
                                            <option value="Андижан">Андижан</option>
                                            <option value="Фергана">Фергана</option>
                                            <option value="Джизак">Джизак</option>
                                            <option value="Каракалпакстан">Каракалпакстан</option>
                                            <option value="Наманган">Наманган</option>
                                            <option value="Навои">Навои</option>
                                            <option value="Кашкадарья">Кашкадарья</option>
                                            <option value="Сырдарья">Сырдарья</option>
                                            <option value="Сурхандарья">Сурхандарья</option>
                                            <option value="Хорезмская область">Хорезмская область</option>
                                        </select>

                                        <button style={{ background: '#64b704', marginTop: '10px' }} type="submit">Отправить</button>
                                    </form>
                                </div>
                            )}

                        </div>
                    </div>
                </div>

                <div className="full_desc_info">
                    <div className="heading_block">
                        <h3>Описание продукта</h3>
                    </div>
                    <div
                        className="fetched_description"
                        dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                </div>
            </div>

            {relatedProducts.length > 0 && (
                <section className="home_product_section" style={{ padding: '0px' }}>
                    <div className="products_section_heading">
                        <div className="general_heading_block">
                            <h2 style={{ marginBottom: '20px' }}>
                                Похожие товары
                            </h2>
                        </div>
                    </div>

                    <div className="products_slider">
                        {relatedProducts.map((rp) => {
                            let rpPrice = rp.price ? rp.price : 'Цена не указана';
                            if (rpPrice !== 'Цена не указана') {
                                rpPrice = rpPrice.replace('&nbsp;', ' ').replace('UZS', 'сӯм');
                            }

                            return (
                                <div className="product_item" key={rp.id}>
                                    <Link href={`/product/${rp.slug}`}>
                                        <img className="product_item__image" src={rp.image?.sourceUrl ?? '/images/products/default.jpg'} alt={rp.image?.altText || rp.name} />
                                    </Link>
                                    <div className="product_meta_box">
                                        {/* <a className="product_item__brand"></a> */}


                                        {rp.brands && rp.brands.nodes.length > 0 && (
                                            <a
                                                href={`/product-brands/${rp.brands.nodes[0].slug}`}
                                                className="product_item__brand"
                                            >
                                                {rp.brands.nodes[0].name}
                                            </a>
                                        )}


                                        <div className="line_highlight"></div>
                                        <Link href={`/product/${rp.slug}`} className="product_item__name">
                                            {rp.name}
                                        </Link>
                                        <span className="product_item__price">
                                            {/* {rpPrice} */}
                                            {rp.convertedPrice}
                                        </span>
                                    </div>
                                    <div className="add_to_cart">
                                        <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/shopping-cart_icon-icons.com_72552-1-1.svg" alt="Корзина" />
                                        <span>В корзину</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* Передаем данные о товаре в клиентский компонент для управления попапами */}
            <ProductInteractionsClient
                productName={product.name}
                productPrice={formattedPrice}
                productImage={mainImage}
            />

        </div>
    );
}