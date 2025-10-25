// src/app/[locale]/about/page.tsx
import Image from 'next/image'
import React from 'react';
import './about.css';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'about' });
    return {
        title: t('metadataTitle'),
        description: t('metadataDescription'),
    };
}

const AboutPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'about' });

    return (
        <section className="about_page">
            <div className="abot_vitaline">
                <div className="about_image">
                    <h1 className="mobile_visible">{t('companyTitle')}</h1>
                    <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/image-1.png" alt={t('vitalineImageAlt')} />
                </div>

                <div className="about_descript">
                    <h1 className="pc_visible">{t('companyTitle')}</h1>
                    <p>
                        {t.rich('companyDesc1', { b: (chunks) => <b>{chunks}</b>, br: () => <br /> })}
                    </p>
                    <ul>
                        <li>{t('benefit1')}</li>
                        <li>{t('benefit2')}</li>
                        <li>{t('benefit3')}</li>
                    </ul>
                    <br />
                    {t.rich('companyDesc2', { b: (chunks) => <b>{chunks}</b> })}
                </div>
            </div>

            <div className="key_adv">
                <h2 className="pc_visible">{t('keyFeaturesTitle')}</h2>

                <div className="key_adv_image_text_block">
                    <img className="key_adv_image" src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/image-2.png" alt={t('vitalineImageAlt')} />
                    <h2 className="mobile_visible">{t('keyFeaturesTitle')}</h2>
                    <div className="key_adv_text">
                        <p>
                            {t.rich('keyFeaturesDesc', { b: (chunks) => <b>{chunks}</b>, br: () => <br /> })}
                        </p>
                    </div>
                </div>

                <div className="additional_key_adv" style={{ display: "none" }}>
                    <p>{t.rich('additionalDesc1', { span: (chunks) => <span className="accent_t">{chunks}</span> })}</p>
                    <p>{t('additionalDesc2')}</p>
                </div>
            </div>

            <div className="abot_vitaline_bottom">
                <div className="about_descript_bottom">
                    <p>
                        {t.rich('cooperationDesc', { b: (chunks) => <b>{chunks}</b>, br: () => <br /> })}
                    </p>
                </div>

                <div className="about_image_bottom">
                    <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/image-3.png" alt={t('vitalineImageAlt')} />
                </div>
            </div>
        </section>
    );
};

export default AboutPage;