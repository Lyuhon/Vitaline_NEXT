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
                {/* <button className="actb_close_button" onClick={onClose} aria-label="Закрыть">&times;</button> */}
                <span className="actb_close_button" onClick={onClose} aria-label="Закрыть">×</span>

                <div className="added_to_cart_pop">
                    <img src={productImage} alt={productName} className="actb_popup_product_image" />

                    <div className="pop_prod_inf">
                        <h4 className="actb_popup_title">Товар добавлен в корзину</h4>
                        <p className="actb_popup_product_name">{productName}</p>
                        <p className="actb_popup_quantity"><span className='actb_popup_quantity_str'>Количество: </span>{quantity}</p>
                        <Link href="/cart" className="actb_popup_button">
                            Просмотреть корзину
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MiniCartPopup;
