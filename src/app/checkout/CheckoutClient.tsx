// Файл: app/checkout/CheckoutClient.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CartProvider } from '@/app/context/CartContext';
import { CheckoutProvider } from '@/app/context/CheckoutContext';
import MainComponent from './MainComponent';
import '@/app/cart/cart.css';
import './checkout.css';
import CheckoutStyles from './CheckoutStyles';
import AnimatedWrapper from '@/components/animation/AnimatedWrapper';
import { fetchProductsByIds } from './actions';

interface CartItem {
    productId: string;
    qty: number;
    selected: boolean;
}

interface Cart {
    items: CartItem[];
}

interface CartItemDetailed {
    productId: string;
    name: string;
    price: string;
    qty: number;
    maxQty: number;
    total: number;
    image: string;
    slug: string;
    sku: string;
}

export default function CheckoutClient() {
    const [cartItems, setCartItems] = useState<CartItemDetailed[] | null>(null);
    const router = useRouter();

    useEffect(() => {
        const loadCheckoutData = async () => {
            try {
                const cartData = localStorage.getItem('vitaline_cart');
                if (!cartData) {
                    router.push('/cart');
                    return;
                }

                const cart: Cart = JSON.parse(cartData);
                const selectedItems = cart.items.filter((item: CartItem) => item.selected);

                if (selectedItems.length === 0) {
                    router.push('/cart');
                    return;
                }

                const productIds = selectedItems.map((item: CartItem) => item.productId);
                const products = await fetchProductsByIds(productIds);

                if (products.length === 0) {
                    router.push('/cart');
                    return;
                }

                const parsePrice = (p: string): number => {
                    const num = parseInt(p.replace(/[^\d]/g, ''), 10);
                    return isNaN(num) ? 0 : num;
                };

                const cartItemsDetailed = products.map(p => {
                    const item = cart.items.find((i: CartItem) => i.productId === p.id);
                    const qty = item?.qty || 1;
                    const maxQty = p.stockQuantity || 0;
                    const priceNumUSD = parsePrice(p.convertedPrice || '0');

                    return {
                        productId: p.id,
                        name: p.name,
                        price: p.convertedPrice,
                        qty,
                        maxQty,
                        total: qty * priceNumUSD,
                        image: p.image.sourceUrl,
                        slug: p.slug,
                        sku: p.sku,
                    };
                });

                setCartItems(cartItemsDetailed);
            } catch (error) {
                console.error('Error loading checkout data:', error);
                router.push('/cart');
            }
        };

        loadCheckoutData();
    }, [router]);

    if (!cartItems) return null;

    return (
        <AnimatedWrapper>
            <CheckoutStyles />
            <CartProvider initialCartItems={cartItems}>
                <CheckoutProvider>
                    <MainComponent />
                </CheckoutProvider>
            </CartProvider>
        </AnimatedWrapper>
    );
}