// // // //src/app/login/page.tsx
// // // 'use client';

// // // import { useState, useEffect } from 'react';
// // // import { useRouter } from 'next/navigation';
// // // import Link from 'next/link';
// // // import he from 'he';
// // // import './log_reg.css';
// // // import AnimatedWrapper from '@/components/animation/AnimatedWrapper'; // Импортируем AnimatedWrapper


// // // export default function LoginPage() {
// // //     const [email, setEmail] = useState('');
// // //     const [password, setPassword] = useState('');
// // //     const [error, setError] = useState('');
// // //     const [isChecking, setIsChecking] = useState(true); // Флаг проверки токена
// // //     const [isLoaded, setIsLoaded] = useState(false); // Флаг отображения
// // //     const router = useRouter();

// // //     useEffect(() => {
// // //         // Выполняем проверку до рендера контента
// // //         const token = localStorage.getItem('authToken');
// // //         const loginTimestamp = localStorage.getItem('loginTimestamp');
// // //         const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;

// // //         if (token && loginTimestamp) {
// // //             const loginTime = parseInt(loginTimestamp, 10);
// // //             const now = Date.now();
// // //             if (now - loginTime <= sevenDaysInMs) {
// // //                 // Токен ещё валиден
// // //                 router.replace('/profile');
// // //                 return;
// // //             }
// // //         }
// // //         // Если токена нет или истек — показываем страницу логина
// // //         setIsChecking(false);
// // //         setTimeout(() => setIsLoaded(true), 100);
// // //     }, [router]);

// // //     useEffect(() => {
// // //         document.title = 'Вход в личный кабинет - Vitaline';
// // //         const metaDescription = document.querySelector('meta[name="description"]');
// // //         if (metaDescription) {
// // //             metaDescription.setAttribute('content', 'Профиль Vitaline');
// // //         } else {
// // //             const meta = document.createElement('meta');
// // //             meta.name = 'description';
// // //             meta.content = 'Профиль Vitaline';
// // //             document.head.appendChild(meta);
// // //         }
// // //     }, []);

// // //     const handleSubmit = async (e: React.FormEvent) => {
// // //         e.preventDefault();
// // //         setError('');

// // //         const graphqlQuery = {
// // //             query: `
// // //                 mutation LoginUser($username: String!, $password: String!) {
// // //                     login(input: { username: $username, password: $password }) {
// // //                         authToken
// // //                         user {
// // //                             id
// // //                             name
// // //                             email
// // //                         }
// // //                     }
// // //                 }
// // //             `,
// // //             variables: {
// // //                 username: email,
// // //                 password: password,
// // //             },
// // //         };

// // //         try {
// // //             const response = await fetch('https://nuxt.vitaline.uz/graphql', {
// // //                 method: 'POST',
// // //                 headers: {
// // //                     'Content-Type': 'application/json',
// // //                 },
// // //                 body: JSON.stringify(graphqlQuery),
// // //             });

// // //             const result = await response.json();

// // //             if (response.ok && result?.data?.login?.authToken) {
// // //                 const token = result.data.login.authToken;
// // //                 localStorage.setItem('authToken', token);
// // //                 localStorage.setItem('loginTimestamp', Date.now().toString());
// // //                 router.push('/profile');
// // //             } else {
// // //                 const errorMessage = result?.errors?.[0]?.message || 'Ошибка входа';
// // //                 const decodedMessage = he.decode(errorMessage);
// // //                 const cleanMessage = decodedMessage.replace(/<\/?[^>]+(>|$)/g, '');
// // //                 setError(cleanMessage);
// // //             }
// // //         } catch (err: any) {
// // //             setError('Ошибка подключения. Попробуйте снова.');
// // //             console.error('Ошибка:', err.message);
// // //         }
// // //     };

// // //     if (isChecking) {
// // //         // Пока идет проверка, можно вернуть null или спиннер загрузки
// // //         return null;
// // //     }

