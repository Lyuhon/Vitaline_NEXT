// src/components/MiniCartPopup.tsx
'use client';

import React from 'react';
import Link from 'next/link';

interface MiniCartPopupProps {
    productImage: string;
    productName: string;
    quantity: number;
    onClose: () => void;
}

const MiniCartPopup: React.FC<MiniCartPopupProps> = ({ productImage, productName, quantity, onClose }) => {
    return (
        <div className="actb_popup_overlay" onClick={onClose}>
            <div className="actb_popup_content" onClick={(e) => e.stopPropagation()}>
                <button className="actb_close_button" onClick={onClose} aria-label="Закрыть">&times;</button>
                <img src={productImage} alt={productName} className="actb_popup_product_image" />
                <h4 className="actb_popup_title">Товар добавлен в корзину</h4>
                <p className="actb_popup_product_name"><strong>{productName}</strong></p>
                <p className="actb_popup_quantity">Количество: {quantity}</p>
                <Link href="/cart" className="actb_popup_button">
                    Перейти к корзине
                </Link>
            </div>
        </div>
    );
};

export default MiniCartPopup;
