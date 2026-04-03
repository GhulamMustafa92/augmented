import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Zap, Globe, Shield } from 'lucide-react';

const About = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-20 pb-32"
        >
            <div className="text-center space-y-6 mb-24">
                <motion.span 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-primary text-sm font-black tracking-[0.4em] uppercase"
                >
                    Establishment 2084
                </motion.span>
                <motion.h1 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-6xl md:text-8xl font-black italic tracking-tighter"
                >
                    BEYOND THE <span className="text-primary">HORIZON</span>
                </motion.h1>
                <p className="max-w-2xl mx-auto text-white/50 text-sm leading-relaxed tracking-wider">
                    Augmented Menu is more than just a restaurant; it is a temporal culinary bridge. We utilize quantum molecular synthesis to deliver flavors from the future directly to your table, today.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { icon: Rocket, title: "Orbital Sourcing", desc: "Ingredients sourced from sustainable martian colonies and deep-sea farms." },
                    { icon: Zap, title: "Neural Flavor", desc: "Proprietary technology that enhances flavor profiles directly in the visual cortex." },
                    { icon: Globe, title: "Global Sync", desc: "Real-time menu synchronization across all spaceports and terrestrial locations." },
                    { icon: Shield, title: "DNA-Verified", desc: "Every meal is synthetically pure and verified at a molecular level." }
                ].map((feature, i) => (
                    <motion.div
                        key={feature.title}
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="glass-panel p-8 space-y-6 hover:border-primary/50 transition-all group"
                    >
                        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-primary group-hover:text-black transition-all duration-500">
                            <feature.icon className="w-6 h-6" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold tracking-tight uppercase italic">{feature.title}</h3>
                            <p className="text-xs text-white/30 leading-relaxed tracking-wider font-medium">{feature.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-32 p-12 glass-panel border border-primary/20 relative overflow-hidden group"
            >
                <div className="absolute top-0 right-0 p-8">
                    <Rocket className="w-16 h-16 text-primary/10 group-hover:rotate-45 transition-transform duration-1000" />
                </div>
                <div className="max-w-3xl space-y-8 relative z-10">
                    <h2 className="text-4xl font-black tracking-tighter uppercase italic">The Quantum Promise</h2>
                    <p className="text-white/40 text-sm leading-relaxed tracking-widest font-medium uppercase">
                        We don't just serve food; we serve a data-rich experience. Our holographic menu interface is the first of its kind, blending the physical and virtual into a single, high-fidelity experience. Every bite is backed by 500 years of culinary evolution.
                    </p>
                    <div className="flex gap-4">
                        <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black tracking-widest uppercase">Protocol Alpha</div>
                        <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black tracking-widest uppercase">Verified</div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default About;
