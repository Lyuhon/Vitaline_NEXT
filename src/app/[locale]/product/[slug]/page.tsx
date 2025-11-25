// // src/app/product/[slug]/page.tsx
// import { fetchSingleProduct } from '@/lib/fetchSingleProduct';
// import { fetchRelatedProducts } from '@/lib/fetchRelatedProducts';
// import ProductInteractionsClient from '@/components/ProductInteractionsClient';
// import ProductGalleryClient from '@/components/ProductGalleryClient';
// import SKUCopy from "@/components/SKUCopy";
// import AddToCartSection from '../AddToCartSection';
// import AddToCartButtonInList from '@/components/add_to_cart_popup/AddToCartButtonInList';
// import { MiniCartProvider } from '@/app/[locale]/context/MiniCartContext';
// import CleanFullDescInfo from './CleanFullDescInfo';
// import HomeBrands from '@/components/HomeBrands';
// import Link from 'next/link';
// import Image from 'next/image';
// import { headers } from 'next/headers'; // ОГРАНИЧЕНИЕ ПО БРЕНДАМ: Импорт для проверки userType
// import './product.css';

// type Brand = {
//     id: string;
//     name: string;
//     slug: string;
//     brandBanner?: string;
//     brandId?: string;
//     brandThumbnail?: string;
// };

// type Product = {
//     id: string;
//     name: string;
//     slug: string;
//     sku?: string;
//     description: string;
//     shortDescription: string;
//     image?: {
//         sourceUrl?: string;
//         altText?: string;
//     };
//     galleryImages?: {
//         nodes: {
//             sourceUrl: string;
//             altText?: string;
//         }[];
//     };
//     price?: string;
//     convertedPrice?: string;
//     stockStatus?: string; // 'IN_STOCK' или 'OUT_OF_STOCK'
//     stockQuantity?: number; // Добавлено для ясности
//     maxOrderQty?: number | null;
//     productCategories?: {
//         nodes: {
//             name: string;
//             slug: string;
//         }[];
//     };
//     productTags?: {
//         nodes: {
//             name: string;
//             slug: string;
//         }[];
//     };
//     brands?: {
//         nodes: Brand[];
//     };
// };

// interface PageProps {
//     params: { slug: string }; // slug должен быть строкой
//     searchParams?: Record<string, string | string[] | undefined>;
// }

// export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
//     const resolvedParams = await params; // Ждем разрешения промиса
//     const { slug } = resolvedParams; // Извлекаем slug
//     const product: Product | null = await fetchSingleProduct(slug); // Предполагаем, что может вернуть null

//     // ОГРАНИЧЕНИЕ ПО БРЕНДАМ: Проверка userType и бренда товара
//     const headersList = await headers();
//     const userType = headersList.get("x-user-type") as string | null;
//     // const restrictedBrands = ['carlson-labs', 'childlife'];
//     // const hasRestrictedBrand = product?.brands?.nodes?.some((brand) =>
//     //     restrictedBrands.includes(brand.slug)
//     // );
//     // if (!product || (userType === "restricted" && hasRestrictedBrand)) {
//     let restrictedBrands: string[] = [];
//     if (userType === "restricted") {
//         restrictedBrands = ['carlson-labs', 'childlife']; // Исключаем оба бренда
//     } else if (userType === "without_cl") {
//         restrictedBrands = ['childlife']; // Исключаем только childlife
//     }

//     const hasRestrictedBrand = product?.brands?.nodes?.some((brand) =>
//         restrictedBrands.includes(brand.slug)
//     );

//     if (!product || (restrictedBrands.length > 0 && hasRestrictedBrand)) {
//         return (
//             <section className="product-not-found">
//                 <h1>Товар не найден</h1>
//                 <p>
//                     К сожалению, товара нет по этой ссылке.
//                     <br />Ознакомьтесь с ассортиментом витаминов в нашем каталоге!
//                 </p>
//                 <Link href="/shop" className="catalog-link">
//                     Перейти в каталог
//                 </Link>
//                 {/* <HomeBrands /> */}
//             </section>
//         );
//     }

