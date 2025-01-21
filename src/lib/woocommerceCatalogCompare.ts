// // // lib/woocommerceCatalogCompare.ts

// // export type WooProduct = {
// //     id: string;
// //     name: string;
// //     slug: string;
// //     price: string;
// //     sku: string; // Added SKU field
// //     stock_status: string;
// //     stock_quantity: number;
// //     images: {
// //         src: string;
// //         alt: string;
// //     }[];
// //     yith_product_brand?: Array<{
// //         id: number;
// //         name: string;
// //         slug: string;
// //     }> | null;
// //     brands?: any;
// // };

// // export type ComparedProduct = {
// //     id: string;
// //     name: string;
// //     sku: string;
// //     wholesalePrice: number;
// //     retailPrice: number;
// //     profit: number;
// //     image: {
// //         sourceUrl: string;
// //         altText: string;
// //     };
// //     stockStatus: string;
// //     stockQuantity: number;
// // };

// // export type WooProductsResponse = {
// //     products: ComparedProduct[];
// //     total: number;
// //     totalPages: number;
// // };

// // const getAuthHeaders = (isRetail: boolean = false) => {
// //     const consumerKey = isRetail
// //         ? process.env.WOOCOMMERCE_CONSUMER_KEY_VT
// //         : process.env.WOOCOMMERCE_CONSUMER_KEY;
// //     const consumerSecret = isRetail
// //         ? process.env.WOOCOMMERCE_CONSUMER_SECRET_VT
// //         : process.env.WOOCOMMERCE_CONSUMER_SECRET;
// //     const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
// //     return {
// //         Authorization: `Basic ${credentials}`,
// //     };
// // };

// // const formatPriceToUSD = (price: string): number => {
// //     const numericPrice = parseFloat(price.replace(/[^\d.]/g, ''));
// //     return numericPrice / 12800;
// // };

// // async function fetchProductsFromAPI(isRetail: boolean): Promise<WooProduct[]> {
// //     const baseUrl = isRetail
// //         ? process.env.WOOCOMMERCE_API_URL_VT
// //         : process.env.WOOCOMMERCE_API_URL;
// //     const url = new URL(`${baseUrl}/products`);

// //     url.searchParams.append('per_page', '100');
// //     url.searchParams.append('status', 'publish');
// //     url.searchParams.append('stock_status', 'instock');

// //     let allProducts: WooProduct[] = [];
// //     let currentPage = 1;
// //     let hasMorePages = true;

// //     while (hasMorePages) {
// //         url.searchParams.set('page', currentPage.toString());

// //         const response = await fetch(url.toString(), {
// //             headers: getAuthHeaders(isRetail),
// //             cache: 'no-store',
// //         });

// //         if (!response.ok) {
// //             throw new Error(`WooCommerce API error: ${response.statusText}`);
// //         }

// //         const products = await response.json();

// //         if (!Array.isArray(products) || products.length === 0) {
// //             break;
// //         }

// //         allProducts = [...allProducts, ...products];

// //         const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '0');
// //         hasMorePages = currentPage < totalPages;
// //         currentPage++;
// //     }

// //     return allProducts;
// // }

// // export async function fetchComparedProducts(page: number = 1, perPage: number = 50): Promise<WooProductsResponse> {
// //     try {
// //         // Fetch products from both APIs
// //         const [wholesaleProducts, retailProducts] = await Promise.all([
// //             fetchProductsFromAPI(false),  // Wholesale
// //             fetchProductsFromAPI(true)    // Retail
// //         ]);

// //         // Create a map of retail products by SKU for faster lookup
// //         const retailProductMap = new Map(
// //             retailProducts.map(product => [product.sku, product])
// //         );

// //         // Compare and combine products
// //         const comparedProducts: ComparedProduct[] = wholesaleProducts
// //             .filter(wholesale => wholesale.sku && retailProductMap.has(wholesale.sku))
// //             .map(wholesale => {
// //                 const retail = retailProductMap.get(wholesale.sku)!;
// //                 const wholesalePrice = formatPriceToUSD(wholesale.price);
// //                 const retailPrice = formatPriceToUSD(retail.price);
// //                 const profit = retailPrice - (wholesalePrice * 1.016);

// //                 return {
// //                     id: wholesale.id,
// //                     name: wholesale.name,
// //                     sku: wholesale.sku,
// //                     wholesalePrice,
// //                     retailPrice,
// //                     profit,
// //                     image: {
// //                         sourceUrl: wholesale.images[0]?.src || '/images/products/default.jpg',
// //                         altText: wholesale.images[0]?.alt || wholesale.name,
// //                     },
// //                     stockStatus: wholesale.stock_status,
// //                     stockQuantity: wholesale.stock_quantity,
// //                 };
// //             })
// //             .sort((a, b) => b.profit - a.profit); // Sort by profit in descending order

// //         const total = comparedProducts.length;
// //         const totalPages = Math.ceil(total / perPage);
// //         const startIndex = (page - 1) * perPage;
// //         const endIndex = startIndex + perPage;
// //         const paginatedProducts = comparedProducts.slice(startIndex, endIndex);

