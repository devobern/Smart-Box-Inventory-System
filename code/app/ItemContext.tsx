import React, { createContext, useContext, useState } from 'react';

type ItemContextType = {
    items: string[];
    addItem: (item: string) => void;
};

const ItemContext = createContext<ItemContextType | undefined>(undefined);

export function ItemProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<string[]>([]);

    const addItem = (item: string) => {
        setItems((prevItems) => [...prevItems, item]);
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
