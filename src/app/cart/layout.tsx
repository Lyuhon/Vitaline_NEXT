// app/cart/layout.tsx
export const metadata = {
    title: 'Корзина товаров - Vitaline',
    description: 'Корзина с выбранными товарами.',
};

export default function CartLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}