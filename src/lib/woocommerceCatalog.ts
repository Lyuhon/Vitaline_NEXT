// // lib/woocommerceCatalog.ts
// // import { env } from '@/env.mjs';

// export type WooProduct = {
//     id: string;
//     name: string;
//     slug: string;
//     price: string;
//     stock_status: string;
//     stock_quantity: number;
//     images: {
//         src: string;
//         alt: string;
//     }[];
//     categories: {
//         id: number;
//         name: string;
//         slug: string;
//     }[];
// };

// export type WooProductsResponse = {
//     products: WooProduct[];
//     total: number;
//     totalPages: number;
// };

// const getAuthHeaders = () => {
//     const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
//     const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;
//     const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
//     return {
//         Authorization: `Basic ${credentials}`,
//     };
// };

// export async function fetchWooProducts(page: number = 1, perPage: number = 20): Promise<WooProductsResponse> {
//     try {
//         const baseUrl = process.env.WOOCOMMERCE_API_URL;
//         const url = new URL(`${baseUrl}/products`);

//         // Add query parameters
//         url.searchParams.append('page', page.toString());
//         url.searchParams.append('per_page', perPage.toString());
//         url.searchParams.append('status', 'publish');
//         url.searchParams.append('stock_status', 'instock');

//         const response = await fetch(url.toString(), {
//             headers: getAuthHeaders(),
//             next: { revalidate: 3600 }, // Cache for 1 hour
//         });

//         if (!response.ok) {
//             throw new Error(`WooCommerce API error: ${response.statusText}`);
//         }

//         const products = await response.json();
//         const total = parseInt(response.headers.get('X-WP-Total') || '0');
//         const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '0');

//         return {
//             products,
//             total,
//             totalPages,
//         };
//     } catch (error) {
//         console.error('Error fetching WooCommerce products:', error);
//         throw error;
//     }
// }

// // Convert WooCommerce product to match your existing format
// export function convertWooProduct(product: WooProduct) {
//     return {
//         id: product.id.toString(),
//         name: product.name,
//         slug: product.slug,
//         image: {
//             sourceUrl: product.images[0]?.src || '/images/products/default.jpg',
//             altText: product.images[0]?.alt || product.name,
//         },
//         price: product.price,
//         convertedPrice: `${product.price} сўм`,
//         stockStatus: product.stock_status === 'instock' ? 'IN_STOCK' : 'OUT_OF_STOCK',
//         stockQuantity: product.stock_quantity,
//         brands: {
//             nodes: product.categories.map(cat => ({
//                 id: cat.id.toString(),
//                 name: cat.name,
//                 slug: cat.slug,
//             })),
//         },
//     };
// }


// // lib/woocommerceCatalog.ts

// export type WooProduct = {
//     id: string;
//     name: string;
//     slug: string;
//     price: string;
//     stock_status: string;
//     stock_quantity: number;
//     images: {
//         src: string;
//         alt: string;
//     }[];
//     categories: {
//         id: number;
//         name: string;
//         slug: string;
//     }[];
// };

// export type WooProductsResponse = {
//     products: WooProduct[];
//     total: number;
//     totalPages: number;
// };

// const getAuthHeaders = () => {
//     const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
//     const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;
//     const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
//     return {
//         Authorization: `Basic ${credentials}`,
//     };
// };

// const formatPriceToUSD = (price: string): string => {
//     const numericPrice = parseFloat(price.replace(/[^\d.]/g, ''));
//     const usdPrice = numericPrice / 12800;
//     return `${usdPrice.toFixed(2)} $`;
// };

// export async function fetchWooProducts(page: number = 1, perPage: number = 20): Promise<WooProductsResponse> {
//     try {
//         const baseUrl = process.env.WOOCOMMERCE_API_URL;
//         const url = new URL(`${baseUrl}/products`);

//         // Add query parameters
//         url.searchParams.append('page', page.toString());
//         url.searchParams.append('per_page', perPage.toString());
//         url.searchParams.append('status', 'publish');
//         url.searchParams.append('stock_status', 'instock');

//         const response = await fetch(url.toString(), {
//             headers: getAuthHeaders(),
//             next: { revalidate: 3600 }, // Cache for 1 hour
//         });

//         if (!response.ok) {
//             throw new Error(`WooCommerce API error: ${response.statusText}`);
//         }

//         const products = await response.json();
//         const total = parseInt(response.headers.get('X-WP-Total') || '0');
//         const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '0');

//         return {
//             products,
//             total,
//             totalPages,
//         };
//     } catch (error) {
//         console.error('Error fetching WooCommerce products:', error);
//         throw error;
//     }
// }

