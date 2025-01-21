// // // // // app/compare/page.tsx
// // // // import { fetchComparedProducts } from '@/lib/woocommerceCatalogCompare';
// // // // import Image from 'next/image';

// // // // export const dynamic = 'force-dynamic';
// // // // export const fetchCache = 'force-no-store';
// // // // export const revalidate = 0;

// // // // export default async function ComparePage() {
// // // //     const { products } = await fetchComparedProducts(1, 100); // Changed to 100 products

// // // //     return (
// // // //         <div className="container mx-auto p-4">
// // // //             <h1 className="text-2xl font-bold mb-6">Product Comparison ({products.length} products)</h1>
// // // //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
// // // //                 {products.map((product) => (
// // // //                     <div key={product.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
// // // //                         <div className="flex items-start space-x-4">
// // // //                             <div className="flex-shrink-0">
// // // //                                 <Image
// // // //                                     src={product.image.sourceUrl}
// // // //                                     alt={product.image.altText}
// // // //                                     width={100}
// // // //                                     height={100}
// // // //                                     className="rounded-md object-cover"
// // // //                                     priority={false}
// // // //                                 />
// // // //                             </div>
// // // //                             <div className="flex-1 min-w-0">
// // // //                                 <h2 className="text-lg font-semibold mb-2 truncate">{product.name}</h2>
// // // //                                 <p className="text-sm text-gray-600 mb-1">SKU: {product.sku}</p>
// // // //                                 <div className="space-y-1">
// // // //                                     <p className="text-sm">
// // // //                                         Wholesale: ${product.wholesalePrice.toFixed(2)}
// // // //                                     </p>
// // // //                                     <p className="text-sm">
// // // //                                         Retail: ${product.retailPrice.toFixed(2)}
// // // //                                     </p>
// // // //                                     <p className="text-sm font-semibold text-green-600">
// // // //                                         Profit: ${product.profit.toFixed(2)}
// // // //                                     </p>
// // // //                                 </div>
// // // //                                 <div className="mt-2">
// // // //                                     <span className={`text-sm px-2 py-1 rounded ${product.stockStatus === 'instock'
// // // //                                             ? 'bg-green-100 text-green-800'
// // // //                                             : 'bg-red-100 text-red-800'
// // // //                                         }`}>
// // // //                                         {product.stockQuantity} in stock
// // // //                                     </span>
// // // //                                 </div>
// // // //                             </div>
// // // //                         </div>
// // // //                     </div>
// // // //                 ))}
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // }

// // // // app/compare/page.tsx
// // // import { fetchComparedProducts } from '@/lib/woocommerceCatalogCompare';
// // // import Image from 'next/image';
// // // import Link from 'next/link';
// // // import type { ComparedProduct } from '@/lib/woocommerceCatalogCompare';

// // // export const dynamic = 'force-dynamic';
// // // export const fetchCache = 'force-no-store';
// // // export const revalidate = 0;

