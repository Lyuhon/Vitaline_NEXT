// app/checkout/page.tsx
import { Suspense } from 'react';
import CheckoutClient from './CheckoutClient';
import Loading from './loading';

export default function Page() {
    return (
        <Suspense fallback={<Loading />}>
            <CheckoutClient />
        </Suspense>
    );
}