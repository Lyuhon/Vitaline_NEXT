// // src/components/ProductGalleryClient.tsx
// "use client";

// import { useState } from 'react';

// interface ImageNode {
//     sourceUrl: string;
//     altText?: string;
// }

// interface Props {
//     productName: string;
//     mainImage: string;
//     mainImageAlt: string;
//     gallery: ImageNode[];
// }

// export default function ProductGalleryClient({ productName, mainImage, mainImageAlt, gallery }: Props) {
//     // Объединяем главное изображение с галереей.
//     const images = [{ sourceUrl: mainImage, altText: mainImageAlt }, ...gallery];

//     const [activeIndex, setActiveIndex] = useState(0);

//     const handleThumbClick = (index: number) => {
//         setActiveIndex(index);
//     };

//     return (
//         <div className="gallery_product_block">
//             <div className="current_image_block" style={{ position: 'relative', overflow: 'hidden' }}>
//                 {/* Добавляем класс для плавной анимации */}
//                 <img
//                     key={images[activeIndex].sourceUrl}
//                     src={images[activeIndex].sourceUrl}
//                     alt={images[activeIndex].altText || productName}
//                     className="fade-image"
//                     style={{
//                         transition: 'opacity 0.3s ease-in-out',
//                         opacity: 1,
//                         display: 'block',
//                         width: '100%',
//                         height: 'auto'
//                     }}
//                 />
//             </div>

//             <div className="gallery_list">
//                 {images.map((img, idx) => (
//                     <img
//                         key={idx}
//                         src={img.sourceUrl}
//                         alt={img.altText || productName}
//                         className={idx === activeIndex ? 'active_gallery_product_item' : ''}
//                         onClick={() => handleThumbClick(idx)}
//                         style={{ cursor: 'pointer' }}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// }


// src/components/ProductGalleryClient.tsx
"use client";

import { useState } from "react";

interface ImageNode {
    sourceUrl: string;
    altText?: string;
}

interface Props {
    productName: string;
    mainImage: string;
    mainImageAlt: string;
    gallery: ImageNode[];
}

export default function ProductGalleryClient({ productName, mainImage, mainImageAlt, gallery }: Props) {
    // Включаем главное изображение в начало списка
    const images = [
        { sourceUrl: mainImage, altText: mainImageAlt },
        ...gallery
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleThumbClick = (index: number) => {
        if (index !== activeIndex) {
            setIsTransitioning(true);
            // Задержка для завершения анимации перед сменой изображения
            setTimeout(() => {
                setActiveIndex(index);
                setIsTransitioning(false);
            }, 500); // Время совпадает с CSS transition
        }
    };

    const currentImage = images[activeIndex];

    return (
        <div className="gallery_product_block">
            <div className="current_image_block" style={{ position: "relative", overflow: "hidden" }}>
                <img
                    src={currentImage.sourceUrl}
                    alt={currentImage.altText || productName}
                    className={`fade-image ${isTransitioning ? "transitioning" : ""}`}
                    style={{
                        display: "block",
                        width: "100%",
                        height: "auto",
                    }}
                />
            </div>

            <div className="gallery_list">
                {images.map((img, idx) => (
                    <img
                        key={idx}
                        src={img.sourceUrl}
                        alt={img.altText || productName}
                        className={idx === activeIndex ? "active_gallery_product_item" : ""}
                        onClick={() => handleThumbClick(idx)}
                        style={{ cursor: "pointer" }}
                    />
                ))}
            </div>
        </div>
    );
}
