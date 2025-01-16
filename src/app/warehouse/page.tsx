// src/app/warehouse/page.tsx
import React from 'react';
import './warehouse.css';

export const generateMetadata = () => {
    return {
        title: 'Хранение на складе - Vitaline',
        description: 'Каждый продаваемый продукт хранится на этом складе и доставляется непосредственно нами.',
    };
};

const Warehouse = () => {
    return (
        <section className="loyalty_program_page">
            <div className="loyalty_hero pc_visible"></div>

            {/* <h1>Склады Vitaline</h1> */}

            <div className="loyalty_hero mobile_visible"></div>

            <div className="div-text_added">

                <div className="hr_added_by_Lyuhon">
                    <h3 className="align_center_h3">🔰 Почему стоит выбрать vitaline-trade.com</h3>
                    <p>
                        ✅Мы собрали оригинальные товары из США и Европы, которые отличаются интересным вкусом и отменным
                        составом. При этом многое из нашего ассортимента не продается на местном рынке.
                    </p>
                    <p>
                        ✅В Vitaline.uz вы найдете различные витамины и микроэлементы, а также уникальные продукты и
                        пищевые добавки, которые помогут улучшить и сбалансировать ежедневный рацион.
                    </p>
                </div>


                <div className="hr_added_by_Lyuhon">
                    <h3 className="align_center_h3">🔰 В чём же наши преимущества?</h3>
                    <p>
                        ✅ Занимаясь продажей биологически активных добавок, Vitaline имеет собственное просторное
                        складское помещение. Его огромная площадь и оптимальные условия хранения помогают сохранить
                        добавки в идеальном состоянии продолжительное время.
                    </p>
                    <p>
                        ✅ Грамотно обустроенное складское помещение позволяет обеспечить надежное хранение товаров.
                        Созданные условия позволяют защитить добавки от влажности, жары и холода.
                    </p>
                    <p>
                        ✅ Каждый продаваемый продукт хранится на этом складе и доставляется непосредственно нами. Благодаря
                        этому мы гарантируем свежесть и качество каждого средства!
                    </p>
                </div>

                <div className="warehouse" id="warehouse">
                    <picture>
                        <source
                            media="(max-width: 768px)"
                            srcSet="https://www.vitaline.uz/wp-content/uploads/2024/04/wharehouse_mobile-min.jpg"
                        />
                        <img
                            className="pc_img"
                            src="https://www.vitaline.uz/wp-content/uploads/2024/04/wharehouse-min.jpg"
                            alt="Склад Vitaline"
                        />
                    </picture>

                    <div className="wharehouse_description">

                        <h3 className="align_center_h3">🔰 Наши склады</h3>

                        <div className="wharehouse_items_list">
                            <div className="wharehouse_item">
                                <div className="icon">
                                    <img
                                        src="https://www.vitaline.uz/wp-content/uploads/2024/04/thermometer.png"
                                        alt="Контроль температуры"
                                    />
                                </div>
                                <div className="wharehouse_item_desc">
                                    <h4>Контроль температуры:</h4>
                                    <p>
                                        Наши склады оборудованы системами температурного контроля, что позволяет
                                        поддерживать оптимальные условия хранения каждого вида витаминов.
                                    </p>
                                </div>
                            </div>

                            <div className="wharehouse_item">
                                <div className="icon">
                                    <img
                                        src="https://www.vitaline.uz/wp-content/uploads/2024/04/humidity.png"
                                        alt="Контроль влажности"
                                    />
                                </div>
                                <div className="wharehouse_item_desc">
                                    <h4>Контроль влажности:</h4>
                                    <p>
                                        Мы также контролируем влажность на наших складах, чтобы предотвратить порчу
                                        продуктов и сохранить их свежими.
                                    </p>
                                </div>
                            </div>

                            <div className="wharehouse_item">
                                <div className="icon">
                                    <img
                                        src="https://www.vitaline.uz/wp-content/uploads/2024/04/ventilator.png"
                                        alt="Системы вентиляции"
                                    />
                                </div>
                                <div className="wharehouse_item_desc">
                                    <h4>Системы вентиляции:</h4>
                                    <p>
                                        Все наши склады оборудованы современными системами вентиляции, которые
                                        обеспечивают циркуляцию свежего воздуха и предотвращают скопление запахов и
                                        вредных веществ.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <p>
                    💯Выбирая нас, вы выбираете качество, безопасность и удобство!
                </p>
                <hr className="hr_added_by_Lyuhon" />
            </div>
        </section>
    );
};

export default Warehouse;
