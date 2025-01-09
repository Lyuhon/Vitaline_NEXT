// // src/lib/woocommerce.ts
// import axios from 'axios';

// // Получите эти значения из переменных окружения для безопасности
// const WOOCOMMERCE_API_URL = process.env.WOOCOMMERCE_API_URL; // Например, https://your-site.com/wp-json/wc/v3/
// const WOOCOMMERCE_CONSUMER_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY;
// const WOOCOMMERCE_CONSUMER_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET;

// // Функция для создания заказа
// export const createOrder = async (orderData: any) => {
//     try {
//         const response = await axios.post(`${WOOCOMMERCE_API_URL}/orders`, orderData, {
//             auth: {
//                 username: WOOCOMMERCE_CONSUMER_KEY!,
//                 password: WOOCOMMERCE_CONSUMER_SECRET!,
//             },
//         });
//         return response.data;
//     } catch (error: any) {
//         // Логируем полный ответ об ошибке для отладки
//         console.error('Ошибка при создании заказа:', error.response?.data);
//         throw new Error(error.response?.data?.message || 'Ошибка при создании заказа');
//     }
// };
