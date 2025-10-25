// app/[locale]/brand_list/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import './brand_list.css';
import { fetchAllBrands } from '@/lib/brand/fetchBrandDataComponent';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'brands' });
    return {
        title: t('metadataTitle'),
        description: t('metadataDescription'),
    };
}

export default async function AllBrandsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'brands' });

    // Запрашиваем все бренды
    const brands = await fetchAllBrands();

    if (!brands || brands.length === 0) {
        return (
            <div style={{ padding: '20px' }}>
                <h2>{t('noBrandsFound')}</h2>
            </div>
        );
    }

    // Фильтруем бренды, исключая "Vitaline" и бренды без изображений
    const filteredBrands = brands.filter((brand: any) => brand.slug !== 'vitaline' && brand.brandThumbnail);

    return (
        <section className='page_brand_list'>
            {/* Баннер */}
            <div className="brand_banner" style={{ position: 'relative', width: '100%', height: '350px', marginBottom: '40px' }}>
                <Image
                    src="https://nuxt.vitaline.uz/wp-content/next_images/vitaline_trade_good_prices.webp"
                    alt={t('bannerAlt')}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                />
            </div>

            <div className='page_brand_list_info'>
                <h1>{t('vitalineTrade')}</h1>
                <p>{t('reliablePartner')}</p>
                <p>{t('wideAssortment')}</p>
                <ul>
                    <li>{t('step1')}</li>
                    <li>{t('step2')}</li>
                    <li>{t('step3')}</li>
                </ul>
                <p>
                    {t.rich('makeChoice', { span: (chunks) => <span>{chunks}</span> })}
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
                                width={200}
                                height={200}
                                style={{ objectFit: 'cover', borderRadius: '10px' }}
                            />
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
}