//     const mainImage = product.image?.sourceUrl || '/images/default-product.png';
//     const mainImageAlt = product.image?.altText || product.name;
//     const gallery = product.galleryImages?.nodes || [];

//     const categories = product.productCategories?.nodes || [];
//     const tags = product.productTags?.nodes || [];

//     const inStock = product.stockStatus === 'IN_STOCK';
//     const maxQuantity = product.stockQuantity || 0;

//     // Вычисляем эффективное ограничение
//     const effectiveMaxQty = product.maxOrderQty
//         ? Math.min(product.maxOrderQty, maxQuantity)
//         : maxQuantity;

//     // Функция для парсинга цены в число
//     const parsePrice = (p: string) => {
//         const num = parseInt(p.replace(/[^\d]/g, ''), 10);
//         return isNaN(num) ? 0 : num;
//     };

//     const numericPrice = product.price && product.price !== 'Цена не указана'
//         ? parsePrice(product.price)
//         : 0;

//     // Форматируем цену: заменяем   на пробел, UZS на сӯм
//     let formattedPrice = product.price ? product.price : 'Цена не указана';
//     if (formattedPrice !== 'Цена не указана') {
//         formattedPrice = formattedPrice.replace(/\u00A0/g, ' ').replace('UZS', 'сӯм');
//     }

//     let relatedProducts: Product[] = [];
//     if (categories.length > 0) {
//         const categorySlug = categories[0].slug;
//         relatedProducts = await fetchRelatedProducts(categorySlug, product.slug);
//     }

//     return (
//         <div className="woo_prod_single_template">
//             {/* Остальной JSX код */}
//             <div className="bread_cumbs">
//                 <Link href="/">Главная</Link>
//                 <span className="bread_divider">&gt;</span>
//                 <Link href="/shop">Продукция</Link>
//                 <span className="bread_divider">&gt;</span>
//                 {categories.length > 0 && (
//                     <>
//                         <Link href={`/category/${categories[0].slug}`}>{categories[0].name}</Link>
//                         <span className="bread_divider">&gt;</span>
//                     </>
//                 )}
//                 <Link className="current_bread_cumb" href={`/product/${product.slug}`}>
//                     {product.name}
//                 </Link>
//                 <span className="bread_divider">&gt;</span>
//             </div>

//             <div className="prod_layout">
//                 <div className="galery_and_short_info">
//                     {/* Галерея вынесена в клиентский компонент */}
//                     <ProductGalleryClient
//                         productName={product.name}
//                         mainImage={mainImage}
//                         mainImageAlt={mainImageAlt}
//                         gallery={gallery}
//                         sku={product.sku || ''}
//                     />

//                     <div className="product_short_info_block">
//                         {/* POPUP о подлинности товара */}
//                         <div className="ProductAuthenticity">
//                             <span>100% Оригинальный товар!</span>
//                             <div className="css-rj99sh">
//                                 <a>
//                                     <svg className="css-xof6ih-SvgIcon egfzaxi0" color="inherit" viewBox="0 0 24 24" height="24" width="24">
//                                         <path fillRule="evenodd" clipRule="evenodd" d="M12 22.0001C6.47715 22.0001 2 17.523 2 12.0001C2 6.47727 6.47715 2.00012 12 2.00012C17.5228 2.00012 22 6.47727 22 12.0001C22 17.523 17.5228 22.0001 12 22.0001ZM12 20.0002C16.4182 20.0002 20 16.4185 20 12.0002C20 7.58194 16.4182 4.00022 12 4.00022C7.58168 4.00022 3.99995 7.58194 3.99995 12.0002C3.99995 16.4185 7.58168 20.0002 12 20.0002ZM12 10.0002C12.5523 10.0002 13 10.4479 13 11.0002V17.0002C13 17.5525 12.5523 18.0002 12 18.0002C11.4477 18.0002 11 17.5525 11 17.0002V11.0002C11 10.4479 11.4477 10.0002 12 10.0002ZM12 8.00003C11.4477 8.00003 11 7.55231 11 7.00003C11 6.44774 11.4477 6.00003 12 6.00003C12.5523 6.00003 13 6.44774 13 7.00003C13 7.55231 12.5523 8.00003 12 8.00003Z"></path>
//                                     </svg>
//                                 </a>
//                             </div>
//                         </div>

