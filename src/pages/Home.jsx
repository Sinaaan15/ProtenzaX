import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Menu from '../components/Menu';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const Home = () => {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const element = document.getElementById(hash.replace('#', ''));
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
        // Scroll to top if no hash
        else {
            window.scrollTo(0, 0);
        }
    }, [hash]);

    return (
        <>
            <Hero />
            <Features />
            <Menu />
            <section id="contact" className="py-20 bg-primary text-black">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Fuel Up?</h2>
                    <p className="text-lg mb-8 max-w-2xl mx-auto font-medium">
                        Visit us opposite the gym or order online for pickup.
                    </p>
                    <button className="bg-black text-white px-8 py-3 rounded-full font-bold text-lg hover:scale-105 transition-transform">
                        Get Directions
                    </button>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Home;
