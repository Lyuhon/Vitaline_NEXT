// lib/woocommerceCatalog.ts
// import { env } from '@/env.mjs';

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

export async function fetchWooProducts(page: number = 1, perPage: number = 20): Promise<WooProductsResponse> {
    try {
        const baseUrl = process.env.WOOCOMMERCE_API_URL;
        const url = new URL(`${baseUrl}/products`);

        // Add query parameters
        url.searchParams.append('page', page.toString());
        url.searchParams.append('per_page', perPage.toString());
        url.searchParams.append('status', 'publish');
        url.searchParams.append('stock_status', 'instock');

        const response = await fetch(url.toString(), {
            headers: getAuthHeaders(),
            next: { revalidate: 3600 }, // Cache for 1 hour
        });

        if (!response.ok) {
            throw new Error(`WooCommerce API error: ${response.statusText}`);
        }

        const products = await response.json();
        const total = parseInt(response.headers.get('X-WP-Total') || '0');
        const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '0');

        return {
            products,
            total,
            totalPages,
        };
    } catch (error) {
        console.error('Error fetching WooCommerce products:', error);
        throw error;
    }
}

// Convert WooCommerce product to match your existing format
export function convertWooProduct(product: WooProduct) {
    return {
        id: product.id.toString(),
        name: product.name,
        slug: product.slug,
        image: {
            sourceUrl: product.images[0]?.src || '/images/products/default.jpg',
            altText: product.images[0]?.alt || product.name,
        },
        price: product.price,
        convertedPrice: `${product.price} сўм`,
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