//                         <h1 className="product_name">{product.name}</h1>

//                         <div className="brand_info">
//                             {product.brands && product.brands.nodes.length > 0 && (
//                                 <Link className="product_item__brand" href={`/product-brands/${product.brands.nodes[0].slug}`}>
//                                     {product.brands.nodes[0].brandThumbnail && (
//                                         <Image
//                                             src={product.brands.nodes[0].brandThumbnail}
//                                             alt={`${product.brands.nodes[0].name} Logo`}
//                                             width={50}
//                                             height={50}
//                                             className="brand_thumbnail"
//                                         />
//                                     )}
//                                     {product.brands.nodes[0].name}
//                                 </Link>
//                             )}
//                         </div>

//                         <div className={`stock_status ${inStock ? '' : 'out_of_stock'}`}>
//                             <span className={inStock ? '' : 'out_of_stock'}>{inStock ? 'В наличии' : 'Нет в наличии'}</span>
//                         </div>

//                         <div className="product_price mobile_visible">
//                             {product.convertedPrice}
//                         </div>

//                         <div className="prod_meta_list">
//                             {product.sku && <SKUCopy sku={product.sku} />}
//                             <div className="cat_and_tag">
//                                 <div className="categories_list">
//                                     <h3>Категории:</h3>
//                                     <div className="list">
//                                         {categories.map(cat => (
//                                             <Link key={cat.slug} href={`/category/${cat.slug}`}>
//                                                 {cat.name}
//                                             </Link>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="product_price pc_visible">
//                                 {product.convertedPrice}
//                             </div>


//                             {product.maxOrderQty && product.maxOrderQty < maxQuantity && (
//                                 <div className="md:mx-[unset] mx-auto max-order-limit px-3 mb-4 md:mt-[-15px] w-[fit-content] py-2 bg-amber-50 border border-amber-200 rounded-md text-sm text-amber-800">
//                                     ⚠️ Максимум {product.maxOrderQty} шт. в одном заказе
//                                 </div>
//                             )}

//                             <MiniCartProvider>
//                                 {inStock && (
//                                     <AddToCartSection
//                                         productId={product.id}
//                                         productName={product.name}
//                                         productImage={mainImage}
//                                         productPrice={numericPrice}
//                                         maxQuantity={effectiveMaxQty}
//                                         stock={inStock}
//                                     />
//                                 )}
//                             </MiniCartProvider>

//                             {!inStock && (
//                                 <div className="product_buttons_block">
//                                     <div className="one_click_order">
//                                         <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/РЎРРѕР№_1-2.svg" alt="Корзина" />
//                                         <span>{inStock ? 'Купить в 1 клик' : 'Сделать предзаказ'}</span>
//                                     </div>
//                                 </div>
//                             )}

//                             {inStock && (
//                                 <div className="service_info">
//                                     <div className="text_info_deleviry_pay">
//                                         <p>Доставка курьером в течение дня</p>
//                                         <br />
//                                         <p>Оплата наличными при получении или переводом через сервисы</p>
//                                     </div>
//                                     <img className="pay_methd_img"
//                                         src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Screenshot_20.png"
//                                         alt="Методы переводов" />
//                                 </div>
//                             )}

