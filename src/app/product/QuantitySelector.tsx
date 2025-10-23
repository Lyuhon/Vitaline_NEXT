// // src/components/QuantitySelector.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';

interface QuantitySelectorProps {
    quantity: number;
    maxQuantity: number;
    onQuantityChange: (quantity: number) => void;
}

export default function QuantitySelector({ quantity, maxQuantity, onQuantityChange }: QuantitySelectorProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(quantity.toString());
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setInputValue(quantity.toString());
    }, [quantity]);

    const handleValueClick = () => {
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.select();
        }, 0);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Удаляем все нецифровые символы и ограничиваем длину до 3 символов
        const value = e.target.value.replace(/[^\d]/g, '').slice(0, 3);
        setInputValue(value);
    };

    const handleInputBlur = () => {
        setIsEditing(false);
        validateAndUpdateQuantity(inputValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setIsEditing(false);
            validateAndUpdateQuantity(inputValue);
        }
        if (e.key === 'Escape') {
            setIsEditing(false);
            setInputValue(quantity.toString());
        }
    };

    const validateAndUpdateQuantity = (value: string) => {
        let newQuantity = parseInt(value, 10);

        if (isNaN(newQuantity) || newQuantity < 1) {
            newQuantity = 1;
        } else if (newQuantity > maxQuantity) {
            newQuantity = maxQuantity;
        }

        onQuantityChange(newQuantity);
        setInputValue(newQuantity.toString());
    };

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

    const isIncrementDisabled = quantity >= maxQuantity;

    return (
        <div className="value_block">
            <span>Количество:</span>
            <div className="quantity-block">
                <div
                    className="quantity-button"
                    onClick={decrement}
                    aria-label="Уменьшить количество"
                >
                    <svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 1H1" stroke="#7A7680" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                {isEditing ? (
                    <input
                        ref={inputRef}
                        type="text"
                        inputMode="numeric"
                        pattern="\d*"
                        maxLength={3}
                        className="quantity-value"
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        onKeyDown={handleKeyDown}
                        style={{
                            width: `${Math.max(inputValue.length * 8, 20)}px`,
                            minWidth: '20px',
                            textAlign: 'center',
                            border: 'none',
                            outline: 'none',
                            background: 'transparent',
                            padding: 0,
                            margin: 0,
                            font: 'inherit'
                        }}
                    />
                ) : (
                    <div
                        className="quantity-value"
                        onClick={handleValueClick}
                        style={{ cursor: 'text' }}
                    >
                        {quantity}
                    </div>
                )}

                <div
                    className={`quantity-button ${isIncrementDisabled ? 'dis_increment' : ''}`}
                    onClick={increment}
                    aria-label="Увеличить количество"
                >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 1V11" stroke="#7A7680" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M11 6H1" stroke="#7A7680" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
        </div>
    );
}