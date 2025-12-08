import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyle = "px-6 py-2 rounded-full font-bold transition-all duration-300 transform hover:scale-105 active:scale-95";
    const variants = {
        primary: "bg-primary text-black hover:shadow-[0_0_20px_rgba(212,255,0,0.6)]",
        secondary: "border-2 border-white text-white hover:bg-white hover:text-black",
        outline: "border border-zinc-700 text-zinc-300 hover:border-primary hover:text-primary",
    };

    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            className={`${baseStyle} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;
