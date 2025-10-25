// // src/app/checkout/MainComponent.tsx
// 'use client';
// import axios from 'axios';  // ДОБАВИТЬ
// import LoyaltyPopup from './LoyaltyPopup';  // ДОБАВИТЬ

// import React, {
//     useContext,
//     ForwardedRef,
//     forwardRef,
//     useEffect,
//     useRef,
//     useState,
// } from 'react';

// import Link from 'next/link';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';

// import { CartContext } from '../context/CartContext';
// import { CheckoutContext } from '@/app/[locale]/context/CheckoutContext';
// import CheckoutPopup from './PopUpProgress';

// import PhoneInput from './PhoneInput'; // Убедитесь, что путь правильный

// /** 
//  * Большой компонент, который объединяет:
//  * - форму чекаута
//  * - список товаров
//  * - блок итоговой суммы
//  */
// export default function CheckoutPage() {
//     // В компоненте CheckoutPage добавьте новые состояния
//     const [isPopupVisible, setIsPopupVisible] = useState(false);
//     const [popupStatus, setPopupStatus] = useState('processing');
//     const [citySubmittedEmpty, setCitySubmittedEmpty] = useState(false);
//     /** ===================
//      *  Подключение CartContext
//      *  =================== */
//     const {
//         items,
//         toggleSelectAll,
//         selectAll,
//         toggleItemSelection,
//         handleItemQuantityChange,
//         parsePrice,
//         totalPrice,
//         totalItems,
//         deliveryPrice, // из контекста будет 25 000
//         finalPrice,    // из контекста будет totalPrice + 25 000
//     } = useContext(CartContext);

//     /** ===================
//      *  Подключение CheckoutContext
//      *  =================== */
//     const {
//         customerInfo,
//         deliveryAddress,
//         deliveryMethod,
//         paymentMethod,
//         comment,
//         updateCustomerInfo,
//         updateDeliveryAddress,
//         setDeliveryMethod,
//         setPaymentMethod,
//         setComment,
//         submitOrder,
//         validateForm,
//     } = useContext(CheckoutContext)!;

//     // Локальный стейт загрузки (спиннер и т.п.)
//     const [loading, setLoading] = useState(false);
//     const router = useRouter();

//     // Ссылка на форму — для валидации
//     const checkoutFormRef = useRef<HTMLFormElement>(null);

//     useEffect(() => {
//         validateForm();
//     }, [customerInfo, deliveryAddress, deliveryMethod, validateForm]);

//     // const handleSubmit = async (e: React.FormEvent) => {
//     //     e.preventDefault();
//     //     setLoading(true);
//     //     // await submitOrder();
//     //     await submitOrder(myFinalPrice, myDeliveryPrice);
//     //     setLoading(false);
//     // };
//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         // setLoading(true);
//         // await submitOrder();
//         // await submitOrder(myFinalPrice, myDeliveryPrice);
//         // setLoading(false);
//     };

//     // =========================================================================
//     // 1. Переопределяем доставку (myDeliveryPrice) и финальную сумму (myFinalPrice)
//     // =========================================================================
//     const [myDeliveryPrice, setMyDeliveryPrice] = useState(deliveryPrice);
//     const [myFinalPrice, setMyFinalPrice] = useState(finalPrice);

//     // Если город НЕ "Город Ташкент", ставим 60 000, иначе 25 000
//     useEffect(() => {
//         if (deliveryAddress.city && deliveryAddress.city !== 'Город Ташкент') {
//             setMyDeliveryPrice(250); // было 60000 UZS
//         } else {
//             setMyDeliveryPrice(250); // было 25000 UZS
//         }
//     }, [deliveryAddress.city]);

//     // Пересчитываем новую финальную сумму на основе totalPrice (из контекста) + myDeliveryPrice
//     useEffect(() => {
//         setMyFinalPrice(totalPrice + myDeliveryPrice);
//     }, [totalPrice, myDeliveryPrice]);

//     // Проверяем минимальную сумму
//     const MIN_ORDER_SUM = 10000;
//     const isBelowMinimum = myFinalPrice < MIN_ORDER_SUM;

//     // Обработчик кнопки "Перейти к оформлению заказа"
//     // Обновите функцию handleCheckout
//     const handleCheckout = async () => {
//         if (isBelowMinimum) return;

//         if (checkoutFormRef.current && !checkoutFormRef.current.checkValidity()) {
//             checkoutFormRef.current.reportValidity();
//             if (!deliveryAddress.city) { // Добавь эти строки
//                 setCitySubmittedEmpty(true); // Включаем красную границу
//             } // Конец добавления
//             return;
//         }

//         setLoading(true);
//         setIsPopupVisible(true);
//         setPopupStatus('processing');

//         try {
//             const result = await submitOrder(myFinalPrice, myDeliveryPrice);
//             if (result?.success) {  // Добавили опциональную цепочку
//                 // router.push('/checkout/success');
//                 window.location.href = '/checkout/success';
//             }
//         } catch (error) {
//             console.error('Ошибка при оформлении заказа:', error);
//             setPopupStatus('error');
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Добавьте функцию закрытия popup
//     const handleClosePopup = () => {
//         setIsPopupVisible(false);
//         setPopupStatus('processing');
//     };

//     // =========================================================================
//     // Рендер
//     // =========================================================================
//     return (
//         <div className="checkout_section cart_wrapper full">
//             {/* Блок формы */}
//             <div className="form-container">
//                 <CheckoutForm
//                     ref={checkoutFormRef}
//                     customerInfo={customerInfo}
//                     updateCustomerInfo={updateCustomerInfo}
//                     deliveryAddress={deliveryAddress}
//                     updateDeliveryAddress={updateDeliveryAddress}
//                     deliveryMethod={deliveryMethod}
//                     setDeliveryMethod={setDeliveryMethod}
//                     paymentMethod={paymentMethod}
//                     setPaymentMethod={setPaymentMethod}
//                     comment={comment}
//                     setComment={setComment}
//                     handleSubmit={handleSubmit}
//                     loading={loading}
//                     citySubmittedEmpty={citySubmittedEmpty} // Добавь эту строку
//                     setCitySubmittedEmpty={setCitySubmittedEmpty} // Добавь эту строку
//                 />
//             </div>

//             {/* Блок корзины: товары + итоги */}
//             <div className="cart_part cart_fill_info">
//                 <CartItemsClient
//                     items={items}
//                     selectAll={selectAll}
//                     toggleSelectAll={toggleSelectAll}
//                     toggleItemSelection={toggleItemSelection}
//                     handleItemQuantityChange={handleItemQuantityChange}
//                 />

//                 <CartSummaryUpdate
//                     // Передаём totalPrice (без изменений)
//                     totalPrice={totalPrice}
//                     totalItems={totalItems}
//                     // <-- Но уже свою доставку:
//                     deliveryPrice={myDeliveryPrice}
//                     // <-- И свою финальную цену:
//                     finalPrice={myFinalPrice}
//                     isBelowMinimum={isBelowMinimum}
//                     handleCheckout={handleCheckout}
//                     loading={loading}
//                 />
//             </div>

//             <CheckoutPopup
//                 isVisible={isPopupVisible}
//                 status={popupStatus}
//                 onClose={handleClosePopup}
//             />

//         </div>
//     );
// }

// /** =========================================================================
//  * Подкомпоненты (CartItemsClient, CartSummaryUpdate, CheckoutForm)
//  * ========================================================================= */

// /** ========== CartItemsClient (CheckoutCartItemsClient.jsx) ========== */
// function CartItemsClient({
//     items,
//     selectAll,
//     toggleSelectAll,
//     toggleItemSelection,
//     handleItemQuantityChange,
// }: {
//     items: any[];
//     selectAll: boolean;
//     toggleSelectAll: () => void;
//     toggleItemSelection: (productId: number) => void;
//     handleItemQuantityChange: (productId: number, qty: number) => void;
// }) {
//     const handleDecrement = (item: any) => {
//         if (item.qty > 1) {
//             handleItemQuantityChange(item.productId, item.qty - 1);
//         }
//     };

