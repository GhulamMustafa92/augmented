import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu as MenuIcon, X, Globe, User, Rocket } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = ({ onOpenCart }) => {
  const { cartItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Calculate cart count from quantities
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Menu', path: '/menu' },
    { name: 'About', path: '/about' },
    { name: 'Tracking', path: '/tracking' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-in-out ${
          isScrolled ? 'py-3' : 'py-6'
        }`}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.nav 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`relative flex items-center justify-between px-6 py-4 rounded-2xl border transition-all duration-500 ${
              isScrolled 
                ? 'bg-black/80 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]' 
                : 'bg-white/5 backdrop-blur-md border-white/5'
            }`}
          >
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center group-hover:rotate-[360deg] transition-transform duration-700 shadow-neon">
                <Globe className="w-6 h-6 text-black" />
              </div>
              <span className="text-2xl font-black tracking-tighter uppercase italic">
                Augmented<span className="text-primary not-italic">.</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-2 text-[11px] font-black tracking-[0.2em] uppercase transition-all rounded-lg hover:text-primary ${
                    location.pathname === link.path ? 'text-primary bg-white/5' : 'text-white/60'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={onOpenCart}
                className="relative p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-primary hover:text-black hover:border-primary transition-all group focus:outline-none"
              >
                <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 bg-secondary text-black text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-lg shadow-neon-sm border-2 border-black"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>

              <Link
                to="/admin"
                className="hidden sm:flex p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-white/50 hover:text-white"
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Mobile Menu Trigger */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 bg-white/5 border border-white/10 rounded-xl text-white/50 hover:text-white transition-all"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </motion.nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[90] bg-black/95 backdrop-blur-2xl flex flex-col pt-32 px-10"
          >
             <div className="flex flex-col space-y-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      className="text-4xl font-black tracking-tighter hover:text-primary transition-all uppercase italic"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div 
                   initial={{ opacity: 0, y: 50 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.5 }}
                   className="pt-10 border-t border-white/10 mt-10"
                >
                   <Link to="/admin" className="flex items-center gap-4 text-white/40 hover:text-white font-black uppercase tracking-widest text-xs">
                      <User className="w-5 h-5" /> Command Center
                   </Link>
                </motion.div>
             </div>

             <div className="mt-auto pb-10">
                <div className="flex items-center gap-2 text-primary font-black italic">
                   <Rocket className="w-5 h-5" />
                   <span>VIRTUAL DINING SYSTEM v2.0</span>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
