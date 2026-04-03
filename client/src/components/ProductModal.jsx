import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Box, Info, RefreshCw, Smartphone, Zap, ZoomIn } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useCart } from '../context/CartContext';

const ProductModal = ({ product, onClose }) => {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [view, setView] = useState('info'); // 'info' or 'sync'
    const [zoomed, setZoomed] = useState(false);

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        onClose();
    };

    // Generate AR View URL for QR Code
    const arUrl = `${window.location.origin}/ar/${product._id || product.id}`;

    if (!product) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 overflow-hidden">
            {/* Backdrop */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            />
            
            {/* Content Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-7xl h-full md:h-[85vh] bg-[#050505]/40 glass-panel overflow-hidden border border-white/10 flex flex-col md:flex-row shadow-2xl transition-all duration-500"
            >
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 z-50 p-2.5 text-white/40 hover:text-white transition-all bg-white/5 hover:bg-white/10 rounded-full border border-white/5"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Left Side: Premium Image Viewer */}
                <div className="w-full md:w-[65%] h-[45%] md:h-full bg-gradient-to-br from-black via-[#050505] to-primary/5 flex items-center justify-center relative overflow-hidden group/view">
                    
                    {/* Ambient glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,243,255,0.07)_0%,_transparent_70%)] pointer-events-none" />
                    
                    {/* Corner brackets */}
                    <div className="absolute top-8 left-8 w-10 h-10 border-t-2 border-l-2 border-primary/40" />
                    <div className="absolute top-8 right-8 w-10 h-10 border-t-2 border-r-2 border-primary/40" />
                    <div className="absolute bottom-8 left-8 w-10 h-10 border-b-2 border-l-2 border-primary/40" />
                    <div className="absolute bottom-8 right-8 w-10 h-10 border-b-2 border-r-2 border-primary/40" />

                    {/* Badge */}
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="absolute top-8 left-14 px-4 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-lg text-[10px] font-black tracking-[0.3em] uppercase backdrop-blur-md z-10"
                    >
                        Visual Feed
                    </motion.div>

                    {/* Main Image */}
                    <motion.div
                        className="relative cursor-zoom-in"
                        onClick={() => setZoomed(z => !z)}
                        animate={{ scale: zoomed ? 1.35 : 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    >
                        {/* Glow behind image */}
                        <div className="absolute -inset-8 bg-primary/10 blur-3xl rounded-full" />

                        <motion.img
                            src={product.image}
                            alt={product.name}
                            className="relative z-10 max-h-[340px] max-w-[480px] w-auto h-auto object-contain drop-shadow-[0_0_60px_rgba(0,243,255,0.25)] select-none"
                            animate={{ y: [0, -12, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            draggable={false}
                        />

                        {/* Scanner line */}
                        <motion.div
                            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent z-20 opacity-60"
                            animate={{ top: ['0%', '100%', '0%'] }}
                            transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
                        />
                    </motion.div>

                    {/* Zoom hint */}
                    <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end pointer-events-none">
                        <div className="flex flex-col gap-1 text-[8px] text-white/20 uppercase tracking-[0.5em] font-black">
                            <span>Holographic Feed</span>
                            <div className="flex gap-4"><span>IMG-HD</span><span>4K</span></div>
                        </div>
                        <div className="flex items-center gap-1.5 text-[9px] text-white/30 font-bold uppercase tracking-widest">
                            <ZoomIn className="w-3 h-3" /> Click to zoom
                        </div>
                    </div>
                </div>

                {/* Right Side: Details / Sync Section */}
                <div className="w-full md:w-[35%] p-8 md:p-14 flex flex-col justify-between overflow-y-auto bg-black/20 border-l border-white/5 relative z-10">
                    <AnimatePresence mode="wait">
                        {view === 'info' ? (
                            <motion.div 
                                key="info"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-10"
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-secondary text-[11px] font-black tracking-[0.5em] uppercase opacity-50">
                                            <div className="w-1.5 h-1.5 bg-secondary rounded-full" /> {product.category}
                                        </div>
                                        <button 
                                            onClick={() => setView('sync')}
                                            className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-lg text-[9px] font-black tracking-widest uppercase hover:bg-primary hover:text-black transition-all"
                                        >
                                            <Smartphone className="w-3 h-3" /> Sync Mobile
                                        </button>
                                    </div>
                                    <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-[0.9] text-white">
                                        {product.name}
                                    </h2>
                                </div>

                                <div className="flex items-end gap-6 pb-2 border-b border-white/5">
                                    <span className="text-5xl font-mono text-primary font-black drop-shadow-[0_0_15px_rgba(0,243,255,0.3)]">${product.price}</span>
                                    <div className="mb-2">
                                        <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">Standard credits</p>
                                        <p className="text-xs text-white/10 line-through font-mono italic">${(product.price * 1.3).toFixed(2)}</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-2">
                                        <Info className="w-3.5 h-3.5 text-primary" />
                                        <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-white/40">Product Specifications</h4>
                                    </div>
                                    <p className="text-white/60 text-sm leading-relaxed font-medium">
                                        {product.description}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2.5">
                                    {product.tags?.map((tag, i) => (
                                        <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 text-white/40 text-[9px] font-black tracking-[0.3em] uppercase rounded-xl hover:bg-primary/5 hover:text-primary transition-colors cursor-default">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="sync"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-10 flex flex-col items-center"
                            >
                                <div className="w-full space-y-4">
                                    <button 
                                        onClick={() => setView('info')}
                                        className="flex items-center gap-2 p-2 px-4 bg-white/5 text-white/40 border border-white/10 rounded-lg text-[9px] font-black tracking-widest uppercase hover:text-white transition-all"
                                    >
                                        <ChevronLeft className="w-3 h-3" /> Return to Info
                                    </button>
                                    <div className="text-center">
                                        <p className="text-[11px] text-primary tracking-[0.4em] font-black uppercase">Mobile AR Interface</p>
                                        <h2 className="text-4xl font-black italic tracking-tighter text-white">SYNC PROTOCOL</h2>
                                    </div>
                                </div>

                                {/* QR Code Display */}
                                <div className="relative group p-6 bg-white/5 rounded-[2rem] border border-white/10 shadow-2xl">
                                    <div className="absolute -inset-4 bg-primary/10 blur-2xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
                                    <div className="relative p-4 bg-white rounded-2xl">
                                        <QRCodeSVG 
                                            value={arUrl}
                                            size={200}
                                            level="H"
                                            includeMargin={true}
                                            bgColor="#ffffff"
                                            fgColor="#000000"
                                        />
                                    </div>
                                    
                                    {/* Tech Borders */}
                                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary rounded-tl-3xl translate-x-[-10px] translate-y-[-10px]" />
                                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary rounded-tr-3xl translate-x-[10px] translate-y-[-10px]" />
                                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary rounded-bl-3xl translate-x-[-10px] translate-y-[10px]" />
                                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary rounded-br-3xl translate-x-[10px] translate-y-[10px]" />
                                </div>

                                <div className="space-y-4 text-center">
                                    <div className="flex items-center justify-center gap-2 text-secondary text-[10px] font-black tracking-[0.3em] uppercase">
                                        <Zap className="w-3 h-3" /> Secure Link Active
                                    </div>
                                    <p className="text-white/40 text-xs px-6 leading-relaxed">
                                        Scan this code with your mobile camera to transfer the 3D neural assets to your handheld device.
                                    </p>
                                    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-[9px] font-mono text-white/30 break-all select-all">
                                        {arUrl}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Footer Controls (persistent) */}
                    <div className="space-y-8 mt-12 bg-white/[0.02] p-8 rounded-[2rem] border border-white/[0.05]">
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Quantity Select</span>
                                <div className="flex bg-black/40 rounded-2xl overflow-hidden h-12 border border-white/5">
                                    <button 
                                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                        className="px-6 hover:bg-white/5 transition-colors text-white/30 hover:text-white"
                                    >-</button>
                                    <span className="px-6 flex items-center justify-center font-black text-lg min-w-[4rem] text-primary bg-white/5">{quantity}</span>
                                    <button 
                                        onClick={() => setQuantity(q => q + 1)}
                                        className="px-6 hover:bg-white/5 transition-colors text-white/30 hover:text-white"
                                    >+</button>
                                </div>
                            </div>
                            
                            <motion.button 
                                onClick={handleAddToCart}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full h-16 bg-white text-black font-black text-xs tracking-[0.4em] uppercase rounded-2xl shadow-xl hover:bg-primary transition-all flex items-center justify-center gap-3 relative overflow-hidden"
                            >
                                <ShoppingCart className="w-5 h-5" /> 
                                Add to Registry
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};


// Helper for the return button in sync view
const ChevronLeft = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
);

export default ProductModal;


