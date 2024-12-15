// src/app/components/Footer.tsx
import Consultation from "@/components/Consultation";
import Link from 'next/link'

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
                                <Link href="https://www.instagram.com/vitaline.uz/">
                                    <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Rectangle-85.svg" alt="Instagram" />
                                </Link>
                                <Link href="https://t.me/vitalineuz_admin">
                                    <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Rectangle-86.svg" alt="Telegram" />
                                </Link>
                                <Link href="https://wa.me/message/4LJSJMNTMHQOC1">
                                    <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Rectangle-87.svg" alt="WhatsApp" />
                                </Link>
                                <Link href="https://www.facebook.com/vitalineuz">
                                    <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Rectangle-84.svg" alt="Facebook" />
                                </Link>
                            </div>
                        </div>

                        <div className="links-column">
                            <h4>Покупателям</h4>
                            <ul>
                                <li>
                                    <Link href="/about">О нас</Link>
                                </li>
                                <li>
                                    <Link href="/shop">Магазин</Link>
                                </li>
                                <li>
                                    <Link href="#">Доставка</Link>
                                </li>
                                <li>
                                    <Link href="/contacts">Контакты</Link>
                                </li>
                            </ul>
                        </div>

                        <div className="links-column">
                            <h4>Личный кабинет</h4>
                            <ul>
                                <li>
                                    <Link href="#">Мой профиль</Link>
                                </li>
                                <li>
                                    <Link href="#">Избранное</Link>
                                </li>
                                <li>
                                    <Link href="/cart">Корзина</Link>
                                </li>
                                <li>
                                    <Link href="/profile/points">Мои баллы</Link>
                                </li>
                            </ul>
                        </div>

                        <div className="links-column">
                            <h4>Полезное</h4>
                            <ul>
                                <li>
                                    <Link href="/blog">Блог</Link>
                                </li>
                                <li>
                                    <Link href="#">Готовые схемы</Link>
                                </li>
                                <li>
                                    <Link href="/loyalty-program">Программа лояльности</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    );
}
