import { useState, useEffect } from 'react';
import { Building2, GraduationCap, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { smoothScrollToSection } from '@/utils/smoothScroll';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isCompaniesPage = location.pathname === '/for-companies';
  const isUniversitiesPage = location.pathname === '/for-universities';
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Navigation items based on current page
  const getNavItems = () => {
    if (isCompaniesPage) {
      return [
        { label: 'Features', href: '#features' },
        { label: 'How it Works', href: '#how-it-works' },
        { label: 'Get Started', href: '#get-started' },
      ];
    } else if (isUniversitiesPage) {
      return [
        { label: 'Benefits', href: '#benefits' },
        { label: 'How it Works', href: '#how-it-works' },
        { label: 'Partners', href: '#partners' },
        { label: 'Resources', href: '#resources' },
      ];
    } else {
      return [
        { label: 'Features', href: '#features' },
        { label: 'How it Works', href: '#how-it-works' },
        { label: 'Testimonials', href: '#testimonials' },
        { label: 'About', href: '#about' },
      ];
    }
  };

  const navItems = getNavItems();

  // ✅ SMOOTH SCROLL HANDLER
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    smoothScrollToSection(href);
    setIsMobileMenuOpen(false);
  };

  // ✅ LOGO CLICK HANDLER
  const handleLogoClick = (e: React.MouseEvent) => {
    if (isHomePage) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-sm' 
          : 'bg-white/95 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo */}
          <Link to="/" onClick={handleLogoClick}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-base">B</span>
              </div>
              <span className="text-xl font-bold text-gray-900">
                BridgeHub
              </span>
            </motion.div>
          </Link>

          {/* Desktop Menu - WITH SMOOTH SCROLL ✅ */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Buttons - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            {isCompaniesPage ? (
              // ✅ ON COMPANIES PAGE - Show Login/Signup buttons
              <>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/login')}
                  className="px-5 py-2.5 text-gray-700 font-medium hover:text-gray-900 transition-colors"
                >
                  Log In
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/signup')}
                  className="px-5 py-2.5 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg hover:shadow-lg transition-all font-medium"
                >
                  Sign Up Free
                </motion.button>
              </>
            ) : isUniversitiesPage ? (
              // ✅ ON UNIVERSITIES PAGE - Show Login/Get Started buttons
              <>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/login')}
                  className="px-5 py-2.5 text-gray-700 font-medium hover:text-gray-900 transition-colors"
                >
                  Log In
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/signup')}
                  className="px-5 py-2.5 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg hover:shadow-lg transition-all font-medium"
                >
                  Get Started
                </motion.button>
              </>
            ) : (
              // ✅ ON HOME PAGE - Show For Companies/Universities buttons
              <>
                <Link to="/for-companies">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-4 xl:px-5 py-2 xl:py-2.5 text-gray-700 border border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all font-medium text-sm xl:text-base"
                  >
                    <Building2 size={18} className="text-gray-600" />
                    <span>For Companies</span>
                  </motion.button>
                </Link>
                
                <Link to="/for-universities">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-4 xl:px-5 py-2 xl:py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all font-medium text-sm xl:text-base shadow-sm"
                  >
                    <GraduationCap size={18} />
                    <span>For Universities</span>
                  </motion.button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
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
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 sm:px-6 py-6 space-y-1">
              {/* Mobile Menu Links */}
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="block px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium transition-colors cursor-pointer"
                >
                  {item.label}
                </a>
              ))}
              
              {/* Mobile CTA Buttons */}
              <div className="flex flex-col gap-3 pt-4 border-t border-gray-100 mt-4">
                {isCompaniesPage || isUniversitiesPage ? (
                  // ✅ MOBILE: Login/Signup buttons
                  <>
                    <button 
                      onClick={() => {
                        navigate('/login');
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all font-medium"
                    >
                      Log In
                    </button>
                    <button 
                      onClick={() => {
                        navigate('/signup');
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full px-4 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg hover:shadow-lg transition-all font-medium"
                    >
                      {isCompaniesPage ? 'Sign Up Free' : 'Get Started'}
                    </button>
                  </>
                ) : (
                  // ✅ MOBILE: For Companies/Universities buttons
                  <>
                    <Link to="/for-companies">
                      <button 
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Building2 size={18} />
                        <span>For Companies</span>
                      </button>
                    </Link>
                    
                    <Link to="/for-universities">
                      <button 
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all font-medium shadow-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <GraduationCap size={18} />
                        <span>For Universities</span>
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