// // // function ProductCard({ product }: { product: ComparedProduct }) {
// // //     return (
// // //         <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
// // //             <div className="flex items-start space-x-4">
// // //                 <div className="flex-shrink-0">
// // //                     <Image
// // //                         src={product.image.sourceUrl}
// // //                         alt={product.image.altText}
// // //                         width={100}
// // //                         height={100}
// // //                         className="rounded-md object-cover"
// // //                         priority={false}
// // //                     />
// // //                 </div>
// // //                 <div className="flex-1 min-w-0">
// // //                     <h2 className="text-lg font-semibold mb-2 truncate">{product.name}</h2>
// // //                     <p className="text-sm text-gray-600 mb-1">SKU: {product.sku}</p>
// // //                     <div className="space-y-1">
// // //                         <p className="text-sm">
// // //                             Wholesale: ${product.wholesalePrice.toFixed(2)}
// // //                             <Link
// // //                                 href={product.wholesaleUrl}
// // //                                 target="_blank"
// // //                                 className="ml-2 text-blue-600 hover:text-blue-800"
// // //                             >
// // //                                 [Link]
// // //                             </Link>
// // //                         </p>
// // //                         <p className="text-sm">
// // //                             Retail: ${product.retailPrice.toFixed(2)}
// // //                             <Link
// // //                                 href={product.retailUrl}
// // //                                 target="_blank"
// // //                                 className="ml-2 text-blue-600 hover:text-blue-800"
// // //                             >
// // //                                 [Link]
// // //                             </Link>
// // //                         </p>
// // //                         <p className="text-sm font-semibold text-green-600">
// // //                             Profit: ${product.profit.toFixed(2)} ({product.profitPercentage.toFixed(1)}%)
// // //                         </p>
// // //                     </div>
// // //                     <div className="mt-2">
// // //                         <span className={`text-sm px-2 py-1 rounded ${product.stockStatus === 'instock'
// // //                                 ? 'bg-green-100 text-green-800'
// // //                                 : 'bg-red-100 text-red-800'
// // //                             }`}>
// // //                             {product.stockQuantity} in stock
// // //                         </span>
// // //                     </div>
// // //                 </div>
// // //             </div>
// // //         </div>
// // //     );
// // // }

// // // export default async function ComparePage() {
// // //     const { products } = await fetchComparedProducts(1, 100);

// // //     // Находим топовые предложения
// // //     const topDeals = products.filter(product =>
// // //         product.wholesalePrice < 15 &&
// // //         product.profitPercentage > 30
// // //     ).sort((a, b) => b.profitPercentage - a.profitPercentage);

// // //     return (
// // //         <div className="container mx-auto p-4 space-y-8">
// // //             <section>
// // //                 <h1 className="text-2xl font-bold mb-6">Product Comparison ({products.length} products)</h1>
// // //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
// // //                     {products.map((product) => (
// // //                         <ProductCard key={product.id} product={product} />
// // //                     ))}
// // //                 </div>
// // //             </section>

// // //             <section className="bg-gray-50 p-6 rounded-lg">
// // //                 <h2 className="text-xl font-bold mb-4">Top Deals (Under $15 with 30%+ Profit)</h2>
// // //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// // //                     {topDeals.map((product) => (
// // //                         <div
// // //                             key={product.id}
// // //                             className="bg-white p-4 rounded-lg shadow"
// // //                         >
// // //                             <div className="flex items-center gap-4">
// // //                                 <Image
// // //                                     src={product.image.sourceUrl}
// // //                                     alt={product.image.altText}
// // //                                     width={80}
// // //                                     height={80}
// // //                                     className="rounded-md object-cover"
// // //                                 />
// // //                                 <div>
// // //                                     <h3 className="font-semibold">{product.name}</h3>
// // //                                     <p className="text-sm text-gray-600">SKU: {product.sku}</p>
// // //                                     <p className="text-green-600 font-medium">
// // //                                         Profit: {product.profitPercentage.toFixed(1)}%
// // //                                     </p>
// // //                                     <div className="flex gap-2 mt-2">
// // //                                         <Link
// // //                                             href={product.wholesaleUrl}
// // //                                             target="_blank"
// // //                                             className="text-xs text-blue-600 hover:text-blue-800"
// // //                                         >
// // //                                             Wholesale
// // //                                         </Link>
// // //                                         <Link
// // //                                             href={product.retailUrl}
// // //                                             target="_blank"
// // //                                             className="text-xs text-blue-600 hover:text-blue-800"
// // //                                         >
// // //                                             Retail
// // //                                         </Link>
// // //                                     </div>
// // //                                 </div>
// // //                             </div>
// // //                         </div>
// // //                     ))}
// // //                 </div>
// // //             </section>
// // //         </div>
// // //     );
// // // }

