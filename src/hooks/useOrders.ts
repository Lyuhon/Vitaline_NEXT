// // // hooks/useOrders.ts
// // import { useState, useEffect } from 'react';
// // import { WooOrder, FormattedOrder } from '@/app/profile/types_orders';

// // export function useOrders() {
// //     const [orders, setOrders] = useState<FormattedOrder[]>([]);
// //     const [isLoading, setIsLoading] = useState(true);
// //     const [error, setError] = useState<string | null>(null);

// //     useEffect(() => {
// //         const fetchOrders = async () => {
// //             try {
// //                 const response = await fetch('/api/woocommerce/orders', {
// //                     credentials: 'include'
// //                 });

// //                 if (!response.ok) throw new Error('Failed to fetch orders');

// //                 const data = await response.json();

// //                 const formattedOrders: FormattedOrder[] = data.map((order: WooOrder) => ({
// //                     id: order.id,
// //                     number: order.number,
// //                     date_created: new Date(order.date_created).toLocaleDateString('ru-RU'),
// //                     status: order.status,
// //                     shipping_method: order.shipping_lines[0]?.method_title || 'Не указано',
// //                     // total: `${parseInt(order.total).toLocaleString()} сум`,
// //                     total: `${(parseInt(order.total) / 12800).toFixed(2)} $`,
// //                     payment_method: order.payment_method_title || 'Не указано'
// //                 }));

// //                 setOrders(formattedOrders);
// //             } catch (err) {
// //                 setError('Не удалось загрузить заказы');
// //                 console.error('Error fetching orders:', err);
// //             } finally {
// //                 setIsLoading(false);
// //             }
// //         };

// //         fetchOrders();
// //     }, []);

// //     return { orders, isLoading, error };
// // }

// // // Добавляем новый хук для деталей заказа
// // export function useOrderDetails(orderId: number | null) {
// //     const [orderDetails, setOrderDetails] = useState<any | null>(null);
// //     const [isLoading, setIsLoading] = useState(false);
// //     const [error, setError] = useState<string | null>(null);

// //     useEffect(() => {
// //         if (!orderId) return;

// //         const fetchOrderDetails = async () => {
// //             setIsLoading(true);
// //             try {
// //                 const response = await fetch(`/api/woocommerce/orders/${orderId}`, {
// //                     credentials: 'include'
// //                 });

// //                 if (!response.ok) {
// //                     const errorData = await response.json();
// //                     throw new Error(errorData.error || 'Failed to fetch order details');
// //                 }

// //                 const data = await response.json();
// //                 setOrderDetails(data);
// //             } catch (err) {
// //                 const errorMessage = err instanceof Error ? err.message : 'Не удалось загрузить детали заказа';
// //                 setError(errorMessage);
// //                 console.error('Error fetching order details:', err);
// //             } finally {
// //                 setIsLoading(false);
// //             }
// //         };

// //         fetchOrderDetails();
// //     }, [orderId]);

// //     return { orderDetails, isLoading, error };
// // }




// // hooks/useOrders.ts
// import { useState, useEffect } from 'react';
// import { WooOrder, FormattedOrder } from '@/app/profile/types_orders';

// export function useOrders() {
//     const [orders, setOrders] = useState<FormattedOrder[]>([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchOrders = async () => {
//             try {
//                 const response = await fetch('/api/woocommerce/orders', {
//                     credentials: 'include'
//                 });

//                 if (!response.ok) throw new Error('Failed to fetch orders');

//                 const data = await response.json();

//                 const formattedOrders: FormattedOrder[] = data.map((order: WooOrder) => ({
//                     id: order.id,
//                     number: order.number,
//                     date_created: new Date(order.date_created).toLocaleDateString('ru-RU'),
//                     status: order.status,
//                     shipping_method: order.shipping_lines[0]?.method_title || 'Не указано',
//                     // total: `${parseInt(order.total).toLocaleString()} сум`,
//                     total: `${(parseInt(order.total) / 12800).toFixed(2)} $`,
//                     payment_method: order.payment_method_title || 'Не указано'
//                 }));

//                 setOrders(formattedOrders);
//             } catch (err) {
//                 setError('Не удалось загрузить заказы');
//                 console.error('Error fetching orders:', err);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchOrders();
//     }, []);

//     return { orders, isLoading, error };
// }

// // В hooks/useOrders.ts
// interface LineItem {
//     id: number;
//     name: string;
//     slug: string;
//     product_id: number;
//     sku: string;
//     quantity: number;
//     price: number;
// }

// interface ShippingLine {
//     method_title: string;
//     total: string;
// }

// interface OrderDetails {
//     id: number;
//     number: string;
//     status: string;
//     total: string;
//     total_tax: string;
//     billing: {
//         first_name: string;
//         last_name: string;
//         phone: string;
//     };
//     shipping: {
//         address_1: string;
//         city: string;
//         state: string;
//         postcode: string;
//     };
//     line_items: LineItem[];
//     shipping_lines: ShippingLine[];
//     date_created: string;
// }

// export function useOrderDetails(orderId: number | null) {
//     const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         if (!orderId) return;

//         const fetchOrderDetails = async () => {
//             setIsLoading(true);
//             try {
//                 const response = await fetch(`/api/woocommerce/orders/${orderId}`, {
//                     credentials: 'include'
//                 });

//                 if (!response.ok) {
//                     const errorData = await response.json();
//                     throw new Error(errorData.error || 'Failed to fetch order details');
//                 }

//                 const data = await response.json();
//                 console.log('Полные данные заказа:', data); // Для отладки
//                 setOrderDetails(data);
//             } catch (err) {
//                 const errorMessage = err instanceof Error ? err.message : 'Не удалось загрузить детали заказа';
//                 setError(errorMessage);
//                 console.error('Error fetching order details:', err);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchOrderDetails();
//     }, [orderId]);

//     return { orderDetails, isLoading, error };
// }