import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import logoHorizontalWhite from '../../../assets/logo-horizontal-white.avif';
import logoHorizontal from '../../../assets/logo-horizontal.avif';

export const Navbar = () => {
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
        ? 'bg-transparent py-4 md:py-5' 
        : 'bg-white/80 backdrop-blur-xl shadow-lg border-b border-border-color/50 py-2 md:py-0'
    }`}>
      <div className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32">
        <Link to="/" className="flex items-center gap-2 group">
          <img 
            src={useTransparent ? logoHorizontalWhite : logoHorizontal} 
            alt="Roraima Services" 
            className="h-12 md:h-20 w-auto object-contain transition-all duration-500"
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
      </div>
    </nav>
  );
};
