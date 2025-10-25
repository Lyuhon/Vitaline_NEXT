// src/app/[locale]/contacts/page.tsx
import React from 'react';
import './contacts.css';
import YandexMap from '@/components/YandexMap';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'contacts' });
    return {
        title: t('metadataTitle'),
        description: t('metadataDescription'),
    };
}

const ContactsPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'contacts' });

    return (
        <div className="contacts_page">
            <div className="contacts_wrap">
                <div className="contact-info">
                    <h1 className="contact_title">{t('contactTitle')}</h1>

                    <div className="store-image mobile_visible">
                        <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/image.png" alt={t('storeAlt')} />
                    </div>

                    <div className='address_block'>
                        <p style={{ marginBottom: '20px' }}>
                            <strong style={{ marginBottom: '10px', display: 'inline-block' }}>{t('addressLabel')}</strong>
                            <br />{t('address')}
                        </p>
                        <p>
                            <strong>{t('landmarkLabel')}</strong> {t('landmark')}
                        </p>
                    </div>

                    <div className='phone_to_connect'>
                        <p><strong>{t('phoneLabel')}</strong></p>
                        <p><a href="tel:+998950990090">+998 95 099 00 90</a></p>
                    </div>

                    <p className="info_italic">
                        {t.rich('workingHours', { br: () => <br /> })}
                    </p>

                    <div className="contacts-social-links">
                        <a href="https://www.instagram.com/vitaline.optom/" className="contacts_insta">
                            <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Socials.svg" alt="" />
                            <span>{t('instagram')}</span>
                        </a>

                        <a href="https://t.me/abdelmansur" className="contacts_telegram">
                            <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Artboard.svg" alt="" />
                            <span>{t('telegram')}</span>
                        </a>
                    </div>
                </div>

                <div className="support-info">
                    <div className="store-image pc_visible">
                        <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/image.png" alt={t('storeAlt')} />
                    </div>

                    <div className="support_bottom_block">
                        <h2>{t('supportTitle')}</h2>

                        <div className="support_bottom_block_inner_wrap">
                            <a href="https://t.me/abdelmansur" className="tg_chat_btn" target="_blank" rel="noopener noreferrer">
                                <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Artboard.svg" alt="" />
                                <span>{t('openChat')}</span>
                            </a>

                            <div className="support-contacts">
                                <p><a href="tel:+998950990090">+998 95 099 00 90</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <YandexMap />
        </div>
    );
};

export default ContactsPage;