//     const handleIncrement = (item: any) => {
//         if (item.qty < item.maxQty) {
//             handleItemQuantityChange(item.productId, item.qty + 1);
//         }
//     };

//     return (
//         <>
//             <div className="select-all">
//                 <div className="total_cart_qy">{items.length} позиций</div>
//             </div>

//             {items.map((item) => (
//                 <div className="item" key={item.productId}>
//                     <Image
//                         src={item.image || '/images/default-product.png'}
//                         alt={item.name}
//                         width={120}
//                         height={120}
//                         className="product-image"
//                     />

//                     <div className="info_block_main">
//                         <div className="item-info">
//                             {/* <h3 className="cart_brand_name">Бренд</h3> */}
//                             <Link href={`/product/${item.slug}`} className="cart_product_name">
//                                 {item.name}
//                             </Link>
//                             {/* <span className="cart_product_name">
//                                 {item.name}
//                             </span> */}
//                         </div>

//                         {/* 
//               Пример, если захотите вернуть + / - 
//               <div className="value_block">
//                   <div className="quantity-block">
//                       <div
//                           className="quantity-button"
//                           onClick={() => handleDecrement(item)}
//                       >
//                           -
//                       </div>
//                       <div className="quantity-value">
//                           {item.qty}
//                       </div>
//                       <div
//                           className="quantity-button"
//                           onClick={() => handleIncrement(item)}
//                       >
//                           +
//                       </div>
//                   </div>
//               </div>
//             */}

//                         <div className="value_block">
//                             <div className="quantity-block">
//                                 <div
//                                     className={`quantity-value${item.qty === item.maxQty ? ' dis_increment' : ''}`}
//                                 >
//                                     <span>Количество: </span>
//                                     {item.qty}
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="cart_item_price">
//                             {/* {item.total.toLocaleString('ru-RU')} сум */}
//                             {(item.total / 100).toFixed(2)}$

//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </>
//     );
// }

// /** ========== CartSummaryUpdate (CartSummaryUpdate.tsx) ========== */

// interface CartSummaryUpdateProps {
//     totalPrice: number;
//     totalItems: number;
//     deliveryPrice: number;
//     finalPrice: number;
//     isBelowMinimum: boolean;
//     handleCheckout: () => void;
//     loading: boolean;
// }

// function CartSummaryUpdate({
//     totalPrice,
//     totalItems,
//     deliveryPrice,
//     finalPrice,
//     isBelowMinimum,
//     handleCheckout,
//     loading,
// }: CartSummaryUpdateProps) {
//     const router = useRouter(); // Инициализируем router

//     // Состояние для управления анимацией
//     const [animate, setAnimate] = useState(false);

//     // Отслеживаем изменения finalPrice и deliveryPrice
//     useEffect(() => {
//         // Запускаем анимацию при изменении finalPrice или deliveryPrice
//         setAnimate(true);

//         // Убираем анимацию после её завершения (длительность соответствует CSS transition)
//         const timer = setTimeout(() => {
//             setAnimate(false);
//         }, 500); // 500 мс соответствует длительности перехода в CSS

//         return () => clearTimeout(timer);
//     }, [finalPrice, deliveryPrice]);

//     // Обработчик нажатия на кнопку оформления заказа
//     const onCheckout = () => {
//         if (!isBelowMinimum && !loading) {
//             handleCheckout(); // Вызываем переданную функцию
//             //router.push('/checkout'); // Перенаправление на страницу /checkout
//         }
//     };

//     return (
//         <div className="summary">
//             <div className={`summary_green ${animate ? 'animate' : ''}`}>

//                 <div className="summary_price">
//                     <h4>Итого:</h4>
//                     <span className="cart_sum_tot_price">
//                         {/* {finalPrice.toLocaleString('ru-RU')} сум */}
//                         {(finalPrice / 100).toFixed(2)}$
//                     </span>
//                 </div>

//                 <div className="summary_item">
//                     <span className="cart_summary_items_count">
//                         {totalItems} {totalItems === 1 ? 'позиция' : 'позиции'}
//                     </span>
//                     <span className="cart_summary_items_count_price">
//                         {/* {totalPrice.toLocaleString('ru-RU')} сум */}
//                         <span className="cart_summary_items_count_price">{(totalPrice / 100).toFixed(2)}$</span>
//                     </span>
//                 </div>

//                 <div className="summary_item">
//                     <span>Скидка Vitaline</span>
//                     {/* <span className="cart_summary_items_discount_value">0 сум</span> */}
//                     <span className="cart_summary_items_discount_value">0 $</span>

//                 </div>

//                 <div className="summary_item">
//                     <span>Доставка*</span>
//                     <span className="cart_summary_items_delivery_price">
//                         {/* {deliveryPrice.toLocaleString('ru-RU')} сум */}
//                         {(deliveryPrice / 100).toFixed(2)}$

//                     </span>
//                 </div>

//                 {isBelowMinimum && (
//                     <div className="summary_item minimum_order">
//                         {/* <span>Минимальная сумма для заказа не должна быть менее 100 000 сум</span> */}
//                         <span>Минимальная сумма для заказа не должна быть менее 100 $</span>

//                     </div>
//                 )}

//                 <button
//                     className={`cart_checkout-button ${isBelowMinimum || loading ? 'disabled_go_to_checkout' : ''}`}
//                     disabled={isBelowMinimum || loading}
//                     onClick={onCheckout}
//                     style={{
//                         cursor: isBelowMinimum || loading ? 'not-allowed' : 'pointer',
//                         opacity: isBelowMinimum || loading ? 0.6 : 1,
//                         pointerEvents: isBelowMinimum || loading ? 'none' : 'auto'
//                     }}
//                 >
//                     {loading ? 'Оформление...' : 'Оформить заказ'}
//                 </button>

//                 <p className="terms">
//                     Нажимая на кнопку, вы соглашаетесь с{' '}
//                     <Link href="/cart/rules">правилами покупки и условиями возврата</Link>.
//                 </p>
//             </div>
//         </div>
//     );
// }

// export { CartSummaryUpdate };


// /** ========== CheckoutForm (CheckoutForm.tsx) ========== */
// interface CheckoutFormProps {
//     customerInfo: {
//         firstName: string;
//         shopName: string;
//         phone: string;
//         bonusCard?: string;        // поинты биллз
//         pointsToUse?: number;      // поинты биллз
//     };
//     updateCustomerInfo: (info: Partial<{
//         firstName: string;
//         shopName: string;
//         phone: string;
//         bonusCard?: string;        // поинты биллз
//         pointsToUse?: number;      // поинты биллз
//     }>) => void;

//     deliveryAddress: {
//         full_address: string;
//         city: string;
//         street: string;
//         house: string;
//         apartment?: string;
//     };

//     updateDeliveryAddress: (
//         info: Partial<{
//             city: string;
//             full_address: string;
//             street: string;
//             house: string;
//             apartment?: string;
//         }>
//     ) => void;

//     deliveryMethod: string;
//     setDeliveryMethod: (method: string) => void;
//     paymentMethod: string;
//     setPaymentMethod: (method: string) => void;
//     comment: string;
//     setComment: (comment: string) => void;
//     handleSubmit: (e: React.FormEvent) => void;
//     loading: boolean;
//     citySubmittedEmpty: boolean; // Добавь эту строку
//     setCitySubmittedEmpty: (value: boolean) => void; // Добавь эту строку
// }

// // Оборачиваем в forwardRef, чтобы родитель мог передать ref на форму
// const CheckoutForm = forwardRef<HTMLFormElement, CheckoutFormProps>(
//     (
//         {
//             customerInfo,
//             updateCustomerInfo,
//             deliveryAddress,
//             updateDeliveryAddress,
//             deliveryMethod,
//             setDeliveryMethod,
//             paymentMethod,
//             setPaymentMethod,
//             comment,
//             setComment,
//             handleSubmit,
//             loading,
//             citySubmittedEmpty,
//             setCitySubmittedEmpty,
//         },
//         ref: ForwardedRef<HTMLFormElement>
//     ) => {
//         const [phoneError, setPhoneError] = useState('');

