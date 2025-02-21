import  { createContext, useContext, useState, ReactNode } from 'react';

interface CartContextType {
    cartCount: number;
    addToCart: () => void;
    removeFromCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartCount, setCartCount] = useState(0);

    const addToCart = () => setCartCount(cartCount + 1);
    const removeFromCart = () => setCartCount(Math.max(0, cartCount - 1));

    return (
        <CartContext.Provider value={{ cartCount, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
