// // Рабочий 02 01 2024 но с варном
// // src/components/AddToCartButton.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { useMiniCart } from '@/app/context/MiniCartContext';
// import MiniCartPopup from '@/app/product/MiniCartPopup';

// interface AddToCartProps {
//     productId: string;
//     productName: string;
//     productImage: string;
//     productPrice: number;
//     maxQuantity: number;
//     initialQty?: number;
//     stock?: boolean;
// }

// const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// export default function AddToCartButton({
//     productId,
//     productName,
//     productImage,
//     productPrice,
//     maxQuantity,
//     initialQty = 1,
//     stock = true,
// }: AddToCartProps) {
//     const [loading, setLoading] = useState(false);
//     const { setLastAddedItem, clearLastAddedItem } = useMiniCart();
//     const [isPopupOpen, setIsPopupOpen] = useState(false);
//     const [addedQuantity, setAddedQuantity] = useState(initialQty);

//     const addToCart = async () => {
//         if (!stock) return;

//         setLoading(true);

//         try {
//             const fetchPromise = fetch('/api/cart/add', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     productId,
//                     productName,
//                     productImage,
//                     productPrice,
//                     maxQuantity,
//                     quantity: initialQty,
//                 }),
//             });

//             const delayPromise = delay(1000); // Задержка в 500 мс

//             const [response] = await Promise.all([fetchPromise, delayPromise]);

//             if (!response.ok) {
//                 throw new Error('Ошибка при добавлении в корзину');
//             }

//             // Обновляем контекст с информацией о добавленном товаре
//             setLastAddedItem({
//                 productId,
//                 productName,
//                 productImage,
//                 productPrice,
//                 quantity: initialQty,
//             });

//             setAddedQuantity(initialQty);
//             setIsPopupOpen(true);
//             console.log(`${productName} добавлен в корзину`);
//         } catch (error) {
//             console.error(error);
//             // Можно добавить уведомление об ошибке здесь
//         } finally {
//             setLoading(false);
//         }
//     };

//     const closePopup = () => {
//         setIsPopupOpen(false);
//         clearLastAddedItem();
//     };

//     // Закрытие popup при нажатии клавиши Esc
//     useEffect(() => {
//         const handleKeyDown = (e: KeyboardEvent) => {
//             if (e.key === 'Escape' && isPopupOpen) {
//                 closePopup();
//             }
//         };

//         window.addEventListener('keydown', handleKeyDown);

//         return () => {
//             window.removeEventListener('keydown', handleKeyDown);
//         };
//     }, [isPopupOpen]);

//     return (
//         <>
//             <div className="product_buttons_block">
//                 <div
//                     className={`add_to_cart ${!stock ? 'disabled' : ''}`}
//                     onClick={stock && !loading ? addToCart : undefined}
//                     style={{ cursor: stock && !loading ? 'pointer' : 'not-allowed' }}
//                 >
//                     <img
//                         src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/shopping-cart_icon-icons.com_72552-1-1.svg"
//                         alt="Корзина"
//                         className="cart_icon"
//                     />
//                     <span>{loading ? 'Добавляю...' : 'Добавить в корзину'}</span>
//                 </div>

//                 <div className="one_click_order">
//                     <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/РЎРРѕР№_1-2.svg" alt="Корзина" />
//                     <span>Купить в 1 клик</span>
//                 </div>
//             </div>

//             {/* Popup */}
//             {isPopupOpen && (
//                 <MiniCartPopup
//                     productImage={productImage}
//                     productName={productName}
//                     quantity={addedQuantity}
//                     onClose={closePopup}
//                 />
//             )}
//         </>
//     );
// }


// src/components/AddToCartButton.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useMiniCart } from '@/app/context/MiniCartContext';
import MiniCartPopup from '@/app/product/MiniCartPopup';

interface AddToCartProps {
    productId: string;
    productName: string;
    productImage: string;
    productPrice: number;
    maxQuantity: number;
    initialQty?: number;
    stock?: boolean;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default function AddToCartButton({
    productId,
    productName,
    productImage,
    productPrice,
    maxQuantity,
    initialQty = 1,
    stock = true,
}: AddToCartProps) {
    const [loading, setLoading] = useState(false);
    const { setLastAddedItem, clearLastAddedItem } = useMiniCart();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [addedQuantity, setAddedQuantity] = useState(initialQty);

    // Мемоизируем функцию closePopup
    const closePopup = useCallback(() => {
        setIsPopupOpen(false);
        clearLastAddedItem();
    }, [clearLastAddedItem]);

    const addToCart = async () => {
        if (!stock) return;

        setLoading(true);

        try {
            const fetchPromise = fetch('/api/cart/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productId,
                    productName,
                    productImage,
                    productPrice,
                    maxQuantity,
                    quantity: initialQty,
                }),
            });

            const delayPromise = delay(1000); // Задержка в 1000 мс

            const [response] = await Promise.all([fetchPromise, delayPromise]);

            if (!response.ok) {
                throw new Error('Ошибка при добавлении в корзину');
            }

            // Обновляем контекст с информацией о добавленном товаре
            setLastAddedItem({
                productId,
                productName,
                productImage,
                productPrice,
                quantity: initialQty,
            });

            setAddedQuantity(initialQty);
            setIsPopupOpen(true);
            console.log(`${productName} добавлен в корзину`);
        } catch (error) {
            console.error(error);
            // Можно добавить уведомление об ошибке здесь
        } finally {
            setLoading(false);
        }
    };

    // Закрытие popup при нажатии клавиши Esc
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isPopupOpen) {
                closePopup();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isPopupOpen, closePopup]); // Добавили closePopup в зависимости

    return (
        <>
            <div className="product_buttons_block">
                <div
                    className={`add_to_cart ${!stock ? 'disabled' : ''}`}
                    onClick={stock && !loading ? addToCart : undefined}
                    style={{ cursor: stock && !loading ? 'pointer' : 'not-allowed' }}
                >
                    <img
                        src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/shopping-cart_icon-icons.com_72552-1-1.svg"
                        alt="Корзина"
                        className="cart_icon"
                    />
                    <span>{loading ? 'Добавляю...' : 'Добавить в корзину'}</span>
                </div>

                {/* <div className="one_click_order">
                    <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/РЎРРѕР№_1-2.svg" alt="Корзина" />
                    <span>Купить в 1 клик</span>
                </div> */}
            </div>

            {/* Popup */}
            {isPopupOpen && (
                <MiniCartPopup
                    productImage={productImage}
                    productName={productName}
                    quantity={addedQuantity}
                    onClose={closePopup}
                />
            )}
        </>
    );
}
