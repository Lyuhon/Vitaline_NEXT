// // src/components/ProductInteractionsClient.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link'

interface Props {
    productName: string;
    productPrice: string;
    productImage: string;
}

export default function ProductInteractionsClient({ productName, productPrice, productImage }: Props) {
    const [quantity, setQuantity] = useState(1);
    const [authPopupOpen, setAuthPopupOpen] = useState(false);
    const [oneClickPopupOpen, setOneClickPopupOpen] = useState(false);

    useEffect(() => {
        const authenticityElement = document.querySelector('.ProductAuthenticity');
        const oneClickOrderElement = document.querySelector('.one_click_order');
        const quantityBlock = document.querySelector('.quantity-block');

        const handleQuantityClick = (e: Event) => {
            const target = e.target as HTMLElement;
            if (target.dataset.qtyAction === 'increment') {
                setQuantity(q => q + 1);
            } else if (target.dataset.qtyAction === 'decrement') {
                setQuantity(q => (q > 1 ? q - 1 : q));
            }
        };

        const handleAuthClick = () => setAuthPopupOpen(true);
        const handleOneClickOrder = () => setOneClickPopupOpen(true);

        if (quantityBlock) quantityBlock.addEventListener('click', handleQuantityClick);
        if (authenticityElement) authenticityElement.addEventListener('click', handleAuthClick);
        if (oneClickOrderElement) oneClickOrderElement.addEventListener('click', handleOneClickOrder);

        return () => {
            if (quantityBlock) quantityBlock.removeEventListener('click', handleQuantityClick);
            if (authenticityElement) authenticityElement.removeEventListener('click', handleAuthClick);
            if (oneClickOrderElement) oneClickOrderElement.removeEventListener('click', handleOneClickOrder);
        };
    }, []);

    useEffect(() => {
        const quantityValue = document.getElementById('quantity-value');
        if (quantityValue) {
            quantityValue.textContent = String(quantity);
        }
    }, [quantity]);

    return (
        <>
            {authPopupOpen && (
                <div className={`popup_overlay ${authPopupOpen ? 'open' : ''}`}>
                    <div className={`popup_content ${authPopupOpen ? 'open' : ''}`}>
                        <h3 style={{ fontSize: '20px', fontWeight: 600, marginBlock: '15px' }}>Оригинальный товар</h3>

                        <p>Товары, доступные на Vitaline, поставляются напрямую от брендов или авторизованных дистрибьюторов в США. Они хранятся и отправляются непосредственно с
                            <Link style={{ display: 'inlineBlock', padding: '0 5px', color: '#64B704', textDecoration: 'underline' }} href="/about-vitaline/#warehouse">наших  складов с климат-контролем и сертификацией GMP.</Link>
                            Vitaline не допускает сторонних реселлеров на свой веб-сайт.</p>

                        <span onClick={() => setAuthPopupOpen(false)} style={{ cursor: 'pointer', fontSize: '18px', fontWeight: 'bold', position: 'absolute', top: '10px', right: '10px' }}>×</span>
                    </div>
                </div>
            )}

            {oneClickPopupOpen && (
                <div className={`popup_overlay ${oneClickPopupOpen ? 'open' : ''}`}>
                    <div className={`popup_content ${oneClickPopupOpen ? 'open' : ''}`}>

                        <div className="product_info_for_popup" style={{ marginBottom: '15px' }}>

                            <h3 style={{ width: '80%', textAlign: 'center', fontSize: '20px', fontWeight: 600, margin: '0 auto 25px auto' }}>{productName}</h3>

                            <div className="product_pop_info">
                                <div className="image_and_price">
                                    <img src={productImage} alt={productName} style={{ objectFit: 'cover' }} />
                                    <p>{productPrice}</p>
                                </div>

                                <form>
                                    <input type="text" placeholder="Ваше имя" name="customer_name" />
                                    <input type="text" placeholder="Ваш телефон" name="customer_phone" />

                                    <select className="quick_order_form" aria-required="true" aria-invalid="false" name="your-region">
                                        <option value="">Выберите Ваш город</option>
                                        <option value="Город Ташкент">Город Ташкент</option>
                                        <option value="Ташкентская область">Ташкентская область</option>
                                        <option value="Самарканд">Самарканд</option>
                                        <option value="Бухара">Бухара</option>
                                        <option value="Андижан">Андижан</option>
                                        <option value="Фергана">Фергана</option>
                                        <option value="Джизак">Джизак</option>
                                        <option value="Каракалпакстан">Каракалпакстан</option>
                                        <option value="Наманган">Наманган</option>
                                        <option value="Навои">Навои</option>
                                        <option value="Кашкадарья">Кашкадарья</option>
                                        <option value="Сырдарья">Сырдарья</option>
                                        <option value="Сурхандарья">Сурхандарья</option>
                                        <option value="Хорезмская область">Хорезмская область</option>
                                    </select>

                                    <button style={{ background: '#64b704' }} type="submit">Отправить</button>
                                </form>
                            </div>

                        </div>

                        <span onClick={() => setOneClickPopupOpen(false)} style={{ cursor: 'pointer', fontSize: '25px', fontWeight: '500', position: 'absolute', top: '10px', right: '15px' }}>×</span>
                    </div>
                </div>
            )}
        </>
    );
}
