// src/app/components/Footer.tsx
import Consultation from "@/components/FooterConsultation";
import Link from 'next/link'

export default function Footer() {
    return (
        <>
            <Consultation />

            <footer id="footer_nav">

                <div className="bottom_nav mobile_visible">
                    <a href="/">
                        <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                            <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />

                            <g id="SVGRepo_iconCarrier"> <path d="M22 22L2 22" stroke="#FF7900" strokeWidth="1.5" strokeLinecap="round" /> <path d="M2 11L6.06296 7.74968M22 11L13.8741 4.49931C12.7784 3.62279 11.2216 3.62279 10.1259 4.49931L9.34398 5.12486" stroke="#FF7900" strokeWidth="1.5" strokeLinecap="round" /> <path d="M15.5 5.5V3.5C15.5 3.22386 15.7239 3 16 3H18.5C18.7761 3 19 3.22386 19 3.5V8.5" stroke="#FF7900" strokeWidth="1.5" strokeLinecap="round" /> <path d="M4 22V9.5" stroke="#FF7900" strokeWidth="1.5" strokeLinecap="round" /> <path d="M20 9.5V13.5M20 22V17.5" stroke="#FF7900" strokeWidth="1.5" strokeLinecap="round" /> <path d="M15 22V17C15 15.5858 15 14.8787 14.5607 14.4393C14.1213 14 13.4142 14 12 14C10.5858 14 9.87868 14 9.43934 14.4393M9 22V17" stroke="#FF7900" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> <path d="M14 9.5C14 10.6046 13.1046 11.5 12 11.5C10.8954 11.5 10 10.6046 10 9.5C10 8.39543 10.8954 7.5 12 7.5C13.1046 7.5 14 8.39543 14 9.5Z" stroke="#FF7900" strokeWidth="1.5" /> </g>

                        </svg>
                    </a>

                    <a href="/shop">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M14 4C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V13M10 4C6.22876 4 4.34315 4 3.17157 5.17157C2 6.34315 2 8.22876 2 12C2 15.7712 2 17.6569 3.17157 18.8284C4.34315 20 6.22876 20 10 20H13" stroke="#FF7900" strokeWidth="1.5" strokeLinecap="round"></path>
                                <path d="M10 16H6" stroke="#FF7900" strokeWidth="1.5" strokeLinecap="round"></path>
                                <circle cx="18" cy="17" r="3" stroke="#FF7900" strokeWidth="1.5"></circle>
                                <path d="M20.5 19.5L21.5 20.5" stroke="#FF7900" strokeWidth="1.5" strokeLinecap="round"></path>
                                <path d="M2 10L7 10M22 10L11 10" stroke="#FF7900" strokeWidth="1.5" strokeLinecap="round"></path>
                            </g>
                        </svg>
                    </a>

                    <a href="/cart">
                        <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                            <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />

                            <g id="SVGRepo_iconCarrier"> <path d="M19.5 9.5L18.7896 6.89465C18.5157 5.89005 18.3787 5.38775 18.0978 5.00946C17.818 4.63273 17.4378 4.34234 17.0008 4.17152C16.5619 4 16.0413 4 15 4M4.5 9.5L5.2104 6.89465C5.48432 5.89005 5.62128 5.38775 5.90221 5.00946C6.18199 4.63273 6.56216 4.34234 6.99922 4.17152C7.43808 4 7.95872 4 9 4" stroke="#FF7900" strokeWidth="1.5" /> <path d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4C15 4.55228 14.5523 5 14 5H10C9.44772 5 9 4.55228 9 4Z" stroke="#FF7900" strokeWidth="1.5" /> <path d="M8 13V17" stroke="#FF7900" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> <path d="M16 13V17" stroke="#FF7900" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> <path d="M12 13V17" stroke="#FF7900" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> <path d="M3.864 16.4552C4.40967 18.6379 4.68251 19.7292 5.49629 20.3646C6.31008 21 7.435 21 9.68486 21H14.3155C16.5654 21 17.6903 21 18.5041 20.3646C19.3179 19.7292 19.5907 18.6379 20.1364 16.4552C20.9943 13.0234 21.4233 11.3075 20.5225 10.1538C19.6217 9 17.853 9 14.3155 9H9.68486C6.14745 9 4.37875 9 3.47791 10.1538C2.94912 10.831 2.87855 11.702 3.08398 13" stroke="#FF7900" strokeWidth="1.5" strokeLinecap="round" /> </g>

                        </svg>
                    </a>

                    <a href="/profile">
                        <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                            <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />

                            <g id="SVGRepo_iconCarrier"> <circle cx="12" cy="6" r="4" stroke="#FF7900" strokeWidth="1.5" /> <path d="M15 20.6151C14.0907 20.8619 13.0736 21 12 21C8.13401 21 5 19.2091 5 17C5 14.7909 8.13401 13 12 13C15.866 13 19 14.7909 19 17C19 17.3453 18.9234 17.6804 18.7795 18" stroke="#FF7900" strokeWidth="1.5" strokeLinecap="round" /> </g>

                        </svg>
                    </a>

                </div>

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
                            <p className="work_shop_info">Телефон для связи: <a href="tel:+998 91 166 00 90">+998 91 166 00 90</a></p>
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
                                    <Link href="/shop">Каталог</Link>
                                </li>
                                {/* <li>
                                    <Link href="#">Доставка</Link>
                                </li> */}
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
                                {/* <li>
                                    <Link href="#">Избранное</Link>
                                </li> */}
                                <li>
                                    <Link href="/cart">Корзина</Link>
                                </li>
                                {/* <li>
                                    <Link href="/profile/points">Мои баллы</Link>
                                </li> */}
                            </ul>
                        </div>

                        <div className="links-column">
                            <h4>Полезное</h4>
                            <ul>
                                <li>
                                    <Link href="/blog">Блог</Link>
                                </li>
                                {/* <li>
                                    <Link href="#">Готовые схемы</Link>
                                </li>
                                <li>
                                    <Link href="/loyalty-program">Программа лояльности</Link>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    );
}
