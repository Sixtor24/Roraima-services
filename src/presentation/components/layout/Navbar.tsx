import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoHorizontalWhite from '../../../assets/logo-horizontal-white.avif';
import logoHorizontal from '../../../assets/logo-horizontal.avif';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;
  const isHomePage = location.pathname === '/';
  const useTransparent = isHomePage && !isScrolled;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
      useTransparent 
        ? 'bg-transparent py-5' 
        : 'bg-white/80 backdrop-blur-xl shadow-lg border-b border-border-color/50'
    }`}>
      <div className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32">
        <Link to="/" className="flex items-center gap-2 group">
          <img 
            src={useTransparent ? logoHorizontalWhite : logoHorizontal} 
            alt="Roraima Services" 
            className="h-10 md:h-20 w-auto object-contain transition-all duration-500"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { path: '/', label: 'Inicio' },
            { path: '/cars', label: 'Vehículos' },
            { path: '/about', label: 'Nosotros' },
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-base font-medium tracking-wide transition-colors relative group ${
                useTransparent 
                  ? isActive(link.path) ? 'text-white' : 'text-white/70 hover:text-white'
                  : isActive(link.path) ? 'text-primary' : 'text-gray-700 hover:text-primary'
              }`}
            >
              {link.label}
              {isActive(link.path) && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}

          <div className="flex items-center gap-3">
            <Link to="/contact">
              <button className="px-6 py-2.5 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg font-semibold text-base tracking-wide">
                Contacto
              </button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden cursor-pointer ${useTransparent ? 'text-white' : 'text-gray-900'}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-xl shadow-xl border-t border-border-color"
          >
            <div className="flex flex-col p-6 space-y-1">
              <Link 
                to="/" 
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-primary font-medium py-3 px-3 rounded-lg hover:bg-primary-subtle transition-all"
              >
                Inicio
              </Link>
              <Link 
                to="/cars" 
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-primary font-medium py-3 px-3 rounded-lg hover:bg-primary-subtle transition-all"
              >
                Vehículos
              </Link>
              <Link 
                to="/about" 
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-primary font-medium py-3 px-3 rounded-lg hover:bg-primary-subtle transition-all"
              >
                Nosotros
              </Link>
              <div className="pt-3">
                <Link 
                  to="/contact" 
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-6 py-3 bg-primary hover:bg-primary-dull transition-all text-white rounded-xl font-semibold w-full tracking-wide text-center"
                >
                  Contacto
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
