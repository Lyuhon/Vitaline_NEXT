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
//     yith_product_brand?: Array<{
//         id: number;
//         name: string;
//         slug: string;
//     }> | null;
//     brands?: any; // временно any для отладки
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

//         url.searchParams.append('per_page', '20');
//         url.searchParams.append('status', 'publish');
//         url.searchParams.append('stock_status', 'instock');

//         let allProducts: WooProduct[] = [];
//         let currentPage = 1;
//         let hasMorePages = true;

//         while (hasMorePages) {
//             url.searchParams.set('page', currentPage.toString());

//             const response = await fetch(url.toString(), {
//                 headers: getAuthHeaders(),
//                 next: { revalidate: 1800 },
//             });

//             if (!response.ok) {
//                 throw new Error(`WooCommerce API error: ${response.statusText}`);
//             }

//             const products = await response.json();

//             if (!Array.isArray(products) || products.length === 0) {
//                 hasMorePages = false;
//                 break;
//             }

//             // Добавляем отладочный вывод
//             // if (currentPage === 1) {
//             //     console.log('First product structure:', JSON.stringify(products[0], null, 2));
//             //     console.log('yith_product_brand type:', typeof products[0].yith_product_brand);
//             //     console.log('yith_product_brand value:', products[0].yith_product_brand);
//             // }

//             const productsWithBrands = products.map(product => {
//                 // Проверяем структуру брендов
//                 const brands = Array.isArray(product.yith_product_brand)
//                     ? product.yith_product_brand
//                     : [];

//                 return {
//                     ...product,
//                     brands
//                 };
//             });

//             allProducts = [...allProducts, ...productsWithBrands];

//             const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '0');
//             if (currentPage >= totalPages) {
//                 hasMorePages = false;
//             } else {
//                 currentPage++;
//             }
//         }

//         allProducts = allProducts.filter((product, index, self) =>
//             index === self.findIndex((p) => p.id === product.id)
//         );

//         allProducts.sort((a: WooProduct, b: WooProduct) => {
//             const stockA = parseInt(a.stock_quantity?.toString() || '0');
//             const stockB = parseInt(b.stock_quantity?.toString() || '0');
//             return stockB - stockA;
//         });

//         const total = allProducts.length;
//         const totalPages = Math.ceil(total / perPage);
//         const startIndex = (page - 1) * perPage;
//         const endIndex = startIndex + perPage;
//         const paginatedProducts = allProducts.slice(startIndex, endIndex);

//         return {
//             products: paginatedProducts,
//             total,
//             totalPages,
//         };

//     } catch (error) {
//         console.error('Error fetching WooCommerce products:', error);
//         throw error;
//     }
// }


// const encodeProductId = (id: string | number): string => {
//     return Buffer.from(`post:${id}`).toString('base64');
// };

// export function convertWooProduct(product: WooProduct) {
//     const encodedId = encodeProductId(product.id);

//     // Добавляем отладочный вывод
//     // console.log('Converting product:', {
//     //     id: product.id,
//     //     brands: product.brands,
//     //     yith_product_brand: product.yith_product_brand
//     // });

//     // Убеждаемся, что мы работаем с массивом
//     const brandsArray = Array.isArray(product.brands) ? product.brands : [];

//     return {
//         id: encodedId,
//         name: product.name,
//         slug: product.slug,
//         image: {
//             sourceUrl: product.images[0]?.src || '/images/products/default.jpg',
//             altText: product.images[0]?.alt || product.name,
//         },
//         price: formatPriceToUSD(product.price),
//         convertedPrice: formatPriceToUSD(product.price),
//         stockStatus: product.stock_status === 'instock' ? 'IN_STOCK' : 'OUT_OF_STOCK',
//         stockQuantity: product.stock_quantity,
//         brands: {
//             nodes: brandsArray.map(brand => ({
//                 id: brand.id.toString(),
//                 name: brand.name,
//                 slug: brand.slug,
//             }))
//         },
//     };
// }


