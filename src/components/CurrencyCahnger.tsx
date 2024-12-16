'use client';

import { useEffect } from 'react';

export default function ConvertPricesToUSD() {
    const convertToUSD = (priceText: string, exchangeRate: number): string => {
        const priceMatch = priceText.match(/[\d\s]+/);
        if (!priceMatch) return priceText;
        const price = parseFloat(priceMatch[0].replace(/\s/g, ''));
        const usdPrice = (price / exchangeRate).toFixed(2);
        return `$${usdPrice}`;
    };

    useEffect(() => {
        const exchangeRate = 12900;
        const priceElements = document.querySelectorAll('.product_item__price, .product_price');
        priceElements.forEach((element) => {
            const priceText = element.textContent || '';
            element.textContent = convertToUSD(priceText, exchangeRate);
        });
    }, []);

    return null;
}
