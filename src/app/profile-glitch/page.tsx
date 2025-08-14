// // // // src/app/profile/page.tsx
// // 'use client';

// // import { useState, useEffect } from 'react';
// // import { useRouter } from 'next/navigation';
// // import { motion } from 'framer-motion';
// // import './profile.css';
// // import '../contacts/contacts.css';
// // import AnimatedWrapper from '@/components/animation/AnimatedWrapper'; // Импортируем AnimatedWrapper
// // // import Head from 'next/head';

// // // export const generateMetadata = () => {
// // //     return {
// // //         title: 'Личный кабинет - Vitaline',
// // //         description: 'Профиль | Служба поддержки',
// // //     };
// // // };


// // export default function ProfilePage() {
// //     const [activeSection, setActiveSection] = useState<'profile' | 'orders' | 'favorites' | 'points' | 'support'>('profile');
// //     const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
// //     const [userName, setUserName] = useState<string>('');
// //     const [userEmail, setUserEmail] = useState<string>('');
// //     const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
// //     const [checkedAuth, setCheckedAuth] = useState<boolean>(false); // Флаг, чтобы избежать повторной проверки
// //     const router = useRouter();

// //     useEffect(() => {
// //         document.title = 'Личный кабинет - Vitaline';
// //         const metaDescription = document.querySelector('meta[name="description"]');
// //         if (metaDescription) {
// //             metaDescription.setAttribute('content', 'Профиль | Служба поддержки');
// //         } else {
// //             const meta = document.createElement('meta');
// //             meta.name = 'description';
// //             meta.content = 'Профиль | Служба поддержки';
// //             document.head.appendChild(meta);
// //         }
// //     }, []);

// //     useEffect(() => {
// //         // Если уже проверили и установили состояние аутентификации, повторно не проверяем
// //         if (checkedAuth) return;

// //         const token = localStorage.getItem('authToken');
// //         const loginTimestamp = localStorage.getItem('loginTimestamp');
// //         const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;

// //         if (!token || !loginTimestamp) {
// //             router.replace('/login');
// //             return;
// //         }

// //         const loginTime = parseInt(loginTimestamp, 10);
// //         const now = Date.now();

// //         if (now - loginTime > sevenDaysInMs) {
// //             // Токен просрочен
// //             localStorage.removeItem('authToken');
// //             localStorage.removeItem('loginTimestamp');
// //             router.replace('/login');
// //             return;
// //         }

// //         const viewerQuery = {
// //             query: `
// //                 query Viewer {
// //                     viewer {
// //                         id
// //                         name
// //                         email
// //                     }
// //                 }
// //             `
// //         };

// //         async function loadUser() {
// //             try {
// //                 const response = await fetch('https://nuxt.vitaline.uz/graphql', {
// //                     method: 'POST',
// //                     headers: {
// //                         'Content-Type': 'application/json',
// //                         'Authorization': `Bearer ${token}`
// //                     },
// //                     body: JSON.stringify(viewerQuery),
// //                 });

// //                 const result = await response.json();

// //                 if (response.ok && result.data?.viewer) {
// //                     setUserName(result.data.viewer.name || '');
// //                     setUserEmail(result.data.viewer.email || '');
// //                     setIsAuthenticated(true);
// //                 } else {
// //                     localStorage.removeItem('authToken');
// //                     localStorage.removeItem('loginTimestamp');
// //                     router.replace('/login');
// //                 }
// //             } catch (error) {
// //                 console.error('Ошибка при получении данных пользователя:', error);
// //                 localStorage.removeItem('authToken');
// //                 localStorage.removeItem('loginTimestamp');
// //                 router.replace('/login');
// //             } finally {
// //                 setCheckedAuth(true); // Помечаем, что проверка завершена
// //             }
// //         }

// //         loadUser();
// //     }, [router, checkedAuth]);

// //     // Пока не проверили — не отображаем ничего (можно поставить лоадер)
// //     if (!checkedAuth) {
// //         return null;
// //     }

// //     // Если проверка прошла, но пользователь не авторизован (был редирект), 
// //     // код ниже не исполнится, так как роутер перенаправит на /login.
// //     if (!isAuthenticated) {
// //         return null;
// //     }

// //     const renderContent = () => {
// //         const fadeInUp = {
// //             initial: { opacity: 0, y: 20 },
// //             animate: { opacity: 1, y: 0 },
// //             exit: { opacity: 0, y: 20 },
// //             transition: { duration: 0.5, ease: 'easeOut' },
// //         };

