// app/cart/page.tsx
import { Suspense } from 'react';
import CartClient from './CartClient';
import Loading from './loading';
import CartStyles from './CartStyles';


export default function Page() {
    return (
        <Suspense fallback={<Loading />}>
            <CartClient />
            <CartStyles />
        </Suspense>
    );
}