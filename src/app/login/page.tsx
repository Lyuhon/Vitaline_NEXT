// // //src/app/login/page.tsx
// // 'use client';

// // import { useState, useEffect } from 'react';
// // import { useRouter } from 'next/navigation';
// // import Link from 'next/link';
// // import he from 'he';
// // import './log_reg.css';
// // import AnimatedWrapper from '@/components/animation/AnimatedWrapper'; // Импортируем AnimatedWrapper


// // export default function LoginPage() {
// //     const [email, setEmail] = useState('');
// //     const [password, setPassword] = useState('');
// //     const [error, setError] = useState('');
// //     const [isChecking, setIsChecking] = useState(true); // Флаг проверки токена
// //     const [isLoaded, setIsLoaded] = useState(false); // Флаг отображения
// //     const router = useRouter();

// //     useEffect(() => {
// //         // Выполняем проверку до рендера контента
// //         const token = localStorage.getItem('authToken');
// //         const loginTimestamp = localStorage.getItem('loginTimestamp');
// //         const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;

// //         if (token && loginTimestamp) {
// //             const loginTime = parseInt(loginTimestamp, 10);
// //             const now = Date.now();
// //             if (now - loginTime <= sevenDaysInMs) {
// //                 // Токен ещё валиден
// //                 router.replace('/profile');
// //                 return;
// //             }
// //         }
// //         // Если токена нет или истек — показываем страницу логина
// //         setIsChecking(false);
// //         setTimeout(() => setIsLoaded(true), 100);
// //     }, [router]);

// //     useEffect(() => {
// //         document.title = 'Вход в личный кабинет - Vitaline';
// //         const metaDescription = document.querySelector('meta[name="description"]');
// //         if (metaDescription) {
// //             metaDescription.setAttribute('content', 'Профиль Vitaline');
// //         } else {
// //             const meta = document.createElement('meta');
// //             meta.name = 'description';
// //             meta.content = 'Профиль Vitaline';
// //             document.head.appendChild(meta);
// //         }
// //     }, []);

// //     const handleSubmit = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         setError('');

// //         const graphqlQuery = {
// //             query: `
// //                 mutation LoginUser($username: String!, $password: String!) {
// //                     login(input: { username: $username, password: $password }) {
// //                         authToken
// //                         user {
// //                             id
// //                             name
// //                             email
// //                         }
// //                     }
// //                 }
// //             `,
// //             variables: {
// //                 username: email,
// //                 password: password,
// //             },
// //         };

// //         try {
// //             const response = await fetch('https://nuxt.vitaline.uz/graphql', {
// //                 method: 'POST',
// //                 headers: {
// //                     'Content-Type': 'application/json',
// //                 },
// //                 body: JSON.stringify(graphqlQuery),
// //             });

// //             const result = await response.json();

// //             if (response.ok && result?.data?.login?.authToken) {
// //                 const token = result.data.login.authToken;
// //                 localStorage.setItem('authToken', token);
// //                 localStorage.setItem('loginTimestamp', Date.now().toString());
// //                 router.push('/profile');
// //             } else {
// //                 const errorMessage = result?.errors?.[0]?.message || 'Ошибка входа';
// //                 const decodedMessage = he.decode(errorMessage);
// //                 const cleanMessage = decodedMessage.replace(/<\/?[^>]+(>|$)/g, '');
// //                 setError(cleanMessage);
// //             }
// //         } catch (err: any) {
// //             setError('Ошибка подключения. Попробуйте снова.');
// //             console.error('Ошибка:', err.message);
// //         }
// //     };

// //     if (isChecking) {
// //         // Пока идет проверка, можно вернуть null или спиннер загрузки
// //         return null;
// //     }

// //     return (
// //         <AnimatedWrapper>
// //             <section className={`login_page ${isLoaded ? 'fade-in' : 'hidden'}`}>
// //                 <div className="login-box">
// //                     <h2 className="login-header">Ваш личный кабинет Vitaline</h2>

// //                     <form className="login_form" onSubmit={handleSubmit}>
// //                         <div className="form-group">
// //                             <input
// //                                 type="email"
// //                                 id="email"
// //                                 value={email}
// //                                 onChange={(e) => setEmail(e.target.value)}
// //                                 placeholder="Введите вашу почту"
// //                                 required
// //                                 autoComplete="username"
// //                             />
// //                         </div>

