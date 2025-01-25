// // src/app/profile/page.tsx

// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';
// import './profile.css';

// export default function ProfilePage() {
//     const [activeSection, setActiveSection] = useState<'profile' | 'orders' | 'favorites' | 'points' | 'support'>('profile');
//     const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//     const [userName, setUserName] = useState<string>('');
//     const [userEmail, setUserEmail] = useState<string>('');
//     const router = useRouter();

//     useEffect(() => {
//         const token = localStorage.getItem('authToken');
//         const loginTimestamp = localStorage.getItem('loginTimestamp');
//         const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;

//         // Проверка токена и истечения
//         if (!token || !loginTimestamp) {
//             // Нет токена или метки времени
//             router.replace('/login');
//             return;
//         }

//         const loginTime = parseInt(loginTimestamp, 10);
//         const now = Date.now();

//         if (now - loginTime > sevenDaysInMs) {
//             // Срок истёк
//             localStorage.removeItem('authToken');
//             localStorage.removeItem('loginTimestamp');
//             router.replace('/login');
//             return;
//         }

//         // Токен валиден по времени — загружаем данные пользователя
//         const viewerQuery = {
//             query: `
//                 query Viewer {
//                     viewer {
//                         id
//                         name
//                         email
//                     }
//                 }
//             `
//         };

//         async function loadUser() {
//             try {
//                 const response = await fetch('https://nuxt.vitaline.uz/graphql', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${token}`
//                     },
//                     body: JSON.stringify(viewerQuery),
//                 });

//                 const result = await response.json();

//                 if (response.ok && result.data?.viewer) {
//                     setUserName(result.data.viewer.name || '');
//                     setUserEmail(result.data.viewer.email || '');
//                     setIsAuthenticated(true);
//                 } else {
//                     // Невалидный токен или ошибка
//                     localStorage.removeItem('authToken');
//                     localStorage.removeItem('loginTimestamp');
//                     router.replace('/login');
//                 }
//             } catch (error) {
//                 console.error('Ошибка при получении данных пользователя:', error);
//                 localStorage.removeItem('authToken');
//                 localStorage.removeItem('loginTimestamp');
//                 router.replace('/login');
//             }
//         }

//         loadUser();
//     }, [router]);

//     if (!isAuthenticated) {
//         // Если ещё загружаем или редиректим, ничего не показываем
//         return null;
//     }

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
//                                     {/* Имя пользователя - неизменяемое поле */}
//                                     <input type="text" value={userName} readOnly />
//                                 </div>
//                                 <div className="form-group">
//                                     <label>Телефон</label>
//                                     {/* Телефон пока оставляем с плейсхолдером */}
//                                     <input type="text" placeholder="+998 XX XXX-XX-XX" />
//                                 </div>
//                                 <div className="form-group">
//                                     <label>Электронная почта</label>
//                                     {/* Email пользователя - disabled */}
//                                     <input type="email" value={userEmail} disabled />
//                                 </div>
//                                 <button className="save-button">Сохранить ваш номер телефорна</button>
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
//                                         <td><span className="order-number">№ 3620133837</span></td>
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
//                             <h2>Служба поддержки</h2>
//                             <p>Свяжитесь с нами для помощи.</p>
//                         </div>
//                     </motion.div>
//                 );
//             default:
//                 return null;
//         }
//     };

//     return (
//         <div className="profile-container">
//             <aside className="sidebar_profile">
//                 <ul>
//                     <li className={activeSection === 'profile' ? 'active' : ''} onClick={() => setActiveSection('profile')}>
//                         <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/icon_profile.png" alt="Иконка профиля" />
//                         <span>Мой профиль</span>
//                     </li>
//                     <li className={activeSection === 'orders' ? 'active' : ''} onClick={() => setActiveSection('orders')}>
//                         <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/icon_cart.png" alt="Иконка заказы" />
//                         <span>Мои заказы</span>
//                     </li>
//                     <li className={activeSection === 'favorites' ? 'active' : ''} onClick={() => setActiveSection('favorites')}>
//                         <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/icon_favorite.png" alt="Иконка Избранное" />
//                         <span>Избранное</span>
//                     </li>
//                     <li className={activeSection === 'points' ? 'active' : ''} onClick={() => setActiveSection('points')}>
//                         <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/icon_points.png" alt="Иконка баллы" />
//                         <span>Мои баллы</span>
//                     </li>
//                     <li className={activeSection === 'support' ? 'active' : ''} onClick={() => setActiveSection('support')}>
//                         <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/icon_support.png" alt="Иконка поддержки" />
//                         <span>Служба поддержки</span>
//                     </li>

