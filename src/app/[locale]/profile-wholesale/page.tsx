// // my-app\src\app\profile-wholesale\page.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';
// import axios, { AxiosError } from 'axios';
// import './profile.css';
// import '../contacts/contacts.css';
// import AnimatedWrapper from '@/components/animation/AnimatedWrapper';
// import React from 'react';

// // Типизация для nullable полей из Go
// interface NullableString {
//     String: string;
//     Valid: boolean;
// }

// interface NullableFloat64 {
//     Float64: number;
//     Valid: boolean;
// }

// interface NullableInt64 {
//     Int64: number;
//     Valid: boolean;
// }

// // Типизация данных клиента
// interface ClientData {
//     id: number;
//     firstName: string;
//     lastName: string;
//     insDate: string;
//     purchaseNum: string;
//     all_purchase_sum_uzs: string;
//     cardNumbers: string;
//     balance: NullableFloat64;
//     State: string;
//     lastTransactionDate: string;
// }

// interface ClientCard {
//     cardNumber: string;
//     name: string;
// }

// interface ClientBalance {
//     balanceTypeName: string;
//     balanceValue: NullableFloat64;
//     expireDate: string;
// }

// interface Transaction {
//     id: number;
//     saleDate: string;
//     salePriceUZS: NullableFloat64;
//     products: NullableInt64;
// }

// interface TransactionDetail {
//     transactionId: number;
//     name: string;
//     quantity: number;
//     salePriceUZS: NullableFloat64;
//     brand: string;
//     category: string;
//     vendorCode: string;
// }

// interface TransactionPayment {
//     transactionId: number;
//     paymentTypeID: string;
//     amount: number;
// }

// interface BillzApiResponse {
//     id: string;
//     jsonrpc: string;
//     result?: {
//         clients?: Array<{
//             client: ClientData;
//             clientCard: ClientCard[];
//             clientBalance: ClientBalance[];
//             transactions: Transaction[];
//             transactionDetails: TransactionDetail[];
//             transactionPayments: TransactionPayment[];
//         }>;
//     };
//     error?: {
//         code: number;
//         message: string;
//     };
// }

// // Обновленные интерфейсы для OTP API
// interface OTPGenerateResponse {
//     success: boolean;
//     message: string;
//     data?: {
//         otp_id: string;
//     };
// }

// interface OTPVerifyResponse {
//     success: boolean;
//     message: string;
//     verified: boolean; // Теперь это поле всегда будет присутствовать
// }

// export default function ProfilePage() {
//     const [activeSection, setActiveSection] = useState<'profile' | 'orders' | 'favorites' | 'points' | 'support'>('profile');
//     const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
//     const [phone, setPhone] = useState<string>('+998 ');
//     const [clientData, setClientData] = useState<any>(null);
//     const [loading, setLoading] = useState<boolean>(false);
//     const [error, setError] = useState<string>('');
//     const [hasSearched, setHasSearched] = useState<boolean>(false);
//     const [expandedOrders, setExpandedOrders] = useState<Set<number>>(new Set());

//     // OTP состояния
//     const [otpSent, setOtpSent] = useState<boolean>(false);
//     const [otpCode, setOtpCode] = useState<string>('');
//     const [otpLoading, setOtpLoading] = useState<boolean>(false);
//     const [otpError, setOtpError] = useState<string>('');
//     const [otpVerified, setOtpVerified] = useState<boolean>(false);
//     const [resendTimer, setResendTimer] = useState<number>(0);

//     // Для не зарегистрированных пользователей
//     const [showRegistrationModal, setShowRegistrationModal] = useState<boolean>(false);
//     const [modalLanguage, setModalLanguage] = useState<'ru' | 'uz'>('ru');

//     const router = useRouter();

//     //логи
//     const [fullApiResponse, setFullApiResponse] = useState<any>(null);

//     useEffect(() => {
//         document.title = 'Личный кабинет - Vitaline';
//         const metaDescription = document.querySelector('meta[name="description"]');
//         if (metaDescription) {
//             metaDescription.setAttribute('content', 'Профиль | Служба поддержки');
//         } else {
//             const meta = document.createElement('meta');
//             meta.name = 'description';
//             meta.content = 'Профиль | Служба поддержки';
//             document.head.appendChild(meta);
//         }

//         // Загружаем сохраненный номер телефона
//         loadSavedPhone();
//     }, []);

//     // Таймер для повторной отправки OTP
//     useEffect(() => {
//         let interval: NodeJS.Timeout;
//         if (resendTimer > 0) {
//             interval = setInterval(() => {
//                 setResendTimer(prev => prev - 1);
//             }, 1000);
//         }
//         return () => clearInterval(interval);
//     }, [resendTimer]);

//     // Функция для сохранения номера телефона в localStorage
//     const savePhoneToStorage = (phoneNumber: string): void => {
//         try {
//             const expiryDate = new Date();
//             expiryDate.setDate(expiryDate.getDate() + 7); // Сохраняем на неделю

//             const phoneData = {
//                 phone: phoneNumber,
//                 expiry: expiryDate.toISOString()
//             };

//             localStorage.setItem('vitaline_user_phone', JSON.stringify(phoneData));
//         } catch (error) {
//             console.warn('Не удалось сохранить номер телефона:', error);
//         }
//     };

//     // Функция для загрузки номера телефона из localStorage
//     const loadSavedPhone = (): void => {
//         try {
//             const savedData = localStorage.getItem('vitaline_user_phone');
//             if (savedData) {
//                 const phoneData = JSON.parse(savedData);
//                 const expiryDate = new Date(phoneData.expiry);

//                 if (expiryDate > new Date()) {
//                     // Номер еще действителен
//                     setPhone(phoneData.phone);
//                     // Автоматически загружаем данные клиента
//                     fetchClientData(phoneData.phone);
//                 } else {
//                     // Удаляем устаревшие данные
//                     localStorage.removeItem('vitaline_user_phone');
//                 }
//             }
//         } catch (error) {
//             console.warn('Не удалось загрузить сохраненный номер:', error);
//         }
//     };

//     // Функция для очистки номера телефона (удаление всех символов кроме цифр)
//     const cleanPhoneNumber = (input: string): string => {
//         return input.replace(/[^\d]/g, '');
//     };

//     // Функция для форматирования номера телефона
//     const formatPhoneNumber = (input: string): string => {
//         // Получаем только цифры
//         const cleaned = cleanPhoneNumber(input);

//         // Если номер пустой или начинается не с 998, добавляем 998
//         let phoneDigits = cleaned;
//         if (!phoneDigits.startsWith('998')) {
//             phoneDigits = '998' + phoneDigits.replace(/^998/, '');
//         }

//         // Ограничиваем длину до 12 цифр (998 + 9 цифр)
//         phoneDigits = phoneDigits.substring(0, 12);

//         // Форматируем по паттерну +998 00 000-00-00
//         let formatted = '+998';

//         if (phoneDigits.length > 3) {
//             formatted += ' ' + phoneDigits.substring(3, 5);
//         }
//         if (phoneDigits.length > 5) {
//             formatted += ' ' + phoneDigits.substring(5, 8);
//         }
//         if (phoneDigits.length > 8) {
//             formatted += '-' + phoneDigits.substring(8, 10);
//         }
//         if (phoneDigits.length > 10) {
//             formatted += '-' + phoneDigits.substring(10, 12);
//         }

//         return formatted;
//     };

//     // Функция для получения чистого номера для API
//     const getCleanPhoneForApi = (formattedPhone: string): string => {
//         const cleaned = cleanPhoneNumber(formattedPhone);
//         return '+' + cleaned;
//     };

//     // Валидация полного номера
//     const isPhoneValid = (formattedPhone: string): boolean => {
//         const cleaned = cleanPhoneNumber(formattedPhone);
//         return cleaned.length === 12 && cleaned.startsWith('998');
//     };

//     // Отправка OTP кода
//     const sendOTP = async (): Promise<void> => {
//         if (!isPhoneValid(phone)) {
//             setOtpError('Введите корректный номер телефона');
//             return;
//         }

//         try {
//             setOtpLoading(true);
//             setOtpError('');

//             const cleanPhone = getCleanPhoneForApi(phone);

//             const response = await axios.post<OTPGenerateResponse>('/api/otp/generate', {
//                 phone: cleanPhone
//             });

//             if (response.data.success) {
//                 setOtpSent(true);
//                 setResendTimer(60); // 60 секунд до повторной отправки
//                 setOtpError('');
//             } else {
//                 setOtpError(response.data.message || 'Ошибка отправки кода');
//             }
//         } catch (err) {
//             const axiosError = err as AxiosError<{ message?: string }>;
//             setOtpError('Ошибка при отправке OTP. Попробуйте позже.');
//             console.error('OTP send error:', axiosError);
//         } finally {
//             setOtpLoading(false);
//         }
//     };

//     // Верификация OTP кода
//     // Верификация OTP кода
//     const verifyOTP = async (): Promise<void> => {
//         if (otpCode.length !== 4) {
//             setOtpError('Введите 4-значный код');
//             return;
//         }

//         try {
//             setOtpLoading(true);
//             setOtpError('');

//             const cleanPhone = getCleanPhoneForApi(phone);

//             const response = await axios.post<OTPVerifyResponse>('/api/otp/verify', {
//                 phone: cleanPhone,
//                 otp: otpCode
//             });

//             // Добавляем логирование для диагностики
//             console.log('OTP Verify Response:', response.data);

//             // Проверяем разные варианты успешного ответа
//             const isSuccessful = response.data.success && (
//                 response.data.verified === true ||
//                 response.data.message === 'OTP код подтвержден' ||
//                 response.data.message === 'Verified'
//             );