// //                         <div className="form-group">
// //                             <input
// //                                 type="password"
// //                                 id="password"
// //                                 value={password}
// //                                 onChange={(e) => setPassword(e.target.value)}
// //                                 placeholder="Введите ваш пароль"
// //                                 required
// //                                 autoComplete="current-password"
// //                             />
// //                         </div>

// //                         {error && <div className="alert">{error}</div>}

// //                         <div className="form-group remb_forg">
// //                             <div className="remeber_me">
// //                                 <input id="remeber" type="checkbox" />
// //                                 <label htmlFor="remeber">Запомнить меня</label>
// //                             </div>
// //                             <div className="forget_block">
// //                                 <Link target='_blank' href="https://t.me/abdelmansur">Я забыл свой пароль</Link>
// //                             </div>
// //                         </div>

// //                         <button type="submit" className="button_login">
// //                             Войти
// //                         </button>
// //                     </form>

// //                     <div className="register_acc_links">
// //                         <span>Нет аккаунта?</span>
// //                         <Link target='_blank' href="https://t.me/abdelmansur">Зарегистрироваться</Link>
// //                     </div>
// //                 </div>
// //             </section>
// //         </AnimatedWrapper>
// //     );
// // }








// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import AnimatedWrapper from '@/components/animation/AnimatedWrapper';
// import './log_reg.css';

// export default function LoginPage() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [isLoading, setIsLoading] = useState(true); // Изменили на true для начального состояния
//     const [rememberMe, setRememberMe] = useState(false);
//     const router = useRouter();

//     useEffect(() => {
//         // Проверяем авторизацию при загрузке страницы
//         const checkAuth = async () => {
//             try {
//                 const response = await fetch('/api/auth/check', {
//                     credentials: 'include'
//                 });

//                 if (response.ok) {
//                     router.replace('/profile');
//                 }
//             } catch (error) {
//                 console.error('Auth check failed:', error);
//             } finally {
//                 setIsLoading(false); // В любом случае убираем загрузку
//             }
//         };

//         checkAuth();
//     }, [router]);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setError('');
//         setIsLoading(true);

//         try {
//             // Получаем JWT токен
//             const loginResponse = await fetch('https://nuxt.vitaline.uz/wp-json/jwt-auth/v1/token', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     username: email,
//                     password: password,
//                 }),
//             });

//             const loginData = await loginResponse.json();

//             if (loginResponse.ok && loginData.token) {
//                 // Если успешно получили токен, сохраняем его в куки через наш API
//                 const cookieResponse = await fetch('/api/auth/login', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         token: loginData.token,
//                         user: loginData.user_email,
//                         displayName: loginData.user_display_name,
//                         rememberMe, // Передаем состояние "Запомнить меня"
//                     }),
//                 });

//                 if (cookieResponse.ok) {
//                     router.push('/profile');
//                 } else {
//                     setError('Ошибка при сохранении сессии');
//                 }
//             } else {
//                 setError(loginData.message || 'Неверный email или пароль');
//             }
//         } catch (err) {
//             console.error('Login error:', err);
//             setError('Ошибка подключения к серверу');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // Показываем загрузку при первоначальной проверке
//     if (isLoading) {
//         return null; // или компонент загрузки
//     }

//     return (
//         <AnimatedWrapper>
//             <section className="login_page fade-in">
//                 <div className="login-box">
//                     <h2 className="login-header">Ваш личный кабинет Vitaline</h2>

//                     <form className="login_form" onSubmit={handleSubmit}>
//                         <div className="form-group">
//                             <input
//                                 type="email"
//                                 id="email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 placeholder="Введите вашу почту"
//                                 required
//                                 autoComplete="username"
//                                 disabled={isLoading}
//                             />
//                         </div>

//                         <div className="form-group">
//                             <input
//                                 type="password"
//                                 id="password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 placeholder="Введите ваш пароль"
//                                 required
//                                 autoComplete="current-password"
//                                 disabled={isLoading}
//                             />
//                         </div>

//                         {error && <div className="alert">{error}</div>}

