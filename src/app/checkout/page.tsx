// // // // COOKIES
// // // // src/app/checkout/page.tsx
// // // import { Metadata } from 'next';
// // // import { cookies } from 'next/headers';
// // // import { redirect } from 'next/navigation';
// // // import { CartProvider } from '@/app/context/CartContext';
// // // import { CheckoutProvider } from '@/app/context/CheckoutContext';
// // // import MainComponent from './MainComponent';
// // // import '@/app/cart/cart.css';
// // // import './checkout.css';
// // // // page.tsx
// // // import CheckoutStyles from './CheckoutStyles';
// // // import AnimatedWrapper from '@/components/animation/AnimatedWrapper';

// // // export const metadata: Metadata = {
// // //     title: 'Оформление заказа',
// // //     description: 'Оформите заказ на доставку товаров с выбором способа доставки и оплаты.',
// // // };

// // // interface ProductImage {
// // //     sourceUrl: string;
// // // }

// // // interface Product {
// // //     id: string;
// // //     name: string;
// // //     slug: string;
// // //     sku: string;
// // //     price: string;
// // //     convertedPrice: string;
// // //     stockStatus: string;
// // //     stockQuantity: number;
// // //     image: ProductImage;
// // // }

// // // interface CartItem {
// // //     productId: string;
// // //     qty: number;
// // //     selected: boolean;
// // // }

// // // interface Cart {
// // //     items: CartItem[];
// // // }

// // // interface CartItemDetailed {
// // //     productId: string;
// // //     name: string;
// // //     price: string;
// // //     qty: number;
// // //     maxQty: number;
// // //     total: number;
// // //     image: string;
// // //     slug: string;
// // //     sku: string;
// // // }

// // // // Функция для получения значения куки по имени
// // // function getCookieValue(name: string): string | null {
// // //     if (typeof document === 'undefined') return null; // Для серверного рендеринга
// // //     const value = `; ${document.cookie}`;
// // //     const parts = value.split(`; ${name}=`);
// // //     if (parts.length === 2) return decodeURIComponent(parts.pop()!.split(';').shift()!);
// // //     return null;
// // // }

// // // // Функция для декодирования Base64 (если необходимо)
// // // const decodeBase64 = (str: string): string => {
// // //     try {
// // //         return Buffer.from(str, 'base64').toString('utf-8');
// // //     } catch (e) {
// // //         console.error('Ошибка декодирования Base64:', e);
// // //         return str;
// // //     }
// // // };

// // // // Асинхронная функция для получения одного продукта по ID
// // // async function fetchSingleProductByID(id: string): Promise<Product | null> {
// // //     const query = `
// // //       query GetSimpleProduct($id: ID!) {
// // //         product(id: $id, idType: ID) {
// // //           id
// // //           name
// // //           slug
// // //           sku
// // //           ... on SimpleProduct {
// // //             price
// // //             convertedPrice
// // //             stockStatus
// // //             stockQuantity
// // //             image {
// // //               sourceUrl
// // //             }
// // //           }
// // //         }
// // //       }
// // //     `;

// // //     try {
// // //         const res = await fetch('https://nuxt.vitaline.uz/graphql', {
// // //             method: 'POST',
// // //             headers: { 'Content-Type': 'application/json' },
// // //             body: JSON.stringify({ query, variables: { id } }),
// // //             // cache: 'no-store',
// // //             next: { revalidate: 1800 },
// // //         });

// // //         if (!res.ok) {
// // //             console.error(`Сетевая ошибка при запросе продукта с ID ${id}: ${res.statusText}`);
// // //             return null;
// // //         }

// // //         const json = await res.json();
// // //         console.log(`Ответ для ID ${id}:`, JSON.stringify(json, null, 2));

// // //         const product = json?.data?.product;
// // //         if (!product || !product.id) {
// // //             console.warn(`Продукт не найден или отсутствует ID для ID ${id}`);
// // //             return null;
// // //         }

// // //         if (!("price" in product)) {
// // //             console.warn(`У продукта с ID ${id} отсутствует поле price`);
// // //             return null;
// // //         }

