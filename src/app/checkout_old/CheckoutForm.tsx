// src/app/checkout/CheckoutForm.tsx
'use client';

import { useContext, useEffect, useState } from 'react';
import { CheckoutContext } from '@/app/context/CheckoutContext';

export default function CheckoutForm() {
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
        validateForm
    } = useContext(CheckoutContext)!;

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        validateForm();
    }, [customerInfo, deliveryAddress, deliveryMethod, validateForm]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await submitOrder();
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="checkout-form">

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
                    <label htmlFor="phone">Телефон</label>
                    <input
                        type="tel"
                        id="phone"
                        value={customerInfo.phone}
                        onChange={(e) => updateCustomerInfo({ phone: e.target.value })}
                        placeholder="+998 XX XXX-XX-XX"
                        required
                    />
                </div>

                <div className="abot_notify_block">
                    Мы пришлем уведомление о статусе заказа на указанный вами телефон.
                    <br />Наш менеджер свяжется с Вами по телефону для уточнения времени доставки.
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

                <div className="form-group">
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
                            <label htmlFor="address">Район, улица</label>
                            <input
                                type="text"
                                id="address"
                                value={deliveryAddress.street}
                                onChange={(e) => updateDeliveryAddress({ street: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
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
                        </div>
                    </>
                )}

                <div className="form-group">
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
                </div>

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


