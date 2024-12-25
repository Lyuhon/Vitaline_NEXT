// // src/app/cart/page.tsx
// import React from 'react';
// import Link from 'next/link'
// import './cart.css';

// export const generateMetadata = () => {
//     return {
//         title: 'Корзина товаров - Vitaline',
//         description: 'Контактная информация магазина Vitaline в Ташкенте. Адрес, телефон, график работы.',
//     };
// };

// const CartPageEmpty = () => {
//     return (
//         <div className="cart_wrapper">
//             <img className="empty_cart_image" src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/pngwing.com-1.png"
//                 alt="Рустая корзина" />

//             <div className="cart-title">
//                 <h1>Корзина пока что пуста</h1>
//             </div>

//             <div className="cart_epmty_info">
//                 <p>Воспользуйтесь <Link href="/shop">каталогом продукции</Link> или поиском, чтобы найти всё что нужно. </p>

//                 <p>Если в корзине были товары, войдите в <b>Личный Кабинет,</b> чтобы посмотреть список.</p>
//             </div>

//         </div>
//     );
// };

// // export default CartPageEmpty;


// const CartPageFull = () => {
//     return (
//         <div className="cart_wrapper full">

//             <h1 className="full_cart">Корзина</h1>

//             <div className="cart_fill_info">

//                 <div className="cart_flex_block">

//                     <div className="items">

//                         <div className="select-all">

//                             <div className="checkbox_sell_all">
//                                 <input type="checkbox" id="select-all" />
//                                 <label>Выделить все товары</label>
//                             </div>

//                             <div className="total_cart_qy">
//                                 3 товара
//                             </div>

//                         </div>

//                         <div className="item">
//                             <input type="checkbox" className="item-select" />
//                             <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/2dd09af95523b9e529b33e93ffe35cf7_041422095932.jpeg"
//                                 alt="Витаминка" />


//                             <div className="info_block_main">

//                                 <div className="item-info">
//                                     <h3 className="cart_brand_name">KAL</h3>
//                                     <p className="cart_product_name">Глицинат магния с высокой абсорбцией 350, 160 веганских капсул
//                                     </p>
//                                 </div>

//                                 <div className="value_block">
//                                     <div className="quantity-block">
//                                         <div className="quantity-button" data-qty-action="decrement">

//                                             <svg width="12" height="2" viewBox="0 0 12 2" fill="none"
//                                                 xmlns="http://www.w3.org/2000/svg">
//                                                 <path d="M11 1.00002H1" stroke="#7A7680" strokeWidth="1.5" strokeLinecap="round"
//                                                     strokeLinejoin="round" />
//                                             </svg>

//                                         </div>
//                                         <div className="quantity-value" id="quantity-value">1</div>
//                                         <div className="quantity-button" data-qty-action="increment">

//                                             <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
//                                                 xmlns="http://www.w3.org/2000/svg">
//                                                 <path d="M6.00033 1V11" stroke="#7A7680" strokeWidth="1.5" strokeLinecap="round"
//                                                     strokeLinejoin="round" />
//                                                 <path d="M11 6.00002H1" stroke="#7A7680" strokeWidth="1.5" strokeLinecap="round"
//                                                     strokeLinejoin="round" />
//                                             </svg>

//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="cart_item_price">220 000 сум</div>

//                             </div>


//                             <div className="item-remove">

//                                 <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
//                                     xmlns="http://www.w3.org/2000/svg">
//                                     <path
//                                         d="M5.74857 5.41662C5.74857 5.00241 5.41278 4.66662 4.99857 4.66662C4.58435 4.66662 4.24857 5.00241 4.24857 5.41662H5.74857ZM15.7527 4.99995C15.7527 4.58574 15.4169 4.24995 15.0027 4.24995C14.5885 4.24995 14.2527 4.58574 14.2527 4.99995H15.7527ZM12.418 8.33259C12.418 7.91838 12.0822 7.58259 11.668 7.58259C11.2538 7.58259 10.918 7.91838 10.918 8.33259H12.418ZM10.918 14.1684C10.918 14.5826 11.2538 14.9184 11.668 14.9184C12.0822 14.9184 12.418 14.5826 12.418 14.1684H10.918ZM9.08329 8.33259C9.08329 7.91838 8.7475 7.58259 8.33329 7.58259C7.91908 7.58259 7.58329 7.91838 7.58329 8.33259H9.08329ZM7.58329 14.1684C7.58329 14.5826 7.91908 14.9184 8.33329 14.9184C8.7475 14.9184 9.08329 14.5826 9.08329 14.1684H7.58329ZM3.74805 4.24787C3.33383 4.24787 2.99805 4.58366 2.99805 4.99787C2.99805 5.41208 3.33383 5.74787 3.74805 5.74787V4.24787ZM16.2533 5.74787C16.6675 5.74787 17.0033 5.41208 17.0033 4.99787C17.0033 4.58366 16.6675 4.24787 16.2533 4.24787V5.74787ZM5.95442 4.7607C5.82343 5.15366 6.0358 5.5784 6.42876 5.70938C6.82172 5.84037 7.24646 5.628 7.37744 5.23504L5.95442 4.7607ZM7.11945 3.6373L7.83096 3.87447L7.83102 3.8743L7.11945 3.6373ZM8.70178 2.49683L8.7016 3.24683H8.70178V2.49683ZM11.2995 2.49683V3.24683L11.3005 3.24683L11.2995 2.49683ZM12.8835 3.6373L13.5953 3.40092L13.5951 3.4003L12.8835 3.6373ZM12.6236 5.23425C12.7542 5.62736 13.1787 5.84019 13.5718 5.70964C13.9649 5.57909 14.1777 5.15459 14.0471 4.76148L12.6236 5.23425ZM4.24857 5.41662V15.8357H5.74857V5.41662H4.24857ZM4.24857 15.8357C4.24857 17.1708 5.33086 18.2531 6.66593 18.2531V16.7531C6.15928 16.7531 5.74857 16.3424 5.74857 15.8357H4.24857ZM6.66593 18.2531H13.3354V16.7531H6.66593V18.2531ZM13.3354 18.2531C14.6704 18.2531 15.7527 17.1708 15.7527 15.8357H14.2527C14.2527 16.3424 13.842 16.7531 13.3354 16.7531V18.2531ZM15.7527 15.8357V4.99995H14.2527V15.8357H15.7527ZM10.918 8.33259V14.1684H12.418V8.33259H10.918ZM7.58329 8.33259V14.1684H9.08329V8.33259H7.58329ZM3.74805 5.74787H16.2533V4.24787H3.74805V5.74787ZM7.37744 5.23504L7.83096 3.87447L6.40794 3.40013L5.95442 4.7607L7.37744 5.23504ZM7.83102 3.8743C7.95585 3.49952 8.30657 3.24673 8.7016 3.24683L8.70196 1.74683C7.66102 1.74658 6.73682 2.41271 6.40788 3.4003L7.83102 3.8743ZM8.70178 3.24683H11.2995V1.74683H8.70178V3.24683ZM11.3005 3.24683C11.6958 3.24634 12.047 3.4992 12.1719 3.8743L13.5951 3.4003C13.2659 2.41186 12.3404 1.74554 11.2986 1.74683L11.3005 3.24683ZM12.1717 3.87369L12.6236 5.23425L14.0471 4.76148L13.5953 3.40092L12.1717 3.87369Z"
//                                         fill="#2E5500" />
//                                 </svg>

//                             </div>
//                         </div>

//                         <div className="item">
//                             <input type="checkbox" className="item-select" />
//                             <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/2dd09af95523b9e529b33e93ffe35cf7_041422095932.jpeg"
//                                 alt="Витаминка" />


//                             <div className="info_block_main">

//                                 <div className="item-info">
//                                     <h3 className="cart_brand_name">KAL</h3>
//                                     <p className="cart_product_name">Глицинат магния с высокой абсорбцией 350, 160 веганских капсул
//                                     </p>
//                                 </div>

