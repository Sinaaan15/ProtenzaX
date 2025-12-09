import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const FloatingCartButton = () => {
    const { cartCount, openCart, isCartOpen } = useCart();

    // Only show if there are items and cart is not already open
    const shouldShow = cartCount > 0 && !isCartOpen;

    return (
        <AnimatePresence>
            {shouldShow && (
                <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={openCart}
                    className="fixed bottom-6 right-6 z-[40] bg-primary text-black w-16 h-16 rounded-full shadow-lg shadow-primary/30 flex items-center justify-center hover:bg-white transition-colors"
                >
                    <div className="relative">
                        <ShoppingBag size={28} strokeWidth={2.5} />
                        <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                            {cartCount}
                        </span>
                    </div>
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default FloatingCartButton;
