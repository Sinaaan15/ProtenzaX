import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Dumbbell, MapPin, DollarSign } from 'lucide-react';

const features = [
    {
        icon: <Zap size={32} />,
        title: "Premium Ingredients",
        description: "We use only the highest quality whey isolate and fresh fruits. No cheap fillers."
    },
    {
        icon: <MapPin size={32} />,
        title: "Right Opposite The Gym",
        description: "Located perfectly for your pre-workout boost or post-workout recovery."
    },
    {
        icon: <DollarSign size={32} />,
        title: "Student Friendly",
        description: "Professional nutrition shouldn't break the bank. Affordable prices for everyone."
    },
    {
        icon: <Dumbbell size={32} />,
        title: "Fitness Focused",
        description: "Curated by fitness lovers, for fitness lovers. We know what your body needs."
    }
];

const FeatureCard = ({ icon, title, description, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 p-6 rounded-2xl hover:border-primary/50 transition-colors group"
        >
            <div className="bg-zinc-800 rounded-full w-12 h-12 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-zinc-400">{description}</p>
        </motion.div>
    );
};

const Features = () => {
    return (
        <section id="features" className="py-20 bg-black">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-white mb-4"
                    >
                        Why <span className="text-primary">ProtenzaX</span>?
                    </motion.h2>
                    <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
