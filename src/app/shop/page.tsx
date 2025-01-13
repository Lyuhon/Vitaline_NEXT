// src/app/shop/page.tsx
import { fetchWooProducts, convertWooProduct } from '@/lib/woocommerceCatalog';
import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import './shop.css';
import AddToCartButtonInList from '@/components/add_to_cart_popup/AddToCartButtonInList';
import { MiniCartProvider } from '@/app/context/MiniCartContext';
import { Pagination } from './Pagination';

// Обновленная функция, которая принимает строку или число
// const encodeProductId = (id: string | number): string => {
//     return Buffer.from(`post:${id}`).toString('base64');
// };
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

const parsePrice = (price: string): number => {
    const cleanedPrice = price.replace(/[^\d.]/g, '');
    const num = parseFloat(cleanedPrice);
    return isNaN(num) ? 0 : num;
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
    const params = await searchParams;
    const currentPage = params.page ? parseInt(params.page) : 1;
    const showStock = params.debug === 'stock'; // Будет true если в URL есть ?debug=stock
    const perPage = 20;

    const { products, total, totalPages } = await fetchWooProducts(currentPage, perPage);

    // Проверка на некорректную страницу
    if (currentPage > totalPages || currentPage < 1) {
        redirect('/shop?page=1');
    }

    const convertedProducts = products.map(convertWooProduct);

    return (
        <MiniCartProvider>
            <div className="shop_page">
                <div className="shop_page_wrapper">
                    <div className="products_side">
                        <h1 className="shop_page_title">Каталог товаров</h1>
                        <h2 style={{ marginBottom: '15px' }}>
                            Отображено {(currentPage - 1) * perPage + 1}–{Math.min(currentPage * perPage, total)} из {total}
                        </h2>

                        <div className="shop_page_prod_grid">
                            {convertedProducts.map((p) => {
                                const numericPrice = p.convertedPrice ? parsePrice(p.convertedPrice) : 0;
                                const inStock = p.stockStatus === 'IN_STOCK';

                                return (
                                    <div className="product_item" key={p.id}>
                                        <Link href={`/product/${p.slug}`}>
                                            <Image
                                                className="product_item__image"
                                                src={p.image?.sourceUrl || '/images/products/default.jpg'}
                                                alt={p.image?.altText || p.name}
                                                width={200}
                                                height={200}
                                            />
                                        </Link>

                                        <div className="product_meta_box">
                                            {p.brands && p.brands.nodes.length > 0 && (
                                                <Link
                                                    href={`/product-brands/${p.brands.nodes[0].slug}`}
                                                    className="product_item__brand"
                                                >
                                                    {p.brands.nodes[0].name}
                                                </Link>
                                            )}

                                            <div className="line_highlight"></div>

                                            <Link href={`/product/${p.slug}`} className="product_item__name">
                                                {p.name}
                                            </Link>

                                            <span className="product_item__price">
                                                {p.convertedPrice ? p.convertedPrice : 'Цена не указана'}
                                            </span>

                                            {showStock && (
                                                <div className="product_item__stock">
                                                    <span className="stock_count">В наличии: <b>{p.stockQuantity}</b></span>
                                                </div>
                                            )}
                                        </div>

                                        <AddToCartButtonInList
                                            productId={p.id}
                                            // productId={encodeProductId(p.id)}
                                            productName={p.name}
                                            productImage={p.image?.sourceUrl ?? '/images/products/default.jpg'}
                                            productPrice={numericPrice}
                                            maxQuantity={p.stockQuantity || 1}
                                            stock={inStock}
                                        />
                                    </div>
                                );
                            })}
                        </div>

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