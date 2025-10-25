// // components/ExpirationDateDisplay.tsx
// 'use client';
// import { useEffect, useState } from 'react';

// interface ExpirationDateDisplayProps {
//     sku: string;
//     productName: string;
//     productImage: string;
// }

// interface ProductApiResponse {
//     result: {
//         data: {
//             results: Array<{
//                 id: string;
//                 name: string;
//                 vendorCode: string;
//                 properties: {
//                     collection?: {
//                         value: string;
//                         captionRu: string;
//                         captionEn: string;
//                     };
//                 };
//                 officeName: string;
//             }>;
//         };
//     };
// }

// export default function ExpirationDateDisplay({ sku, productName, productImage }: ExpirationDateDisplayProps) {
//     const [expirationDate, setExpirationDate] = useState<string | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchExpirationDate = async () => {
//             try {
//                 const token = process.env.NEXT_PUBLIC_BILLZ_TOKEN;
//                 if (!token) {
//                     throw new Error('API token не найден');
//                 }

//                 const res_params = {
//                     PerPage: 10,
//                     Page: 1,
//                     Filter: {
//                         VendorCodes: [sku],
//                     },
//                     Sort: {
//                         type: 'num',
//                         field: 'id',
//                         order: 'desc',
//                     },
//                     timestamp: Date.now(),
//                 };

//                 const response = await fetch('https://api.billz.uz/v2/', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Cache-Control': 'no-cache',
//                         'Authorization': `Bearer ${token}`,
//                     },
//                     body: JSON.stringify({
//                         jsonrpc: '2.0',
//                         id: '1200',
//                         method: 'catalog.get',
//                         params: res_params,
//                     }),
//                 });

//                 const responseData: ProductApiResponse = await response.json();

//                 if (!response.ok || !responseData.result?.data?.results?.length) {
//                     throw new Error('Товар не найден');
//                 }

//                 const results = responseData.result.data.results;
//                 const productWithExpiration = results.find((product: any) =>
//                     product.properties?.collection?.value
//                 );

//                 if (productWithExpiration?.properties?.collection?.value) {
//                     const dateValue = productWithExpiration.properties.collection.value;
//                     const date = new Date(dateValue);

//                     if (!isNaN(date.getTime())) {
//                         const formattedDate = date.toLocaleDateString('ru-RU', {
//                             year: 'numeric',
//                             month: 'long',
//                             day: 'numeric'
//                         });
//                         setExpirationDate(formattedDate);
//                     } else {
//                         throw new Error('Неверный формат даты');
//                     }
//                 } else {
//                     throw new Error('Срок годности не указан');
//                 }
//             } catch (err) {
//                 setError(err instanceof Error ? err.message : 'Ошибка при получении срока годности');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchExpirationDate();
//     }, [sku]);

//     // Не показываем ничего если загрузка, ошибка или нет даты
//     if (loading || error || !expirationDate) {
//         return null;
//     }

//     return (
//         <>
//             <div
//                 className="expiration-tooltip"
//                 style={{
//                     position: 'absolute',
//                     bottom: '15px',
//                     right: '1px',
//                     zIndex: 50,
//                     opacity: 0,
//                     transform: 'translateY(10px) scale(0.9)',
//                     animation: 'tooltipSlideIn 0.3s ease-out 0.5s forwards',
//                 }}
//             >
//                 {/* Основной контент тултипа */}
//                 <div
//                     className="tooltip-content"
//                     style={{
//                         background: '#ffffff',
//                         color: '#333333',
//                         padding: '8px 12px',
//                         borderRadius: '12px',
//                         border: '1px solid #d1d5db',
//                         fontSize: '14px',
//                         fontWeight: '500',
//                         whiteSpace: 'nowrap',
//                         position: 'relative',
//                     }}
//                 >
//                     <div style={{
//                         fontSize: '11px',
//                         color: '#6b7280',
//                         marginBottom: '2px',
//                         textTransform: 'uppercase',
//                         letterSpacing: '0.5px'
//                     }}>
//                         Годен до
//                     </div>
//                     <div style={{
//                         fontSize: '13px',
//                         fontWeight: '500',
//                         color: '#111827'
//                     }}>
//                         {expirationDate}
//                     </div>

//                 </div>
//             </div>

