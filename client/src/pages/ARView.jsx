import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Product3D from '../components/Product3D';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Info, Maximize2 } from 'lucide-react';

const ARView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/api/menu/${id}`);
                setProduct(response.data);
            } catch (err) {
                console.error("Failed to fetch product for AR:", err);
                // Fallback for demo/offline
                const mockProducts = [
                    { _id: '1', name: 'Cyber Burger', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&auto=format&fit=crop&q=60', description: 'Bioluminescent toppings and high-protein algae bun.' },
                    { _id: '2', name: 'Neon Sushi', image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&auto=format&fit=crop&q=60', description: 'Glow-in-the-dark sushi rolls with electric ginger.' },
                    { _id: '3', name: 'Plasma Pasta', image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&auto=format&fit=crop&q=60', description: 'Glow-in-the-dark sushi rolls with electric ginger.' },
                    { _id: '4', name: 'Nebula Nectar', image: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=800&auto=format&fit=crop&q=60', description: 'Star-dust essence beverage.' },
                ];
                const found = mockProducts.find(p => p._id === id || p.id === id);
                if (found) {
                    setProduct(found);
                } else {
                    setError("Neural connection lost. Check satellite link.");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    return (
        <div className="fixed inset-0 bg-[#050505] text-white flex flex-col">
            {/* Header */}
            <div className="z-10 p-6 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
                <button 
                    onClick={() => navigate(-1)}
                    className="p-3 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-2 text-xs font-black tracking-widest uppercase hover:bg-white/10 transition-all"
                >
                    <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <div className="text-center">
                    <p className="text-[10px] text-primary tracking-[0.4em] font-black uppercase">Mobile AR Link</p>
                    <h1 className="text-xl font-black italic tracking-tighter">{product?.name || "Initializing..."}</h1>
                </div>
                <div className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-2xl">
                    <Info className="w-5 h-5 text-white/20" />
                </div>
            </div>

            {/* Main 3D View */}
            <div className="flex-grow relative overflow-hidden">
                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex flex-col items-center justify-center gap-6"
                        >
                            <div className="w-12 h-12 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                            <p className="text-[10px] text-white/30 uppercase tracking-[0.5em] font-bold">Synchronizing Assets...</p>
                        </motion.div>
                    ) : error ? (
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
                        >
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 mb-4">
                                {error}
                            </div>
                            <button onClick={() => window.location.reload()} className="text-xs font-black uppercase tracking-widest text-primary underline underline-offset-4">Retry Sync</button>
                        </motion.div>
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="w-full h-full"
                        >
                            <Product3D product={product} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Footer Controls */}
            <div className="p-8 pb-12 bg-gradient-to-t from-black/80 to-transparent flex flex-col items-center gap-4">
                <div className="flex gap-4">
                     <div className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-[9px] font-black tracking-[0.2em] uppercase text-white/40 flex items-center gap-2">
                        <Maximize2 className="w-3 h-3" /> Drag to Inspect
                     </div>
                </div>
                <p className="text-[10px] text-white/10 text-center uppercase tracking-[0.4em] font-bold">
                    Quantum AR Stream Active • 1080p
                </p>
            </div>
        </div>
    );
};

export default ARView;
