import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ShoppingCart, Eye, Star } from 'lucide-react';

const ProductCard = ({ product, onOpenDetails, onAddToCart }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative h-96 w-full cursor-pointer group glass-panel flex flex-col p-6 space-y-4 hover:border-primary/50 transition-colors"
    >
      <div 
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="relative h-48 w-full flex items-center justify-center p-4 bg-white/5 rounded-xl border border-white/10 group-hover:bg-primary/10 transition-all duration-300 overflow-hidden"
      >
        {/* Anti-gravity floating effect for image */}
        <motion.img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,243,255,0.3)] pointer-events-none group-hover:scale-110 transition-transform duration-500"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
        />
        
        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
                onClick={(e) => { e.stopPropagation(); onOpenDetails(product); }}
                className="p-2 bg-black/50 text-white rounded-full hover:bg-primary hover:text-black transition-all"
            >
                <Eye className="w-4 h-4" />
            </button>
        </div>
      </div>

      <div 
        style={{
          transform: "translateZ(50px)",
        }}
        className="space-y-2 flex-grow"
      >
        <div className="flex justify-between items-start">
            <h3 className="text-xl font-black tracking-tight text-white/90">{product.name}</h3>
            <span className="text-primary font-mono font-bold">${product.price}</span>
        </div>
        <p className="text-white/40 text-xs line-clamp-2 uppercase tracking-widest">{product.description}</p>
        
        <div className="flex items-center gap-1 pt-2">
            {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3 h-3 ${i < 4 ? 'text-secondary fill-secondary' : 'text-white/10 fill-white/10'}`} />
            ))}
            <span className="text-[10px] text-white/30 ml-2">4.5/5</span>
        </div>
      </div>

      <motion.button
        style={{
          transform: "translateZ(100px)",
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
        className="w-full py-3 bg-white text-black font-black text-xs tracking-[0.2em] uppercase rounded-lg hover:bg-primary shadow-lg transition-colors flex items-center justify-center gap-2"
      >
        <ShoppingCart className="w-4 h-4" /> Add to Order
      </motion.button>
    </motion.div>
  );
};

export default ProductCard;
