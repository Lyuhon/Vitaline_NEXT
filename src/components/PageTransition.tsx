//src/components/PageTransition.tsx
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const [isAnimating, setIsAnimating] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleLinkClick = (event: MouseEvent) => {
            const target = event.target as HTMLAnchorElement;

            // Проверяем, что клик произошел по ссылке
            if (target.tagName === "A" && target.href) {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
            }
        };

        // Добавляем обработчик кликов
        document.addEventListener("click", handleLinkClick);

        return () => {
            // Убираем обработчик при размонтировании
            document.removeEventListener("click", handleLinkClick);
        };
    }, []); // Выполняется только один раз при монтировании

    useEffect(() => {
        setIsAnimating(true);

        const timer = setTimeout(() => {
            setIsAnimating(false);
        }, 750); // Длительность анимации совпадает с CSS

        return () => clearTimeout(timer);
    }, [pathname]); // Срабатывает при смене маршрута

    return (
        <div
            className={`content-wrapper ${isAnimating ? "page-transition" : ""
                }`}
        >
            {children}
        </div>
    );
}