// // // app/compare/page.tsx
// // import { fetchComparedProducts } from '@/lib/woocommerceCatalogCompare';
// // import Image from 'next/image';
// // import Link from 'next/link';
// // import type { ComparedProduct } from '@/lib/woocommerceCatalogCompare';

// // export const dynamic = 'force-dynamic';
// // export const fetchCache = 'force-no-store';
// // export const revalidate = 0;

// // function ProductCard({ product }: { product: ComparedProduct }) {
// //     return (
// //         <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-white">
// //             <div className="flex items-start space-x-4">
// //                 <div className="flex-shrink-0">
// //                     <Image
// //                         src={product.image.sourceUrl}
// //                         alt={product.image.altText}
// //                         width={100}
// //                         height={100}
// //                         className="rounded-md object-cover"
// //                         priority={false}
// //                     />
// //                 </div>
// //                 <div className="flex-1 min-w-0">
// //                     <h2 className="text-lg font-semibold mb-2 truncate">{product.name}</h2>
// //                     <p className="text-sm text-gray-600 mb-1">SKU: {product.sku}</p>
// //                     <div className="space-y-1">
// //                         <p className="text-sm">
// //                             Price: ${product.wholesalePrice.toFixed(2)}
// //                             <Link
// //                                 href={product.wholesaleUrl}
// //                                 target="_blank"
// //                                 className="ml-2 text-blue-600 hover:text-blue-800"
// //                             >
// //                                 [Open]
// //                             </Link>
// //                         </p>
// //                         <p className="text-sm font-semibold text-green-600">
// //                             Profit: ${product.profit.toFixed(2)} ({product.profitPercentage.toFixed(1)}%)
// //                         </p>
// //                     </div>
// //                     <div className="mt-2">
// //                         <span className={`text-sm px-2 py-1 rounded ${product.stockStatus === 'instock'
// //                                 ? 'bg-green-100 text-green-800'
// //                                 : 'bg-red-100 text-red-800'
// //                             }`}>
// //                             {product.stockQuantity} in stock
// //                         </span>
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }

// // function ProfitSection({ title, products }: { title: string; products: ComparedProduct[] }) {
// //     if (products.length === 0) return null;

// //     return (
// //         <section className="mt-8">
// //             <h2 className="text-xl font-bold mb-4 bg-gray-100 p-3 rounded-lg">{title}</h2>
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
// //                 {products.map((product) => (
// //                     <ProductCard key={product.id} product={product} />
// //                 ))}
// //             </div>
// //         </section>
// //     );
// // }

// // export default async function ComparePage() {
// //     const { products } = await fetchComparedProducts(1, 1000); // Get more products for filtering

// //     // Sort products by profit percentage
// //     const sortedProducts = [...products].sort((a, b) => b.profitPercentage - a.profitPercentage);

// //     // Get top 20 most profitable products
// //     const top20Products = sortedProducts.slice(0, 20);

// //     // Filter products for different profit ranges (up to 120 total)
// //     const profitRanges = [
// //         { min: 60, products: [] },
// //         { min: 50, products: [] },
// //         { min: 40, products: [] },
// //         { min: 30, products: [] },
// //         { min: 20, products: [] },
// //         { min: 10, products: [] }
// //     ];

// //     let totalInRanges = 0;
// //     const maxProductsInRanges = 120;

// //     sortedProducts.forEach(product => {
// //         if (totalInRanges >= maxProductsInRanges) return;

// //         for (const range of profitRanges) {
// //             if (product.profitPercentage >= range.min &&
// //                 !range.products.some(p => p.id === product.id)) {
// //                 range.products.push(product);
// //                 totalInRanges++;
// //                 break;
// //             }
// //         }
// //     });

// //     // Find top deals (under $15 with 30%+ profit)
// //     const topDeals = sortedProducts.filter(product =>
// //         product.wholesalePrice < 15 &&
// //         product.profitPercentage > 30
// //     ).slice(0, 20); // Limit to top 20 deals