//         // поинты биллз
//         const [isLoyaltyPopupOpen, setIsLoyaltyPopupOpen] = useState(false);
//         const [availablePoints, setAvailablePoints] = useState<number | null>(null);
//         const [pointsToUse, setPointsToUse] = useState<string>('');
//         const [pointsError, setPointsError] = useState<string>('');
//         const [isCheckingLoyalty, setIsCheckingLoyalty] = useState<boolean>(false);
//         const [isCardFieldReadOnly, setIsCardFieldReadOnly] = useState<boolean>(false);


//         // для долларовых накопительных биллз
//         const [pointsInputValue, setPointsInputValue] = useState<string>('');

//         // ДОБАВИТЬ ИНТЕРФЕЙС:
//         interface ClientResponse {
//             result?: {
//                 clients?: Array<{
//                     client: {
//                         balance?: {
//                             Valid: boolean;
//                             Float64: number;
//                         };
//                         cardNumbers?: string;
//                     }
//                 }>
//             };
//         }

//         // ДОБАВИТЬ ФУНКЦИИ:
//         const openLoyaltyPopup = () => {
//             setIsLoyaltyPopupOpen(true);
//         };

//         const closeLoyaltyPopup = () => {
//             setIsLoyaltyPopupOpen(false);
//         };

//         const cleanPhoneNumber = (input: string): string => {
//             return input.replace(/[\s\-\(\)+]/g, '');
//         };

//         const fetchLoyaltyPoints = async (phoneNumber: string): Promise<void> => {
//             setIsCheckingLoyalty(true);

//             try {
//                 const apiKey: string = process.env.BILLZ_LOYALTY_API || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC93b28uYmlsbHoudXpcL2JpbGx6IiwiaWF0IjoxNTM5ODQ2MjIxLCJleHAiOjI1MjYzNzA0MzEsInN1YiI6InZpdGFsaW5lLnZpdGFsaW5ldXoifQ.fGGbJRrKsKT4AezeD2fB6sC9cKNL9Sxn33TNGiUExKQ';

//                 const requestData = {
//                     jsonrpc: '2.0',
//                     method: 'client.search',
//                     params: {
//                         phoneNumber: phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`,
//                     },
//                     id: '1'
//                 };

//                 const response = await axios.post<ClientResponse>(
//                     'https://api.billz.uz/v1/',
//                     requestData,
//                     {
//                         headers: {
//                             'Authorization': `Bearer ${apiKey}`,
//                             'Content-Type': 'application/json',
//                             'Accept': 'application/json'
//                         }
//                     }
//                 );

//                 if (response.data.result && response.data.result.clients && response.data.result.clients.length > 0) {
//                     const client = response.data.result.clients[0].client;

//                     if (client.balance && client.balance.Valid) {
//                         setAvailablePoints(client.balance.Float64);
//                         setPointsError('');

//                         if (client.cardNumbers && client.cardNumbers.trim() !== '') {
//                             updateCustomerInfo({ bonusCard: client.cardNumbers });
//                             setIsCardFieldReadOnly(true);
//                         } else {
//                             updateCustomerInfo({ bonusCard: cleanPhoneNumber(phoneNumber) });
//                             setIsCardFieldReadOnly(true);
//                         }
//                     } else {
//                         setAvailablePoints(null);
//                         updateCustomerInfo({ bonusCard: '', pointsToUse: undefined });
//                         setIsCardFieldReadOnly(false);
//                     }
//                 } else {
//                     setAvailablePoints(null);
//                     updateCustomerInfo({ bonusCard: '', pointsToUse: undefined });
//                     setIsCardFieldReadOnly(false);
//                 }
//             } catch (error) {
//                 console.error('Ошибка при получении баллов:', error);
//                 setAvailablePoints(null);
//                 updateCustomerInfo({ bonusCard: '', pointsToUse: undefined });
//                 setPointsError('Не удалось загрузить данные о баллах');
//                 setIsCardFieldReadOnly(false);
//             } finally {
//                 setIsCheckingLoyalty(false);
//             }
//         };

//         // поинты биллз (закончил функции)


//         // const handlePhoneChange = (formattedValue: string) => {
//         //     updateCustomerInfo({ phone: formattedValue });

//         //     // Валидация номера
//         //     const phoneRegex = /^\+998\s\(\d{2}\)\s\d{3}-\d{2}-\d{2}$/;
//         //     if (phoneRegex.test(formattedValue)) {
//         //         setPhoneError('');
//         //     } else {
//         //         setPhoneError('Неверный формат номера телефона.');
//         //     }
//         // };

//         // ЗАМЕНИТЬ ТЕКУЩУЮ handlePhoneChange НА ЭТУ:
//         const handlePhoneChange = (formattedValue: string) => {
//             updateCustomerInfo({ phone: formattedValue });
//             const phoneRegex = /^\+998\s\(\d{2}\)\s\d{3}-\d{2}-\d{2}$/;
//             if (phoneRegex.test(formattedValue)) {
//                 setPhoneError('');
//                 const cleanedPhone = cleanPhoneNumber(formattedValue);
//                 fetchLoyaltyPoints(cleanedPhone);
//             } else {
//                 setPhoneError('Неверный формат номера телефона.');
//                 setAvailablePoints(null);
//                 updateCustomerInfo({ pointsToUse: undefined });
//             }
//         };

//         // Добавь эту функцию здесь
//         const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//             updateDeliveryAddress({ city: e.target.value });
//             if (e.target.value) {
//                 setCitySubmittedEmpty(false); // Убираем красную границу, если выбрано
//             }
//         };

//         // для долларовых накопительных биллз
//         // Синхронизируем локальное состояние с pointsToUse
//         useEffect(() => {
//             if (customerInfo.pointsToUse) {
//                 const dollarValue = Math.floor(customerInfo.pointsToUse / 128) / 100;
//                 // НЕ ФОРМАТИРУЕМ - показываем как есть
//                 setPointsInputValue(dollarValue.toString());
//             } else {
//                 setPointsInputValue('');
//             }
//         }, [customerInfo.pointsToUse]);

//         return (
//             <form ref={ref} onSubmit={handleSubmit} className="checkout-form">
//                 <div className="general_inputs">
//                     <h3>Данные получателя</h3>

//                     <div className="form-group">
//                         <label htmlFor="full-name">Имя Фамилия</label>
//                         <input
//                             type="text"
//                             id="full-name"
//                             value={customerInfo.firstName}
//                             onChange={(e) => updateCustomerInfo({ firstName: e.target.value })}
//                             required
//                         />
//                     </div>

//                     <div className="form-group">
//                         <label htmlFor="full-name">Название магазина</label>
//                         <input
//                             type="text"
//                             id="store-name"
//                             value={customerInfo.shopName}
//                             onChange={(e) => updateCustomerInfo({ shopName: e.target.value })}
//                             required
//                         />
//                     </div>

//                     <PhoneInput value={customerInfo.phone} onChange={handlePhoneChange} error={phoneError} />

//                     {/* // поинты биллз */}
//                     <div className="form-group">
//                         <label htmlFor="bonus-card">Накопительная {isCheckingLoyalty && (
//                             <span className="ml-2 inline-block animate-pulse text-orange-500">
//                                 <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//                                 </svg>
//                                 проверка
//                             </span>
//                         )}</label>
//                         <input
//                             type="text"
//                             id="bonus-card"
//                             value={customerInfo.bonusCard || ''}
//                             onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//                                 if (!isCardFieldReadOnly) {
//                                     updateCustomerInfo({ bonusCard: e.target.value });
//                                 }
//                             }}
//                             readOnly={isCardFieldReadOnly}
//                             className={`mt-1 block w-full rounded-md shadow-sm focus:ring ${isCardFieldReadOnly ? 'bg-gray-100' : ''}`}
//                         />
//                     </div>

