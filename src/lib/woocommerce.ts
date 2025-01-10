// src/lib/woocommerce.ts
import axios from 'axios';

/**
 * Переменные окружения:
 * - WOOCOMMERCE_API_URL:    https://nuxt.vitaline.uz/wp-json/wc/v3
 * - WOOCOMMERCE_CONSUMER_KEY
 * - WOOCOMMERCE_CONSUMER_SECRET
 */
const WOOCOMMERCE_API_URL = process.env.WOOCOMMERCE_API_URL;
const WOOCOMMERCE_CONSUMER_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY;
const WOOCOMMERCE_CONSUMER_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET;

/**
 * createOrder - Функция для создания заказа в WooCommerce через REST API.
 * @param orderData - Объект с данными заказа, подготовленный для REST API.
 * @returns Данные созданного заказа или ошибка.
 */
export const createOrder = async (orderData: any) => {
    try {
        const response = await axios.post(
            `${WOOCOMMERCE_API_URL}/orders`,
            orderData,
            {
                auth: {
                    username: WOOCOMMERCE_CONSUMER_KEY as string,
                    password: WOOCOMMERCE_CONSUMER_SECRET as string,
                },
            }
        );
        return response.data;
    } catch (error: any) {
        // Логируем полный ответ об ошибке для упрощения отладки.
        console.error('Ошибка при создании заказа:', error.response?.data);
        throw new Error(error.response?.data?.message || 'Ошибка при создании заказа');
    }
};
