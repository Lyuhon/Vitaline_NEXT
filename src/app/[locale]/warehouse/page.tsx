// src/app/[locale]/warehouse/page.tsx
import React from 'react';
import './warehouse.css';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'warehouse' });
    return {
        title: t('metadataTitle'),
        description: t('metadataDescription'),
    };
}

const Warehouse = async ({ params }: { params: Promise<{ locale: string }> }) => {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'warehouse' });

    return (
        <section className="loyalty_program_page">
            <div className="loyalty_hero pc_visible"></div>

            {/* <h1>Склады Vitaline</h1> */}

            <div className="loyalty_hero mobile_visible"></div>

            <div className="div-text_added">

                <div className="hr_added_by_Lyuhon">
                    <h3 className="align_center_h3">{t('whyChooseTitle')}</h3>
                    <p>
                        {t('whyChooseP1')}
                    </p>
                    <p>
                        {t('whyChooseP2')}
                    </p>
                </div>

                <div className="hr_added_by_Lyuhon">
                    <h3 className="align_center_h3">{t('advantagesTitle')}</h3>
                    <p>
                        {t('advantagesP1')}
                    </p>
                    <p>
                        {t('advantagesP2')}
                    </p>
                    <p>
                        {t('advantagesP3')}
                    </p>
                </div>

                <div className="warehouse" id="warehouse">
                    <picture>
                        <source
                            media="(max-width: 768px)"
                            srcSet="https://dev.vitaline.uz/wp-content/uploads/2024/04/wharehouse_mobile-min.jpg"
                        />
                        <img
                            className="pc_img"
                            src="https://dev.vitaline.uz/wp-content/uploads/2024/04/wharehouse-min.jpg"
                            alt={t('warehouseAlt')}
                        />
                    </picture>

                    <div className="wharehouse_description">

                        <h3 className="align_center_h3">{t('ourWarehousesTitle')}</h3>

                        <div className="wharehouse_items_list">
                            <div className="wharehouse_item">
                                <div className="icon">
                                    <img
                                        src="https://dev.vitaline.uz/wp-content/uploads/2024/04/thermometer.png"
                                        alt={t('tempControlAlt')}
                                    />
                                </div>
                                <div className="wharehouse_item_desc">
                                    <h4>{t('tempControlLabel')}</h4>
                                    <p>
                                        {t('tempControlDesc')}
                                    </p>
                                </div>
                            </div>

                            <div className="wharehouse_item">
                                <div className="icon">
                                    <img
                                        src="https://dev.vitaline.uz/wp-content/uploads/2024/04/humidity.png"
                                        alt={t('humidityControlAlt')}
                                    />
                                </div>
                                <div className="wharehouse_item_desc">
                                    <h4>{t('humidityControlLabel')}</h4>
                                    <p>
                                        {t('humidityControlDesc')}
                                    </p>
                                </div>
                            </div>

                            <div className="wharehouse_item">
                                <div className="icon">
                                    <img
                                        src="https://dev.vitaline.uz/wp-content/uploads/2024/04/ventilator.png"
                                        alt={t('ventilationAlt')}
                                    />
                                </div>
                                <div className="wharehouse_item_desc">
                                    <h4>{t('ventilationLabel')}</h4>
                                    <p>
                                        {t('ventilationDesc')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <p>
                    {t('chooseUs')}
                </p>
                <hr className="hr_added_by_Lyuhon" />
            </div>
        </section>
    );
};

export default Warehouse;