// //     return (
// //         <div className="container mx-auto p-4 space-y-8">
// //             {/* Top 20 Most Profitable Products */}
// //             <section>
// //                 <h1 className="text-2xl font-bold mb-6">Top 20 Most Profitable Products</h1>
// //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
// //                     {top20Products.map((product) => (
// //                         <ProductCard key={product.id} product={product} />
// //                     ))}
// //                 </div>
// //             </section>

// //             {/* Products by Profit Range */}
// //             {profitRanges.map(range => (
// //                 <ProfitSection
// //                     key={range.min}
// //                     title={`Profit ${range.min}%+ (${range.products.length} products)`}
// //                     products={range.products}
// //                 />
// //             ))}

// //             {/* Top Deals Section */}
// //             <section className="bg-gray-50 p-6 rounded-lg mt-8">
// //                 <h2 className="text-xl font-bold mb-4">Top Deals (Under $15 with 30%+ Profit)</h2>
// //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //                     {topDeals.map((product) => (
// //                         <div
// //                             key={product.id}
// //                             className="bg-white p-4 rounded-lg shadow"
// //                         >
// //                             <div className="flex items-center gap-4">
// //                                 <Image
// //                                     src={product.image.sourceUrl}
// //                                     alt={product.image.altText}
// //                                     width={80}
// //                                     height={80}
// //                                     className="rounded-md object-cover"
// //                                 />
// //                                 <div>
// //                                     <h3 className="font-semibold">{product.name}</h3>
// //                                     <p className="text-sm text-gray-600">SKU: {product.sku}</p>
// //                                     <p className="text-green-600 font-medium">
// //                                         Profit: {product.profitPercentage.toFixed(1)}%
// //                                     </p>
// //                                     <Link
// //                                         href={product.wholesaleUrl}
// //                                         target="_blank"
// //                                         className="text-sm text-blue-600 hover:text-blue-800"
// //                                     >
// //                                         Open product
// //                                     </Link>
// //                                 </div>
// //                             </div>
// //                         </div>
// //                     ))}
// //                 </div>
// //             </section>
// //         </div>
// //     );
// // }

// // app/compare/page.tsx
// import { fetchComparedProducts } from '@/lib/woocommerceCatalogCompare';
// import Image from 'next/image';
// import Link from 'next/link';
// import type { ComparedProduct } from '@/lib/woocommerceCatalogCompare';

// export const dynamic = 'force-dynamic';
// export const fetchCache = 'force-no-store';
// export const revalidate = 0;

// function ProductCard({ product }: { product: ComparedProduct }) {
//     return (
//         <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-white">
//             <div className="flex items-start space-x-4">
//                 <div className="flex-shrink-0">
//                     <Image
//                         src={product.image.sourceUrl}
//                         alt={product.image.altText}
//                         width={100}
//                         height={100}
//                         className="rounded-md object-cover"
//                         priority={false}
//                     />
//                 </div>
//                 <div className="flex-1 min-w-0">
//                     <h2 className="text-lg font-semibold mb-2 truncate">{product.name}</h2>
//                     <p className="text-sm text-gray-600 mb-1">SKU: {product.sku}</p>
//                     <div className="space-y-1">
//                         <p className="text-sm">
//                             Price: ${product.wholesalePrice.toFixed(2)}
//                             <Link
//                                 href={product.wholesaleUrl}
//                                 target="_blank"
//                                 className="ml-2 text-blue-600 hover:text-blue-800"
//                             >
//                                 [Open]
//                             </Link>
//                         </p>
//                         <p className="text-sm font-semibold text-green-600">
//                             Profit: ${product.profit.toFixed(2)} ({product.profitPercentage.toFixed(1)}%)
//                         </p>
//                     </div>
//                     <div className="mt-2">
//                         <span className={`text-sm px-2 py-1 rounded ${product.stockStatus === 'instock'
//                                 ? 'bg-green-100 text-green-800'
//                                 : 'bg-red-100 text-red-800'
//                             }`}>
//                             {product.stockQuantity} in stock
//                         </span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// function ProfitSection({ title, products }: { title: string; products: ComparedProduct[] }) {
//     if (products.length === 0) return null;

