// src/components/AddToCartSection.tsx
'use client';

import { useState } from 'react';
import QuantitySelector from './QuantitySelector';
import AddToCartButton from '@/components/AddToCartButton';

interface AddToCartSectionProps {
    productId: string;
    productName: string;
    productImage: string;
    productPrice: number;
    maxQuantity: number;
    stock: boolean;
}

export default function AddToCartSection({
    productId,
    productName,
    productImage,
    productPrice,
    maxQuantity,
    stock,
}: AddToCartSectionProps) {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (newQuantity: number) => {
        setQuantity(newQuantity);
    };

    return (
        <div className="add_to_cart_section">
            <QuantitySelector
                quantity={quantity}
                maxQuantity={maxQuantity}
                onQuantityChange={handleQuantityChange}
            />
            <AddToCartButton
                productId={productId}
                productName={productName}
                productImage={productImage}
                productPrice={productPrice}
                maxQuantity={maxQuantity}
                initialQty={quantity} // Передаём текущее количество
                stock={stock}
            />
        </div>
    );
}

