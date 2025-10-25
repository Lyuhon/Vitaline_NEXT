// // ShopBrandsSlider.tsx
// import Link from 'next/link';
// import Image from 'next/image';
// import { fetchAllBrands } from '@/lib/brand/fetchBrandDataComponent';
// import HomeBrandsSliderSwiper from './HomeBrandsSliderSwiper';


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
//         <section className='home_brand_list'>
//             <div className="home_categories_section_heading">
//                 <h2>Продукция по бренду</h2>
//                 {/* <div className="orange_heading_divider"></div> */}
//             </div>

//             <div className="swiper brands_list_slider">
//                 <div className="swiper-wrapper">
//                     {brands.map((brand: any) => (
//                         <div className="swiper-slide"
//                             key={brand.id}
//                             style={{
//                                 border: '1px solid #ddd',
//                                 padding: '10px',
//                                 borderRadius: '4px',
//                                 textAlign: 'center',
//                             }}
//                         >
//                             <Link href={`/product-brands/${brand.slug}`}>
//                                 <Image
//                                     src={brand.brandThumbnail || 'https://nuxt.vitaline.uz/wp-content/uploads/2024/12/8e3bc2dcd6d2b7628adf6e926f325187.png'}
//                                     alt={brand.name}
//                                     width={110} // Укажите ширину изображения
//                                     height={110} // Укажите высоту изображения
//                                     objectFit="cover" // Для сохранения пропорций
//                                     style={{ width: '100%', maxHeight: '150px' }}
//                                 />
//                             </Link>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             <HomeBrandsSliderSwiper />

//         </section>
//     );
// }




// ShopBrandsSlider.tsx
import Link from 'next/link';
import Image from 'next/image';
import { fetchAllBrands } from '@/lib/brand/fetchBrandDataComponent';
import HomeBrandsSliderSwiper from './HomeBrandsSliderSwiper';
import { getLocale, getTranslations } from 'next-intl/server';

export default async function AllBrandsPage() {
    // Запрашиваем все бренды
    const brands = await fetchAllBrands();

    const locale = await getLocale();
    const t = await getTranslations('shop');

    if (!brands || brands.length === 0) {
        return (
            <div style={{ padding: '20px' }}>
                <h2>{t('brandsNotFound')}</h2>
            </div>
        );
    }

    return (
        <section className='home_brand_list'>
            <div className="home_categories_section_heading">
                <h2>{t('productsByBrand')}</h2>
                {/* <div className="orange_heading_divider"></div> */}
            </div>

            <div className="swiper brands_list_slider">
                <div className="swiper-wrapper">
                    {brands.map((brand: any) => (
                        <div className="swiper-slide"
                            key={brand.id}
                            style={{
                                border: '1px solid #ddd',
                                padding: '10px',
                                borderRadius: '4px',
                                textAlign: 'center',
                            }}
                        >
                            <Link href={`/${locale}/product-brands/${brand.slug}`}>
                                <Image
                                    src={brand.brandThumbnail || 'https://nuxt.vitaline.uz/wp-content/uploads/2024/12/8e3bc2dcd6d2b7628adf6e926f325187.png'}
                                    alt={brand.name}
                                    width={110} // Укажите ширину изображения
                                    height={110} // Укажите высоту изображения
                                    objectFit="cover" // Для сохранения пропорций
                                    style={{ width: '100%', maxHeight: '150px' }}
                                />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            <HomeBrandsSliderSwiper />

        </section>
    );
}