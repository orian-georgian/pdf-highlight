import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { TextOption } from '../types';

interface SelectedTextContextProps {
    selectedText: TextOption | null;
    setSelectedText: (text: TextOption | null) => void;
}

const SelectedTextContext = createContext<SelectedTextContextProps | undefined>(undefined);

export const SelectedTextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedText, setSelectedText] = useState<TextOption | null>(null);

    return (
        <SelectedTextContext.Provider value={{ selectedText, setSelectedText }}>
            {children}
        </SelectedTextContext.Provider>
    );
};

export const useSelectedText = (): SelectedTextContextProps => {
    const context = useContext(SelectedTextContext);
    if (!context) {
        throw new Error('useSelectedText must be used within a SelectedTextProvider');
    }
    return context;
}; 