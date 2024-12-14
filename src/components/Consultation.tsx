// src/app/components/Consultation.tsx
"use client";

import React from "react";

const Consultation = () => {
    const handleSubmit = () => {
        alert("Заявка отправлена! Наш специалист свяжется с вами.");
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
                    <div className="form_block">
                        <input
                            type="tel"
                            placeholder="+998 (ХХ) ХХХ - ХХ - ХХ"
                            className="phone_input"
                        />
                        <button
                            className="sbmt_consultation"
                            onClick={handleSubmit}
                        >
                            Отправить
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Consultation;