//             if (isSuccessful) {
//                 setOtpVerified(true);
//                 setOtpError('');
//                 console.log('OTP verified successfully, saving phone and fetching client data...');

//                 // Сохраняем номер в localStorage
//                 savePhoneToStorage(phone);

//                 // Загружаем данные клиента
//                 await fetchClientData(phone);
//             } else {
//                 console.log('OTP verification failed:', response.data);
//                 setOtpError(response.data.message || 'Неверный код подтверждения');
//             }
//         } catch (err) {
//             const axiosError = err as AxiosError<{ message?: string }>;
//             console.error('OTP verify error:', axiosError);
//             setOtpError('Ошибка при проверке кода. Попробуйте еще раз.');
//         } finally {
//             setOtpLoading(false);
//         }
//     };

//     const fetchClientData = async (phoneNumber: string): Promise<void> => {
//         try {
//             setLoading(true);
//             setError('');

//             console.log('Fetching client data for phone:', phoneNumber);

//             const apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC93b28uYmlsbHoudXpcL2JpbGx6IiwiaWF0IjoxNTM5ODQ2MjIxLCJleHAiOjI1MjYzNzA0MzEsInN1YiI6InZpdGFsaW5lLnZpdGFsaW5ldXoifQ.fGGbJRrKsKT4AezeD2fB6sC9cKNL9Sxn33TNGiUExKQ';

//             const cleanPhone = getCleanPhoneForApi(phoneNumber);
//             console.log('Clean phone for API:', cleanPhone);

//             const requestData = {
//                 jsonrpc: '2.0',
//                 method: 'client.search',
//                 params: {
//                     phoneNumber: cleanPhone,
//                 },
//                 id: '1'
//             };

//             console.log('Sending request to Billz API:', requestData);

//             const response = await axios.post<BillzApiResponse>(
//                 'https://api.billz.uz/v1/',
//                 requestData,
//                 {
//                     headers: {
//                         'Authorization': `Bearer ${apiKey}`,
//                         'Content-Type': 'application/json',
//                         'Accept': 'application/json'
//                     }
//                 }
//             );

//             console.log('Billz API Response:', response.data);

//             //логи
//             setFullApiResponse(response.data);

//             if (response.data.error) {
//                 console.error('Billz API Error:', response.data.error);

//                 // Проверяем на конкретную ошибку "Client not found"
//                 if (response.data.error.message === 'Client not found') {
//                     setError('Клиент не найден');
//                     setShowRegistrationModal(true); // Показываем попап регистрации
//                 } else {
//                     setError(`Ошибка API: ${response.data.error.message}`);
//                 }
//                 setClientData(null);
//                 return;
//             }

//             if (response.data.result && response.data.result.clients && response.data.result.clients.length > 0) {
//                 console.log('Client found:', response.data.result.clients[0]);
//                 setClientData(response.data.result.clients[0]);
//                 setError('');
//             } else {
//                 console.log('No client found for phone:', cleanPhone);
//                 setError('Клиент не найден');
//                 setShowRegistrationModal(true); // Показываем попап регистрации
//                 setClientData(null);
//             }
//         } catch (err) {
//             const axiosError = err as AxiosError<{ message?: string }>;
//             console.error('fetchClientData error:', axiosError);
//             setError('Ошибка при загрузке данных. Проверьте номер телефона.');
//             setClientData(null);
//         } finally {
//             setLoading(false);
//             setHasSearched(true);
//         }
//     };

//     const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const input = e.target.value;

//         // Не позволяем удалять +998
//         if (input.length < 4 || !input.startsWith('+998')) {
//             return;
//         }

//         const formatted = formatPhoneNumber(input);
//         setPhone(formatted);
//     };

//     const handleOTPSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         verifyOTP();
//     };

//     const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const value = e.target.value.replace(/\D/g, '').substring(0, 4);
//         setOtpCode(value);
//     };

//     const resetAuthFlow = () => {
//         setOtpSent(false);
//         setOtpCode('');
//         setOtpVerified(false);
//         setOtpError('');
//         setResendTimer(0);
//         setPhone('+998 ');
//         setClientData(null);
//         setHasSearched(false);
//         // Удаляем сохраненный номер
//         localStorage.removeItem('vitaline_user_phone');
//     };

//     const formatDate = (dateString: string): string => {
//         const date = new Date(dateString);
//         return date.toLocaleDateString('ru-RU');
//     };

//     // const formatPrice = (price: number): string => {
//     //     return new Intl.NumberFormat('ru-RU').format(price) + ' сум';
//     // };

//     const formatPrice = (price: number): string => {
//         const priceInDollars = price / 12800;
//         return new Intl.NumberFormat('en-US', {
//             minimumFractionDigits: 2,
//             maximumFractionDigits: 2
//         }).format(priceInDollars) + ' $';
//     };

//     const toggleOrderExpansion = (orderId: number): void => {
//         const newExpanded = new Set(expandedOrders);
//         if (newExpanded.has(orderId)) {
//             newExpanded.delete(orderId);
//         } else {
//             newExpanded.add(orderId);
//         }
//         setExpandedOrders(newExpanded);
//     };

//     const renderContent = () => {
//         const fadeInUp = {
//             initial: { opacity: 0, y: 20 },
//             animate: { opacity: 1, y: 0 },
//             exit: { opacity: 0, y: 20 },
//             transition: { duration: 0.5, ease: 'easeOut' },
//         };

//         // Если нет данных, показываем форму аутентификации
//         if (!clientData) {
//             return (
//                 <motion.div {...fadeInUp} key="auth">
//                     <div className="profile-page-content">
//                         <h2>Вход в личный кабинет</h2>
//                         <p>Введите номер телефона для получения кода подтверждения</p>

//                         {/* Поле ввода номера телефона */}
//                         <div className='profile_form'>
//                             <div className="form-group">
//                                 <label className='mt-4'>Номер телефона</label>
//                                 <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
//                                     <input
//                                         type="tel"
//                                         value={phone}
//                                         onChange={handlePhoneChange}
//                                         placeholder="+998 00 000-00-00"
//                                         required
//                                         style={{ flex: 1 }}
//                                         disabled={otpSent}
//                                     />
//                                     {!otpSent && (
//                                         <button
//                                             type="button"
//                                             onClick={sendOTP}
//                                             className="save-button"
//                                             disabled={otpLoading || !isPhoneValid(phone)}
//                                             style={{
//                                                 backgroundColor: '#FF7900',
//                                                 minWidth: '140px',
//                                                 fontSize: '16px',
//                                                 margin: 0
//                                             }}
//                                         >
//                                             {otpLoading ? 'Отправка...' : 'Получить код'}
//                                         </button>
//                                     )}
//                                 </div>
//                             </div>

//                             {/* Поле ввода OTP кода - показывается только после отправки */}
//                             {otpSent && (
//                                 <div className="form-group" style={{ marginTop: '20px' }}>
//                                     <label>Код подтверждения</label>
//                                     <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
//                                         Введите 4-значный код, отправленный на номер {phone}
//                                     </p>
//                                     <form onSubmit={handleOTPSubmit}>
//                                         <div className='flex flex-col md:flex-row' style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
//                                             <input
//                                                 type="text"
//                                                 value={otpCode}
//                                                 onChange={handleOTPChange}
//                                                 placeholder="0000"
//                                                 maxLength={4}
//                                                 required
//                                                 style={{
//                                                     fontSize: '18px',
//                                                     textAlign: 'center',
//                                                     letterSpacing: '0.5em',
//                                                     flex: 1,
//                                                 }}
//                                             />
//                                             <button
//                                                 type="submit"
//                                                 className="save-button min-w-[100%] md:min-w-[140px]"
//                                                 disabled={otpLoading || otpCode.length !== 4}
//                                                 style={{
//                                                     backgroundColor: '#61b104',
//                                                     fontSize: '16px',
//                                                     margin: 0,
//                                                     cursor: 'pointer'
//                                                 }}
//                                             >
//                                                 {otpLoading ? 'Проверка...' : 'Подтвердить'}
//                                             </button>
//                                         </div>
//                                     </form>
//                                 </div>
//                             )}

//                             {/* Дополнительные действия для OTP */}
//                             {otpSent && (
//                                 <div style={{ marginTop: '20px', textAlign: 'center' }} className='flex flex-col md:flex-row justify-start items-center'>
//                                     {resendTimer > 0 ? (
//                                         <p style={{ color: '#666' }}>Повторная отправка через {resendTimer} сек.</p>
//                                     ) : (
//                                         <button
//                                             type="button"
//                                             onClick={sendOTP}
//                                             className="save-button"
//                                             style={{
//                                                 background: '#f4f5f6',
//                                                 color: '#000',
//                                                 border: '1px solid #000',
//                                                 fontSize: '14px',
//                                                 padding: '8px 16px'
//                                             }}
//                                             disabled={otpLoading}
//                                         >
//                                             Отправить код повторно
//                                         </button>
//                                     )}

//                                     <button
//                                         type="button"
//                                         onClick={resetAuthFlow}
//                                         style={{
//                                             background: 'transparent',
//                                             color: '#6c757d',
//                                             border: 'none',
//                                             marginLeft: '10px',
//                                             textDecoration: 'underline',
//                                             fontSize: '14px'
//                                         }}
//                                     >
//                                         Изменить номер
//                                     </button>
//                                 </div>
//                             )}
//                         </div>

//                         {otpError && <p className="error-message mt-4 text-red-600">{otpError}</p>}
//                         {error && <p className="error-message mt-4 text-red-600">{error}</p>}
//                         {loading && <p className='mt-2'>Загрузка профиля...</p>}
//                     </div>
//                 </motion.div>
//             );
//         }