// //         return {
// //             products: paginatedProducts,
// //             total,
// //             totalPages,
// //         };
// //     } catch (error) {
// //         console.error('Error fetching compared products:', error);
// //         throw error;
// //     }
// // }

// // lib/woocommerceCatalogCompare.ts

// export type WooProduct = {
//     id: string;
//     name: string;
//     slug: string;
//     price: string;
//     sku: string; // Added SKU field
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
//     brands?: any;
// };

// export type ComparedProduct = {
//     id: string;
//     name: string;
//     sku: string;
//     wholesalePrice: number;
//     retailPrice: number;
//     profit: number;
//     profitPercentage: number;
//     image: {
//         sourceUrl: string;
//         altText: string;
//     };
//     stockStatus: string;
//     stockQuantity: number;
//     wholesaleUrl: string;
//     retailUrl: string;
// };

// export type WooProductsResponse = {
//     products: ComparedProduct[];
//     total: number;
//     totalPages: number;
// };

// const getAuthHeaders = (isRetail: boolean = false) => {
//     const consumerKey = isRetail
//         ? process.env.WOOCOMMERCE_CONSUMER_KEY_VT
//         : process.env.WOOCOMMERCE_CONSUMER_KEY;
//     const consumerSecret = isRetail
//         ? process.env.WOOCOMMERCE_CONSUMER_SECRET_VT
//         : process.env.WOOCOMMERCE_CONSUMER_SECRET;
//     const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
//     return {
//         Authorization: `Basic ${credentials}`,
//     };
// };

// const formatPriceToUSD = (price: string): number => {
//     const numericPrice = parseFloat(price.replace(/[^\d.]/g, ''));
//     return numericPrice / 12800;
// };

// async function fetchProductsFromAPI(isRetail: boolean): Promise<WooProduct[]> {
//     const baseUrl = isRetail
//         ? process.env.WOOCOMMERCE_API_URL_VT
//         : process.env.WOOCOMMERCE_API_URL;
//     const url = new URL(`${baseUrl}/products`);

//     url.searchParams.append('per_page', '100');
//     url.searchParams.append('status', 'publish');
//     url.searchParams.append('stock_status', 'instock');

//     let allProducts: WooProduct[] = [];
//     let currentPage = 1;
//     let hasMorePages = true;

//     while (hasMorePages) {
//         url.searchParams.set('page', currentPage.toString());

//         const response = await fetch(url.toString(), {
//             headers: getAuthHeaders(isRetail),
//             cache: 'no-store',
//         });

//         if (!response.ok) {
//             throw new Error(`WooCommerce API error: ${response.statusText}`);
//         }

//         const products = await response.json();

//         if (!Array.isArray(products) || products.length === 0) {
//             break;
//         }

//         allProducts = [...allProducts, ...products];

//         const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '0');
//         hasMorePages = currentPage < totalPages;
//         currentPage++;
//     }

//     return allProducts;
// }

// export async function fetchComparedProducts(page: number = 1, perPage: number = 50): Promise<WooProductsResponse> {
//     try {
//         // Fetch products from both APIs
//         const [wholesaleProducts, retailProducts] = await Promise.all([
//             fetchProductsFromAPI(false),  // Wholesale
//             fetchProductsFromAPI(true)    // Retail
//         ]);

//         // Create a map of retail products by SKU for faster lookup
//         const retailProductMap = new Map(
//             retailProducts.map(product => [product.sku, product])
//         );

//         // Compare and combine products
//         const comparedProducts: ComparedProduct[] = wholesaleProducts
//             .filter(wholesale => wholesale.sku && retailProductMap.has(wholesale.sku))
//             .map(wholesale => {
//                 const retail = retailProductMap.get(wholesale.sku)!;
//                 const wholesalePrice = formatPriceToUSD(wholesale.price);
//                 const retailPrice = formatPriceToUSD(retail.price);
//                 const profit = retailPrice - (wholesalePrice * 1.016);
//                 const profitPercentage = (profit / retailPrice) * 100;

//                 return {
//                     id: wholesale.id,
//                     name: wholesale.name,
//                     sku: wholesale.sku,
//                     wholesalePrice,
//                     retailPrice,
//                     profit,
//                     image: {
//                         sourceUrl: wholesale.images[0]?.src || '/images/products/default.jpg',
//                         altText: wholesale.images[0]?.alt || wholesale.name,
//                     },
//                     stockStatus: wholesale.stock_status,
//                     stockQuantity: wholesale.stock_quantity,
//                     wholesaleUrl: `https://nuxt.vitaline.uz/product/${wholesale.slug}`,
//                     retailUrl: `https://vitaline.uz/product/${retail.slug}`,
//                     profitPercentage,
//                 };
//             })
//             .sort((a, b) => b.profit - a.profit); // Sort by profit in descending order

//         const total = comparedProducts.length;
//         const totalPages = Math.ceil(total / perPage);
//         const startIndex = (page - 1) * perPage;
//         const endIndex = startIndex + perPage;
//         const paginatedProducts = comparedProducts.slice(startIndex, endIndex);

//         return {
//             products: paginatedProducts,
//             total,
//             totalPages,
//         };
//     } catch (error) {
//         console.error('Error fetching compared products:', error);
//         throw error;
//     }
// }