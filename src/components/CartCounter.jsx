'use client';

import { useState, useEffect } from 'react';

const CartCounter = () => {
    const [itemsCount, setItemsCount] = useState(0);

    const getCartItemsCount = () => {
        try {
            const cookies = document.cookie.split(';');
            const cartCookie = cookies
                .find(cookie => cookie.trim().startsWith('vitaline_cart='));

            if (!cartCookie) {
                return 0;
            }

            const cartData = JSON.parse(
                decodeURIComponent(cartCookie.split('=')[1].trim())
            );

            const totalItems = cartData.items.reduce((sum, item) => {
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

        // Слушаем клики по элементам с определенным классом
        // const handleClick = (e) => {
        //     if (
        //         e.target.closest('.add_to_cart') || // для класса
        //         e.target.closest('.quantity-button') ||
        //         e.target.closest('.item-remove') ||
        //         e.target.closest('button.cart_checkout-button')
        //     ) {
        //         setTimeout(handleCartUpdate, 1200); // небольшая задержка, чтобы дождаться обновления cookie
        //     }
        // };

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
        window.addEventListener('cartUpdated', handleCartUpdate);
        window.addEventListener('storage', handleCartUpdate);
        document.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('cartUpdated', handleCartUpdate);
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