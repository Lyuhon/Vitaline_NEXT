// // app/brands/page.tsx
// import Link from 'next/link';
// import Image from 'next/image';
// import './brand_list.css'
// import { fetchAllBrands } from '@/lib/brand/fetchBrandDataComponent';

// // export const dynamic = 'force-static';
// // или выберите нужную стратегию рендера (no-store / force-cache / ISR и т.д.)

// export default async function AllBrandsPage() {
//     // Запрашиваем все бренды
//     const brands = await fetchAllBrands();

//     if (!brands || brands.length === 0) {
//         return (
//             <div style={{ padding: '20px' }}>
//                 <h2>Бренды не найдены</h2>
//             </div>
//         );
//     }

//     return (
//         <section className='page_brand_list'>
//             {/* Баннер */}
//             <div className="brand_banner" style={{ position: 'relative', width: '100%', height: '350px', marginBottom: '40px' }}>
//                 <Image
//                     src="https://nuxt.vitaline.uz/wp-content/next_images/vitaline_trade_good_prices.webp" // Замените на путь к вашему баннеру
//                     alt="Баннер брендов"
//                     layout="fill"
//                     objectFit="cover"
//                     priority
//                 />
//             </div>

//             <div className='page_brand_list_info'>
//                 <h1 >Vitaline Trade</h1>
//                 <p>
//                     Ваш надежный партнер в сфере оптовой торговли.
//                 </p>
//                 <p>
//                     Мы предлагаем широкий ассортимент качественных товаров по выгодным ценам напрямую от дистрибьюторов. У нас вы найдете всё необходимое для успешного и здорового бизнеса.
//                 </p>
//                 <ul>
//                     <li>Прямые поставки от проверенных производителей.</li>
//                     <li>Гарантия конкурентных цен.</li>
//                     <li>Индивидуальный подход к каждому клиенту.</li>
//                 </ul>
//                 <p>
//                     Сделайте правильный выбор с <span>Vitaline Trade</span> — покупайте с выгодой и уверенностью!
//                 </p>
//             </div>

//             {/* Сетка брендов */}
//             <div className='grid_brands_page_comp'
//                 style={{
//                     display: 'grid',
//                     gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
//                     gap: '12px',
//                     marginTop: '40px',
//                 }}
//             >
//                 {brands.map((brand: any) => (
//                     <div
//                         key={brand.id}
//                         style={{
//                             border: '1px solid #ddd',
//                             padding: '15px',
//                             borderRadius: '10px',
//                             textAlign: 'center',
//                             transition: 'transform 0.3s, box-shadow 0.3s',
//                         }}
//                         className="brand-card"

//                     >
//                         <Link href={`/product-brands/${brand.slug}`}>
//                             <Image
//                                 src={brand.brandThumbnail || '/images/default-thumbnail.jpg'}
//                                 alt={brand.name}
//                                 width={200} // Ширина изображения
//                                 height={200} // Высота изображения
//                                 objectFit="cover" // Сохранение пропорций
//                                 style={{ borderRadius: '10px' }}
//                             />
//                         </Link>
//                     </div>
//                 ))}
//             </div>

//         </section>
//     );
// }

// app/brands/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import './brand_list.css';
import { fetchAllBrands } from '@/lib/brand/fetchBrandDataComponent';

// export const dynamic = 'force-static';
// или выберите нужную стратегию рендера (no-store / force-cache / ISR и т.д.)

export default async function AllBrandsPage() {
    // Запрашиваем все бренды
    const brands = await fetchAllBrands();

    if (!brands || brands.length === 0) {
        return (
            <div style={{ padding: '20px' }}>
                <h2>Бренды не найдены</h2>
            </div>
        );
    }

    // Фильтруем бренды, исключая "Vitaline"
    const filteredBrands = brands.filter((brand: any) => brand.slug !== 'vitaline');

    return (
        <section className='page_brand_list'>
            {/* Баннер */}
            <div className="brand_banner" style={{ position: 'relative', width: '100%', height: '350px', marginBottom: '40px' }}>
                <Image
                    src="https://nuxt.vitaline.uz/wp-content/next_images/vitaline_trade_good_prices.webp" // Замените на путь к вашему баннеру
                    alt="Баннер брендов"
                    layout="fill"
                    objectFit="cover"
                    priority
                />
            </div>

            <div className='page_brand_list_info'>
                <h1>Vitaline Trade</h1>
                <p>
                    Ваш надежный партнер в сфере оптовой торговли.
                </p>
                <p>
                    Мы предлагаем широкий ассортимент качественных товаров по выгодным ценам напрямую от дистрибьюторов. У нас вы найдете всё необходимое для успешного и здорового бизнеса.
                </p>
                <ul>
                    <li>Прямые поставки от проверенных производителей.</li>
                    <li>Гарантия конкурентных цен.</li>
                    <li>Индивидуальный подход к каждому клиенту.</li>
                </ul>
                <p>
                    Сделайте правильный выбор с <span>Vitaline Trade</span> — покупайте с выгодой и уверенностью!
                </p>
            </div>

            {/* Сетка брендов */}
            <div className='grid_brands_page_comp'
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                    gap: '12px',
                    marginTop: '40px',
                }}
            >
                {filteredBrands.map((brand: any) => (
                    <div
                        key={brand.id}
                        style={{
                            border: '1px solid #ddd',
                            padding: '15px',
                            borderRadius: '10px',
                            textAlign: 'center',
                            transition: 'transform 0.3s, box-shadow 0.3s',
                        }}
                        className="brand-card"
                    >
                        <Link href={`/product-brands/${brand.slug}`}>
                            <Image
                                src={brand.brandThumbnail || '/images/default-thumbnail.jpg'}
                                alt={brand.name}
                                width={200} // Ширина изображения
                                height={200} // Высота изображения
                                objectFit="cover" // Сохранение пропорций
                                style={{ borderRadius: '10px' }}
                            />
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
}