// // //         return product as Product;
// // //     } catch (error) {
// // //         console.error(`Ошибка при получении продукта с ID ${id}:`, error);
// // //         return null;
// // //     }
// // // }

// // // // Асинхронная функция для получения нескольких продуктов параллельно
// // // async function fetchProductsByIds(ids: string[]): Promise<Product[]> {
// // //     if (ids.length === 0) return [];

// // //     // Создаём массив промисов для параллельных запросов
// // //     const fetchPromises = ids.map(id => fetchSingleProductByID(id));

// // //     // Выполняем все запросы параллельно
// // //     const results = await Promise.all(fetchPromises);

// // //     // Фильтруем успешные результаты
// // //     const products = results.filter((product): product is Product => product !== null);

// // //     return products;
// // // }

// // // export default async function CheckoutPage() {
// // //     const cartCookieName = 'vitaline_cart';
// // //     const cookieStore = await cookies();
// // //     const cartCookie = cookieStore.get(cartCookieName)?.value;

// // //     const cart: Cart = cartCookie ? JSON.parse(cartCookie) : { items: [] };

// // //     // Фильтруем только выбранные товары
// // //     const selectedItems = cart.items?.filter(i => i.selected) || [];
// // //     const productIds = selectedItems.map(i => i.productId);

// // //     // Получаем продукты параллельно
// // //     const products = await fetchProductsByIds(productIds);

// // //     // Если нет продуктов, перенаправляем на страницу корзины
// // //     if (products.length === 0) {
// // //         redirect('/cart');
// // //     }

// // //     // Функция для парсинга цены
// // //     const parsePrice = (p: string): number => {
// // //         const num = parseInt(p.replace(/[^\d]/g, ''), 10);
// // //         return isNaN(num) ? 0 : num;
// // //     };

// // //     // Создаём детализированные элементы корзины
// // //     const cartItemsDetailed: CartItemDetailed[] = products.map(p => {
// // //         const item = cart.items.find(i => i.productId === p.id);
// // //         const qty = item?.qty || 1;
// // //         const maxQty = p.stockQuantity || 0;
// // //         const priceNumUSD = parsePrice(p.convertedPrice || '0');

// // //         return {
// // //             productId: p.id,
// // //             name: p.name,
// // //             price: p.convertedPrice,
// // //             qty,
// // //             maxQty,
// // //             total: qty * priceNumUSD,
// // //             image: p.image.sourceUrl,
// // //             slug: p.slug,
// // //             sku: p.sku,
// // //         };
// // //     });

// // //     return (
// // //         <AnimatedWrapper>
// // //             <CheckoutStyles />
// // //             <CartProvider initialCartItems={cartItemsDetailed}>
// // //                 <CheckoutProvider>
// // //                     <MainComponent />
// // //                 </CheckoutProvider>
// // //             </CartProvider>
// // //         </AnimatedWrapper>
// // //     );
// // // }


// // // LOCAL Storage
// // // src/app/checkout/page.jsx
// // 'use client';

// // import { useEffect, useState } from 'react';
// // import { redirect } from 'next/navigation';
// // import { CartProvider } from '@/app/context/CartContext';
// // import { CheckoutProvider } from '@/app/context/CheckoutContext';
// // import MainComponent from './MainComponent';
// // import '@/app/cart/cart.css';
// // import './checkout.css';
// // import CheckoutStyles from './CheckoutStyles';
// // import AnimatedWrapper from '@/components/animation/AnimatedWrapper';
// // import Image from 'next/image';

// // interface ProductImage {
// //     sourceUrl: string;
// // }

// // interface Product {
// //     id: string;
// //     name: string;
// //     slug: string;
// //     sku: string;
// //     price: string;
// //     convertedPrice: string;
// //     stockStatus: string;
// //     stockQuantity: number;
// //     image: ProductImage;
// // }

// // interface CartItem {
// //     productId: string;
// //     qty: number;
// //     selected: boolean;
// // }

// // interface Cart {
// //     items: CartItem[];
// // }

// // interface CartItemDetailed {
// //     productId: string;
// //     name: string;
// //     price: string;
// //     qty: number;
// //     maxQty: number;
// //     total: number;
// //     image: string;
// //     slug: string;
// //     sku: string;
// // }

