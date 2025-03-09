// src/app/components/HeaderWrapper.tsx
import { headers } from 'next/headers';
import Header from './Header';

export default async function HeaderWrapper() {
    const headersList = await headers();
    const userType = headersList.get("x-user-type") || null;

    return <Header userType={userType} />;
}