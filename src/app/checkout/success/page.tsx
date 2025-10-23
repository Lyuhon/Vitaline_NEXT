import SuccessPage from './SuccessPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Ваш заказ успешно оформлен - Vitaline',
    description: 'Подтверждение заказа товара.',
};

export default function Page() {
    return <SuccessPage />;
}