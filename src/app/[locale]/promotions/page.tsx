// src/app/blog/page.tsx
import { Metadata } from "next";
import './promos.css';

// Функция для генерации метаданных
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Промоакции - Vitaline.uz",
        description: "Читайте полезные посты на нашем блоге.",
    };
}

export default async function PromosPage() {

    return (
        <section className="promos_page">
            <h1>Актуальные акции</h1>

            <div className="promo_banner_list">

                <div className="promo_banner" style={{ backgroundImage: 'url(https://www.vitaline.uz/wp-content/uploads/2024/05/child-min.jpg)' }}>
                    <div className="overlay_home_sldr">
                    </div>
                </div>

                <div className="promo_banner" style={{ backgroundImage: 'url(https://www.vitaline.uz/wp-content/uploads/2021/03/carlson-min.jpg)' }}>
                    <div className="overlay_home_sldr">
                    </div>
                </div>

                <div className="promo_banner" style={{ backgroundImage: 'url(https://www.vitaline.uz/wp-content/uploads/2024/05/oblozhka-dlya-sajta3-2-min.jpg)' }}>
                    <div className="overlay_home_sldr">
                    </div>
                </div>

                <div className="promo_banner" style={{ backgroundImage: 'url(https://www.vitaline.uz/wp-content/uploads/2021/03/62e2dff2-4958-409a-b9b3-034fda03ddc1.jpeg)' }}>
                    <div className="overlay_home_sldr">
                    </div>
                </div>

                <div className="promo_banner" style={{ backgroundImage: 'url(https://www.vitaline.uz/wp-content/uploads/2022/12/2.jpg)' }}>
                    <div className="overlay_home_sldr">
                    </div>
                </div>

            </div>


        </section>
    );
}
