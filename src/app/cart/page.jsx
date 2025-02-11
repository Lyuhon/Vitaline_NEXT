// // // // COOKIES
// // // // src/app/cart/page.jsx
// // // import { cookies } from 'next/headers';
// // // import Link from 'next/link';
// // // import './cart.css';
// // // import CartItemsClient from './CartItemsClient';
// // // import CartSummary from './CartSummaryUpdate';
// // // import { CartProvider } from '../context/CartContext';
// // // import AnimatedWrapper from '@/components/animation/AnimatedWrapper'; // Импортируем AnimatedWrapper

// // // import ForceSelectAllOnLoad from './ForceSelectAllOnLoad';

// // // async function fetchSingleProductByID(id) {
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
// // //             // cache: 'no-store'
// // //             next: { revalidate: 1800 },
// // //         });

// // //         if (!res.ok) {
// // //             console.error(`Network response was not ok for ID ${id}: ${res.statusText}`);
// // //             return null;
// // //         }

// // //         const json = await res.json();
// // //         // Консоль логи для фетченных товаров
// // //         // console.log(`Response for ID ${id}:`, JSON.stringify(json, null, 2));

// // //         const product = json?.data?.product;
// // //         if (!product || !product.id) {
// // //             console.warn(`Product not found or missing ID for ID ${id}`);
// // //             return null;
// // //         }

// // //         if (!("price" in product)) {
// // //             console.warn(`Product with ID ${id} does not have a price`);
// // //             return null;
// // //         }

// // //         return product;
// // //     } catch (error) {
// // //         console.error(`Error fetching product with ID ${id}:`, error);
// // //         return null;
// // //     }
// // // }

// // // async function fetchProductsByIds(ids) {
// // //     if (ids.length === 0) return [];

// // //     // Создаём массив промисов для параллельных запросов
// // //     const fetchPromises = ids.map(id => fetchSingleProductByID(id));

// // //     // Используем Promise.all для выполнения всех запросов параллельно
// // //     const results = await Promise.all(fetchPromises);

// // //     // Фильтруем результаты, удаляя null значения
// // //     const products = results.filter(product => product !== null);

// // //     return products;
// // // }

// // // export const generateMetadata = () => {
// // //     return {
// // //         title: 'Корзина товаров - Vitaline',
// // //         description: 'Корзина с выбранными товарами.',
// // //     };
// // // };

// // // export default async function CartPage() {
// // //     const cartCookieName = 'vitaline_cart';
// // //     const cookieStore = await cookies();
// // //     const cartCookie = cookieStore.get(cartCookieName)?.value;

// // //     const cart = cartCookie ? JSON.parse(cartCookie) : { items: [] };
// // //     const productIds = cart.items?.map(i => i.productId) || [];
// // //     const products = await fetchProductsByIds(productIds);

// // //     if (products.length === 0) {
// // //         return (
// // //             <AnimatedWrapper>
// // //                 <div className="cart_wrapper empty">
// // //                     <img
// // //                         className="empty_cart_image"
// // //                         src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/pngwing.com-1.png"
// // //                         alt="Пустая корзина"
// // //                     />
// // //                     <div className="cart-title">
// // //                         <h1>Корзина пока что пуста</h1>
// // //                     </div>
// // //                     <div className="cart_epmty_info">
// // //                         <p>
// // //                             Воспользуйтесь <Link href="/shop">каталогом продукции</Link> или поиском, чтобы найти всё что нужно.
// // //                         </p>
// // //                     </div>
// // //                 </div>
// // //             </AnimatedWrapper>
// // //         );
// // //     }

// // //     const parsePrice = (p) => {
// // //         const num = parseInt(p.replace(/[^\d]/g, ''), 10);
// // //         return isNaN(num) ? 0 : num;
// // //     };

// // //     const cartItemsDetailed = products.map(p => {
// // //         const item = cart.items.find(i => i.productId === p.id);
// // //         const qty = item?.qty || 1;
// // //         const maxQty = p.stockQuantity || 0;
// // //         const priceNum = parsePrice(p.price || '0');
// // //         // const priceNumUSD = parsePrice(p.convertedPrice || '0');
// // //         const priceNumUSD = parsePrice(p.convertedPrice || '0');

// // //         // SLCT
// // //         // return { ...p, qty, maxQty, total: qty * priceNum, selected: true, };
// // //         return { ...p, qty, maxQty, total: qty * priceNumUSD, selected: true, };
// // //     });

// // //     return (
// // //         <AnimatedWrapper> {/* Оборачиваем содержимое в AnimatedWrapper */}
// // //             <div className="cart_wrapper full">
// // //                 <h1 className="full_cart">Корзина</h1>
// // //                 <div className="cart_fill_info">

// // //                     <CartProvider initialCartItems={cartItemsDetailed}>

// // //                         <ForceSelectAllOnLoad />
// // //                         <div className="cart_flex_block">
// // //                             <div className="items">

// // //                                 {/* Удаляем передачу пропсов, если используем Context API */}
// // //                                 <CartItemsClient />