//         switch (activeSection) {
//             case 'profile':
//                 return (
//                     <motion.div {...fadeInUp} key="profile">
//                         <div className="profile-page-content">
//                             <h2>Персональная информация</h2>

//                             {/* //логи */}
//                             {/* {fullApiResponse && (
//                                 <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f5f5f5', border: '1px solid #ddd', borderRadius: '5px' }}>
//                                     <h3>Полный ответ от Billz API:</h3>
//                                     <pre style={{ fontSize: '12px', overflow: 'auto', maxHeight: '300px' }}>
//                                         {JSON.stringify(fullApiResponse, null, 2)}
//                                     </pre>
//                                 </div>
//                             )} */}


//                             <div className='profile_form'>
//                                 <div className="form-group">
//                                     <label>Имя</label>
//                                     {/* <input type="text" value={`${clientData.client.firstName} ${clientData.client.lastName}`} readOnly /> */}
//                                     <input type="text" value={clientData.client.lastName ? `${clientData.client.firstName} ${clientData.client.lastName}` : clientData.client.firstName} readOnly />
//                                 </div>
//                                 <div className="form-group">
//                                     <label>Телефон</label>
//                                     <input type="text" value={phone} readOnly />
//                                 </div>
//                                 {(clientData.clientCard?.[0]?.cardNumber || clientData.client.cardNumbers) && (
//                                     <div className="form-group">
//                                         <label>Номер карты</label>
//                                         <input type="text" value={clientData.clientCard?.[0]?.cardNumber || clientData.client.cardNumbers} readOnly />
//                                     </div>
//                                 )}
//                                 <div className="form-group">
//                                     <label>Дата регистрации</label>
//                                     <input type="text" value={formatDate(clientData.client.insDate)} readOnly />
//                                 </div>
//                                 <div className="form-group">
//                                     <label>Статус</label>
//                                     <input type="text" value={clientData.client.State === '1' ? 'Активен' : 'Неактивен'} readOnly />
//                                 </div>
//                                 <button
//                                     className="save-button"
//                                     onClick={resetAuthFlow}
//                                 >
//                                     Выйти из аккаунта
//                                 </button>
//                             </div>
//                         </div>
//                     </motion.div>
//                 );
//             case 'orders':
//                 return (
//                     <motion.div {...fadeInUp} key="orders">
//                         <div className="profile-page-content">
//                             <h2>Мои заказы</h2>
//                             {clientData.transactions && clientData.transactions.length > 0 ? (
//                                 <>
//                                     {/* Десктопная версия */}
//                                     <div className="orders-desktop">
//                                         <table className="orders-table">
//                                             <thead>
//                                                 <tr>
//                                                     <th>Номер заказа</th>
//                                                     <th>Дата заказа</th>
//                                                     <th>Тип доставки</th>
//                                                     <th>Тип оплаты</th>
//                                                     <th>Стоимость</th>
//                                                     <th>Текущий статус</th>
//                                                     <th>Детали</th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 {clientData.transactions.map((transaction: Transaction) => {
//                                                     const details = clientData.transactionDetails?.filter(
//                                                         (detail: TransactionDetail) => detail.transactionId === transaction.id
//                                                     ) || [];
//                                                     const payment = clientData.transactionPayments?.find(
//                                                         (payment: TransactionPayment) => payment.transactionId === transaction.id
//                                                     );
//                                                     const isExpanded = expandedOrders.has(transaction.id);

//                                                     // return (
//                                                     //     <>
//                                                     //         <tr
//                                                     //             key={transaction.id}
//                                                     //             className="order-row"
//                                                     //             onClick={() => toggleOrderExpansion(transaction.id)}
//                                                     //         >
//                                                     //             <td data-label="Номер заказа">
//                                                     //                 <span className="order-number">№ {transaction.id}</span>
//                                                     //             </td>
//                                                     //             <td>{formatDate(transaction.saleDate)}</td>
//                                                     //             <td>Курьерская доставка</td>
//                                                     //             <td>{payment?.paymentTypeID || 'Наличные'}</td>
//                                                     //             <td><strong>{formatPrice(transaction.salePriceUZS?.Float64 || 0)}</strong></td>
//                                                     //             <td><span className="status completed">Выполнен</span></td>
//                                                     //             <td>
//                                                     //                 <div className={`order-arrow ${isExpanded ? 'expanded' : ''}`}>
//                                                     //                     ▼
//                                                     //                 </div>
//                                                     //             </td>
//                                                     //         </tr>
//                                                     //         {isExpanded && (
//                                                     //             <tr className="order-details-row">
//                                                     //                 <td colSpan={7}>
//                                                     //                     <div className="order-details">
//                                                     //                         <h4>Детали заказа № {transaction.id}</h4>

//                                                     //                         {details.length > 0 ? (
//                                                     //                             <div className="order-products">
//                                                     //                                 {details.map((detail: TransactionDetail, index: number) => (
//                                                     //                                     <div key={index} className="product-item">
//                                                     //                                         <div className="product-info">
//                                                     //                                             <div className="product-main">
//                                                     //                                                 <h5>{detail.name}</h5>
//                                                     //                                                 <div className="product-meta">
//                                                     //                                                     <span>Бренд: {detail.brand}</span>
//                                                     //                                                     <span>Категория: {detail.category}</span>
//                                                     //                                                     <span>Артикул: {detail.vendorCode}</span>
//                                                     //                                                 </div>
//                                                     //                                             </div>
//                                                     //                                             <div className="product-price">
//                                                     //                                                 <div className="price">{formatPrice(detail.salePriceUZS?.Float64 || 0)}</div>
//                                                     //                                                 <div className="quantity">Количество: {detail.quantity}</div>
//                                                     //                                             </div>
//                                                     //                                         </div>
//                                                     //                                     </div>
//                                                     //                                 ))}

//                                                     //                                 <div className="order-summary">
//                                                     //                                     <div className="summary-row">
//                                                     //                                         <span>Способ оплаты:</span>
//                                                     //                                         <span>{payment?.paymentTypeID || 'Не указан'}</span>
//                                                     //                                     </div>
//                                                     //                                     <div className="summary-row total">
//                                                     //                                         <span>Итого:</span>
//                                                     //                                         <span>{formatPrice(transaction.salePriceUZS?.Float64 || 0)}</span>
//                                                     //                                     </div>
//                                                     //                                 </div>
//                                                     //                             </div>
//                                                     //                         ) : (
//                                                     //                             <p>Информация о товарах недоступна</p>
//                                                     //                         )}
//                                                     //                     </div>
//                                                     //                 </td>
//                                                     //             </tr>
//                                                     //         )}
//                                                     //     </>
//                                                     // );

//                                                     return (
//                                                         <React.Fragment key={transaction.id}>
//                                                             <tr
//                                                                 className="order-row"
//                                                                 onClick={() => toggleOrderExpansion(transaction.id)}
//                                                             >
//                                                                 <td data-label="Номер заказа">
//                                                                     <span className="order-number">№ {transaction.id}</span>
//                                                                 </td>
//                                                                 <td>{formatDate(transaction.saleDate)}</td>
//                                                                 <td>Курьерская доставка</td>
//                                                                 <td>{payment?.paymentTypeID || 'Наличные'}</td>
//                                                                 <td><strong>{formatPrice(transaction.salePriceUZS?.Float64 || 0)}</strong></td>
//                                                                 <td><span className="status completed">Выполнен</span></td>
//                                                                 <td>
//                                                                     <div className={`order-arrow ${isExpanded ? 'expanded' : ''}`}>
//                                                                         ▼
//                                                                     </div>
//                                                                 </td>
//                                                             </tr>
//                                                             {isExpanded && (
//                                                                 <tr className="order-details-row">
//                                                                     <td colSpan={7}>
//                                                                         <div className="order-details">
//                                                                             <h4>Детали заказа № {transaction.id}</h4>

//                                                                             {details.length > 0 ? (
//                                                                                 <div className="order-products">
//                                                                                     {details.map((detail: TransactionDetail, index: number) => (
//                                                                                         <div key={index} className="product-item">
//                                                                                             <div className="product-info">
//                                                                                                 <div className="product-main">
//                                                                                                     <h5>{detail.name}</h5>
//                                                                                                     <div className="product-meta">
//                                                                                                         <span>Бренд: {detail.brand}</span>
//                                                                                                         <span>Категория: {detail.category}</span>
//                                                                                                         <span>Артикул: {detail.vendorCode}</span>
//                                                                                                     </div>
//                                                                                                 </div>
//                                                                                                 <div className="product-price">
//                                                                                                     <div className="price">{formatPrice(detail.salePriceUZS?.Float64 || 0)}</div>
//                                                                                                     <div className="quantity">Количество: {detail.quantity}</div>
//                                                                                                 </div>
//                                                                                             </div>
//                                                                                         </div>
//                                                                                     ))}

//                                                                                     <div className="order-summary">
//                                                                                         <div className="summary-row">
//                                                                                             <span>Способ оплаты:</span>
//                                                                                             <span>{payment?.paymentTypeID || 'Не указан'}</span>
//                                                                                         </div>
//                                                                                         <div className="summary-row total">
//                                                                                             <span>Итого:</span>
//                                                                                             <span>{formatPrice(transaction.salePriceUZS?.Float64 || 0)}</span>
//                                                                                         </div>
//                                                                                     </div>
//                                                                                 </div>
//                                                                             ) : (
//                                                                                 <p>Информация о товарах недоступна</p>
//                                                                             )}
//                                                                         </div>
//                                                                     </td>
//                                                                 </tr>
//                                                             )}
//                                                         </React.Fragment>
//                                                     );
//                                                 })}

//                                             </tbody>
//                                         </table>
//                                     </div>

