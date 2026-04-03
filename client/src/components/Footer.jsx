import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Github, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="relative mt-32 border-t border-white/5 bg-black/40 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Branding */}
                <div className="md:col-span-1 space-y-6">
                    <Link to="/" className="text-2xl font-black italic tracking-tighter bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        AUG<span className="text-white">MENU</span>
                    </Link>
                    <p className="text-white/40 text-sm leading-relaxed">
                        Redefining the dining experience with next-generation augmented reality and zero-gravity aesthetics. The future of food is digital.
                    </p>
                    <div className="flex gap-4">
                        <SocialIcon icon={<Twitter className="w-4 h-4" />} />
                        <SocialIcon icon={<Instagram className="w-4 h-4" />} />
                        <SocialIcon icon={<Github className="w-4 h-4" />} />
                    </div>
                </div>

                {/* Quick Links */}
                <div className="space-y-6">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Quantum Links</h4>
                    <ul className="space-y-3 text-white/50 text-xs font-bold uppercase tracking-widest">
                        <li><Link to="/menu" className="hover:text-white transition-colors">Digital Menu</Link></li>
                        <li><Link to="/cart" className="hover:text-white transition-colors">Active Orders</Link></li>
                        <li><Link to="/admin" className="hover:text-white transition-colors">Admin Deck</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div className="space-y-6">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">Signal Channel</h4>
                    <ul className="space-y-4">
                        <ContactItem icon={<Phone className="w-3 h-3 text-secondary" />} text="+1 (555) 000-CYBER" />
                        <ContactItem icon={<Mail className="w-3 h-3 text-secondary" />} text="nexus@augmenu.io" />
                        <ContactItem icon={<MapPin className="w-3 h-3 text-secondary" />} text="Sector 7G, Cyber City" />
                    </ul>
                </div>

                {/* Newsletter */}
                <div className="space-y-6">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Neural Feed</h4>
                    <div className="relative group">
                        <input 
                            type="email" 
                            placeholder="neural-id@mesh.net" 
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-primary transition-all"
                        />
                        <button className="absolute right-1 top-1 bottom-1 px-4 bg-white/10 hover:bg-primary hover:text-black rounded-lg text-[9px] font-black uppercase tracking-widest transition-all">
                            SYNC
                        </button>
                    </div>
                    <p className="text-[9px] text-white/20 uppercase tracking-widest font-bold font-mono">
                        Receive encrypted updates on new menu prototypes
                    </p>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/5 py-8 text-center bg-black/20">
                <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.5em]">
                    &copy; 2026 AUGMENTED MENU SYSTEM. ALL RIGHTS RESERVED BY CYBER-DYNAMICS.
                </p>
            </div>
        </footer>
    );
};

const SocialIcon = ({ icon }) => (
    <a href="#" className="p-2 border border-white/10 rounded-lg hover:border-primary hover:text-primary hover:bg-primary/5 transition-all">
        {icon}
    </a>
);

const ContactItem = ({ icon, text }) => (
    <li className="flex items-center gap-3 text-xs text-white/50 group cursor-default">
        <span className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">{icon}</span>
        <span className="group-hover:text-white transition-colors">{text}</span>
    </li>
);

export default Footer;
