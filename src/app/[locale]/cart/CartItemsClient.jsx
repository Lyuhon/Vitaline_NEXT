// // // components/CartItemsClient.jsx
// 'use client';

// import React, { useContext, useState, useRef } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import RemoveItemButton from '@/components/RemoveItemButton';
// import { CartContext } from '../context/CartContext';

// export default function CartItemsClient() {
//     const {
//         items,
//         toggleSelectAll,
//         selectAll,
//         toggleItemSelection,
//         handleItemQuantityChange,
//         parsePrice,
//     } = useContext(CartContext);

//     // Состояние для отслеживания редактируемого элемента
//     const [editingItemId, setEditingItemId] = useState(null);
//     const [inputValue, setInputValue] = useState('');
//     const inputRef = useRef(null);

//     const handleDecrement = (item) => {
//         if (item.qty > 1) {
//             handleItemQuantityChange(item.id, item.qty - 1);
//         }
//     };

//     const handleIncrement = (item) => {
//         if (item.qty < item.maxQty) {
//             handleItemQuantityChange(item.id, item.qty + 1);
//         }
//     };

//     const handleValueClick = (item) => {
//         setEditingItemId(item.id);
//         setInputValue(item.qty.toString());
//         // Даем время для рендеринга input перед фокусом
//         setTimeout(() => {
//             inputRef.current?.focus();
//             inputRef.current?.select();
//         }, 0);
//     };

//     const handleInputChange = (e) => {
//         // Удаляем все нецифровые символы и ограничиваем длину до 3 символов
//         const value = e.target.value.replace(/[^\d]/g, '').slice(0, 3);
//         setInputValue(value);
//     };

//     const validateAndUpdateQuantity = (item, value) => {
//         let newQuantity = parseInt(value, 10);

//         // Проверяем валидность введенного значения
//         if (isNaN(newQuantity) || newQuantity < 1) {
//             newQuantity = 1;
//         } else if (newQuantity > item.maxQty) {
//             newQuantity = item.maxQty;
//         }

//         handleItemQuantityChange(item.id, newQuantity);
//         setEditingItemId(null);
//     };

//     const handleInputBlur = (item) => {
//         validateAndUpdateQuantity(item, inputValue);
//     };

//     const handleKeyDown = (e, item) => {
//         if (e.key === 'Enter') {
//             validateAndUpdateQuantity(item, inputValue);
//         }
//         if (e.key === 'Escape') {
//             setEditingItemId(null);
//             setInputValue(item.qty.toString());
//         }
//     };

//     return (
//         <>
//             {/* Секция "Выделить все товары" */}
//             <div className="select-all">
//                 <div className="checkbox_sell_all">
//                     <input
//                         type="checkbox"
//                         id="select-all"
//                         checked={selectAll}
//                         onChange={toggleSelectAll}
//                     />
//                     <label htmlFor="select-all">Выделить все товары</label>
//                 </div>
//                 <div className="total_cart_qy">
//                     {items.length} позиций
//                 </div>
//             </div>

//             {/* Список товаров в корзине */}
//             {items.map(item => (
//                 <div className="relative item" key={item.id}>
//                     <input
//                         type="checkbox"
//                         className="item-select"
//                         checked={item.selected}
//                         onChange={() => toggleItemSelection(item.id)}
//                     />
//                     <Image
//                         src={item.image?.sourceUrl ?? '/images/default-product.png'}
//                         alt={item.name}
//                         width={120}
//                         height={120}
//                     />
//                     <div className="info_block_main">
//                         <div className="item-info">
//                             <Link href={`/product/${item.slug}`} className="cart_product_name">
//                                 {item.name}
//                             </Link>
//                         </div>
//                         <div className="value_block">
//                             <div className="quantity-block">
//                                 <div
//                                     className="quantity-button"
//                                     data-qty-action="decrement"
//                                     onClick={() => handleDecrement(item)}
//                                 >
//                                     -
//                                 </div>
//                                 {editingItemId === item.id ? (
//                                     <input
//                                         ref={inputRef}
//                                         type="text"
//                                         className="quantity-value"
//                                         value={inputValue}
//                                         onChange={handleInputChange}
//                                         onBlur={() => handleInputBlur(item)}
//                                         onKeyDown={(e) => handleKeyDown(e, item)}
//                                         inputMode="numeric"
//                                         pattern="\d*"
//                                         maxLength={3}
//                                         style={{
//                                             width: `${Math.max(inputValue.length * 8, 20)}px`,
//                                             minWidth: '20px',
//                                             textAlign: 'center',
//                                             border: 'none',
//                                             outline: 'none',
//                                             background: 'transparent',
//                                             padding: 0,
//                                             margin: 0,
//                                             font: 'inherit'
//                                         }}
//                                     />
//                                 ) : (
//                                     <div
//                                         className={`quantity-value${item.qty === item.maxQty ? ' dis_increment' : ''}`}
//                                         onClick={() => handleValueClick(item)}
//                                         style={{ cursor: 'text' }}
//                                     >
//                                         {item.qty}
//                                     </div>
//                                 )}
//                                 <div
//                                     className={`quantity-button${item.qty === item.maxQty ? ' dis_increment' : ''}`}
//                                     data-qty-action="increment"
//                                     onClick={() => handleIncrement(item)}
//                                 >
//                                     +
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="cart_item_price">
//                             {(item.total / 100).toFixed(2)}$
//                         </div>
//                     </div>

//                     <RemoveItemButton productId={item.id} />

