// CartCounter.jsx
'use client';

import { useState, useEffect } from 'react';

const CartCounter = () => {
    const [itemsCount, setItemsCount] = useState(0);

    const getCartItemsCount = () => {
        try {
            const cartData = localStorage.getItem('vitaline_cart');

            if (!cartData) {
                return 0;
            }

            const cart = JSON.parse(cartData);

            const totalItems = cart.items.reduce((sum, item) => {
                return sum + (item.qty || 0);
            }, 0);

            return totalItems;
        } catch (error) {
            console.error('Ошибка при подсчете товаров:', error);
            return 0;
        }
    };

    useEffect(() => {
        // Обновляем состояние при монтировании компонента
        setItemsCount(getCartItemsCount());

        // Функция обновления счетчика
        const handleCartUpdate = () => {
            setItemsCount(getCartItemsCount());
        };

        const handleClick = (e) => {
            // Все кнопки корзины кроме оформления заказа
            if (
                e.target.closest('.add_to_cart') ||
                e.target.closest('.quantity-button') ||
                e.target.closest('.item-remove')
            ) {
                setTimeout(handleCartUpdate, 1200); // 1.2 секунды
            }
            // Кнопка оформления заказа
            else if (e.target.closest('button.cart_checkout-button')) {
                setTimeout(handleCartUpdate, 3000); // 3 секунды
            }
        };

        // Добавляем слушатели событий
        window.addEventListener('cartUpdate', handleCartUpdate); // изменено с 'cartUpdated'
        window.addEventListener('storage', handleCartUpdate);
        document.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('cartUpdate', handleCartUpdate);
            window.removeEventListener('storage', handleCartUpdate);
            document.removeEventListener('click', handleClick);
        };
    }, []);

    return (
        <div className="absolute_count_c">
            <span className="cart_count">
                {itemsCount}
            </span>
        </div>
    );
};

export default CartCounter;