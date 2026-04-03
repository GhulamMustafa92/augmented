import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, Radio, MessageSquare, Globe, Target } from 'lucide-react';

const Contact = () => {
    const [isSent, setIsSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setIsSent(true);
        }, 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-20 pb-32"
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                <div className="space-y-12">
                   <div className="space-y-6">
                        <motion.span 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-secondary text-sm font-black tracking-[0.4em] uppercase"
                        >
                            Open Frequency
                        </motion.span>
                        <motion.h1 
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="text-6xl md:text-8xl font-black italic tracking-tighter"
                        >
                            CONTACT <br/><span className="text-secondary">SYSTEMS</span>
                        </motion.h1>
                        <p className="text-white/40 text-sm leading-relaxed tracking-widest font-medium uppercase">
                            Reach out through the global communication mesh. All transmissions are encrypted and prioritized by the neural core.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {[
                            { icon: Mail, label: "Digital Inlets", val: "ops@augment.menu" },
                            { icon: Radio, label: "Broadcasting ID", val: "TRANS-778-DELTA" },
                            { icon: MessageSquare, label: "Direct Feed", val: "Chat Enabled" },
                            { icon: Globe, label: "Spaceport", val: "Sector 7, Neo Tokyo" }
                        ].map((info) => (
                            <div key={info.label} className="space-y-2 group">
                                <div className="flex items-center gap-3 text-secondary group-hover:text-white transition-colors">
                                    <info.icon className="w-5 h-5" />
                                    <span className="text-[10px] font-black tracking-widest uppercase">{info.label}</span>
                                </div>
                                <p className="text-lg font-bold tracking-tight italic">{info.val}</p>
                            </div>
                        ))}
                    </div>

                    <div className="p-8 border border-white/5 bg-white/5 rounded-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4">
                            <Target className="w-10 h-10 text-white/5 group-hover:text-secondary/20 transition-all duration-500" />
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-ping" />
                            <span className="text-xs font-black uppercase tracking-[0.3em] text-white/50">Core Status: Operational</span>
                        </div>
                    </div>
                </div>

                <div className="lg:pt-20">
                    <AnimatePresence mode="wait">
                        {!isSent ? (
                            <motion.form 
                                key="form"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -50 }}
                                onSubmit={handleSubmit}
                                className="glass-panel p-10 space-y-8 border-secondary/20 shadow-neon-secondary-lg"
                            >
                                <div className="space-y-6">
                                    <div className="group space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 group-focus-within:text-secondary transition-colors">Identity Identifier</label>
                                        <input 
                                            required 
                                            type="text" 
                                            placeholder="FULL NAME / ID-CODE"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-secondary transition-all font-bold tracking-widest text-sm uppercase placeholder:text-white/10"
                                        />
                                    </div>
                                    <div className="group space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 group-focus-within:text-secondary transition-colors">Transmission Input</label>
                                        <textarea 
                                            required 
                                            rows="4" 
                                            placeholder="DESCRIBE YOUR REQUEST..."
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-secondary transition-all font-bold tracking-widest text-sm uppercase placeholder:text-white/10 resize-none"
                                        ></textarea>
                                    </div>
                                </div>
                                <button 
                                    disabled={loading}
                                    className="w-full py-5 bg-secondary text-black font-black text-xs tracking-[0.4em] uppercase rounded-xl hover:shadow-neon-secondary flex items-center justify-center gap-3 transition-all disabled:opacity-50"
                                >
                                   {loading ? 'MODULATING...' : <><Send className="w-5 h-5" /> BROADCAST SIGNAL</>}
                                </button>
                            </motion.form>
                        ) : (
                           <motion.div 
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="glass-panel p-16 border-green-500/20 text-center space-y-8 h-full flex flex-col items-center justify-center"
                           >
                                <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center border border-green-500/30">
                                    <Send className="w-10 h-10" />
                                </div>
                                <div className="space-y-4">
                                    <h2 className="text-4xl font-black italic tracking-tighter uppercase">Signal Sent</h2>
                                    <p className="text-white/40 text-xs font-black uppercase tracking-widest max-w-xs mx-auto leading-relaxed">
                                        Your transmission has been received by the neural mesh. Expect a reply within 2.3 planetary cycles.
                                    </p>
                                </div>
                                <button onClick={() => setIsSent(false)} className="text-green-500 text-[10px] font-black uppercase tracking-[0.4em] underline hover:text-white transition-all">New Transmission</button>
                           </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
};

export default Contact;
