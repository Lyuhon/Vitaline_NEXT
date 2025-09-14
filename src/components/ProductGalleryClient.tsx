// // src/components/ProductGalleryClient.tsx
// "use client";

// import { useState } from "react";
// import Image from 'next/image';


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
//     // Включаем главное изображение в начало списка
//     const images = [
//         { sourceUrl: mainImage, altText: mainImageAlt },
//         ...gallery
//     ];

//     const [activeIndex, setActiveIndex] = useState(0);
//     const [isTransitioning, setIsTransitioning] = useState(false);

//     const handleThumbClick = (index: number) => {
//         if (index !== activeIndex) {
//             setIsTransitioning(true);
//             // Задержка для завершения анимации перед сменой изображения
//             setTimeout(() => {
//                 setActiveIndex(index);
//                 setIsTransitioning(false);
//             }, 500); // Время совпадает с CSS transition
//         }
//     };

//     const currentImage = images[activeIndex];

//     return (
//         <div className="gallery_product_block">
//             <div className="current_image_block" style={{ position: "relative", overflow: "hidden" }}>

//                 <Image
//                     src={currentImage.sourceUrl}
//                     alt={currentImage.altText || productName}
//                     className={`fade-image ${isTransitioning ? "transitioning" : ""}`}
//                     style={{
//                         display: "block",
//                         width: "100%",
//                         height: "auto",
//                     }}
//                     width={300} // Задайте подходящие размеры
//                     height={300}
//                 />
//             </div>

//             <div className="gallery_list">
//                 {images.map((img, idx) => (
//                     <Image
//                         key={idx}
//                         src={img.sourceUrl}
//                         alt={img.altText || productName}
//                         className={idx === activeIndex ? "active_gallery_product_item" : ""}
//                         onClick={() => handleThumbClick(idx)}
//                         style={{ cursor: "pointer" }}
//                         width={300} // Задайте подходящие размеры
//                         height={300}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// }



// src/components/ProductGalleryClient.tsx
"use client";

import { useState } from "react";
import Image from 'next/image';
import ExpirationDateDisplay from './ExpirationDateDisplay';

interface ImageNode {
    sourceUrl: string;
    altText?: string;
}

interface Props {
    productName: string;
    mainImage: string;
    mainImageAlt: string;
    gallery: ImageNode[];
    sku?: string;
}

export default function ProductGalleryClient({ productName, mainImage, mainImageAlt, gallery, sku }: Props) {
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

                <Image
                    src={currentImage.sourceUrl}
                    alt={currentImage.altText || productName}
                    className={`fade-image ${isTransitioning ? "transitioning" : ""}`}
                    style={{
                        display: "block",
                        width: "100%",
                        height: "auto",
                    }}
                    width={300} // Задайте подходящие размеры
                    height={300}
                />

                {/* КНОПКА СРОКА ГОДНОСТИ */}
                {sku && (
                    <ExpirationDateDisplay
                        sku={sku}
                        productName={productName}
                        productImage={mainImage}
                    />
                )}
            </div>

            <div className="gallery_list">
                {images.map((img, idx) => (
                    <Image
                        key={idx}
                        src={img.sourceUrl}
                        alt={img.altText || productName}
                        className={idx === activeIndex ? "active_gallery_product_item" : ""}
                        onClick={() => handleThumbClick(idx)}
                        style={{ cursor: "pointer" }}
                        width={300} // Задайте подходящие размеры
                        height={300}
                    />
                ))}
            </div>
        </div>
    );
}
