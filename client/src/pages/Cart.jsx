import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ShoppingBag, CreditCard, ChevronRight, ArrowLeft, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

    const subtotal = cartTotal;
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pb-20"
        >
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4">
                    <span className="text-secondary text-xs font-bold tracking-[0.3em] uppercase">Order Manifest</span>
                    <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter">THE CART</h2>
                </div>
                <Link to="/menu" className="flex items-center gap-2 text-white/50 hover:text-white uppercase text-[10px] font-bold tracking-widest transition-all">
                    <ArrowLeft className="w-3 h-3" /> Continue Exploring
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Items List */}
                <div className="lg:col-span-2 space-y-6">
                    <AnimatePresence>
                        {cartItems.length > 0 ? (
                            cartItems.map((item) => (
                                <motion.div 
                                    key={item._id || item.id}
                                    layout
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: 20, opacity: 0 }}
                                    className="glass-panel p-6 flex flex-col sm:flex-row items-center justify-between group hover:border-white/20 transition-all gap-6"
                                >
                                    <div className="flex items-center gap-6 w-full">
                                        <div className="w-24 h-24 bg-white/5 rounded-xl border border-white/10 overflow-hidden group-hover:border-primary/50 transition-colors shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="text-xl font-bold tracking-tight">{item.name}</h3>
                                            <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">${item.price} / unit</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between w-full sm:w-auto gap-8">
                                        <div className="flex items-center border border-white/10 rounded-lg overflow-hidden h-10 bg-white/5">
                                            <button 
                                                onClick={() => updateQuantity(item._id || item.id, item.quantity - 1)}
                                                className="px-3 hover:bg-white/10 transition-colors"
                                            >
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="px-4 font-mono font-bold text-sm min-w-[2.5rem] text-center">{item.quantity}</span>
                                            <button 
                                                onClick={() => updateQuantity(item._id || item.id, item.quantity + 1)}
                                                className="px-3 hover:bg-white/10 transition-colors"
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>
                                        <span className="text-xl font-mono font-black text-white/90 min-w-[5rem] text-right">${(item.price * item.quantity).toFixed(2)}</span>
                                        <button 
                                            onClick={() => removeFromCart(item._id || item.id)}
                                            className="p-3 text-white/20 hover:text-secondary hover:bg-secondary/10 rounded-lg transition-all"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center py-32 space-y-4 opacity-50">
                                <ShoppingBag className="w-16 h-16" />
                                <p className="text-sm font-bold tracking-widest uppercase">The manifest is empty</p>
                                <Link to="/menu" className="text-primary text-xs underline uppercase tracking-widest font-bold">Start Adding Items</Link>
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Summary */}
                <div className="lg:col-span-1">
                    <div className="glass-panel p-8 space-y-8 sticky top-32 border border-primary/20">
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-primary">Summary</h3>
                            <div className="space-y-3 font-medium text-sm">
                                <div className="flex justify-between text-white/50">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-white/50">
                                    <span>Quantum Tax (10%)</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                                <div className="h-px bg-white/10 my-4" />
                                <div className="flex justify-between text-xl font-black text-white tracking-widest uppercase italic">
                                    <span>Total</span>
                                    <span className="neon-glow-cyan text-primary">${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        <button 
                            disabled={cartItems.length === 0}
                            className="w-full py-5 bg-primary text-black font-black text-sm tracking-[0.3em] uppercase rounded-xl hover:shadow-neon disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
                        >
                            <CreditCard className="w-5 h-5" /> CHECKOUT <ChevronRight className="w-4 h-4" />
                        </button>

                        <div className="space-y-4 pt-4 border-t border-white/5">
                            <div className="flex items-center gap-3 text-white/30 text-[9px] font-bold tracking-widest uppercase">
                                <span className="p-1 bg-white/10 rounded">SECURE</span>
                                <span className="p-1 bg-white/10 rounded">ENCRYPTED</span>
                                <span className="p-1 bg-white/10 rounded">INSTANT</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Cart;
