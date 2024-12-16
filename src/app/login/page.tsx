//src/app/login/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import he from 'he';
import './log_reg.css';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isChecking, setIsChecking] = useState(true); // Флаг проверки токена
    const [isLoaded, setIsLoaded] = useState(false); // Флаг отображения
    const router = useRouter();

    useEffect(() => {
        // Выполняем проверку до рендера контента
        const token = localStorage.getItem('authToken');
        const loginTimestamp = localStorage.getItem('loginTimestamp');
        const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;

        if (token && loginTimestamp) {
            const loginTime = parseInt(loginTimestamp, 10);
            const now = Date.now();
            if (now - loginTime <= sevenDaysInMs) {
                // Токен ещё валиден
                router.replace('/profile');
                return;
            }
        }
        // Если токена нет или истек — показываем страницу логина
        setIsChecking(false);
        setTimeout(() => setIsLoaded(true), 100);
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const graphqlQuery = {
            query: `
                mutation LoginUser($username: String!, $password: String!) {
                    login(input: { username: $username, password: $password }) {
                        authToken
                        user {
                            id
                            name
                            email
                        }
                    }
                }
            `,
            variables: {
                username: email,
                password: password,
            },
        };

        try {
            const response = await fetch('https://nuxt.vitaline.uz/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(graphqlQuery),
            });

            const result = await response.json();

            if (response.ok && result?.data?.login?.authToken) {
                const token = result.data.login.authToken;
                localStorage.setItem('authToken', token);
                localStorage.setItem('loginTimestamp', Date.now().toString());
                router.push('/profile');
            } else {
                const errorMessage = result?.errors?.[0]?.message || 'Ошибка входа';
                const decodedMessage = he.decode(errorMessage);
                const cleanMessage = decodedMessage.replace(/<\/?[^>]+(>|$)/g, '');
                setError(cleanMessage);
            }
        } catch (err: any) {
            setError('Ошибка подключения. Попробуйте снова.');
            console.error('Ошибка:', err.message);
        }
    };

    if (isChecking) {
        // Пока идет проверка, можно вернуть null или спиннер загрузки
        return null;
    }

    return (
        <section className={`login_page ${isLoaded ? 'fade-in' : 'hidden'}`}>
            <div className="login-box">
                <h2 className="login-header">Ваш личный кабинет Vitaline</h2>

                <form className="login_form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Введите вашу почту"
                            required
                            autoComplete="username"
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
                        />
                    </div>

                    {error && <div className="alert">{error}</div>}

                    <div className="form-group remb_forg">
                        <div className="remeber_me">
                            <input id="remeber" type="checkbox" />
                            <label htmlFor="remeber">Запомнить меня</label>
                        </div>
                        <div className="forget_block">
                            <Link href="#">Я забыл свой пароль</Link>
                        </div>
                    </div>

                    <button type="submit" className="button_login">
                        Войти
                    </button>
                </form>

                <div className="register_acc_links">
                    <span>Нет аккаунта?</span>
                    <Link href="#">Зарегистрироваться</Link>
                </div>
            </div>
        </section>
    );
}
