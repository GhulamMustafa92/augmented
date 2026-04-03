import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Radio, MapPin, Truck, Box, CheckCircle2, ChevronRight, LayoutGrid, Clock, Rocket, Satellite } from 'lucide-react';

const Tracking = () => {
    const [progress, setProgress] = useState(0);

    // Simulate progress animation for visual demo
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(p => (p < 85 ? p + 0.1 : 85));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const steps = [
        { id: '1', label: 'Synthesis', icon: Box, status: 'Completed', desc: 'Molecular assembly complete.' },
        { id: '2', label: 'Validation', icon: CheckCircle2, status: 'Completed', desc: 'DNA purity & temperature verified.' },
        { id: '3', label: 'Transit', icon: Rocket, status: 'Active', desc: 'Orbital velocity 4.2 km/s.' },
        { id: '4', label: 'Landing', icon: MapPin, status: 'Pending', desc: 'Descending into sector 4.' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-20 pb-32"
        >
            <div className="mb-20 space-y-6">
                <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 text-primary text-xs font-black tracking-[0.4em] uppercase"
                >
                    <Radio className="w-3 h-3 animate-pulse" /> Live Tracking Active
                </motion.span>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                   <motion.h1 
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="text-6xl md:text-8xl font-black italic tracking-tighter"
                    >
                        SATELLITE <br/><span className="text-primary">FOLLOW</span>
                    </motion.h1>
                    <div className="space-y-4">
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/30 flex justify-between">
                            <span>Quantum Encryption</span>
                            <span>AES-256-GCM</span>
                        </div>
                        <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl min-w-[280px]">
                            <LayoutGrid className="w-5 h-5 text-primary" />
                            <div className="space-y-1">
                                <span className="block text-[8px] font-black uppercase text-white/30 tracking-widest">MANIFEST ID</span>
                                <span className="block text-sm font-bold tracking-tighter italic uppercase underline">AUG-778-9Y-ALPHA</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                {/* Left: Progress Steps */}
                <div className="lg:col-span-2 space-y-6 relative">
                    <div className="absolute left-[31px] top-10 bottom-10 w-[2px] bg-white/5 z-0" />
                    
                    {steps.map((step) => (
                        <div key={step.id} className="relative z-10 flex gap-8 group">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border transition-all duration-500 ${
                                step.status === 'Completed' ? 'bg-primary text-black border-primary' : 
                                step.status === 'Active' ? 'bg-white/10 text-primary border-primary animate-pulse' : 
                                'bg-white/5 text-white/20 border-white/10 group-hover:border-white/20'
                            }`}>
                                <step.icon className="w-7 h-7" />
                            </div>
                            <div className="py-2 space-y-2">
                                <div className="flex items-center gap-4">
                                   <h3 className={`text-xl font-black uppercase italic tracking-tight transition-colors ${
                                       step.status === 'Active' ? 'text-white' : 
                                       step.status === 'Completed' ? 'text-white/80' : 'text-white/20'
                                   }`}>{step.label}</h3>
                                   {step.status === 'Active' && <span className="px-2 py-0.5 bg-primary/20 text-primary text-[8px] font-black uppercase rounded tracking-widest leading-normal">IN-PROGRESS</span>}
                                </div>
                                <p className={`text-xs tracking-widest font-bold uppercase transition-colors ${
                                    step.status === 'Active' ? 'text-primary' : 
                                    step.status === 'Completed' ? 'text-white/30' : 'text-white/10'
                                }`}>{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right: Data Visualization */}
                <div className="space-y-8 lg:sticky lg:top-32">
                    <div className="glass-panel p-8 border border-primary/20 space-y-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Satellite className="w-24 h-24 rotate-45" />
                        </div>
                        <div className="space-y-6 relative z-10">
                            <div className="flex justify-between items-end">
                                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-primary">Velocity Status</h3>
                                <Clock className="w-4 h-4 text-white/20" />
                            </div>
                            
                            <div className="space-y-2">
                                <div className="flex justify-between text-[11px] font-black tracking-widest text-white/40 mb-2 uppercase">
                                    <span>Signal Strength</span>
                                    <span>{Math.round(progress)}%</span>
                                </div>
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        className="h-full bg-primary shadow-neon"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-1">
                                    <span className="block text-[8px] font-black uppercase text-white/20 tracking-widest">ETA</span>
                                    <span className="block text-lg font-bold italic">14:02 PM</span>
                                </div>
                                <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-1">
                                    <span className="block text-[8px] font-black uppercase text-white/20 tracking-widest">WIND SPEED</span>
                                    <span className="block text-lg font-bold italic">220 KM/H</span>
                                </div>
                            </div>

                            <button className="w-full py-4 bg-white/5 text-white/40 font-black text-[10px] tracking-[0.4em] uppercase rounded-xl hover:bg-white border border-white/10 hover:text-black hover:border-white transition-all flex items-center justify-center gap-3 group/track">
                                <Satellite className="w-4 h-4 group-hover:rotate-12 transition-transform" /> Recalibrate Orbital Path
                            </button>
                        </div>
                    </div>

                    <div className="p-6 bg-primary/10 border border-primary/20 rounded-2xl relative overflow-hidden group">
                        <div className="flex items-center gap-4 relative z-10 text-primary">
                            <Truck className="w-6 h-6" />
                            <div className="space-y-1">
                                <span className="block text-[9px] font-black uppercase tracking-widest">Contact Dispatch</span>
                                <span className="block text-sm font-bold tracking-tighter italic">NEO-COURIER HUB 9</span>
                            </div>
                        </div>
                        <div className="absolute inset-0 bg-primary/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Tracking;
