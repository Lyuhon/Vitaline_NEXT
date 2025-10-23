// src/app/components/Consultation.tsx
"use client";

import React, { useState } from "react";
import PhoneInput from "./FooterPhoneInput";

const Consultation = () => {
    const [phone, setPhone] = useState("+998 ");
    const [touched, setTouched] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [submissionError, setSubmissionError] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);

    const isValidPhoneNumber = (phone: string): boolean => {
        return phone.length === 19;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Проверяем, не отправляем ли мы уже заявку или не была ли форма уже отправлена
        if (loading || submitted) {
            return;
        }

        setTouched(true);
        setError(undefined);
        setSubmissionError(null);

        if (!isValidPhoneNumber(phone)) {
            setError("Пожалуйста, введите корректный номер телефона.");
            return;
        }

        setLoading(true);

        try {
            const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

            const data = {
                phone: phone.trim(),
                page_path: currentPath // Используем только путь без полного URL
            };

            console.log("Отправляемые данные:", data);

            const response = await fetch('/api/consultation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Ошибка: ${response.status} ${response.statusText} - ${errorText}`);
            }

            const result = await response.json();

            console.log("Ответ от API:", result);

            if (result.success) {
                // Отмечаем, что форма была успешно отправлена
                setSubmitted(true);

                // Сбрасываем состояние после успешной отправки
                alert("Заявка отправлена! Наш специалист свяжется с вами.");
                setPhone("+998 ");
                setTouched(false);

                // Через небольшую задержку разрешаем повторную отправку (если пользователь захочет отправить новую заявку)
                setTimeout(() => {
                    setSubmitted(false);
                }, 1000);
            } else {
                throw new Error(result.message || "Произошла ошибка при отправке заявки.");
            }
        } catch (err: any) {
            console.error(err);
            setSubmissionError(err.message || "Произошла ошибка при отправке заявки.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="consultation">
            <div className="overlay">
                <div className="inner_block">
                    <div className="text_block">
                        <h3 className="white_title">Запишитесь на бесплатную</h3>
                        <h3 className="orange_title">онлайн-консультацию</h3>
                        <span className="cons_info">
                            Оставьте свой номер и наш специалист свяжется с Вами в ближайшее время
                        </span>
                    </div>
                    <form className="form_block" onSubmit={handleSubmit}>
                        <PhoneInput value={phone} onChange={setPhone} error={error} />
                        <button
                            type="submit"
                            className="sbmt_consultation"
                            disabled={loading || submitted}
                        >
                            {loading ? "Отправка..." : "Отправить"}
                        </button>
                        {touched && !isValidPhoneNumber(phone) && (
                            <span className="error-message">
                                Пожалуйста, введите корректный номер телефона.
                            </span>
                        )}
                        {submissionError && (
                            <span className="error-message">
                                {submissionError}
                            </span>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Consultation;