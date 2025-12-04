// /check-loyalty/page.jsx
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslations } from 'next-intl';

export default function BillzCheckPage() {
    const t = useTranslations('billzCheck');

    const [phoneNumber, setPhoneNumber] = useState('');
    const [formattedPhone, setFormattedPhone] = useState('+998');
    const [availablePoints, setAvailablePoints] = useState(null);
    const [bonusCard, setBonusCard] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [phoneError, setPhoneError] = useState('');

    // OTP состояния
    const [otpSent, setOtpSent] = useState(false);
    const [otpCode, setOtpCode] = useState('');
    const [otpLoading, setOtpLoading] = useState(false);
    const [otpError, setOtpError] = useState('');
    const [otpVerified, setOtpVerified] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);

    // Таймер для повторной отправки OTP
    useEffect(() => {
        let interval;
        if (resendTimer > 0) {
            interval = setInterval(() => {
                setResendTimer(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [resendTimer]);

    // Функция очистки номера телефона
    const cleanPhoneNumber = (input) => {
        return input.replace(/[\s\-\(\)+]/g, '');
    };

    // Форматирование номера телефона в процессе ввода
    const formatPhoneNumber = (value) => {
        // Удаляем все нечисловые символы
        const cleaned = value.replace(/\D/g, '');

        // Если пусто, возвращаем пустую строку
        if (!cleaned) return '';

        // Убеждаемся, что номер начинается с 998
        const withoutPrefix = cleaned.startsWith('998') ? cleaned.substring(3) : cleaned;

        let formatted = '+998';

        if (withoutPrefix.length > 0) {
            formatted += ' (' + withoutPrefix.substring(0, 2);
        }
        if (withoutPrefix.length > 2) {
            formatted += ') ' + withoutPrefix.substring(2, 5);
        }
        if (withoutPrefix.length > 5) {
            formatted += '-' + withoutPrefix.substring(5, 7);
        }
        if (withoutPrefix.length > 7) {
            formatted += '-' + withoutPrefix.substring(7, 9);
        }

        return formatted;
    };

    // Обработчик изменения номера телефона
    const handlePhoneChange = (e) => {
        const value = e.target.value;
        const formatted = formatPhoneNumber(value);
        setFormattedPhone(formatted);

        // Валидация
        const phoneRegex = /^\+998\s\(\d{2}\)\s\d{3}-\d{2}-\d{2}$/;
        if (formatted && !phoneRegex.test(formatted)) {
            setPhoneError(t('invalidPhoneFormat'));
        } else {
            setPhoneError('');
        }

        // Сбрасываем результаты при изменении номера
        setAvailablePoints(null);
        setBonusCard('');
        setError('');
    };

    // Валидация полного номера
    const isPhoneValid = (formattedPhone) => {
        const cleaned = cleanPhoneNumber(formattedPhone);
        return cleaned.length === 12 && cleaned.startsWith('998');
    };

    // Отправка OTP кода
    const sendOTP = async () => {
        if (!isPhoneValid(formattedPhone)) {
            setOtpError(t('invalidPhoneFormat'));
            return;
        }

        try {
            setOtpLoading(true);
            setOtpError('');

            const cleanPhone = cleanPhoneNumber(formattedPhone);
            // Убеждаемся, что номер начинается с +998
            let phoneWithPlus = cleanPhone;
            if (!phoneWithPlus.startsWith('+')) {
                phoneWithPlus = '+' + phoneWithPlus;
            }
            if (!phoneWithPlus.startsWith('+998')) {
                phoneWithPlus = '+998' + phoneWithPlus.replace(/^(\+)?998?/, '');
            }

            const response = await axios.post('/api/otp/generate', {
                phone: phoneWithPlus
            });

            if (response.data.success) {
                setOtpSent(true);
                setResendTimer(60);
                setOtpError('');
            } else {
                setOtpError(response.data.message || t('otpSendError'));
            }
        } catch (err) {
            setOtpError(t('otpSendErrorRetry'));
            console.error('OTP send error:', err);
        } finally {
            setOtpLoading(false);
        }
    };

    // Верификация OTP кода
    const verifyOTP = async () => {
        if (otpCode.length !== 4) {
            setOtpError(t('enter4DigitCode'));
            return;
        }

        try {
            setOtpLoading(true);
            setOtpError('');

            const cleanPhone = cleanPhoneNumber(formattedPhone);
            const phoneWithPlus = cleanPhone.startsWith('+') ? cleanPhone : `+${cleanPhone}`;

            const response = await axios.post('/api/otp/verify', {
                phone: phoneWithPlus,
                otp: otpCode
            });

            const isSuccessful = response.data.success && (
                response.data.verified === true ||
                response.data.message === 'Verified' ||
                response.data.message === 'OTP verified successfully'
            );

            if (isSuccessful) {
                setOtpVerified(true);
                setOtpError('');
                await fetchLoyaltyPoints();
            } else {
                setOtpError(response.data.message || t('invalidCode'));
            }
        } catch (err) {
            console.error('OTP verify error:', err);
            setOtpError(t('codeVerificationError'));
        } finally {
            setOtpLoading(false);
        }
    };

    // Обработчик изменения OTP кода
    const handleOTPChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').substring(0, 4);
        setOtpCode(value);
    };

    // Сброс формы
    const resetForm = () => {
        setFormattedPhone('');
        setOtpSent(false);
        setOtpCode('');
        setOtpVerified(false);
        setOtpError('');
        setPhoneError('');
        setError('');
        setAvailablePoints(null);
        setBonusCard('');
        setResendTimer(0);
    };

    // Запрос к API через серверную часть
    const fetchLoyaltyPoints = async () => {
        setIsLoading(true);
        setError('');
        setAvailablePoints(null);
        setBonusCard('');

        try {
            const cleanedPhone = cleanPhoneNumber(formattedPhone);
            const phoneWithPlus = cleanedPhone.startsWith('+') ? cleanedPhone : `+${cleanedPhone}`;

            const response = await axios.post('/api/loyalty-check', {
                phoneNumber: phoneWithPlus
            });

            if (response.data.success) {
                setAvailablePoints(response.data.data.points);
                setBonusCard(response.data.data.cardNumber);
            } else {
                // Обрабатываем разные типы ошибок
                if (response.data.message === 'no_loyalty_card') {
                    setError(t('noLoyaltyCard'));
                } else if (response.data.message === 'client_not_found') {
                    setError(t('clientNotFound'));
                } else {
                    setError(t('loadingError'));
                }
            }
        } catch (err) {
            console.error('Error fetching loyalty points:', err);
            setError(t('loadingError'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
                {/* Заголовок */}
                <div className="text-center mb-8">
                    <h1 className="md:text-3xl text-2xl font-[500] text-gray-900 mb-2">
                        {t('pageTitle')}
                    </h1>
                    <p className="text-gray-600 md:text-base text-base">
                        {t('pageDescription')}
                    </p>
                </div>

                {/* Форма */}
                <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8">
                    {!otpVerified ? (
                        <div className="space-y-6">
                            {/* Поле ввода телефона */}
                            <div>
                                <label
                                    htmlFor="phone"
                                    className="block text-sm font-medium text-gray-900 mb-2"
                                >
                                    {t('phoneLabel')}
                                </label>
                                <div className="flex gap-3 md:flex-nowrap flex-wrap">
                                    <input
                                        type="text"
                                        id="phone"
                                        value={formattedPhone}
                                        onChange={handlePhoneChange}
                                        placeholder="+998 (XX) XXX-XX-XX"
                                        className={`flex-1 px-4 py-3 border rounded-lg ring-1 ring-gray-300 focus:ring-orange-500 focus:border-transparent transition duration-200 ${phoneError
                                            ? 'border-red-500 focus:ring-[#FF7900]'
                                            : 'border-gray-300'
                                            }`}
                                        required
                                        disabled={otpSent}
                                    />
                                    {!otpSent && (
                                        <button
                                            type="button"
                                            onClick={sendOTP}
                                            disabled={otpLoading || phoneError || !formattedPhone}
                                            className={`w-[100%] px-6 py-3 rounded-lg font-medium text-white transition duration-200 whitespace-nowrap ${otpLoading || phoneError || !formattedPhone
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-[#FF7900] hover:bg-[#f47401] active:bg-[#f47401]'
                                                }`}
                                        >
                                            {otpLoading ? t('sending') : t('getCode')}
                                        </button>
                                    )}
                                </div>
                                {phoneError && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {phoneError}
                                    </p>
                                )}
                            </div>

                            {/* Поле ввода OTP кода */}
                            {otpSent && (
                                <div>
                                    <label
                                        htmlFor="otp"
                                        className="block text-sm font-medium text-gray-900 mb-2"
                                    >
                                        {t('verificationCode')}
                                    </label>
                                    <p className="text-sm text-gray-600 mb-3">
                                        {t('codeInstructions', { phone: formattedPhone })}
                                    </p>
                                    <div className="flex gap-3">
                                        <input
                                            type="text"
                                            id="otp"
                                            value={otpCode}
                                            onChange={handleOTPChange}
                                            placeholder="0000"
                                            maxLength={4}
                                            className="w-[50%] px-4 py-2 border border-gray-300 rounded-lg text-center tracking-widest ring-1 focus:ring-1 ring-gray-300 focus:border-transparent transition duration-200"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={verifyOTP}
                                            disabled={otpLoading || otpCode.length !== 4}
                                            className={`w-[50%] px-6 py-3 rounded-lg font-medium text-white transition duration-200 whitespace-nowrap ${otpLoading || otpCode.length !== 4
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-[#61b104] hover:bg-[#589a0b] active:bg-[#589a0b]'
                                                }`}
                                        >
                                            {otpLoading ? t('checking') : t('confirm')}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Дополнительные действия для OTP */}
                            {otpSent && (
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                                    {resendTimer > 0 ? (
                                        <p className="text-sm text-gray-600">
                                            {t('resendIn', { seconds: resendTimer })}
                                        </p>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={sendOTP}
                                            disabled={otpLoading}
                                            className="text-sm text-orange-500 hover:text-orange-600 font-medium transition-colors"
                                        >
                                            {t('resendCode')}
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
                                    >
                                        {t('changeNumber')}
                                    </button>
                                </div>
                            )}

                            {/* Сообщение об ошибке OTP */}
                            {otpError && (
                                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <div className="flex">
                                        <svg
                                            className="h-5 w-5 text-red-400"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <p className="ml-3 text-sm text-red-700">{otpError}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        /* Результаты после верификации */
                        <div className="space-y-6">
                            {/* Индикатор загрузки */}
                            {isLoading && (
                                <div className="text-center py-8">
                                    <svg
                                        className="animate-spin h-12 w-12 text-orange-500 mx-auto"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                    <p className="mt-4 text-gray-600">{t('checkingPoints')}</p>
                                </div>
                            )}

                            {/* Сообщение об ошибке */}
                            {error && !isLoading && (
                                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <div className="flex">
                                        <svg
                                            className="h-5 w-5 text-red-400"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <p className="ml-3 text-sm text-red-700">{error}</p>
                                    </div>
                                </div>
                            )}

                            {/* Результаты */}
                            {availablePoints !== null && !error && !isLoading && (
                                <div className="bg-white border border-green-200 rounded-lg">
                                    <div className="text-center">
                                        <div className="mb-4">
                                            <svg
                                                className="mx-auto h-12 w-12 text-green-500"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-[500] text-gray-900 mb-2">
                                            {t('dataFound')}
                                        </h3>
                                        <div className="space-y-3">
                                            <div>
                                                <p className="text-sm text-gray-600">{t('availablePoints')}</p>
                                                <p className="text-2xl font-[500] text-gray-900">
                                                    {(Math.floor(availablePoints / 128) / 100).toFixed(2)} $
                                                </p>
                                            </div>
                                            {bonusCard && (
                                                <div className="pt-3 border-t border-green-200">
                                                    <p className="text-sm text-gray-600">{t('cardNumber')}</p>
                                                    <p className="text-lg font-[400] text-gray-900">
                                                        {bonusCard}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Кнопка проверить другой номер */}
                            {(availablePoints !== null || error) && (
                                <button
                                    onClick={resetForm}
                                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors duration-200"
                                >
                                    {t('checkAnotherNumber')}
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Информация */}
                <div className="mt-6 text-center text-sm text-gray-600">
                    <p>
                        {t('notFoundCard')}{' '}

                        <a href="https://t.me/abdelmansur"
                            className="text-orange-500 hover:text-orange-600 font-medium"
                            target="_blank"
                        >
                            {t('registerLoyalty')}
                        </a>
                    </p>
                </div>
            </div>
        </div >
    );
}






// // //front-logic/page.jsx
// // 'use client';

// // import { useState, useEffect } from 'react';
// // import axios from 'axios';

// // export default function BillzCheckPage() {
// //     const [phoneNumber, setPhoneNumber] = useState('');
// //     const [formattedPhone, setFormattedPhone] = useState('');
// //     const [availablePoints, setAvailablePoints] = useState(null);
// //     const [bonusCard, setBonusCard] = useState('');
// //     const [isLoading, setIsLoading] = useState(false);
// //     const [error, setError] = useState('');
// //     const [phoneError, setPhoneError] = useState('');

// //     // OTP состояния
// //     const [otpSent, setOtpSent] = useState(false);
// //     const [otpCode, setOtpCode] = useState('');
// //     const [otpLoading, setOtpLoading] = useState(false);
// //     const [otpError, setOtpError] = useState('');
// //     const [otpVerified, setOtpVerified] = useState(false);
// //     const [resendTimer, setResendTimer] = useState(0);

// //     // Таймер для повторной отправки OTP
// //     useEffect(() => {
// //         let interval;
// //         if (resendTimer > 0) {
// //             interval = setInterval(() => {
// //                 setResendTimer(prev => prev - 1);
// //             }, 1000);
// //         }
// //         return () => clearInterval(interval);
// //     }, [resendTimer]);

// //     // Функция очистки номера телефона
// //     const cleanPhoneNumber = (input) => {
// //         return input.replace(/[\s\-\(\)+]/g, '');
// //     };

// //     // Форматирование номера телефона в процессе ввода
// //     const formatPhoneNumber = (value) => {
// //         const cleaned = value.replace(/\D/g, '');

// //         if (!cleaned) return '';

// //         let formatted = '+998';

// //         if (cleaned.length > 3) {
// //             formatted += ' (' + cleaned.substring(3, 5);
// //         }
// //         if (cleaned.length > 5) {
// //             formatted += ') ' + cleaned.substring(5, 8);
// //         }
// //         if (cleaned.length > 8) {
// //             formatted += '-' + cleaned.substring(8, 10);
// //         }
// //         if (cleaned.length > 10) {
// //             formatted += '-' + cleaned.substring(10, 12);
// //         }

// //         return formatted;
// //     };

// //     // Обработчик изменения номера телефона
// //     const handlePhoneChange = (e) => {
// //         const value = e.target.value;
// //         const formatted = formatPhoneNumber(value);
// //         setFormattedPhone(formatted);

// //         // Валидация
// //         const phoneRegex = /^\+998\s\(\d{2}\)\s\d{3}-\d{2}-\d{2}$/;
// //         if (formatted && !phoneRegex.test(formatted)) {
// //             setPhoneError('Неверный формат номера');
// //         } else {
// //             setPhoneError('');
// //         }

// //         // Сбрасываем результаты при изменении номера
// //         setAvailablePoints(null);
// //         setBonusCard('');
// //         setError('');
// //     };

// //     // Валидация полного номера
// //     const isPhoneValid = (formattedPhone) => {
// //         const cleaned = cleanPhoneNumber(formattedPhone);
// //         return cleaned.length === 12 && cleaned.startsWith('998');
// //     };

// //     // Отправка OTP кода
// //     const sendOTP = async () => {
// //         if (!isPhoneValid(formattedPhone)) {
// //             setOtpError('Неверный формат номера');
// //             return;
// //         }

// //         try {
// //             setOtpLoading(true);
// //             setOtpError('');

// //             const cleanPhone = cleanPhoneNumber(formattedPhone);
// //             const phoneWithPlus = cleanPhone.startsWith('+') ? cleanPhone : `+${cleanPhone}`;

// //             const response = await axios.post('/api/otp/generate', {
// //                 phone: phoneWithPlus
// //             });

// //             if (response.data.success) {
// //                 setOtpSent(true);
// //                 setResendTimer(60); // 60 секунд до повторной отправки
// //                 setOtpError('');
// //             } else {
// //                 setOtpError(response.data.message || 'Ошибка при отправке кода');
// //             }
// //         } catch (err) {
// //             setOtpError('Не удалось отправить код. Попробуйте позже.');
// //             console.error('OTP send error:', err);
// //         } finally {
// //             setOtpLoading(false);
// //         }
// //     };

// //     // Верификация OTP кода
// //     const verifyOTP = async () => {
// //         if (otpCode.length !== 4) {
// //             setOtpError('Введите 4-значный код');
// //             return;
// //         }

// //         try {
// //             setOtpLoading(true);
// //             setOtpError('');

// //             const cleanPhone = cleanPhoneNumber(formattedPhone);
// //             const phoneWithPlus = cleanPhone.startsWith('+') ? cleanPhone : `+${cleanPhone}`;

// //             const response = await axios.post('/api/otp/verify', {
// //                 phone: phoneWithPlus,
// //                 otp: otpCode
// //             });

// //             console.log('OTP Verify Response:', response.data);

// //             // Проверяем разные варианты успешного ответа
// //             const isSuccessful = response.data.success && (
// //                 response.data.verified === true ||
// //                 response.data.message === 'Verified' ||
// //                 response.data.message === 'OTP verified successfully'
// //             );

// //             if (isSuccessful) {
// //                 setOtpVerified(true);
// //                 setOtpError('');
// //                 console.log('OTP verified successfully, fetching client data...');

// //                 // Загружаем данные клиента
// //                 await fetchLoyaltyPoints();
// //             } else {
// //                 console.log('OTP verification failed:', response.data);
// //                 setOtpError(response.data.message || 'Неверный код');
// //             }
// //         } catch (err) {
// //             console.error('OTP verify error:', err);
// //             setOtpError('Ошибка при проверке кода');
// //         } finally {
// //             setOtpLoading(false);
// //         }
// //     };

// //     // Обработчик изменения OTP кода
// //     const handleOTPChange = (e) => {
// //         const value = e.target.value.replace(/\D/g, '').substring(0, 4);
// //         setOtpCode(value);
// //     };

// //     // Сброс формы
// //     const resetForm = () => {
// //         setFormattedPhone('');
// //         setOtpSent(false);
// //         setOtpCode('');
// //         setOtpVerified(false);
// //         setOtpError('');
// //         setPhoneError('');
// //         setError('');
// //         setAvailablePoints(null);
// //         setBonusCard('');
// //         setResendTimer(0);
// //     };

// //     // Запрос к API Billz
// //     const fetchLoyaltyPoints = async () => {
// //         setIsLoading(true);
// //         setError('');
// //         setAvailablePoints(null);
// //         setBonusCard('');

// //         try {
// //             const apiKey = process.env.BILLZ_LOYALTY_API ||
// //                 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC93b28uYmlsbHoudXpcL2JpbGx6IiwiaWF0IjoxNTM5ODQ2MjIxLCJleHAiOjI1MjYzNzA0MzEsInN1YiI6InZpdGFsaW5lLnZpdGFsaW5ldXoifQ.fGGbJRrKsKT4AezeD2fB6sC9cKNL9Sxn33TNGiUExKQ';

// //             const cleanedPhone = cleanPhoneNumber(formattedPhone);
// //             const phoneWithPlus = cleanedPhone.startsWith('+') ? cleanedPhone : `+${cleanedPhone}`;

// //             const requestData = {
// //                 jsonrpc: '2.0',
// //                 method: 'client.search',
// //                 params: {
// //                     phoneNumber: phoneWithPlus,
// //                 },
// //                 id: '1'
// //             };

// //             const response = await axios.post(
// //                 'https://api.billz.uz/v1/',
// //                 requestData,
// //                 {
// //                     headers: {
// //                         'Authorization': `Bearer ${apiKey}`,
// //                         'Content-Type': 'application/json',
// //                         'Accept': 'application/json'
// //                     }
// //                 }
// //             );

// //             if (response.data.result &&
// //                 response.data.result.clients &&
// //                 response.data.result.clients.length > 0) {

// //                 const client = response.data.result.clients[0].client;

// //                 if (client.balance && client.balance.Valid) {
// //                     const pointsValue = client.balance.Float64;
// //                     setAvailablePoints(pointsValue);

// //                     if (client.cardNumbers && client.cardNumbers.trim() !== '') {
// //                         setBonusCard(client.cardNumbers);
// //                     } else {
// //                         setBonusCard(cleanedPhone);
// //                     }
// //                 } else {
// //                     setError('У данного номера нет накопительной карты');
// //                 }
// //             } else {
// //                 setError('Клиент с таким номером телефона не найден');
// //             }
// //         } catch (err) {
// //             console.error('Ошибка при получении баллов:', err);
// //             setError('Ошибка при загрузке данных. Попробуйте позже.');
// //         } finally {
// //             setIsLoading(false);
// //         }
// //     };

// //     return (
// //         <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
// //             <div className="max-w-md mx-auto">
// //                 {/* Заголовок */}
// //                 <div className="text-center mb-8">
// //                     <h1 className="md:text-3xl text-2xl font-[500] text-gray-900 mb-2">
// //                         Проверка бонусного счета
// //                     </h1>
// //                     <p className="text-gray-600 md:text-base text-base">
// //                         Введите номер телефона для проверки доступных баллов
// //                     </p>
// //                 </div>

// //                 {/* Форма */}
// //                 <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8">
// //                     {/* Если OTP не верифицирован, показываем форму авторизации */}
// //                     {!otpVerified ? (
// //                         <div className="space-y-6">
// //                             {/* Поле ввода телефона */}
// //                             <div>
// //                                 <label
// //                                     htmlFor="phone"
// //                                     className="block text-sm font-medium text-gray-900 mb-2"
// //                                 >
// //                                     Номер телефона
// //                                 </label>
// //                                 <div className="flex gap-3 md:flex-nowrap flex-wrap">
// //                                     <input
// //                                         type="text"
// //                                         id="phone"
// //                                         value={formattedPhone}
// //                                         onChange={handlePhoneChange}
// //                                         placeholder="+998 (XX) XXX-XX-XX"
// //                                         className={`flex-1 px-4 py-3 border rounded-lg ring-1 ring-gray-300 focus:ring-orange-500 focus:border-transparent transition duration-200 ${phoneError
// //                                             ? 'border-red-500 focus:ring-[#FF7900]'
// //                                             : 'border-gray-300'
// //                                             }`}
// //                                         required
// //                                         disabled={otpSent}
// //                                     />
// //                                     {!otpSent && (
// //                                         <button
// //                                             type="button"
// //                                             onClick={sendOTP}
// //                                             disabled={otpLoading || phoneError || !formattedPhone}
// //                                             className={`w-[100%] px-6 py-3 rounded-lg font-medium text-white transition duration-200 whitespace-nowrap ${otpLoading || phoneError || !formattedPhone
// //                                                 ? 'bg-gray-400 cursor-not-allowed'
// //                                                 : 'bg-[#FF7900] hover:bg-[#f47401] active:bg-[#f47401]'
// //                                                 }`}
// //                                         >
// //                                             {otpLoading ? 'Отправка...' : 'Получить код'}
// //                                         </button>
// //                                     )}
// //                                 </div>
// //                                 {phoneError && (
// //                                     <p className="mt-2 text-sm text-red-600">
// //                                         {phoneError}
// //                                     </p>
// //                                 )}
// //                             </div>

// //                             {/* Поле ввода OTP кода - показывается только после отправки */}
// //                             {otpSent && (
// //                                 <div>
// //                                     <label
// //                                         htmlFor="otp"
// //                                         className="block text-sm font-medium text-gray-900 mb-2"
// //                                     >
// //                                         Код подтверждения
// //                                     </label>
// //                                     <p className="text-sm text-gray-600 mb-3">
// //                                         Введите 4-значный код, отправленный на номер {formattedPhone}
// //                                     </p>
// //                                     <div className="flex gap-3">
// //                                         <input
// //                                             type="text"
// //                                             id="otp"
// //                                             value={otpCode}
// //                                             onChange={handleOTPChange}
// //                                             placeholder="0000"
// //                                             maxLength={4}
// //                                             className="w-[50%] px-4 py-2 border border-gray-300 rounded-lg text-center tracking-widest ring-1 focus:ring-1 ring-gray-300 focus:border-transparent transition duration-200"
// //                                             required
// //                                         />
// //                                         <button
// //                                             type="button"
// //                                             onClick={verifyOTP}
// //                                             disabled={otpLoading || otpCode.length !== 4}
// //                                             className={`w-[50%] px-6 py-3 rounded-lg font-medium text-white transition duration-200 whitespace-nowrap ${otpLoading || otpCode.length !== 4
// //                                                 ? 'bg-gray-400 cursor-not-allowed'
// //                                                 : 'bg-[#61b104] hover:bg-[#589a0b] active:bg-[#589a0b]'
// //                                                 }`}
// //                                         >
// //                                             {otpLoading ? 'Проверка...' : 'Подтвердить'}
// //                                         </button>
// //                                     </div>
// //                                 </div>
// //                             )}

// //                             {/* Дополнительные действия для OTP */}
// //                             {otpSent && (
// //                                 <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
// //                                     {resendTimer > 0 ? (
// //                                         <p className="text-sm text-gray-600">
// //                                             Повторная отправка через {resendTimer} сек.
// //                                         </p>
// //                                     ) : (
// //                                         <button
// //                                             type="button"
// //                                             onClick={sendOTP}
// //                                             disabled={otpLoading}
// //                                             className="text-sm text-orange-500 hover:text-orange-600 font-medium transition-colors"
// //                                         >
// //                                             Отправить код повторно
// //                                         </button>
// //                                     )}
// //                                     <button
// //                                         type="button"
// //                                         onClick={resetForm}
// //                                         className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
// //                                     >
// //                                         Изменить номер
// //                                     </button>
// //                                 </div>
// //                             )}

// //                             {/* Сообщение об ошибке OTP */}
// //                             {otpError && (
// //                                 <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
// //                                     <div className="flex">
// //                                         <svg
// //                                             className="h-5 w-5 text-red-400"
// //                                             xmlns="http://www.w3.org/2000/svg"
// //                                             viewBox="0 0 20 20"
// //                                             fill="currentColor"
// //                                         >
// //                                             <path
// //                                                 fillRule="evenodd"
// //                                                 d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
// //                                                 clipRule="evenodd"
// //                                             />
// //                                         </svg>
// //                                         <p className="ml-3 text-sm text-red-700">{otpError}</p>
// //                                     </div>
// //                                 </div>
// //                             )}
// //                         </div>
// //                     ) : (
// //                         /* Если OTP верифицирован, показываем результаты */
// //                         <div className="space-y-6">
// //                             {/* Индикатор загрузки */}
// //                             {isLoading && (
// //                                 <div className="text-center py-8">
// //                                     <svg
// //                                         className="animate-spin h-12 w-12 text-orange-500 mx-auto"
// //                                         xmlns="http://www.w3.org/2000/svg"
// //                                         fill="none"
// //                                         viewBox="0 0 24 24"
// //                                     >
// //                                         <circle
// //                                             className="opacity-25"
// //                                             cx="12"
// //                                             cy="12"
// //                                             r="10"
// //                                             stroke="currentColor"
// //                                             strokeWidth="4"
// //                                         />
// //                                         <path
// //                                             className="opacity-75"
// //                                             fill="currentColor"
// //                                             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
// //                                         />
// //                                     </svg>
// //                                     <p className="mt-4 text-gray-600">Проверяем баллы...</p>
// //                                 </div>
// //                             )}

// //                             {/* Сообщение об ошибке */}
// //                             {error && !isLoading && (
// //                                 <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
// //                                     <div className="flex">
// //                                         <svg
// //                                             className="h-5 w-5 text-red-400"
// //                                             xmlns="http://www.w3.org/2000/svg"
// //                                             viewBox="0 0 20 20"
// //                                             fill="currentColor"
// //                                         >
// //                                             <path
// //                                                 fillRule="evenodd"
// //                                                 d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
// //                                                 clipRule="evenodd"
// //                                             />
// //                                         </svg>
// //                                         <p className="ml-3 text-sm text-red-700">{error}</p>
// //                                     </div>
// //                                 </div>
// //                             )}

// //                             {/* Результаты */}
// //                             {availablePoints !== null && !error && !isLoading && (
// //                                 <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg">
// //                                     <div className="text-center">
// //                                         <div className="mb-4">
// //                                             <svg
// //                                                 className="mx-auto h-12 w-12 text-green-500"
// //                                                 fill="none"
// //                                                 stroke="currentColor"
// //                                                 viewBox="0 0 24 24"
// //                                             >
// //                                                 <path
// //                                                     strokeLinecap="round"
// //                                                     strokeLinejoin="round"
// //                                                     strokeWidth="2"
// //                                                     d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
// //                                                 />
// //                                             </svg>
// //                                         </div>
// //                                         <h3 className="text-lg font-semibold text-gray-900 mb-2">
// //                                             Данные найдены
// //                                         </h3>
// //                                         <div className="space-y-3">
// //                                             <div>
// //                                                 <p className="text-sm text-gray-600">Доступно баллов:</p>
// //                                                 <p className="text-3xl font-bold text-green-600">
// //                                                     {(Math.floor(availablePoints / 128) / 100).toFixed(2)} $
// //                                                 </p>
// //                                                 <p className="text-xs text-gray-500 mt-1">
// //                                                     ({availablePoints.toLocaleString('ru-RU')} UZS)
// //                                                 </p>
// //                                             </div>
// //                                             {bonusCard && (
// //                                                 <div className="pt-3 border-t border-green-200">
// //                                                     <p className="text-sm text-gray-600">Номер карты:</p>
// //                                                     <p className="text-lg font-medium text-gray-900">
// //                                                         {bonusCard}
// //                                                     </p>
// //                                                 </div>
// //                                             )}
// //                                         </div>
// //                                     </div>
// //                                 </div>
// //                             )}

// //                             {/* Кнопка проверить другой номер */}
// //                             {(availablePoints !== null || error) && (
// //                                 <button
// //                                     onClick={resetForm}
// //                                     className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors duration-200"
// //                                 >
// //                                     Проверить другой номер
// //                                 </button>
// //                             )}
// //                         </div>
// //                     )}
// //                 </div>

// //                 {/* Информация */}
// //                 <div className="mt-6 text-center text-sm text-gray-600">
// //                     <p>
// //                         Не нашли свою карту?{' '}
// //                         <a
// //                             href="https://t.me/abdelmansur"
// //                             className="text-orange-500 hover:text-orange-600 font-medium"
// //                             target='_blank'
// //                         >
// //                             Зарегистрируйтесь в программе лояльности
// //                         </a>
// //                     </p>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }









// //api

// //front-logic/page.jsx
// 'use client';

// import { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function BillzCheckPage() {
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [formattedPhone, setFormattedPhone] = useState('');
//     const [availablePoints, setAvailablePoints] = useState(null);
//     const [bonusCard, setBonusCard] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState('');
//     const [phoneError, setPhoneError] = useState('');

//     // OTP состояния
//     const [otpSent, setOtpSent] = useState(false);
//     const [otpCode, setOtpCode] = useState('');
//     const [otpLoading, setOtpLoading] = useState(false);
//     const [otpError, setOtpError] = useState('');
//     const [otpVerified, setOtpVerified] = useState(false);
//     const [resendTimer, setResendTimer] = useState(0);

//     // Таймер для повторной отправки OTP
//     useEffect(() => {
//         let interval;
//         if (resendTimer > 0) {
//             interval = setInterval(() => {
//                 setResendTimer(prev => prev - 1);
//             }, 1000);
//         }
//         return () => clearInterval(interval);
//     }, [resendTimer]);

//     // Функция очистки номера телефона
//     const cleanPhoneNumber = (input) => {
//         return input.replace(/[\s\-\(\)+]/g, '');
//     };

//     // Форматирование номера телефона в процессе ввода
//     const formatPhoneNumber = (value) => {
//         const cleaned = value.replace(/\D/g, '');

//         if (!cleaned) return '';

//         let formatted = '+998';

//         if (cleaned.length > 3) {
//             formatted += ' (' + cleaned.substring(3, 5);
//         }
//         if (cleaned.length > 5) {
//             formatted += ') ' + cleaned.substring(5, 8);
//         }
//         if (cleaned.length > 8) {
//             formatted += '-' + cleaned.substring(8, 10);
//         }
//         if (cleaned.length > 10) {
//             formatted += '-' + cleaned.substring(10, 12);
//         }

//         return formatted;
//     };

//     // Обработчик изменения номера телефона
//     const handlePhoneChange = (e) => {
//         const value = e.target.value;
//         const formatted = formatPhoneNumber(value);
//         setFormattedPhone(formatted);

//         // Валидация
//         const phoneRegex = /^\+998\s\(\d{2}\)\s\d{3}-\d{2}-\d{2}$/;
//         if (formatted && !phoneRegex.test(formatted)) {
//             setPhoneError('Неверный формат номера');
//         } else {
//             setPhoneError('');
//         }

//         // Сбрасываем результаты при изменении номера
//         setAvailablePoints(null);
//         setBonusCard('');
//         setError('');
//     };

//     // Валидация полного номера
//     const isPhoneValid = (formattedPhone) => {
//         const cleaned = cleanPhoneNumber(formattedPhone);
//         return cleaned.length === 12 && cleaned.startsWith('998');
//     };

//     // Отправка OTP кода
//     const sendOTP = async () => {
//         if (!isPhoneValid(formattedPhone)) {
//             setOtpError('Неверный формат номера');
//             return;
//         }

//         try {
//             setOtpLoading(true);
//             setOtpError('');

//             const cleanPhone = cleanPhoneNumber(formattedPhone);
//             const phoneWithPlus = cleanPhone.startsWith('+') ? cleanPhone : `+${cleanPhone}`;

//             const response = await axios.post('/api/otp/generate', {
//                 phone: phoneWithPlus
//             });

//             if (response.data.success) {
//                 setOtpSent(true);
//                 setResendTimer(60); // 60 секунд до повторной отправки
//                 setOtpError('');
//             } else {
//                 setOtpError(response.data.message || 'Ошибка при отправке кода');
//             }
//         } catch (err) {
//             setOtpError('Не удалось отправить код. Попробуйте позже.');
//             console.error('OTP send error:', err);
//         } finally {
//             setOtpLoading(false);
//         }
//     };

//     // Верификация OTP кода
//     const verifyOTP = async () => {
//         if (otpCode.length !== 4) {
//             setOtpError('Введите 4-значный код');
//             return;
//         }

//         try {
//             setOtpLoading(true);
//             setOtpError('');

//             const cleanPhone = cleanPhoneNumber(formattedPhone);
//             const phoneWithPlus = cleanPhone.startsWith('+') ? cleanPhone : `+${cleanPhone}`;

//             const response = await axios.post('/api/otp/verify', {
//                 phone: phoneWithPlus,
//                 otp: otpCode
//             });

//             console.log('OTP Verify Response:', response.data);

//             // Проверяем разные варианты успешного ответа
//             const isSuccessful = response.data.success && (
//                 response.data.verified === true ||
//                 response.data.message === 'Verified' ||
//                 response.data.message === 'OTP verified successfully'
//             );

//             if (isSuccessful) {
//                 setOtpVerified(true);
//                 setOtpError('');
//                 console.log('OTP verified successfully, fetching client data...');

//                 // Загружаем данные клиента
//                 await fetchLoyaltyPoints();
//             } else {
//                 console.log('OTP verification failed:', response.data);
//                 setOtpError(response.data.message || 'Неверный код');
//             }
//         } catch (err) {
//             console.error('OTP verify error:', err);
//             setOtpError('Ошибка при проверке кода');
//         } finally {
//             setOtpLoading(false);
//         }
//     };

//     // Обработчик изменения OTP кода
//     const handleOTPChange = (e) => {
//         const value = e.target.value.replace(/\D/g, '').substring(0, 4);
//         setOtpCode(value);
//     };

//     // Сброс формы
//     const resetForm = () => {
//         setFormattedPhone('');
//         setOtpSent(false);
//         setOtpCode('');
//         setOtpVerified(false);
//         setOtpError('');
//         setPhoneError('');
//         setError('');
//         setAvailablePoints(null);
//         setBonusCard('');
//         setResendTimer(0);
//     };

//     // Запрос к API через серверный роут
//     const fetchLoyaltyPoints = async () => {
//         setIsLoading(true);
//         setError('');
//         setAvailablePoints(null);
//         setBonusCard('');

//         try {
//             const cleanedPhone = cleanPhoneNumber(formattedPhone);
//             const phoneWithPlus = cleanedPhone.startsWith('+') ? cleanedPhone : `+${cleanedPhone}`;

//             const response = await axios.post('/api/billz', {
//                 phoneNumber: phoneWithPlus
//             });

//             if (response.data.success) {
//                 const { points, cardNumber } = response.data.data;
//                 setAvailablePoints(points);
//                 setBonusCard(cardNumber);
//             } else {
//                 setError(response.data.message || 'Ошибка при загрузке данных');
//             }
//         } catch (err) {
//             console.error('Ошибка при получении баллов:', err);
//             if (err.response && err.response.data && err.response.data.message) {
//                 setError(err.response.data.message);
//             } else {
//                 setError('Ошибка при загрузке данных. Попробуйте позже.');
//             }
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-md mx-auto">
//                 {/* Заголовок */}
//                 <div className="text-center mb-8">
//                     <h1 className="md:text-3xl text-2xl font-[500] text-gray-900 mb-2">
//                         Проверка бонусного счета
//                     </h1>
//                     <p className="text-gray-600 md:text-base text-base">
//                         Введите номер телефона для проверки доступных баллов
//                     </p>
//                 </div>

//                 {/* Форма */}
//                 <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8">
//                     {/* Если OTP не верифицирован, показываем форму авторизации */}
//                     {!otpVerified ? (
//                         <div className="space-y-6">
//                             {/* Поле ввода телефона */}
//                             <div>
//                                 <label
//                                     htmlFor="phone"
//                                     className="block text-sm font-medium text-gray-900 mb-2"
//                                 >
//                                     Номер телефона
//                                 </label>
//                                 <div className="flex gap-3 md:flex-nowrap flex-wrap">
//                                     <input
//                                         type="text"
//                                         id="phone"
//                                         value={formattedPhone}
//                                         onChange={handlePhoneChange}
//                                         placeholder="+998 (XX) XXX-XX-XX"
//                                         className={`flex-1 px-4 py-3 border rounded-lg ring-1 ring-gray-300 focus:ring-orange-500 focus:border-transparent transition duration-200 ${phoneError
//                                             ? 'border-red-500 focus:ring-[#FF7900]'
//                                             : 'border-gray-300'
//                                             }`}
//                                         required
//                                         disabled={otpSent}
//                                     />
//                                     {!otpSent && (
//                                         <button
//                                             type="button"
//                                             onClick={sendOTP}
//                                             disabled={otpLoading || phoneError || !formattedPhone}
//                                             className={`w-[100%] px-6 py-3 rounded-lg font-medium text-white transition duration-200 whitespace-nowrap ${otpLoading || phoneError || !formattedPhone
//                                                 ? 'bg-gray-400 cursor-not-allowed'
//                                                 : 'bg-[#FF7900] hover:bg-[#f47401] active:bg-[#f47401]'
//                                                 }`}
//                                         >
//                                             {otpLoading ? 'Отправка...' : 'Получить код'}
//                                         </button>
//                                     )}
//                                 </div>
//                                 {phoneError && (
//                                     <p className="mt-2 text-sm text-red-600">
//                                         {phoneError}
//                                     </p>
//                                 )}
//                             </div>

//                             {/* Поле ввода OTP кода - показывается только после отправки */}
//                             {otpSent && (
//                                 <div>
//                                     <label
//                                         htmlFor="otp"
//                                         className="block text-sm font-medium text-gray-900 mb-2"
//                                     >
//                                         Код подтверждения
//                                     </label>
//                                     <p className="text-sm text-gray-600 mb-3">
//                                         Введите 4-значный код, отправленный на номер {formattedPhone}
//                                     </p>
//                                     <div className="flex gap-3">
//                                         <input
//                                             type="text"
//                                             id="otp"
//                                             value={otpCode}
//                                             onChange={handleOTPChange}
//                                             placeholder="0000"
//                                             maxLength={4}
//                                             className="w-[50%] px-4 py-2 border border-gray-300 rounded-lg text-center tracking-widest ring-1 focus:ring-1 ring-gray-300 focus:border-transparent transition duration-200"
//                                             required
//                                         />
//                                         <button
//                                             type="button"
//                                             onClick={verifyOTP}
//                                             disabled={otpLoading || otpCode.length !== 4}
//                                             className={`w-[50%] px-6 py-3 rounded-lg font-medium text-white transition duration-200 whitespace-nowrap ${otpLoading || otpCode.length !== 4
//                                                 ? 'bg-gray-400 cursor-not-allowed'
//                                                 : 'bg-[#61b104] hover:bg-[#589a0b] active:bg-[#589a0b]'
//                                                 }`}
//                                         >
//                                             {otpLoading ? 'Проверка...' : 'Подтвердить'}
//                                         </button>
//                                     </div>
//                                 </div>
//                             )}

//                             {/* Дополнительные действия для OTP */}
//                             {otpSent && (
//                                 <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
//                                     {resendTimer > 0 ? (
//                                         <p className="text-sm text-gray-600">
//                                             Повторная отправка через {resendTimer} сек.
//                                         </p>
//                                     ) : (
//                                         <button
//                                             type="button"
//                                             onClick={sendOTP}
//                                             disabled={otpLoading}
//                                             className="text-sm text-orange-500 hover:text-orange-600 font-medium transition-colors"
//                                         >
//                                             Отправить код повторно
//                                         </button>
//                                     )}
//                                     <button
//                                         type="button"
//                                         onClick={resetForm}
//                                         className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
//                                     >
//                                         Изменить номер
//                                     </button>
//                                 </div>
//                             )}

//                             {/* Сообщение об ошибке OTP */}
//                             {otpError && (
//                                 <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
//                                     <div className="flex">
//                                         <svg
//                                             className="h-5 w-5 text-red-400"
//                                             xmlns="http://www.w3.org/2000/svg"
//                                             viewBox="0 0 20 20"
//                                             fill="currentColor"
//                                         >
//                                             <path
//                                                 fillRule="evenodd"
//                                                 d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                                                 clipRule="evenodd"
//                                             />
//                                         </svg>
//                                         <p className="ml-3 text-sm text-red-700">{otpError}</p>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     ) : (
//                         /* Если OTP верифицирован, показываем результаты */
//                         <div className="space-y-6">
//                             {/* Индикатор загрузки */}
//                             {isLoading && (
//                                 <div className="text-center py-8">
//                                     <svg
//                                         className="animate-spin h-12 w-12 text-orange-500 mx-auto"
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         fill="none"
//                                         viewBox="0 0 24 24"
//                                     >
//                                         <circle
//                                             className="opacity-25"
//                                             cx="12"
//                                             cy="12"
//                                             r="10"
//                                             stroke="currentColor"
//                                             strokeWidth="4"
//                                         />
//                                         <path
//                                             className="opacity-75"
//                                             fill="currentColor"
//                                             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                                         />
//                                     </svg>
//                                     <p className="mt-4 text-gray-600">Проверяем баллы...</p>
//                                 </div>
//                             )}

//                             {/* Сообщение об ошибке */}
//                             {error && !isLoading && (
//                                 <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
//                                     <div className="flex">
//                                         <svg
//                                             className="h-5 w-5 text-red-400"
//                                             xmlns="http://www.w3.org/2000/svg"
//                                             viewBox="0 0 20 20"
//                                             fill="currentColor"
//                                         >
//                                             <path
//                                                 fillRule="evenodd"
//                                                 d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                                                 clipRule="evenodd"
//                                             />
//                                         </svg>
//                                         <p className="ml-3 text-sm text-red-700">{error}</p>
//                                     </div>
//                                 </div>
//                             )}

//                             {/* Результаты */}
//                             {availablePoints !== null && !error && !isLoading && (
//                                 <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg">
//                                     <div className="text-center">
//                                         <div className="mb-4">
//                                             <svg
//                                                 className="mx-auto h-12 w-12 text-green-500"
//                                                 fill="none"
//                                                 stroke="currentColor"
//                                                 viewBox="0 0 24 24"
//                                             >
//                                                 <path
//                                                     strokeLinecap="round"
//                                                     strokeLinejoin="round"
//                                                     strokeWidth="2"
//                                                     d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                                                 />
//                                             </svg>
//                                         </div>
//                                         <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                                             Данные найдены
//                                         </h3>
//                                         <div className="space-y-3">
//                                             <div>
//                                                 <p className="text-sm text-gray-600">Доступно баллов:</p>
//                                                 <p className="text-3xl font-bold text-green-600">
//                                                     {(Math.floor(availablePoints / 128) / 100).toFixed(2)} $
//                                                 </p>
//                                                 <p className="text-xs text-gray-500 mt-1">
//                                                     ({availablePoints.toLocaleString('ru-RU')} UZS)
//                                                 </p>
//                                             </div>
//                                             {bonusCard && (
//                                                 <div className="pt-3 border-t border-green-200">
//                                                     <p className="text-sm text-gray-600">Номер карты:</p>
//                                                     <p className="text-lg font-medium text-gray-900">
//                                                         {bonusCard}
//                                                     </p>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}

//                             {/* Кнопка проверить другой номер */}
//                             {(availablePoints !== null || error) && (
//                                 <button
//                                     onClick={resetForm}
//                                     className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors duration-200"
//                                 >
//                                     Проверить другой номер
//                                 </button>
//                             )}
//                         </div>
//                     )}
//                 </div>

//                 {/* Информация */}
//                 <div className="mt-6 text-center text-sm text-gray-600">
//                     <p>
//                         Не нашли свою карту?{' '}
//                         <a
//                             href="https://t.me/abdelmansur"
//                             className="text-orange-500 hover:text-orange-600 font-medium"
//                             target='_blank'
//                         >
//                             Зарегистрируйтесь в программе лояльности
//                         </a>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// }