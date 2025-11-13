// // // LOCAL Storage
// // COOKIES
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

//     // <-- Исходно у вас была доставка фиксированная: 25 000 сум,
//     //     теперь будем динамически менять между 25 000 и 60 000
//     const [deliveryPrice, setDeliveryPrice] = useState(250); //было 25000
//     const [finalPrice, setFinalPrice] = useState(0);

//     // <-- Дополнительный стейт: какой город выбран?
//     const [userCity, setUserCity] = useState('');

//     // <-- Функция, которая будет вызвана при изменении города
//     //     Если НЕ "Город Ташкент", ставим deliveryPrice = 60 000, иначе 25 000.
//     const handleCityChange = (city) => {
//         setUserCity(city);
//         if (city && city !== 'Город Ташкент') {
//             setDeliveryPrice(250); //было 60000
//         } else {
//             setDeliveryPrice(250); //было 25000
//         }
//     };

//     // Функция для парсинга цены
//     const parsePrice = (price) => {
//         const num = parseInt(price.toString().replace(/\D/g, ''), 10);
//         return isNaN(num) ? 0 : num;
//     };

//     // Функция для обновления куки (по желанию можете убрать, если мешает)
//     // const updateCookies = (updatedItems) => {
//     //     document.cookie = `vitaline_cart=${encodeURIComponent(JSON.stringify({
//     //         items: updatedItems.map(item => ({
//     //             productId: item.id,
//     //             qty: item.qty,
//     //         }))
//     //     }))}; Path=/; Max-Age=31536000;`;
//     // };


//     //SLCT
//     // const updateCookies = (updatedItems) => {
//     //     document.cookie = `vitaline_cart=${encodeURIComponent(JSON.stringify({
//     //         items: updatedItems.map(item => ({
//     //             productId: item.id,
//     //             qty: item.qty,
//     //             selected: item.selected
//     //             // selected: item.selected ?? true, // оставим true по умолчанию, если вдруг нет
//     //         }))
//     //     }))}; Path=/; Max-Age=31536000;`;
//     // };

//     const updateStorage = (updatedItems) => {
//         localStorage.setItem('vitaline_cart', JSON.stringify({
//             items: updatedItems.map(item => ({
//                 productId: item.id,
//                 qty: item.qty,
//                 selected: item.selected
//             }))
//         }));
//     };

//     //SLCT
//     // Обёртка над setItems
//     // В функции setCartItems
//     function setCartItems(newItems) {
//         setItems(newItems);
//         updateStorage(newItems); // было updateCookies
//     }

//     // Инициализация корзины при монтировании
//     useEffect(() => {
//         // Корректируем товары, если qty > maxQty и т.д.
//         const adjustedItems = initialCartItems
//             .map(item => {
//                 if (item.qty > item.maxQty) {
//                     if (item.maxQty > 0) {
//                         return {
//                             ...item,
//                             qty: item.maxQty,
//                             // total: item.maxQty * parsePrice(item.price), //UZS
//                             total: item.maxQty * parsePrice(item.convertedPrice),
//                             selected: true,
//                             //SLCT fix
//                             selected: item.selected
//                         };
//                     } else {
//                         return null; // Удаляем, если maxQty=0
//                     }
//                 }
//                 //SLCT fix
//                 // return { ...item };
//                 return { ...item, selected: true };
//             })
//             .filter(item => item !== null);

//         setItems(adjustedItems);

//         // Проверяем, были ли изменения
//         const wasAdjusted = initialCartItems.some((item, index) => {
//             const adjustedItem = adjustedItems[index];
//             return adjustedItem && item.qty !== adjustedItem.qty;
//         });

//         if (wasAdjusted) {
//             updateStorage(adjustedItems); // было updateCookies
//             alert('Некоторое количество товаров было скорректировано из-за изменения наличия на складе.');
//         }
//     }, [initialCartItems]);

//     // При изменении items или deliveryPrice пересчитываем totalPrice, totalItems, finalPrice
//     useEffect(() => {
//         const total = items.reduce(
//             (acc, item) => (item.selected ? acc + item.total : acc),
//             0
//         );
//         const selectedItemsCount = items.filter(item => item.selected).length;

//         setTotalPrice(total);
//         setTotalItems(selectedItemsCount);
//         setFinalPrice(total + deliveryPrice); // <-- Важно: используем текущую deliveryPrice
//     }, [items, deliveryPrice]);

//     // Обновление состояния "Выделить все"
//     useEffect(() => {
//         const allSelected = items.length > 0 && items.every(item => item.selected);
//         setSelectAll(allSelected);
//     }, [items]);

//     // Переключение "Выделить все"
//     const toggleSelectAll = () => {
//         const newSelectAll = !selectAll;
//         setSelectAll(newSelectAll);
//         const updatedItems = items.map(item => ({ ...item, selected: newSelectAll }));
//         setItems(updatedItems);
//     };

//     // Переключение выбора отдельного товара
//     const toggleItemSelection = (itemId) => {
//         const updatedItems = items.map(item =>
//             item.id === itemId ? { ...item, selected: !item.selected } : item
//         );
//         setItems(updatedItems);
//         //SLCT
//         updateStorage(updatedItems);
//         // setCartItems(updated);
//     };

