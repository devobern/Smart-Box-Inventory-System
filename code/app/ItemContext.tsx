import React, { createContext, useContext, useState } from 'react';
import { Item } from '@/app/types/item';

type ItemContextType = {
    items: Item[];
    addItem: (item: Omit<Item, 'id'>) => void; // Accept an item without 'id'
};

const ItemContext = createContext<ItemContextType | undefined>(undefined);

export function ItemProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<Item[]>([]);

    const addItem = (itemWithoutId: Omit<Item, 'id'>) => {
        const itemWithId = {
            ...itemWithoutId,
            id: BigInt(Math.floor(Math.random() * 1000000)), // Temporary ID for testing
            // ID will be assigned automatically when DB is ready
        };
        setItems((prevItems) => [...prevItems, itemWithId]);
    };

    return (
        <ItemContext.Provider value={{ items, addItem }}>
            {children}
        </ItemContext.Provider>
    );
}

export function useItemContext() {
    const context = useContext(ItemContext);
    if (!context) {
        throw new Error('useItemContext must be used within an ItemProvider');
    }
    return context;
}
