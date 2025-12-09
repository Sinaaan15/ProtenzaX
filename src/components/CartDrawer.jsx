import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag, AlertTriangle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Button from './Button';

const CartDrawer = () => {
    const {
        isCartOpen,
        toggleCart,
        cartItems,
        cartTotal,
        updateQuantity,
        removeFromCart,
        clearCart
    } = useCart();

    const [showClearConfirm, setShowClearConfirm] = useState(false);

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-zinc-900 border-l border-zinc-800 shadow-2xl z-[70] flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                <ShoppingBag className="text-primary" /> Your Cart
                            </h2>
                            <button
                                onClick={toggleCart}
                                className="text-zinc-400 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cartItems.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center text-zinc-500">
                                    <ShoppingBag size={48} className="mb-4 opacity-20" />
                                    <p className="text-lg">Your cart is empty.</p>
                                    <p className="text-sm">Go add some protein!</p>
                                </div>
                            ) : (
                                <>
                                    {showClearConfirm && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 mb-4"
                                        >
                                            <div className="flex items-center gap-2 text-red-500 font-bold mb-2">
                                                <AlertTriangle size={18} />
                                                Clear entire cart?
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => {
                                                        clearCart();
                                                        setShowClearConfirm(false);
                                                    }}
                                                    className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm font-bold hover:bg-red-600 transition-colors"
                                                >
                                                    Yes, Clear All
                                                </button>
                                                <button
                                                    onClick={() => setShowClearConfirm(false)}
                                                    className="flex-1 bg-zinc-800 text-zinc-300 py-2 rounded-lg text-sm font-medium hover:bg-zinc-700 transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {!showClearConfirm && (
                                        <div className="flex justify-end mb-2">
                                            <button
                                                onClick={() => setShowClearConfirm(true)}
                                                className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
                                            >
                                                <Trash2 size={12} /> Remove All
                                            </button>
                                        </div>
                                    )}

                                    {cartItems.map((item) => (
                                        <motion.div
                                            layout
                                            key={item.name}
                                            className="flex gap-4 bg-black/40 p-4 rounded-xl border border-zinc-800/50"
                                        >
                                            <div className="flex-1">
                                                <h3 className="text-white font-bold">{item.name}</h3>
                                                <p className="text-primary text-sm font-medium">{item.price}</p>
                                            </div>

                                            <div className="flex flex-col items-end justify-between gap-2">
                                                <button
                                                    onClick={() => removeFromCart(item.name)}
                                                    className="text-zinc-500 hover:text-red-500 transition-colors p-1"
                                                >
                                                    <Trash2 size={16} />
                                                </button>

                                                <div className="flex items-center gap-3 bg-zinc-900 rounded-lg p-1 border border-zinc-800">
                                                    <button
                                                        onClick={() => updateQuantity(item.name, -1)}
                                                        className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition-colors"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="text-white text-sm font-bold min-w-[20px] text-center">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.name, 1)}
                                                        className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition-colors"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </>
                            )}
                        </div>

                        {/* Footer / Checkout */}
                        {cartItems.length > 0 && (
                            <div className="p-6 border-t border-zinc-800 bg-black/20">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-zinc-400">Subtotal</span>
                                    <span className="text-2xl font-bold text-white">₹{cartTotal}</span>
                                </div>
                                <Button variant="primary" className="w-full justify-center py-4 text-lg">
                                    Checkout Now
                                </Button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
