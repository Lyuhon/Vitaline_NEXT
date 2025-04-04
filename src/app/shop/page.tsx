// src/app/shop/page.tsx
import { fetchWooProducts, convertWooProduct } from '@/lib/woocommerceCatalog';
import { redirect } from 'next/navigation';
import './shop.css';
import { MiniCartProvider } from '@/app/context/MiniCartContext';
import ShopBrandsSlider from '@/components/ShopBrandsSlider';
import { ShopClientWrapper } from './ShopClientWrapper';

interface ShopPageProps {
    searchParams: Promise<{
        page?: string;
        debug?: string;
    }>;
}

export const dynamic = 'force-dynamic';

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

                        <ShopClientWrapper
                            initialProducts={convertedProducts}
                            initialTotal={total}
                            initialTotalPages={totalPages}
                            currentPage={currentPage}
                            perPage={perPage}
                            showStock={showStock}
                        />
                    </div>
                </div>
            </div>
        </MiniCartProvider>
    );
}