// // async function fetchSingleProductByID(id: string): Promise<Product | null> {
// //     const query = `
// //       query GetSimpleProduct($id: ID!) {
// //         product(id: $id, idType: ID) {
// //           id
// //           name
// //           slug
// //           sku
// //           ... on SimpleProduct {
// //             price
// //             convertedPrice
// //             stockStatus
// //             stockQuantity
// //             image {
// //               sourceUrl
// //             }
// //           }
// //         }
// //       }
// //     `;

// //     try {
// //         const res = await fetch('https://nuxt.vitaline.uz/graphql', {
// //             method: 'POST',
// //             headers: { 'Content-Type': 'application/json' },
// //             body: JSON.stringify({ query, variables: { id } }),
// //             next: { revalidate: 1800 },
// //         });

// //         if (!res.ok) {
// //             console.error(`Сетевая ошибка при запросе продукта с ID ${id}: ${res.statusText}`);
// //             return null;
// //         }

// //         const json = await res.json();
// //         const product = json?.data?.product;

// //         if (!product || !product.id) {
// //             console.warn(`Продукт не найден или отсутствует ID для ID ${id}`);
// //             return null;
// //         }

// //         if (!("price" in product)) {
// //             console.warn(`У продукта с ID ${id} отсутствует поле price`);
// //             return null;
// //         }

// //         return product as Product;
// //     } catch (error) {
// //         console.error(`Ошибка при получении продукта с ID ${id}:`, error);
// //         return null;
// //     }
// // }

// // async function fetchProductsByIds(ids: string[]): Promise<Product[]> {
// //     if (ids.length === 0) return [];
// //     const fetchPromises = ids.map(id => fetchSingleProductByID(id));
// //     const results = await Promise.all(fetchPromises);
// //     const products = results.filter((product): product is Product => product !== null);
// //     return products;
// // }

// // export default function CheckoutPage() {
// //     const [cartItems, setCartItems] = useState<CartItemDetailed[] | null>(null);

// //     useEffect(() => {
// //         const loadCheckoutData = async () => {
// //             try {
// //                 const cartData = localStorage.getItem('vitaline_cart');
// //                 if (!cartData) {
// //                     redirect('/cart');
// //                     return;
// //                 }

// //                 const cart: Cart = JSON.parse(cartData);
// //                 const selectedItems = cart.items?.filter(i => i.selected) || [];

// //                 if (selectedItems.length === 0) {
// //                     redirect('/cart');
// //                     return;
// //                 }

// //                 const productIds = selectedItems.map(i => i.productId);
// //                 const products = await fetchProductsByIds(productIds);

// //                 if (products.length === 0) {
// //                     redirect('/cart');
// //                     return;
// //                 }

// //                 const parsePrice = (p: string): number => {
// //                     const num = parseInt(p.replace(/[^\d]/g, ''), 10);
// //                     return isNaN(num) ? 0 : num;
// //                 };

// //                 const cartItemsDetailed: CartItemDetailed[] = products.map(p => {
// //                     const item = cart.items.find(i => i.productId === p.id);
// //                     const qty = item?.qty || 1;
// //                     const maxQty = p.stockQuantity || 0;
// //                     const priceNumUSD = parsePrice(p.convertedPrice || '0');

// //                     return {
// //                         productId: p.id,
// //                         name: p.name,
// //                         price: p.convertedPrice,
// //                         qty,
// //                         maxQty,
// //                         total: qty * priceNumUSD,
// //                         image: p.image.sourceUrl,
// //                         slug: p.slug,
// //                         sku: p.sku,
// //                     };
// //                 });

// //                 setCartItems(cartItemsDetailed);
// //             } catch (error) {
// //                 console.error('Error loading checkout data:', error);
// //                 redirect('/cart');
// //             }
// //         };

// //         loadCheckoutData();
// //     }, []);

// //     if (cartItems === null) {
// //         return (
// //             <div className="loading-container">
// //                 <Image
// //                     src="/vitaline-logo.webp"
// //                     alt="Vitaline Logo"
// //                     width={200}
// //                     height={120}
// //                     priority
// //                     className="loading-image"
// //                 />
// //             </div>
// //         );
// //     }

