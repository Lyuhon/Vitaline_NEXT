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

    // <-- Исходно у вас была доставка фиксированная: 25 000 сум,
    //     теперь будем динамически менять между 25 000 и 60 000
    const [deliveryPrice, setDeliveryPrice] = useState(25000);
    const [finalPrice, setFinalPrice] = useState(0);

    // <-- Дополнительный стейт: какой город выбран?
    const [userCity, setUserCity] = useState('');

    // <-- Функция, которая будет вызвана при изменении города
    //     Если НЕ "Город Ташкент", ставим deliveryPrice = 60 000, иначе 25 000.
    const handleCityChange = (city) => {
        setUserCity(city);
        if (city && city !== 'Город Ташкент') {
            setDeliveryPrice(60000);
        } else {
            setDeliveryPrice(25000);
        }
    };

    // Функция для парсинга цены
    const parsePrice = (price) => {
        const num = parseInt(price.toString().replace(/\D/g, ''), 10);
        return isNaN(num) ? 0 : num;
    };

    // Функция для обновления куки (по желанию можете убрать, если мешает)
    // const updateCookies = (updatedItems) => {
    //     document.cookie = `vitaline_cart=${encodeURIComponent(JSON.stringify({
    //         items: updatedItems.map(item => ({
    //             productId: item.id,
    //             qty: item.qty,
    //         }))
    //     }))}; Path=/; Max-Age=31536000;`;
    // };


    //SLCT
    const updateCookies = (updatedItems) => {
        document.cookie = `vitaline_cart=${encodeURIComponent(JSON.stringify({
            items: updatedItems.map(item => ({
                productId: item.id,
                qty: item.qty,
                selected: item.selected
                // selected: item.selected ?? true, // оставим true по умолчанию, если вдруг нет
            }))
        }))}; Path=/; Max-Age=31536000;`;
    };

    //SLCT
    // Обёртка над setItems
    function setCartItems(newItems) {
        setItems(newItems);
        updateCookies(newItems); // <-- сразу записываем в куки
    }

    // Инициализация корзины при монтировании
    useEffect(() => {
        // Корректируем товары, если qty > maxQty и т.д.
        const adjustedItems = initialCartItems
            .map(item => {
                if (item.qty > item.maxQty) {
                    if (item.maxQty > 0) {
                        return {
                            ...item,
                            qty: item.maxQty,
                            total: item.maxQty * parsePrice(item.price),
                            selected: true,
                            //SLCT fix
                            selected: item.selected
                        };
                    } else {
                        return null; // Удаляем, если maxQty=0
                    }
                }
                //SLCT fix
                // return { ...item };
                return { ...item, selected: true };
            })
            .filter(item => item !== null);

        setItems(adjustedItems);

        // Проверяем, были ли изменения
        const wasAdjusted = initialCartItems.some((item, index) => {
            const adjustedItem = adjustedItems[index];
            return adjustedItem && item.qty !== adjustedItem.qty;
        });

        if (wasAdjusted) {
            updateCookies(adjustedItems);
            alert('Некоторое количество товаров было скорректировано из-за изменения наличия на складе.');
        }
    }, [initialCartItems]);

    // При изменении items или deliveryPrice пересчитываем totalPrice, totalItems, finalPrice
    useEffect(() => {
        const total = items.reduce(
            (acc, item) => (item.selected ? acc + item.total : acc),
            0
        );
        const selectedItemsCount = items.filter(item => item.selected).length;

        setTotalPrice(total);
        setTotalItems(selectedItemsCount);
        setFinalPrice(total + deliveryPrice); // <-- Важно: используем текущую deliveryPrice
    }, [items, deliveryPrice]);

    // Обновление состояния "Выделить все"
    useEffect(() => {
        const allSelected = items.length > 0 && items.every(item => item.selected);
        setSelectAll(allSelected);
    }, [items]);

    // Переключение "Выделить все"
    const toggleSelectAll = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);
        const updatedItems = items.map(item => ({ ...item, selected: newSelectAll }));
        setItems(updatedItems);
    };

    // Переключение выбора отдельного товара
    const toggleItemSelection = (itemId) => {
        const updatedItems = items.map(item =>
            item.id === itemId ? { ...item, selected: !item.selected } : item
        );
        setItems(updatedItems);
        //SLCT
        updateCookies(updatedItems);
        // setCartItems(updated);
    };

    // Изменение количества товара
    const handleItemQuantityChange = (itemId, newQty) => {
        const updatedItems = items.map(item =>
            item.id === itemId
                ? {
                    ...item,
                    qty: newQty > item.maxQty ? item.maxQty : newQty,
                    total: (newQty > item.maxQty ? item.maxQty : newQty) * parsePrice(item.price),
                    selected: true,
                }
                : item
        );
        setItems(updatedItems);
        updateCookies(updatedItems);
    };

    // Собираем всё, что хотим пробросить через контекст
    const value = {
        items,
        //SLCT
        setCartItems,
        selectAll,
        toggleSelectAll,
        toggleItemSelection,
        handleItemQuantityChange,
        parsePrice,
        totalPrice,
        totalItems,
        deliveryPrice,
        finalPrice,
        // <-- Новые поля (город и сеттер)
        userCity,
        handleCityChange,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
