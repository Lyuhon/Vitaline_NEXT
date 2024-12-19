// // src/components/ProductActionsClient.jsx
// 'use client';

// import { useState } from 'react';
// import AddToCartButton from '../AddToCartButton';
// import AddedToCart from '../AddedToCart';

// interface ProductActionsClientProps {
//     productId: string;
//     productName: string;
//     imageUrl: string;
//     stock: number;
// }

// export default function ProductActionsClient({ productId, productName, imageUrl, stock }: ProductActionsClientProps) {
//     const [quantity, setQuantity] = useState(1);
//     const [isPopupOpen, setIsPopupOpen] = useState(false);

//     const increment = () => setQuantity(q => Math.min(q + 1, stock));
//     const decrement = () => setQuantity(q => Math.max(1, q - 1));

//     const handleAddSuccess = () => {
//         setIsPopupOpen(true);
//     };

//     const handleClosePopup = () => {
//         setIsPopupOpen(false);
//     };

//     return (
//         <div>
//             {/* Блок выбора количества */}
//             <div className="value_block">
//                 <span>Количество:</span>
//                 <div className="quantity-block">
//                     <div className="quantity-button" data-qty-action="decrement" onClick={decrement} style={quantityButtonStyle}>
//                         <svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path d="M11 1.00002H1" stroke="#7A7680" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                         </svg>
//                     </div>
//                     <div className="quantity-value" style={quantityValueStyle}>{quantity}</div>
//                     <div className="quantity-button" data-qty-action="increment" onClick={increment} style={quantityButtonStyle}>
//                         <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path d="M6.00033 1V11" stroke="#7A7680" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                             <path d="M11 6.00002H1" stroke="#7A7680" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                         </svg>
//                     </div>
//                 </div>
//             </div>

//             {/* Кнопка добавления в корзину */}
//             <AddToCartButton
//                 productId={productId}
//                 initialQty={quantity}
//                 stock={stock}
//                 onAddSuccess={handleAddSuccess}
//             />

//             {/* Всплывающее окно после добавления */}
//             {isPopupOpen && (
//                 <AddedToCart
//                     productId={productId}
//                     productName={productName}
//                     imageUrl={imageUrl}
//                     initialQuantity={quantity}
//                     stock={stock}
//                     onClose={handleClosePopup}
//                 />
//             )}
//         </div>
//     );
// }

// // Стили для кнопок и значения количества (можно перенести в CSS)
// const quantityButtonStyle = {
//     width: '24px',
//     height: '24px',
//     borderRadius: '4px',
//     border: '1px solid #ccc',
//     background: '#f7f7f7',
//     cursor: 'pointer',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
// };

// const quantityValueStyle = {
//     display: 'inline-block',
//     minWidth: '20px',
//     textAlign: 'center',
// };
