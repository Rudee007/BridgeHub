import { useState, useEffect } from 'react';
import { Building2, GraduationCap, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-xl shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <span className="text-2xl font-bold gradient-text">
              BridgeHub
            </span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-700 hover:text-primary-600 font-medium transition">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-700 hover:text-primary-600 font-medium transition">
              How it Works
            </a>
            <a href="#testimonials" className="text-gray-700 hover:text-primary-600 font-medium transition">
              Testimonials
            </a>
            <a href="#about" className="text-gray-700 hover:text-primary-600 font-medium transition">
              About
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-5 py-2.5 text-primary-600 border-2 border-primary-600 rounded-xl hover:bg-primary-50 transition font-semibold"
            >
              <Building2 size={18} />
              For Companies
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl hover:shadow-glow-primary transition font-semibold"
            >
              <GraduationCap size={18} />
              For Universities
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-700"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-6 py-4 space-y-4">
              <a href="#features" className="block py-2 text-gray-700 hover:text-primary-600">Features</a>
              <a href="#how-it-works" className="block py-2 text-gray-700 hover:text-primary-600">How it Works</a>
              <a href="#testimonials" className="block py-2 text-gray-700 hover:text-primary-600">Testimonials</a>
              <a href="#about" className="block py-2 text-gray-700 hover:text-primary-600">About</a>
              <div className="flex flex-col gap-3 pt-4">
                <button className="btn btn-outline w-full justify-center">
                  <Building2 size={18} />
                  For Companies
                </button>
                <button className="btn btn-primary w-full justify-center">
                  <GraduationCap size={18} />
                  For Universities
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
