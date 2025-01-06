// components/CartItemsClient.jsx
'use client';

import React, { useContext } from 'react';
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
                    {items.length} товара(ов)
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
                    {/* <img
                        src={item.image?.sourceUrl ?? '/images/default-product.png'}
                        alt={item.name}
                    /> */}
                    <Image
                        src={item.image?.sourceUrl ?? '/images/default-product.png'}
                        alt={item.name}
                        width={120}
                        height={120}
                    />
                    <div className="info_block_main">
                        <div className="item-info">
                            {/* <h3 className="cart_brand_name">Бренд</h3> */}
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
                                <div
                                    className={`quantity-value${item.qty === item.maxQty ? ' dis_increment' : ''}`}
                                >
                                    {item.qty}
                                </div>
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
                            {/* {item.total.toLocaleString('ru-RU')} сум */}
                            {(item.total / 100).toFixed(2)}$

                        </div>
                    </div>

                    <RemoveItemButton productId={item.id} />
                </div>
            ))}
        </>
    );
}
