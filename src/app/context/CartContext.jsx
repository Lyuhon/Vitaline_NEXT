// // src/context/CartContext.jsx
// 'use client';

// import React, { createContext, useState, useEffect } from 'react';

// // Создаём контекст
// export const CartContext = createContext();

// // Провайдер контекста
// export const CartProvider = ({ children, initialCartItems }) => {
//     const [items, setItems] = useState([]);
//     const [selectAll, setSelectAll] = useState(true);
//     const [totalPrice, setTotalPrice] = useState(0);
//     const [totalItems, setTotalItems] = useState(0);
//     const [deliveryPrice] = useState(25000); // Доставка фиксированная
//     const [finalPrice, setFinalPrice] = useState(0);

//     // Функция для парсинга цены
//     const parsePrice = (price) => {
//         const num = parseInt(price.toString().replace(/\D/g, ''), 10);
//         return isNaN(num) ? 0 : num;
//     };

//     // Функция для обновления куки
//     const updateCookies = (updatedItems) => {
//         document.cookie = `vitaline_cart=${encodeURIComponent(JSON.stringify({
//             items: updatedItems.map(item => ({
//                 productId: item.id,
//                 qty: item.qty
//             }))
//         }))}; Path=/; Max-Age=31536000;`;
//     };

//     // Инициализация корзины при монтировании
//     useEffect(() => {
//         // Корректируем количество товаров в корзине согласно актуальным данным о наличии
//         const adjustedItems = initialCartItems.map(item => {
//             if (item.qty > item.maxQty) {
//                 return {
//                     ...item,
//                     qty: item.maxQty > 0 ? item.maxQty : 1, // Минимум 1, если maxQty 0
//                     total: (item.maxQty > 0 ? item.maxQty : 1) * parsePrice(item.price)
//                 };
//             }
//             return item;
//         });

//         setItems(adjustedItems);

//         // Проверяем, были ли произведены корректировки
//         const wasAdjusted = initialCartItems.some((item, index) => item.qty !== adjustedItems[index].qty);

//         if (wasAdjusted) {
//             updateCookies(adjustedItems);
//         }
//     }, [initialCartItems]);

//     // Обновление общей суммы, количества и финальной цены при изменении элементов
//     useEffect(() => {
//         const total = items.reduce((acc, item) => item.selected ? acc + item.total : acc, 0);
//         const selectedItemsCount = items.filter(item => item.selected).length;

//         setTotalPrice(total);
//         setTotalItems(selectedItemsCount);
//         setFinalPrice(total + deliveryPrice);
//     }, [items, deliveryPrice]);

//     // Обновление состояния "Выделить все" при изменении выбранных товаров
//     useEffect(() => {
//         const allSelected = items.length > 0 && items.every(item => item.selected);
//         setSelectAll(allSelected);
//     }, [items]);

//     // Функция для переключения состояния "Выделить все"
//     const toggleSelectAll = () => {
//         const newSelectAll = !selectAll;
//         setSelectAll(newSelectAll);
//         const updatedItems = items.map(item => ({ ...item, selected: newSelectAll }));
//         setItems(updatedItems);
//     };

//     // Функция для переключения выбора отдельного товара
//     const toggleItemSelection = (itemId) => {
//         const updatedItems = items.map(item =>
//             item.id === itemId ? { ...item, selected: !item.selected } : item
//         );
//         setItems(updatedItems);
//     };

//     // Функция для изменения количества товара
//     const handleItemQuantityChange = (itemId, newQty) => {
//         const updatedItems = items.map(item =>
//             item.id === itemId
//                 ? {
//                     ...item,
//                     qty: newQty > item.maxQty ? item.maxQty : newQty, // Ограничение максимального количества
//                     total: (newQty > item.maxQty ? item.maxQty : newQty) * parsePrice(item.price)
//                 }
//                 : item
//         );
//         setItems(updatedItems);
//         updateCookies(updatedItems);
//     };

//     const value = {
//         items,
//         selectAll,
//         toggleSelectAll,
//         toggleItemSelection,
//         handleItemQuantityChange,
//         parsePrice,
//         totalPrice,
//         totalItems,
//         deliveryPrice,
//         finalPrice,
//     };

