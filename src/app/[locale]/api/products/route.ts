// src/app/api/products/route.ts
import { NextResponse } from 'next/server';
import { fetchWooProducts, convertWooProduct } from '@/lib/woocommerceCatalog';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') ?? '1');
    const perPage = 20;

    try {
        const { products, total, totalPages } = await fetchWooProducts(page, perPage);
        const convertedProducts = products.map(convertWooProduct);

        return NextResponse.json({
            products: convertedProducts,
            total,
            totalPages,
            currentPage: page
        });
    } catch (error) {
        console.error('Error in API route:', error);
        return NextResponse.json(
            { error: 'Failed to fetch products' },
            { status: 500 }
        );
    }
}