// src/app/shop/page.tsx
import { fetchWooProducts, convertWooProduct } from '@/lib/woocommerceCatalog';
import { redirect } from 'next/navigation';
import './shop.css';
import { MiniCartProvider } from '@/app/context/MiniCartContext';
import { Pagination } from './Pagination';
import ShopBrandsSlider from '@/components/ShopBrandsSlider';
import { ProductGrid } from './ProductGrid';

interface ShopPageProps {
    searchParams: Promise<{
        page?: string;
        debug?: string;
    }>;
}

export const dynamic = 'force-dynamic';

export const generateMetadata = () => {
    return {
        title: 'Каталог товаров - Vitaline',
        description: 'Оптовый каталог товаров Американских витаминов.',
    };
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
    const params = await searchParams;
    const currentPage = params.page ? parseInt(params.page) : 1;
    const showStock = params.debug === 'stock';
    const perPage = 20;

    const { products, total, totalPages } = await fetchWooProducts(currentPage, perPage);

    if (currentPage > totalPages || currentPage < 1) {
        redirect('/shop?page=1');
    }

    const convertedProducts = products.map(convertWooProduct);

    return (
        <MiniCartProvider>
            <div className="shop_page">
                <div className="shop_page_wrapper">
                    <div className="products_side">
                        <ShopBrandsSlider />

                        <h1 className="shop_page_title">Каталог товаров</h1>
                        <h2 style={{ marginBottom: '15px' }}>
                            Отображено {(currentPage - 1) * perPage + 1}–{Math.min(currentPage * perPage, total)} из {total}
                        </h2>

                        <ProductGrid products={convertedProducts} showStock={showStock} />

                        <div className="pagination_controls">
                            {totalPages > 1 && (
                                <Pagination currentPage={currentPage} totalPages={totalPages} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </MiniCartProvider>
    );
}