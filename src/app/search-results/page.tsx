// src/app/search-results/page.tsx
import { headers } from 'next/headers';
import ClientSearchResults from './ClientSearchResults';

export const dynamic = 'force-dynamic';

// Абсолютно минимальный вариант с типом 'any' для searchParams
export default async function SearchResultsPage({
    searchParams
}: {
    searchParams: any
}) {
    let userType = null;

    try {
        const headersList = await headers();
        userType = headersList.get("x-user-type") || null;
    } catch (error) {
        console.error('Error getting headers:', error);
    }

    return (
        <ClientSearchResults
            searchParams={searchParams}
            userType={userType}
        />
    );
}