//     return (
//         <section className="mt-8">
//             <h2 className="text-xl font-bold mb-4 bg-gray-100 p-3 rounded-lg">{title}</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//                 {products.map((product) => (
//                     <ProductCard key={product.id} product={product} />
//                 ))}
//             </div>
//         </section>
//     );
// }

// export default async function ComparePage() {
//     const { products } = await fetchComparedProducts(1, 1000); // Get more products for filtering

//     // Sort products by profit percentage
//     const sortedProducts = [...products].sort((a, b) => b.profitPercentage - a.profitPercentage);

//     // Get top 20 most profitable products
//     const top20Products = sortedProducts.slice(0, 20);

//     // Filter products for different profit ranges (up to 120 total)
//     interface ProfitRange {
//         min: number;
//         products: ComparedProduct[];
//     }

//     const profitRanges: ProfitRange[] = [
//         { min: 60, products: [] },
//         { min: 50, products: [] },
//         { min: 40, products: [] },
//         { min: 30, products: [] },
//         { min: 20, products: [] },
//         { min: 10, products: [] }
//     ];

//     let totalInRanges = 0;
//     const maxProductsInRanges = 120;

//     sortedProducts.forEach(product => {
//         if (totalInRanges >= maxProductsInRanges) return;

//         for (const range of profitRanges) {
//             if (product.profitPercentage >= range.min &&
//                 !range.products.some(p => p.id === product.id)) {
//                 range.products.push(product);
//                 totalInRanges++;
//                 break;
//             }
//         }
//     });

//     // Find top deals (under $15 with 30%+ profit)
//     const topDeals = sortedProducts.filter(product =>
//         product.wholesalePrice < 15 &&
//         product.profitPercentage > 30
//     ).slice(0, 20); // Limit to top 20 deals

//     return (
//         <div className="container mx-auto p-4 space-y-8">
//             {/* Top 20 Most Profitable Products */}
//             <section>
//                 <h1 className="text-2xl font-bold mb-6">Top 20 Most Profitable Products</h1>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//                     {top20Products.map((product) => (
//                         <ProductCard key={product.id} product={product} />
//                     ))}
//                 </div>
//             </section>

//             {/* Products by Profit Range */}
//             {profitRanges.map(range => (
//                 <ProfitSection
//                     key={range.min}
//                     title={`Profit ${range.min}%+ (${range.products.length} products)`}
//                     products={range.products}
//                 />
//             ))}

//             {/* Top Deals Section */}
//             <section className="bg-gray-50 p-6 rounded-lg mt-8">
//                 <h2 className="text-xl font-bold mb-4">Top Deals (Under $15 with 30%+ Profit)</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {topDeals.map((product) => (
//                         <div
//                             key={product.id}
//                             className="bg-white p-4 rounded-lg shadow"
//                         >
//                             <div className="flex items-center gap-4">
//                                 <Image
//                                     src={product.image.sourceUrl}
//                                     alt={product.image.altText}
//                                     width={80}
//                                     height={80}
//                                     className="rounded-md object-cover"
//                                 />
//                                 <div>
//                                     <h3 className="font-semibold">{product.name}</h3>
//                                     <p className="text-sm text-gray-600">SKU: {product.sku}</p>
//                                     <p className="text-green-600 font-medium">
//                                         Profit: {product.profitPercentage.toFixed(1)}%
//                                     </p>
//                                     <Link
//                                         href={product.wholesaleUrl}
//                                         target="_blank"
//                                         className="text-sm text-blue-600 hover:text-blue-800"
//                                     >
//                                         Open product
//                                     </Link>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </section>
//         </div>
//     );
// }