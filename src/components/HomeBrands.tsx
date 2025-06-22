// // HomeBrands.tsx
// // app/brands/page.tsx
// import Link from 'next/link';
// import Image from 'next/image';
// import { fetchAllBrands } from '@/lib/brand/fetchBrandDataComponent';
// // import HomeBrandsSliderSwiper from './HomeBrandsSliderSwiper';


// export const dynamic = 'force-static';
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
//                 <div className="general_heading_block">
//                     <h2 className='active__'>Продукция по бренду</h2>
//                     <Link className="section_read_more" href="/brand_list">
//                         Все бренды
//                     </Link>
//                 </div>
//                 <div className="orange_heading_divider"></div>
//             </div>

//             <div className="swiper brands_list_slider">
//                 <div className="swiper-wrapper">
//                     {brands.map((brand: any) => (
//                         <Link className="swiper-slide"
//                             key={brand.id}
//                             style={{
//                                 border: '1px solid #ddd',
//                                 padding: '10px',
//                                 borderRadius: '4px',
//                                 textAlign: 'center',
//                             }}
//                             href={`/product-brands/${brand.slug}`}>
//                             <Image
//                                 src={brand.brandThumbnail || 'https://nuxt.vitaline.uz/wp-content/uploads/2024/12/8e3bc2dcd6d2b7628adf6e926f325187.png'}
//                                 alt={brand.name}
//                                 width={110} // Укажите ширину изображения
//                                 height={110} // Укажите высоту изображения
//                                 objectFit="cover" // Для сохранения пропорций
//                                 style={{ width: '100%', maxHeight: '150px', objectFit: 'contain', height: 'auto' }}
//                             />
//                         </Link>
//                     ))}
//                 </div>
//             </div>


//             {/* <HomeBrandsSliderSwiper /> */}

//         </section>
//     );
// }






// app/brands/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { fetchAllBrands } from '@/lib/brand/fetchBrandDataComponent';
// import HomeBrandsSliderSwiper from './HomeBrandsSliderSwiper';


export const dynamic = 'force-static';
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

    return (
        <section className='home_brand_list'>
            <div className="home_categories_section_heading">
                {/* <div className="general_heading_block">
                    <h2 className='active__'>Продукция по бренду</h2>
                    <Link className="section_read_more" href="/brand_list">
                        Все бренды
                    </Link>
                </div>
                <div className="orange_heading_divider"></div> */}

                <div className="general_heading_block">
                    <Link className="section_read_more---- px-[7px] py-[3px] rounded-[5px] bg-[#f67800] text-[#fff] text-[14px]" href="/shop">
                        Все товары
                    </Link>
                    <Link className="section_read_more---- px-[7px] py-[3px] rounded-[5px] bg-[#f67800] text-[#fff] text-[14px]" href="/brand_list">
                        Все бренды
                    </Link>
                </div>
                <div className='mb-[20px]'></div>
            </div>

            <div className="swiper brands_list_slider">
                <div className="swiper-wrapper">
                    {brands.map((brand: any) => (
                        <Link className="swiper-slide"
                            key={brand.id}
                            style={{
                                border: '1px solid #ddd',
                                padding: '10px',
                                borderRadius: '4px',
                                textAlign: 'center',
                            }}
                            href={`/product-brands/${brand.slug}`}>
                            <Image
                                src={brand.brandThumbnail || 'https://nuxt.vitaline.uz/wp-content/uploads/2024/12/8e3bc2dcd6d2b7628adf6e926f325187.png'}
                                alt={brand.name}
                                width={110} // Укажите ширину изображения
                                height={110} // Укажите высоту изображения
                                objectFit="cover" // Для сохранения пропорций
                                style={{ width: '100%', maxHeight: '150px', objectFit: 'contain', height: 'auto' }}
                            />
                        </Link>
                    ))}
                </div>
            </div>


            {/* <HomeBrandsSliderSwiper /> */}

        </section>
    );
}
