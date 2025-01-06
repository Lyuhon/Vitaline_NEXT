// // src/app/category/[slug]/page.tsx

// import { fetchProductsByCategory } from '@/lib/fetchProductsByCategory';
// import { fetchCategoryName } from '@/lib/fetchCategoryName';
// import { notFound } from 'next/navigation';
// import LoadMoreClient from '@/components/LoadMoreClient';
// import './shop.css';
// import { MiniCartProvider } from '@/app/context/MiniCartContext';

// type ProductNode = {
//     id: string;
//     name: string;
//     slug: string;
//     image?: {
//         sourceUrl?: string;
//         altText?: string;
//     };
//     price?: string;
//     convertedPrice?: string;
//     stockStatus?: string; // Добавлено для управления наличием товара
//     stockQuantity?: number; // Добавлено для максимального количества
//     brands?: {
//         nodes: Brand[];
//     };
// };

// type Brand = {
//     id: string;
//     name: string;
//     slug: string;
//     brandId?: string;
// };

// // Устанавливаем типы для `params`
// interface CategoryPageProps {
//     params: { slug: string };
//     searchParams?: { [key: string]: string | string[] | undefined };
// }

// export const dynamic = 'force-dynamic';

// export const generateMetadata = async ({ params }: CategoryPageProps) => {
//     const { slug } = params;
//     const categoryName = await fetchCategoryName(slug);

//     // if (!categoryName) {
//     //     return {
//     //         title: 'Категория не найдена',
//     //         description: 'Запрашиваемая категория не существует.',
//     //     };
//     // }

//     // return {
//     //     title: `${categoryName} - Vitaline`,
//     //     description: `Категория ${categoryName} - Оптовый каталог товаров Американских витаминов.`,
//     // };
// };


// // Функция для парсинга цены с поддержкой десятичных знаков
// const parsePrice = (price: string): number => {
//     // Заменяем запятые на точки, если используются как десятичные разделители
//     const normalizedPrice = price.replace(',', '.').replace(/[^\d.]/g, '');
//     const num = parseFloat(normalizedPrice);
//     return isNaN(num) ? 0 : num;
// };

// export default async function CategoryPage({ params }: CategoryPageProps) {
//     const { slug } = params;

//     const categoryName = await fetchCategoryName(slug);
//     if (!categoryName) {
//         notFound();
//     }

//     const {
//         nodes: initialProducts,
//         endCursor: initialEndCursor,
//         hasNextPage: initialHasNextPage,
//     } = await fetchProductsByCategory(slug);

//     return (
//         <MiniCartProvider>
//             <div className="shop_page">
//                 <div className="shop_page_wrapper">

//                     {/* Сайдбар с тегами или фильтрами */}
//                     <div className="category_filter_side">
//                         {/* Здесь можно добавить фильтры по тегам или другим параметрам */}
//                     </div>

//                     {/* Список товаров */}
//                     <div className="products_side">
//                         <h1 className="shop_page_title">{categoryName}</h1>

//                         <div className="shop_page_prod_grid">
//                             {/* Передаем начальные товары в клиентский компонент */}
//                             <LoadMoreClient
//                                 initialProducts={initialProducts}
//                                 initialEndCursor={initialEndCursor}
//                                 initialHasNextPage={initialHasNextPage}
//                                 category={slug}
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </MiniCartProvider>
//     );
// }

