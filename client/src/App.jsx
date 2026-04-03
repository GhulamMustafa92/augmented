import React, { Suspense, lazy, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ThreeBackground from './components/ThreeBackground';
import CustomCursor from './components/CustomCursor';
import CartSidebar from './components/CartSidebar';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const Menu = lazy(() => import('./pages/Menu'));
const Cart = lazy(() => import('./pages/Cart'));
const Admin = lazy(() => import('./pages/Admin'));
const ARView = lazy(() => import('./pages/ARView'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Tracking = lazy(() => import('./pages/Tracking'));

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();
  const isARView = location.pathname.startsWith('/ar/');

  return (
    <div className="min-h-screen text-white bg-background font-sans selection:bg-primary selection:text-black">
      <CustomCursor />
      {!isARView && <ThreeBackground />}
      {!isARView && <Navbar onOpenCart={() => setIsCartOpen(true)} />}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      
      <main className={`relative ${isARView ? 'pt-0' : 'pt-24 md:pt-32'} px-4 md:px-8 max-w-7xl mx-auto min-h-[80vh]`}>
        <Suspense fallback={
          <div className="flex items-center justify-center h-[60vh]">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/ar/:id" element={<ARView />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/tracking" element={<Tracking />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
      
      {!isARView && <Footer />}
    </div>
  );
}

export default App;
