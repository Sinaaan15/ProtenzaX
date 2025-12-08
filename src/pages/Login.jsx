import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import { User, Lock, ArrowLeft } from 'lucide-react';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Simulate login
        if (email) {
            onLogin(); // Update global auth state
            navigate('/account');
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute top-[40%] -left-[10%] w-[40%] h-[40%] bg-zinc-800/20 rounded-full blur-3xl"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-2xl relative z-10"
            >
                <button
                    onClick={() => navigate('/')}
                    className="text-zinc-400 hover:text-white mb-6 flex items-center gap-2 transition-colors"
                >
                    <ArrowLeft size={16} /> Back to Home
                </button>

                <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                <p className="text-zinc-400 mb-8">Login to manage your orders and rewards.</p>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-zinc-300 text-sm font-medium">Email Address</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                            <input
                                type="email"
                                required
                                className="w-full bg-black border border-zinc-800 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary transition-colors"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-zinc-300 text-sm font-medium">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                            <input
                                type="password"
                                required
                                className="w-full bg-black border border-zinc-800 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary transition-colors"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <Button type="submit" variant="primary" className="w-full justify-center">
                        Login
                    </Button>

                    <p className="text-center text-zinc-500 text-sm mt-4">
                        Don't have an account? <span className="text-primary cursor-pointer hover:underline">Sign Up</span>
                    </p>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;
