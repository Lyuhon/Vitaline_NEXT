// src/app/[category]/page.tsx
import { fetchProductsByCategory } from '@/lib/fetchProductsByCategory';
import { fetchCategoryName } from '@/lib/fetchCategoryName';
import { notFound } from 'next/navigation';
import LoadMoreClient from '@/components/LoadMoreClient';
import './shop.css';

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    // Дожидаемся params перед использованием
    const { category } = await params;

    const categoryName = await fetchCategoryName(category);
    if (!categoryName) {
        notFound();
    }

    const {
        nodes: initialProducts,
        endCursor: initialEndCursor,
        hasNextPage: initialHasNextPage,
    } = await fetchProductsByCategory(category);

    return (
        <div className="shop_page">
            <div className="shop_page_wrapper">
                <div className="category_filter_side">
                    {/* Фильтры при необходимости */}
                </div>

                <div className="products_side">
                    <h1 className="shop_page_title">{categoryName}</h1>

                    <div className="shop_page_prod_grid">
                        {/* Передаем начальные товары в клиентский компонент */}
                        <LoadMoreClient
                            initialProducts={initialProducts}
                            initialEndCursor={initialEndCursor}
                            initialHasNextPage={initialHasNextPage}
                            category={category}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
