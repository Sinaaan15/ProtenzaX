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
                    className="fixed bottom-6 right-6 z-[40] bg-primary text-black px-6 py-3 rounded-full shadow-lg shadow-primary/30 flex items-center gap-2 font-bold hover:bg-white transition-colors"
                >
                    <ShoppingBag size={20} strokeWidth={2.5} />
                    <span>View Cart</span>
                    <span className="bg-black text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center justify-center min-w-[20px]">
                        {cartCount}
                    </span>
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default FloatingCartButton;