//                     {/* ОТОБРАЖЕНИЕ МАКС. КОЛ-ВА НА ЗАКАЗ */}
//                     {item.maxOrderQty && item.maxOrderQty < item.stockQuantity && (
//                         <div className="absolute bottom-[-10px] right-[-7px] px-2 py-1 bg-amber-50 border border-amber-200 rounded-[7px] text-xs text-amber-800 mt-1"
//                             style={{ border: '1px solid' }}>
//                             ⚠️ Макс. {item.maxOrderQty} шт. в заказе
//                         </div>
//                     )}
//                 </div>

//             ))}
//         </>
//     );
// }




// components/CartItemsClient.tsx
'use client';

import React, { useContext, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import RemoveItemButton from '@/components/RemoveItemButton';
import { CartContext } from '../context/CartContext';
import { useTranslations } from 'next-intl';

export default function CartItemsClient() {
    const t = useTranslations('cart');
    const {
        items,
        toggleSelectAll,
        selectAll,
        toggleItemSelection,
        handleItemQuantityChange,
        parsePrice,
    } = useContext(CartContext);

    // Состояние для отслеживания редактируемого элемента
    const [editingItemId, setEditingItemId] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);

    const handleDecrement = (item) => {
        if (item.qty > 1) {
            handleItemQuantityChange(item.id, item.qty - 1);
        }
    };

    const handleIncrement = (item) => {
        if (item.qty < item.maxQty) {
            handleItemQuantityChange(item.id, item.qty + 1);
        }
    };

    const handleValueClick = (item) => {
        setEditingItemId(item.id);
        setInputValue(item.qty.toString());
        // Даем время для рендеринга input перед фокусом
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.select();
        }, 0);
    };

    const handleInputChange = (e) => {
        // Удаляем все нецифровые символы и ограничиваем длину до 3 символов
        const value = e.target.value.replace(/[^\d]/g, '').slice(0, 3);
        setInputValue(value);
    };

    const validateAndUpdateQuantity = (item, value) => {
        let newQuantity = parseInt(value, 10);

        // Проверяем валидность введенного значения
        if (isNaN(newQuantity) || newQuantity < 1) {
            newQuantity = 1;
        } else if (newQuantity > item.maxQty) {
            newQuantity = item.maxQty;
        }

        handleItemQuantityChange(item.id, newQuantity);
        setEditingItemId(null);
    };

    const handleInputBlur = (item) => {
        validateAndUpdateQuantity(item, inputValue);
    };

    const handleKeyDown = (e, item) => {
        if (e.key === 'Enter') {
            validateAndUpdateQuantity(item, inputValue);
        }
        if (e.key === 'Escape') {
            setEditingItemId(null);
            setInputValue(item.qty.toString());
        }
    };

    return (
        <>
            {/* Секция "Выделить все товары" */}
            <div className="select-all">
                <div className="checkbox_sell_all">
                    <input
                        type="checkbox"
                        id="select-all"
                        checked={selectAll}
                        onChange={toggleSelectAll}
                    />
                    <label htmlFor="select-all">{t('selectAllItems')}</label>
                </div>
                <div className="total_cart_qy">
                    {t('positions', { count: items.length })}
                </div>
            </div>

            {/* Список товаров в корзине */}
            {items.map(item => (
                <div className="relative item" key={item.id}>
                    <input
                        type="checkbox"
                        className="item-select"
                        checked={item.selected}
                        onChange={() => toggleItemSelection(item.id)}
                    />
                    <Image
                        src={item.image?.sourceUrl ?? '/images/default-product.png'}
                        alt={item.name}
                        width={120}
                        height={120}
                    />
                    <div className="info_block_main">
                        <div className="item-info">
                            <Link href={`/product/${item.slug}`} className="cart_product_name">
                                {item.name}
                            </Link>
                        </div>
                        <div className="value_block">
                            <div className="quantity-block">
                                <div
                                    className="quantity-button"
                                    data-qty-action="decrement"
                                    onClick={() => handleDecrement(item)}
                                >
                                    -
                                </div>
                                {editingItemId === item.id ? (
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        className="quantity-value"
                                        value={inputValue}
                                        onChange={handleInputChange}
                                        onBlur={() => handleInputBlur(item)}
                                        onKeyDown={(e) => handleKeyDown(e, item)}
                                        inputMode="numeric"
                                        pattern="\d*"
                                        maxLength={3}
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
                                        className={`quantity-value${item.qty === item.maxQty ? ' dis_increment' : ''}`}
                                        onClick={() => handleValueClick(item)}
                                        style={{ cursor: 'text' }}
                                    >
                                        {item.qty}
                                    </div>
                                )}
                                <div
                                    className={`quantity-button${item.qty === item.maxQty ? ' dis_increment' : ''}`}
                                    data-qty-action="increment"
                                    onClick={() => handleIncrement(item)}
                                >
                                    +
                                </div>
                            </div>
                        </div>
                        <div className="cart_item_price">
                            {(item.total / 100).toFixed(2)}$
                        </div>
                    </div>

                    <RemoveItemButton productId={item.id} />

                    {/* ОТОБРАЖЕНИЕ МАКС. КОЛ-ВА НА ЗАКАЗ */}
                    {item.maxOrderQty && item.maxOrderQty < item.stockQuantity && (
                        <div className="absolute bottom-[-10px] right-[-7px] px-2 py-1 bg-amber-50 border border-amber-200 rounded-[7px] text-xs text-amber-800 mt-1"
                            style={{ border: '1px solid' }}>
                            ⚠️ {t('maxInOrder', { count: item.maxOrderQty })}
                        </div>
                    )}
                </div>

            ))}
        </>
    );
}