//                                 <div className="value_block">
//                                     <div className="quantity-block">
//                                         <div className="quantity-button" data-qty-action="decrement">

//                                             <svg width="12" height="2" viewBox="0 0 12 2" fill="none"
//                                                 xmlns="http://www.w3.org/2000/svg">
//                                                 <path d="M11 1.00002H1" stroke="#7A7680" strokeWidth="1.5" strokeLinecap="round"
//                                                     strokeLinejoin="round" />
//                                             </svg>

//                                         </div>
//                                         <div className="quantity-value" id="quantity-value">1</div>
//                                         <div className="quantity-button" data-qty-action="increment">

//                                             <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
//                                                 xmlns="http://www.w3.org/2000/svg">
//                                                 <path d="M6.00033 1V11" stroke="#7A7680" strokeWidth="1.5" strokeLinecap="round"
//                                                     strokeLinejoin="round" />
//                                                 <path d="M11 6.00002H1" stroke="#7A7680" strokeWidth="1.5" strokeLinecap="round"
//                                                     strokeLinejoin="round" />
//                                             </svg>

//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="cart_item_price">220 000 сум</div>

//                             </div>


//                             <div className="item-remove">

//                                 <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
//                                     xmlns="http://www.w3.org/2000/svg">
//                                     <path
//                                         d="M5.74857 5.41662C5.74857 5.00241 5.41278 4.66662 4.99857 4.66662C4.58435 4.66662 4.24857 5.00241 4.24857 5.41662H5.74857ZM15.7527 4.99995C15.7527 4.58574 15.4169 4.24995 15.0027 4.24995C14.5885 4.24995 14.2527 4.58574 14.2527 4.99995H15.7527ZM12.418 8.33259C12.418 7.91838 12.0822 7.58259 11.668 7.58259C11.2538 7.58259 10.918 7.91838 10.918 8.33259H12.418ZM10.918 14.1684C10.918 14.5826 11.2538 14.9184 11.668 14.9184C12.0822 14.9184 12.418 14.5826 12.418 14.1684H10.918ZM9.08329 8.33259C9.08329 7.91838 8.7475 7.58259 8.33329 7.58259C7.91908 7.58259 7.58329 7.91838 7.58329 8.33259H9.08329ZM7.58329 14.1684C7.58329 14.5826 7.91908 14.9184 8.33329 14.9184C8.7475 14.9184 9.08329 14.5826 9.08329 14.1684H7.58329ZM3.74805 4.24787C3.33383 4.24787 2.99805 4.58366 2.99805 4.99787C2.99805 5.41208 3.33383 5.74787 3.74805 5.74787V4.24787ZM16.2533 5.74787C16.6675 5.74787 17.0033 5.41208 17.0033 4.99787C17.0033 4.58366 16.6675 4.24787 16.2533 4.24787V5.74787ZM5.95442 4.7607C5.82343 5.15366 6.0358 5.5784 6.42876 5.70938C6.82172 5.84037 7.24646 5.628 7.37744 5.23504L5.95442 4.7607ZM7.11945 3.6373L7.83096 3.87447L7.83102 3.8743L7.11945 3.6373ZM8.70178 2.49683L8.7016 3.24683H8.70178V2.49683ZM11.2995 2.49683V3.24683L11.3005 3.24683L11.2995 2.49683ZM12.8835 3.6373L13.5953 3.40092L13.5951 3.4003L12.8835 3.6373ZM12.6236 5.23425C12.7542 5.62736 13.1787 5.84019 13.5718 5.70964C13.9649 5.57909 14.1777 5.15459 14.0471 4.76148L12.6236 5.23425ZM4.24857 5.41662V15.8357H5.74857V5.41662H4.24857ZM4.24857 15.8357C4.24857 17.1708 5.33086 18.2531 6.66593 18.2531V16.7531C6.15928 16.7531 5.74857 16.3424 5.74857 15.8357H4.24857ZM6.66593 18.2531H13.3354V16.7531H6.66593V18.2531ZM13.3354 18.2531C14.6704 18.2531 15.7527 17.1708 15.7527 15.8357H14.2527C14.2527 16.3424 13.842 16.7531 13.3354 16.7531V18.2531ZM15.7527 15.8357V4.99995H14.2527V15.8357H15.7527ZM10.918 8.33259V14.1684H12.418V8.33259H10.918ZM7.58329 8.33259V14.1684H9.08329V8.33259H7.58329ZM3.74805 5.74787H16.2533V4.24787H3.74805V5.74787ZM7.37744 5.23504L7.83096 3.87447L6.40794 3.40013L5.95442 4.7607L7.37744 5.23504ZM7.83102 3.8743C7.95585 3.49952 8.30657 3.24673 8.7016 3.24683L8.70196 1.74683C7.66102 1.74658 6.73682 2.41271 6.40788 3.4003L7.83102 3.8743ZM8.70178 3.24683H11.2995V1.74683H8.70178V3.24683ZM11.3005 3.24683C11.6958 3.24634 12.047 3.4992 12.1719 3.8743L13.5951 3.4003C13.2659 2.41186 12.3404 1.74554 11.2986 1.74683L11.3005 3.24683ZM12.1717 3.87369L12.6236 5.23425L14.0471 4.76148L13.5953 3.40092L12.1717 3.87369Z"
//                                         fill="#2E5500" />
//                                 </svg>

