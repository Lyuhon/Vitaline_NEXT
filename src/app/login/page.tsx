// // // login/page.tsx
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
// //     const [isLoading, setIsLoading] = useState(false); // Начальное состояние false
// //     const [rememberMe, setRememberMe] = useState(false);
// //     const router = useRouter();

// //     useEffect(() => {
// //         const checkAuth = async () => {
// //             try {
// //                 const response = await fetch('/api/auth_temp/check', {
// //                     credentials: 'include', // Убеждаемся, что куки отправляются
// //                 });
// //                 const data = await response.json();

// //                 if (data.authenticated) {
// //                     router.replace('/'); // Перенаправляем, если уже авторизован
// //                 }
// //             } catch (error) {
// //                 console.error('Auth check failed:', error);
// //             } finally {
// //                 setIsLoading(false);
// //             }
// //         };

// //         checkAuth();
// //     }, [router]);

// //     const handleSubmit = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         setError('');
// //         setIsLoading(true);

// //         try {
// //             // Проверка логина и пароля
// //             if (email === 'Trade' && password === 'v0090') {
// //                 const response = await fetch('/api/auth_temp/login', {
// //                     method: 'POST',
// //                     headers: {
// //                         'Content-Type': 'application/json',
// //                     },
// //                     credentials: 'include', // Убеждаемся, что куки отправляются
// //                     body: JSON.stringify({
// //                         username: email,
// //                         rememberMe,
// //                     }),
// //                 });

// //                 const data = await response.json();
// //                 if (data.success) {
// //                     router.push('/'); // Успешный вход, перенаправляем
// //                     router.refresh(); // Обновляем страницу, чтобы middleware подхватил куки
// //                 } else {
// //                     setError('Ошибка при сохранении сессии');
// //                 }
// //             } else {
// //                 setError('Неверный логин или пароль');
// //             }
// //         } catch (err) {
// //             console.error('Login error:', err);
// //             setError('Ошибка подключения к серверу');
// //         } finally {
// //             setIsLoading(false);
// //         }
// //     };

// //     if (isLoading) {
// //         return <div>Загрузка...</div>; // Простой индикатор загрузки
// //     }

// //     return (
// //         <AnimatedWrapper>
// //             <section className="login_page fade-in">
// //                 <div className="login-box">
// //                     <h2 className="login-header">Ваш личный кабинет Vitaline</h2>

// //                     <form className="login_form" onSubmit={handleSubmit}>
// //                         <div className="form-group">
// //                             <input
// //                                 type="text"
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
// //                                 <Link target="_blank" href="https://t.me/abdelmansur">
// //                                     Я забыл свой пароль
// //                                 </Link>
// //                             </div>
// //                         </div>

// //                         <button type="submit" className="button_login" disabled={isLoading}>
// //                             {isLoading ? 'Вход...' : 'Войти'}
// //                         </button>
// //                     </form>

// //                     <div className="register_acc_links px-[40px] pb-[20px] flex flex-col gap-[20px] border-t">
// //                         <span>
// //                             Для получения логина и пароля пройдите регистрацию через
// //                             <Link className="px-[5px] text-[#FF7900]" target="_blank" href="https://t.me/abdelmansur">
// //                                 Telegram
// //                             </Link>
// //                         </span>
// //                         <span>
// //                             Login va parol olish uchun
// //                             <Link className="px-[5px] text-[#FF7900]" target="_blank" href="https://t.me/abdelmansur">
// //                                 Telegram
// //                             </Link>
// //                             orqali ro‘yxatdan o‘ting.
// //                         </span>
// //                     </div>
// //                 </div>
// //             </section>
// //         </AnimatedWrapper>
// //     );
// // }


// // login/page.tsx
// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import AnimatedWrapper from "@/components/animation/AnimatedWrapper";
// import "./log_reg.css";

// export default function LoginPage() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//     const [isLoading, setIsLoading] = useState(true); // Начинаем с true для проверки авторизации
//     const [rememberMe, setRememberMe] = useState(false);
//     const router = useRouter();

//     useEffect(() => {
//         const checkAuth = async () => {
//             try {
//                 const response = await fetch("/api/auth_temp/check", {
//                     credentials: "include",
//                 });
//                 const data = await response.json();

//                 if (data.authenticated) {
//                     router.replace("/");
//                 }
//             } catch (error) {
//                 console.error("Auth check failed:", error);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         checkAuth();
//     }, [router]);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setError("");
//         setIsLoading(true);

//         try {
//             if (email === "Trade" && password === "v0090") {
//                 const response = await fetch("/api/auth_temp/login", {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     credentials: "include",
//                     body: JSON.stringify({
//                         username: email,
//                         rememberMe,
//                     }),
//                 });

//                 const data = await response.json();
//                 if (data.success) {
//                     router.push("/"); // Редирект после успешной авторизации
//                 } else {
//                     setError("Ошибка при сохранении сессии");
//                 }
//             } else {
//                 setError("Неверный логин или пароль");
//             }
//         } catch (err) {
//             console.error("Login error:", err);
//             setError("Ошибка подключения к серверу");
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
//                             {isLoading ? "Вход..." : "Войти"}
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
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AnimatedWrapper from "@/components/animation/AnimatedWrapper";
import "./log_reg.css";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true); // Начинаем с true для проверки авторизации
    const [rememberMe, setRememberMe] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch("/api/auth_temp/check", {
                    credentials: "include",
                });
                const data = await response.json();

                if (data.authenticated) {
                    router.replace("/");
                }
            } catch (error) {
                console.error("Auth check failed:", error);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            if (email === "Trade" && password === "v0090") {
                const response = await fetch("/api/auth_temp/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        username: email,
                        rememberMe,
                    }),
                });

                const data = await response.json();
                if (data.success) {
                    // После успешного логина проверяем авторизацию еще раз
                    const checkResponse = await fetch("/api/auth_temp/check", {
                        credentials: "include",
                    });
                    const checkData = await checkResponse.json();

                    if (checkData.authenticated) {
                        router.push("/"); // Переходим на главную
                        router.refresh(); // Форсируем обновление страницы, чтобы middleware сработал
                    } else {
                        setError("Куки не установились корректно");
                    }
                } else {
                    setError("Ошибка при сохранении сессии");
                }
            } else {
                setError("Неверный логин или пароль");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("Ошибка подключения к серверу");
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <div>Загрузка...</div>;
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
                                <Link target="_blank" href="https://t.me/abdelmansur">
                                    Я забыл свой пароль
                                </Link>
                            </div>
                        </div>

                        <button type="submit" className="button_login" disabled={isLoading}>
                            {isLoading ? "Вход..." : "Войти"}
                        </button>
                    </form>

                    <div className="register_acc_links px-[40px] pb-[20px] flex flex-col gap-[20px] border-t">
                        <span>
                            Для получения логина и пароля пройдите регистрацию через
                            <Link className="px-[5px] text-[#FF7900]" target="_blank" href="https://t.me/abdelmansur">
                                Telegram
                            </Link>
                        </span>
                        <span>
                            Login va parol olish uchun
                            <Link className="px-[5px] text-[#FF7900]" target="_blank" href="https://t.me/abdelmansur">
                                Telegram
                            </Link>
                            orqali ro‘yxatdan o‘ting.
                        </span>
                    </div>
                </div>
            </section>
        </AnimatedWrapper>
    );
}