//             <style jsx>{`
//                 @keyframes tooltipSlideIn {
//                     from {
//                         opacity: 0;
//                         transform: translateY(10px) scale(0.9);
//                     }
//                     to {
//                         opacity: 1;
//                         transform: translateY(0) scale(1);
//                     }
//                 }
//             `}</style>
//         </>
//     );
// }








// components/ExpirationDateDisplay.tsx
'use client';
import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

interface ExpirationDateDisplayProps {
    sku: string;
    productName: string;
    productImage: string;
}

interface ProductApiResponse {
    result: {
        data: {
            results: Array<{
                id: string;
                name: string;
                vendorCode: string;
                properties: {
                    collection?: {
                        value: string;
                        captionRu: string;
                        captionEn: string;
                    };
                };
                officeName: string;
            }>;
        };
    };
}

export default function ExpirationDateDisplay({ sku, productName, productImage }: ExpirationDateDisplayProps) {
    const t = useTranslations('product');
    const locale = useLocale();
    const [expirationDate, setExpirationDate] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchExpirationDate = async () => {
            try {
                const token = process.env.NEXT_PUBLIC_BILLZ_TOKEN;
                if (!token) {
                    throw new Error(t('apiTokenNotFound'));
                }

                const res_params = {
                    PerPage: 10,
                    Page: 1,
                    Filter: {
                        VendorCodes: [sku],
                    },
                    Sort: {
                        type: 'num',
                        field: 'id',
                        order: 'desc',
                    },
                    timestamp: Date.now(),
                };

                const response = await fetch('https://api.billz.uz/v2/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-cache',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        jsonrpc: '2.0',
                        id: '1200',
                        method: 'catalog.get',
                        params: res_params,
                    }),
                });

                const responseData: ProductApiResponse = await response.json();

                if (!response.ok || !responseData.result?.data?.results?.length) {
                    throw new Error(t('productNotFound'));
                }

                const results = responseData.result.data.results;
                const productWithExpiration = results.find((product: any) =>
                    product.properties?.collection?.value
                );

                if (productWithExpiration?.properties?.collection?.value) {
                    const dateValue = productWithExpiration.properties.collection.value;
                    const date = new Date(dateValue);

                    if (!isNaN(date.getTime())) {
                        let formattedDate: string;

                        // Для узбекского языка используем простой формат DD.MM.YYYY
                        if (locale === 'uz') {
                            const day = date.getDate().toString().padStart(2, '0');
                            const month = (date.getMonth() + 1).toString().padStart(2, '0');
                            const year = date.getFullYear();
                            formattedDate = `${day}.${month}.${year}`;
                        } else {
                            // Для остальных языков используем стандартное форматирование
                            formattedDate = date.toLocaleDateString(`${locale}-${locale.toUpperCase()}`, {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            });
                        }

                        setExpirationDate(formattedDate);
                    } else {
                        throw new Error(t('invalidDateFormat'));
                    }
                } else {
                    throw new Error(t('expirationNotSpecified'));
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : t('errorFetchingExpiration'));
            } finally {
                setLoading(false);
            }
        };

        fetchExpirationDate();
    }, [sku, t, locale]);

    // Не показываем ничего если загрузка, ошибка или нет даты
    if (loading || error || !expirationDate) {
        return null;
    }

    return (
        <>
            <div
                className="expiration-tooltip"
                style={{
                    position: 'absolute',
                    bottom: '15px',
                    right: '1px',
                    zIndex: 50,
                    opacity: 0,
                    transform: 'translateY(10px) scale(0.9)',
                    animation: 'tooltipSlideIn 0.3s ease-out 0.5s forwards',
                }}
            >
                {/* Основной контент тултипа */}
                <div
                    className="tooltip-content"
                    style={{
                        background: '#ffffff',
                        color: '#333333',
                        padding: '8px 12px',
                        borderRadius: '12px',
                        border: '1px solid #d1d5db',
                        fontSize: '14px',
                        fontWeight: '500',
                        whiteSpace: 'nowrap',
                        position: 'relative',
                    }}
                >
                    <div style={{
                        fontSize: '11px',
                        color: '#6b7280',
                        marginBottom: '2px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}>
                        {t('validUntil')}
                    </div>
                    <div style={{
                        fontSize: '13px',
                        fontWeight: '500',
                        color: '#111827'
                    }}>
                        {expirationDate}
                    </div>

                </div>
            </div>

            <style jsx>{`
                @keyframes tooltipSlideIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px) scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
            `}</style>
        </>
    );
}