//                             {!inStock && (
//                                 <div className="preorder_form_block" style={{ display: 'none' }}>
//                                     <h3>Предзаказ</h3>
//                                     <form>
//                                         <input type="text" placeholder="Ваше имя" name="customer_name" />
//                                         <input type="text" placeholder="Ваш телефон" name="customer_phone" />
//                                         <select className="quick_order_form" aria-required="true" aria-invalid="false" name="your-region">
//                                             <option value="">Выберите Ваш город</option>
//                                             <option value="Город Ташкент">Город Ташкент</option>
//                                             <option value="Ташкентская область">Ташкентская область</option>
//                                             <option value="Самарканд">Самарканд</option>
//                                             <option value="Бухара">Бухара</option>
//                                             <option value="Андижан">Андижан</option>
//                                             <option value="Фергана">Фергана</option>
//                                             <option value="Джизак">Джизак</option>
//                                             <option value="Каракалпакстан">Каракалпакстан</option>
//                                             <option value="Наманган">Наманган</option>
//                                             <option value="Навои">Навои</option>
//                                             <option value="Кашкадарья">Кашкадарья</option>
//                                             <option value="Сырдарья">Сырдарья</option>
//                                             <option value="Сурхандарья">Сурхандарья</option>
//                                             <option value="Хорезмская область">Хорезмская область</option>
//                                         </select>
//                                         <button style={{ background: '#64b704', marginTop: '10px' }} type="submit">Отправить</button>
//                                     </form>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>

//                 <CleanFullDescInfo />

//                 <div className="full_desc_info">
//                     <div className="heading_block">
//                         <h3>Описание продукта</h3>
//                     </div>
//                     <div
//                         className="fetched_description"
//                         dangerouslySetInnerHTML={{ __html: product.description }}
//                     />
//                 </div>
//             </div>

//             {relatedProducts.length > 0 && (
//                 <section className="home_product_section" style={{ padding: '0px' }}>
//                     <div className="products_section_heading">
//                         <div className="general_heading_block">
//                             <h2 style={{ marginBottom: '20px' }}>
//                                 Похожие товары
//                             </h2>
//                         </div>
//                     </div>

//                     <div className="products_slider">
//                         {relatedProducts.map((rp) => {
//                             let rpPrice = rp.price ? rp.price : 'Цена не указана';
//                             if (rpPrice !== 'Цена не указана') {
//                                 rpPrice = rpPrice.replace(' ', ' ').replace('UZS', 'сӯм');
//                             }

//                             // Парсим цену с поддержкой десятичных знаков
//                             const numericPrice = rp.convertedPrice ? parseFloat(rp.convertedPrice.replace(/[^\d.]/g, '')) / 1 : 0;

//                             return (
//                                 <div className="product_item" key={rp.id}>
//                                     <Link href={`/product/${rp.slug}`}>
//                                         <img className="product_item__image" src={rp.image?.sourceUrl ?? '/images/products/default.jpg'} alt={rp.image?.altText || rp.name} />
//                                     </Link>
//                                     <div className="product_meta_box">
//                                         {rp.brands && rp.brands.nodes.length > 0 && (
//                                             <a
//                                                 href={`/product-brands/${rp.brands.nodes[0].slug}`}
//                                                 className="product_item__brand"
//                                             >
//                                                 {rp.brands.nodes[0].name}
//                                             </a>
//                                         )}
//                                         <div className="line_highlight"></div>
//                                         <Link href={`/product/${rp.slug}`} className="product_item__name">
//                                             {rp.name}
//                                         </Link>
//                                         <span className="product_item__price">
//                                             {rp.convertedPrice}
//                                         </span>
//                                     </div>
//                                     <MiniCartProvider>
//                                         <AddToCartButtonInList
//                                             productId={rp.id}
//                                             productName={rp.name}
//                                             productImage={rp.image?.sourceUrl ?? '/images/products/default.jpg'}
//                                             productPrice={numericPrice}
//                                             maxQuantity={rp.stockQuantity || 0}
//                                         />
//                                     </MiniCartProvider>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 </section>
//             )}

//             <ProductInteractionsClient
//                 productName={product.name}
//                 productPrice={formattedPrice}
//                 productImage={mainImage}
//             />
//         </div>
//     );
// }