//                             </div>
//                         </div>

//                         <div className="item">
//                             <input type="checkbox" className="item-select" />
//                             <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/2dd09af95523b9e529b33e93ffe35cf7_041422095932.jpeg"
//                                 alt="Витаминка" />


//                             <div className="info_block_main">

//                                 <div className="item-info">
//                                     <h3 className="cart_brand_name">KAL</h3>
//                                     <p className="cart_product_name">Глицинат магния с высокой абсорбцией 350, 160 веганских капсул
//                                     </p>
//                                 </div>

//                                 <div className="value_block">
//                                     <div className="quantity-block">
//                                         <div className="quantity-button" data-qty-action="decrement">

//                                             <svg width="12" height="2" viewBox="0 0 12 2" fill="none"
//                                                 xmlns="http://www.w3.org/2000/svg">
//                                                 <path d="M11 1.00002H1" stroke="#7A7680" strokeWidth="1.5" strokeLinecap="round"
//                                                     strokeLinejoin="round" />
//                                             </svg>

//                                         </div>
//                                         <div className="quantity-value" id="quantity-value">1</div>
//                                         <div className="quantity-button" data-qty-action="increment">

//                                             <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
//                                                 xmlns="http://www.w3.org/2000/svg">
//                                                 <path d="M6.00033 1V11" stroke="#7A7680" strokeWidth="1.5" strokeLinecap="round"
//                                                     strokeLinejoin="round" />
//                                                 <path d="M11 6.00002H1" stroke="#7A7680" strokeWidth="1.5" strokeLinecap="round"
//                                                     strokeLinejoin="round" />
//                                             </svg>

//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="cart_item_price">220 000 сум</div>

//                             </div>


//                             <div className="item-remove">

