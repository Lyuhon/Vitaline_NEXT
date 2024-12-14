'use client';

const YandexMap = () => {
    return (
        <div className="map_wrapper" style={{ height: '400px', width: '100%' }}>
            <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3Aae02b8e6909a4ac1b7e37ec17aec195024d8dcaa60feaaf92981401a542b5b0e&amp;source=constructor"
                width="100%"
                height="400"
                frameBorder="0"
                title="Yandex Map"
            ></iframe>
        </div>
    );
};

export default YandexMap;
