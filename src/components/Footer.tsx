// src/app/components/Footer.tsx
import Consultation from "@/components/FooterConsultation";
import Link from 'next/link'
import CartCounter from '@/components/CartCounter';

export default function Footer() {
    return (
        <>
            <Consultation />

            <footer id="footer_nav">

                <div className="bottom_nav mobile_visible">
                    <Link href="/">

                        <svg
                            version="1.1"
                            id="Capa_1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            viewBox="0 0 512 512"
                            xmlSpace="preserve"
                        >
                            <g>
                                <g>
                                    <path fill="#FF7900" d="M506.188,236.413L297.798,26.65c-0.267-0.27-0.544-0.532-0.826-0.786c-22.755-20.431-57.14-20.504-79.982-0.169
                            c-0.284,0.253-0.56,0.514-0.829,0.782L5.872,236.352c-7.818,7.804-7.831,20.467-0.028,28.285
                            c7.804,7.818,20.467,7.83,28.284,0.028L50,248.824v172.684c0,44.112,35.888,80,80,80h72c11.046,0,20-8.954,20-20v-163h70v163
                            c0,11.046,8.954,20,20,20h70c44.112,0,80-35.888,80-80c0-11.046-8.954-20-20-20c-11.046,0-20,8.954-20,20
                            c0,22.056-17.944,40-40,40h-50v-163c0-11.046-8.954-20-20-20H202c-11.046,0-20,8.954-20,20v163h-52c-22.056,0-40-17.944-40-40
                            v-212c0-0.2-0.003-0.399-0.009-0.597L243.946,55.26c7.493-6.363,18.483-6.339,25.947,0.055L422,208.425v113.083
                            c0,11.046,8.954,20,20,20c11.046,0,20-8.954,20-20v-72.82l15.812,15.917c3.909,3.935,9.047,5.904,14.188,5.904
                            c5.097,0,10.195-1.937,14.096-5.812C513.932,256.912,513.974,244.249,506.188,236.413z"></path>
                                </g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                        </svg>
                    </Link>

                    <Link href="/shop">

                        <svg style={{ width: '32px' }} viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M7.30524 15.7137C6.4404 14.8306 5.85381 13.7131 5.61824 12.4997C5.38072 11.2829 5.50269 10.0233 5.96924 8.87469C6.43181 7.73253 7.22153 6.75251 8.23924 6.05769C10.3041 4.64744 13.0224 4.64744 15.0872 6.05769C16.105 6.75251 16.8947 7.73253 17.3572 8.87469C17.8238 10.0233 17.9458 11.2829 17.7082 12.4997C17.4727 13.7131 16.8861 14.8306 16.0212 15.7137C14.8759 16.889 13.3044 17.5519 11.6632 17.5519C10.0221 17.5519 8.45059 16.889 7.30524 15.7137V15.7137Z" stroke="#FF7900" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M11.6702 7.20292C11.2583 7.24656 10.9598 7.61586 11.0034 8.02777C11.0471 8.43968 11.4164 8.73821 11.8283 8.69457L11.6702 7.20292ZM13.5216 9.69213C13.6831 10.0736 14.1232 10.2519 14.5047 10.0904C14.8861 9.92892 15.0644 9.4888 14.9029 9.10736L13.5216 9.69213ZM16.6421 15.0869C16.349 14.7943 15.8741 14.7947 15.5815 15.0879C15.2888 15.381 15.2893 15.8559 15.5824 16.1485L16.6421 15.0869ZM18.9704 19.5305C19.2636 19.8232 19.7384 19.8228 20.0311 19.5296C20.3237 19.2364 20.3233 18.7616 20.0301 18.4689L18.9704 19.5305ZM11.8283 8.69457C12.5508 8.61801 13.2384 9.02306 13.5216 9.69213L14.9029 9.10736C14.3622 7.83005 13.0496 7.05676 11.6702 7.20292L11.8283 8.69457ZM15.5824 16.1485L18.9704 19.5305L20.0301 18.4689L16.6421 15.0869L15.5824 16.1485Z" fill="#FF7900"></path> </g></svg>
                    </Link>

                    <Link style={{ position: "relative" }} href="/cart">
                        <CartCounter />
                        <svg id="Layer_1" enableBackground="new 0 0 511.728 511.728" height="512" viewBox="0 0 511.728 511.728" width="512" xmlns="http://www.w3.org/2000/svg"><path style={{ fill: '#FF7900' }} d="m147.925 379.116c-22.357-1.142-21.936-32.588-.001-33.68 62.135.216 226.021.058 290.132.103 17.535 0 32.537-11.933 36.481-29.017l36.404-157.641c2.085-9.026-.019-18.368-5.771-25.629s-14.363-11.484-23.626-11.484c-25.791 0-244.716-.991-356.849-1.438l-17.775-65.953c-4.267-15.761-18.65-26.768-34.978-26.768h-56.942c-8.284 0-15 6.716-15 15s6.716 15 15 15h56.942c2.811 0 5.286 1.895 6.017 4.592l68.265 253.276c-12.003.436-23.183 5.318-31.661 13.92-8.908 9.04-13.692 21.006-13.471 33.695.442 25.377 21.451 46.023 46.833 46.023h21.872c-3.251 6.824-5.076 14.453-5.076 22.501 0 28.95 23.552 52.502 52.502 52.502s52.502-23.552 52.502-52.502c0-8.049-1.826-15.677-5.077-22.501h94.716c-3.248 6.822-5.073 14.447-5.073 22.493 0 28.95 23.553 52.502 52.502 52.502 28.95 0 52.503-23.553 52.503-52.502 0-8.359-1.974-16.263-5.464-23.285 5.936-1.999 10.216-7.598 10.216-14.207 0-8.284-6.716-15-15-15zm91.799 52.501c0 12.408-10.094 22.502-22.502 22.502s-22.502-10.094-22.502-22.502c0-12.401 10.084-22.491 22.483-22.501h.038c12.399.01 22.483 10.1 22.483 22.501zm167.07 22.494c-12.407 0-22.502-10.095-22.502-22.502 0-12.285 9.898-22.296 22.137-22.493h.731c12.24.197 22.138 10.208 22.138 22.493-.001 12.407-10.096 22.502-22.504 22.502zm74.86-302.233c.089.112.076.165.057.251l-15.339 66.425h-51.942l8.845-67.023 58.149.234c.089.002.142.002.23.113zm-154.645 163.66v-66.984h53.202l-8.84 66.984zm-74.382 0-8.912-66.984h53.294v66.984zm-69.053 0h-.047c-3.656-.001-6.877-2.467-7.828-5.98l-16.442-61.004h54.193l8.912 66.984zm56.149-96.983-9.021-67.799 66.306.267v67.532zm87.286 0v-67.411l66.022.266-8.861 67.145zm-126.588-67.922 9.037 67.921h-58.287l-18.38-68.194zm237.635 164.905h-36.426l8.84-66.984h48.973l-14.137 61.217c-.784 3.396-3.765 5.767-7.25 5.767z"></path></svg>
                    </Link>

                    <Link href="/profile">
                        <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                            <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />

                            <g id="SVGRepo_iconCarrier"> <circle cx="12" cy="6" r="4" stroke="#FF7900" strokeWidth="1.5" /> <path d="M15 20.6151C14.0907 20.8619 13.0736 21 12 21C8.13401 21 5 19.2091 5 17C5 14.7909 8.13401 13 12 13C15.866 13 19 14.7909 19 17C19 17.3453 18.9234 17.6804 18.7795 18" stroke="#FF7900" strokeWidth="1.5" strokeLinecap="round" /> </g>

                        </svg>
                    </Link>

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
                            <p className="work_shop_info">Телефон для связи: <Link href="tel:+998 95 099 00 90">+998 95 099 00 90</Link></p>
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