//                                 <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
//                                     xmlns="http://www.w3.org/2000/svg">
//                                     <path
//                                         d="M5.74857 5.41662C5.74857 5.00241 5.41278 4.66662 4.99857 4.66662C4.58435 4.66662 4.24857 5.00241 4.24857 5.41662H5.74857ZM15.7527 4.99995C15.7527 4.58574 15.4169 4.24995 15.0027 4.24995C14.5885 4.24995 14.2527 4.58574 14.2527 4.99995H15.7527ZM12.418 8.33259C12.418 7.91838 12.0822 7.58259 11.668 7.58259C11.2538 7.58259 10.918 7.91838 10.918 8.33259H12.418ZM10.918 14.1684C10.918 14.5826 11.2538 14.9184 11.668 14.9184C12.0822 14.9184 12.418 14.5826 12.418 14.1684H10.918ZM9.08329 8.33259C9.08329 7.91838 8.7475 7.58259 8.33329 7.58259C7.91908 7.58259 7.58329 7.91838 7.58329 8.33259H9.08329ZM7.58329 14.1684C7.58329 14.5826 7.91908 14.9184 8.33329 14.9184C8.7475 14.9184 9.08329 14.5826 9.08329 14.1684H7.58329ZM3.74805 4.24787C3.33383 4.24787 2.99805 4.58366 2.99805 4.99787C2.99805 5.41208 3.33383 5.74787 3.74805 5.74787V4.24787ZM16.2533 5.74787C16.6675 5.74787 17.0033 5.41208 17.0033 4.99787C17.0033 4.58366 16.6675 4.24787 16.2533 4.24787V5.74787ZM5.95442 4.7607C5.82343 5.15366 6.0358 5.5784 6.42876 5.70938C6.82172 5.84037 7.24646 5.628 7.37744 5.23504L5.95442 4.7607ZM7.11945 3.6373L7.83096 3.87447L7.83102 3.8743L7.11945 3.6373ZM8.70178 2.49683L8.7016 3.24683H8.70178V2.49683ZM11.2995 2.49683V3.24683L11.3005 3.24683L11.2995 2.49683ZM12.8835 3.6373L13.5953 3.40092L13.5951 3.4003L12.8835 3.6373ZM12.6236 5.23425C12.7542 5.62736 13.1787 5.84019 13.5718 5.70964C13.9649 5.57909 14.1777 5.15459 14.0471 4.76148L12.6236 5.23425ZM4.24857 5.41662V15.8357H5.74857V5.41662H4.24857ZM4.24857 15.8357C4.24857 17.1708 5.33086 18.2531 6.66593 18.2531V16.7531C6.15928 16.7531 5.74857 16.3424 5.74857 15.8357H4.24857ZM6.66593 18.2531H13.3354V16.7531H6.66593V18.2531ZM13.3354 18.2531C14.6704 18.2531 15.7527 17.1708 15.7527 15.8357H14.2527C14.2527 16.3424 13.842 16.7531 13.3354 16.7531V18.2531ZM15.7527 15.8357V4.99995H14.2527V15.8357H15.7527ZM10.918 8.33259V14.1684H12.418V8.33259H10.918ZM7.58329 8.33259V14.1684H9.08329V8.33259H7.58329ZM3.74805 5.74787H16.2533V4.24787H3.74805V5.74787ZM7.37744 5.23504L7.83096 3.87447L6.40794 3.40013L5.95442 4.7607L7.37744 5.23504ZM7.83102 3.8743C7.95585 3.49952 8.30657 3.24673 8.7016 3.24683L8.70196 1.74683C7.66102 1.74658 6.73682 2.41271 6.40788 3.4003L7.83102 3.8743ZM8.70178 3.24683H11.2995V1.74683H8.70178V3.24683ZM11.3005 3.24683C11.6958 3.24634 12.047 3.4992 12.1719 3.8743L13.5951 3.4003C13.2659 2.41186 12.3404 1.74554 11.2986 1.74683L11.3005 3.24683ZM12.1717 3.87369L12.6236 5.23425L14.0471 4.76148L13.5953 3.40092L12.1717 3.87369Z"
//                                         fill="#2E5500" />
//                                 </svg>

//                             </div>
//                         </div>

//                     </div>

//                     <div className="summary">

//                         <div className="summary_green">
//                             <div className="summary_price">
//                                 <h4>Итого:</h4>

//                                 <span>600 000 сум</span>
//                             </div>

//                             <div className="summary_item">
//                                 <span className="cart_summary_items_count">3 позиции</span>
//                                 <span className="cart_summary_items_count_price">660 000 сум</span>
//                             </div>

//                             <div className="summary_item">
//                                 <span>Скидка Vitaline</span>
//                                 <span className="cart_summary_items_discount_value">-60 000 сум</span>
//                             </div>

//                             <div className="summary_item">
//                                 <span>Доставка</span>
//                                 <span className="cart_summary_items_delivery_price">0 сум</span>
//                             </div>

//                             <button className="cart_checkout-button">Перейти к оформлению заказа</button>