// // //     return (
// // //         <AnimatedWrapper>
// // //             <section className={`login_page ${isLoaded ? 'fade-in' : 'hidden'}`}>
// // //                 <div className="login-box">
// // //                     <h2 className="login-header">Ваш личный кабинет Vitaline</h2>

// // //                     <form className="login_form" onSubmit={handleSubmit}>
// // //                         <div className="form-group">
// // //                             <input
// // //                                 type="email"
// // //                                 id="email"
// // //                                 value={email}
// // //                                 onChange={(e) => setEmail(e.target.value)}
// // //                                 placeholder="Введите вашу почту"
// // //                                 required
// // //                                 autoComplete="username"
// // //                             />
// // //                         </div>

// // //                         <div className="form-group">
// // //                             <input
// // //                                 type="password"
// // //                                 id="password"
// // //                                 value={password}
// // //                                 onChange={(e) => setPassword(e.target.value)}
// // //                                 placeholder="Введите ваш пароль"
// // //                                 required
// // //                                 autoComplete="current-password"
// // //                             />
// // //                         </div>

// // //                         {error && <div className="alert">{error}</div>}

// // //                         <div className="form-group remb_forg">
// // //                             <div className="remeber_me">
// // //                                 <input id="remeber" type="checkbox" />
// // //                                 <label htmlFor="remeber">Запомнить меня</label>
// // //                             </div>
// // //                             <div className="forget_block">
// // //                                 <Link target='_blank' href="https://t.me/abdelmansur">Я забыл свой пароль</Link>
// // //                             </div>
// // //                         </div>

// // //                         <button type="submit" className="button_login">
// // //                             Войти
// // //                         </button>
// // //                     </form>

// // //                     <div className="register_acc_links">
// // //                         <span>Нет аккаунта?</span>
// // //                         <Link target='_blank' href="https://t.me/abdelmansur">Зарегистрироваться</Link>
// // //                     </div>
// // //                 </div>
// // //             </section>
// // //         </AnimatedWrapper>
// // //     );
// // // }








// // 'use client';

// // import { useState, useEffect } from 'react';
// // import { useRouter } from 'next/navigation';
// // import Link from 'next/link';
// // import AnimatedWrapper from '@/components/animation/AnimatedWrapper';
// // import './log_reg.css';

// // export default function LoginPage() {
// //     const [email, setEmail] = useState('');
// //     const [password, setPassword] = useState('');
// //     const [error, setError] = useState('');
// //     const [isLoading, setIsLoading] = useState(true); // Изменили на true для начального состояния
// //     const [rememberMe, setRememberMe] = useState(false);
// //     const router = useRouter();

// //     useEffect(() => {
// //         // Проверяем авторизацию при загрузке страницы
// //         const checkAuth = async () => {
// //             try {
// //                 const response = await fetch('/api/auth/check', {
// //                     credentials: 'include'
// //                 });

// //                 if (response.ok) {
// //                     router.replace('/profile');
// //                 }
// //             } catch (error) {
// //                 console.error('Auth check failed:', error);
// //             } finally {
// //                 setIsLoading(false); // В любом случае убираем загрузку
// //             }
// //         };

// //         checkAuth();
// //     }, [router]);

// //     const handleSubmit = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         setError('');
// //         setIsLoading(true);

// //         try {
// //             // Получаем JWT токен
// //             const loginResponse = await fetch('https://nuxt.vitaline.uz/wp-json/jwt-auth/v1/token', {
// //                 method: 'POST',
// //                 headers: {
// //                     'Content-Type': 'application/json',
// //                 },
// //                 body: JSON.stringify({
// //                     username: email,
// //                     password: password,
// //                 }),
// //             });

// //             const loginData = await loginResponse.json();

// //             if (loginResponse.ok && loginData.token) {
// //                 // Если успешно получили токен, сохраняем его в куки через наш API
// //                 const cookieResponse = await fetch('/api/auth/login', {
// //                     method: 'POST',
// //                     headers: {
// //                         'Content-Type': 'application/json',
// //                     },
// //                     body: JSON.stringify({
// //                         token: loginData.token,
// //                         user: loginData.user_email,
// //                         displayName: loginData.user_display_name,
// //                         rememberMe, // Передаем состояние "Запомнить меня"
// //                     }),
// //                 });

