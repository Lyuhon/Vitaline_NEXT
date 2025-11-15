// src/app/[locale]/not-found.tsx
'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function NotFound() {
    const t = useTranslations('NotFound');

    return (
        <section className="product-not-found">
            <h1>{t('title')}</h1>
            <p>
                {t('description')}
                <br />
                {t('suggestion')}
            </p>
            <Link href="/shop" className="catalog-link">
                {t('catalogButton')}
            </Link>
        </section>
    );
}