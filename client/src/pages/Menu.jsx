import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { Search, Filter, RefreshCw } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Menu = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Categories for filter
    const categories = ['All', 'Entrees', 'Main', 'Desserts', 'Drinks'];

    const { addToCart } = useCart();

    const fetchMenu = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('/api/menu');
            setProducts(data);
        } catch (error) {
            console.error('Error fetching menu:', error);
            // Fallback mock data if API fails or empty
            setProducts([
                { id: 1, name: 'Cyber Burger', price: 15.99, category: 'Main', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&auto=format&fit=crop&q=60', description: 'A futuristic burger with bioluminescent toppings and high-protein algae bun.', tags: ['Vegan', 'High Protein'] },
                { id: 2, name: 'Neon Sushi', price: 24.50, category: 'Main', image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&auto=format&fit=crop&q=60', description: 'Glow-in-the-dark sushi rolls with synthetically enhanced tuna and electric ginger.', tags: ['Synthesized', 'Gluten-Free'] },
                { id: 3, name: 'Plasma Pasta', price: 18.20, category: 'Main', image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&auto=format&fit=crop&q=60', description: 'Fluid noodles swimming in a warm, glowing carbonara-style plasma sauce.', tags: ['Classic', 'Futuristic'] },
                { id: 4, name: 'Nebula Nectar', price: 9.99, category: 'Drinks', image: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=800&auto=format&fit=crop&q=60', description: 'A beverage that transitions colors based on your mood. Contains star-dust essence.', tags: ['Refreshing'] },
                { id: 5, name: 'Zero-G Parfait', price: 12.50, category: 'Desserts', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=60', description: 'A floating dessert where each layer stays suspended independently of each other.', tags: ['Sweet', 'Gravity-Defying'] },
                { id: 6, name: 'Stellar Salad', price: 14.00, category: 'Entrees', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=60', description: 'Mixed celestial greens with asteroid crumbs and sun-dried starlight tomatoes.', tags: ['Health', 'Organic'] },
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMenu();
    }, []);

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pb-20"
        >
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4">
                    <span className="text-primary text-xs font-bold tracking-[0.3em] uppercase">Digital Catalog</span>
                    <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter">THE MENU</h2>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="relative group w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Find your fuel..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
                        />
                    </div>

                    <div className="flex bg-white/5 border border-white/10 p-1 rounded-xl w-full sm:w-auto overflow-x-auto">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 text-[10px] font-bold tracking-widest uppercase rounded-lg transition-all ${selectedCategory === cat ? 'bg-primary text-black' : 'text-white/50 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-96 w-full glass-panel animate-pulse bg-white/5"></div>
                    ))}
                </div>
            ) : (
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence>
                        {filteredProducts.map(product => (
                            <ProductCard
                                key={product._id || product.id}
                                product={product}
                                onOpenDetails={setSelectedProduct}
                                onAddToCart={addToCart}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}

            {filteredProducts.length === 0 && !loading && (
                <div className="flex flex-col items-center justify-center py-32 space-y-4">
                    <RefreshCw className="w-12 h-12 text-white/10 animate-spin-slow" />
                    <p className="text-white/30 tracking-widest uppercase text-sm font-bold">No results found in this sector</p>
                    <button onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }} className="text-primary text-xs underline uppercase tracking-widest font-bold">Clear Sensors</button>
                </div>
            )}

            <AnimatePresence>
                {selectedProduct && (
                    <ProductModal
                        product={selectedProduct}
                        onClose={() => setSelectedProduct(null)}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Menu;
