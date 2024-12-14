// src/app/components/Footer.tsx
import Consultation from "@/components/Consultation";

export default function Footer() {
    return (
        <>
            <Consultation />

            <footer id="footer_nav">
                <div className="footer-container">
                    <div className="footer-top">
                        <div className="footer-logo">
                            <img
                                src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/8e3bc2dcd6d2b7628adf6e926f325187.png"
                                alt="Vitaline Logo"
                            />
                            <p className="shop_info">
                                Интернет-магазин витаминов и БАДов от лучших мировых брендов
                            </p>
                            <p className="work_shop_info">График работы: с 9:00 до 19:00</p>
                            <p className="work_shop_info">Телефон для связи: +998 99 906 6959</p>
                            <p className="work_shop_info">Адрес: Удобенчат, г. Ташкент</p>

                            <div className="social-media">
                                <a href="https://www.instagram.com/vitaline.uz/">
                                    <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Rectangle-85.svg" alt="Instagram" />
                                </a>
                                <a href="https://t.me/vitalineuz_admin">
                                    <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Rectangle-86.svg" alt="Telegram" />
                                </a>
                                <a href="https://wa.me/message/4LJSJMNTMHQOC1">
                                    <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Rectangle-87.svg" alt="WhatsApp" />
                                </a>
                                <a href="https://www.facebook.com/vitalineuz">
                                    <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Rectangle-84.svg" alt="Facebook" />
                                </a>
                            </div>
                        </div>

                        <div className="links-column">
                            <h4>Покупателям</h4>
                            <ul>
                                <li>
                                    <a href="/about">О нас</a>
                                </li>
                                <li>
                                    <a href="/shop">Магазин</a>
                                </li>
                                <li>
                                    <a href="#">Доставка</a>
                                </li>
                                <li>
                                    <a href="/contacts">Контакты</a>
                                </li>
                            </ul>
                        </div>

                        <div className="links-column">
                            <h4>Личный кабинет</h4>
                            <ul>
                                <li>
                                    <a href="#">Мой профиль</a>
                                </li>
                                <li>
                                    <a href="#">Избранное</a>
                                </li>
                                <li>
                                    <a href="/cart">Корзина</a>
                                </li>
                                <li>
                                    <a href="/profile/points">Мои баллы</a>
                                </li>
                            </ul>
                        </div>

                        <div className="links-column">
                            <h4>Полезное</h4>
                            <ul>
                                <li>
                                    <a href="/blog">Блог</a>
                                </li>
                                <li>
                                    <a href="#">Готовые схемы</a>
                                </li>
                                <li>
                                    <a href="/loyalty-program">Программа лояльности</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    );
}