//                             <p className="terms">
//                                 Нажимая на кнопку, вы соглашаетесь и принимаете
//                                 <Link href="#">правила покупки</Link> и <Link href="#">условия возврата</Link>.
//                             </p>
//                         </div>


//                         <div className="delivery-info" style={{ display: 'none' }}>
//                             <p>Бесплатная доставка курьером <strong>в день заказа</strong></p>
//                             <div className="delivery-progress">
//                                 <span>600 000 сум</span>
//                                 <span>2 000 000 сум</span>
//                             </div>
//                         </div>
//                     </div>

//                 </div>



//             </div>

//         </div>
//     );
// };

// export default CartPageFull;
















// // src/app/cart/page.jsx
// import { cookies } from 'next/headers';
// import Link from 'next/link';
// import './cart.css';
// import CartItemsClient from './CartItemsClient';
// import CartSummary from './CartSummaryUpdate';
// import { CartProvider } from '../context/CartContext';

// async function fetchSingleProductByID(id) {
//     const query = `
//       query GetSimpleProduct($id: ID!) {
//         product(id: $id, idType: ID) {
//           id 
//           name
//           slug
//           ... on SimpleProduct {
//             price
//             stockStatus
//             stockQuantity
//             image {
//               sourceUrl
//             }
//           }
//         }
//       }
//     `;

//     const res = await fetch('https://nuxt.vitaline.uz/graphql', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ query, variables: { id } }),
//         cache: 'no-store'
//     });

//     const json = await res.json();
//     console.log(`Response for ID ${id}:`, JSON.stringify(json, null, 2));

//     const product = json?.data?.product;
//     if (!product || !product.id) {
//         return null;
//     }

//     if (!("price" in product)) {
//         return null;
//     }

//     return product;
// }

// async function fetchProductsByIds(ids) {
//     if (ids.length === 0) return [];

//     const products = [];
//     for (const id of ids) {
//         const p = await fetchSingleProductByID(id);
//         if (p) products.push(p);
//     }
//     return products;
// }

// export const generateMetadata = () => {
//     return {
//         title: 'Корзина товаров - Vitaline',
//         description: 'Корзина с выбранными товарами.',
//     };
// };

// export default async function CartPage() {
//     const cartCookieName = 'vitaline_cart';
//     const cookieStore = await cookies();
//     const cartCookie = cookieStore.get(cartCookieName)?.value;

//     const cart = cartCookie ? JSON.parse(cartCookie) : { items: [] };
//     const productIds = cart.items?.map(i => i.productId) || [];
//     const products = await fetchProductsByIds(productIds);

//     if (products.length === 0) {
//         return (
//             <div className="cart_wrapper">
//                 <img
//                     className="empty_cart_image"
//                     src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/pngwing.com-1.png"
//                     alt="Пустая корзина"
//                 />
//                 <div className="cart-title">
//                     <h1>Корзина пока что пуста</h1>
//                 </div>
//                 <div className="cart_epmty_info">
//                     <p>
//                         Воспользуйтесь <Link href="/products">каталогом продукции</Link> или поиском, чтобы найти всё что нужно.
//                     </p>
//                 </div>
//             </div>
//         );
//     }

//     const parsePrice = (p) => {
//         const num = parseInt(p.replace(/[^\d]/g, ''), 10);
//         return isNaN(num) ? 0 : num;
//     };

//     const cartItemsDetailed = products.map(p => {
//         const item = cart.items.find(i => i.productId === p.id);
//         const qty = item?.qty || 1;
//         const maxQty = p.stockQuantity || 0;
//         const priceNum = parsePrice(p.price || '0');
//         return { ...p, qty, maxQty, total: qty * priceNum };
//     });

//     const cartTotal = cartItemsDetailed.reduce((acc, p) => acc + p.total, 0);

//     return (
//         <div className="cart_wrapper full">
//             <h1 className="full_cart">Корзина</h1>
//             <div className="cart_fill_info">

//                 <CartProvider initialCartItems={cartItemsDetailed}>

//                     <div className="cart_flex_block">
//                         <div className="items">