//                     {availablePoints === null && (
//                         <div className="abot_notify_block">
//                             <p>
//                                 У вас еще нет накопительной карты? <span
//                                     onClick={openLoyaltyPopup}
//                                     style={{ color: "#ff7900", textDecoration: "underline", cursor: "pointer" }}>
//                                     Оформите её прямо сейчас</span>{' '} в нашем Telegram-боте!
//                             </p>
//                             <p style={{ marginTop: "10px", color: "#555" }}>
//                                 Sizda hali chegirma kartasi yo&apos;qmi? <span
//                                     onClick={openLoyaltyPopup}
//                                     style={{ color: "#ff7900", textDecoration: "underline", cursor: "pointer" }}
//                                 >Uni hoziroq</span>{' '} Telegram-botimizda rasmiylashtiring!
//                             </p>

//                             <LoyaltyPopup
//                                 isOpen={isLoyaltyPopupOpen}
//                                 onClose={closeLoyaltyPopup}
//                             />
//                         </div>
//                     )}

//                     {availablePoints !== null && (
//                         <div className="billz_card_section">
//                             <p style={{ marginBottom: "20px" }}>Доступно баллов: <span style={{ fontWeight: "500" }}>{Math.floor(availablePoints / 128) / 100} $</span></p>
//                             <div className="form-group">
//                                 <label htmlFor="points-to-use">Снимаемое количество</label>
//                                 <input
//                                     type="text"
//                                     id="points-to-use"
//                                     value={pointsInputValue}
//                                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//                                         let value = e.target.value;

//                                         // Заменяем запятую на точку
//                                         value = value.replace(/,/g, '.');

//                                         // Удаляем недопустимые символы, но сохраняем структуру
//                                         value = value.replace(/[^\d.]/g, '');

//                                         // Разрешаем только одну точку
//                                         const dotCount = (value.match(/\./g) || []).length;
//                                         if (dotCount > 1) {
//                                             value = value.substring(0, value.lastIndexOf('.'));
//                                         }

//                                         // Если значение заканчивается точкой, сохраняем её
//                                         const endsWithDot = value.endsWith('.');

//                                         // Ограничиваем до 2 знаков после запятой
//                                         if (value.includes('.') && !endsWithDot) {
//                                             const parts = value.split('.');
//                                             if (parts[1] && parts[1].length > 2) {
//                                                 value = parts[0] + '.' + parts[1].substring(0, 2);
//                                             }
//                                         }

//                                         // Особый случай: если удаляем цифры после точки, но точка остается
//                                         if (endsWithDot && value.length > 1) {
//                                             // Сохраняем точку даже если после неё ничего нет
//                                             value = value; // оставляем как есть, например "1."
//                                         }

//                                         setPointsInputValue(value);

//                                         // Обновляем состояние только если есть валидное число
//                                         if (value === '' || value === '.') {
//                                             updateCustomerInfo({ pointsToUse: undefined });
//                                         } else if (!value.endsWith('.')) {
//                                             const dollarValue = parseFloat(value);
//                                             if (!isNaN(dollarValue) && dollarValue >= 0) {
//                                                 const uzsValue = Math.floor(dollarValue * 12800);
//                                                 const maxUzsValue = Math.floor(availablePoints / 128) * 128;

//                                                 if (uzsValue > maxUzsValue) {
//                                                     const maxDollars = Math.floor(maxUzsValue / 128) / 100;
//                                                     updateCustomerInfo({ pointsToUse: maxUzsValue });
//                                                     setPointsInputValue(maxDollars.toString());
//                                                 } else {
//                                                     updateCustomerInfo({ pointsToUse: uzsValue });
//                                                 }
//                                             }
//                                         }
//                                         // Если заканчивается точкой, не обновляем pointsToUse, ждем ввода дальше
//                                     }}
//                                     onBlur={() => {
//                                         // НЕ ФОРМАТИРУЕМ - оставляем как есть
//                                         // Только проверяем корректность и лимиты
//                                         if (pointsInputValue && !isNaN(parseFloat(pointsInputValue))) {
//                                             const dollarValue = parseFloat(pointsInputValue);
//                                             const uzsValue = Math.floor(dollarValue * 12800);
//                                             const maxUzsValue = Math.floor(availablePoints / 128) * 128;

//                                             if (uzsValue > maxUzsValue) {
//                                                 const maxDollars = Math.floor(maxUzsValue / 128) / 100;
//                                                 updateCustomerInfo({ pointsToUse: maxUzsValue });
//                                                 setPointsInputValue(maxDollars.toString());
//                                             } else {
//                                                 updateCustomerInfo({ pointsToUse: uzsValue });
//                                                 // НЕ МЕНЯЕМ ОТОБРАЖЕНИЕ - оставляем как ввел пользователь
//                                             }
//                                         }
//                                     }}
//                                     onFocus={() => {
//                                         // При фокусе тоже не меняем - оставляем как есть
//                                     }}
//                                     placeholder="0.00"
//                                     className="mt-1 block w-full rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                                 />
//                             </div>
//                         </div>
//                     )}

//                     <div className="abot_notify_block"></div>

//                     <div className="abot_notify_block">
//                         Мы пришлем уведомление о статусе заказа на указанный вами телефон.
//                         <br />
//                         Наш менеджер свяжется с Вами по телефону для уточнения времени доставки.
//                     </div>
//                 </div>

//                 <div className="delivery_inputs">
//                     <h3>Доставка</h3>

//                     <div className="form-group">
//                         <label htmlFor="city">Город</label>
//                         <select
//                             value={deliveryAddress.city}
//                             onChange={handleCityChange}
//                             required
//                             className={`quick_order_form ${citySubmittedEmpty
//                                 ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 need_to_fill active:[box-shadow:0px_4px_10px_0px_#b7040433]'
//                                 : 'filled_city'
//                                 }`}
//                             aria-required="true"
//                             name="your-region"
//                             id="city"
//                         >
//                             <option value="">Выберите Ваш город</option>
//                             <option value="Город Ташкент">Город Ташкент</option>
//                             <option value="Ташкентская область">Ташкентская область</option>
//                             <option value="Самарканд">Самарканд</option>
//                             <option value="Бухара">Бухара</option>
//                             <option value="Андижан">Андижан</option>
//                             <option value="Фергана">Фергана</option>
//                             <option value="Джизак">Джизак</option>
//                             <option value="Каракалпакстан">Каракалпакстан</option>
//                             <option value="Наманган">Наманган</option>
//                             <option value="Навои">Навои</option>
//                             <option value="Кашкадарья">Кашкадарья</option>
//                             <option value="Сырдарья">Сырдарья</option>
//                             <option value="Сурхандарья">Сурхандарья</option>
//                             <option value="Хорезмская область">Хорезмская область</option>
//                         </select>
//                     </div>

//                     <div className="form-group" style={{ display: 'none' }}>
//                         <label className="for_mob_db">Способ доставки</label>
//                         <div className="radio-group">
//                             <label>
//                                 <input
//                                     type="radio"
//                                     name="delivery-method"
//                                     value="courier"
//                                     checked={deliveryMethod === 'courier'}
//                                     onChange={() => setDeliveryMethod('courier')}
//                                 />
//                                 Курьерская доставка Vitaline в течение дня
//                             </label>
//                         </div>
//                     </div>

//                     {deliveryMethod === 'courier' && (
//                         <>
//                             <div className="form-group">
//                                 <label htmlFor="address">Адрес</label>
//                                 <input
//                                     type="text"
//                                     id="address"
//                                     value={deliveryAddress.full_address}
//                                     onChange={(e) => updateDeliveryAddress({ full_address: e.target.value })}
//                                     required
//                                 />
//                             </div>