// //         switch (activeSection) {
// //             case 'profile':
// //                 return (
// //                     <motion.div {...fadeInUp} key="profile">
// //                         <div className="profile-page-content">
// //                             <h2>Персональная информация</h2>
// //                             <form className='profile_form' action="">
// //                                 <div className="form-group">
// //                                     <label>Имя</label>
// //                                     <input type="text" value={userName} readOnly />
// //                                 </div>
// //                                 <div className="form-group">
// //                                     <label>Телефон</label>
// //                                     <input type="text" placeholder="+998 XX XXX-XX-XX" />
// //                                 </div>
// //                                 <div className="form-group">
// //                                     <label>Электронная почта</label>
// //                                     <input type="email" value={userEmail} disabled />
// //                                 </div>
// //                                 <button className="save-button">Сохранить ваш номер телефона</button>
// //                             </form>
// //                         </div>
// //                     </motion.div>
// //                 );
// //             case 'orders':
// //                 return (
// //                     <motion.div {...fadeInUp} key="orders">
// //                         <div className="profile-page-content">
// //                             <h2>Мои заказы</h2>
// //                             <table className="orders-table">
// //                                 <thead>
// //                                     <tr>
// //                                         <th>Номер заказа</th>
// //                                         <th>Дата заказа</th>
// //                                         <th>Тип доставки</th>
// //                                         <th>Тип оплаты</th>
// //                                         <th>Стоимость</th>
// //                                         <th>Текущий статус</th>
// //                                     </tr>
// //                                 </thead>
// //                                 <tbody>
// //                                     <tr>
// //                                         <td data-label="Номер заказа"><span className="order-number">№ 3620133837</span></td>
// //                                         <td>23.11.2024</td>
// //                                         <td>Курьерская доставка</td>
// //                                         <td>Оплата картой</td>
// //                                         <td><strong>1 500 000 сум</strong></td>
// //                                         <td><span className="status accepted">Принят</span></td>
// //                                     </tr>
// //                                     <tr>
// //                                         <td><span className="order-number">№ 3620133837</span></td>
// //                                         <td>23.11.2024</td>
// //                                         <td>Самовывоз из магазина</td>
// //                                         <td>Оплата курьеру</td>
// //                                         <td><strong>1 500 000 сум</strong></td>
// //                                         <td><span className="status completed">Выполнен</span></td>
// //                                     </tr>
// //                                     <tr>
// //                                         <td><span className="order-number">№ 3620133837</span></td>
// //                                         <td>23.11.2024</td>
// //                                         <td>Курьерская доставка</td>
// //                                         <td>Оплата картой</td>
// //                                         <td><strong>1 500 000 сум</strong></td>
// //                                         <td><span className="status completed">Выполнен</span></td>
// //                                     </tr>
// //                                     <tr>
// //                                         <td><span className="order-number">№ 3620133837</span></td>
// //                                         <td>23.11.2024</td>
// //                                         <td>Курьерская доставка</td>
// //                                         <td>Оплата картой</td>
// //                                         <td><strong>1 500 000 сум</strong></td>
// //                                         <td><span className="status completed">Выполнен</span></td>
// //                                     </tr>
// //                                     <tr>
// //                                         <td><span className="order-number">№ 3620133837</span></td>
// //                                         <td>12.12.2024</td>
// //                                         <td>Курьерская доставка</td>
// //                                         <td>Оплата курьеру</td>
// //                                         <td><strong>1 500 000 сум</strong></td>
// //                                         <td><span className="status completed">Выполнен</span></td>
// //                                     </tr>
// //                                 </tbody>
// //                             </table>
// //                         </div>
// //                     </motion.div >
// //                 );
// //             case 'favorites':
// //                 return (
// //                     <motion.div {...fadeInUp} key="favorites">
// //                         <div className="profile-page-content">
// //                             <h2>Избранное</h2>
// //                             <p>Ваши избранные товары пусты.</p>
// //                         </div>
// //                     </motion.div>
// //                 );
// //             case 'points':
// //                 return (
// //                     <motion.div {...fadeInUp} key="points">
// //                         <div className="profile-page-content">
// //                             <h2>Ваша накопительная карта</h2>
// //                             <div className="current_balance">
// //                                 Текущий баланс: <span className='billz_point_value'>200 000</span> баллов
// //                             </div>
// //                             <div className="loyalty_image_block">
// //                                 <img className='billz_cart_barcode' src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/913b2275733069210a8b889e89467b57.png" alt="barcode" />
// //                                 <span className='billz_cart_number'>75894 2544 4989 15615</span>
// //                             </div>
// //                             <div className="loyalty_description_block">
// //                                 <p className='main_loyalty_description'>
// //                                     ❇️ При покупке наших товаров отправляйте нам скриншот вашей карты и следите за вашими покупками,
// //                                     и программой лояльности прямо внутри бота.
// //                                 </p>
// //                                 <p>Программа лояльности Vitaline направлена на создание долгосрочных отношений с клиентами, предлагая им не только выгодные условия, но и возможность быть частью сообщества, заботящегося о здоровье.</p>
// //                                 <br />
// //                                 <p>С помощью этой программы Vitaline стремится сделать каждую покупку более приятной и выгодной для своих клиентов!</p>
// //                             </div>
// //                         </div>
// //                     </motion.div>
// //                 );
// //             case 'support':
// //                 return (
// //                     <motion.div {...fadeInUp} key="support">
// //                         <div className="profile-page-content">
// //                             {/* <h2>Служба поддержки</h2> */}
// //                             <div className="big_inf">
// //                                 Свяжитесь с нами и мы поможем с любым вопросом касаемо внутренних процессов Vitaline - ассортимент, заказы, доставка.
// //                             </div>

