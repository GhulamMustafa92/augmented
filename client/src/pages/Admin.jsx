import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Edit2, Plus, LogOut, LayoutDashboard, Settings } from 'lucide-react';

const Admin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // In a real app, this would call the API
        if (username === 'admin' && password === 'password123') {
            setIsLoggedIn(true);
        } else {
            alert('Access Denied: Quantum Signature Mismatch');
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="flex items-center justify-center min-h-[70vh]">
                <motion.form 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    onSubmit={handleLogin}
                    className="w-full max-w-md p-10 glass-panel border border-primary/30 space-y-8"
                >
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl font-black italic tracking-tighter text-primary neon-glow-cyan">ADMIN ACCESS</h2>
                        <p className="text-white/30 text-[10px] font-bold tracking-[0.3em] uppercase">Security Level: Omega</p>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest ml-2">Pilot ID</label>
                            <input 
                                type="text" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm outline-none"
                                placeholder="Enter ID..."
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest ml-2">Authorization Key</label>
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm outline-none"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button 
                        type="submit"
                        className="w-full py-4 bg-primary text-black font-black text-xs tracking-[0.2em] uppercase rounded-xl hover:shadow-neon transition-all"
                    >
                        INITIALIZE OVERRIDE
                    </button>
                    
                    <p className="text-center text-[9px] text-white/20 uppercase tracking-widest">Forgot key? Contact Cyber Command.</p>
                </motion.form>
            </div>
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-12"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-8">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-primary text-[10px] font-bold tracking-[0.3em] uppercase">
                        <LayoutDashboard className="w-3 h-3" /> COMMAND CENTER
                    </div>
                    <h2 className="text-5xl font-black italic tracking-tighter leading-none">SECTOR DATA</h2>
                </div>
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-6 py-3 bg-primary text-black font-bold text-xs tracking-widest uppercase rounded-lg hover:shadow-neon transition-all">
                        <Plus className="w-4 h-4" /> Add Prototype
                    </button>
                    <button 
                        onClick={() => setIsLoggedIn(false)}
                        className="p-3 bg-white/5 hover:bg-secondary rounded-lg border border-white/10 transition-all text-white/50 hover:text-white"
                    >
                        <LogOut className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {[
                    { id: 1, name: 'Cyber Burger', price: 15.99, category: 'Main', stock: 45 },
                    { id: 2, name: 'Neon Sushi', price: 24.50, category: 'Main', stock: 12 },
                    { id: 3, name: 'Nebula Nectar', price: 9.99, category: 'Drinks', stock: 88 },
                ].map((item) => (
                    <div key={item.id} className="glass-panel p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/5 transition-all">
                         <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-primary/30">
                                <Settings className="w-8 h-8" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-xl font-bold tracking-tight">{item.name}</h3>
                                <div className="flex gap-4 text-[10px] font-bold text-white/30 uppercase tracking-widest">
                                    <span>#{item.id}</span>
                                    <span>Sector: {item.category}</span>
                                    <span>Energy Cost: ${item.price}</span>
                                </div>
                            </div>
                         </div>

                         <div className="flex items-center gap-3">
                            <button className="p-3 text-white/40 hover:text-primary transition-colors bg-white/5 rounded-lg border border-white/10">
                                <Edit2 className="w-4 h-4" />
                            </button>
                            <button className="p-3 text-white/40 hover:text-secondary transition-colors bg-white/5 rounded-lg border border-white/10">
                                <Trash2 className="w-4 h-4" />
                            </button>
                         </div>
                    </div>
                ))}
            </div>
            
            <div className="p-12 border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center text-white/10 hover:border-primary/20 transition-all group">
                <Plus className="w-16 h-16 mb-4 group-hover:text-primary/30 transition-colors" />
                <p className="text-sm font-black tracking-[0.3em] uppercase">Expand Catalog</p>
            </div>
        </motion.div>
    );
};

export default Admin;