//                     <div className='side_nav_divider'></div>

//                     <li
//                         onClick={() => {
//                             localStorage.removeItem('authToken');
//                             localStorage.removeItem('loginTimestamp');
//                             window.location.href = '/login';
//                         }}
//                         className="logout"
//                     >
//                         <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/icon_logout.png" alt="Иконка выхода" />
//                         <span>Выйти</span>
//                     </li>
//                 </ul>
//             </aside>

//             <main className="content-container">
//                 {renderContent()}
//             </main>
//         </div>
//     );
// }


'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import './profile.css';
import '../contacts/contacts.css';
import AnimatedWrapper from '@/components/animation/AnimatedWrapper'; // Импортируем AnimatedWrapper
// import Head from 'next/head';

// export const generateMetadata = () => {
//     return {
//         title: 'Личный кабинет - Vitaline',
//         description: 'Профиль | Служба поддержки',
//     };
// };


export default function ProfilePage() {
    const [activeSection, setActiveSection] = useState<'profile' | 'orders' | 'favorites' | 'points' | 'support'>('profile');
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>('');
    const [userEmail, setUserEmail] = useState<string>('');
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [checkedAuth, setCheckedAuth] = useState<boolean>(false); // Флаг, чтобы избежать повторной проверки
    const router = useRouter();

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

    useEffect(() => {
        // Если уже проверили и установили состояние аутентификации, повторно не проверяем
        if (checkedAuth) return;

        const token = localStorage.getItem('authToken');
        const loginTimestamp = localStorage.getItem('loginTimestamp');
        const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;

        if (!token || !loginTimestamp) {
            router.replace('/login');
            return;
        }

        const loginTime = parseInt(loginTimestamp, 10);
        const now = Date.now();

        if (now - loginTime > sevenDaysInMs) {
            // Токен просрочен
            localStorage.removeItem('authToken');
            localStorage.removeItem('loginTimestamp');
            router.replace('/login');
            return;
        }

        const viewerQuery = {
            query: `
                query Viewer {
                    viewer {
                        id
                        name
                        email
                    }
                }
            `
        };

        async function loadUser() {
            try {
                const response = await fetch('https://nuxt.vitaline.uz/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(viewerQuery),
                });

                const result = await response.json();

                if (response.ok && result.data?.viewer) {
                    setUserName(result.data.viewer.name || '');
                    setUserEmail(result.data.viewer.email || '');
                    setIsAuthenticated(true);
                } else {
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('loginTimestamp');
                    router.replace('/login');
                }
            } catch (error) {
                console.error('Ошибка при получении данных пользователя:', error);
                localStorage.removeItem('authToken');
                localStorage.removeItem('loginTimestamp');
                router.replace('/login');
            } finally {
                setCheckedAuth(true); // Помечаем, что проверка завершена
            }
        }

        loadUser();
    }, [router, checkedAuth]);

    // Пока не проверили — не отображаем ничего (можно поставить лоадер)
    if (!checkedAuth) {
        return null;
    }

    // Если проверка прошла, но пользователь не авторизован (был редирект), 
    // код ниже не исполнится, так как роутер перенаправит на /login.
    if (!isAuthenticated) {
        return null;
    }

    const renderContent = () => {
        const fadeInUp = {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: 20 },
            transition: { duration: 0.5, ease: 'easeOut' },
        };

        switch (activeSection) {
            case 'profile':
                return (
                    <motion.div {...fadeInUp} key="profile">
                        <div className="profile-page-content">
                            <h2>Персональная информация</h2>
                            <form className='profile_form' action="">
                                <div className="form-group">
                                    <label>Имя</label>
                                    <input type="text" value={userName} readOnly />
                                </div>
                                <div className="form-group">
                                    <label>Телефон</label>
                                    <input type="text" placeholder="+998 XX XXX-XX-XX" />
                                </div>
                                <div className="form-group">
                                    <label>Электронная почта</label>
                                    <input type="email" value={userEmail} disabled />
                                </div>
                                <button className="save-button">Сохранить ваш номер телефона</button>
                            </form>
                        </div>
                    </motion.div>
                );
            case 'orders':
                return (
                    <motion.div {...fadeInUp} key="orders">
                        <div className="profile-page-content">
                            <h2>Мои заказы</h2>
                            <table className="orders-table">
                                <thead>
                                    <tr>
                                        <th>Номер заказа</th>
                                        <th>Дата заказа</th>
                                        <th>Тип доставки</th>
                                        <th>Тип оплаты</th>
                                        <th>Стоимость</th>
                                        <th>Текущий статус</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td data-label="Номер заказа"><span className="order-number">№ 3620133837</span></td>
                                        <td>23.11.2024</td>
                                        <td>Курьерская доставка</td>
                                        <td>Оплата картой</td>
                                        <td><strong>1 500 000 сум</strong></td>
                                        <td><span className="status accepted">Принят</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className="order-number">№ 3620133837</span></td>
                                        <td>23.11.2024</td>
                                        <td>Самовывоз из магазина</td>
                                        <td>Оплата курьеру</td>
                                        <td><strong>1 500 000 сум</strong></td>
                                        <td><span className="status completed">Выполнен</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className="order-number">№ 3620133837</span></td>
                                        <td>23.11.2024</td>
                                        <td>Курьерская доставка</td>
                                        <td>Оплата картой</td>
                                        <td><strong>1 500 000 сум</strong></td>
                                        <td><span className="status completed">Выполнен</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className="order-number">№ 3620133837</span></td>
                                        <td>23.11.2024</td>
                                        <td>Курьерская доставка</td>
                                        <td>Оплата картой</td>
                                        <td><strong>1 500 000 сум</strong></td>
                                        <td><span className="status completed">Выполнен</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className="order-number">№ 3620133837</span></td>
                                        <td>12.12.2024</td>
                                        <td>Курьерская доставка</td>
                                        <td>Оплата курьеру</td>
                                        <td><strong>1 500 000 сум</strong></td>
                                        <td><span className="status completed">Выполнен</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </motion.div >
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
                                Текущий баланс: <span className='billz_point_value'>200 000</span> баллов
                            </div>
                            <div className="loyalty_image_block">
                                <img className='billz_cart_barcode' src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/913b2275733069210a8b889e89467b57.png" alt="barcode" />
                                <span className='billz_cart_number'>75894 2544 4989 15615</span>
                            </div>
                            <div className="loyalty_description_block">
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
                            {/* <h2>Служба поддержки</h2> */}
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
                        // Мобильная версия: при клике по активному пункту — переключаем раскрытие меню
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

            <li
                onClick={() => {
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('loginTimestamp');
                    window.location.href = '/login';
                }}
                className="logout"
            >
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
                        {/* На мобильной версии отображаем активный пункт и стрелочку. 
                    При клике по активному пункту — раскрываем/скрываем меню */}

                        <div className="mobile-dropdown-header" onClick={() => {
                            if (window.innerWidth <= 768) {
                                setIsMenuOpen(!isMenuOpen);
                            }
                        }}>
                            <span>
                                {
                                    // Показываем название активного пункта на мобильном
                                    activeSection === 'profile' ? 'Мой профиль' :
                                        activeSection === 'orders' ? 'Мои заказы' :
                                            activeSection === 'favorites' ? 'Избранное' :
                                                activeSection === 'points' ? 'Мои баллы' :
                                                    activeSection === 'support' ? 'Служба поддержки' : ''
                                }
                            </span>
                            {/* Стрелочка вниз/вверх */}
                            <span
                                className={`dropdown-arrow ${isMenuOpen ? 'open' : ''}`}
                            >▼
                            </span>
                        </div>

                        {/* Десктопная версия: меню всегда показано. 
                    Мобильная версия: при isMenuOpen=true показываем все пункты */}
                        <div className={`menu-items ${isMenuOpen ? 'open' : ''}`}>
                            {menuItems}
                        </div>
                    </aside >

                    <main className="content-container">
                        {renderContent()}
                    </main>
                </div >

            </AnimatedWrapper>

        </>
    );
}