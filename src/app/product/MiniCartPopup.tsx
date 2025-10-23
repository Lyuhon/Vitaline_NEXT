// src/components/MiniCartPopup.tsx
'use client';

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Link from 'next/link';

interface MiniCartPopupProps {
    productImage: string;
    productName: string;
    quantity: number;
    onClose: () => void;
}

const MiniCartPopup: React.FC<MiniCartPopupProps> = ({ productImage, productName, quantity, onClose }) => {
    const [isClosing, setIsClosing] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(onClose, 300); // Длительность анимации должна совпадать с CSS
    };

    if (!mounted) return null;

    return ReactDOM.createPortal(
        <div
            className={`actb_popup_overlay ${isClosing ? 'fade-out' : ''}`}
            onClick={handleClose}
        >
            <div
                className={`actb_popup_content ${isClosing ? 'fade-out' : ''}`}
                onClick={(e) => e.stopPropagation()}
            >
                <span className="actb_close_button" onClick={handleClose} aria-label="Закрыть">
                    ×
                </span>

                <div className="added_to_cart_pop">
                    <img src={productImage} alt={productName} className="actb_popup_product_image" />

                    <div className="pop_prod_inf">
                        <h4 className="actb_popup_title">Товар добавлен в корзину</h4>
                        <p className="actb_popup_product_name">{productName}</p>
                        <p className="actb_popup_quantity">
                            <span className="actb_popup_quantity_str">Количество: </span>
                            {quantity}
                        </p>
                        <Link href="/cart" className="actb_popup_button">
                            Просмотреть корзину
                        </Link>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default MiniCartPopup;