//     return (
//         <CartContext.Provider value={value}>
//             {children}
//         </CartContext.Provider>
//     );
// };






// src/context/CartContext.jsx
'use client';

import React, { createContext, useState, useEffect } from 'react';

// Создаём контекст
export const CartContext = createContext();

// Провайдер контекста
export const CartProvider = ({ children, initialCartItems }) => {
    const [items, setItems] = useState([]);
    const [selectAll, setSelectAll] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [deliveryPrice] = useState(25000); // Доставка фиксированная
    const [finalPrice, setFinalPrice] = useState(0);

    // Функция для парсинга цены
    const parsePrice = (price) => {
        const num = parseInt(price.toString().replace(/\D/g, ''), 10);
        return isNaN(num) ? 0 : num;
    };

    // Функция для обновления куки
    const updateCookies = (updatedItems) => {
        document.cookie = `vitaline_cart=${encodeURIComponent(JSON.stringify({
            items: updatedItems.map(item => ({
                productId: item.id,
                qty: item.qty
            }))
        }))}; Path=/; Max-Age=31536000;`;
    };

    // Инициализация корзины при монтировании
    useEffect(() => {
        // Корректируем количество товаров в корзине согласно актуальным данным о наличии
        const adjustedItems = initialCartItems
            .map(item => {
                if (item.qty > item.maxQty) {
                    if (item.maxQty > 0) {
                        return {
                            ...item,
                            qty: item.maxQty,
                            total: item.maxQty * parsePrice(item.price),
                            selected: true, // Убедитесь, что selected всегда булево
                        };
                    } else {
                        return null; // Удаляем товар из корзины, если maxQty = 0
                    }
                }
                return {
                    ...item,
                    selected: true, // Устанавливаем selected как true по умолчанию
                };
            })
            .filter(item => item !== null);

        setItems(adjustedItems);

        // Проверяем, были ли произведены корректировки
        const wasAdjusted = initialCartItems.some((item, index) => {
            const adjustedItem = adjustedItems[index];
            return adjustedItem && item.qty !== adjustedItem.qty;
        });

        if (wasAdjusted) {
            updateCookies(adjustedItems);
            alert('Некоторое количество товаров было скорректировано из-за изменения наличия на складе.');
        }
    }, [initialCartItems]);

    // Обновление общей суммы, количества и финальной цены при изменении элементов
    useEffect(() => {
        const total = items.reduce((acc, item) => item.selected ? acc + item.total : acc, 0);
        const selectedItemsCount = items.filter(item => item.selected).length;

        setTotalPrice(total);
        setTotalItems(selectedItemsCount);
        setFinalPrice(total + deliveryPrice);
    }, [items, deliveryPrice]);

    // Обновление состояния "Выделить все" при изменении выбранных товаров
    useEffect(() => {
        const allSelected = items.length > 0 && items.every(item => item.selected);
        setSelectAll(allSelected);
    }, [items]);

    // Функция для переключения состояния "Выделить все"
    const toggleSelectAll = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);
        const updatedItems = items.map(item => ({ ...item, selected: newSelectAll }));
        setItems(updatedItems);
    };

    // Функция для переключения выбора отдельного товара
    const toggleItemSelection = (itemId) => {
        const updatedItems = items.map(item =>
            item.id === itemId ? { ...item, selected: !item.selected } : item
        );
        setItems(updatedItems);
    };

    // Функция для изменения количества товара
    const handleItemQuantityChange = (itemId, newQty) => {
        const updatedItems = items.map(item =>
            item.id === itemId
                ? {
                    ...item,
                    qty: newQty > item.maxQty ? item.maxQty : newQty, // Ограничение максимального количества
                    total: (newQty > item.maxQty ? item.maxQty : newQty) * parsePrice(item.price),
                    selected: true, // Убедитесь, что selected всегда булево
                }
                : item
        );
        setItems(updatedItems);
        updateCookies(updatedItems);
    };

    const value = {
        items,
        selectAll,
        toggleSelectAll,
        toggleItemSelection,
        handleItemQuantityChange,
        parsePrice,
        totalPrice,
        totalItems,
        deliveryPrice,
        finalPrice,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
