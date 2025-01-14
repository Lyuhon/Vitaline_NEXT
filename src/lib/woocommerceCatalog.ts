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

//         // Получаем все товары за один запрос
//         url.searchParams.append('per_page', '100'); // максимальное количество на странице
//         url.searchParams.append('status', 'publish');
//         url.searchParams.append('stock_status', 'instock');

//         let allProducts: WooProduct[] = [];
//         let currentPage = 1;
//         let hasMorePages = true;

//         // Получаем все товары
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

//             allProducts = [...allProducts, ...products];

//             // Проверяем, есть ли ещё страницы
//             const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '0');
//             if (currentPage >= totalPages) {
//                 hasMorePages = false;
//             } else {
//                 currentPage++;
//             }
//         }

//         // Удаляем дубликаты по ID перед сортировкой
//         allProducts = allProducts.filter((product, index, self) =>
//             index === self.findIndex((p) => p.id === product.id)
//         );

//         // Сортируем все товары по количеству
//         allProducts.sort((a: WooProduct, b: WooProduct) => {
//             const stockA = parseInt(a.stock_quantity?.toString() || '0');
//             const stockB = parseInt(b.stock_quantity?.toString() || '0');
//             return stockB - stockA;
//         });

//         // Вычисляем общее количество товаров и страниц
//         const total = allProducts.length;
//         const totalPages = Math.ceil(total / perPage);

//         // Получаем нужную страницу
//         const startIndex = (page - 1) * perPage;
//         const endIndex = startIndex + perPage;
//         const paginatedProducts = allProducts.slice(startIndex, endIndex);









//         // Добавим проверку на дубликаты перед сортировкой
//         const duplicates = allProducts.filter((item, index) =>
//             allProducts.findIndex(product => product.id === item.id) !== index
//         );

//         if (duplicates.length > 0) {
//             console.log('Найдены дубликаты:', duplicates);
//         }

//         // После пагинации тоже проверим
//         const duplicatesInPage = paginatedProducts.filter((item, index) =>
//             paginatedProducts.findIndex(product => product.id === item.id) !== index
//         );

//         if (duplicatesInPage.length > 0) {
//             console.log('Найдены дубликаты на странице:', duplicatesInPage);
//         }

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

// // Добавляем функцию кодирования ID в начало файла
// const encodeProductId = (id: string | number): string => {
//     return Buffer.from(`post:${id}`).toString('base64');
// };

// // Convert WooCommerce product to match your existing format
// export function convertWooProduct(product: WooProduct) {

//     // const encodedId = encodeProductId(product.id);
//     console.log('Оригинальный ID:', product.id);
//     console.log('Тип ID:', typeof product.id);

//     // Закодируем и сразу раскодируем для проверки
//     const encodedId = encodeProductId(product.id);
//     const decodedId = Buffer.from(encodedId, 'base64').toString();

//     console.log('Закодированный ID:', encodedId);
//     console.log('Раскодированный ID:', decodedId);

//     return {
//         // id: product.id.toString(),
//         // id: encodeProductId(product.id), // Здесь кодируем ID
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
//             nodes: product.categories.map(cat => ({
//                 id: cat.id.toString(),
//                 name: cat.name,
//                 slug: cat.slug,
//             })),
//         },
//     };
// }


// lib/woocommerceCatalog.ts

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

            // Добавляем отладочный вывод
            // if (currentPage === 1) {
            //     console.log('First product structure:', JSON.stringify(products[0], null, 2));
            //     console.log('yith_product_brand type:', typeof products[0].yith_product_brand);
            //     console.log('yith_product_brand value:', products[0].yith_product_brand);
            // }

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

        allProducts = allProducts.filter((product, index, self) =>
            index === self.findIndex((p) => p.id === product.id)
        );

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

    // Добавляем отладочный вывод
    // console.log('Converting product:', {
    //     id: product.id,
    //     brands: product.brands,
    //     yith_product_brand: product.yith_product_brand
    // });

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