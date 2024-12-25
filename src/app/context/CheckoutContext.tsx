// src/app/context/CheckoutContext.tsx
'use client'

import React, { createContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

// src/app/context/CheckoutContext.tsx
import { CartContext } from '../context/CartContext';
import { useContext } from 'react';


interface CustomerInfo {
    firstName: string;
    phone: string;
}

interface DeliveryAddress {
    city: string;
    street: string;
    house: string;
    apartment?: string;
}

interface CheckoutContextProps {
    customerInfo: CustomerInfo;
    deliveryAddress: DeliveryAddress;
    deliveryMethod: string;
    paymentMethod: string;
    comment: string;
    updateCustomerInfo: (info: Partial<CustomerInfo>) => void;
    updateDeliveryAddress: (address: Partial<DeliveryAddress>) => void;
    setDeliveryMethod: (method: string) => void;
    setPaymentMethod: (method: string) => void;
    setComment: (comment: string) => void;
    submitOrder: () => Promise<void>;
    validateForm: () => boolean;
}

export const CheckoutContext = createContext<CheckoutContextProps | undefined>(undefined);

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter();

    // Получаем данные корзины
    const { items: cartItems } = useContext(CartContext);

    const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
        firstName: '',
        phone: '',
    });

    const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddress>({
        city: '',
        street: '',
        house: '',
        apartment: '',
    });

    const [deliveryMethod, setDeliveryMethod] = useState<string>('courier');
    const [paymentMethod, setPaymentMethod] = useState<string>('card');
    const [comment, setComment] = useState<string>('');

    const updateCustomerInfo = (info: Partial<CustomerInfo>) => {
        setCustomerInfo(prev => ({ ...prev, ...info }));
    };

    const updateDeliveryAddress = (address: Partial<DeliveryAddress>) => {
        setDeliveryAddress(prev => ({ ...prev, ...address }));
    };

    const validateForm = (): boolean => {
        return customerInfo.firstName.trim() !== '' && customerInfo.phone.trim() !== '' && deliveryAddress.city.trim() !== '';
    };

    const submitOrder = async () => {
        if (!validateForm()) {
            alert('Пожалуйста, заполните все обязательные поля.');
            return;
        }

        // Собираем все данные для отправки, включая товары из корзины
        const orderData = {
            customerInfo,
            deliveryAddress,
            deliveryMethod,
            paymentMethod,
            comment,
            items: cartItems, // Добавляем массив товаров
        };

        try {
            const response = await fetch('/api/checkout/submit-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {
                // router.push('/checkout/success');
                // Очистка корзины после успешного заказа
                await fetch('/api/cart/remove', {
                    method: 'POST',
                });

                router.push('/checkout/success');
            } else {
                console.error('Ошибка при отправке данных');
                alert('Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте еще раз или сделайте зайказ по телефону.');
            }
        } catch (error) {
            console.error('Ошибка при отправке данных:', error);
            alert('Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте еще раз или сделайте зайказ по телефону.');
        }
    };

    return (
        <CheckoutContext.Provider
            value={{
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
            }}
        >
            {children}
        </CheckoutContext.Provider>
    );
};




