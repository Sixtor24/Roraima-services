import { Link, useLocation } from 'react-router-dom';
import { Home, Car, Users, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { path: '/', label: 'Inicio', icon: Home },
  { path: '/cars', label: 'Vehículos', icon: Car },
  { path: '/about', label: 'Nosotros', icon: Users },
  { path: '/contact', label: 'Contacto', icon: MessageCircle },
];

export const BottomMobileMenu = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50">
      {/* Frosted glass background */}
      <div className="relative bg-white/90 backdrop-blur-2xl border-t border-border-color/40 shadow-[0_-4px_30px_rgba(0,0,0,0.08)]">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/15 to-transparent" />

        <div className="flex items-center justify-around px-2 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className="relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all"
              >
                {active && (
                  <motion.div
                    layoutId="bottomNavActive"
                    className="absolute inset-0 bg-primary-subtle rounded-xl"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <item.icon
                  className={`relative z-10 w-5 h-5 transition-colors duration-200 ${
                    active ? 'text-primary' : 'text-gray-400'
                  }`}
                  strokeWidth={active ? 2.2 : 1.8}
                />
                <span
                  className={`relative z-10 text-[10px] font-medium tracking-wide transition-colors duration-200 ${
                    active ? 'text-primary' : 'text-gray-400'
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
