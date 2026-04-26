import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. إنشاء الـ Context
const CartContext = createContext();

// 2. إنشاء الـ Provider
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('app_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('app_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems((prev) => {
            const isExist = prev.find(item => item.id === product.id);
            if (isExist) {
                
                return prev.map(item => 
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
           
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id, type) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === id) {
                if (type === 'inc') {
                    return { ...item, quantity: item.quantity + 1 };
                } else if (type === 'dec' && item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                }
            }
            return item;
        }));
    };
    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('app_cart');
    };

    return (
        <CartContext.Provider value={{ 
            cartItems, 
            addToCart, 
            removeFromCart, 
            updateQuantity, 
            clearCart 
        }}>
            {children}
        </CartContext.Provider>
    );
};


export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};