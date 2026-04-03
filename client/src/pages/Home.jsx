import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Zap, Target, Package } from 'lucide-react';

const Home = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center justify-center min-h-[80vh] pt-20"
        >
            <div className="text-center space-y-6 max-w-4xl">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-[0.2em] text-primary uppercase border border-primary/30 rounded-full bg-primary/10"
                >
                    Zero-Gravity Digital Experience
                </motion.div>
                
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="text-6xl md:text-8xl font-black tracking-tight leading-none text-white lg:text-9xl"
                >
                    AUGMENTED <br />
                    <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent italic">
                        MENU
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                    className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
                >
                    Experience the future of dining with our immersive 3D menu. 
                    Suspend belief as food items float in your space with interactive augmented reality.
                </motion.p>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.1, duration: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
                >
                    <Link to="/menu" className="group relative px-8 py-4 bg-primary text-black font-bold text-sm tracking-widest uppercase overflow-hidden transition-all hover:scale-105 active:scale-95 rounded-lg shadow-neon">
                        <span className="relative z-10 flex items-center gap-2">
                            Explore Menu <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </span>
                    </Link>
                    <Link to="/admin" className="px-8 py-4 border border-white/20 text-white font-bold text-sm tracking-widest uppercase hover:bg-white/10 transition-all rounded-lg">
                        Admin Dashboard
                    </Link>
                </motion.div>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 w-full max-w-5xl"
            >
                <div className="p-8 glass-panel space-y-4 hover:border-primary/50 transition-all duration-300">
                    <Zap className="w-8 h-8 text-primary neon-glow-cyan" />
                    <h3 className="text-xl font-bold tracking-tight">Ultra Fast</h3>
                    <p className="text-white/50 text-sm">Lightning-quick interactions powered by Vite and Node.js.</p>
                </div>
                <div className="p-8 glass-panel space-y-4 hover:border-secondary/50 transition-all duration-300">
                    <Target className="w-8 h-8 text-secondary neon-glow-purple" />
                    <h3 className="text-xl font-bold tracking-tight">3D Immersive</h3>
                    <p className="text-white/50 text-sm">Full 360&deg; product exploration with dynamic lighting.</p>
                </div>
                <div className="p-8 glass-panel space-y-4 hover:border-accent/50 transition-all duration-300">
                    <Package className="w-8 h-8 text-accent neon-glow-pink" />
                    <h3 className="text-xl font-bold tracking-tight">AR Ready</h3>
                    <p className="text-white/50 text-sm">Visualize your orders in real-time space with WebXR.</p>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Home;