// // //                             </div>

// // //                             {/* Удаляем передачу пропсов, если используем Context API */}
// // //                             <CartSummary />
// // //                         </div>

// // //                     </CartProvider>

// // //                 </div>
// // //             </div>
// // //         </AnimatedWrapper>
// // //     );
// // // }



// // // LOCAL Storage
// // // src/app/cart/page.jsx
// // 'use client';

// // import { useState, useEffect } from 'react';
// // import Link from 'next/link';
// // import './cart.css';
// // import CartItemsClient from './CartItemsClient';
// // import CartSummary from './CartSummaryUpdate';
// // import { CartProvider } from '../context/CartContext';
// // import AnimatedWrapper from '@/components/animation/AnimatedWrapper';
// // import ForceSelectAllOnLoad from './ForceSelectAllOnLoad';
// // import { getCart } from '@/app/utils/cartStorage';

// // const fetchSingleProductByID = async (id) => {
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
// //             console.error(`Network response was not ok for ID ${id}: ${res.statusText}`);
// //             return null;
// //         }

// //         const json = await res.json();
// //         const product = json?.data?.product;

// //         if (!product || !product.id) {
// //             console.warn(`Product not found or missing ID for ID ${id}`);
// //             return null;
// //         }

// //         if (!("price" in product)) {
// //             console.warn(`Product with ID ${id} does not have a price`);
// //             return null;
// //         }

// //         return product;
// //     } catch (error) {
// //         console.error(`Error fetching product with ID ${id}:`, error);
// //         return null;
// //     }
// // };

// // const fetchProductsByIds = async (ids) => {
// //     if (ids.length === 0) return [];
// //     const fetchPromises = ids.map(id => fetchSingleProductByID(id));
// //     const results = await Promise.all(fetchPromises);
// //     return results.filter(product => product !== null);
// // };

// // const parsePrice = (p) => {
// //     const num = parseInt(p.replace(/[^\d]/g, ''), 10);
// //     return isNaN(num) ? 0 : num;
// // };

// // export default function CartPage() {
// //     const [products, setProducts] = useState([]);
// //     const [loading, setLoading] = useState(true);

// //     useEffect(() => {
// //         const loadCartData = async () => {
// //             try {
// //                 // Получаем данные корзины из localStorage
// //                 const cart = getCart();
// //                 const productIds = cart.items?.map(i => i.productId) || [];

// //                 if (productIds.length === 0) {
// //                     setLoading(false);
// //                     return;
// //                 }

// //                 // Загружаем информацию о продуктах
// //                 const productsData = await fetchProductsByIds(productIds);

// //                 // Формируем детальную информацию о товарах
// //                 const cartItemsDetailed = productsData.map(p => {
// //                     const item = cart.items.find(i => i.productId === p.id);
// //                     const qty = item?.qty || 1;
// //                     const maxQty = p.stockQuantity || 0;
// //                     const priceNumUSD = parsePrice(p.convertedPrice || '0');

// //                     return {
// //                         ...p,
// //                         qty,
// //                         maxQty,
// //                         total: qty * priceNumUSD,
// //                         selected: true,
// //                     };
// //                 });

// //                 setProducts(cartItemsDetailed);
// //             } catch (error) {
// //                 console.error('Error loading cart data:', error);
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };

// //         loadCartData();
// //     }, []);

// //     if (loading) {
// //         return (
// //             <AnimatedWrapper>
// //                 <div className="cart_wrapper">
// //                     <div className="loading">Загрузка корзины...</div>
// //                 </div>
// //             </AnimatedWrapper>
// //         );
// //     }

// //     if (products.length === 0) {
// //         return (
// //             <AnimatedWrapper>
// //                 <div className="cart_wrapper empty">
// //                     <img
// //                         className="empty_cart_image"
// //                         src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/pngwing.com-1.png"
// //                         alt="Пустая корзина"
// //                     />
// //                     <div className="cart-title">
// //                         <h1>Корзина пока что пуста</h1>
// //                     </div>
// //                     <div className="cart_epmty_info">
// //                         <p>
// //                             Воспользуйтесь <Link href="/shop">каталогом продукции</Link> или поиском, чтобы найти всё что нужно.
// //                         </p>
// //                     </div>
// //                 </div>
// //             </AnimatedWrapper>
// //         );
// //     }

// //     return (
// //         <AnimatedWrapper>
// //             <div className="cart_wrapper full">
// //                 <h1 className="full_cart">Корзина</h1>
// //                 <div className="cart_fill_info">
// //                     <CartProvider initialCartItems={products}>
// //                         <ForceSelectAllOnLoad />
// //                         <div className="cart_flex_block">
// //                             <div className="items">
// //                                 <CartItemsClient />
// //                             </div>
// //                             <CartSummary />
// //                         </div>
// //                     </CartProvider>
// //                 </div>
// //             </div>
// //         </AnimatedWrapper>
// //     );
// // }





// // LOCAL Storage
// 'use client';

