import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag, AlertTriangle, ChevronRight, Tag, Info } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Button from './Button';

const CartDrawer = () => {
    const {
        isCartOpen,
        toggleCart,
        cartItems,
        billDetails,
        updateQuantity,
        removeFromCart,
        clearCart,
        tip,
        setTip,
        setCoupon,
        coupon
    } = useCart();

    const [showClearConfirm, setShowClearConfirm] = useState(false);
    const [couponInput, setCouponInput] = useState('');
    const [couponMessage, setCouponMessage] = useState('');
    const [customTipOpen, setCustomTipOpen] = useState(false);
    const [customTipValue, setCustomTipValue] = useState('');

    const handleApplyCoupon = () => {
        if (!couponInput.trim()) return;

        // Mock coupon logic
        if (couponInput.toUpperCase() === 'PROTEIN10') {
            setCoupon({ code: 'PROTEIN10', discount: 10 });
            setCouponMessage('Coupon applied! 10% Off');
        } else if (couponInput.toUpperCase() === 'WELCOME50') {
            setCoupon({ code: 'WELCOME50', discount: 50 });
            setCouponMessage('Coupon applied! 50% Off');
        } else {
            setCoupon(null);
            setCouponMessage('Invalid coupon code');
        }
    };

    const handleCustomTipChange = (e) => {
        const val = e.target.value;
        if (val === '') {
            setCustomTipValue('');
            setTip(0);
            return;
        }

        let numVal = parseInt(val);
        if (numVal > 1000) numVal = 1000;

        setCustomTipValue(numVal.toString());
        setTip(numVal);
    };

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
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-zinc-950 border-l border-zinc-800 shadow-2xl z-[70] flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50 backdrop-blur">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <ShoppingBag className="text-primary" size={24} /> Your Cart
                            </h2>
                            <button
                                onClick={toggleCart}
                                className="text-zinc-400 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                            {cartItems.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center text-zinc-500">
                                    <ShoppingBag size={64} className="mb-6 opacity-20" />
                                    <p className="text-xl font-bold mb-2">Cart is empty</p>
                                    <p className="text-sm">Start adding some fuel to your workout!</p>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {/* Clear Cart Logic */}
                                    {showClearConfirm ? (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="bg-red-500/10 border border-red-500/50 rounded-xl p-4"
                                        >
                                            <div className="flex items-center gap-2 text-red-500 font-bold mb-2 text-sm">
                                                <AlertTriangle size={16} />
                                                Clear entire cart?
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => {
                                                        clearCart();
                                                        setShowClearConfirm(false);
                                                    }}
                                                    className="flex-1 bg-red-500 text-white py-1.5 rounded-lg text-xs font-bold hover:bg-red-600 transition-colors"
                                                >
                                                    Yes, Clear
                                                </button>
                                                <button
                                                    onClick={() => setShowClearConfirm(false)}
                                                    className="flex-1 bg-zinc-800 text-zinc-300 py-1.5 rounded-lg text-xs font-medium hover:bg-zinc-700 transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <div className="flex justify-end">
                                            <button
                                                onClick={() => setShowClearConfirm(true)}
                                                className="text-xs text-zinc-500 hover:text-red-400 flex items-center gap-1 transition-colors"
                                            >
                                                <Trash2 size={12} /> Remove All
                                            </button>
                                        </div>
                                    )}

                                    {/* Items List */}
                                    <div className="space-y-4">
                                        {cartItems.map((item) => (
                                            <motion.div
                                                layout
                                                key={item.name}
                                                className="flex gap-4 bg-zinc-900 p-3 rounded-xl border border-zinc-800/50"
                                            >
                                                <div className="flex-1 flex flex-col justify-between">
                                                    <div>
                                                        <h3 className="text-white font-bold text-sm leading-tight mb-1">{item.name}</h3>
                                                        <p className="text-zinc-500 text-xs">{item.tags?.[0]}</p>
                                                    </div>
                                                    <p className="text-primary text-sm font-bold">{item.price}</p>
                                                </div>

                                                <div className="flex flex-col items-end justify-between">
                                                    <button
                                                        onClick={() => removeFromCart(item.name)}
                                                        className="text-zinc-600 hover:text-red-500 transition-colors"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                    <div className="flex items-center gap-2 bg-zinc-950 rounded-lg p-1 border border-zinc-800">
                                                        <button onClick={() => updateQuantity(item.name, -1)} className="text-zinc-400 hover:text-white p-1">
                                                            <Minus size={12} />
                                                        </button>
                                                        <span className="text-white text-xs font-bold w-4 text-center">{item.quantity}</span>
                                                        <button onClick={() => updateQuantity(item.name, 1)} className="text-zinc-400 hover:text-white p-1">
                                                            <Plus size={12} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Divider */}
                                    <div className="h-px bg-zinc-800/50" />

                                    {/* Coupon Code */}
                                    <div className="space-y-2">
                                        <h4 className="text-sm font-bold text-zinc-400 flex items-center gap-2">
                                            <Tag size={14} /> Coupon Code
                                        </h4>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="Try PROTEIN10"
                                                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary/50 placeholder-zinc-600"
                                                value={couponInput}
                                                onChange={(e) => {
                                                    setCouponInput(e.target.value);
                                                    setCouponMessage('');
                                                }}
                                            />
                                            <button
                                                onClick={handleApplyCoupon}
                                                className="text-xs font-bold text-black px-4 py-2 bg-primary rounded-lg hover:bg-white transition-colors"
                                            >
                                                APPLY
                                            </button>
                                        </div>
                                        {couponMessage && (
                                            <p className={`text-xs ${couponMessage.includes('Invalid') ? 'text-red-400' : 'text-green-400'}`}>
                                                {couponMessage}
                                            </p>
                                        )}
                                    </div>

                                    {/* Tip Section */}
                                    <div className="space-y-3">
                                        <h4 className="text-sm font-bold text-zinc-400">Add Tip</h4>
                                        <div className="flex gap-2 flex-wrap">
                                            {[10, 20, 50].map((amt) => (
                                                <button
                                                    key={amt}
                                                    onClick={() => {
                                                        setTip(tip === amt ? 0 : amt);
                                                        setCustomTipOpen(false);
                                                        setCustomTipValue('');
                                                    }}
                                                    className={`px-4 py-2 rounded-lg text-sm font-bold border transition-all ${tip === amt
                                                            ? 'bg-primary text-black border-primary'
                                                            : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                                                        }`}
                                                >
                                                    ₹{amt}
                                                </button>
                                            ))}
                                            <button
                                                onClick={() => {
                                                    setCustomTipOpen(!customTipOpen);
                                                    if (!customTipOpen && ![10, 20, 50].includes(tip)) {
                                                        // keep current tip
                                                    } else if (!customTipOpen) {
                                                        // reset if opening custom
                                                        setTip(0);
                                                        setCustomTipValue('');
                                                    }
                                                }}
                                                className={`px-4 py-2 rounded-lg text-sm font-bold border transition-all ${customTipOpen
                                                        ? 'bg-zinc-800 text-white border-zinc-700'
                                                        : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                                                    }`}
                                            >
                                                Other
                                            </button>
                                        </div>
                                        {customTipOpen && (
                                            <div className="flex gap-2 animate-in fade-in slide-in-from-top-2">
                                                <input
                                                    type="number"
                                                    max="1000"
                                                    placeholder="Enter amount (Max ₹1000)"
                                                    className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary/50"
                                                    value={customTipValue}
                                                    onChange={handleCustomTipChange}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Bill Details */}
                                    <div className="bg-zinc-900 p-4 rounded-xl space-y-3 border border-zinc-800">
                                        <h4 className="text-sm font-bold text-white mb-2">Bill Details</h4>
                                        <div className="flex justify-between text-zinc-400 text-xs">
                                            <span>Item Total</span>
                                            <span>₹{billDetails.itemTotal}</span>
                                        </div>
                                        <div className="flex justify-between text-zinc-400 text-xs">
                                            <span>Tax (5%)</span>
                                            <span>₹{billDetails.tax}</span>
                                        </div>
                                        <div className="flex justify-between text-zinc-400 text-xs">
                                            <span>Platform Fee</span>
                                            <span>₹{billDetails.platformFee}</span>
                                        </div>
                                        {tip > 0 && (
                                            <div className="flex justify-between text-zinc-400 text-xs">
                                                <span>Delivery Tip</span>
                                                <span>₹{tip}</span>
                                            </div>
                                        )}
                                        {billDetails.discount > 0 && (
                                            <div className="flex justify-between text-primary text-xs font-bold">
                                                <span>Coupon Discount</span>
                                                <span>- ₹{billDetails.discount}</span>
                                            </div>
                                        )}
                                        <div className="h-px bg-zinc-800 my-2" />
                                        <div className="flex justify-between text-white font-bold text-sm">
                                            <span>To Pay</span>
                                            <span className="text-xl">₹{billDetails.grandTotal}</span>
                                        </div>
                                    </div>

                                    {/* Disclaimer */}
                                    <div className="flex items-start gap-2 bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
                                        <Info className="text-yellow-500 shrink-0 mt-0.5" size={14} />
                                        <p className="text-[10px] text-yellow-500/80 leading-relaxed font-medium">
                                            Orders cannot be cancelled and are non-refundable once payment is completed and bill is generated.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer / Checkout Button */}
                        {cartItems.length > 0 && (
                            <div className="p-6 border-t border-zinc-800 bg-black/40 backdrop-blur-md">
                                <Button variant="primary" className="w-full justify-between py-4 text-base group px-6">
                                    <span className="font-bold text-black">₹{billDetails.grandTotal}</span>
                                    <span className="flex items-center gap-2 text-black">
                                        Proceed to Pay <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </span>
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
