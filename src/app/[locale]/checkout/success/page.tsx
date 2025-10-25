// // \app\[locale]\checkout\success\page.tsx
// import SuccessPage from './SuccessPage';
// import { Metadata } from 'next';

// export const metadata: Metadata = {
//     title: 'Ваш заказ успешно оформлен - Vitaline',
//     description: 'Подтверждение заказа товара.',
// };

// export default function Page() {
//     return <SuccessPage />;
// }



// \app\[locale]\checkout\success\page.tsx
import SuccessPage from './SuccessPage';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'checkout' });

    return {
        title: t('pageTitle'),
        description: t('pageDescription'),
    };
}

export default function Page() {
    return <SuccessPage />;
}