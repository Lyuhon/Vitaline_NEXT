// src/context/MiniCartContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MiniCartItem {
    productId: string;
    productName: string;
    productImage: string;
    productPrice: number;
    quantity: number;
}

interface MiniCartContextType {
    lastAddedItem: MiniCartItem | null;
    setLastAddedItem: (item: MiniCartItem) => void;
    clearLastAddedItem: () => void;
}

const MiniCartContext = createContext<MiniCartContextType | undefined>(undefined);

export const MiniCartProvider = ({ children }: { children: ReactNode }) => {
    const [lastAddedItem, setLastAddedItemState] = useState<MiniCartItem | null>(null);

    const setLastAddedItem = (item: MiniCartItem) => {
        setLastAddedItemState(item);
    };

    const clearLastAddedItem = () => {
        setLastAddedItemState(null);
    };

    return (
        <MiniCartContext.Provider value={{ lastAddedItem, setLastAddedItem, clearLastAddedItem }}>
            {children}
        </MiniCartContext.Provider>
    );
};

export const useMiniCart = () => {
    const context = useContext(MiniCartContext);
    if (!context) {
        throw new Error('useMiniCart must be used within a MiniCartProvider');
    }
    return context;
};
