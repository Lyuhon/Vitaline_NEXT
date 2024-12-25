// // components/CartSummaryUpdate.jsx
// 'use client';

// import React, { useContext } from 'react';
// import Link from 'next/link';
// import { CartContext } from '../context/CartContext';

// export default function CartSummaryUpdate() {
//     const {
//         totalPrice,
//         totalItems,
//         deliveryPrice,
//         finalPrice
//     } = useContext(CartContext);

//     // Минимальная сумма заказа
//     const MIN_ORDER_SUM = 100000;

//     // Проверяем, меньше ли итоговая сумма минимальной
//     const isBelowMinimum = finalPrice < MIN_ORDER_SUM;

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

//                 {/* Условное отображение сообщения о минимальной сумме заказа */}
//                 {isBelowMinimum && (
//                     <div className="summary_item minimum_order">
//                         <span>
//                             Минимальная сумма для заказа не должна быть менее 100 000 сум
//                         </span>
//                     </div>
//                 )}

//                 {/* Кнопка оформления заказа с условным классом и атрибутом disabled */}
//                 <button
//                     className={`cart_checkout-button ${isBelowMinimum ? 'disabled_go_to_checkout' : ''}`}
//                     disabled={isBelowMinimum}
//                 >
//                     Перейти к оформлению заказа
//                 </button>

//                 <p className="terms">
//                     Нажимая на кнопку, вы соглашаетесь с{' '}
//                     <Link href="/cart/rules">правилами покупки и условиями возврата</Link>.
//                 </p>
//             </div>
//         </div>
//     );
// }













// // components/CartSummaryUpdate.jsx
// 'use client';

// import React, { useContext } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation'; // Импортируем useRouter
// import { CartContext } from '../context/CartContext';

// export default function CartSummaryUpdate() {
//     const {
//         totalPrice,
//         totalItems,
//         deliveryPrice,
//         finalPrice
//     } = useContext(CartContext);

//     const router = useRouter(); // Инициализируем router

//     // Минимальная сумма заказа
//     const MIN_ORDER_SUM = 100000;

//     // Проверяем, меньше ли итоговая сумма минимальной
//     const isBelowMinimum = finalPrice < MIN_ORDER_SUM;

//     // Обработчик нажатия на кнопку оформления заказа
//     const handleCheckout = () => {
//         if (!isBelowMinimum) {
//             router.push('/checkout'); // Перенаправление на страницу /checkout
//         }
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

//                 {/* Условное отображение сообщения о минимальной сумме заказа */}
//                 {isBelowMinimum && (
//                     <div className="summary_item minimum_order">
//                         <span>
//                             Минимальная сумма для заказа не должна быть менее 100 000 сум
//                         </span>
//                     </div>
//                 )}

//                 {/* Кнопка оформления заказа с условным классом и атрибутом disabled */}
//                 <button
//                     className={`cart_checkout-button ${isBelowMinimum ? 'disabled_go_to_checkout' : ''}`}
//                     disabled={isBelowMinimum}
//                     onClick={handleCheckout} // Добавляем обработчик onClick
//                     style={{
//                         cursor: isBelowMinimum ? 'not-allowed' : 'pointer', // Изменяем курсор в зависимости от состояния
//                         opacity: isBelowMinimum ? 0.6 : 1, // Дополнительно можно изменить прозрачность для визуального эффекта
//                     }}
//                 >
//                     Перейти к оформлению заказа
//                 </button>

//                 <p className="terms">
//                     Нажимая на кнопку, вы соглашаетесь с{' '}
//                     <Link href="/cart/rules">правилами покупки и условиями возврата</Link>.
//                 </p>
//             </div>
//         </div>
//     );
// }



// components/CartSummaryUpdate.jsx
'use client';

import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Импортируем useRouter
import { CartContext } from '../context/CartContext';
// import './CartSummaryUpdate.css'; // Подключаем CSS для анимации

export default function CartSummaryUpdate() {
    const {
        totalPrice,
        totalItems,
        deliveryPrice,
        finalPrice
    } = useContext(CartContext);

    const router = useRouter(); // Инициализируем router

    // Минимальная сумма заказа
    const MIN_ORDER_SUM = 100000;

    // Проверяем, меньше ли итоговая сумма минимальной
    const isBelowMinimum = finalPrice < MIN_ORDER_SUM;

    // Состояние для управления анимацией
    const [animate, setAnimate] = useState(false);

    // Отслеживаем изменения finalPrice
    useEffect(() => {
        // Запускаем анимацию при изменении finalPrice
        setAnimate(true);

        // Убираем анимацию после её завершения (предполагаемая длительность 0.5s)
        const timer = setTimeout(() => {
            setAnimate(false);
        }, 500); // Время должно соответствовать длительности анимации в CSS

        return () => clearTimeout(timer);
    }, [finalPrice]);

    // Обработчик нажатия на кнопку оформления заказа
    const handleCheckout = () => {
        if (!isBelowMinimum) {
            router.push('/checkout'); // Перенаправление на страницу /checkout
        }
    };

    return (
        <div className="summary">
            <div className={`summary_green ${animate ? 'animate' : ''}`}>
                <div className="summary_price">
                    <h4>Итого:</h4>
                    <span className={`cart_sum_tot_price ${animate ? 'animate' : ''}`}>
                        {finalPrice.toLocaleString('ru-RU')} сум
                    </span>
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
                    onClick={handleCheckout} // Добавляем обработчик onClick
                    style={{
                        cursor: isBelowMinimum ? 'not-allowed' : 'pointer', // Изменяем курсор в зависимости от состояния
                        opacity: isBelowMinimum ? 0.6 : 1, // Дополнительно можно изменить прозрачность для визуального эффекта
                    }}
                >
                    Перейти к оформлению заказа
                </button>

                <p className="terms">
                    Нажимая на кнопку, вы соглашаетесь с{' '}
                    <Link href="/cart/rules">правилами покупки и условиями возврата</Link>.
                </p>
            </div>
        </div>
    );
}
