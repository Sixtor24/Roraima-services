import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Car,
  Users,
  Wrench,
  CalendarDays,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  DollarSign,
  FolderOpen,
  X,
  LogOut,
} from 'lucide-react';
import logoHorizontal from '../../../assets/logo-horizontal.avif';
import logoVertical from '../../../assets/logo-vertical.avif';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
  children?: { label: string; path: string }[];
}

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  {
    label: 'Vehículos',
    path: '/admin/vehicles',
    icon: Car,
    children: [
      { label: 'Lista de Vehículos', path: '/admin/vehicles' },
      { label: 'Agregar Vehículo', path: '/admin/vehicles/new' },
    ],
  },
  {
    label: 'Alquileres',
    path: '/admin/rentals',
    icon: CalendarDays,
    children: [
      { label: 'Contratos', path: '/admin/rentals' },
      { label: 'Calendario', path: '/admin/rentals/calendar' },
      { label: 'Nuevo Alquiler', path: '/admin/rentals/new' },
    ],
  },
  { label: 'Clientes', path: '/admin/clients', icon: Users },
  {
    label: 'Facturación',
    path: '/admin/invoices',
    icon: DollarSign,
    children: [
      { label: 'Facturas', path: '/admin/invoices' },
      { label: 'Tarifas', path: '/admin/settings/rates' },
      { label: 'Pagos', path: '/admin/payments' },
    ],
  },
  {
    label: 'Mantenimiento',
    path: '/admin/maintenance',
    icon: Wrench,
    children: [
      { label: 'Registros', path: '/admin/maintenance' },
      { label: 'Talleres', path: '/admin/workshops' },
    ],
  },
  { label: 'Documentos', path: '/admin/documents', icon: FolderOpen },
  {
    label: 'Reportes',
    path: '/admin/reports',
    icon: BarChart3,
    children: [
      { label: 'Disponibilidad', path: '/admin/reports/fleet' },
      { label: 'Km Recorridos', path: '/admin/reports/km' },
      { label: 'Ingresos/Costos', path: '/admin/reports/revenue' },
    ],
  },
  { label: 'Configuración', path: '/admin/settings', icon: Settings },
];

export const Sidebar = ({ collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label]
    );
  };

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-gray-100">
        <div className="flex items-center gap-3 overflow-hidden">
          {collapsed ? (
            <img src={logoVertical} alt="Roraima" className="w-8 h-8 object-contain" />
          ) : (
            <img src={logoHorizontal} alt="Roraima Services" className="h-8 object-contain" />
          )}
        </div>
        <button
          onClick={onToggle}
          className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
        <button
          onClick={onMobileClose}
          className="lg:hidden flex items-center justify-center w-7 h-7 rounded-lg hover:bg-gray-100 transition-colors text-gray-400"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          const hasChildren = item.children && item.children.length > 0;
          const isExpanded = expandedItems.includes(item.label);

          return (
            <div key={item.label}>
              {hasChildren ? (
                <>
                  <button
                    onClick={() => toggleExpanded(item.label)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                      active
                        ? 'bg-primary/10 text-primary'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className={`w-5 h-5 shrink-0 ${active ? 'text-primary' : 'text-gray-400 group-hover:text-gray-600'}`} />
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left truncate">{item.label}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </>
                    )}
                  </button>
                  <AnimatePresence>
                    {isExpanded && !collapsed && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-8 mt-1 space-y-0.5">
                          {item.children!.map((child) => (
                            <NavLink
                              key={child.path}
                              to={child.path}
                              onClick={onMobileClose}
                              className={({ isActive }) =>
                                `block px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                                  isActive
                                    ? 'text-primary font-medium bg-primary/5'
                                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                                }`
                              }
                            >
                              {child.label}
                            </NavLink>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <NavLink
                  to={item.path}
                  end={item.path === '/admin'}
                  onClick={onMobileClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </NavLink>
              )}
            </div>
          );
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-gray-100 p-3">
        {!collapsed ? (
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-semibold text-primary">RS</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Admin</p>
              <p className="text-xs text-gray-500 truncate">Roraima Services</p>
            </div>
            <LogOut className="w-4 h-4 text-gray-400 hover:text-primary transition-colors" />
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center cursor-pointer">
              <span className="text-sm font-semibold text-primary">RS</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex flex-col bg-white border-r border-gray-100 h-screen sticky top-0 transition-all duration-300 z-40 ${
          collapsed ? 'w-[72px]' : 'w-[260px]'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
              className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-[280px] bg-white shadow-2xl z-50 flex flex-col"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
