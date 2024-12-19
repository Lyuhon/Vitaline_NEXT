// // CartSummaryUpdate.jsx
// 'use client';

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';

// export default function CartSummary({ cartItemsDetailed }) {
//     const [selectAll, setSelectAll] = useState(true);
//     const [items, setItems] = useState([]);
//     const [totalPrice, setTotalPrice] = useState(0);
//     const [totalItems, setTotalItems] = useState(0);
//     const [deliveryPrice, setDeliveryPrice] = useState(25000); // Доставка фиксированная
//     const [finalPrice, setFinalPrice] = useState(0);

//     useEffect(() => {
//         // Initialize items with all selected and calculate initial total price
//         const updatedItems = cartItemsDetailed.map(item => ({
//             ...item,
//             selected: true
//         }));
//         setItems(updatedItems);
//     }, [cartItemsDetailed]);

//     useEffect(() => {
//         // Update total price, total items, and final price whenever items change
//         updateTotalPrice(items);
//     }, [items]);

//     const updateTotalPrice = (items) => {
//         const total = items.reduce((acc, item) => {
//             return item.selected ? acc + item.total : acc;
//         }, 0);
//         const selectedItemsCount = items.filter(item => item.selected).length;

//         setTotalPrice(total);
//         setTotalItems(selectedItemsCount);
//         setFinalPrice(total + deliveryPrice);
//     };

//     const toggleSelectAll = () => {
//         const newSelectAll = !selectAll;
//         setSelectAll(newSelectAll);
//         const updatedItems = items.map(item => ({ ...item, selected: newSelectAll }));
//         setItems(updatedItems);
//     };

//     const toggleItemSelection = (itemId) => {
//         const updatedItems = items.map(item =>
//             item.id === itemId ? { ...item, selected: !item.selected } : item
//         );
//         setItems(updatedItems);
//     };

//     const handleItemQuantityChange = (itemId, newQty) => {
//         const updatedItems = items.map(item =>
//             item.id === itemId
//                 ? { ...item, qty: newQty, total: newQty * parsePrice(item.price) }
//                 : item
//         );
//         setItems(updatedItems);
//     };

//     const parsePrice = (price) => {
//         const num = parseInt(price.toString().replace(/\D/g, ''), 10);
//         return isNaN(num) ? 0 : num;
//     };

//     return (
//         <div className="summary">
//             <div className="summary_green">
//                 <div className="summary_price">
//                     <h4>Итого:</h4>
//                     <span className="cart_sum_tot_price">{finalPrice.toLocaleString('ru-RU')} сум</span>
//                 </div>

//                 <div className="summary_item">
//                     <span className="cart_summary_items_count">{totalItems} позиции</span>
//                     <span className="cart_summary_items_count_price">{totalPrice.toLocaleString('ru-RU')} сум</span>
//                 </div>

//                 <div className="summary_item">
//                     <span>Скидка Vitaline</span>
//                     <span className="cart_summary_items_discount_value">0 сум</span>
//                 </div>

//                 <div className="summary_item">
//                     <span>Доставка*</span>
//                     <span className="cart_summary_items_delivery_price">{deliveryPrice.toLocaleString('ru-RU')} сум</span>
//                 </div>

//                 <button className="cart_checkout-button">Перейти к оформлению заказа</button>
//                 <p className="terms">
//                     Нажимая на кнопку, вы соглашаетесь с{' '}
//                     <Link href="#">правилами покупки</Link> и <Link href="#">условиями возврата</Link>.
//                 </p>
//             </div>
//         </div>
//     );
// }


// components/CartSummaryUpdate.jsx
'use client';

import React, { useContext } from 'react';
import Link from 'next/link';
import { CartContext } from '../context/CartContext';

export default function CartSummaryUpdate() {
    const {
        totalPrice,
        totalItems,
        deliveryPrice,
        finalPrice
    } = useContext(CartContext);

    // Минимальная сумма заказа
    const MIN_ORDER_SUM = 100000;

    // Проверяем, меньше ли итоговая сумма минимальной
    const isBelowMinimum = finalPrice < MIN_ORDER_SUM;

    return (
        <div className="summary">
            <div className="summary_green">
                <div className="summary_price">
                    <h4>Итого:</h4>
                    <span className="cart_sum_tot_price">{finalPrice.toLocaleString('ru-RU')} сум</span>
                </div>

                <div className="summary_item">
                    <span className="cart_summary_items_count">{totalItems} позиции</span>
                    <span className="cart_summary_items_count_price">{totalPrice.toLocaleString('ru-RU')} сум</span>
                </div>

                <div className="summary_item">
                    <span>Скидка Vitaline</span>
                    <span className="cart_summary_items_discount_value">0 сум</span>
                </div>

                <div className="summary_item">
                    <span>Доставка*</span>
                    <span className="cart_summary_items_delivery_price">{deliveryPrice.toLocaleString('ru-RU')} сум</span>
                </div>

                {/* Условное отображение сообщения о минимальной сумме заказа */}
                {isBelowMinimum && (
                    <div className="summary_item minimum_order">
                        <span>
                            Минимальная сумма для заказа не должна быть менее 100 000 сум
                        </span>
                    </div>
                )}

                {/* Кнопка оформления заказа с условным классом и атрибутом disabled */}
                <button
                    className={`cart_checkout-button ${isBelowMinimum ? 'disabled_go_to_checkout' : ''}`}
                    disabled={isBelowMinimum}
                >
                    Перейти к оформлению заказа
                </button>

                <p className="terms">
                    Нажимая на кнопку, вы соглашаетесь с{' '}
                    <Link href="#">правилами покупки</Link> и <Link href="#">условиями возврата</Link>.
                </p>
            </div>
        </div>
    );
}
