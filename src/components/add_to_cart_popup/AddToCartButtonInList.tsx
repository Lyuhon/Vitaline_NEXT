// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { useMiniCart } from '@/app/context/MiniCartContext';
// import MiniCartPopup from '@/app/product/MiniCartPopup';

// interface AddToCartButtonInListProps {
//     productId: string;
//     productName: string;
//     productImage: string;
//     productPrice: number;
//     maxQuantity: number;
//     initialQty?: number;
//     stock?: boolean;
// }

// const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// export default function AddToCartButtonInList({
//     productId,
//     productName,
//     productImage,
//     productPrice,
//     maxQuantity,
//     initialQty = 1,
//     stock = true,
// }: AddToCartButtonInListProps) {
//     const [loading, setLoading] = useState(false);
//     const { setLastAddedItem, clearLastAddedItem } = useMiniCart();
//     const [isPopupOpen, setIsPopupOpen] = useState(false);
//     const [addedQuantity, setAddedQuantity] = useState(initialQty);

//     // Закрытие Popup
//     const closePopup = useCallback(() => {
//         setIsPopupOpen(false);
//         clearLastAddedItem();
//     }, [clearLastAddedItem]);

//     // Основная логика добавления в корзину
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

//             const delayPromise = delay(300); // Задержка для имитации реальной загрузки (1000 мс)

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
//             // Можно добавить уведомление об ошибке
//         } finally {
//             setLoading(false);
//         }
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
//     }, [isPopupOpen, closePopup]);

//     return (
//         <>
//             <div
//                 className={`add_to_cart product_item__add_to_cart ${!stock ? 'disabled' : ''}`}
//                 onClick={stock && !loading ? addToCart : undefined}
//                 style={{ cursor: stock && !loading ? 'pointer' : 'not-allowed' }}
//             >
//                 <img
//                     src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/shopping-cart_icon-icons.com_72552-1-1.svg"
//                     alt="Корзина"
//                 />
//                 <span>{loading ? 'Добавление...' : 'В корзину'}</span>
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



'use client';

import { useState, useEffect, useCallback } from 'react';
import { useMiniCart } from '@/app/context/MiniCartContext';
import MiniCartPopup from '@/app/product/MiniCartPopup';
import { addToCart as addToLocalStorage } from '@/app/utils/cartStorage';

// Константа для переключения между двойным хранением и только localStorage
const USE_COOKIES = true; // true - двойное хранение (cookies + localStorage), false - только localStorage

interface AddToCartButtonInListProps {
    productId: string;
    productName: string;
    productImage: string;
    productPrice: number;
    maxQuantity: number;
    initialQty?: number;
    stock?: boolean;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default function AddToCartButtonInList({
    productId,
    productName,
    productImage,
    productPrice,
    maxQuantity,
    initialQty = 1,
    stock = true,
}: AddToCartButtonInListProps) {
    const [loading, setLoading] = useState(false);
    const { setLastAddedItem, clearLastAddedItem } = useMiniCart();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [addedQuantity, setAddedQuantity] = useState(initialQty);

    const closePopup = useCallback(() => {
        setIsPopupOpen(false);
        clearLastAddedItem();
    }, [clearLastAddedItem]);

    // Функция для добавления в localStorage
    const addToLocalCart = async () => {
        const product = {
            productId,
            name: productName,
            image: productImage,
            price: productPrice,
            maxQuantity,
            quantity: initialQty,
        };

        // Добавляем в localStorage
        addToLocalStorage(product);

        // Делаем запрос к API для логирования
        await fetch('/api/cart/add-local', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product),
        });
    };

    // Функция для добавления через cookies
    const addToCookieCart = async () => {
        const response = await fetch('/api/cart/add', {
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

        if (!response.ok) {
            throw new Error('Ошибка при добавлении в корзину');
        }
    };

    // Основная логика добавления в корзину
    const addToCart = async () => {
        if (!stock) return;

        setLoading(true);

        try {
            const delayPromise = delay(300);

            if (USE_COOKIES) {
                // Используем оба хранилища одновременно
                await Promise.all([
                    addToCookieCart(), // Сохраняем в cookies
                    addToLocalCart(),  // Сохраняем в localStorage
                    delayPromise
                ]);
                console.log(`${productName} добавлен в корзину (cookies + localStorage)`);
            } else {
                // Используем только localStorage
                await Promise.all([
                    addToLocalCart(),
                    delayPromise
                ]);
                console.log(`${productName} добавлен в корзину (localStorage)`);
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
        } catch (error) {
            console.error('Ошибка при добавлении в корзину:', error);
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
    }, [isPopupOpen, closePopup]);

    return (
        <>
            <div
                className={`add_to_cart product_item__add_to_cart ${!stock ? 'disabled' : ''}`}
                onClick={stock && !loading ? addToCart : undefined}
                style={{ cursor: stock && !loading ? 'pointer' : 'not-allowed' }}
            >
                <img
                    src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/shopping-cart_icon-icons.com_72552-1-1.svg"
                    alt="Корзина"
                />
                <span>{loading ? 'Добавление...' : 'В корзину'}</span>
            </div>

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