import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Coffee, Cookie, Zap } from 'lucide-react';
import Button from './Button';

// Data sourced from protenzax.in
const menuCategories = [
    {
        id: 'shakes',
        label: 'Protien Shakes',
        icon: <Coffee size={20} />,
        items: [
            { name: "Chocolate", price: "₹180", tags: ["Classic", "Whey"], description: "Rich chocolate blend with premium whey protein." },
            { name: "Belgian Chocolate", price: "₹200", tags: ["Premium", "Rich"], description: "Indulgent Belgian perfection for chocolate lovers." },
            { name: "Vanilla", price: "₹170", tags: ["Smooth", "Versatile"], description: "Classic vanilla bean creamy protein shake." },
            { name: "Cookies and Cream", price: "₹190", tags: ["Cookies", "Tasty"], description: "Crunchy cookie bits blended with smooth cream." },
            { name: "Banana Oats Shake", price: "₹180", tags: ["Energy", "Filling"], description: "Natural banana sweetness with fibrous oats." },
            { name: "Strawberry Whey", price: "₹180", tags: ["Fruity", "Fresh"], description: "Sweet strawberry flavor for a refreshing post-workout." },
        ]
    },
    {
        id: 'snacks',
        label: 'Healthy Snacks',
        icon: <Cookie size={20} />,
        items: [
            { name: "Protein Bar", price: "₹100", tags: ["On-the-go", "High Protein"], description: "Dense protein packed bar for quick recovery." },
            { name: "Protein Brownie", price: "₹120", tags: ["Baked", "Chocolate"], description: "Guilt-free chocolate brownie with added protein." },
            { name: "Oats Energy Bar", price: "₹90", tags: ["Fiber", "Energy"], description: "Sustained energy from rolled oats and honey." },
            { name: "Peanut Butter Cookies", price: "₹80", tags: ["Nutty", "Crunchy"], description: "Homemade style peanut butter protein cookies." },
            { name: "Greek Yogurt Bowl", price: "₹150", tags: ["Probiotic", "Fresh"], description: "Thick greek yogurt topped with fruits and nuts." },
        ]
    },
    {
        id: 'creatines',
        label: 'Creatines',
        icon: <Zap size={20} />,
        items: [
            { name: "Unflavoured", price: "₹800", tags: ["Pure", "Stackable"], description: "100% pure micronized creatine monohydrate." },
            { name: "Fruit Fusion", price: "₹900", tags: ["Mixed Fruit", "Tangy"], description: "A burst of mixed fruits to power your lift." },
            { name: "Fruit Punch", price: "₹900", tags: ["Classic", "Sweet"], description: "Classic red fruit punch flavor." },
            { name: "Citrus Blast", price: "₹900", tags: ["Lemon", "Zesty"], description: "Refreshing lemon-lime citrus kick." },
            { name: "Tropical Tango", price: "₹900", tags: ["Exotic", "Mango"], description: "Mango and pineapple tropical blend." },
            { name: "Watermelon Kool Aid", price: "₹900", tags: ["Refreshing", "Sweet"], description: "Cool and sweet watermelon flavor." },
        ]
    }
];

const MenuCard = ({ item, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-primary/50 transition-all group flex flex-col h-full"
        >
            <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{item.name}</h3>
                    <span className="text-primary font-bold">{item.price}</span>
                </div>
                <p className="text-sm text-zinc-400 mb-4 flex-1">{item.description}</p>
                <div className="flex justify-between items-center mt-auto">
                    <div className="flex gap-2 flex-wrap">
                        {item.tags.map(tag => (
                            <span key={tag} className="text-xs px-2 py-1 bg-zinc-800 rounded text-zinc-300 border border-zinc-700">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 rounded-full bg-primary text-black flex items-center justify-center hover:bg-white transition-colors shrink-0 ml-2"
                    >
                        <Plus size={18} />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

const Menu = () => {
    const [activeCategory, setActiveCategory] = useState('all');

    const allItems = menuCategories.flatMap(cat => cat.items);

    const displayItems = activeCategory === 'all'
        ? allItems
        : menuCategories.find(c => c.id === activeCategory)?.items || [];

    return (
        <section id="menu" className="py-20 bg-zinc-950">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        Our <span className="text-primary">Menu</span>
                    </h2>
                    <p className="text-zinc-400 max-w-md mx-auto mb-8">
                        Fuel your ambition with our selection of shakes, snacks, and supplements.
                    </p>

                    {/* Category Tabs */}
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        <button
                            onClick={() => setActiveCategory('all')}
                            className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all duration-300 ${activeCategory === 'all'
                                ? 'bg-primary text-black scale-105'
                                : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
                                }`}
                        >
                            All
                        </button>
                        {menuCategories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all duration-300 ${activeCategory === cat.id
                                    ? 'bg-primary text-black scale-105'
                                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
                                    }`}
                            >
                                {cat.icon}
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]">
                    <AnimatePresence mode="popLayout">
                        {displayItems.map((item, index) => (
                            <MenuCard key={`${activeCategory}-${item.name}`} item={item} index={index} />
                        ))}
                    </AnimatePresence>
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Button variant="outline" onClick={() => setActiveCategory('all')}>View Full Menu</Button>
                </div>
            </div>
        </section>
    );
};

export default Menu;
