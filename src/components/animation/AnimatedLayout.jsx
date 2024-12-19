// components/animation/AnimatedLayout.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function AnimatedLayout({ children }) {
    const pathname = usePathname();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // Устанавливаем флаг после монтирования компонента на клиенте
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        // Рендерим без анимации при первоначальной загрузке
        return <div className="animated-wrapper">{children}</div>;
    }

    return (
        <AnimatePresence mode="wait" initial={false}>
            <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="animated-wrapper"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
