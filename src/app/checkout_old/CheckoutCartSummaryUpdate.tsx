// // src/app/checkout/CartSummaryUpdate.tsx
// 'use client';

// import React, { useContext, useState } from 'react';
// import Link from 'next/link';
// import { CartContext } from '../context/CartContext';
// import { CheckoutContext } from '@/app/context/CheckoutContext';
// import { useRouter } from 'next/navigation';

// export default function CartSummaryUpdate() {



//     const {
//         totalPrice,
//         totalItems,
//         deliveryPrice,
//         finalPrice
//     } = useContext(CartContext);

//     const {
//         submitOrder,
//     } = useContext(CheckoutContext)!;

//     // Минимальная сумма заказа
//     const MIN_ORDER_SUM = 100000;

//     // Проверяем, меньше ли итоговая сумма минимальной
//     const isBelowMinimum = finalPrice < MIN_ORDER_SUM;

//     const [loading, setLoading] = useState(false);
//     const router = useRouter();

//     const handleClick = async () => {
//         if (isBelowMinimum) return; // Дополнительная проверка
//         setLoading(true);
//         try {
//             await submitOrder();
//             // Предполагается, что submitOrder выполняет редирект
//         } catch (error) {
//             console.error('Ошибка при оформлении заказа:', error);
//             alert('Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте еще раз.');
//         } finally {
//             setLoading(false);
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
//                     <span className="cart_summary_items_count">{totalItems} {totalItems === 1 ? 'позиция' : 'позиции'}</span>
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
//                 {/* <button
//                     className={`cart_checkout-button ${isBelowMinimum ? 'disabled_go_to_checkout' : ''}`}
//                     disabled={isBelowMinimum || loading}
//                     onClick={handleClick}
//                 >
//                     {loading ? 'Оформление...' : 'Перейти к оформлению заказа'}
//                 </button> */}

//                 {/* Кнопка оформления заказа с условным классом и атрибутом disabled */}
//                 <button
//                     className={`cart_checkout-button ${isBelowMinimum ? 'disabled_go_to_checkout' : ''}`}
//                     disabled={isBelowMinimum || loading}
//                     onClick={handleClick}
//                 >
//                     {loading ? 'Оформление...' : 'Перейти к оформлению заказа'}
//                 </button>


//                 <p className="terms">
//                     Нажимая на кнопку, вы соглашаетесь с{' '}
//                     <Link href="#">правилами покупки</Link> и <Link href="#">условиями возврата</Link>.
//                 </p>
//             </div>
//         </div>
//     );
// }




// src/app/checkout/CartSummaryUpdate.tsx
'use client';

import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { CartContext } from '../context/CartContext';
import { CheckoutContext } from '@/app/context/CheckoutContext';
import { useRouter } from 'next/navigation';

export default function CartSummaryUpdate() {

    const handleClick = async () => {
        if (isBelowMinimum || loading) return;

        const data = {
            customerInfo: {
                firstName: "Иван Иванов",
                phone: "+998901234567"
            },
            deliveryAddress: {
                city: "Ташкент",
                street: "Улица Мирзо Улугбека",
                house: "12",
                apartment: "34"
            },
            deliveryMethod: "курьер",
            paymentMethod: "карта",
            comment: "Позвоните за час до доставки",
            items: [
                {
                    productId: "1",
                    name: "Товар 1",
                    price: "50000",
                    qty: 2,
                    total: 100000,
                    image: "https://example.com/image1.jpg"
                },
                {
                    productId: "2",
                    name: "Товар 2",
                    price: "30000",
                    qty: 1,
                    total: 30000,
                    image: "https://example.com/image2.jpg"
                }
            ]
        };

        try {
            const response = await fetch("/api/checkout/submit-order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log("Успех:", result);
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };
    const {
        totalPrice,
        totalItems,
        deliveryPrice,
        finalPrice
    } = useContext(CartContext);

    const {
        submitOrder,
    } = useContext(CheckoutContext)!;

    // Минимальная сумма заказа
    const MIN_ORDER_SUM = 100000;

    // Проверяем, меньше ли итоговая сумма минимальной
    const isBelowMinimum = finalPrice < MIN_ORDER_SUM;

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // const handleClick = async () => {
    //     if (isBelowMinimum) return; // Дополнительная проверка
    //     setLoading(true);
    //     try {
    //         await submitOrder();
    //         // Предполагается, что submitOrder выполняет редирект
    //     } catch (error) {
    //         console.error('Ошибка при оформлении заказа:', error);
    //         alert('Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте еще раз.');
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    return (
        <div className="summary">
            <div className="summary_green">
                <div className="summary_price">
                    <h4>Итого:</h4>
                    <span className="cart_sum_tot_price">{finalPrice.toLocaleString('ru-RU')} сум</span>
                </div>

                <div className="summary_item">
                    <span className="cart_summary_items_count">{totalItems} {totalItems === 1 ? 'позиция' : 'позиции'}</span>
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
                {/* <button
                    className={`cart_checkout-button ${isBelowMinimum ? 'disabled_go_to_checkout' : ''}`}
                    disabled={isBelowMinimum || loading}
                    onClick={handleClick}
                >
                    {loading ? 'Оформление...' : 'Перейти к оформлению заказа'}
                </button> */}

                {/* Кнопка оформления заказа с условным классом и атрибутом disabled */}
                <button
                    className={`cart_checkout-button ${isBelowMinimum ? 'disabled_go_to_checkout' : ''}`}
                    disabled={isBelowMinimum || loading}
                    onClick={handleClick}
                >
                    {loading ? 'Оформление...' : 'Перейти к оформлению заказа'}
                </button>


                <p className="terms">
                    Нажимая на кнопку, вы соглашаетесь с{' '}
                    <Link href="#">правилами покупки</Link> и <Link href="#">условиями возврата</Link>.
                </p>
            </div>
        </div>
    );
}