// import { useEffect, useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import './cart.css';
// import CartItemsClient from './CartItemsClient';
// import CartSummary from './CartSummaryUpdate';
// import { CartProvider } from '../context/CartContext';
// import AnimatedWrapper from '@/components/animation/AnimatedWrapper';
// import ForceSelectAllOnLoad from './ForceSelectAllOnLoad';

// async function fetchSingleProductByID(id) {
//     const query = `
//       query GetSimpleProduct($id: ID!) {
//         product(id: $id, idType: ID) {
//           id 
//           name
//           slug
//           sku 
//           ... on SimpleProduct {
//             price
//             convertedPrice 
//             stockStatus
//             stockQuantity
//             image {
//               sourceUrl
//             }
//           }
//         }
//       }
//     `;

//     try {
//         const res = await fetch('https://nuxt.vitaline.uz/graphql', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ query, variables: { id } }),
//             next: { revalidate: 1800 },
//         });

//         if (!res.ok) {
//             console.error(`Network response was not ok for ID ${id}: ${res.statusText}`);
//             return null;
//         }

//         const json = await res.json();
//         const product = json?.data?.product;

//         if (!product || !product.id) {
//             console.warn(`Product not found or missing ID for ID ${id}`);
//             return null;
//         }

//         if (!("price" in product)) {
//             console.warn(`Product with ID ${id} does not have a price`);
//             return null;
//         }

//         return product;
//     } catch (error) {
//         console.error(`Error fetching product with ID ${id}:`, error);
//         return null;
//     }
// }

// async function fetchProductsByIds(ids) {
//     if (ids.length === 0) return [];
//     const fetchPromises = ids.map(id => fetchSingleProductByID(id));
//     const results = await Promise.all(fetchPromises);
//     const products = results.filter(product => product !== null);
//     return products;
// }

// function CartPage() {
//     const [cartItems, setCartItems] = useState(null);
//     const [isMobile, setIsMobile] = useState(false);

//     useEffect(() => {
//         const checkMobile = () => {
//             setIsMobile(window.innerWidth <= 768);
//         };

//         checkMobile();
//         window.addEventListener('resize', checkMobile);

//         if (isMobile) {
//             window.scrollTo(0, 0);
//         }

//         return () => window.removeEventListener('resize', checkMobile);
//     }, [isMobile]);

//     useEffect(() => {
//         const loadCartData = async () => {
//             try {
//                 const cartData = localStorage.getItem('vitaline_cart');

//                 if (!cartData) {
//                     setCartItems([]);
//                     return;
//                 }

//                 const cart = JSON.parse(cartData);

//                 if (!cart.items || cart.items.length === 0) {
//                     setCartItems([]);
//                     return;
//                 }

//                 const productIds = cart.items.map(i => i.productId);
//                 const products = await fetchProductsByIds(productIds);

//                 const parsePrice = (p) => {
//                     const num = parseInt(p.replace(/[^\d]/g, ''), 10);
//                     return isNaN(num) ? 0 : num;
//                 };

//                 const cartItemsDetailed = products.map(p => {
//                     const item = cart.items.find(i => i.productId === p.id);
//                     const qty = item?.qty || 1;
//                     const maxQty = p.stockQuantity || 0;
//                     const priceNumUSD = parsePrice(p.convertedPrice || '0');
//                     return { ...p, qty, maxQty, total: qty * priceNumUSD, selected: true };
//                 });

//                 setCartItems(cartItemsDetailed);
//             } catch (error) {
//                 console.error('Error loading cart data:', error);
//                 setCartItems([]);
//             }
//         };

//         loadCartData();
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

//     if (cartItems.length === 0) {
//         return (
//             <AnimatedWrapper>
//                 <div className="cart_wrapper empty">
//                     <img
//                         className="empty_cart_image"
//                         src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/pngwing.com-1.png"
//                         alt="Пустая корзина"
//                     />
//                     <div className="cart-title">
//                         <h1>Корзина пока что пуста</h1>
//                     </div>
//                     <div className="cart_epmty_info">
//                         <p>
//                             Воспользуйтесь <Link href="/shop">каталогом продукции</Link> или поиском, чтобы найти всё что нужно.
//                         </p>
//                     </div>
//                 </div>
//             </AnimatedWrapper>
//         );
//     }

//     return (
//         <AnimatedWrapper>
//             <div className="cart_wrapper full">
//                 <h1 className="full_cart">Корзина</h1>
//                 <div className="cart_fill_info">
//                     <CartProvider initialCartItems={cartItems}>
//                         <ForceSelectAllOnLoad />
//                         <div className="cart_flex_block">
//                             <div className="items">
//                                 <CartItemsClient />
//                             </div>
//                             <CartSummary />
//                         </div>
//                     </CartProvider>
//                 </div>
//             </div>
//         </AnimatedWrapper>
//     );
// }

// export default CartPage;


// app/cart/page.tsx
import { Suspense } from 'react';
import CartClient from './CartClient';
import Loading from './loading';

export default function Page() {
    return (
        <Suspense fallback={<Loading />}>
            <CartClient />
        </Suspense>
    );
}