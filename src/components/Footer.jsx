import React from 'react';
import { Instagram, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black border-t border-zinc-900 pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <a href="#" className="text-2xl font-bold tracking-tighter block mb-6">
                            PROTENZA<span className="text-primary">X</span>
                        </a>
                        <p className="text-zinc-400 max-w-sm mb-6">
                            Built by Dedication. Fueled by Protein. We are committed to providing the best nutrition for your fitness journey.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-primary hover:bg-zinc-800 transition-all">
                                <Instagram size={20} />
                            </a>
                            <a href="mailto:info@protenzax.in" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-primary hover:bg-zinc-800 transition-all">
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><a href="#home" className="text-zinc-400 hover:text-primary transition-colors">Home</a></li>
                            <li><a href="#menu" className="text-zinc-400 hover:text-primary transition-colors">Menu</a></li>
                            <li><a href="#features" className="text-zinc-400 hover:text-primary transition-colors">Why Us</a></li>
                            <li><a href="#contact" className="text-zinc-400 hover:text-primary transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Visit Us</h4>
                        <ul className="space-y-4">
                            <li className="flex gap-3 text-zinc-400">
                                <MapPin className="text-primary shrink-0" size={20} />
                                <span>Opposite Gold's Gym,<br />Main Street, City Center</span>
                            </li>
                            <li className="flex gap-3 text-zinc-400">
                                <Phone className="text-primary shrink-0" size={20} />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex gap-3 text-zinc-400">
                                <Mail className="text-primary shrink-0" size={20} />
                                <span>info@protenzax.in</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-zinc-900 pt-8 text-center text-zinc-600 text-sm">
                    <p>&copy; 2025 ProtenzaX. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