// src/app/product/[slug]/page.tsx
import { fetchSingleProduct } from '@/lib/fetchSingleProduct';
import { fetchRelatedProducts } from '@/lib/fetchRelatedProducts';
import ProductInteractionsClient from '@/components/ProductInteractionsClient';
import ProductGalleryClient from '@/components/ProductGalleryClient';
import SKUCopy from "@/components/SKUCopy";
import AddToCartSection from '../AddToCartSection';
import AddToCartButtonInList from '@/components/add_to_cart_popup/AddToCartButtonInList';
import { MiniCartProvider } from '@/app/[locale]/context/MiniCartContext';
import CleanFullDescInfo from './CleanFullDescInfo';
import HomeBrands from '@/components/HomeBrands';
import Link from 'next/link';
import Image from 'next/image';
import { headers } from 'next/headers'; // ОГРАНИЧЕНИЕ ПО БРЕНДАМ: Импорт для проверки userType
import './product.css';
import { getTranslations, getLocale } from 'next-intl/server';

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
    maxOrderQty?: number | null;
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
    searchParams?: Record<string, string | string[] | undefined>;
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const t = await getTranslations('product');
    const locale = await getLocale();

    const resolvedParams = await params; // Ждем разрешения промиса
    const { slug } = resolvedParams; // Извлекаем slug
    const product: Product | null = await fetchSingleProduct(slug, locale); // Предполагаем, что может вернуть null

    // ОГРАНИЧЕНИЕ ПО БРЕНДАМ: Проверка userType и бренда товара
    const headersList = await headers();
    const userType = headersList.get("x-user-type") as string | null;
    let restrictedBrands: string[] = [];
    if (userType === "restricted") {
        restrictedBrands = ['carlson-labs', 'childlife']; // Исключаем оба бренда
    } else if (userType === "without_cl") {
        restrictedBrands = ['childlife']; // Исключаем только childlife
    }

    const hasRestrictedBrand = product?.brands?.nodes?.some((brand) =>
        restrictedBrands.includes(brand.slug)
    );

    if (!product || (restrictedBrands.length > 0 && hasRestrictedBrand)) {
        return (
            <section className="product-not-found">
                <h1>{t('notFound')}</h1>
                <p>
                    {t('notFoundMessage')}
                    <br />{t('notFoundSuggestion')}
                </p>
                <Link href={`/${locale}/shop`} className="catalog-link">
                    {t('goToCatalog')}
                </Link>
                {/* <HomeBrands /> */}
            </section>
        );
    }

    const mainImage = product.image?.sourceUrl || '/images/default-product.png';
    const mainImageAlt = product.image?.altText || product.name;
    const gallery = product.galleryImages?.nodes || [];

    const categories = product.productCategories?.nodes || [];
    const tags = product.productTags?.nodes || [];

    const inStock = product.stockStatus === 'IN_STOCK';
    const maxQuantity = product.stockQuantity || 0;

    // Вычисляем эффективное ограничение
    const effectiveMaxQty = product.maxOrderQty
        ? Math.min(product.maxOrderQty, maxQuantity)
        : maxQuantity;

    // Функция для парсинга цены в число
    const parsePrice = (p: string) => {
        const num = parseInt(p.replace(/[^\d]/g, ''), 10);
        return isNaN(num) ? 0 : num;
    };

    const numericPrice = product.price && product.price !== t('priceNotSpecified')
        ? parsePrice(product.price)
        : 0;

    // Форматируем цену: заменяем   на пробел, UZS на сӯм
    let formattedPrice = product.price ? product.price : t('priceNotSpecified');
    if (formattedPrice !== t('priceNotSpecified')) {
        formattedPrice = formattedPrice.replace(/\u00A0/g, ' ').replace('UZS', t('currency'));
    }

    let relatedProducts: Product[] = [];
    if (categories.length > 0) {
        const categorySlug = categories[0].slug;
        // relatedProducts = await fetchRelatedProducts(categorySlug, product.slug, locale);
        relatedProducts = await fetchRelatedProducts(categorySlug, product.slug);
    }

    return (
        <div className="woo_prod_single_template">
            {/* Остальной JSX код */}
            <div className="bread_cumbs">
                <Link href={`/${locale}`}>{t('home')}</Link>
                <span className="bread_divider">&gt;</span>
                <Link href={`/${locale}/shop`}>{t('shop')}</Link>
                <span className="bread_divider">&gt;</span>
                {categories.length > 0 && (
                    <>
                        <Link href={`/${locale}/category/${categories[0].slug}`}>{categories[0].name}</Link>
                        <span className="bread_divider">&gt;</span>
                    </>
                )}
                <Link className="current_bread_cumb" href={`/${locale}/product/${product.slug}`}>
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
                        sku={product.sku || ''}
                    />

                    <div className="product_short_info_block">
                        {/* POPUP о подлинности товара */}
                        <div className="ProductAuthenticity">
                            <span>{t('authenticity')}</span>
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
                                <Link className="product_item__brand" href={`/${locale}/product-brands/${product.brands.nodes[0].slug}`}>
                                    {product.brands.nodes[0].brandThumbnail && (
                                        <Image
                                            src={product.brands.nodes[0].brandThumbnail}
                                            alt={`${product.brands.nodes[0].name} Logo`}
                                            width={50}
                                            height={50}
                                            className="brand_thumbnail"
                                        />
                                    )}
                                    {product.brands.nodes[0].name}
                                </Link>
                            )}
                        </div>

                        <div className={`stock_status ${inStock ? '' : 'out_of_stock'}`}>
                            <span className={inStock ? '' : 'out_of_stock'}>{inStock ? t('inStock') : t('outOfStock')}</span>
                        </div>

                        {inStock && (
                            <div className="product_price mobile_visible">
                                {product.convertedPrice}
                            </div>
                        )}

                        <div className="prod_meta_list">
                            {product.sku && <SKUCopy sku={product.sku} />}
                            <div className="cat_and_tag">
                                <div className="categories_list">
                                    <h3>{t('categories')}:</h3>
                                    <div className="list">
                                        {categories.map(cat => (
                                            <Link key={cat.slug} href={`/${locale}/category/${cat.slug}`}>
                                                {cat.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {inStock && (
                                <div className="product_price pc_visible">
                                    {product.convertedPrice}
                                </div>
                            )}


                            {product.maxOrderQty && product.maxOrderQty < maxQuantity && (
                                <div className="md:mx-[unset] mx-auto max-order-limit px-3 mb-4 md:mt-[-15px] w-[fit-content] py-2 bg-amber-50 border border-amber-200 rounded-md text-sm text-amber-800">
                                    ⚠️ {t('maxOrder', { count: product.maxOrderQty })}
                                </div>
                            )}

                            <MiniCartProvider>
                                {inStock && (
                                    <AddToCartSection
                                        productId={product.id}
                                        productName={product.name}
                                        productImage={mainImage}
                                        productPrice={numericPrice}
                                        maxQuantity={effectiveMaxQty}
                                        stock={inStock}
                                    />
                                )}
                            </MiniCartProvider>

                            {/* {!inStock && (
                                <div className="product_buttons_block">
                                    <div className="one_click_order">
                                        <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/РЎРРѕР№_1-2.svg" alt="Корзина" />
                                        <span>{inStock ? t('buyInOneClick') : t('preOrder')}</span>
                                    </div>
                                </div>
                            )} */}

                            {!inStock && (
                                <div className="product_buttons_block" style={{ display: 'none' }}>
                                    <div className="one_click_order">
                                        {/* <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/РЎРРѕР№_1-2.svg" alt="Корзина" /> */}
                                        <span>{inStock ? t('buyInOneClick') : t('preOrder')}</span>
                                    </div>
                                </div>
                            )}

                            {inStock && (
                                <div className="service_info">
                                    <div className="text_info_deleviry_pay">
                                        <p>{t('deliverySameDay')}</p>
                                        <br />
                                        <p>{t('paymentOnDelivery')}</p>
                                    </div>
                                    <img className="pay_methd_img"
                                        src="/images/pay_method.png"
                                        alt={t('paymentMethods')} />
                                </div>
                            )}

                            {!inStock && (
                                <div className="preorder_form_block" style={{ display: 'none' }}>
                                    <h3>{t('preOrder')}</h3>
                                    <form>
                                        <input type="text" placeholder={t('yourName')} name="customer_name" />
                                        <input type="text" placeholder={t('yourPhone')} name="customer_phone" />
                                        <select className="quick_order_form" aria-required="true" aria-invalid="false" name="your-region">
                                            <option value="">{t('selectCity')}</option>
                                            <option value="Город Ташкент">{t('tashkentCity')}</option>
                                            <option value="Ташкентская область">{t('tashkentRegion')}</option>
                                            <option value="Самарканд">{t('samarkand')}</option>
                                            <option value="Бухара">{t('bukhara')}</option>
                                            <option value="Андижан">{t('andijan')}</option>
                                            <option value="Фергана">{t('fergana')}</option>
                                            <option value="Джизак">{t('jizzakh')}</option>
                                            <option value="Каракалпакстан">{t('karakalpakstan')}</option>
                                            <option value="Наманган">{t('namangan')}</option>
                                            <option value="Навои">{t('navoi')}</option>
                                            <option value="Кашкадарья">{t('kashkadarya')}</option>
                                            <option value="Сырдарья">{t('syrdarya')}</option>
                                            <option value="Сурхандарья">{t('surkhandarya')}</option>
                                            <option value="Хорезмская область">{t('khorezm')}</option>
                                        </select>
                                        <button style={{ background: '#64b704', marginTop: '10px' }} type="submit">{t('send')}</button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <CleanFullDescInfo />

                <div className="full_desc_info">
                    <div className="heading_block">
                        <h3>{t('productDescription')}</h3>
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
                                {t('relatedProducts')}
                            </h2>
                        </div>
                    </div>

                    <div className="products_slider">
                        {relatedProducts.map((rp) => {
                            let rpPrice = rp.price ? rp.price : t('priceNotSpecified');
                            if (rpPrice !== t('priceNotSpecified')) {
                                rpPrice = rpPrice.replace(' ', ' ').replace('UZS', t('currency'));
                            }

                            // Парсим цену с поддержкой десятичных знаков
                            const numericPrice = rp.convertedPrice ? parseFloat(rp.convertedPrice.replace(/[^\d.]/g, '')) / 1 : 0;

                            return (
                                <div className="product_item" key={rp.id}>
                                    <Link href={`/${locale}/product/${rp.slug}`}>
                                        <img className="product_item__image" src={rp.image?.sourceUrl ?? '/images/products/default.jpg'} alt={rp.image?.altText || rp.name} />
                                    </Link>
                                    <div className="product_meta_box">
                                        {rp.brands && rp.brands.nodes.length > 0 && (
                                            <a
                                                href={`/${locale}/product-brands/${rp.brands.nodes[0].slug}`}
                                                className="product_item__brand"
                                            >
                                                {rp.brands.nodes[0].name}
                                            </a>
                                        )}
                                        <div className="line_highlight"></div>
                                        <Link href={`/${locale}/product/${rp.slug}`} className="product_item__name">
                                            {rp.name}
                                        </Link>
                                        <span className="product_item__price">
                                            {rp.convertedPrice}
                                        </span>
                                    </div>
                                    <MiniCartProvider>
                                        <AddToCartButtonInList
                                            productId={rp.id}
                                            productName={rp.name}
                                            productImage={rp.image?.sourceUrl ?? '/images/products/default.jpg'}
                                            productPrice={numericPrice}
                                            maxQuantity={rp.stockQuantity || 0}
                                        />
                                    </MiniCartProvider>
                                </div>
                            );
                        })}
                    </div>
                </section>
            )}

            <ProductInteractionsClient
                productName={product.name}
                productPrice={formattedPrice}
                productImage={mainImage}
            />
        </div>
    );
}