// //     return (
// //         <AnimatedWrapper>
// //             <CheckoutStyles />
// //             <CartProvider initialCartItems={cartItems}>
// //                 <CheckoutProvider>
// //                     <MainComponent />
// //                 </CheckoutProvider>
// //             </CartProvider>
// //         </AnimatedWrapper>
// //     );
// // }



// // LOCAL Storage
// // src/app/checkout/page.jsx
// 'use client';

// import { useEffect, useState } from 'react';
// import { redirect } from 'next/navigation';
// import { CartProvider } from '@/app/context/CartContext';
// import { CheckoutProvider } from '@/app/context/CheckoutContext';
// import MainComponent from './MainComponent';
// import '@/app/cart/cart.css';
// import './checkout.css';
// import CheckoutStyles from './CheckoutStyles';
// import AnimatedWrapper from '@/components/animation/AnimatedWrapper';
// import Image from 'next/image';
// import { fetchProductsByIds } from './productFetcher';

// interface CartItemDetailed {
//     productId: string;
//     name: string;
//     price: string;
//     qty: number;
//     maxQty: number;
//     total: number;
//     image: string;
//     slug: string;
//     sku: string;
// }

// interface CartItem {
//     productId: string;
//     qty: number;
//     selected: boolean;
// }

// interface Cart {
//     items: CartItem[];
// }

// export default function CheckoutPage() {
//     const [cartItems, setCartItems] = useState<CartItemDetailed[] | null>(null);

//     useEffect(() => {
//         const loadCheckoutData = async () => {
//             try {
//                 const cartData = localStorage.getItem('vitaline_cart');
//                 if (!cartData) {
//                     redirect('/cart');
//                     return;
//                 }

//                 const cart: Cart = JSON.parse(cartData);
//                 const selectedItems = cart.items?.filter(i => i.selected) || [];

//                 if (selectedItems.length === 0) {
//                     redirect('/cart');
//                     return;
//                 }

//                 const productIds = selectedItems.map(i => i.productId);
//                 const products = await fetchProductsByIds(productIds);

//                 if (products.length === 0) {
//                     redirect('/cart');
//                     return;
//                 }

//                 const parsePrice = (p: string): number => {
//                     const num = parseInt(p.replace(/[^\d]/g, ''), 10);
//                     return isNaN(num) ? 0 : num;
//                 };

//                 const cartItemsDetailed: CartItemDetailed[] = products.map(p => {
//                     const item = cart.items.find(i => i.productId === p.id);
//                     const qty = item?.qty || 1;
//                     const maxQty = p.stockQuantity || 0;
//                     const priceNumUSD = parsePrice(p.convertedPrice || '0');

//                     return {
//                         productId: p.id,
//                         name: p.name,
//                         price: p.convertedPrice,
//                         qty,
//                         maxQty,
//                         total: qty * priceNumUSD,
//                         image: p.image.sourceUrl,
//                         slug: p.slug,
//                         sku: p.sku,
//                     };
//                 });

//                 setCartItems(cartItemsDetailed);
//             } catch (error) {
//                 console.error('Error loading checkout data:', error);
//                 redirect('/cart');
//             }
//         };

//         loadCheckoutData();
//     }, []);

//     if (cartItems === null) {
//         return (
//             <div className="loading-container">
//                 <Image
//                     src="/vitaline-logo.webp"
//                     alt="Vitaline Logo"
//                     width={200}
//                     height={120}
//                     priority
//                     className="loading-image"
//                 />
//             </div>
//         );
//     }

//     return (
//         <AnimatedWrapper>
//             <CheckoutStyles />
//             <CartProvider initialCartItems={cartItems}>
//                 <CheckoutProvider>
//                     <MainComponent />
//                 </CheckoutProvider>
//             </CartProvider>
//         </AnimatedWrapper>
//     );
// }



// Файл: app/checkout/page.tsx
import { Suspense } from 'react';
import CheckoutClient from './CheckoutClient';
import Loading from './loading';

export default function Page() {
    return (
        <Suspense fallback={<Loading />}>
            <CheckoutClient />
        </Suspense>
    );
}