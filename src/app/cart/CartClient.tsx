// // app/cart/CartClient.tsx
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
// import { fetchProductsByIds } from './actions';

// interface CartItem {
//     productId: string;
//     qty: number;
//     selected: boolean;
// }

// interface Cart {
//     items: CartItem[];
// }

// interface CartItemDetailed extends Product {
//     qty: number;
//     maxQty: number;
//     total: number;
//     selected: boolean;
// }

// export default function CartClient() {
//     const [cartItems, setCartItems] = useState<CartItemDetailed[] | null>(null);
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

//                 const cart: Cart = JSON.parse(cartData);

//                 if (!cart.items || cart.items.length === 0) {
//                     setCartItems([]);
//                     return;
//                 }

//                 const productIds = cart.items.map(i => i.productId);
//                 const products = await fetchProductsByIds(productIds);

//                 const parsePrice = (p: string): number => {
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


'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './cart.css';
import CartItemsClient from './CartItemsClient';
import CartSummary from './CartSummaryUpdate';
import { CartProvider } from '../context/CartContext';
import AnimatedWrapper from '@/components/animation/AnimatedWrapper';
import ForceSelectAllOnLoad from './ForceSelectAllOnLoad';
import { fetchProductsByIds } from './actions';

interface ProductImage {
    sourceUrl: string;
}

interface Product {
    id: string;
    name: string;
    slug: string;
    sku: string;
    price: string;
    convertedPrice: string;
    stockStatus: string;
    stockQuantity: number;
    image: ProductImage;
}

interface CartItem {
    productId: string;
    qty: number;
    selected: boolean;
}

interface Cart {
    items: CartItem[];
}

interface CartItemDetailed extends Product {
    qty: number;
    maxQty: number;
    total: number;
    selected: boolean;
}

export default function CartClient() {
    const [cartItems, setCartItems] = useState<CartItemDetailed[] | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        if (isMobile) {
            window.scrollTo(0, 0);
        }

        return () => window.removeEventListener('resize', checkMobile);
    }, [isMobile]);

    useEffect(() => {
        const loadCartData = async () => {
            try {
                const cartData = localStorage.getItem('vitaline_cart');

                if (!cartData) {
                    setCartItems([]);
                    return;
                }

                const cart: Cart = JSON.parse(cartData);

                if (!cart.items || cart.items.length === 0) {
                    setCartItems([]);
                    return;
                }

                const productIds = cart.items.map(i => i.productId);
                const products = await fetchProductsByIds(productIds);

                const parsePrice = (p: string): number => {
                    const num = parseInt(p.replace(/[^\d]/g, ''), 10);
                    return isNaN(num) ? 0 : num;
                };

                const cartItemsDetailed = products.map(p => {
                    const item = cart.items.find(i => i.productId === p.id);
                    const qty = item?.qty || 1;
                    const maxQty = p.stockQuantity || 0;
                    const priceNumUSD = parsePrice(p.convertedPrice || '0');
                    return { ...p, qty, maxQty, total: qty * priceNumUSD, selected: true };
                });

                setCartItems(cartItemsDetailed);
            } catch (error) {
                console.error('Error loading cart data:', error);
                setCartItems([]);
            }
        };

        loadCartData();
    }, []);

    if (cartItems === null) {
        return (
            <div className="loading-container">
                <Image
                    src="/vitaline-logo.webp"
                    alt="Vitaline Logo"
                    width={200}
                    height={120}
                    priority
                    className="loading-image"
                />
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <AnimatedWrapper>
                <div className="cart_wrapper empty">
                    <img
                        className="empty_cart_image"
                        src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/pngwing.com-1.png"
                        alt="Пустая корзина"
                    />
                    <div className="cart-title">
                        <h1>Корзина пока что пуста</h1>
                    </div>
                    <div className="cart_epmty_info">
                        <p>
                            Воспользуйтесь <Link href="/shop">каталогом продукции</Link> или поиском, чтобы найти всё что нужно.
                        </p>
                    </div>
                </div>
            </AnimatedWrapper>
        );
    }

    return (
        <AnimatedWrapper>
            <div className="cart_wrapper full">
                <h1 className="full_cart">Корзина</h1>
                <div className="cart_fill_info">
                    <CartProvider initialCartItems={cartItems}>
                        <ForceSelectAllOnLoad />
                        <div className="cart_flex_block">
                            <div className="items">
                                <CartItemsClient />
                            </div>
                            <CartSummary />
                        </div>
                    </CartProvider>
                </div>
            </div>
        </AnimatedWrapper>
    );
}