// src/lib/cartStorage.js
export const CART_STORAGE_KEY = 'vitaline_cart';

export function getCart() {
    if (typeof window === 'undefined') return { items: [] };

    try {
        const cart = localStorage.getItem(CART_STORAGE_KEY);
        return cart ? JSON.parse(cart) : { items: [] };
    } catch (error) {
        console.error('Error getting cart from localStorage:', error);
        return { items: [] };
    }
}

export function updateCart(cart) {
    if (typeof window === 'undefined') return;

    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
        console.error('Error updating cart in localStorage:', error);
    }
}

export function addToCart(product) {
    const cart = getCart();
    const existingItem = cart.items.find(item => item.productId === product.productId);

    if (existingItem) {
        existingItem.qty = product.quantity;
        existingItem.name = product.name;
        existingItem.image = product.image;
        existingItem.price = product.price;
        existingItem.maxQuantity = product.maxQuantity;
        existingItem.selected = true;
    } else {
        cart.items.push({
            productId: product.productId,
            qty: product.quantity,
            name: product.name,
            image: product.image,
            price: product.price,
            maxQuantity: product.maxQuantity,
            selected: true,
        });
    }

    updateCart(cart);
    return cart;
}