// //                             <div className="smal_inf">
// //                                 Рабочие дни с 9:00 до 19:00,
// //                                 <br />прием заказов online 24/7
// //                             </div>

// //                             <div className="supp_block">

// //                                 <div className="support_bottom_block">
// //                                     <h2 className='supp_page_head'>Служба поддержки Vitaline</h2>
// //                                     <div className="support_bottom_block_inner_wrap">
// //                                         <a href="https://t.me/support_chat" className="tg_chat_btn" target="_blank" rel="noopener noreferrer">
// //                                             <img alt="" src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Artboard.svg" />
// //                                             <span>Открыть чат</span>
// //                                         </a>
// //                                         <div className="support-contacts">
// //                                             <p style={{ whiteSpace: "nowrap" }}>+998 90 906 69 99</p>
// //                                         </div>
// //                                     </div>
// //                                 </div>

// //                                 <div className="contacts-social-links">
// //                                     <a href="#" className="contacts_insta">
// //                                         <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Socials.svg" alt="" />
// //                                         <span>Инстаграм @vitaline.uz</span>
// //                                     </a>
// //                                     <a href="#" className="contacts_telegram">
// //                                         <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Artboard.svg" alt="" />
// //                                         <span>Телеграм-канал Vitaline</span>
// //                                     </a>
// //                                 </div>

// //                             </div>

// //                         </div>
// //                     </motion.div>
// //                 );
// //             default:
// //                 return null;
// //         }
// //     };

// //     const menuItems = (
// //         <ul>
// //             <li className={activeSection === 'profile' ? 'active' : ''}
// //                 onClick={() => {
// //                     if (window.innerWidth <= 768) {
// //                         // Мобильная версия: при клике по активному пункту — переключаем раскрытие меню
// //                         if (activeSection === 'profile') {
// //                             setIsMenuOpen(!isMenuOpen);
// //                         } else {
// //                             setActiveSection('profile');
// //                             setIsMenuOpen(false);
// //                         }
// //                     } else {
// //                         setActiveSection('profile');
// //                     }
// //                 }}>
// //                 <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/icon_profile.png" alt="Иконка профиля" />
// //                 <span>Мой профиль</span>
// //             </li>
// //             <li className={activeSection === 'orders' ? 'active' : ''}
// //                 onClick={() => {
// //                     if (window.innerWidth <= 768) {
// //                         if (activeSection === 'orders') {
// //                             setIsMenuOpen(!isMenuOpen);
// //                         } else {
// //                             setActiveSection('orders');
// //                             setIsMenuOpen(false);
// //                         }
// //                     } else {
// //                         setActiveSection('orders');
// //                     }
// //                 }}>
// //                 <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/icon_cart.png" alt="Иконка заказы" />
// //                 <span>Мои заказы</span>
// //             </li>
// //             <li className={activeSection === 'favorites' ? 'active' : ''}
// //                 onClick={() => {
// //                     if (window.innerWidth <= 768) {
// //                         if (activeSection === 'favorites') {
// //                             setIsMenuOpen(!isMenuOpen);
// //                         } else {
// //                             setActiveSection('favorites');
// //                             setIsMenuOpen(false);
// //                         }
// //                     } else {
// //                         setActiveSection('favorites');
// //                     }
// //                 }}>
// //                 <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/icon_favorite.png" alt="Иконка Избранное" />
// //                 <span>Избранное</span>
// //             </li>
// //             <li className={activeSection === 'points' ? 'active' : ''}
// //                 onClick={() => {
// //                     if (window.innerWidth <= 768) {
// //                         if (activeSection === 'points') {
// //                             setIsMenuOpen(!isMenuOpen);
// //                         } else {
// //                             setActiveSection('points');
// //                             setIsMenuOpen(false);
// //                         }
// //                     } else {
// //                         setActiveSection('points');
// //                     }
// //                 }}>
// //                 <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/icon_points.png" alt="Иконка баллы" />
// //                 <span>Мои баллы</span>
// //             </li>
// //             <li className={activeSection === 'support' ? 'active' : ''}
// //                 onClick={() => {
// //                     if (window.innerWidth <= 768) {
// //                         if (activeSection === 'support') {
// //                             setIsMenuOpen(!isMenuOpen);
// //                         } else {
// //                             setActiveSection('support');
// //                             setIsMenuOpen(false);
// //                         }
// //                     } else {
// //                         setActiveSection('support');
// //                     }
// //                 }}>
// //                 <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/icon_support.png" alt="Иконка поддержки" />
// //                 <span>Служба поддержки</span>
// //             </li>

// //             <div className='side_nav_divider'></div>

// //             <li
// //                 onClick={() => {
// //                     localStorage.removeItem('authToken');
// //                     localStorage.removeItem('loginTimestamp');
// //                     window.location.href = '/login';
// //                 }}
// //                 className="logout"
// //             >
// //                 <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/icon_logout.png" alt="Иконка выхода" />
// //                 <span>Выйти</span>
// //             </li>
// //         </ul>
// //     );

