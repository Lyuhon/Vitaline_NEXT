// // src/app/search-results/page.tsx
// import { headers } from 'next/headers';
// import ClientSearchResults from './ClientSearchResults';

// export const dynamic = 'force-dynamic';

// // Абсолютно минимальный вариант с типом 'any' для searchParams
// export default async function SearchResultsPage({
//     searchParams
// }: {
//     searchParams: any
// }) {
//     let userType = null;

//     try {
//         const headersList = await headers();
//         userType = headersList.get("x-user-type") || null;
//     } catch (error) {
//         console.error('Error getting headers:', error);
//     }

//     return (
//         <ClientSearchResults
//             searchParams={searchParams}
//             userType={userType}
//         />
//     );
// }


// src/app/[locale]/search-results/page.tsx
import { headers } from 'next/headers';
import ClientSearchResults from './ClientSearchResults';
import { getTranslations } from 'next-intl/server';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'search' });

    return {
        title: t('metadataTitle'),
        description: t('metadataDescription'),
    };
}

export default async function SearchResultsPage({
    params,
    searchParams
}: {
    params: Promise<{ locale: string }>;
    searchParams: Promise<any>;
}) {
    const { locale } = await params;
    const resolvedSearchParams = await searchParams;

    let userType = null;

    try {
        const headersList = await headers();
        userType = headersList.get("x-user-type") || null;
    } catch (error) {
        console.error('Error getting headers:', error);
    }

    return (
        <ClientSearchResults
            searchParams={resolvedSearchParams}
            userType={userType}
            locale={locale}
        />
    );
}