// //                 if (cookieResponse.ok) {
// //                     router.push('/profile');
// //                 } else {
// //                     setError('Ошибка при сохранении сессии');
// //                 }
// //             } else {
// //                 setError(loginData.message || 'Неверный email или пароль');
// //             }
// //         } catch (err) {
// //             console.error('Login error:', err);
// //             setError('Ошибка подключения к серверу');
// //         } finally {
// //             setIsLoading(false);
// //         }
// //     };

// //     // Показываем загрузку при первоначальной проверке
// //     if (isLoading) {
// //         return null; // или компонент загрузки
// //     }

// //     return (
// //         <AnimatedWrapper>
// //             <section className="login_page fade-in">
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
// //                                 disabled={isLoading}
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
// //                                 disabled={isLoading}
// //                             />
// //                         </div>

// //                         {error && <div className="alert">{error}</div>}

// //                         <div className="form-group remb_forg">
// //                             <div className="remeber_me">
// //                                 <input
// //                                     id="remeber"
// //                                     type="checkbox"
// //                                     checked={rememberMe}
// //                                     onChange={(e) => setRememberMe(e.target.checked)}
// //                                     disabled={isLoading}
// //                                 />
// //                                 <label htmlFor="remeber">Запомнить меня</label>
// //                             </div>
// //                             <div className="forget_block">
// //                                 <Link target='_blank' href="https://t.me/abdelmansur">
// //                                     Я забыл свой пароль
// //                                 </Link>
// //                             </div>
// //                         </div>

// //                         <button
// //                             type="submit"
// //                             className="button_login"
// //                             disabled={isLoading}
// //                         >
// //                             {isLoading ? 'Вход...' : 'Войти'}
// //                         </button>
// //                     </form>

// //                     <div className="register_acc_links">
// //                         <span>Нет аккаунта?</span>
// //                         <Link target='_blank' href="https://t.me/abdelmansur">
// //                             Зарегистрироваться
// //                         </Link>
// //                     </div>
// //                 </div>
// //             </section>
// //         </AnimatedWrapper>
// //     );
// // }


// // login/page.tsx
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
//     const [isLoading, setIsLoading] = useState(false);
//     const [rememberMe, setRememberMe] = useState(false);
//     const router = useRouter();

//     useEffect(() => {
//         const checkAuth = async () => {
//             try {
//                 const response = await fetch('/api/auth_temp/check', {
//                     credentials: 'include',
//                 });
//                 const data = await response.json();

//                 if (data.authenticated) {
//                     router.replace('/');
//                     router.refresh(); // Обновляем, чтобы middleware увидел новые куки
//                 }
//             } catch (error) {
//                 console.error('Auth check failed:', error);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         checkAuth();
//     }, [router]);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setError('');
//         setIsLoading(true);

//         try {
//             if (email === 'Trade' && password === 'v0090') {
//                 const response = await fetch('/api/auth_temp/login', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     credentials: 'include',
//                     body: JSON.stringify({
//                         username: email,
//                         rememberMe,
//                     }),
//                 });

//                 const data = await response.json();
//                 if (data.success) {
//                     // Делаем дополнительный запрос для синхронизации
//                     const checkResponse = await fetch('/api/auth_temp/check', {
//                         credentials: 'include',
//                     });
//                     const checkData = await checkResponse.json();

//                     if (checkData.authenticated) {
//                         router.push('/');
//                         router.refresh(); // Принудительно обновляем страницу
//                     } else {
//                         setError('Ошибка авторизации после входа');
//                     }
//                 } else {
//                     setError('Ошибка при сохранении сессии');
//                 }
//             } else {
//                 setError('Неверный логин или пароль');
//             }
//         } catch (err) {
//             console.error('Login error:', err);
//             setError('Ошибка подключения к серверу');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     if (isLoading) {
//         return <div>Загрузка...</div>;
//     }