// //     return (

// //         <>

// //             <AnimatedWrapper>

// //                 <div className="profile-container">
// //                     <aside className="sidebar_profile">
// //                         {/* На мобильной версии отображаем активный пункт и стрелочку. 
// //                     При клике по активному пункту — раскрываем/скрываем меню */}

// //                         <div className="mobile-dropdown-header" onClick={() => {
// //                             if (window.innerWidth <= 768) {
// //                                 setIsMenuOpen(!isMenuOpen);
// //                             }
// //                         }}>
// //                             <span>
// //                                 {
// //                                     // Показываем название активного пункта на мобильном
// //                                     activeSection === 'profile' ? 'Мой профиль' :
// //                                         activeSection === 'orders' ? 'Мои заказы' :
// //                                             activeSection === 'favorites' ? 'Избранное' :
// //                                                 activeSection === 'points' ? 'Мои баллы' :
// //                                                     activeSection === 'support' ? 'Служба поддержки' : ''
// //                                 }
// //                             </span>
// //                             {/* Стрелочка вниз/вверх */}
// //                             <span
// //                                 className={`dropdown-arrow ${isMenuOpen ? 'open' : ''}`}
// //                             >▼
// //                             </span>
// //                         </div>

// //                         {/* Десктопная версия: меню всегда показано. 
// //                     Мобильная версия: при isMenuOpen=true показываем все пункты */}
// //                         <div className={`menu-items ${isMenuOpen ? 'open' : ''}`}>
// //                             {menuItems}
// //                         </div>
// //                     </aside >

// //                     <main className="content-container">
// //                         {renderContent()}
// //                     </main>
// //                 </div >

// //             </AnimatedWrapper>

// //         </>
// //     );
// // }





// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';
// import './profile.css';
// import '../contacts/contacts.css';
// import AnimatedWrapper from '@/components/animation/AnimatedWrapper';

// export default function ProfilePage() {
//     const [activeSection, setActiveSection] = useState<'profile' | 'orders' | 'favorites' | 'points' | 'support'>('profile');
//     // Убираем проверку аутентификации - всегда true
//     const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
//     // Устанавливаем тестовые данные пользователя
//     const [userName, setUserName] = useState<string>('Тестовый пользователь');
//     const [userEmail, setUserEmail] = useState<string>('test@example.com');
//     const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
//     const router = useRouter();

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
//     }, []);

//     // УБИРАЕМ ВСЮ ПРОВЕРКУ АВТОРИЗАЦИИ
//     // useEffect(() => {
//     //     if (checkedAuth) return;
//     //     const token = localStorage.getItem('authToken');
//     //     // ... весь код проверки токена
//     // }, [router, checkedAuth]);

//     const renderContent = () => {
//         const fadeInUp = {
//             initial: { opacity: 0, y: 20 },
//             animate: { opacity: 1, y: 0 },
//             exit: { opacity: 0, y: 20 },
//             transition: { duration: 0.5, ease: 'easeOut' },
//         };