//                                     {/* Мобильная версия */}
//                                     <div className="orders-mobile">
//                                         {clientData.transactions.map((transaction: Transaction) => {
//                                             const details = clientData.transactionDetails?.filter(
//                                                 (detail: TransactionDetail) => detail.transactionId === transaction.id
//                                             ) || [];
//                                             const payment = clientData.transactionPayments?.find(
//                                                 (payment: TransactionPayment) => payment.transactionId === transaction.id
//                                             );
//                                             const isExpanded = expandedOrders.has(transaction.id);

//                                             return (
//                                                 <div key={transaction.id} className="mobile-order-card">
//                                                     <div
//                                                         className="mobile-order-header"
//                                                         onClick={() => toggleOrderExpansion(transaction.id)}
//                                                     >
//                                                         <div className="mobile-order-main">
//                                                             <div className="mobile-order-number">
//                                                                 <span className="order-number">№ {transaction.id}</span>
//                                                                 <span className="status completed">Выполнен</span>
//                                                             </div>
//                                                             <div className="mobile-order-info">
//                                                                 <div className="mobile-order-date">
//                                                                     {formatDate(transaction.saleDate)}
//                                                                 </div>
//                                                                 <div className="mobile-order-price mr-2 text-[#64b704]">
//                                                                     <p>{formatPrice(transaction.salePriceUZS?.Float64 || 0)}</p>
//                                                                 </div>
//                                                             </div>
//                                                             <div className="mobile-order-meta">
//                                                                 {/* <div>Курьерская доставка</div> */}
//                                                                 <div>{payment?.paymentTypeID || 'Наличные'}</div>
//                                                             </div>
//                                                         </div>
//                                                         <div className={`order-arrow text-[12px] mt-[4px] ${isExpanded ? 'expanded' : ''}`}>
//                                                             ▼
//                                                         </div>
//                                                     </div>

//                                                     {isExpanded && (
//                                                         <div className="mobile-order-details">
//                                                             <h4>Детали заказа</h4>

//                                                             {details.length > 0 ? (
//                                                                 <div className="mobile-order-products">
//                                                                     {details.map((detail: TransactionDetail, index: number) => (
//                                                                         <div key={index} className="mobile-product-item">
//                                                                             <h5>{detail.name}</h5>
//                                                                             <div className="mobile-product-meta">
//                                                                                 <div>
//                                                                                     <span>Бренд: {detail.brand}</span>
//                                                                                     <span>Категория: {detail.category}</span>
//                                                                                     <span>Артикул: {detail.vendorCode}</span>
//                                                                                 </div>
//                                                                                 <div className="mobile-product-price">
//                                                                                     <div className="price">{formatPrice(detail.salePriceUZS?.Float64 || 0)}</div>
//                                                                                     <div className="quantity">Кол-во: {detail.quantity}</div>
//                                                                                 </div>
//                                                                             </div>
//                                                                         </div>
//                                                                     ))}

//                                                                     <div className="mobile-order-summary">
//                                                                         <div className="summary-row">
//                                                                             <span>Способ оплаты:</span>
//                                                                             <span>{payment?.paymentTypeID || 'Не указан'}</span>
//                                                                         </div>
//                                                                         <div className="summary-row total">
//                                                                             <span>Итого:</span>
//                                                                             <span>{formatPrice(transaction.salePriceUZS?.Float64 || 0)}</span>
//                                                                         </div>
//                                                                     </div>
//                                                                 </div>
//                                                             ) : (
//                                                                 <p>Информация о товарах недоступна</p>
//                                                             )}
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                             );
//                                         })}
//                                     </div>
//                                 </>
//                             ) : (
//                                 <p>У вас пока нет заказов.</p>
//                             )}
//                         </div>
//                     </motion.div>
//                 );
//             // case 'favorites':
//             //     return (
//             //         <motion.div {...fadeInUp} key="favorites">
//             //             <div className="profile-page-content">
//             //                 <h2>Избранное</h2>
//             //                 <p>Ваши избранные товары пусты.</p>
//             //             </div>
//             //         </motion.div>
//             //     );
//             case 'points':
//                 return (
//                     <motion.div {...fadeInUp} key="points">
//                         <div className="profile-page-content">
//                             <h2>Ваша накопительная карта</h2>
//                             <div className="current_balance">
//                                 Текущий баланс: <span className='billz_point_value'>
//                                     {clientData.client.balance?.Valid
//                                         ? `${(clientData.client.balance.Float64 / 12800).toFixed(2)} $`
//                                         : '0.00 $'
//                                     }
//                                 </span>
//                             </div>

//                             <div className="loyalty_image_block">
//                                 {/* <img className='billz_cart_barcode' src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/913b2275733069210a8b889e89467b57.png" alt="barcode" /> */}
//                                 <span className='billz_cart_number'>
//                                     {clientData.clientCard?.[0]?.cardNumber || clientData.client.cardNumbers}
//                                 </span>
//                             </div>

//                             <div className="loyalty_description_block">
//                                 <div className="loyalty_stats">
//                                     <h3 className='mb-4'>Статистика покупок</h3>
//                                     <p><strong>Общая сумма покупок:</strong> {formatPrice(parseInt(clientData.client.all_purchase_sum_uzs || '0'))}</p>
//                                     <p><strong>Количество покупок:</strong> {clientData.client.purchaseNum}</p>
//                                     <p><strong>Последняя покупка:</strong> {formatDate(clientData.client.lastTransactionDate)}</p>

//                                     {clientData.clientBalance && clientData.clientBalance.length > 0 && (
//                                         <div className="balance_details">
//                                             {/* <h4 className='mb-4'>Детали баланса:</h4> */}
//                                             {clientData.clientBalance.map((balance: ClientBalance, index: number) => (
//                                                 <div key={index}>
//                                                     {/* <p><strong>Тип:</strong> {balance.balanceTypeName}</p> */}
//                                                     <p className='mb-12'><strong>Действителен до:</strong> {formatDate(balance.expireDate)}</p>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     )}
//                                 </div>

//                                 <p className='main_loyalty_description'>
//                                     ❇️ При покупке наших товаров отправляйте нам скриншот вашей карты и следите за вашими покупками,
//                                     и программой лояльности прямо внутри бота.
//                                 </p>
//                                 <p>Программа лояльности Vitaline направлена на создание долгосрочных отношений с клиентами, предлагая им не только выгодные условия, но и возможность быть частью сообщества, заботящегося о здоровье.</p>
//                                 <br />
//                                 <p>С помощью этой программы Vitaline стремится сделать каждую покупку более приятной и выгодной для своих клиентов!</p>
//                             </div>
//                         </div>
//                     </motion.div>
//                 );
//             case 'support':
//                 return (
//                     <motion.div {...fadeInUp} key="support">
//                         <div className="profile-page-content">
//                             <div className="big_inf">
//                                 Свяжитесь с нами и мы поможем с любым вопросом касаемо внутренних процессов Vitaline - ассортимент, заказы, доставка.
//                             </div>

//                             <div className="smal_inf">
//                                 Рабочие дни с 9:00 до 19:00,
//                                 <br />прием заказов online 24/7
//                             </div>

//                             <div className="supp_block">
//                                 <div className="support_bottom_block">
//                                     <h2 className='supp_page_head'>Служба поддержки Vitaline</h2>
//                                     <div className="support_bottom_block_inner_wrap">
//                                         <a href="https://t.me/abdelmansur" className="tg_chat_btn" target="_blank" rel="noopener noreferrer">
//                                             <img alt="" src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Artboard.svg" />
//                                             <span>Открыть чат</span>
//                                         </a>
//                                         <div className="support-contacts">
//                                             <p style={{ whiteSpace: "nowrap" }}>+998 95 099 00 90</p>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="contacts-social-links">
//                                     <a href="https://www.instagram.com/vitaline.optom/" className="contacts_insta">
//                                         <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Socials.svg" alt="" />
//                                         <span>Инстаграм</span>
//                                     </a>
//                                     <a href="https://t.me/abdelmansur" className="contacts_telegram">
//                                         <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Artboard.svg" alt="" />
//                                         <span>Телеграм-чат</span>
//                                     </a>
//                                 </div>
//                             </div>
//                         </div>
//                     </motion.div>
//                 );
//             default:
//                 return null;
//         }
//     };

//     const menuItems = (
//         <ul>
//             <li className={activeSection === 'profile' ? 'active' : ''}
//                 onClick={() => {
//                     if (window.innerWidth <= 768) {
//                         if (activeSection === 'profile') {
//                             setIsMenuOpen(!isMenuOpen);
//                         } else {
//                             setActiveSection('profile');
//                             setIsMenuOpen(false);
//                         }
//                     } else {
//                         setActiveSection('profile');
//                     }
//                 }}>
//                 <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/icon_profile.png" alt="Иконка профиля" />
//                 <span>Мой профиль</span>
//             </li>
//             <li className={activeSection === 'orders' ? 'active' : ''}
//                 onClick={() => {
//                     if (window.innerWidth <= 768) {
//                         if (activeSection === 'orders') {
//                             setIsMenuOpen(!isMenuOpen);
//                         } else {
//                             setActiveSection('orders');
//                             setIsMenuOpen(false);
//                         }
//                     } else {
//                         setActiveSection('orders');
//                     }
//                 }}>
//                 <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/icon_cart.png" alt="Иконка заказы" />
//                 <span>Мои заказы</span>
//             </li>
//             {/* <li className={activeSection === 'favorites' ? 'active' : ''}
//                 onClick={() => {
//                     if (window.innerWidth <= 768) {
//                         if (activeSection === 'favorites') {
//                             setIsMenuOpen(!isMenuOpen);
//                         } else {
//                             setActiveSection('favorites');
//                             setIsMenuOpen(false);
//                         }
//                     } else {
//                         setActiveSection('favorites');
//                     }
//                 }}>
//                 <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/icon_favorite.png" alt="Иконка Избранное" />
//                 <span>Избранное</span>
//             </li> */}
//             <li className={activeSection === 'points' ? 'active' : ''}
//                 onClick={() => {
//                     if (window.innerWidth <= 768) {
//                         if (activeSection === 'points') {
//                             setIsMenuOpen(!isMenuOpen);
//                         } else {
//                             setActiveSection('points');
//                             setIsMenuOpen(false);
//                         }
//                     } else {
//                         setActiveSection('points');
//                     }
//                 }}>
//                 <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/icon_points.png" alt="Иконка баллы" />
//                 <span>Мои баллы</span>
//             </li>
//             <li className={activeSection === 'support' ? 'active' : ''}
//                 onClick={() => {
//                     if (window.innerWidth <= 768) {
//                         if (activeSection === 'support') {
//                             setIsMenuOpen(!isMenuOpen);
//                         } else {
//                             setActiveSection('support');
//                             setIsMenuOpen(false);
//                         }
//                     } else {
//                         setActiveSection('support');
//                     }
//                 }}>
//                 <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/icon_support.png" alt="Иконка поддержки" />
//                 <span>Служба поддержки</span>
//             </li>

