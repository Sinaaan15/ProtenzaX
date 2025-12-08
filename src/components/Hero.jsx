import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from './Button';
import heroBg from '../assets/hero-bg.png';

const Hero = () => {
    return (
        <section id="home" className="relative h-screen w-full overflow-hidden flex items-center">
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src={heroBg}
                    alt="ProtenzaX Hero"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            Built by <span className="text-primary text-shadow-neon">Dedication</span>.<br />
                            Fueled by <span className="text-primary text-shadow-neon">Protein</span>.
                        </h1>
                        <p className="text-zinc-300 text-lg md:text-xl mb-8 max-w-lg">
                            The ultimate fuel station for your workout. Freshly blended protein shakes and snacks, right where you need them.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button variant="primary" className="flex items-center justify-center gap-2">
                                Order Now <ArrowRight size={20} />
                            </Button>
                            <Link to="/#menu">
                                <Button variant="outline" className="flex items-center justify-center w-full sm:w-auto">
                                    View Menu
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
