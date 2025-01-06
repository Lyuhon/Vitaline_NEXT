// // src/app/components/Consultation.tsx
// "use client";

// import React from "react";

// const Consultation = () => {
//     const handleSubmit = () => {
//         alert("Заявка отправлена! Наш специалист свяжется с вами.");
//     };

//     return (
//         <section className="consultation">
//             <div className="overlay">
//                 <div className="inner_block">
//                     <div className="text_block">
//                         <h3 className="white_title">Запишитесь на бесплатную</h3>
//                         <h3 className="orange_title">онлайн-консультацию</h3>
//                         <span className="cons_info">
//                             Оставьте свой номер и наш специалист свяжется с Вами в ближайшее время
//                         </span>
//                     </div>
//                     <div className="form_block">
//                         <input
//                             type="tel"
//                             placeholder="+998 (ХХ) ХХХ - ХХ - ХХ"
//                             className="phone_input"
//                         />
//                         <button
//                             className="sbmt_consultation"
//                             onClick={handleSubmit}
//                         >
//                             Отправить
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Consultation;






// // src/app/components/FooterConsultation.tsx
// "use client";

// import React, { useState } from "react";
// import PhoneInput from "./FooterPhoneInput";

// const Consultation = () => {
//     const [phone, setPhone] = useState("+998 ");
//     const [touched, setTouched] = useState(false);
//     const [error, setError] = useState<string | undefined>(undefined);

//     const isValidPhoneNumber = (phone: string): boolean => {
//         return phone.length === 19; // Соответствует формату +998 (XX) XXX-XX-XX
//     };

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         setTouched(true);

//         if (isValidPhoneNumber(phone)) {
//             alert("Заявка отправлена! Наш специалист свяжется с вами.");
//             // Здесь можно добавить логику отправки данных на сервер
//             // После успешной отправки можно сбросить форму
//             setPhone("+998 ");
//             setTouched(false);
//             setError(undefined);
//         } else {
//             setError("Пожалуйста, введите корректный номер телефона.");
//         }
//     };

//     return (
//         <section className="consultation">
//             <div className="overlay">
//                 <div className="inner_block">
//                     <div className="text_block">
//                         <h3 className="white_title">Запишитесь на бесплатную</h3>
//                         <h3 className="orange_title">онлайн-консультацию</h3>
//                         <span className="cons_info">
//                             Оставьте свой номер и наш специалист свяжется с Вами в ближайшее время
//                         </span>
//                     </div>
//                     <form className="form_block" onSubmit={handleSubmit}>
//                         <PhoneInput value={phone} onChange={setPhone} error={error} />
//                         <button
//                             type="submit"
//                             className="sbmt_consultation"
//                         >
//                             Отправить
//                         </button>
//                         {touched && !isValidPhoneNumber(phone) && (
//                             <span className="error-message">
//                                 Пожалуйста, введите корректный номер телефона.
//                             </span>
//                         )}
//                     </form>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Consultation;






// // src/app/components/Consultation.tsx
// "use client";

// import React, { useState } from "react";
// import PhoneInput from "./FooterPhoneInput";

// const Consultation = () => {
//     const [phone, setPhone] = useState("+998 ");
//     const [touched, setTouched] = useState(false);
//     const [error, setError] = useState<string | undefined>(undefined);
//     const [loading, setLoading] = useState(false);
//     const [successMessage, setSuccessMessage] = useState<string | null>(null);
//     const [submissionError, setSubmissionError] = useState<string | null>(null);

//     const isValidPhoneNumber = (phone: string): boolean => {
//         return phone.length === 19; // Соответствует формату +998 (XX) XXX-XX-XX
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setTouched(true);
//         setError(undefined);
//         setSubmissionError(null);
//         setSuccessMessage(null);

//         if (!isValidPhoneNumber(phone)) {
//             setError("Пожалуйста, введите корректный номер телефона.");
//             return;
//         }

//         setLoading(true);

//         try {
//             // Получаем текущий URL страницы
//             const currentURL = typeof window !== 'undefined' ? window.location.href : '';

//             // Формируем данные для отправки
//             const data = {
//                 phone: phone.trim(),
//                 page_url: currentURL
//             };

//             const response = await fetch('/api/consultation', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(data),
//             });

//             const result = await response.json();

//             if (response.ok && result.success) {
//                 setSuccessMessage("Заявка отправлена! Наш специалист свяжется с вами.");
//                 setPhone("+998 ");
//                 setTouched(false);
//             } else {
//                 throw new Error(result.message || "Произошла ошибка при отправке заявки.");
//             }
//         } catch (err: any) {
//             console.error(err);
//             setSubmissionError(err.message || "Произошла ошибка при отправке заявки.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <section className="consultation">
//             <div className="overlay">
//                 <div className="inner_block">
//                     <div className="text_block">
//                         <h3 className="white_title">Запишитесь на бесплатную</h3>
//                         <h3 className="orange_title">онлайн-консультацию</h3>
//                         <span className="cons_info">
//                             Оставьте свой номер и наш специалист свяжется с Вами в ближайшее время
//                         </span>
//                     </div>
//                     <form className="form_block" onSubmit={handleSubmit}>
//                         <PhoneInput value={phone} onChange={setPhone} error={error} />
//                         <button
//                             type="submit"
//                             className="sbmt_consultation"
//                             disabled={loading}
//                         >
//                             {loading ? "Отправка..." : "Отправить"}
//                         </button>
//                         {touched && !isValidPhoneNumber(phone) && (
//                             <span style={{ fontSize: '0px' }} className="error-message">
//                                 Пожалуйста, введите корректный номер телефона.
//                             </span>
//                         )}
//                         {submissionError && (
//                             <span className="error-message">
//                                 {submissionError}
//                             </span>
//                         )}
//                         {successMessage && (
//                             <span className="success-message">
//                                 {successMessage}
//                             </span>
//                         )}
//                     </form>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Consultation;



// src/app/components/Consultation.tsx
"use client";

import React, { useState } from "react";
import PhoneInput from "./FooterPhoneInput"; // Убедитесь, что путь правильный

const Consultation = () => {
    const [phone, setPhone] = useState("+998 ");
    const [touched, setTouched] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [submissionError, setSubmissionError] = useState<string | null>(null);

    const isValidPhoneNumber = (phone: string): boolean => {
        return phone.length === 19; // Соответствует формату +998 (XX) XXX-XX-XX
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setTouched(true);
        setError(undefined);
        setSubmissionError(null);

        if (!isValidPhoneNumber(phone)) {
            setError("Пожалуйста, введите корректный номер телефона.");
            return;
        }

        setLoading(true);

        try {
            // Получаем текущий URL страницы
            const currentURL = typeof window !== 'undefined' ? window.location.href : '';

            // Формируем данные для отправки
            const data = {
                phone: phone.trim(),
                page_url: currentURL
            };

            console.log("Отправляемые данные:", data); // Для отладки

            const response = await fetch('/api/consultation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                // Получаем текст ошибки, если ответ не ok
                const errorText = await response.text();
                throw new Error(`Ошибка: ${response.status} ${response.statusText} - ${errorText}`);
            }

            const result = await response.json();

            console.log("Ответ от API:", result); // Для отладки

            if (result.success) {
                alert("Заявка отправлена! Наш специалист свяжется с вами."); // Показываем alert
                setPhone("+998 ");
                setTouched(false);
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
                            disabled={loading}
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