//             <div className='side_nav_divider'></div>

//             <li className="logout" onClick={resetAuthFlow}>
//                 <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/icon_logout.png" alt="Иконка выхода" />
//                 <span>Выйти</span>
//             </li>
//         </ul>
//     );

//     const RegistrationModal = () => {
//         if (!showRegistrationModal) return null;

//         const content = {
//             ru: {
//                 title: 'Регистрация в системе',
//                 subtitle: 'Для создания профиля на сайте vitaline-trade.com свяжитесь через Telegram с пользователем @abdelmansur для получения карты лояльности с кэшбеком',
//                 steps: [
//                     '1️⃣ Напишите в Telegram @abdelmansur',
//                     '2️⃣ Укажите Ф.И.О и номер телефона',
//                 ],
//                 botButton: 'Написать @abdelmansur',
//                 closeButton: 'Закрыть',
//                 langSwitch: 'O\'zbek tilida'
//             },
//             uz: {
//                 title: 'Tizimda ro\'yxatdan o\'tish',
//                 subtitle: 'vitaline-trade.com saytida profil yaratish uchun keshbekli sodiqlik kartasini olish maqsadida Telegram orqali @abdelmansur bilan bog\'laning',
//                 steps: [
//                     '1️⃣ Telegramda @abdelmansur ga yozing',
//                     '2️⃣ F.I.O va telefon raqamingizni ko\'rsating',
//                 ],
//                 botButton: '@abdelmansur ga yozish',
//                 closeButton: 'Yopish',
//                 langSwitch: 'На русском'
//             }
//         };

//         const currentContent = content[modalLanguage];

//         return (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//                 <div className="bg-white rounded-lg max-w-md w-full p-6 relative animate-fade-in">
//                     {/* Кнопка закрытия */}
//                     <button
//                         onClick={() => setShowRegistrationModal(false)}
//                         className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-light"
//                     >
//                         ×
//                     </button>

//                     {/* Переключатель языка */}
//                     <button
//                         onClick={() => setModalLanguage(modalLanguage === 'ru' ? 'uz' : 'ru')}
//                         className="absolute top-4 left-4 text-sm text-[#FF7900] underline"
//                     >
//                         {currentContent.langSwitch}
//                     </button>

//                     {/* Контент */}
//                     <div className="mt-8">
//                         <div className="text-center mb-6">
//                             <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
//                                 <img src="/vitaline-apple-icon-180.png" className='w-[70%]' />
//                             </div>
//                             <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                                 {currentContent.title}
//                             </h3>
//                             <p className="text-gray-600 text-sm leading-relaxed">
//                                 {currentContent.subtitle}
//                             </p>
//                         </div>

//                         {/* Шаги */}
//                         <div className="space-y-3 mb-6">
//                             {currentContent.steps.map((step, index) => (
//                                 <div key={index} className="flex items-start space-x-3">
//                                     <div className="text-lg">{step.split(' ')[0]}</div>
//                                     <div className="text-sm text-gray-700 leading-relaxed">
//                                         {step.split(' ').slice(1).join(' ')}
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>

//                         {/* Кнопки */}
//                         <div className="space-y-3">
//                             <a
//                                 href="https://t.me/abdelmansur"
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="w-full bg-[#64B704] hover:bg-[#5ca903] text-white py-3 px-4 rounded-lg font-medium text-center block transition-colors duration-200"
//                                 onClick={() => setShowRegistrationModal(false)}
//                             >
//                                 {currentContent.botButton}
//                             </a>
//                             <button
//                                 onClick={() => setShowRegistrationModal(false)}
//                                 className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors duration-200"
//                             >
//                                 {currentContent.closeButton}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     };

//     return (
//         <>
//             <AnimatedWrapper>
//                 <div className="profile-container">
//                     <aside className="sidebar_profile">
//                         <div className="mobile-dropdown-header" onClick={() => {
//                             if (window.innerWidth <= 768) {
//                                 setIsMenuOpen(!isMenuOpen);
//                             }
//                         }}>
//                             <span>
//                                 {
//                                     activeSection === 'profile' ? 'Мой профиль' :
//                                         activeSection === 'orders' ? 'Мои заказы' :
//                                             // activeSection === 'favorites' ? 'Избранное' :
//                                             activeSection === 'points' ? 'Мои баллы' :
//                                                 activeSection === 'support' ? 'Служба поддержки' : ''
//                                 }
//                             </span>
//                             <span className={`dropdown-arrow ${isMenuOpen ? 'open' : ''}`}>▼</span>
//                         </div>

//                         <div className={`menu-items ${isMenuOpen ? 'open' : ''}`}>
//                             {menuItems}
//                         </div>
//                     </aside>

//                     <main className="content-container">
//                         {renderContent()}
//                     </main>
//                 </div>
//             </AnimatedWrapper>

//             <RegistrationModal />
//         </>
//     );
// }




































