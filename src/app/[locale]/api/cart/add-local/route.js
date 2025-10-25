// src/app/api/cart/add-local/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const product = await request.json();

        // API теперь просто логирует запросы и возвращает успех
        console.log('--- [api/cart/add] INCOMING REQUEST ---');
        console.log('Received product:', product);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Cart operation failed:', error);
        return NextResponse.json(
            { error: 'Cart operation failed' },
            { status: 500 }
        );
    }
}