// src/app/context/types.ts

export interface ProductImage {
    sourceUrl: string;
}

export interface Product {
    id: string;
    name: string;
    slug: string;
    price: string;
    stockStatus: string;
    stockQuantity: number;
    image: ProductImage;
}

export interface CartItem {
    productId: string;
    qty: number;
    name: string;
    price: string;
    image: string;
    total: number;
    maxQty: number;
    selected?: boolean;
}

export interface CheckoutOrderItem {
    productId: string;
    name: string;
    price: string;
    qty: number;
    total: number;
    image: string;
}

export interface CustomerInfo {
    firstName: string;
    phone: string;
}

export interface DeliveryAddress {
    city: string;
    street: string;
    house: string;
    apartment?: string;
}

export interface CheckoutContextProps {
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
