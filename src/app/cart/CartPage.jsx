// 'use client';

// import React, { useState, useEffect } from 'react';
// import CartItemsClient from './CartItemsClient';
// import CartSummaryUpdate from './CartSummaryUpdate';

// export default function CartPage({ cartItemsDetailed }) {
//     const [items, setItems] = useState([]);

//     useEffect(() => {
//         // Initialize items with quantities and totals
//         const updatedItems = cartItemsDetailed.map(item => ({
//             ...item,
//             qty: Math.min(item.qty, item.maxQty),
//             total: Math.min(item.qty, item.maxQty) * parsePrice(item.price),
//             selected: true, // All items selected by default
//         }));
//         setItems(updatedItems);
//     }, [cartItemsDetailed]);

//     const parsePrice = (price) => {
//         const num = parseInt(price.toString().replace(/\D/g, ''), 10);
//         return isNaN(num) ? 0 : num;
//     };

//     const handleItemQuantityChange = (itemId, newQty) => {
//         const updatedItems = items.map(item =>
//             item.id === itemId
//                 ? { ...item, qty: newQty, total: newQty * parsePrice(item.price) }
//                 : item
//         );
//         setItems(updatedItems);
//     };

//     const toggleItemSelection = (itemId) => {
//         const updatedItems = items.map(item =>
//             item.id === itemId ? { ...item, selected: !item.selected } : item
//         );
//         setItems(updatedItems);
//     };

//     const toggleSelectAll = () => {
//         const newSelectAll = items.every(item => item.selected) ? false : true;
//         const updatedItems = items.map(item => ({ ...item, selected: newSelectAll }));
//         setItems(updatedItems);
//     };

//     return (
//         <div className="cart_page">
//             <CartItemsClient
//                 items={items}
//                 toggleItemSelection={toggleItemSelection}
//                 handleItemQuantityChange={handleItemQuantityChange}
//                 toggleSelectAll={toggleSelectAll}
//             />
//             <CartSummaryUpdate items={items} />
//         </div>
//     );
// }
