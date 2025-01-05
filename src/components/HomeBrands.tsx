// HomeBrands.tsx
// app/brands/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { fetchAllBrands } from '@/lib/brand/fetchBrandDataComponent';
import HomeBrandsSliderSwiper from './HomeBrandsSliderSwiper';


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
                <div className="general_heading_block">
                    <h2>Продукция по бренду</h2>
                    <Link className="section_read_more" href="/brand_list">
                        Все бренды
                    </Link>
                </div>
                <div className="orange_heading_divider"></div>
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
                            <Link href={`/product-brands/${brand.slug}`}>
                                <Image
                                    src={brand.brandThumbnail || 'https://nuxt.vitaline.uz/wp-content/uploads/2024/12/8e3bc2dcd6d2b7628adf6e926f325187.png'}
                                    alt={brand.name}
                                    width={110} // Укажите ширину изображения
                                    height={110} // Укажите высоту изображения
                                    objectFit="cover" // Для сохранения пропорций
                                    style={{ width: '100%', maxHeight: '150px' }}
                                />
                                {/* <img
                                    src={brand.brandThumbnail || 'http://localhost:3000/_next/image?url=https%3A%2F%2Fnuxt.vitaline.uz%2Fwp-content%2Fuploads%2F2024%2F12%2F8e3bc2dcd6d2b7628adf6e926f325187.png&w=640&q=75'}
                                    alt={brand.name}
                                    style={{ width: '100%', maxHeight: '150px', objectFit: 'cover' }}
                                /> */}
                                {/* <h3 style={{ marginTop: '10px' }}>{brand.name}</h3> */}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Пример простой сетки */}
            {/* <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                    gap: '20px',
                    marginTop: '20px',
                }}
            >
                {brands.map((brand: any) => (
                    <div
                        key={brand.id}
                        style={{
                            border: '1px solid #ddd',
                            padding: '10px',
                            borderRadius: '4px',
                            textAlign: 'center',
                        }}
                    >
                        <Link href={`/product-brands/${brand.slug}`}>
                            <img
                                src={brand.brandThumbnail || '/images/default-thumbnail.jpg'}
                                alt={brand.name}
                                style={{ width: '100%', maxHeight: '150px', objectFit: 'cover' }}
                            />
                            <h3 style={{ marginTop: '10px' }}>{brand.name}</h3>
                        </Link>
                    </div>
                ))}
            </div> */}

            <HomeBrandsSliderSwiper />

        </section>
    );
}