//     return (
//         <AnimatedWrapper>
//             <section className="login_page fade-in">
//                 <div className="login-box">
//                     <h2 className="login-header">Ваш личный кабинет Vitaline</h2>
//                     {/* Остальной код формы без изменений */}
//                     <form className="login_form" onSubmit={handleSubmit}>
//                         <div className="form-group">
//                             <input
//                                 type="text"
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
//                                 <Link target="_blank" href="https://t.me/abdelmansur">
//                                     Я забыл свой пароль
//                                 </Link>
//                             </div>
//                         </div>
//                         <button type="submit" className="button_login" disabled={isLoading}>
//                             {isLoading ? 'Вход...' : 'Войти'}
//                         </button>
//                     </form>
//                     <div className="register_acc_links px-[40px] pb-[20px] flex flex-col gap-[20px] border-t">
//                         <span>
//                             Для получения логина и пароля пройдите регистрацию через
//                             <Link className="px-[5px] text-[#FF7900]" target="_blank" href="https://t.me/abdelmansur">
//                                 Telegram
//                             </Link>
//                         </span>
//                         <span>
//                             Login va parol olish uchun
//                             <Link className="px-[5px] text-[#FF7900]" target="_blank" href="https://t.me/abdelmansur">
//                                 Telegram
//                             </Link>
//                             orqali ro‘yxatdan o‘ting.
//                         </span>
//                     </div>
//                 </div>
//             </section>
//         </AnimatedWrapper>
//     );
// }

// login/page.tsx
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
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const router = useRouter();

    // Проверка авторизации при загрузке
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('/api/auth_temp/check', { credentials: 'include' });
                const { authenticated } = await response.json();
                if (authenticated) {
                    router.replace('/');
                    router.refresh();
                }
            } catch (error) {
                console.error('Auth check failed:', error);
            } finally {
                setIsLoading(false);
            }
        };
        checkAuth();
    }, [router]);

    // Обработка формы логина
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/auth_temp/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ username: email, rememberMe }),
            });

            const { success } = await response.json();

            if (email !== 'Trade' || password !== 'v0090') {
                setError('Неверный логин или пароль');
            } else if (success) {
                router.push('/');
                router.refresh();
            } else {
                setError('Ошибка при сохранении сессии');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Ошибка подключения к серверу');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <div className="text-center py-10">Загрузка...</div>;

    return (
        <AnimatedWrapper>
            <section className="login_page fade-in">
                <div className="login-box">
                    <h2 className="login-header text-2xl font-bold text-center mb-6">Ваш личный кабинет Vitaline</h2>
                    <form className="login_form space-y-4" onSubmit={handleSubmit}>
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
                                className="w-full p-2 border rounded"
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
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        {error && <div className="alert text-red-500 text-center">{error}</div>}
                        <div className="form-group remb_forg flex justify-between text-sm">
                            <div className="remeber_me flex items-center gap-2">
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
                                <Link target="_blank" href="https://t.me/abdelmansur" className="text-blue-500 hover:underline">
                                    Я забыл свой пароль
                                </Link>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="button_login w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Вход...' : 'Войти'}
                        </button>
                    </form>
                    <div className="register_acc_links px-10 pb-5 mt-5 flex flex-col gap-5 border-t text-sm text-center">
                        <span>
                            Для получения логина и пароля пройдите регистрацию через{' '}
                            <Link className="text-[#FF7900] hover:underline" target="_blank" href="https://t.me/abdelmansur">
                                Telegram
                            </Link>
                        </span>
                        <span>
                            Login va parol olish uchun{' '}
                            <Link className="text-[#FF7900] hover:underline" target="_blank" href="https://t.me/abdelmansur">
                                Telegram
                            </Link>{' '}
                            orqali ro‘yxatdan o‘ting.
                        </span>
                    </div>
                </div>
            </section>
        </AnimatedWrapper>
    );
}