// // ForceSelectAllOnLoad.jsx
// 'use client';
// import { useEffect, useContext, useState } from 'react';
// import { CartContext } from '../context/CartContext';

// export default function ForceSelectAllOnLoad() {
//     const { items, setCartItems, parsePrice } = useContext(CartContext);
//     const [didForce, setDidForce] = useState(false);

//     useEffect(() => {
//         // Если уже применили "выделить все" — выходим
//         if (didForce) return;
//         if (!items || items.length === 0) return;

//         // Делаем updated
//         const updated = items.map(item => ({
//             ...item,
//             selected: true,
//             // total: item.qty * parsePrice(item.price), // тут UZS
//             total: item.qty * parsePrice(item.convertedPrice),
//         }));

//         // Устанавливаем
//         setCartItems(updated);
//         // Ставим флаг, чтобы больше не повторять
//         setDidForce(true);
//     }, [didForce, items, parsePrice, setCartItems]);

//     return null;
// }



// ForceSelectAllOnLoad.jsx
'use client';
import { useEffect, useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';

export default function ForceSelectAllOnLoad() {
    const { items, setCartItems, parsePrice } = useContext(CartContext);
    const [didForce, setDidForce] = useState(false);

    useEffect(() => {
        if (didForce) return;
        if (!items || items.length === 0) return;

        const updated = items.map(item => ({
            ...item,
            selected: !item.isOutOfStock,
            total: item.isOutOfStock ? 0 : (item.qty * parsePrice(item.convertedPrice)),
        }));

        setCartItems(updated);
        setDidForce(true);
    }, [didForce, items, parsePrice, setCartItems]);

    return null;
}