//                         <div className="form-group remb_forg">
//                             <div className="remeber_me">
//                                 <input
//                                     id="remeber"
//                                     type="checkbox"
//                                     checked={rememberMe}
//                                     onChange={(e) => setRememberMe(e.target.checked)}
//                                     disabled={isLoading}
//                                 />
//                                 <label htmlFor="remeber">Запомнить меня</label>
//                             </div>
//                             <div className="forget_block">
//                                 <Link target='_blank' href="https://t.me/abdelmansur">
//                                     Я забыл свой пароль
//                                 </Link>
//                             </div>
//                         </div>

//                         <button
//                             type="submit"
//                             className="button_login"
//                             disabled={isLoading}
//                         >
//                             {isLoading ? 'Вход...' : 'Войти'}
//                         </button>
//                     </form>

//                     <div className="register_acc_links">
//                         <span>Нет аккаунта?</span>
//                         <Link target='_blank' href="https://t.me/abdelmansur">
//                             Зарегистрироваться
//                         </Link>
//                     </div>
//                 </div>
//             </section>
//         </AnimatedWrapper>
//     );
// }


// login/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AnimatedWrapper from '@/components/animation/AnimatedWrapper';
import './log_reg.css';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true); // Изменили на true для начального состояния
    const [rememberMe, setRememberMe] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Проверяем авторизацию при загрузке страницы
        const checkAuth = async () => {
            try {
                const response = await fetch('/api/auth_temp/check', {
                    credentials: 'include'
                });

                if (response.ok) {
                    router.replace('/'); // Перенаправляем на главную страницу, если авторизован
                }
            } catch (error) {
                console.error('Auth check failed:', error);
            } finally {
                setIsLoading(false); // В любом случае убираем загрузку
            }
        };

        checkAuth();
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Проверка логина и пароля непосредственно на клиенте
            if (email === 'Trade' && password === 'v0090') {
                // Устанавливаем куки через API
                const response = await fetch('/api/auth_temp/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: email,
                        rememberMe // Передаем состояние "Запомнить меня"
                    }),
                });

                if (response.ok) {
                    router.push('/'); // Перенаправляем на главную страницу
                } else {
                    setError('Ошибка при сохранении сессии');
                }
            } else {
                setError('Неверный логин или пароль');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Ошибка подключения к серверу');
        } finally {
            setIsLoading(false);
        }
    };

    // Показываем загрузку при первоначальной проверке
    if (isLoading) {
        return null; // или компонент загрузки
    }

    return (
        <AnimatedWrapper>
            <section className="login_page fade-in">
                <div className="login-box">
                    <h2 className="login-header">Ваш личный кабинет Vitaline</h2>

                    <form className="login_form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Введите вашу почту"
                                required
                                autoComplete="username"
                                disabled={isLoading}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Введите ваш пароль"
                                required
                                autoComplete="current-password"
                                disabled={isLoading}
                            />
                        </div>

                        {error && <div className="alert">{error}</div>}

                        <div className="form-group remb_forg">
                            <div className="remeber_me">
                                <input
                                    id="remeber"
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    disabled={isLoading}
                                />
                                <label htmlFor="remeber">Запомнить меня</label>
                            </div>
                            <div className="forget_block">
                                <Link target='_blank' href="https://t.me/abdelmansur">
                                    Я забыл свой пароль
                                </Link>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="button_login"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Вход...' : 'Войти'}
                        </button>
                    </form>

                    <div className="register_acc_links px-[40px] pb-[20px] flex flex-col gap-[20px] border-t">
                        <span>
                            Для получения логина и пароля пройдите регистрацию через
                            <Link className="px-[5px] text-[#FF7900]" target='_blank' href="https://t.me/abdelmansur">
                                Telegram
                            </Link></span>
                        <span>
                            Login va parol olish uchun
                            <Link className="px-[5px] text-[#FF7900]" target='_blank' href="https://t.me/abdelmansur">
                                Telegram
                            </Link>
                            orqali ro‘yxatdan o‘ting.</span>
                    </div>

                    <div className="register_acc_links" style={{ display: "none" }}>
                        <span>Нет аккаунта?</span>
                        <Link target='_blank' href="https://t.me/abdelmansur">
                            Зарегистрироваться
                        </Link>
                    </div>


                </div>
            </section>
        </AnimatedWrapper>
    );
}