//                             {/* <div className="form-group">
//                                 <label htmlFor="house">Дом</label>
//                                 <input
//                                     type="text"
//                                     id="house"
//                                     value={deliveryAddress.house}
//                                     onChange={(e) => updateDeliveryAddress({ house: e.target.value })}
//                                     required
//                                 />
//                             </div>

//                             <div className="form-group">
//                                 <label htmlFor="apartment">Квартира/офис</label>
//                                 <input
//                                     type="text"
//                                     id="apartment"
//                                     value={deliveryAddress.apartment}
//                                     onChange={(e) => updateDeliveryAddress({ apartment: e.target.value })}
//                                 />
//                             </div> */}
//                         </>
//                     )}

//                     {/* <div className="form-group">
//                         <label className="for_mob_db">Способ оплаты</label>
//                         <div className="radio-group">
//                             <label>
//                                 <input
//                                     type="radio"
//                                     name="payment-method"
//                                     value="card"
//                                     checked={paymentMethod === 'card'}
//                                     onChange={() => setPaymentMethod('card')}
//                                 />
//                                 Переводом на карту
//                             </label>
//                         </div>
//                     </div> */}

//                     <div className="form-group">
//                         <label htmlFor="comment">Комментарий для курьера</label>
//                         <textarea
//                             id="comment"
//                             value={comment}
//                             onChange={(e) => setComment(e.target.value)}
//                             rows={3}
//                         />
//                     </div>
//                 </div>
//             </form>
//         );
//     }
// );

// CheckoutForm.displayName = 'CheckoutForm';












// src/app/checkout/MainComponent.tsx
'use client';
import axios from 'axios';  // ДОБАВИТЬ
import LoyaltyPopup from './LoyaltyPopup';  // ДОБАВИТЬ

import React, {
    useContext,
    ForwardedRef,
    forwardRef,
    useEffect,
    useRef,
    useState,
} from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';

import { CartContext } from '../context/CartContext';
import { CheckoutContext } from '@/app/[locale]/context/CheckoutContext';
import CheckoutPopup from './PopUpProgress';

import PhoneInput from './PhoneInput'; // Убедитесь, что путь правильный

/** 
 * Большой компонент, который объединяет:
 * - форму чекаута
 * - список товаров
 * - блок итоговой суммы
 */
export default function CheckoutPage() {
    const t = useTranslations('checkout');
    const locale = useLocale();
    // В компоненте CheckoutPage добавьте новые состояния
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [popupStatus, setPopupStatus] = useState('processing');
    const [citySubmittedEmpty, setCitySubmittedEmpty] = useState(false);
    /** ===================
     *  Подключение CartContext
     *  =================== */
    const {
        items,
        toggleSelectAll,
        selectAll,
        toggleItemSelection,
        handleItemQuantityChange,
        parsePrice,
        totalPrice,
        totalItems,
        deliveryPrice, // из контекста будет 25 000
        finalPrice,    // из контекста будет totalPrice + 25 000
    } = useContext(CartContext);

    /** ===================
     *  Подключение CheckoutContext
     *  =================== */
    const {
        customerInfo,
        deliveryAddress,
        deliveryMethod,
        paymentMethod,
        comment,
        updateCustomerInfo,
        updateDeliveryAddress,
        setDeliveryMethod,
        setPaymentMethod,
        setComment,
        submitOrder,
        validateForm,
    } = useContext(CheckoutContext)!;

    // Локальный стейт загрузки (спиннер и т.п.)
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Ссылка на форму — для валидации
    const checkoutFormRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        validateForm();
    }, [customerInfo, deliveryAddress, deliveryMethod, validateForm]);

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     setLoading(true);
    //     // await submitOrder();
    //     await submitOrder(myFinalPrice, myDeliveryPrice);
    //     setLoading(false);
    // };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // setLoading(true);
        // await submitOrder();
        // await submitOrder(myFinalPrice, myDeliveryPrice);
        // setLoading(false);
    };

    // =========================================================================
    // 1. Переопределяем доставку (myDeliveryPrice) и финальную сумму (myFinalPrice)
    // =========================================================================
    const [myDeliveryPrice, setMyDeliveryPrice] = useState(deliveryPrice);
    const [myFinalPrice, setMyFinalPrice] = useState(finalPrice);

    // Если город НЕ "Город Ташкент", ставим 60 000, иначе 25 000
    useEffect(() => {
        if (deliveryAddress.city && deliveryAddress.city !== t('city_tashkent')) {
            setMyDeliveryPrice(250); // было 60000 UZS
        } else {
            setMyDeliveryPrice(250); // было 25000 UZS
        }
    }, [deliveryAddress.city]);

    // Пересчитываем новую финальную сумму на основе totalPrice (из контекста) + myDeliveryPrice
    useEffect(() => {
        setMyFinalPrice(totalPrice + myDeliveryPrice);
    }, [totalPrice, myDeliveryPrice]);

    // Проверяем минимальную сумму
    const MIN_ORDER_SUM = 10000;
    const isBelowMinimum = myFinalPrice < MIN_ORDER_SUM;

    // Обработчик кнопки "Перейти к оформлению заказа"
    // Обновите функцию handleCheckout
    const handleCheckout = async () => {
        if (isBelowMinimum) return;

        if (checkoutFormRef.current && !checkoutFormRef.current.checkValidity()) {
            checkoutFormRef.current.reportValidity();
            if (!deliveryAddress.city) { // Добавь эти строки
                setCitySubmittedEmpty(true); // Включаем красную границу
            } // Конец добавления
            return;
        }

        setLoading(true);
        setIsPopupVisible(true);
        setPopupStatus('processing');

        try {
            const result = await submitOrder(myFinalPrice, myDeliveryPrice);
            if (result?.success) {  // Добавили опциональную цепочку
                // router.push('/checkout/success');
                window.location.href = `/${locale}/checkout/success`;
            }
        } catch (error) {
            console.error('Ошибка при оформлении заказа:', error);
            setPopupStatus('error');
        } finally {
            setLoading(false);
        }
    };

    // Добавьте функцию закрытия popup
    const handleClosePopup = () => {
        setIsPopupVisible(false);
        setPopupStatus('processing');
    };

    // =========================================================================
    // Рендер
    // =========================================================================
    return (
        <div className="checkout_section cart_wrapper full">
            {/* Блок формы */}
            <div className="form-container">
                <CheckoutForm
                    ref={checkoutFormRef}
                    customerInfo={customerInfo}
                    updateCustomerInfo={updateCustomerInfo}
                    deliveryAddress={deliveryAddress}
                    updateDeliveryAddress={updateDeliveryAddress}
                    deliveryMethod={deliveryMethod}
                    setDeliveryMethod={setDeliveryMethod}
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                    comment={comment}
                    setComment={setComment}
                    handleSubmit={handleSubmit}
                    loading={loading}
                    citySubmittedEmpty={citySubmittedEmpty} // Добавь эту строку
                    setCitySubmittedEmpty={setCitySubmittedEmpty} // Добавь эту строку
                />
            </div>

            {/* Блок корзины: товары + итоги */}
            <div className="cart_part cart_fill_info">
                <CartItemsClient
                    items={items}
                    selectAll={selectAll}
                    toggleSelectAll={toggleSelectAll}
                    toggleItemSelection={toggleItemSelection}
                    handleItemQuantityChange={handleItemQuantityChange}
                />

                <CartSummaryUpdate
                    // Передаём totalPrice (без изменений)
                    totalPrice={totalPrice}
                    totalItems={totalItems}
                    // <-- Но уже свою доставку:
                    deliveryPrice={myDeliveryPrice}
                    // <-- И свою финальную цену:
                    finalPrice={myFinalPrice}
                    isBelowMinimum={isBelowMinimum}
                    handleCheckout={handleCheckout}
                    loading={loading}
                />
            </div>

            <CheckoutPopup
                isVisible={isPopupVisible}
                status={popupStatus}
                onClose={handleClosePopup}
            />

        </div>
    );
}