//     // Изменение количества товара
//     const handleItemQuantityChange = (itemId, newQty) => {
//         const updatedItems = items.map(item =>
//             item.id === itemId
//                 ? {
//                     ...item,
//                     qty: newQty > item.maxQty ? item.maxQty : newQty,
//                     // total: (newQty > item.maxQty ? item.maxQty : newQty) * parsePrice(item.price), //UZS
//                     total: (newQty > item.maxQty ? item.maxQty : newQty) * parsePrice(item.convertedPrice),
//                     selected: true,
//                 }
//                 : item
//         );
//         setItems(updatedItems);
//         updateStorage(updatedItems); // было updateCookies
//     };

//     // Собираем всё, что хотим пробросить через контекст
//     const value = {
//         items,
//         //SLCT
//         setCartItems,
//         selectAll,
//         toggleSelectAll,
//         toggleItemSelection,
//         handleItemQuantityChange,
//         parsePrice,
//         totalPrice,
//         totalItems,
//         deliveryPrice,
//         finalPrice,
//         // <-- Новые поля (город и сеттер)
//         userCity,
//         handleCityChange,
//     };

//     return (
//         <CartContext.Provider value={value}>
//             {children}
//         </CartContext.Provider>
//     );
// };



// // LOCAL Storage


// src/context/CartContext.jsx
'use client';

import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children, initialCartItems }) => {
    const [items, setItems] = useState([]);
    const [selectAll, setSelectAll] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [deliveryPrice, setDeliveryPrice] = useState(250);
    const [finalPrice, setFinalPrice] = useState(0);
    const [userCity, setUserCity] = useState('');

    const handleCityChange = (city) => {
        setUserCity(city);
        if (city && city !== 'Город Ташкент') {
            setDeliveryPrice(250);
        } else {
            setDeliveryPrice(250);
        }
    };

    const parsePrice = (price) => {
        const num = parseInt(price.toString().replace(/\D/g, ''), 10);
        return isNaN(num) ? 0 : num;
    };

    const updateStorage = (updatedItems) => {
        localStorage.setItem('vitaline_cart', JSON.stringify({
            items: updatedItems.map(item => ({
                productId: item.id,
                qty: item.isOutOfStock ? 0 : item.qty,
                selected: item.selected
            }))
        }));
    };

    function setCartItems(newItems) {
        setItems(newItems);
        updateStorage(newItems);
    }

    // Функция для получения только товаров в наличии для checkout
    const getCheckoutItems = () => {
        return items.filter(item => !item.isOutOfStock && item.selected && item.qty > 0);
    };

    useEffect(() => {
        const adjustedItems = initialCartItems
            .map(item => {
                if (item.isOutOfStock) {
                    return {
                        ...item,
                        qty: 0,
                        total: 0,
                        selected: false
                    };
                }

                if (item.qty > item.maxQty) {
                    if (item.maxQty > 0) {
                        return {
                            ...item,
                            qty: item.maxQty,
                            total: item.maxQty * parsePrice(item.convertedPrice),
                            selected: item.selected ?? true
                        };
                    } else {
                        return null;
                    }
                }
                return { ...item, selected: item.selected ?? true };
            })
            .filter(item => item !== null);

        setItems(adjustedItems);

        const wasAdjusted = initialCartItems.some((item, index) => {
            const adjustedItem = adjustedItems[index];
            return adjustedItem && !item.isOutOfStock && item.qty !== adjustedItem.qty;
        });

        if (wasAdjusted) {
            updateStorage(adjustedItems);
            alert('Некоторое количество товаров было скорректировано из-за изменения наличия на складе.');
        }
    }, [initialCartItems]);

    useEffect(() => {
        const inStockItems = items.filter(item => !item.isOutOfStock);
        const total = inStockItems.reduce(
            (acc, item) => (item.selected ? acc + item.total : acc),
            0
        );
        const selectedItemsCount = inStockItems.filter(item => item.selected).length;

        setTotalPrice(total);
        setTotalItems(selectedItemsCount);
        setFinalPrice(total + deliveryPrice);
    }, [items, deliveryPrice]);

    useEffect(() => {
        const inStockItems = items.filter(item => !item.isOutOfStock);
        const allSelected = inStockItems.length > 0 && inStockItems.every(item => item.selected);
        setSelectAll(allSelected);
    }, [items]);

    const toggleSelectAll = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);
        const updatedItems = items.map(item => ({
            ...item,
            selected: item.isOutOfStock ? false : newSelectAll
        }));
        setItems(updatedItems);
        updateStorage(updatedItems);
    };

    const toggleItemSelection = (itemId) => {
        const updatedItems = items.map(item => {
            if (item.id === itemId && !item.isOutOfStock) {
                return { ...item, selected: !item.selected };
            }
            return item;
        });
        setItems(updatedItems);
        updateStorage(updatedItems);
    };

    const handleItemQuantityChange = (itemId, newQty) => {
        const updatedItems = items.map(item => {
            if (item.id === itemId && !item.isOutOfStock) {
                const finalQty = newQty > item.maxQty ? item.maxQty : newQty;
                return {
                    ...item,
                    qty: finalQty,
                    total: finalQty * parsePrice(item.convertedPrice),
                    selected: true
                };
            }
            return item;
        });
        setItems(updatedItems);
        updateStorage(updatedItems);
    };

    const value = {
        items,
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
        userCity,
        handleCityChange,
        getCheckoutItems
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};