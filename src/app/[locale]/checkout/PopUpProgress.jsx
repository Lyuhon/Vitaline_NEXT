// // \src\app\checkout\PopUpProgress.jsx

// import React, { useState, useEffect } from 'react';

// const CheckoutPopup = ({ isVisible, status, onClose }) => {
//     const [isClosing, setIsClosing] = useState(false);
//     const [shouldRender, setShouldRender] = useState(isVisible);
//     const [zIndex, setZIndex] = useState(50);

//     useEffect(() => {
//         if (isVisible) {
//             setShouldRender(true);
//             setIsClosing(false);
//             setZIndex(50);
//         } else if (!isClosing) {
//             setIsClosing(true);
//             // Сначала меняем z-index
//             setZIndex(-1);
//             // Ждем окончания анимации перед полным удалением компонента
//             const timer = setTimeout(() => {
//                 setShouldRender(false);
//             }, 300); // 300ms - длительность анимации
//             return () => clearTimeout(timer);
//         }
//     }, [isVisible]);

//     if (!shouldRender) return null;

//     const handleClose = () => {
//         setIsClosing(true);
//         // Меняем z-index после завершения анимации
//         setTimeout(() => {
//             setZIndex(-1);
//             onClose();
//         }, 300);
//     };

//     return (
//         <div className={`fixed inset-0 flex items-center justify-center ${isClosing ? 'fadeOut' : 'fadeIn'}`}
//             style={{ zIndex: zIndex }}>
//             <div className={`bg-black bg-opacity-50 fixed inset-0 ${isClosing ? 'fadeOut' : 'fadeIn'}`} />
//             <div className={`bg-white p-6 rounded-lg shadow-lg max-w-md w-full m-4 relative ${isClosing ? 'fadeOut' : 'fadeIn'}`}>
//                 <div className="text-center">
//                     {status === 'processing' && (
//                         <div className="content-transition blur-to-clear">
//                             <div className="text-center">
//                                 <div
//                                     style={{ borderBottom: '2px solid #FF7900' }}
//                                     className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-gray-900 mx-auto mb-4"
//                                 />
//                                 <h3 className="text-xl font-semibold mb-2">Оформление заказа</h3>
//                                 <p className="text-gray-900">
//                                     Пожалуйста, оставайтесь на странице и не закрывайте ее.
//                                     <br /><br />
//                                     Ваш заказ в процессе оформления
//                                     <span className="dot-1">.</span>
//                                     <span className="dot-2">.</span>
//                                     <span className="dot-3">.</span>
//                                 </p>
//                             </div>
//                         </div>
//                     )}

//                     {status === 'error' && (
//                         <div className="content-transition blur-to-clear">
//                             <div className="text-red-500 text-5xl mb-4">⚠️</div>
//                             <h3 className="text-xl font-semibold mb-2 text-red-600">Ошибка оформления заказа</h3>
//                             <p className="text-gray-800">Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте еще раз или свяжитесь с нами по телефону. <a style={{ fontWeight: '600', whiteSpace: 'nowrap' }} href="+998 95 099 00 90">+998 95 099 00 90</a></p>
//                             <button
//                                 style={{
//                                     backgroundColor: '#FF7900',
//                                     color: '#FFF',
//                                     fontWeight: '500',
//                                     borderRadius: '10px',
//                                     width: '100%',
//                                     marginTop: '20px'
//                                 }}
//                                 onClick={handleClose}
//                                 className="mt-4 px-4 py-2 rounded hover:opacity-90 transition-colors"
//                             >
//                                 Закрыть
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             </div>
//             <style>{`

//             `}</style>
//         </div>
//     );
// };

// export default CheckoutPopup;




// \src\app\checkout\PopUpProgress.jsx

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

const CheckoutPopup = ({ isVisible, status, onClose }) => {
    const t = useTranslations('checkout');
    const [isClosing, setIsClosing] = useState(false);
    const [shouldRender, setShouldRender] = useState(isVisible);
    const [zIndex, setZIndex] = useState(50);

    useEffect(() => {
        if (isVisible) {
            setShouldRender(true);
            setIsClosing(false);
            setZIndex(50);
        } else if (!isClosing) {
            setIsClosing(true);
            // Сначала меняем z-index
            setZIndex(-1);
            // Ждем окончания анимации перед полным удалением компонента
            const timer = setTimeout(() => {
                setShouldRender(false);
            }, 300); // 300ms - длительность анимации
            return () => clearTimeout(timer);
        }
    }, [isVisible]);

    if (!shouldRender) return null;

    const handleClose = () => {
        setIsClosing(true);
        // Меняем z-index после завершения анимации
        setTimeout(() => {
            setZIndex(-1);
            onClose();
        }, 300);
    };

    return (
        <div className={`fixed inset-0 flex items-center justify-center ${isClosing ? 'fadeOut' : 'fadeIn'}`}
            style={{ zIndex: zIndex }}>
            <div className={`bg-black bg-opacity-50 fixed inset-0 ${isClosing ? 'fadeOut' : 'fadeIn'}`} />
            <div className={`bg-white p-6 rounded-lg shadow-lg max-w-md w-full m-4 relative ${isClosing ? 'fadeOut' : 'fadeIn'}`}>
                <div className="text-center">
                    {status === 'processing' && (
                        <div className="content-transition blur-to-clear">
                            <div className="text-center">
                                <div
                                    style={{ borderBottom: '2px solid #FF7900' }}
                                    className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-gray-900 mx-auto mb-4"
                                />
                                <h3 className="text-xl font-semibold mb-2">{t('processing_title')}</h3>
                                <p className="text-gray-900">
                                    {t.rich('processing_text', { br: () => <br />, dot1: (chunks) => <span className="dot-1">{chunks}</span>, dot2: (chunks) => <span className="dot-2">{chunks}</span>, dot3: (chunks) => <span className="dot-3">{chunks}</span> })}
                                </p>
                            </div>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="content-transition blur-to-clear">
                            <div className="text-red-500 text-5xl mb-4">⚠️</div>
                            <h3 className="text-xl font-semibold mb-2 text-red-600">{t('error_title')}</h3>
                            <p className="text-gray-800">{t.rich('error_text', { a: (chunks) => <a style={{ fontWeight: '600', whiteSpace: 'nowrap' }} href="+998 95 099 00 90">{chunks}</a> })}</p>
                            <button
                                style={{
                                    backgroundColor: '#FF7900',
                                    color: '#FFF',
                                    fontWeight: '500',
                                    borderRadius: '10px',
                                    width: '100%',
                                    marginTop: '20px'
                                }}
                                onClick={handleClose}
                                className="mt-4 px-4 py-2 rounded hover:opacity-90 transition-colors"
                            >
                                {t('close')}
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <style>{`
                
            `}</style>
        </div>
    );
};

export default CheckoutPopup;