//                             <CartItemsClient cartItemsDetailed={cartItemsDetailed} />

//                         </div>

//                         <CartSummary cartItemsDetailed={cartItemsDetailed} />
//                     </div>

//                 </CartProvider>

//             </div>
//         </div>
//     );
// }



// src/app/cart/page.jsx
import { cookies } from 'next/headers';
import Link from 'next/link';
import './cart.css';
import CartItemsClient from './CartItemsClient';
import CartSummary from './CartSummaryUpdate';
import { CartProvider } from '../context/CartContext';
import AnimatedWrapper from '@/components/animation/AnimatedWrapper'; // Импортируем AnimatedWrapper

import ForceSelectAllOnLoad from './ForceSelectAllOnLoad';


async function fetchSingleProductByID(id) {
    const query = `
      query GetSimpleProduct($id: ID!) {
        product(id: $id, idType: ID) {
          id 
          name
          slug
          sku 
          ... on SimpleProduct {
            price
            stockStatus
            stockQuantity
            image {
              sourceUrl
            }
          }
        }
      }
    `;

    const res = await fetch('https://nuxt.vitaline.uz/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables: { id } }),
        cache: 'no-store'
    });

    const json = await res.json();
    console.log(`Response for ID ${id}:`, JSON.stringify(json, null, 2));

    const product = json?.data?.product;
    if (!product || !product.id) {
        return null;
    }

    if (!("price" in product)) {
        return null;
    }

    return product;
}

async function fetchProductsByIds(ids) {
    if (ids.length === 0) return [];

    const products = [];
    for (const id of ids) {
        const p = await fetchSingleProductByID(id);
        if (p) products.push(p);
    }
    return products;
}

export const generateMetadata = () => {
    return {
        title: 'Корзина товаров - Vitaline',
        description: 'Корзина с выбранными товарами.',
    };
};

export default async function CartPage() {
    const cartCookieName = 'vitaline_cart';
    const cookieStore = await cookies();
    const cartCookie = cookieStore.get(cartCookieName)?.value;

    const cart = cartCookie ? JSON.parse(cartCookie) : { items: [] };
    const productIds = cart.items?.map(i => i.productId) || [];
    const products = await fetchProductsByIds(productIds);

    if (products.length === 0) {
        return (
            <AnimatedWrapper>
                <div className="cart_wrapper empty">
                    <img
                        className="empty_cart_image"
                        src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/pngwing.com-1.png"
                        alt="Пустая корзина"
                    />
                    <div className="cart-title">
                        <h1>Корзина пока что пуста</h1>
                    </div>
                    <div className="cart_epmty_info">
                        <p>
                            Воспользуйтесь <Link href="/shop">каталогом продукции</Link> или поиском, чтобы найти всё что нужно.
                        </p>
                    </div>
                </div>
            </AnimatedWrapper>
        );
    }

    const parsePrice = (p) => {
        const num = parseInt(p.replace(/[^\d]/g, ''), 10);
        return isNaN(num) ? 0 : num;
    };

    const cartItemsDetailed = products.map(p => {
        const item = cart.items.find(i => i.productId === p.id);
        const qty = item?.qty || 1;
        const maxQty = p.stockQuantity || 0;
        const priceNum = parsePrice(p.price || '0');
        //SLCT
        return { ...p, qty, maxQty, total: qty * priceNum, selected: true, };
    });

    return (
        <AnimatedWrapper> {/* Оборачиваем содержимое в AnimatedWrapper */}
            <div className="cart_wrapper full">
                <h1 className="full_cart">Корзина</h1>
                <div className="cart_fill_info">

                    <CartProvider initialCartItems={cartItemsDetailed}>

                        <ForceSelectAllOnLoad />
                        <div className="cart_flex_block">
                            <div className="items">

                                {/* Удаляем передачу пропсов, если используем Context API */}
                                <CartItemsClient />

                            </div>

                            {/* Удаляем передачу пропсов, если используем Context API */}
                            <CartSummary />
                        </div>

                    </CartProvider>

                </div>
            </div>
        </AnimatedWrapper>
    );
}

