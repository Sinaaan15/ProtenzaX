import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ShoppingBag, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Toast = () => {
    const { notification, closeNotification, openCart } = useCart();

    return (
        <div className="fixed bottom-4 left-0 right-0 z-[80] flex justify-center px-4 pointer-events-none">
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="pointer-events-auto flex items-center gap-4 bg-zinc-900 border border-zinc-800 text-white px-4 py-3 rounded-xl shadow-2xl w-full md:w-auto md:min-w-[300px]"
                    >
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                            <Check size={16} />
                        </div>

                        <p className="text-sm font-medium flex-1 truncate mr-2">
                            {notification.message}
                        </p>

                        <button
                            onClick={closeNotification}
                            className="text-zinc-500 hover:text-white transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Toast;
