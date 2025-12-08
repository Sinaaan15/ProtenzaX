import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import { LogOut, Package, User } from 'lucide-react';
import Navbar from '../components/Navbar';

const Account = ({ onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar isLoggedIn={true} />

            <main className="container mx-auto px-6 pt-32 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
                        <div>
                            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">My Account</h1>
                            <p className="text-zinc-400">Welcome back, Fitness Enthusiast!</p>
                        </div>
                        <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2 mt-4 md:mt-0 bg-red-500/10 border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500">
                            <LogOut size={18} /> Logout
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* User Profile Card */}
                        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 h-fit">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-black text-2xl font-bold">
                                    JS
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">John Smith</h3>
                                    <p className="text-zinc-500">member since 2024</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between border-b border-zinc-800 pb-2">
                                    <span className="text-zinc-400">Email</span>
                                    <span className="text-white">john@example.com</span>
                                </div>
                                <div className="flex justify-between border-b border-zinc-800 pb-2">
                                    <span className="text-zinc-400">Phone</span>
                                    <span className="text-white">+91 99999 00000</span>
                                </div>
                            </div>
                        </div>

                        {/* Orders Section */}
                        <div className="lg:col-span-2">
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <Package className="text-primary" /> Recent Orders
                            </h3>

                            <div className="space-y-4">
                                {[1, 2, 3].map((order) => (
                                    <div key={order} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                        <div>
                                            <div className="flex gap-3 mb-1">
                                                <span className="font-bold text-white">Order #1234{order}</span>
                                                <span className="px-2 py-0.5 bg-green-500/20 text-green-500 text-xs rounded border border-green-500/30">Completed</span>
                                            </div>
                                            <p className="text-zinc-400 text-sm">2 Items • ₹380 • Dec {8 - order}, 2025</p>
                                        </div>
                                        <Button variant="outline" className="text-sm py-1 px-4">Repeat Order</Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default Account;