//         switch (activeSection) {
//             case 'profile':
//                 return (
//                     <motion.div {...fadeInUp} key="profile">
//                         <div className="profile-page-content">
//                             <h2>Персональная информация</h2>
//                             <form className='profile_form' action="">
//                                 <div className="form-group">
//                                     <label>Имя</label>
//                                     <input type="text" value={userName} readOnly />
//                                 </div>
//                                 <div className="form-group">
//                                     <label>Телефон</label>
//                                     <input type="text" placeholder="+998 XX XXX-XX-XX" />
//                                 </div>
//                                 <div className="form-group">
//                                     <label>Электронная почта</label>
//                                     <input type="email" value={userEmail} disabled />
//                                 </div>
//                                 <button className="save-button">Сохранить ваш номер телефона</button>
//                             </form>
//                         </div>
//                     </motion.div>
//                 );
//             case 'orders':
//                 return (
//                     <motion.div {...fadeInUp} key="orders">
//                         <div className="profile-page-content">
//                             <h2>Мои заказы</h2>
//                             <table className="orders-table">
//                                 <thead>
//                                     <tr>
//                                         <th>Номер заказа</th>
//                                         <th>Дата заказа</th>
//                                         <th>Тип доставки</th>
//                                         <th>Тип оплаты</th>
//                                         <th>Стоимость</th>
//                                         <th>Текущий статус</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     <tr>
//                                         <td data-label="Номер заказа"><span className="order-number">№ 3620133837</span></td>
//                                         <td>23.11.2024</td>
//                                         <td>Курьерская доставка</td>
//                                         <td>Оплата картой</td>
//                                         <td><strong>1 500 000 сум</strong></td>
//                                         <td><span className="status accepted">Принят</span></td>
//                                     </tr>
//                                     <tr>
//                                         <td><span className="order-number">№ 3620133837</span></td>
//                                         <td>23.11.2024</td>
//                                         <td>Самовывоз из магазина</td>
//                                         <td>Оплата курьеру</td>
//                                         <td><strong>1 500 000 сум</strong></td>
//                                         <td><span className="status completed">Выполнен</span></td>
//                                     </tr>
//                                     <tr>
//                                         <td><span className="order-number">№ 3620133837</span></td>
//                                         <td>23.11.2024</td>
//                                         <td>Курьерская доставка</td>
//                                         <td>Оплата картой</td>
//                                         <td><strong>1 500 000 сум</strong></td>
//                                         <td><span className="status completed">Выполнен</span></td>
//                                     </tr>
//                                     <tr>
//                                         <td><span className="order-number">№ 3620133837</span></td>
//                                         <td>23.11.2024</td>
//                                         <td>Курьерская доставка</td>
//                                         <td>Оплата картой</td>
//                                         <td><strong>1 500 000 сум</strong></td>
//                                         <td><span className="status completed">Выполнен</span></td>
//                                     </tr>
//                                     <tr>
//                                         <td><span className="order-number">№ 3620133837</span></td>
//                                         <td>12.12.2024</td>
//                                         <td>Курьерская доставка</td>
//                                         <td>Оплата курьеру</td>
//                                         <td><strong>1 500 000 сум</strong></td>
//                                         <td><span className="status completed">Выполнен</span></td>
//                                     </tr>
//                                 </tbody>
//                             </table>
//                         </div>
//                     </motion.div >
//                 );
//             case 'favorites':
//                 return (
//                     <motion.div {...fadeInUp} key="favorites">
//                         <div className="profile-page-content">
//                             <h2>Избранное</h2>
//                             <p>Ваши избранные товары пусты.</p>
//                         </div>
//                     </motion.div>
//                 );
//             case 'points':
//                 return (
//                     <motion.div {...fadeInUp} key="points">
//                         <div className="profile-page-content">
//                             <h2>Ваша накопительная карта</h2>
//                             <div className="current_balance">
//                                 Текущий баланс: <span className='billz_point_value'>200 000</span> баллов
//                             </div>
//                             <div className="loyalty_image_block">
//                                 <img className='billz_cart_barcode' src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/913b2275733069210a8b889e89467b57.png" alt="barcode" />
//                                 <span className='billz_cart_number'>75894 2544 4989 15615</span>
//                             </div>
//                             <div className="loyalty_description_block">
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
//                                         <a href="https://t.me/support_chat" className="tg_chat_btn" target="_blank" rel="noopener noreferrer">
//                                             <img alt="" src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Artboard.svg" />
//                                             <span>Открыть чат</span>
//                                         </a>
//                                         <div className="support-contacts">
//                                             <p style={{ whiteSpace: "nowrap" }}>+998 90 906 69 99</p>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="contacts-social-links">
//                                     <a href="#" className="contacts_insta">
//                                         <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Socials.svg" alt="" />
//                                         <span>Инстаграм @vitaline.uz</span>
//                                     </a>
//                                     <a href="#" className="contacts_telegram">
//                                         <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Artboard.svg" alt="" />
//                                         <span>Телеграм-канал Vitaline</span>
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
//             <li className={activeSection === 'favorites' ? 'active' : ''}
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
//             </li>
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

//             {/* Убираем функционал выхода или делаем его неактивным */}
//             <li className="logout" style={{ opacity: 0.5, pointerEvents: 'none' }}>
//                 <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/icon_logout.png" alt="Иконка выхода" />
//                 <span>Выйти</span>
//             </li>
//         </ul>
//     );

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
//                                             activeSection === 'favorites' ? 'Избранное' :
//                                                 activeSection === 'points' ? 'Мои баллы' :
//                                                     activeSection === 'support' ? 'Служба поддержки' : ''
//                                 }
//                             </span>
//                             <span className={`dropdown-arrow ${isMenuOpen ? 'open' : ''}`}>▼</span>
//                         </div>

//                         <div className={`menu-items ${isMenuOpen ? 'open' : ''}`}>
//                             {menuItems}
//                         </div>
//                     </aside >

//                     <main className="content-container">
//                         {renderContent()}
//                     </main>
//                 </div >
//             </AnimatedWrapper>
//         </>
//     );
// }





'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import axios, { AxiosError } from 'axios';
import './profile.css';
import '../contacts/contacts.css';
import AnimatedWrapper from '@/components/animation/AnimatedWrapper';

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

