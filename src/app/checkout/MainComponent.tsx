// src/app/checkout/MainComponent.tsx
'use client';

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

import { CartContext } from '../context/CartContext';
import { CheckoutContext } from '@/app/context/CheckoutContext';

import PhoneInput from './PhoneInput'; // Убедитесь, что путь правильный

/** 
 * Большой компонент, который объединяет:
 * - форму чекаута
 * - список товаров
 * - блок итоговой суммы
 */
export default function CheckoutPage() {
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // await submitOrder();
        await submitOrder(myFinalPrice, myDeliveryPrice);
        setLoading(false);
    };

    // =========================================================================
    // 1. Переопределяем доставку (myDeliveryPrice) и финальную сумму (myFinalPrice)
    // =========================================================================
    const [myDeliveryPrice, setMyDeliveryPrice] = useState(deliveryPrice);
    const [myFinalPrice, setMyFinalPrice] = useState(finalPrice);

    // Если город НЕ "Город Ташкент", ставим 60 000, иначе 25 000
    useEffect(() => {
        if (deliveryAddress.city && deliveryAddress.city !== 'Город Ташкент') {
            setMyDeliveryPrice(500); // было 60000 UZS
        } else {
            setMyDeliveryPrice(200); // было 25000 UZS
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
    const handleCheckout = async () => {
        if (isBelowMinimum) return;

        if (checkoutFormRef.current && !checkoutFormRef.current.checkValidity()) {
            checkoutFormRef.current.reportValidity();
            return;
        }

        setLoading(true);
        try {
            // await submitOrder();
            await submitOrder(myFinalPrice, myDeliveryPrice);
        } catch (error) {
            console.error('Ошибка при оформлении заказа:', error);
            alert('Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте ещё раз.');
        } finally {
            setLoading(false);
        }
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
                <div className="total_cart_qy">{items.length} товара(ов)</div>
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
                            <Link href={`/product/${item.slug}`} className="cart_product_name">
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
                                    <span>Количество: </span>
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

        return () => clearTimeout(timer);
    }, [finalPrice, deliveryPrice]);

    // Обработчик нажатия на кнопку оформления заказа
    const onCheckout = () => {
        if (!isBelowMinimum && !loading) {
            handleCheckout(); // Вызываем переданную функцию
            router.push('/checkout'); // Перенаправление на страницу /checkout
        }
    };

    return (
        <div className="summary">
            <div className={`summary_green ${animate ? 'animate' : ''}`}>
                <div className="summary_price">
                    <h4>Итого:</h4>
                    <span className="cart_sum_tot_price">
                        {/* {finalPrice.toLocaleString('ru-RU')} сум */}
                        {(finalPrice / 100).toFixed(2)}$
                    </span>
                </div>

                <div className="summary_item">
                    <span className="cart_summary_items_count">
                        {totalItems} {totalItems === 1 ? 'позиция' : 'позиции'}
                    </span>
                    <span className="cart_summary_items_count_price">
                        {/* {totalPrice.toLocaleString('ru-RU')} сум */}
                        <span className="cart_summary_items_count_price">{(totalPrice / 100).toFixed(2)}$</span>
                    </span>
                </div>

                <div className="summary_item">
                    <span>Скидка Vitaline</span>
                    {/* <span className="cart_summary_items_discount_value">0 сум</span> */}
                    <span className="cart_summary_items_discount_value">0 $</span>

                </div>

                <div className="summary_item">
                    <span>Доставка*</span>
                    <span className="cart_summary_items_delivery_price">
                        {/* {deliveryPrice.toLocaleString('ru-RU')} сум */}
                        {(deliveryPrice / 100).toFixed(2)}$

                    </span>
                </div>

                {isBelowMinimum && (
                    <div className="summary_item minimum_order">
                        {/* <span>Минимальная сумма для заказа не должна быть менее 100 000 сум</span> */}
                        <span>Минимальная сумма для заказа не должна быть менее 100 $</span>

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
                    {loading ? 'Оформление...' : 'Оформить заказ'}
                </button>

                <p className="terms">
                    Нажимая на кнопку, вы соглашаетесь с{' '}
                    <Link href="/cart/rules">правилами покупки и условиями возврата</Link>.
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
    };
    updateCustomerInfo: (info: Partial<{ firstName: string; shopName: string; phone: string }>) => void;

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
        },
        ref: ForwardedRef<HTMLFormElement>
    ) => {
        const [phoneError, setPhoneError] = useState('');

        const handlePhoneChange = (formattedValue: string) => {
            updateCustomerInfo({ phone: formattedValue });

            // Валидация номера
            const phoneRegex = /^\+998\s\(\d{2}\)\s\d{3}-\d{2}-\d{2}$/;
            if (phoneRegex.test(formattedValue)) {
                setPhoneError('');
            } else {
                setPhoneError('Неверный формат номера телефона.');
            }
        };

        return (
            <form ref={ref} onSubmit={handleSubmit} className="checkout-form">
                <div className="general_inputs">
                    <h3>Данные получателя</h3>

                    <div className="form-group">
                        <label htmlFor="full-name">Имя Фамилия</label>
                        <input
                            type="text"
                            id="full-name"
                            value={customerInfo.firstName}
                            onChange={(e) => updateCustomerInfo({ firstName: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="full-name">Название магазина</label>
                        <input
                            type="text"
                            id="store-name"
                            value={customerInfo.shopName}
                            onChange={(e) => updateCustomerInfo({ shopName: e.target.value })}
                            required
                        />
                    </div>

                    <PhoneInput value={customerInfo.phone} onChange={handlePhoneChange} error={phoneError} />

                    <div className="abot_notify_block">
                        Мы пришлем уведомление о статусе заказа на указанный вами телефон.
                        <br />
                        Наш менеджер свяжется с Вами по телефону для уточнения времени доставки.
                    </div>
                </div>

                <div className="delivery_inputs">
                    <h3>Доставка</h3>

                    <div className="form-group">
                        <label htmlFor="city">Город</label>
                        <select
                            value={deliveryAddress.city}
                            onChange={(e) => updateDeliveryAddress({ city: e.target.value })}
                            required
                            className="quick_order_form"
                            aria-required="true"
                            aria-invalid="false"
                            name="your-region"
                            id="city"
                        >
                            <option value="">Выберите Ваш город</option>
                            <option value="Город Ташкент">Город Ташкент</option>
                            <option value="Ташкентская область">Ташкентская область</option>
                            <option value="Самарканд">Самарканд</option>
                            <option value="Бухара">Бухара</option>
                            <option value="Андижан">Андижан</option>
                            <option value="Фергана">Фергана</option>
                            <option value="Джизак">Джизак</option>
                            <option value="Каракалпакстан">Каракалпакстан</option>
                            <option value="Наманган">Наманган</option>
                            <option value="Навои">Навои</option>
                            <option value="Кашкадарья">Кашкадарья</option>
                            <option value="Сырдарья">Сырдарья</option>
                            <option value="Сурхандарья">Сурхандарья</option>
                            <option value="Хорезмская область">Хорезмская область</option>
                        </select>
                    </div>

                    <div className="form-group" style={{ display: 'none' }}>
                        <label className="for_mob_db">Способ доставки</label>
                        <div className="radio-group">
                            <label>
                                <input
                                    type="radio"
                                    name="delivery-method"
                                    value="courier"
                                    checked={deliveryMethod === 'courier'}
                                    onChange={() => setDeliveryMethod('courier')}
                                />
                                Курьерская доставка Vitaline в течение дня
                            </label>
                        </div>
                    </div>

                    {deliveryMethod === 'courier' && (
                        <>
                            <div className="form-group">
                                <label htmlFor="address">Адрес</label>
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
                        <label htmlFor="comment">Комментарий для курьера</label>
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