// // Convert WooCommerce product to match your existing format
// export function convertWooProduct(product: WooProduct) {
//     return {
//         id: product.id.toString(),
//         name: product.name,
//         slug: product.slug,
//         image: {
//             sourceUrl: product.images[0]?.src || '/images/products/default.jpg',
//             altText: product.images[0]?.alt || product.name,
//         },
//         price: formatPriceToUSD(product.price), // Преобразуем цену в USD
//         convertedPrice: formatPriceToUSD(product.price), // То же самое для convertedPrice
//         stockStatus: product.stock_status === 'instock' ? 'IN_STOCK' : 'OUT_OF_STOCK',
//         stockQuantity: product.stock_quantity,
//         brands: {
//             nodes: product.categories.map(cat => ({
//                 id: cat.id.toString(),
//                 name: cat.name,
//                 slug: cat.slug,
//             })),
//         },
//     };
// }


// lib/woocommerceCatalog.ts

export type WooProduct = {
    id: string;
    name: string;
    slug: string;
    price: string;
    stock_status: string;
    stock_quantity: number;
    images: {
        src: string;
        alt: string;
    }[];
    categories: {
        id: number;
        name: string;
        slug: string;
    }[];
};

export type WooProductsResponse = {
    products: WooProduct[];
    total: number;
    totalPages: number;
};

const getAuthHeaders = () => {
    const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
    const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;
    const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    return {
        Authorization: `Basic ${credentials}`,
    };
};

const formatPriceToUSD = (price: string): string => {
    const numericPrice = parseFloat(price.replace(/[^\d.]/g, ''));
    const usdPrice = numericPrice / 12800;
    return `${usdPrice.toFixed(2)} $`;
};

export async function fetchWooProducts(page: number = 1, perPage: number = 20): Promise<WooProductsResponse> {
    try {
        const baseUrl = process.env.WOOCOMMERCE_API_URL;
        const url = new URL(`${baseUrl}/products`);

        // Получаем все товары за один запрос
        url.searchParams.append('per_page', '100'); // максимальное количество на странице
        url.searchParams.append('status', 'publish');
        url.searchParams.append('stock_status', 'instock');

        let allProducts: WooProduct[] = [];
        let currentPage = 1;
        let hasMorePages = true;

        // Получаем все товары
        while (hasMorePages) {
            url.searchParams.set('page', currentPage.toString());

            const response = await fetch(url.toString(), {
                headers: getAuthHeaders(),
                next: { revalidate: 3600 },
            });

            if (!response.ok) {
                throw new Error(`WooCommerce API error: ${response.statusText}`);
            }

            const products = await response.json();

            if (!Array.isArray(products) || products.length === 0) {
                hasMorePages = false;
                break;
            }

            allProducts = [...allProducts, ...products];

            // Проверяем, есть ли ещё страницы
            const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '0');
            if (currentPage >= totalPages) {
                hasMorePages = false;
            } else {
                currentPage++;
            }
        }

        // Сортируем все товары по количеству
        allProducts.sort((a: WooProduct, b: WooProduct) => {
            const stockA = parseInt(a.stock_quantity?.toString() || '0');
            const stockB = parseInt(b.stock_quantity?.toString() || '0');
            return stockB - stockA;
        });

        // Вычисляем общее количество товаров и страниц
        const total = allProducts.length;
        const totalPages = Math.ceil(total / perPage);

        // Получаем нужную страницу
        const startIndex = (page - 1) * perPage;
        const endIndex = startIndex + perPage;
        const paginatedProducts = allProducts.slice(startIndex, endIndex);

        return {
            products: paginatedProducts,
            total,
            totalPages,
        };
    } catch (error) {
        console.error('Error fetching WooCommerce products:', error);
        throw error;
    }
}

// Добавляем функцию кодирования ID в начало файла
const encodeProductId = (id: string | number): string => {
    return Buffer.from(`post:${id}`).toString('base64');
};

// Convert WooCommerce product to match your existing format
export function convertWooProduct(product: WooProduct) {

    const encodedId = encodeProductId(product.id);

    return {
        // id: product.id.toString(),
        id: encodeProductId(product.id), // Здесь кодируем ID
        name: product.name,
        slug: product.slug,
        image: {
            sourceUrl: product.images[0]?.src || '/images/products/default.jpg',
            altText: product.images[0]?.alt || product.name,
        },
        price: formatPriceToUSD(product.price),
        convertedPrice: formatPriceToUSD(product.price),
        stockStatus: product.stock_status === 'instock' ? 'IN_STOCK' : 'OUT_OF_STOCK',
        stockQuantity: product.stock_quantity,
        brands: {
            nodes: product.categories.map(cat => ({
                id: cat.id.toString(),
                name: cat.name,
                slug: cat.slug,
            })),
        },
    };
}