





// // src/app/context/CheckoutContext.tsx
'use client'

import React, { createContext, useState, ReactNode, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { CartContext } from '../context/CartContext';

interface CustomerInfo {
    firstName: string;
    shopName: string;
    phone: string;
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
    slug: string;  // <-- Добавлено поле slug
    sku: string;   // <-- Добавлено поле sku
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
    submitOrder: (myFinalPrice: number, myDeliveryPrice: number) => Promise<void>;
    validateForm: () => boolean;
}

export const CheckoutContext = createContext<CheckoutContextProps | undefined>(undefined);

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter();

    // Получаем данные корзины
    const { items: cartItems } = useContext(CartContext);

    const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
        firstName: '',
        shopName: '',
        phone: '',
    });

    const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddress>({
        city: '',
        street: '',
        full_address: '',
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

    // Функция для генерации текущей даты и времени в UTC+5 в 24-часовом формате
    const getOrderDateUTCPlus5 = (): string => {
        const now = new Date();
        // Используем toLocaleString с временной зоной "Asia/Tashkent" (UTC+5) и 24-часовым форматом
        return now.toLocaleString("en-GB", { timeZone: "Asia/Tashkent" });
    };

    // Функция для генерации случайного 5-значного номера заказа
    const generateRandomOrderNumber = (): string => {
        return Math.floor(10000 + Math.random() * 90000).toString();
    };

    const submitOrder = async (myFinalPrice: number, myDeliveryPrice: number) => {
        if (!validateForm()) {
            alert('Пожалуйста, заполните все обязательные поля.');
            return;
        }

        // Генерация даты и времени заказа в UTC+5
        const orderDate = getOrderDateUTCPlus5();

        // Генерация случайного 5-значного номера заказа
        const orderNumber = generateRandomOrderNumber();

        // Собираем все данные для отправки, включая товары из корзины и новые поля
        const orderData = {
            customerInfo,
            deliveryAddress,
            deliveryMethod,
            paymentMethod,
            comment,
            items: cartItems, // Массив товаров с sku и slug
            myFinalPrice,
            myDeliveryPrice,
            orderDate,      // <-- Добавлено поле даты и времени заказа
            orderNumber,    // <-- Добавлено поле номера заказа
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
                // Очистка корзины после успешного заказа
                await fetch('/api/cart/remove-selected', { method: 'POST' });

                router.push('/checkout/success');
            } else {
                console.error('Ошибка при отправке данных');
                alert('Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте еще раз или сделайте заказ по телефону.');
            }
        } catch (error) {
            console.error('Ошибка при отправке данных:', error);
            alert('Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте еще раз или сделайте заказ по телефону.');
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















// // src/app/context/CheckoutContext.tsx
// 'use client'

// import React, { createContext, useState, ReactNode, useContext } from 'react';
// import { useRouter } from 'next/navigation';
// import { CartContext } from '../context/CartContext';

// interface CustomerInfo {
//     firstName: string;
//     shopName: string;
//     phone: string;
//     email?: string; // Добавлено поле email
// }

// interface DeliveryAddress {
//     city: string;
//     full_address: string;
// }

// interface CartItemDetailed {
//     productId: string;
//     name: string;
//     price: string;
//     qty: number;
//     maxQty: number;
//     total: number;
//     image: string;
//     slug: string;
//     sku: string;
// }

// interface CheckoutContextProps {
//     customerInfo: CustomerInfo;
//     deliveryAddress: DeliveryAddress;
//     deliveryMethod: string;
//     paymentMethod: string;
//     comment: string;
//     updateCustomerInfo: (info: Partial<CustomerInfo>) => void;
//     updateDeliveryAddress: (address: Partial<DeliveryAddress>) => void;
//     setDeliveryMethod: (method: string) => void;
//     setPaymentMethod: (method: string) => void;
//     setComment: (comment: string) => void;
//     submitOrder: (myFinalPrice: number, myDeliveryPrice: number) => Promise<void>;
//     validateForm: () => boolean;
// }

// export const CheckoutContext = createContext<CheckoutContextProps | undefined>(undefined);

// export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
//     const router = useRouter();

//     // Получаем данные корзины
//     const { items: cartItems } = useContext(CartContext);

//     const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
//         firstName: '',
//         shopName: '',
//         phone: '',
//         email: '', // Добавлено поле email
//     });

//     const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddress>({
//         city: '',
//         full_address: '',
//     });

//     const [deliveryMethod, setDeliveryMethod] = useState<string>('courier');
//     const [paymentMethod, setPaymentMethod] = useState<string>('cod'); // Изменено на 'cod'
//     const [comment, setComment] = useState<string>('');

//     const updateCustomerInfo = (info: Partial<CustomerInfo>) => {
//         setCustomerInfo(prev => ({ ...prev, ...info }));
//     };

//     const updateDeliveryAddress = (address: Partial<DeliveryAddress>) => {
//         setDeliveryAddress(prev => ({ ...prev, ...address }));
//     };

//     const validateForm = (): boolean => {
//         return customerInfo.firstName.trim() !== '' && customerInfo.phone.trim() !== '' && deliveryAddress.city.trim() !== '';
//     };

//     // Функция для генерации текущей даты и времени в UTC+5 в 24-часовом формате
//     const getOrderDateUTCPlus5 = (): string => {
//         const now = new Date();
//         // Используем toLocaleString с временной зоной "Asia/Tashkent" (UTC+5) и 24-часовым форматом
//         return now.toLocaleString("en-GB", { timeZone: "Asia/Tashkent" });
//     };

//     // Функция для генерации случайного 5-значного номера заказа
//     const generateRandomOrderNumber = (): string => {
//         return Math.floor(10000 + Math.random() * 90000).toString();
//     };

//     const submitOrder = async (myFinalPrice: number, myDeliveryPrice: number) => {
//         if (!validateForm()) {
//             alert('Пожалуйста, заполните все обязательные поля.');
//             return;
//         }

//         // Генерация даты и времени заказа в UTC+5
//         const orderDate = getOrderDateUTCPlus5();

//         // Генерация случайного 5-значного номера заказа
//         const orderNumber = generateRandomOrderNumber();

//         // Собираем все данные для отправки, включая товары из корзины и новые поля
//         const orderData = {
//             customerInfo,
//             deliveryAddress,
//             deliveryMethod,
//             paymentMethod,
//             comment,
//             items: cartItems, // Массив товаров с sku и slug
//             myFinalPrice,
//             myDeliveryPrice,
//             orderDate,      // <-- Добавлено поле даты и времени заказа
//             orderNumber,    // <-- Добавлено поле номера заказа
//         };

//         try {
//             const response = await fetch('/api/checkout/submit-order', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(orderData),
//             });

//             const data = await response.json();
//             console.log('Ответ от API:', data);

//             if (response.ok) {
//                 // Очистка корзины после успешного заказа
//                 await fetch('/api/cart/remove-selected', { method: 'POST' });

//                 router.push('/checkout/success');
//             } else {
//                 console.error('Ошибка при отправке данных:', data.message || 'Произошла ошибка');
//                 alert(`Произошла ошибка при оформлении заказа: ${data.message || 'Попробуйте еще раз.'}`);
//             }
//         } catch (error: any) {
//             console.error('Ошибка при отправке данных:', error);
//             alert('Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте еще раз или сделайте заказ по телефону.');
//         }
//     };

//     return (
//         <CheckoutContext.Provider
//             value={{
//                 customerInfo,
//                 deliveryAddress,
//                 deliveryMethod,
//                 paymentMethod,
//                 comment,
//                 updateCustomerInfo,
//                 updateDeliveryAddress,
//                 setDeliveryMethod,
//                 setPaymentMethod,
//                 setComment,
//                 submitOrder,
//                 validateForm,
//             }}
//         >
//             {children}
//         </CheckoutContext.Provider>
//     );
// };