export default function ProfilePage() {
    const [activeSection, setActiveSection] = useState<'profile' | 'orders' | 'favorites' | 'points' | 'support'>('profile');
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [phone, setPhone] = useState<string>('');
    const [clientData, setClientData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [hasSearched, setHasSearched] = useState<boolean>(false);
    const [expandedOrders, setExpandedOrders] = useState<Set<number>>(new Set());
    const router = useRouter();

    //логи
    const [fullApiResponse, setFullApiResponse] = useState<any>(null);

    useEffect(() => {
        document.title = 'Личный кабинет - Vitaline';
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', 'Профиль | Служба поддержки');
        } else {
            const meta = document.createElement('meta');
            meta.name = 'description';
            meta.content = 'Профиль | Служба поддержки';
            document.head.appendChild(meta);
        }
    }, []);

    // Функция для очистки номера телефона
    const cleanPhoneNumber = (input: string): string => {
        return input.replace(/[\s\-\(\)+]/g, '');
    };

    const fetchClientData = async (phoneNumber: string): Promise<void> => {
        try {
            setLoading(true);
            setError('');

            const apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC93b28uYmlsbHoudXpcL2JpbGx6IiwiaWF0IjoxNTM5ODQ2MjIxLCJleHAiOjI1MjYzNzA0MzEsInN1YiI6InZpdGFsaW5lLnZpdGFsaW5ldXoifQ.fGGbJRrKsKT4AezeD2fB6sC9cKNL9Sxn33TNGiUExKQ';

            const requestData = {
                jsonrpc: '2.0',
                method: 'client.search',
                params: {
                    phoneNumber: phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`,
                },
                id: '1'
            };

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
                setError(`Ошибка API: ${response.data.error.message}`);
                setClientData(null);
                return;
            }

            if (response.data.result && response.data.result.clients && response.data.result.clients.length > 0) {
                setClientData(response.data.result.clients[0]);
                setError('');
            } else {
                setError('Клиент с таким номером не найден');
                setClientData(null);
            }
        } catch (err) {
            const axiosError = err as AxiosError<{ message?: string }>;
            setError('Ошибка при загрузке данных. Проверьте номер телефона.');
            setClientData(null);
        } finally {
            setLoading(false);
            setHasSearched(true);
        }
    };

    const handlePhoneSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (phone.length >= 12) {
            fetchClientData(phone);
        }
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU');
    };

    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat('ru-RU').format(price) + ' сум';
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

        // Если нет данных, показываем форму поиска
        if (!clientData) {
            return (
                <motion.div {...fadeInUp} key="search">
                    <div className="profile-page-content">
                        <h2>Поиск профиля по номеру телефона</h2>
                        <form onSubmit={handlePhoneSubmit} className='profile_form'>
                            <div className="form-group">
                                <label>Номер телефона</label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(cleanPhoneNumber(e.target.value))}
                                    placeholder="+998901234567"
                                    required
                                />
                            </div>
                            <button type="submit" className="save-button" disabled={loading}>
                                {loading ? 'Поиск...' : 'Найти профиль'}
                            </button>
                        </form>
                        {error && <p className="error-message">{error}</p>}
                        {hasSearched && !clientData && !loading && (
                            <div className="no-results-message">
                                <p>Профиль не найден. Проверьте правильность номера телефона.</p>
                            </div>
                        )}
                    </div>
                </motion.div>
            );
        }

        switch (activeSection) {
            case 'profile':
                return (
                    <motion.div {...fadeInUp} key="profile">
                        <div className="profile-page-content">
                            <h2>Персональная информация</h2>

                            {/* //логи */}
                            {fullApiResponse && (
                                <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f5f5f5', border: '1px solid #ddd', borderRadius: '5px' }}>
                                    <h3>Полный ответ от Billz API:</h3>
                                    <pre style={{ fontSize: '12px', overflow: 'auto', maxHeight: '300px' }}>
                                        {JSON.stringify(fullApiResponse, null, 2)}
                                    </pre>
                                </div>
                            )}

                            <div className='profile_form'>
                                <div className="form-group">
                                    <label>Имя</label>
                                    <input type="text" value={`${clientData.client.firstName} ${clientData.client.lastName}`} readOnly />
                                </div>
                                <div className="form-group">
                                    <label>Телефон</label>
                                    <input type="text" value={phone} readOnly />
                                </div>
                                <div className="form-group">
                                    <label>Номер карты</label>
                                    <input type="text" value={clientData.clientCard?.[0]?.cardNumber || clientData.client.cardNumbers} readOnly />
                                </div>
                                <div className="form-group">
                                    <label>Дата регистрации</label>
                                    <input type="text" value={formatDate(clientData.client.insDate)} readOnly />
                                </div>
                                <div className="form-group">
                                    <label>Статус</label>
                                    <input type="text" value={clientData.client.State === '1' ? 'Активен' : 'Неактивен'} readOnly />
                                </div>
                                <button
                                    className="save-button"
                                    onClick={() => {
                                        setClientData(null);
                                        setPhone('');
                                        setHasSearched(false);
                                    }}
                                >
                                    Изменить номер телефона
                                </button>
                            </div>
                        </div>
                    </motion.div>
                );
            case 'orders':
                return (
                    <motion.div {...fadeInUp} key="orders">
                        <div className="profile-page-content">
                            <h2>Мои заказы</h2>
                            {clientData.transactions && clientData.transactions.length > 0 ? (
                                <>
                                    {/* Десктопная версия */}
                                    <div className="orders-desktop">
                                        <table className="orders-table">
                                            <thead>
                                                <tr>
                                                    <th>Номер заказа</th>
                                                    <th>Дата заказа</th>
                                                    <th>Тип доставки</th>
                                                    <th>Тип оплаты</th>
                                                    <th>Стоимость</th>
                                                    <th>Текущий статус</th>
                                                    <th>Детали</th>
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
                                                        <>
                                                            <tr
                                                                key={transaction.id}
                                                                className="order-row"
                                                                onClick={() => toggleOrderExpansion(transaction.id)}
                                                            >
                                                                <td data-label="Номер заказа">
                                                                    <span className="order-number">№ {transaction.id}</span>
                                                                </td>
                                                                <td>{formatDate(transaction.saleDate)}</td>
                                                                <td>Курьерская доставка</td>
                                                                <td>{payment?.paymentTypeID || 'Наличные'}</td>
                                                                <td><strong>{formatPrice(transaction.salePriceUZS?.Float64 || 0)}</strong></td>
                                                                <td><span className="status completed">Выполнен</span></td>
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
                                                                            <h4>Детали заказа № {transaction.id}</h4>

                                                                            {details.length > 0 ? (
                                                                                <div className="order-products">
                                                                                    {details.map((detail: TransactionDetail, index: number) => (
                                                                                        <div key={index} className="product-item">
                                                                                            <div className="product-info">
                                                                                                <div className="product-main">
                                                                                                    <h5>{detail.name}</h5>
                                                                                                    <div className="product-meta">
                                                                                                        <span>Бренд: {detail.brand}</span>
                                                                                                        <span>Категория: {detail.category}</span>
                                                                                                        <span>Артикул: {detail.vendorCode}</span>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="product-price">
                                                                                                    <div className="price">{formatPrice(detail.salePriceUZS?.Float64 || 0)}</div>
                                                                                                    <div className="quantity">Количество: {detail.quantity}</div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    ))}

                                                                                    <div className="order-summary">
                                                                                        <div className="summary-row">
                                                                                            <span>Способ оплаты:</span>
                                                                                            <span>{payment?.paymentTypeID || 'Не указан'}</span>
                                                                                        </div>
                                                                                        <div className="summary-row total">
                                                                                            <span>Итого:</span>
                                                                                            <span>{formatPrice(transaction.salePriceUZS?.Float64 || 0)}</span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            ) : (
                                                                                <p>Информация о товарах недоступна</p>
                                                                            )}
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        </>
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
                                                                <span className="status completed">Выполнен</span>
                                                            </div>
                                                            <div className="mobile-order-info">
                                                                <div className="mobile-order-date">
                                                                    {formatDate(transaction.saleDate)}
                                                                </div>
                                                                <div className="mobile-order-price">
                                                                    <strong>{formatPrice(transaction.salePriceUZS?.Float64 || 0)}</strong>
                                                                </div>
                                                            </div>
                                                            <div className="mobile-order-meta">
                                                                <div>Курьерская доставка</div>
                                                                <div>{payment?.paymentTypeID || 'Наличные'}</div>
                                                            </div>
                                                        </div>
                                                        <div className={`order-arrow ${isExpanded ? 'expanded' : ''}`}>
                                                            ▼
                                                        </div>
                                                    </div>

                                                    {isExpanded && (
                                                        <div className="mobile-order-details">
                                                            <h4>Детали заказа</h4>

                                                            {details.length > 0 ? (
                                                                <div className="mobile-order-products">
                                                                    {details.map((detail: TransactionDetail, index: number) => (
                                                                        <div key={index} className="mobile-product-item">
                                                                            <h5>{detail.name}</h5>
                                                                            <div className="mobile-product-meta">
                                                                                <div>
                                                                                    <span>Бренд: {detail.brand}</span>
                                                                                    <span>Категория: {detail.category}</span>
                                                                                    <span>Артикул: {detail.vendorCode}</span>
                                                                                </div>
                                                                                <div className="mobile-product-price">
                                                                                    <div className="price">{formatPrice(detail.salePriceUZS?.Float64 || 0)}</div>
                                                                                    <div className="quantity">Кол-во: {detail.quantity}</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))}

                                                                    <div className="mobile-order-summary">
                                                                        <div className="summary-row">
                                                                            <span>Способ оплаты:</span>
                                                                            <span>{payment?.paymentTypeID || 'Не указан'}</span>
                                                                        </div>
                                                                        <div className="summary-row total">
                                                                            <span>Итого:</span>
                                                                            <span>{formatPrice(transaction.salePriceUZS?.Float64 || 0)}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <p>Информация о товарах недоступна</p>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </>
                            ) : (
                                <p>У вас пока нет заказов.</p>
                            )}
                        </div>
                    </motion.div>
                );
            case 'favorites':
                return (
                    <motion.div {...fadeInUp} key="favorites">
                        <div className="profile-page-content">
                            <h2>Избранное</h2>
                            <p>Ваши избранные товары пусты.</p>
                        </div>
                    </motion.div>
                );
            case 'points':
                return (
                    <motion.div {...fadeInUp} key="points">
                        <div className="profile-page-content">
                            <h2>Ваша накопительная карта</h2>
                            <div className="current_balance">
                                Текущий баланс: <span className='billz_point_value'>
                                    {clientData.client.balance?.Valid ?
                                        new Intl.NumberFormat('ru-RU').format(clientData.client.balance.Float64) : '0'
                                    }
                                </span> баллов
                            </div>

                            <div className="loyalty_image_block">
                                <img className='billz_cart_barcode' src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/913b2275733069210a8b889e89467b57.png" alt="barcode" />
                                <span className='billz_cart_number'>
                                    {clientData.clientCard?.[0]?.cardNumber || clientData.client.cardNumbers}
                                </span>
                            </div>

                            <div className="loyalty_description_block">
                                <div className="loyalty_stats">
                                    <h3>Статистика покупок</h3>
                                    <p><strong>Общая сумма покупок:</strong> {formatPrice(parseInt(clientData.client.all_purchase_sum_uzs || '0'))}</p>
                                    <p><strong>Количество покупок:</strong> {clientData.client.purchaseNum}</p>
                                    <p><strong>Последняя покупка:</strong> {formatDate(clientData.client.lastTransactionDate)}</p>

                                    {clientData.clientBalance && clientData.clientBalance.length > 0 && (
                                        <div className="balance_details">
                                            <h4>Детали баланса:</h4>
                                            {clientData.clientBalance.map((balance: ClientBalance, index: number) => (
                                                <div key={index}>
                                                    <p><strong>Тип:</strong> {balance.balanceTypeName}</p>
                                                    <p><strong>Действителен до:</strong> {formatDate(balance.expireDate)}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <p className='main_loyalty_description'>
                                    ❇️ При покупке наших товаров отправляйте нам скриншот вашей карты и следите за вашими покупками,
                                    и программой лояльности прямо внутри бота.
                                </p>
                                <p>Программа лояльности Vitaline направлена на создание долгосрочных отношений с клиентами, предлагая им не только выгодные условия, но и возможность быть частью сообщества, заботящегося о здоровье.</p>
                                <br />
                                <p>С помощью этой программы Vitaline стремится сделать каждую покупку более приятной и выгодной для своих клиентов!</p>
                            </div>
                        </div>
                    </motion.div>
                );
            case 'support':
                return (
                    <motion.div {...fadeInUp} key="support">
                        <div className="profile-page-content">
                            <div className="big_inf">
                                Свяжитесь с нами и мы поможем с любым вопросом касаемо внутренних процессов Vitaline - ассортимент, заказы, доставка.
                            </div>

                            <div className="smal_inf">
                                Рабочие дни с 9:00 до 19:00,
                                <br />прием заказов online 24/7
                            </div>

                            <div className="supp_block">
                                <div className="support_bottom_block">
                                    <h2 className='supp_page_head'>Служба поддержки Vitaline</h2>
                                    <div className="support_bottom_block_inner_wrap">
                                        <a href="https://t.me/support_chat" className="tg_chat_btn" target="_blank" rel="noopener noreferrer">
                                            <img alt="" src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Artboard.svg" />
                                            <span>Открыть чат</span>
                                        </a>
                                        <div className="support-contacts">
                                            <p style={{ whiteSpace: "nowrap" }}>+998 90 906 69 99</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="contacts-social-links">
                                    <a href="#" className="contacts_insta">
                                        <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Socials.svg" alt="" />
                                        <span>Инстаграм @vitaline.uz</span>
                                    </a>
                                    <a href="#" className="contacts_telegram">
                                        <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Artboard.svg" alt="" />
                                        <span>Телеграм-канал Vitaline</span>
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
                <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/icon_profile.png" alt="Иконка профиля" />
                <span>Мой профиль</span>
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
                <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/icon_cart.png" alt="Иконка заказы" />
                <span>Мои заказы</span>
            </li>
            <li className={activeSection === 'favorites' ? 'active' : ''}
                onClick={() => {
                    if (window.innerWidth <= 768) {
                        if (activeSection === 'favorites') {
                            setIsMenuOpen(!isMenuOpen);
                        } else {
                            setActiveSection('favorites');
                            setIsMenuOpen(false);
                        }
                    } else {
                        setActiveSection('favorites');
                    }
                }}>
                <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/icon_favorite.png" alt="Иконка Избранное" />
                <span>Избранное</span>
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
                <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/icon_points.png" alt="Иконка баллы" />
                <span>Мои баллы</span>
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
                <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/icon_support.png" alt="Иконка поддержки" />
                <span>Служба поддержки</span>
            </li>

            <div className='side_nav_divider'></div>

            <li className="logout" style={{ opacity: 0.5, pointerEvents: 'none' }}>
                <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/icon_logout.png" alt="Иконка выхода" />
                <span>Выйти</span>
            </li>
        </ul>
    );

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
                                    activeSection === 'profile' ? 'Мой профиль' :
                                        activeSection === 'orders' ? 'Мои заказы' :
                                            activeSection === 'favorites' ? 'Избранное' :
                                                activeSection === 'points' ? 'Мои баллы' :
                                                    activeSection === 'support' ? 'Служба поддержки' : ''
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
        </>
    );
}