/** =========================================================================
 * Подкомпоненты (CartItemsClient, CartSummaryUpdate, CheckoutForm)
 * ========================================================================= */

/** ========== CartItemsClient (CheckoutCartItemsClient.jsx) ========== */
function CartItemsClient({
    items,
    selectAll,
    toggleSelectAll,
    toggleItemSelection,
    handleItemQuantityChange,
}: {
    items: any[];
    selectAll: boolean;
    toggleSelectAll: () => void;
    toggleItemSelection: (productId: number) => void;
    handleItemQuantityChange: (productId: number, qty: number) => void;
}) {
    const t = useTranslations('checkout');
    const locale = useLocale();
    const handleDecrement = (item: any) => {
        if (item.qty > 1) {
            handleItemQuantityChange(item.productId, item.qty - 1);
        }
    };

    const handleIncrement = (item: any) => {
        if (item.qty < item.maxQty) {
            handleItemQuantityChange(item.productId, item.qty + 1);
        }
    };

    return (
        <>
            <div className="select-all">
                <div className="total_cart_qy">{t('positions_count', { count: items.length })}</div>
            </div>

            {items.map((item) => (
                <div className="item" key={item.productId}>
                    <Image
                        src={item.image || '/images/default-product.png'}
                        alt={item.name}
                        width={120}
                        height={120}
                        className="product-image"
                    />

                    <div className="info_block_main">
                        <div className="item-info">
                            {/* <h3 className="cart_brand_name">Бренд</h3> */}
                            <Link href={`/${locale}/product/${item.slug}`} className="cart_product_name">
                                {item.name}
                            </Link>
                            {/* <span className="cart_product_name">
                                {item.name}
                            </span> */}
                        </div>

                        {/* 
              Пример, если захотите вернуть + / - 
              <div className="value_block">
                  <div className="quantity-block">
                      <div
                          className="quantity-button"
                          onClick={() => handleDecrement(item)}
                      >
                          -
                      </div>
                      <div className="quantity-value">
                          {item.qty}
                      </div>
                      <div
                          className="quantity-button"
                          onClick={() => handleIncrement(item)}
                      >
                          +
                      </div>
                  </div>
              </div>
            */}

                        <div className="value_block">
                            <div className="quantity-block">
                                <div
                                    className={`quantity-value${item.qty === item.maxQty ? ' dis_increment' : ''}`}
                                >
                                    <span>{t('quantity')} </span>
                                    {item.qty}
                                </div>
                            </div>
                        </div>
                        <div className="cart_item_price">
                            {/* {item.total.toLocaleString('ru-RU')} сум */}
                            {(item.total / 100).toFixed(2)}$

                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

/** ========== CartSummaryUpdate (CartSummaryUpdate.tsx) ========== */

interface CartSummaryUpdateProps {
    totalPrice: number;
    totalItems: number;
    deliveryPrice: number;
    finalPrice: number;
    isBelowMinimum: boolean;
    handleCheckout: () => void;
    loading: boolean;
}

function CartSummaryUpdate({
    totalPrice,
    totalItems,
    deliveryPrice,
    finalPrice,
    isBelowMinimum,
    handleCheckout,
    loading,
}: CartSummaryUpdateProps) {
    const t = useTranslations('checkout');
    const locale = useLocale();
    const router = useRouter(); // Инициализируем router

    // Состояние для управления анимацией
    const [animate, setAnimate] = useState(false);

    // Отслеживаем изменения finalPrice и deliveryPrice
    useEffect(() => {
        // Запускаем анимацию при изменении finalPrice или deliveryPrice
        setAnimate(true);

        // Убираем анимацию после её завершения (длительность соответствует CSS transition)
        const timer = setTimeout(() => {
            setAnimate(false);
        }, 500); // 500 мс соответствует длительности перехода в CSS

        // - Скидка Vitaline
        return () => clearTimeout(timer);
    }, [finalPrice, deliveryPrice]);

    // Обработчик нажатия на кнопку оформления заказа
    const onCheckout = () => {
        if (!isBelowMinimum && !loading) {
            handleCheckout(); // Вызываем переданную функцию
            //router.push('/checkout'); // Перенаправление на страницу /checkout
        }
    };

    return (
        <div className="summary">
            <div className={`summary_green ${animate ? 'animate' : ''}`}>

                <div className="summary_price">
                    <h4>{t('total')}:</h4>
                    <span className="cart_sum_tot_price">
                        {/* {finalPrice.toLocaleString('ru-RU')} сум */}
                        {(finalPrice / 100).toFixed(2)}$
                    </span>
                </div>

                <div className="summary_item">
                    <span className="cart_summary_items_count">
                        {t('items_count', { count: totalItems })}
                    </span>
                    <span className="cart_summary_items_count_price">
                        {/* {totalPrice.toLocaleString('ru-RU')} сум */}
                        <span className="cart_summary_items_count_price">{(totalPrice / 100).toFixed(2)}$</span>
                    </span>
                </div>

                <div className="summary_item">
                    <span>{t('vitaline_discount')}</span>
                    {/* <span className="cart_summary_items_discount_value">0 сум</span> */}
                    <span className="cart_summary_items_discount_value">0 $</span>

                </div>

                <div className="summary_item">
                    <span>{t('delivery')}*</span>
                    <span className="cart_summary_items_delivery_price">
                        {/* {deliveryPrice.toLocaleString('ru-RU')} сум */}
                        {(deliveryPrice / 100).toFixed(2)}$

                    </span>
                </div>

                {isBelowMinimum && (
                    <div className="summary_item minimum_order">
                        {/* <span>Минимальная сумма для заказа не должна быть менее 100 000 сум</span> */}
                        <span>{t('minimum_order')}</span>

                    </div>
                )}

                <button
                    className={`cart_checkout-button ${isBelowMinimum || loading ? 'disabled_go_to_checkout' : ''}`}
                    disabled={isBelowMinimum || loading}
                    onClick={onCheckout}
                    style={{
                        cursor: isBelowMinimum || loading ? 'not-allowed' : 'pointer',
                        opacity: isBelowMinimum || loading ? 0.6 : 1,
                        pointerEvents: isBelowMinimum || loading ? 'none' : 'auto'
                    }}
                >
                    {loading ? t('processing') : t('place_order')}
                </button>

                <p className="terms">
                    {t.rich('terms_agree', { link: (chunks) => <Link href={`/${locale}/cart/rules`}>{chunks}</Link> })}
                </p>
            </div>
        </div>
    );
}

export { CartSummaryUpdate };


/** ========== CheckoutForm (CheckoutForm.tsx) ========== */
interface CheckoutFormProps {
    customerInfo: {
        firstName: string;
        shopName: string;
        phone: string;
        bonusCard?: string;        // поинты биллз
        pointsToUse?: number;      // поинты биллз
    };
    updateCustomerInfo: (info: Partial<{
        firstName: string;
        shopName: string;
        phone: string;
        bonusCard?: string;        // поинты биллз
        pointsToUse?: number;      // поинты биллз
    }>) => void;

    deliveryAddress: {
        full_address: string;
        city: string;
        street: string;
        house: string;
        apartment?: string;
    };

    updateDeliveryAddress: (
        info: Partial<{
            city: string;
            full_address: string;
            street: string;
            house: string;
            apartment?: string;
        }>
    ) => void;

    deliveryMethod: string;
    setDeliveryMethod: (method: string) => void;
    paymentMethod: string;
    setPaymentMethod: (method: string) => void;
    comment: string;
    setComment: (comment: string) => void;
    handleSubmit: (e: React.FormEvent) => void;
    loading: boolean;
    citySubmittedEmpty: boolean; // Добавь эту строку
    setCitySubmittedEmpty: (value: boolean) => void; // Добавь эту строку
}

// Оборачиваем в forwardRef, чтобы родитель мог передать ref на форму
const CheckoutForm = forwardRef<HTMLFormElement, CheckoutFormProps>(
    (
        {
            customerInfo,
            updateCustomerInfo,
            deliveryAddress,
            updateDeliveryAddress,
            deliveryMethod,
            setDeliveryMethod,
            paymentMethod,
            setPaymentMethod,
            comment,
            setComment,
            handleSubmit,
            loading,
            citySubmittedEmpty,
            setCitySubmittedEmpty,
        },
        ref: ForwardedRef<HTMLFormElement>
    ) => {
        const t = useTranslations('checkout');
        const [phoneError, setPhoneError] = useState('');

        // поинты биллз
        const [isLoyaltyPopupOpen, setIsLoyaltyPopupOpen] = useState(false);
        const [availablePoints, setAvailablePoints] = useState<number | null>(null);
        const [pointsToUse, setPointsToUse] = useState<string>('');
        const [pointsError, setPointsError] = useState<string>('');
        const [isCheckingLoyalty, setIsCheckingLoyalty] = useState<boolean>(false);
        const [isCardFieldReadOnly, setIsCardFieldReadOnly] = useState<boolean>(false);


        // для долларовых накопительных биллз
        const [pointsInputValue, setPointsInputValue] = useState<string>('');

        // ДОБАВИТЬ ИНТЕРФЕЙС:
        interface ClientResponse {
            result?: {
                clients?: Array<{
                    client: {
                        balance?: {
                            Valid: boolean;
                            Float64: number;
                        };
                        cardNumbers?: string;
                    }
                }>
            };
        }

        // ДОБАВИТЬ ФУНКЦИИ:
        const openLoyaltyPopup = () => {
            setIsLoyaltyPopupOpen(true);
        };

        const closeLoyaltyPopup = () => {
            setIsLoyaltyPopupOpen(false);
        };

        const cleanPhoneNumber = (input: string): string => {
            return input.replace(/[\s\-\(\)+]/g, '');
        };

        const fetchLoyaltyPoints = async (phoneNumber: string): Promise<void> => {
            setIsCheckingLoyalty(true);

            try {
                const apiKey: string = process.env.BILLZ_LOYALTY_API || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC93b28uYmlsbHoudXpcL2JpbGx6IiwiaWF0IjoxNTM5ODQ2MjIxLCJleHAiOjI1MjYzNzA0MzEsInN1YiI6InZpdGFsaW5lLnZpdGFsaW5ldXoifQ.fGGbJRrKsKT4AezeD2fB6sC9cKNL9Sxn33TNGiUExKQ';

                const requestData = {
                    jsonrpc: '2.0',
                    method: 'client.search',
                    params: {
                        phoneNumber: phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`,
                    },
                    id: '1'
                };

                const response = await axios.post<ClientResponse>(
                    'https://api.billz.uz/v1/',
                    requestData,
                    {
                        headers: {
                            'Authorization': `Bearer ${apiKey}`,
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        }
                    }
                );

                if (response.data.result && response.data.result.clients && response.data.result.clients.length > 0) {
                    const client = response.data.result.clients[0].client;

                    if (client.balance && client.balance.Valid) {
                        setAvailablePoints(client.balance.Float64);
                        setPointsError('');

                        if (client.cardNumbers && client.cardNumbers.trim() !== '') {
                            updateCustomerInfo({ bonusCard: client.cardNumbers });
                            setIsCardFieldReadOnly(true);
                        } else {
                            updateCustomerInfo({ bonusCard: cleanPhoneNumber(phoneNumber) });
                            setIsCardFieldReadOnly(true);
                        }
                    } else {
                        setAvailablePoints(null);
                        updateCustomerInfo({ bonusCard: '', pointsToUse: undefined });
                        setIsCardFieldReadOnly(false);
                    }
                } else {
                    setAvailablePoints(null);
                    updateCustomerInfo({ bonusCard: '', pointsToUse: undefined });
                    setIsCardFieldReadOnly(false);
                }
            } catch (error) {
                console.error('Ошибка при получении баллов:', error);
                setAvailablePoints(null);
                updateCustomerInfo({ bonusCard: '', pointsToUse: undefined });
                setPointsError(t('points_load_error'));
                setIsCardFieldReadOnly(false);
            } finally {
                setIsCheckingLoyalty(false);
            }
        };

        // поинты биллз (закончил функции)


        // const handlePhoneChange = (formattedValue: string) => {
        //     updateCustomerInfo({ phone: formattedValue });

        //     // Валидация номера
        //     const phoneRegex = /^\+998\s\(\d{2}\)\s\d{3}-\d{2}-\d{2}$/;
        //     if (phoneRegex.test(formattedValue)) {
        //         setPhoneError('');
        //     } else {
        //         setPhoneError('Неверный формат номера телефона.');
        //     }
        // };

        // ЗАМЕНИТЬ ТЕКУЩУЮ handlePhoneChange НА ЭТУ:
        const handlePhoneChange = (formattedValue: string) => {
            updateCustomerInfo({ phone: formattedValue });
            const phoneRegex = /^\+998\s\(\d{2}\)\s\d{3}-\d{2}-\d{2}$/;
            if (phoneRegex.test(formattedValue)) {
                setPhoneError('');
                const cleanedPhone = cleanPhoneNumber(formattedValue);
                fetchLoyaltyPoints(cleanedPhone);
            } else {
                setPhoneError(t('invalid_phone_format'));
                setAvailablePoints(null);
                updateCustomerInfo({ pointsToUse: undefined });
            }
        };

        // Добавь эту функцию здесь
        const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            updateDeliveryAddress({ city: e.target.value });
            if (e.target.value) {
                setCitySubmittedEmpty(false); // Убираем красную границу, если выбрано
            }
        };

        // для долларовых накопительных биллз
        // Синхронизируем локальное состояние с pointsToUse
        useEffect(() => {
            if (customerInfo.pointsToUse) {
                const dollarValue = Math.floor(customerInfo.pointsToUse / 128) / 100;
                // НЕ ФОРМАТИРУЕМ - показываем как есть
                setPointsInputValue(dollarValue.toString());
            } else {
                setPointsInputValue('');
            }
        }, [customerInfo.pointsToUse]);

        return (
            <form ref={ref} onSubmit={handleSubmit} className="checkout-form">
                <div className="general_inputs">
                    <h3>{t('recipient_data')}</h3>

                    <div className="form-group">
                        <label htmlFor="full-name">{t('full_name')}</label>
                        <input
                            type="text"
                            id="full-name"
                            value={customerInfo.firstName}
                            onChange={(e) => updateCustomerInfo({ firstName: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="full-name">{t('store_name')}</label>
                        <input
                            type="text"
                            id="store-name"
                            value={customerInfo.shopName}
                            onChange={(e) => updateCustomerInfo({ shopName: e.target.value })}
                            required
                        />
                    </div>

                    <PhoneInput value={customerInfo.phone} onChange={handlePhoneChange} error={phoneError} />

                    {/* // поинты биллз */}
                    <div className="form-group">
                        <label htmlFor="bonus-card">{t('loyalty_card')} {isCheckingLoyalty && (
                            <span className="ml-2 inline-block animate-pulse text-orange-500">
                                <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                {t('checking')}
                            </span>
                        )}</label>
                        <input
                            type="text"
                            id="bonus-card"
                            value={customerInfo.bonusCard || ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                if (!isCardFieldReadOnly) {
                                    updateCustomerInfo({ bonusCard: e.target.value });
                                }
                            }}
                            readOnly={isCardFieldReadOnly}
                            className={`mt-1 block w-full rounded-md shadow-sm focus:ring ${isCardFieldReadOnly ? 'bg-gray-100' : ''}`}
                        />
                    </div>

                    {availablePoints === null && (
                        <div className="abot_notify_block">
                            <p>
                                {t.rich('no_loyalty_card', {
                                    span: (chunks) => <span
                                        onClick={openLoyaltyPopup}
                                        style={{ color: "#ff7900", textDecoration: "underline", cursor: "pointer" }}
                                    >
                                        {chunks}
                                    </span>
                                })}
                            </p>

                            <LoyaltyPopup
                                isOpen={isLoyaltyPopupOpen}
                                onClose={closeLoyaltyPopup}
                            />
                        </div>
                    )}

                    {availablePoints !== null && (
                        <div className="billz_card_section">
                            <p style={{ marginBottom: "20px" }}>{t('available_points')}: <span style={{ fontWeight: "500" }}>{Math.floor(availablePoints / 128) / 100} $</span></p>
                            <div className="form-group">
                                <label htmlFor="points-to-use">{t('points_to_use')}</label>
                                <input
                                    type="text"
                                    id="points-to-use"
                                    value={pointsInputValue}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        let value = e.target.value;

                                        // Заменяем запятую на точку
                                        value = value.replace(/,/g, '.');

                                        // Удаляем недопустимые символы, но сохраняем структуру
                                        value = value.replace(/[^\d.]/g, '');

                                        // Разрешаем только одну точку
                                        const dotCount = (value.match(/\./g) || []).length;
                                        if (dotCount > 1) {
                                            value = value.substring(0, value.lastIndexOf('.'));
                                        }

                                        // Если значение заканчивается точкой, сохраняем её
                                        const endsWithDot = value.endsWith('.');

                                        // Ограничиваем до 2 знаков после запятой
                                        if (value.includes('.') && !endsWithDot) {
                                            const parts = value.split('.');
                                            if (parts[1] && parts[1].length > 2) {
                                                value = parts[0] + '.' + parts[1].substring(0, 2);
                                            }
                                        }

                                        // Особый случай: если удаляем цифры после точки, но точка остается
                                        if (endsWithDot && value.length > 1) {
                                            // Сохраняем точку даже если после неё ничего нет
                                            value = value; // оставляем как есть, например "1."
                                        }

                                        setPointsInputValue(value);

                                        // Обновляем состояние только если есть валидное число
                                        if (value === '' || value === '.') {
                                            updateCustomerInfo({ pointsToUse: undefined });
                                        } else if (!value.endsWith('.')) {
                                            const dollarValue = parseFloat(value);
                                            if (!isNaN(dollarValue) && dollarValue >= 0) {
                                                const uzsValue = Math.floor(dollarValue * 12800);
                                                const maxUzsValue = Math.floor(availablePoints / 128) * 128;

                                                if (uzsValue > maxUzsValue) {
                                                    const maxDollars = Math.floor(maxUzsValue / 128) / 100;
                                                    updateCustomerInfo({ pointsToUse: maxUzsValue });
                                                    setPointsInputValue(maxDollars.toString());
                                                } else {
                                                    updateCustomerInfo({ pointsToUse: uzsValue });
                                                }
                                            }
                                        }
                                        // Если заканчивается точкой, не обновляем pointsToUse, ждем ввода дальше
                                    }}
                                    onBlur={() => {
                                        // НЕ ФОРМАТИРУЕМ - оставляем как есть
                                        // Только проверяем корректность и лимиты
                                        if (pointsInputValue && !isNaN(parseFloat(pointsInputValue))) {
                                            const dollarValue = parseFloat(pointsInputValue);
                                            const uzsValue = Math.floor(dollarValue * 12800);
                                            const maxUzsValue = Math.floor(availablePoints / 128) * 128;

                                            if (uzsValue > maxUzsValue) {
                                                const maxDollars = Math.floor(maxUzsValue / 128) / 100;
                                                updateCustomerInfo({ pointsToUse: maxUzsValue });
                                                setPointsInputValue(maxDollars.toString());
                                            } else {
                                                updateCustomerInfo({ pointsToUse: uzsValue });
                                                // НЕ МЕНЯЕМ ОТОБРАЖЕНИЕ - оставляем как ввел пользователь
                                            }
                                        }
                                    }}
                                    onFocus={() => {
                                        // При фокусе тоже не меняем - оставляем как есть
                                    }}
                                    placeholder="0.00"
                                    className="mt-1 block w-full rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                    )}

                    <div className="abot_notify_block"></div>

                    <div className="abot_notify_block">
                        {t('order_notification')}
                        <br />
                        {t('manager_contact')}
                    </div>
                </div>

                <div className="delivery_inputs">
                    <h3>{t('delivery')}</h3>

                    <div className="form-group">
                        <label htmlFor="city">{t('city')}</label>
                        <select
                            value={deliveryAddress.city}
                            onChange={handleCityChange}
                            required
                            className={`quick_order_form ${citySubmittedEmpty
                                ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 need_to_fill active:[box-shadow:0px_4px_10px_0px_#b7040433]'
                                : 'filled_city'
                                }`}
                            aria-required="true"
                            name="your-region"
                            id="city"
                        >
                            <option value="">{t('select_city')}</option>
                            <option value={t('city_tashkent')}>{t('city_tashkent')}</option>
                            <option value={t('tashkent_region')}>{t('tashkent_region')}</option>
                            <option value={t('samarkand')}>{t('samarkand')}</option>
                            <option value={t('bukara')}>{t('bukara')}</option>
                            <option value={t('andijan')}>{t('andijan')}</option>
                            <option value={t('fergana')}>{t('fergana')}</option>
                            <option value={t('jizzakh')}>{t('jizzakh')}</option>
                            <option value={t('karakalpakstan')}>{t('karakalpakstan')}</option>
                            <option value={t('namangan')}>{t('namangan')}</option>
                            <option value={t('navoi')}>{t('navoi')}</option>
                            <option value={t('kashkadarya')}>{t('kashkadarya')}</option>
                            <option value={t('syrdarya')}>{t('syrdarya')}</option>
                            <option value={t('surkhandarya')}>{t('surkhandarya')}</option>
                            <option value={t('khorezm_region')}>{t('khorezm_region')}</option>
                        </select>
                    </div>

                    <div className="form-group" style={{ display: 'none' }}>
                        <label className="for_mob_db">{t('delivery_method')}</label>
                        <div className="radio-group">
                            <label>
                                <input
                                    type="radio"
                                    name="delivery-method"
                                    value="courier"
                                    checked={deliveryMethod === 'courier'}
                                    onChange={() => setDeliveryMethod('courier')}
                                />
                                {t('courier_delivery')}
                            </label>
                        </div>
                    </div>

                    {deliveryMethod === 'courier' && (
                        <>
                            <div className="form-group">
                                <label htmlFor="address">{t('address')}</label>
                                <input
                                    type="text"
                                    id="address"
                                    value={deliveryAddress.full_address}
                                    onChange={(e) => updateDeliveryAddress({ full_address: e.target.value })}
                                    required
                                />
                            </div>

                            {/* <div className="form-group">
                                <label htmlFor="house">Дом</label>
                                <input
                                    type="text"
                                    id="house"
                                    value={deliveryAddress.house}
                                    onChange={(e) => updateDeliveryAddress({ house: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="apartment">Квартира/офис</label>
                                <input
                                    type="text"
                                    id="apartment"
                                    value={deliveryAddress.apartment}
                                    onChange={(e) => updateDeliveryAddress({ apartment: e.target.value })}
                                />
                            </div> */}
                        </>
                    )}

                    {/* <div className="form-group">
                        <label className="for_mob_db">Способ оплаты</label>
                        <div className="radio-group">
                            <label>
                                <input
                                    type="radio"
                                    name="payment-method"
                                    value="card"
                                    checked={paymentMethod === 'card'}
                                    onChange={() => setPaymentMethod('card')}
                                />
                                Переводом на карту
                            </label>
                        </div>
                    </div> */}

                    <div className="form-group">
                        <label htmlFor="comment">{t('comment_for_courier')}</label>
                        <textarea
                            id="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={3}
                        />
                    </div>
                </div>
            </form>
        );
    }
);

CheckoutForm.displayName = 'CheckoutForm';