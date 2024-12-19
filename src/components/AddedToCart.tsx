// src/components/AddedToCart.jsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface AddedToCartProps {
    productName: string;
    imageUrl: string;
    initialQuantity?: number;
    stock?: number;
    onClose: () => void;
}

export default function AddedToCart({
    productName = 'Товар',
    imageUrl = '/images/product.jpg',
    initialQuantity = 1,
    stock = 10,
    onClose
}: AddedToCartProps) {
    const [quantity, setQuantity] = useState(initialQuantity);

    const increment = () => setQuantity(q => Math.min(q + 1, stock));
    const decrement = () => setQuantity(q => Math.max(1, q - 1));

    // Закрываем попап через 10 секунд
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 10000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="product-added-popup" style={popupStyles.container}>
            <button
                onClick={onClose}
                style={popupStyles.closeButton}
                aria-label="Закрыть"
            >
                ✕
            </button>

            <h2 style={popupStyles.title}>Товар добавлен в корзину</h2>

            <div style={popupStyles.content}>
                <div style={popupStyles.imageWrapper}>
                    <Image
                        src={imageUrl}
                        alt={productName}
                        width={80}
                        height={80}
                        style={popupStyles.image}
                    />
                </div>

                <div style={popupStyles.info}>
                    <p style={popupStyles.productName}>{productName}</p>

                    <div className="value_block" style={popupStyles.valueBlock}>
                        <span>Количество:</span>
                        <div className="quantity-block" style={popupStyles.quantityBlock}>
                            <div
                                className="quantity-button"
                                data-qty-action="decrement"
                                style={popupStyles.qtyButton}
                                onClick={decrement}
                            >
                                <svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 1.00002H1" stroke="#7A7680" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div className="quantity-value" style={popupStyles.qtyValue}>{quantity}</div>
                            <div
                                className="quantity-button"
                                data-qty-action="increment"
                                style={popupStyles.qtyButton}
                                onClick={increment}
                            >
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.00033 1V11" stroke="#7A7680" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M11 6.00002H1" stroke="#7A7680" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <Link href="/checkout" style={popupStyles.checkoutButton}>
                        🛒 Оформить заказ
                    </Link>
                </div>
            </div>

            {/* Линия обратного отсчёта */}
            <div className="popup-timer" style={popupStyles.timerLine}></div>
        </div>
    );
}

const popupStyles = {
    container: {
        position: 'fixed' as const,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: '#fff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 20px rgba(0,0,0,0.2)',
        zIndex: 9999,
        width: '300px',
        maxWidth: '80%',
        overflow: 'hidden',
        boxSizing: 'border-box' as const,
    },
    closeButton: {
        position: 'absolute' as const,
        top: '10px',
        right: '10px',
        background: 'transparent',
        border: 'none',
        fontSize: '18px',
        cursor: 'pointer',
    },
    title: {
        fontSize: '18px',
        marginBottom: '15px',
        textAlign: 'center' as const
    },
    content: {
        display: 'flex',
        gap: '10px'
    },
    imageWrapper: {
        flexShrink: 0 as const
    },
    image: {
        borderRadius: '5px'
    },
    info: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'space-between'
    },
    productName: {
        fontSize: '14px',
        margin: '0 0 10px 0'
    },
    valueBlock: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '5px',
        marginBottom: '10px'
    },
    quantityBlock: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px'
    },
    qtyButton: {
        width: '24px',
        height: '24px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        background: '#f7f7f7',
        cursor: 'pointer',
        lineHeight: '0',
        fontSize: '18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    qtyValue: {
        display: 'inline-block',
        minWidth: '20px',
        textAlign: 'center' as const
    },
    checkoutButton: {
        background: '#64b704',
        color: '#fff',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '14px',
        textAlign: 'center' as const,
        textDecoration: 'none',
        marginTop: '10px'
    },
    timerLine: {
        position: 'absolute' as const,
        bottom: 0,
        left: 0,
        height: '5px',
        background: '#64b704',
        animation: 'countdown 10s linear forwards'
    }
};

// В вашем глобальном CSS:
/*
@keyframes countdown {
  from { width: 100%; }
  to { width: 0%; }
}
*/