// my-app\src\app\profile-wholesale\page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import axios, { AxiosError } from 'axios';
import './profile.css';
import '../contacts/contacts.css';
import AnimatedWrapper from '@/components/animation/AnimatedWrapper';
import React from 'react';
// Типизация для nullable полей из Go
interface NullableString {
    String: string;
    Valid: boolean;
}
interface NullableFloat64 {
    Float64: number;
    Valid: boolean;
}
interface NullableInt64 {
    Int64: number;
    Valid: boolean;
}
// Типизация данных клиента
interface ClientData {
    id: number;
    firstName: string;
    lastName: string;
    insDate: string;
    purchaseNum: string;
    all_purchase_sum_uzs: string;
    cardNumbers: string;
    balance: NullableFloat64;
    State: string;
    lastTransactionDate: string;
}
interface ClientCard {
    cardNumber: string;
    name: string;
}
interface ClientBalance {
    balanceTypeName: string;
    balanceValue: NullableFloat64;
    expireDate: string;
}
interface Transaction {
    id: number;
    saleDate: string;
    salePriceUZS: NullableFloat64;
    products: NullableInt64;
}
interface TransactionDetail {
    transactionId: number;
    name: string;
    quantity: number;
    salePriceUZS: NullableFloat64;
    brand: string;
    category: string;
    vendorCode: string;
}
interface TransactionPayment {
    transactionId: number;
    paymentTypeID: string;
    amount: number;
}
interface BillzApiResponse {
    id: string;
    jsonrpc: string;
    result?: {
        clients?: Array<{
            client: ClientData;
            clientCard: ClientCard[];
            clientBalance: ClientBalance[];
            transactions: Transaction[];
            transactionDetails: TransactionDetail[];
            transactionPayments: TransactionPayment[];
        }>;
    };
    error?: {
        code: number;
        message: string;
    };
}
// Обновленные интерфейсы для OTP API
interface OTPGenerateResponse {
    success: boolean;
    message: string;
    data?: {
        otp_id: string;
    };
}
interface OTPVerifyResponse {
    success: boolean;
    message: string;
    verified: boolean; // Теперь это поле всегда будет присутствовать
}
export default function ProfilePage() {
    const locale = useLocale();
    const t = useTranslations('profile');
    const [activeSection, setActiveSection] = useState<'profile' | 'orders' | 'favorites' | 'points' | 'support'>('profile');
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [phone, setPhone] = useState<string>('+998 ');
    const [clientData, setClientData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [hasSearched, setHasSearched] = useState<boolean>(false);
    const [expandedOrders, setExpandedOrders] = useState<Set<number>>(new Set());
    // OTP состояния
    const [otpSent, setOtpSent] = useState<boolean>(false);
    const [otpCode, setOtpCode] = useState<string>('');
    const [otpLoading, setOtpLoading] = useState<boolean>(false);
    const [otpError, setOtpError] = useState<string>('');
    const [otpVerified, setOtpVerified] = useState<boolean>(false);
    const [resendTimer, setResendTimer] = useState<number>(0);
    // Для не зарегистрированных пользователей
    const [showRegistrationModal, setShowRegistrationModal] = useState<boolean>(false);
    const router = useRouter();
    //логи
    const [fullApiResponse, setFullApiResponse] = useState<any>(null);
    useEffect(() => {
        document.title = t('metadataTitle');
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', t('metadataDescription'));
        } else {
            const meta = document.createElement('meta');
            meta.name = 'description';
            meta.content = t('metadataDescription');
            document.head.appendChild(meta);
        }
        // Загружаем сохраненный номер телефона
        loadSavedPhone();
    }, [t]);
    // Таймер для повторной отправки OTP
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (resendTimer > 0) {
            interval = setInterval(() => {
                setResendTimer(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [resendTimer]);
    // Функция для сохранения номера телефона в localStorage
    const savePhoneToStorage = (phoneNumber: string): void => {
        try {
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + 7); // Сохраняем на неделю
            const phoneData = {
                phone: phoneNumber,
                expiry: expiryDate.toISOString()
            };
            localStorage.setItem('vitaline_user_phone', JSON.stringify(phoneData));
        } catch (error) {
            console.warn(t('errorSavingPhone'), error);
        }
    };
    // Функция для загрузки номера телефона из localStorage
    const loadSavedPhone = (): void => {
        try {
            const savedData = localStorage.getItem('vitaline_user_phone');
            if (savedData) {
                const phoneData = JSON.parse(savedData);
                const expiryDate = new Date(phoneData.expiry);
                if (expiryDate > new Date()) {
                    // Номер еще действителен
                    setPhone(phoneData.phone);
                    // Автоматически загружаем данные клиента
                    fetchClientData(phoneData.phone);
                } else {
                    // Удаляем устаревшие данные
                    localStorage.removeItem('vitaline_user_phone');
                }
            }
        } catch (error) {
            console.warn(t('errorLoadingPhone'), error);
        }
    };
    // Функция для очистки номера телефона (удаление всех символов кроме цифр)
    const cleanPhoneNumber = (input: string): string => {
        return input.replace(/[^\d]/g, '');
    };
    // Функция для форматирования номера телефона
    const formatPhoneNumber = (input: string): string => {
        // Получаем только цифры
        const cleaned = cleanPhoneNumber(input);
        // Если номер пустой или начинается не с 998, добавляем 998
        let phoneDigits = cleaned;
        if (!phoneDigits.startsWith('998')) {
            phoneDigits = '998' + phoneDigits.replace(/^998/, '');
        }
        // Ограничиваем длину до 12 цифр (998 + 9 цифр)
        phoneDigits = phoneDigits.substring(0, 12);
        // Форматируем по паттерну +998 00 000-00-00
        let formatted = '+998';
        if (phoneDigits.length > 3) {
            formatted += ' ' + phoneDigits.substring(3, 5);
        }
        if (phoneDigits.length > 5) {
            formatted += ' ' + phoneDigits.substring(5, 8);
        }
        if (phoneDigits.length > 8) {
            formatted += '-' + phoneDigits.substring(8, 10);
        }
        if (phoneDigits.length > 10) {
            formatted += '-' + phoneDigits.substring(10, 12);
        }
        return formatted;
    };
    // Функция для получения чистого номера для API
    const getCleanPhoneForApi = (formattedPhone: string): string => {
        const cleaned = cleanPhoneNumber(formattedPhone);
        return '+' + cleaned;
    };
    // Валидация полного номера
    const isPhoneValid = (formattedPhone: string): boolean => {
        const cleaned = cleanPhoneNumber(formattedPhone);
        return cleaned.length === 12 && cleaned.startsWith('998');
    };
    // Отправка OTP кода
    const sendOTP = async (): Promise<void> => {
        if (!isPhoneValid(phone)) {
            setOtpError(t('invalidPhone'));
            return;
        }
        try {
            setOtpLoading(true);
            setOtpError('');
            const cleanPhone = getCleanPhoneForApi(phone);
            const response = await axios.post<OTPGenerateResponse>('/api/otp/generate', {
                phone: cleanPhone
            });
            if (response.data.success) {
                setOtpSent(true);
                setResendTimer(60); // 60 секунд до повторной отправки
                setOtpError('');
            } else {
                setOtpError(response.data.message || t('otpSendError'));
            }
        } catch (err) {
            const axiosError = err as AxiosError<{ message?: string }>;
            setOtpError(t('otpSendErrorGeneral'));
            console.error('OTP send error:', axiosError);
        } finally {
            setOtpLoading(false);
        }
    };
    // Верификация OTP кода
    // Верификация OTP кода
    const verifyOTP = async (): Promise<void> => {
        if (otpCode.length !== 4) {
            setOtpError(t('invalidOtpLength'));
            return;
        }
        try {
            setOtpLoading(true);
            setOtpError('');
            const cleanPhone = getCleanPhoneForApi(phone);
            const response = await axios.post<OTPVerifyResponse>('/api/otp/verify', {
                phone: cleanPhone,
                otp: otpCode
            });
            // Добавляем логирование для диагностики
            console.log('OTP Verify Response:', response.data);
            // Проверяем разные варианты успешного ответа
            const isSuccessful = response.data.success && (
                response.data.verified === true ||
                response.data.message === t('otpVerifiedMessage') ||
                response.data.message === 'Verified'
            );
            if (isSuccessful) {
                setOtpVerified(true);
                setOtpError('');
                console.log('OTP verified successfully, saving phone and fetching client data...');
                // Сохраняем номер в localStorage
                savePhoneToStorage(phone);
                // Загружаем данные клиента
                await fetchClientData(phone);
            } else {
                console.log('OTP verification failed:', response.data);
                setOtpError(response.data.message || t('invalidOtp'));
            }
        } catch (err) {
            const axiosError = err as AxiosError<{ message?: string }>;
            console.error('OTP verify error:', axiosError);
            setOtpError(t('otpVerifyError'));
        } finally {
            setOtpLoading(false);
        }
    };
    const fetchClientData = async (phoneNumber: string): Promise<void> => {
        try {
            setLoading(true);
            setError('');
            console.log('Fetching client data for phone:', phoneNumber);
            const apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC93b28uYmlsbHoudXpcL2JpbGx6IiwiaWF0IjoxNTM5ODQ2MjIxLCJleHAiOjI1MjYzNzA0MzEsInN1YiI6InZpdGFsaW5lLnZpdGFsaW5ldXoifQ.fGGbJRrKsKT4AezeD2fB6sC9cKNL9Sxn33TNGiUExKQ';
            const cleanPhone = getCleanPhoneForApi(phoneNumber);
            console.log('Clean phone for API:', cleanPhone);
            const requestData = {
                jsonrpc: '2.0',
                method: 'client.search',
                params: {
                    phoneNumber: cleanPhone,
                },
                id: '1'
            };
            console.log('Sending request to Billz API:', requestData);
            const response = await axios.post<BillzApiResponse>(
                'https://api.billz.uz/v1/',
                requestData,
                {
                    headers: {
                        'Authorization': `Bearer ${apiKey}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            );
            console.log('Billz API Response:', response.data);
            //логи
            setFullApiResponse(response.data);
            if (response.data.error) {
                console.error('Billz API Error:', response.data.error);
                // Проверяем на конкретную ошибку "Client not found"
                if (response.data.error.message === 'Client not found') {
                    setError(t('clientNotFound'));
                    setShowRegistrationModal(true); // Показываем попап регистрации
                } else {
                    setError(`${t('apiError')} ${response.data.error.message}`);
                }
                setClientData(null);
                return;
            }
            if (response.data.result && response.data.result.clients && response.data.result.clients.length > 0) {
                console.log('Client found:', response.data.result.clients[0]);
                setClientData(response.data.result.clients[0]);
                setError('');
            } else {
                console.log('No client found for phone:', cleanPhone);
                setError(t('clientNotFound'));
                setShowRegistrationModal(true); // Показываем попап регистрации
                setClientData(null);
            }
        } catch (err) {
            const axiosError = err as AxiosError<{ message?: string }>;
            console.error('fetchClientData error:', axiosError);
            setError(t('loadingError'));
            setClientData(null);
        } finally {
            setLoading(false);
            setHasSearched(true);
        }
    };
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        // Не позволяем удалять +998
        if (input.length < 4 || !input.startsWith('+998')) {
            return;
        }
        const formatted = formatPhoneNumber(input);
        setPhone(formatted);
    };
    const handleOTPSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        verifyOTP();
    };
    const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '').substring(0, 4);
        setOtpCode(value);
    };
    const resetAuthFlow = () => {
        setOtpSent(false);
        setOtpCode('');
        setOtpVerified(false);
        setOtpError('');
        setResendTimer(0);
        setPhone('+998 ');
        setClientData(null);
        setHasSearched(false);
        // Удаляем сохраненный номер
        localStorage.removeItem('vitaline_user_phone');
    };
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString(`${locale}-${locale.toUpperCase()}`);
    };
    const formatPrice = (price: number): string => {
        const priceInDollars = price / 12800;
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(priceInDollars) + ' $';
    };
    const toggleOrderExpansion = (orderId: number): void => {
        const newExpanded = new Set(expandedOrders);
        if (newExpanded.has(orderId)) {
            newExpanded.delete(orderId);
        } else {
            newExpanded.add(orderId);
        }
        setExpandedOrders(newExpanded);
    };
    const renderContent = () => {
        const fadeInUp = {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: 20 },
            transition: { duration: 0.5, ease: 'easeOut' },
        };
        // Если нет данных, показываем форму аутентификации
        if (!clientData) {
            return (
                <motion.div {...fadeInUp} key="auth">
                    <div className="profile-page-content">
                        <h2>{t('loginTitle')}</h2>
                        <p>{t('loginSubtitle')}</p>
                        {/* Поле ввода номера телефона */}
                        <div className='profile_form'>
                            <div className="form-group">
                                <label className='mt-4'>{t('phoneLabel')}</label>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={handlePhoneChange}
                                        placeholder={t('phonePlaceholder')}
                                        required
                                        style={{ flex: 1 }}
                                        disabled={otpSent}
                                    />
                                    {!otpSent && (
                                        <button
                                            type="button"
                                            onClick={sendOTP}
                                            className="save-button"
                                            disabled={otpLoading || !isPhoneValid(phone)}
                                            style={{
                                                backgroundColor: '#FF7900',
                                                minWidth: '140px',
                                                fontSize: '16px',
                                                margin: 0
                                            }}
                                        >
                                            {otpLoading ? t('sending') : t('getCode')}
                                        </button>
                                    )}
                                </div>
                            </div>
                            {/* Поле ввода OTP кода - показывается только после отправки */}
                            {otpSent && (
                                <div className="form-group" style={{ marginTop: '20px' }}>
                                    <label>{t('otpLabel')}</label>
                                    <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
                                        {t('otpInstructions', { phone })}
                                    </p>
                                    <form onSubmit={handleOTPSubmit}>
                                        <div className='flex flex-col md:flex-row' style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
                                            <input
                                                type="text"
                                                value={otpCode}
                                                onChange={handleOTPChange}
                                                placeholder="0000"
                                                maxLength={4}
                                                required
                                                style={{
                                                    fontSize: '18px',
                                                    textAlign: 'center',
                                                    letterSpacing: '0.5em',
                                                    flex: 1,
                                                }}
                                            />
                                            <button
                                                type="submit"
                                                className="save-button min-w-[100%] md:min-w-[140px]"
                                                disabled={otpLoading || otpCode.length !== 4}
                                                style={{
                                                    backgroundColor: '#61b104',
                                                    fontSize: '16px',
                                                    margin: 0,
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                {otpLoading ? t('verifying') : t('confirm')}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                            {/* Дополнительные действия для OTP */}
                            {otpSent && (
                                <div style={{ marginTop: '20px', textAlign: 'center' }} className='flex flex-col md:flex-row justify-start items-center'>
                                    {resendTimer > 0 ? (
                                        <p style={{ color: '#666' }}>{t('resendTimer', { seconds: resendTimer })}</p>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={sendOTP}
                                            className="save-button"
                                            style={{
                                                background: '#f4f5f6',
                                                color: '#000',
                                                border: '1px solid #000',
                                                fontSize: '14px',
                                                padding: '8px 16px'
                                            }}
                                            disabled={otpLoading}
                                        >
                                            {t('resendCode')}
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        onClick={resetAuthFlow}
                                        style={{
                                            background: 'transparent',
                                            color: '#6c757d',
                                            border: 'none',
                                            marginLeft: '10px',
                                            textDecoration: 'underline',
                                            fontSize: '14px'
                                        }}
                                    >
                                        {t('changePhone')}
                                    </button>
                                </div>
                            )}
                        </div>
                        {otpError && <p className="error-message mt-4 text-red-600">{otpError}</p>}
                        {error && <p className="error-message mt-4 text-red-600">{error}</p>}
                        {loading && <p className='mt-2'>{t('loadingProfile')}</p>}
                    </div>
                </motion.div>
            );
        }
        switch (activeSection) {
            case 'profile':
                return (
                    <motion.div {...fadeInUp} key="profile">
                        <div className="profile-page-content">
                            <h2>{t('personalInfo')}</h2>
                            <div className='profile_form'>
                                <div className="form-group">
                                    <label>{t('nameLabel')}</label>
                                    {/* <input type="text" value={`${clientData.client.firstName} ${clientData.client.lastName}`} readOnly /> */}
                                    <input type="text" value={clientData.client.lastName ? `${clientData.client.firstName} ${clientData.client.lastName}` : clientData.client.firstName} readOnly />
                                </div>
                                <div className="form-group">
                                    <label>{t('phoneLabel')}</label>
                                    <input type="text" value={phone} readOnly />
                                </div>
                                {(clientData.clientCard?.[0]?.cardNumber || clientData.client.cardNumbers) && (
                                    <div className="form-group">
                                        <label>{t('cardNumberLabel')}</label>
                                        <input type="text" value={clientData.clientCard?.[0]?.cardNumber || clientData.client.cardNumbers} readOnly />
                                    </div>
                                )}
                                <div className="form-group">
                                    <label>{t('registrationDateLabel')}</label>
                                    <input type="text" value={formatDate(clientData.client.insDate)} readOnly />
                                </div>
                                <div className="form-group">
                                    <label>{t('statusLabel')}</label>
                                    <input type="text" value={clientData.client.State === '1' ? t('active') : t('inactive')} readOnly />
                                </div>
                                <button
                                    className="save-button"
                                    onClick={resetAuthFlow}
                                >
                                    {t('logout')}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                );
            case 'orders':
                return (
                    <motion.div {...fadeInUp} key="orders">
                        <div className="profile-page-content">
                            <h2>{t('myOrders')}</h2>
                            {clientData.transactions && clientData.transactions.length > 0 ? (
                                <>
                                    {/* Десктопная версия */}
                                    <div className="orders-desktop">
                                        <table className="orders-table">
                                            <thead>
                                                <tr>
                                                    <th>{t('orderNumber')}</th>
                                                    <th>{t('orderDate')}</th>
                                                    <th>{t('deliveryType')}</th>
                                                    <th>{t('paymentType')}</th>
                                                    <th>{t('cost')}</th>
                                                    <th>{t('currentStatus')}</th>
                                                    <th>{t('details')}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {clientData.transactions.map((transaction: Transaction) => {
                                                    const details = clientData.transactionDetails?.filter(
                                                        (detail: TransactionDetail) => detail.transactionId === transaction.id
                                                    ) || [];
                                                    const payment = clientData.transactionPayments?.find(
                                                        (payment: TransactionPayment) => payment.transactionId === transaction.id
                                                    );
                                                    const isExpanded = expandedOrders.has(transaction.id);
                                                    return (
                                                        <React.Fragment key={transaction.id}>
                                                            <tr
                                                                className="order-row"
                                                                onClick={() => toggleOrderExpansion(transaction.id)}
                                                            >
                                                                <td data-label={t('orderNumber')}>
                                                                    <span className="order-number">№ {transaction.id}</span>
                                                                </td>
                                                                <td>{formatDate(transaction.saleDate)}</td>
                                                                <td>{t('courierDelivery')}</td>
                                                                <td>{payment?.paymentTypeID || t('cash')}</td>
                                                                <td><strong>{formatPrice(transaction.salePriceUZS?.Float64 || 0)}</strong></td>
                                                                <td><span className="status completed">{t('completed')}</span></td>
                                                                <td>
                                                                    <div className={`order-arrow ${isExpanded ? 'expanded' : ''}`}>
                                                                        ▼
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            {isExpanded && (
                                                                <tr className="order-details-row">
                                                                    <td colSpan={7}>
                                                                        <div className="order-details">
                                                                            <h4>{t('orderDetails', { id: transaction.id })}</h4>
                                                                            {details.length > 0 ? (
                                                                                <div className="order-products">
                                                                                    {details.map((detail: TransactionDetail, index: number) => (
                                                                                        <div key={index} className="product-item">
                                                                                            <div className="product-info">
                                                                                                <div className="product-main">
                                                                                                    <h5>{detail.name}</h5>
                                                                                                    <div className="product-meta">
                                                                                                        <span>{t('brand')}: {detail.brand}</span>
                                                                                                        <span>{t('category')}: {detail.category}</span>
                                                                                                        <span>{t('article')}: {detail.vendorCode}</span>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="product-price">
                                                                                                    <div className="price">{formatPrice(detail.salePriceUZS?.Float64 || 0)}</div>
                                                                                                    <div className="quantity">{t('quantity')}: {detail.quantity}</div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    ))}
                                                                                    <div className="order-summary">
                                                                                        <div className="summary-row">
                                                                                            <span>{t('paymentMethod')}</span>
                                                                                            <span>{payment?.paymentTypeID || t('notSpecified')}</span>
                                                                                        </div>
                                                                                        <div className="summary-row total">
                                                                                            <span>{t('total')}</span>
                                                                                            <span>{formatPrice(transaction.salePriceUZS?.Float64 || 0)}</span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            ) : (
                                                                                <p>{t('productInfoUnavailable')}</p>
                                                                            )}
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        </React.Fragment>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* Мобильная версия */}
                                    <div className="orders-mobile">
                                        {clientData.transactions.map((transaction: Transaction) => {
                                            const details = clientData.transactionDetails?.filter(
                                                (detail: TransactionDetail) => detail.transactionId === transaction.id
                                            ) || [];
                                            const payment = clientData.transactionPayments?.find(
                                                (payment: TransactionPayment) => payment.transactionId === transaction.id
                                            );
                                            const isExpanded = expandedOrders.has(transaction.id);
                                            return (
                                                <div key={transaction.id} className="mobile-order-card">
                                                    <div
                                                        className="mobile-order-header"
                                                        onClick={() => toggleOrderExpansion(transaction.id)}
                                                    >
                                                        <div className="mobile-order-main">
                                                            <div className="mobile-order-number">
                                                                <span className="order-number">№ {transaction.id}</span>
                                                                <span className="status completed">{t('completed')}</span>
                                                            </div>
                                                            <div className="mobile-order-info">
                                                                <div className="mobile-order-date">
                                                                    {formatDate(transaction.saleDate)}
                                                                </div>
                                                                <div className="mobile-order-price mr-2 text-[#64b704]">
                                                                    <p>{formatPrice(transaction.salePriceUZS?.Float64 || 0)}</p>
                                                                </div>
                                                            </div>
                                                            <div className="mobile-order-meta">
                                                                {/* <div>Курьерская доставка</div> */}
                                                                <div>{payment?.paymentTypeID || t('cash')}</div>
                                                            </div>
                                                        </div>
                                                        <div className={`order-arrow text-[12px] mt-[4px] ${isExpanded ? 'expanded' : ''}`}>
                                                            ▼
                                                        </div>
                                                    </div>
                                                    {isExpanded && (
                                                        <div className="mobile-order-details">
                                                            <h4>{t('orderDetails')}</h4>
                                                            {details.length > 0 ? (
                                                                <div className="mobile-order-products">
                                                                    {details.map((detail: TransactionDetail, index: number) => (
                                                                        <div key={index} className="mobile-product-item">
                                                                            <h5>{detail.name}</h5>
                                                                            <div className="mobile-product-meta">
                                                                                <div>
                                                                                    <span>{t('brand')}: {detail.brand}</span>
                                                                                    <span>{t('category')}: {detail.category}</span>
                                                                                    <span>{t('article')}: {detail.vendorCode}</span>
                                                                                </div>
                                                                                <div className="mobile-product-price">
                                                                                    <div className="price">{formatPrice(detail.salePriceUZS?.Float64 || 0)}</div>
                                                                                    <div className="quantity">{t('quantityAbbr')}: {detail.quantity}</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                    <div className="mobile-order-summary">
                                                                        <div className="summary-row">
                                                                            <span>{t('paymentMethod')}</span>
                                                                            <span>{payment?.paymentTypeID || t('notSpecified')}</span>
                                                                        </div>
                                                                        <div className="summary-row total">
                                                                            <span>{t('total')}</span>
                                                                            <span>{formatPrice(transaction.salePriceUZS?.Float64 || 0)}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <p>{t('productInfoUnavailable')}</p>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </>
                            ) : (
                                <p>{t('noOrders')}</p>
                            )}
                        </div>
                    </motion.div>
                );
            case 'points':
                return (
                    <motion.div {...fadeInUp} key="points">
                        <div className="profile-page-content">
                            <h2>{t('loyaltyCard')}</h2>
                            <div className="current_balance">
                                {t('currentBalance')}: <span className='billz_point_value'>
                                    {clientData.client.balance?.Valid
                                        ? `${(clientData.client.balance.Float64 / 12800).toFixed(2)} $`
                                        : '0.00 $'
                                    }
                                </span>
                            </div>
                            <div className="loyalty_image_block">
                                <span className='billz_cart_number'>
                                    {clientData.clientCard?.[0]?.cardNumber || clientData.client.cardNumbers}
                                </span>
                            </div>
                            <div className="loyalty_description_block">
                                <div className="loyalty_stats">
                                    <h3 className='mb-4'>{t('purchaseStats')}</h3>
                                    <p><strong>{t('totalPurchases')}:</strong> {formatPrice(parseInt(clientData.client.all_purchase_sum_uzs || '0'))}</p>
                                    <p><strong>{t('purchaseCount')}:</strong> {clientData.client.purchaseNum}</p>
                                    <p><strong>{t('lastPurchase')}:</strong> {formatDate(clientData.client.lastTransactionDate)}</p>
                                    {clientData.clientBalance && clientData.clientBalance.length > 0 && (
                                        <div className="balance_details">
                                            {clientData.clientBalance.map((balance: ClientBalance, index: number) => (
                                                <div key={index}>
                                                    <p className='mb-12'><strong>{t('validUntil')}:</strong> {formatDate(balance.expireDate)}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <p className='main_loyalty_description'>
                                    {t('loyaltyDescription')}
                                </p>
                                <p>{t('loyaltyProgramDescription')}</p>
                                <br />
                                <p>{t('loyaltyProgramGoal')}</p>
                            </div>
                        </div>
                    </motion.div>
                );
            case 'support':
                return (
                    <motion.div {...fadeInUp} key="support">
                        <div className="profile-page-content">
                            <div className="big_inf">
                                {t('supportDescription')}
                            </div>
                            <div className="smal_inf">
                                {t.rich('supportHours', { br: () => <br /> })}
                            </div>
                            <div className="supp_block">
                                <div className="support_bottom_block">
                                    <h2 className='supp_page_head'>{t('supportTitle')}</h2>
                                    <div className="support_bottom_block_inner_wrap">
                                        <a href="https://t.me/abdelmansur" className="tg_chat_btn" target="_blank" rel="noopener noreferrer">
                                            <img alt="" src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Artboard.svg" />
                                            <span>{t('openChat')}</span>
                                        </a>
                                        <div className="support-contacts">
                                            <p style={{ whiteSpace: "nowrap" }}>+998 95 099 00 90</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="contacts-social-links">
                                    <a href="https://www.instagram.com/vitaline.optom/" className="contacts_insta">
                                        <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Socials.svg" alt="" />
                                        <span>{t('instagram')}</span>
                                    </a>
                                    <a href="https://t.me/abdelmansur" className="contacts_telegram">
                                        <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Artboard.svg" alt="" />
                                        <span>{t('telegramChat')}</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                );
            default:
                return null;
        }
    };
    const menuItems = (
        <ul>
            <li className={activeSection === 'profile' ? 'active' : ''}
                onClick={() => {
                    if (window.innerWidth <= 768) {
                        if (activeSection === 'profile') {
                            setIsMenuOpen(!isMenuOpen);
                        } else {
                            setActiveSection('profile');
                            setIsMenuOpen(false);
                        }
                    } else {
                        setActiveSection('profile');
                    }
                }}>
                <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/icon_profile.png" alt={t('profileIconAlt')} />
                <span>{t('myProfile')}</span>
            </li>
            <li className={activeSection === 'orders' ? 'active' : ''}
                onClick={() => {
                    if (window.innerWidth <= 768) {
                        if (activeSection === 'orders') {
                            setIsMenuOpen(!isMenuOpen);
                        } else {
                            setActiveSection('orders');
                            setIsMenuOpen(false);
                        }
                    } else {
                        setActiveSection('orders');
                    }
                }}>
                <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/icon_cart.png" alt={t('ordersIconAlt')} />
                <span>{t('myOrders')}</span>
            </li>
            <li className={activeSection === 'points' ? 'active' : ''}
                onClick={() => {
                    if (window.innerWidth <= 768) {
                        if (activeSection === 'points') {
                            setIsMenuOpen(!isMenuOpen);
                        } else {
                            setActiveSection('points');
                            setIsMenuOpen(false);
                        }
                    } else {
                        setActiveSection('points');
                    }
                }}>
                <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/icon_points.png" alt={t('pointsIconAlt')} />
                <span>{t('myPoints')}</span>
            </li>
            <li className={activeSection === 'support' ? 'active' : ''}
                onClick={() => {
                    if (window.innerWidth <= 768) {
                        if (activeSection === 'support') {
                            setIsMenuOpen(!isMenuOpen);
                        } else {
                            setActiveSection('support');
                            setIsMenuOpen(false);
                        }
                    } else {
                        setActiveSection('support');
                    }
                }}>
                <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/icon_support.png" alt={t('supportIconAlt')} />
                <span>{t('support')}</span>
            </li>
            <div className='side_nav_divider'></div>
            <li className="logout" onClick={resetAuthFlow}>
                <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/icon_logout.png" alt={t('logoutIconAlt')} />
                <span>{t('logout')}</span>
            </li>
        </ul>
    );
    const RegistrationModal = () => {
        if (!showRegistrationModal) return null;
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg max-w-md w-full p-6 relative animate-fade-in">
                    {/* Кнопка закрытия */}
                    <button
                        onClick={() => setShowRegistrationModal(false)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-light"
                    >
                        ×
                    </button>
                    {/* Контент */}
                    <div className="mt-8">
                        <div className="text-center mb-6">
                            <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                                <img src="/vitaline-apple-icon-180.png" className='w-[70%]' />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                {t('registrationTitle')}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {t('registrationSubtitle')}
                            </p>
                        </div>
                        {/* Шаги */}
                        <div className="space-y-3 mb-6">
                            <div className="flex items-start space-x-3">
                                <div className="text-lg">1️⃣</div>
                                <div className="text-sm text-gray-700 leading-relaxed">
                                    {t('step1')}
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="text-lg">2️⃣</div>
                                <div className="text-sm text-gray-700 leading-relaxed">
                                    {t('step2')}
                                </div>
                            </div>
                        </div>
                        {/* Кнопки */}
                        <div className="space-y-3">
                            <a
                                href="https://t.me/abdelmansur"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-[#64B704] hover:bg-[#5ca903] text-white py-3 px-4 rounded-lg font-medium text-center block transition-colors duration-200"
                                onClick={() => setShowRegistrationModal(false)}
                            >
                                {t('writeToAbdelmansur')}
                            </a>
                            <button
                                onClick={() => setShowRegistrationModal(false)}
                                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors duration-200"
                            >
                                {t('close')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    return (
        <>
            <AnimatedWrapper>
                <div className="profile-container">
                    <aside className="sidebar_profile">
                        <div className="mobile-dropdown-header" onClick={() => {
                            if (window.innerWidth <= 768) {
                                setIsMenuOpen(!isMenuOpen);
                            }
                        }}>
                            <span>
                                {
                                    activeSection === 'profile' ? t('myProfile') :
                                        activeSection === 'orders' ? t('myOrders') :
                                            // activeSection === 'favorites' ? 'Избранное' :
                                            activeSection === 'points' ? t('myPoints') :
                                                activeSection === 'support' ? t('support') : ''
                                }
                            </span>
                            <span className={`dropdown-arrow ${isMenuOpen ? 'open' : ''}`}>▼</span>
                        </div>
                        <div className={`menu-items ${isMenuOpen ? 'open' : ''}`}>
                            {menuItems}
                        </div>
                    </aside>
                    <main className="content-container">
                        {renderContent()}
                    </main>
                </div>
            </AnimatedWrapper>
            <RegistrationModal />
        </>
    );
}