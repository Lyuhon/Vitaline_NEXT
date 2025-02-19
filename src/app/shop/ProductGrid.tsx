// components/ProductGrid.tsx
import Image from 'next/image';
import Link from 'next/link';
import AddToCartButtonInList from '@/components/add_to_cart_popup/AddToCartButtonInList';

interface ProductGridProps {
    products: any[];
    showStock?: boolean;
}

const parsePrice = (price: string): number => {
    const cleanedPrice = price.replace(/[^\d.]/g, '');
    const num = parseFloat(cleanedPrice);
    return isNaN(num) ? 0 : num;
};

export const ProductGrid = ({ products, showStock = false }: ProductGridProps) => {
    return (
        <div className="shop_page_prod_grid">
            {products.map((p) => {
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
    );
};