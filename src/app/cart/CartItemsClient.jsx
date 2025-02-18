// // components/CartItemsClient.jsx
// 'use client';

// import React, { useContext } from 'react';
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
//                 <div className="item" key={item.id}>
//                     <input
//                         type="checkbox"
//                         className="item-select"
//                         checked={item.selected}
//                         onChange={() => toggleItemSelection(item.id)}
//                     />
//                     {/* <img
//                         src={item.image?.sourceUrl ?? '/images/default-product.png'}
//                         alt={item.name}
//                     /> */}
//                     <Image
//                         src={item.image?.sourceUrl ?? '/images/default-product.png'}
//                         alt={item.name}
//                         width={120}
//                         height={120}
//                     />
//                     <div className="info_block_main">
//                         <div className="item-info">
//                             {/* <h3 className="cart_brand_name">Бренд</h3> */}
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
//                                 <div
//                                     className={`quantity-value${item.qty === item.maxQty ? ' dis_increment' : ''}`}
//                                 >
//                                     {item.qty}
//                                 </div>
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
//                             {/* {item.total.toLocaleString('ru-RU')} сум */}
//                             {(item.total / 100).toFixed(2)}$

//                         </div>
//                     </div>

//                     <RemoveItemButton productId={item.id} />
//                 </div>
//             ))}
//         </>
//     );
// }


// // LOCAL Storage qty buttons
// // components/CartItemsClient.jsx

'use client';

import React, { useContext, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import RemoveItemButton from '@/components/RemoveItemButton';
import { CartContext } from '../context/CartContext';

export default function CartItemsClient() {
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
                    <label htmlFor="select-all">Выделить все товары</label>
                </div>
                <div className="total_cart_qy">
                    {items.length} позиций
                </div>
            </div>

            {/* Список товаров в корзине */}
            {items.map(item => (
                <div className="item" key={item.id}>
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
                </div>
            ))}
        </>
    );
}