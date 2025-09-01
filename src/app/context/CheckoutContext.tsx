// LOCAL Storage
// src/app/context/CheckoutContext.tsx
'use client'

import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface CustomerInfo {
    firstName: string;
    shopName: string;
    phone: string;
    email?: string;
    bonusCard?: string;        // поинты биллз
    pointsToUse?: number;      // поинты биллз
}

interface DeliveryAddress {
    city: string;
    street: string;
    full_address: string;
    house: string;
    apartment?: string;
}

interface CartItemDetailed {
    productId: string;
    name: string;
    price: string;
    qty: number;
    maxQty: number;
    total: number;
    image: string;
    slug: string;
    sku: string;
    selected?: boolean;
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
    submitOrder: (myFinalPrice: number, myDeliveryPrice: number) => Promise<{ success: boolean }>;
    validateForm: () => boolean;
}

export const CheckoutContext = createContext<CheckoutContextProps | undefined>(undefined);

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter();

    // Получаем данные корзины из localStorage
    const [cartItems, setCartItems] = useState<CartItemDetailed[]>(() => {
        if (typeof window !== 'undefined') {
            const savedCart = localStorage.getItem('vitaline_cart');
            return savedCart ? JSON.parse(savedCart).items || [] : [];
        }
        return [];
    });

    const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
        firstName: '',
        shopName: '',
        phone: '',
        email: '',
    });

    const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddress>({
        city: '',
        street: '',
        full_address: '',
        house: '',
        apartment: '',
    });

    const [deliveryMethod, setDeliveryMethod] = useState<string>('courier');
    const [paymentMethod, setPaymentMethod] = useState<string>('cod');
    const [comment, setComment] = useState<string>('');

    // Функция для обновления корзины в localStorage
    const updateLocalStorageCart = (updatedItems: CartItemDetailed[]) => {
        if (typeof window !== 'undefined') {
            const cartData = { items: updatedItems };
            localStorage.setItem('vitaline_cart', JSON.stringify(cartData));
            setCartItems(updatedItems);
        }
    };

    const updateCustomerInfo = (info: Partial<CustomerInfo>) => {
        setCustomerInfo(prev => ({ ...prev, ...info }));
    };

    const updateDeliveryAddress = (address: Partial<DeliveryAddress>) => {
        setDeliveryAddress(prev => ({ ...prev, ...address }));
    };

    const validateForm = (): boolean => {
        return customerInfo.firstName.trim() !== '' &&
            customerInfo.phone.trim() !== '' &&
            deliveryAddress.city.trim() !== '';
    };

    // Функция для генерации текущей даты и времени в UTC+5 в 24-часовом формате
    const getOrderDateUTCPlus5 = (): string => {
        const now = new Date();
        return now.toLocaleString("en-GB", { timeZone: "Asia/Tashkent" });
    };

    // Функция для генерации случайного 5-значного номера заказа
    const generateRandomOrderNumber = (): string => {
        return Math.floor(10000 + Math.random() * 90000).toString();
    };

    const submitOrder = async (myFinalPrice: number, myDeliveryPrice: number) => {
        if (!validateForm()) {
            throw new Error('Пожалуйста, заполните все обязательные поля.');
        }

        const orderDate = getOrderDateUTCPlus5();
        const orderNumber = generateRandomOrderNumber();

        const orderData = {
            // customerInfo,
            customerInfo: {
                ...customerInfo,
                bonusCard: customerInfo.bonusCard?.trim() || undefined,
                // pointsToUse: customerInfo.pointsToUse && customerInfo.pointsToUse > 0 ?
                //     parseFloat((customerInfo.pointsToUse / 12800).toFixed(2)) : undefined
                pointsToUse: customerInfo.pointsToUse ?
                    parseFloat((customerInfo.pointsToUse / 128).toFixed(2)) : undefined
            },
            deliveryAddress,
            deliveryMethod,
            paymentMethod,
            comment,
            items: cartItems,
            myFinalPrice,
            myDeliveryPrice,
            orderDate,
            orderNumber,
        };

        try {
            const response = await fetch('/api/checkout/submit-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            const data = await response.json();
            console.log('Ответ от API:', data);

            if (!response.ok) {
                throw new Error(data.message || 'Произошла ошибка при оформлении заказа');
            }

            // Удаление выбранных товаров из localStorage
            const updatedCartItems = cartItems.filter((item) => !item.selected);
            updateLocalStorageCart(updatedCartItems);

            // Хранение текущего заказа
            localStorage.setItem('vitaline_last_order', JSON.stringify({
                orderNumber,
                orderDate,
                totalAmount: myFinalPrice,
                customerName: customerInfo.firstName,
                customerPhone: customerInfo.phone,
                pointsUsed: customerInfo.pointsToUse && customerInfo.pointsToUse > 0 ?
                    parseFloat((customerInfo.pointsToUse / 12800).toFixed(2)) : null
            }));

            // Возвращаем успех, но НЕ делаем редирект здесь
            return { success: true };

        } catch (error: any) {
            console.error('Ошибка при отправке данных:', error);
            throw error;
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