// lib/woocommerceCatalog.ts
import { headers } from "next/headers"; // Добавляем импорт

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
    yith_product_brand?: Array<{
        id: number;
        name: string;
        slug: string;
    }> | null;
    brands?: any; // временно any для отладки
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

        url.searchParams.append('per_page', '20');
        url.searchParams.append('status', 'publish');
        url.searchParams.append('stock_status', 'instock');

        let allProducts: WooProduct[] = [];
        let currentPage = 1;
        let hasMorePages = true;

        while (hasMorePages) {
            url.searchParams.set('page', currentPage.toString());

            const response = await fetch(url.toString(), {
                headers: getAuthHeaders(),
                next: { revalidate: 1800 },
            });

            if (!response.ok) {
                throw new Error(`WooCommerce API error: ${response.statusText}`);
            }

            const products = await response.json();

            if (!Array.isArray(products) || products.length === 0) {
                hasMorePages = false;
                break;
            }

            const productsWithBrands = products.map(product => {
                // Проверяем структуру брендов
                const brands = Array.isArray(product.yith_product_brand)
                    ? product.yith_product_brand
                    : [];

                return {
                    ...product,
                    brands
                };
            });

            allProducts = [...allProducts, ...productsWithBrands];

            const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '0');
            if (currentPage >= totalPages) {
                hasMorePages = false;
            } else {
                currentPage++;
            }
        }

        // Получаем userType из заголовков
        const headersList = await headers(); // Используем headers из next/headers
        const userType = headersList.get("x-user-type") as string | null;

        // Фильтрация товаров только для ограниченных пользователей
        // if (userType === "restricted") {
        //     const restrictedBrands = ['carlson-labs', 'childlife'];
        //     allProducts = allProducts.filter((product: WooProduct) => {
        //         const hasRestrictedBrand = product.brands?.some((brand: { slug: string }) =>
        //             restrictedBrands.includes(brand.slug)
        //         );
        //         return !hasRestrictedBrand; // Исключаем товары с запрещёнными брендами
        //     });
        // }
        // Фильтрация товаров в зависимости от типа пользователя
        let restrictedBrands: string[] = [];
        if (userType === "restricted") {
            restrictedBrands = ['carlson-labs', 'childlife']; // Исключаем оба бренда
        } else if (userType === "without_cl") {
            restrictedBrands = ['childlife']; // Исключаем только childlife
        }

        // Применяем фильтрацию, если есть ограничения
        if (restrictedBrands.length > 0) {
            allProducts = allProducts.filter((product: WooProduct) => {
                const hasRestrictedBrand = product.brands?.some((brand: { slug: string }) =>
                    restrictedBrands.includes(brand.slug)
                );
                return !hasRestrictedBrand; // Исключаем товары с запрещёнными брендами
            });
        }

        // Удаление дубликатов
        allProducts = allProducts.filter((product, index, self) =>
            index === self.findIndex((p) => p.id === product.id)
        );

        // Сортировка по количеству на складе
        allProducts.sort((a: WooProduct, b: WooProduct) => {
            const stockA = parseInt(a.stock_quantity?.toString() || '0');
            const stockB = parseInt(b.stock_quantity?.toString() || '0');
            return stockB - stockA;
        });

        const total = allProducts.length;
        const totalPages = Math.ceil(total / perPage);
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

const encodeProductId = (id: string | number): string => {
    return Buffer.from(`post:${id}`).toString('base64');
};

export function convertWooProduct(product: WooProduct) {
    const encodedId = encodeProductId(product.id);

    // Убеждаемся, что мы работаем с массивом
    const brandsArray = Array.isArray(product.brands) ? product.brands : [];

    return {
        id: encodedId,
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
            nodes: brandsArray.map(brand => ({
                id: brand.id.toString(),
                name: brand.name,
                slug: brand.slug,
            }))
        },
    };
}