// src/app/checkout/page.tsx
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { CartProvider } from '@/app/context/CartContext';
import { CheckoutProvider } from '@/app/context/CheckoutContext';
import CheckoutForm from './CheckoutForm';
import CheckoutCartItemsClient from '../checkout/CheckoutCartItemsClient.jsx';
import CheckoutCartSummaryUpdate from './CheckoutCartSummaryUpdate';
import '@/app/cart/cart.css';
import './checkout.css';
import AnimatedWrapper from '@/components/animation/AnimatedWrapper';

export const metadata: Metadata = {
    title: 'Оформление заказа',
    description: 'Оформите заказ на доставку товаров с выбором способа доставки и оплаты.',
};

interface ProductImage {
    sourceUrl: string;
}

interface Product {
    id: string;
    name: string;
    slug: string;
    price: string;
    stockStatus: string;
    stockQuantity: number;
    image: ProductImage;
}

interface CartItem {
    productId: string;
    qty: number;
}

interface Cart {
    items: CartItem[];
}

async function fetchSingleProductByID(id: string): Promise<Product | null> {
    const query = `
      query GetSimpleProduct($id: ID!) {
        product(id: $id, idType: ID) {
          id
          name
          slug
          ... on SimpleProduct {
            price
            stockStatus
            stockQuantity
            image {
              sourceUrl
            }
          }
        }
      }
    `;

    const res = await fetch('https://nuxt.vitaline.uz/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables: { id } }),
        cache: 'no-store'
    });

    const json = await res.json();
    console.log(`Response for ID ${id}:`, JSON.stringify(json, null, 2));

    const product = json?.data?.product;
    if (!product || !product.id) {
        return null;
    }

    if (!("price" in product)) {
        return null;
    }

    return product as Product;
}

async function fetchProductsByIds(ids: string[]): Promise<Product[]> {
    if (ids.length === 0) return [];

    const products: Product[] = [];
    for (const id of ids) {
        const p = await fetchSingleProductByID(id);
        if (p) products.push(p);
    }
    return products;
}

// interface CartItemDetailed extends Product {
//     qty: number;
//     maxQty: number;
//     total: number;
// }

interface CartItemDetailed {
    productId: string;
    name: string;
    price: string;
    qty: number;
    maxQty: number;
    total: number;
    image: string;
    // slug: string; // Добавьте, если используется в ссылках
}

export default async function CheckoutPage() {
    const cartCookieName = 'vitaline_cart';
    const cookieStore = await cookies();
    const cartCookie = cookieStore.get(cartCookieName);
    const cartCookieValue = cartCookie?.value;

    const cart: Cart = cartCookieValue ? JSON.parse(cartCookieValue) : { items: [] };
    const productIds = cart.items?.map(i => i.productId) || [];
    const products = await fetchProductsByIds(productIds);

    if (products.length === 0) {
        redirect('/cart');
    }

    // const cartItemsDetailed: CartItemDetailed[] = products.map(p => {
    //     const item = cart.items.find(i => i.productId === p.id);
    //     const qty = item?.qty || 1;
    //     const maxQty = p.stockQuantity || 0;
    //     const priceNum = parseInt(p.price.replace(/[^\d]/g, ''), 10);
    //     return { ...p, qty, maxQty, total: qty * priceNum };
    // });

    const cartItemsDetailed: CartItemDetailed[] = products.map(p => {
        const item = cart.items.find(i => i.productId === p.id);
        const qty = item?.qty || 1;
        const maxQty = p.stockQuantity || 0;
        const priceNum = parseInt(p.price.replace(/[^\d]/g, ''), 10);
        return {
            productId: p.id,
            name: p.name,
            price: p.price,
            qty,
            maxQty,
            total: qty * priceNum,
            image: p.image.sourceUrl
        };
    });


    return (
        <AnimatedWrapper>
            <CartProvider initialCartItems={cartItemsDetailed}>
                <CheckoutProvider>
                    <div className="checkout_section cart_wrapper full">
                        <div className="form-container">
                            <h1>Оформление заказа</h1>
                            <CheckoutForm />
                        </div>

                        <div className="cart_part cart_fill_info">
                            <div className="items">
                                <CheckoutCartItemsClient />
                            </div>
                            <CheckoutCartSummaryUpdate />
                        </div>
                    </div>
                </CheckoutProvider>
            </CartProvider>
        </AnimatedWrapper>
    );
}




