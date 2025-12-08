import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ShoppingBag, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Toast = () => {
    const { notification, closeNotification, openCart } = useCart();

    return (
        <AnimatePresence>
            {notification && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] flex items-center gap-4 bg-zinc-900 border border-zinc-800 text-white px-4 py-3 rounded-xl shadow-2xl max-w-sm w-full mx-4 sm:w-auto"
                >
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                        <Check size={16} />
                    </div>

                    <p className="text-sm font-medium flex-1 truncate mr-2">
                        {notification.message}
                    </p>

                    <button
                        onClick={() => {
                            openCart();
                            closeNotification();
                        }}
                        className="text-xs font-bold bg-primary text-black px-3 py-1.5 rounded-lg hover:bg-white transition-colors shrink-0"
                    >
                        Go to Cart
                    </button>

                    <button
                        onClick={closeNotification}
                        className="text-zinc-500 hover:text-white transition-colors"
                    >
                        <X size={16} />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Toast;
