// components/AnimatedWrapper.jsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedWrapper({ children }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="animated-wrapper"
        >
            {children}
        </motion.div>
    );
}
