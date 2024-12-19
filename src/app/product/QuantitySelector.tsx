// src/components/QuantitySelector.tsx
'use client';

import React from 'react';

interface QuantitySelectorProps {
    quantity: number;
    maxQuantity: number;
    onQuantityChange: (quantity: number) => void;
}

export default function QuantitySelector({ quantity, maxQuantity, onQuantityChange }: QuantitySelectorProps) {

    const increment = () => {
        if (quantity < maxQuantity) {
            onQuantityChange(quantity + 1);
        }
    };

    const decrement = () => {
        if (quantity > 1) {
            onQuantityChange(quantity - 1);
        }
    };

    // Проверяем, достигнуто ли максимальное количество
    const isIncrementDisabled = quantity >= maxQuantity;

    return (
        <div className="value_block">
            <span>Количество:</span>
            <div className="quantity-block">
                <div className="quantity-button" onClick={decrement} aria-label="Уменьшить количество">
                    {/* SVG для декремента */}
                    <svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 1H1" stroke="#7A7680" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <div className="quantity-value">{quantity}</div>
                <div
                    className={`quantity-button ${isIncrementDisabled ? 'dis_increment' : ''}`}
                    onClick={increment}
                    aria-label="Увеличить количество"
                >
                    {/* SVG для инкремента */}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 1V11" stroke="#7A7680" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M11 6H1" stroke="#7A7680" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
