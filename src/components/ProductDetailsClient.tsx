// 'use client';

// import { useState } from 'react';
// import AddToCartButton from '@/components/AddToCartButton';
// import AddedToCart from '@/components/AddedToCart';

// export default function ProductDetailsClient({ product, relatedProducts }: { product: any; relatedProducts: any[] }) {
//     const [popupVisible, setPopupVisible] = useState(false);
//     const [addedProduct, setAddedProduct] = useState<{
//         name: string;
//         imageUrl: string;
//         quantity: number;
//     } | null>(null);

//     const handleAddSuccess = (productDetails: { name: string; imageUrl: string; quantity: number }) => {
//         setAddedProduct(productDetails);
//         setPopupVisible(true);
//     };

//     return (
//         <div>
//             <div className="product-details">
//                 <h1>{product.name}</h1>
//                 <div>{product.price}</div>
//                 <AddToCartButton
//                     productId={product.id}
//                     initialQty={1}
//                     onAddSuccess={handleAddSuccess}
//                 />
//             </div>

//             {popupVisible && addedProduct && (
//                 <AddedToCart
//                     productName={addedProduct.name}
//                     imageUrl={addedProduct.imageUrl}
//                     initialQuantity={addedProduct.quantity}
//                     stock={product.stock}
//                     onClose={() => setPopupVisible(false)}
//                 />
//             )}

//             {relatedProducts.length > 0 && (
//                 <div>
//                     <h2>Похожие товары</h2>
//                     <div>
//                         {relatedProducts.map((rp) => (
//                             <div key={rp.id}>
//                                 <img src={rp.image?.sourceUrl} alt={rp.name} />
//                                 <span>{rp.name}</span>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }
