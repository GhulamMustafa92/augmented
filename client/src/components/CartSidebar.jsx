import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, ArrowRight, CreditCard, Box, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartSidebar = ({ isOpen, onClose }) => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
    const navigate = useNavigate();

    const subtotal = cartTotal;
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[150]"
                    />

                    {/* Sidebar */}
                    <motion.div 
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 w-full max-w-md h-full bg-black/90 backdrop-blur-2xl border-l border-white/10 z-[200] flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-8 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="w-6 h-6 text-primary" />
                                <h2 className="text-xl font-black italic tracking-tighter uppercase">Cart Manifest</h2>
                            </div>
                            <button 
                                onClick={onClose}
                                className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all"
                            >
                                <X className="w-5 h-5 text-white/50" />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-6">
                            {cartItems.length > 0 ? (
                                cartItems.map((item) => (
                                    <motion.div 
                                        key={item._id || item.id}
                                        layout
                                        className="flex gap-6 group"
                                    >
                                        <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-xl overflow-hidden shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-bold tracking-tight text-sm uppercase italic line-clamp-1">{item.name}</h3>
                                                <button 
                                                    onClick={() => removeFromCart(item._id || item.id)}
                                                    className="text-white/20 hover:text-secondary p-1"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center border border-white/10 rounded-lg overflow-hidden bg-white/5 text-[10px]">
                                                    <button onClick={() => updateQuantity(item._id || item.id, item.quantity - 1)} className="px-2 py-1 hover:bg-white/10">-</button>
                                                    <span className="px-3 font-bold">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item._id || item.id, item.quantity + 1)} className="px-2 py-1 hover:bg-white/10">+</button>
                                                </div>
                                                <span className="text-sm font-bold tracking-tighter">${(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-30 text-center">
                                    <ShoppingBag className="w-12 h-12" />
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em]">Inventory Empty</p>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-8 bg-white/5 space-y-6">
                            <div className="space-y-3 font-black text-[10px] uppercase tracking-widest text-white/40">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Quantum Tax (10%)</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-white text-xl tracking-tighter italic font-black mt-4 pt-4 border-t border-white/5">
                                    <span>Total Value</span>
                                    <span className="text-primary">${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                               <button 
                                    onClick={() => { navigate('/cart'); onClose(); }}
                                    className="py-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black tracking-widest uppercase hover:bg-white/10 transition-all"
                                >
                                    Full Cart
                                </button>
                                <button 
                                    disabled={cartItems.length === 0}
                                    onClick={() => { navigate('/cart'); onClose(); }}
                                    className="py-4 bg-primary text-black rounded-xl text-[10px] font-black tracking-widest uppercase hover:shadow-neon flex items-center justify-center gap-2 group/btn disabled:opacity-50"
                                >
                                    Checkout <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartSidebar;
