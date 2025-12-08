import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const savedCart = localStorage.getItem('protenzax_cart');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error('Failed to load cart from localStorage', error);
            return [];
        }
    });

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [notification, setNotification] = useState(null); // { message: string, visible: boolean }

    useEffect(() => {
        try {
            localStorage.setItem('protenzax_cart', JSON.stringify(cartItems));
        } catch (error) {
            console.error('Failed to save cart to localStorage', error);
        }
    }, [cartItems]);

    // Auto-hide notification after 3 seconds
    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const addToCart = (product) => {
        setCartItems(prev => {
            const existingItem = prev.find(item => item.name === product.name);
            // Using name as ID for now since IDs aren't unique across categories in mock data
            if (existingItem) {
                return prev.map(item =>
                    item.name === product.name
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        // setIsCartOpen(true); // Removed auto-open behavior
        setNotification({ message: `Added ${product.name} to cart` });
    };

    const removeFromCart = (productName) => {
        setCartItems(prev => prev.filter(item => item.name !== productName));
    };

    const updateQuantity = (productName, delta) => {
        setCartItems(prev => {
            return prev.map(item => {
                if (item.name === productName) {
                    const newQuantity = item.quantity + delta;
                    return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
                }
                return item;
            });
        });
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const toggleCart = () => setIsCartOpen(prev => !prev);
    const openCart = () => setIsCartOpen(true);
    const closeNotification = () => setNotification(null);

    // Derived state
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const cartTotal = cartItems.reduce((acc, item) => {
        // Parse price string "₹180" -> 180
        const price = parseInt(item.price.replace(/[^0-9]/g, '')) || 0;
        return acc + (price * item.quantity);
    }, 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            isCartOpen,
            toggleCart,
            openCart,
            cartCount,
            cartTotal,
            notification,
            closeNotification
        }}>
            {children}
        </CartContext.Provider>
    );
};
