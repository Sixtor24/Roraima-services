import { motion } from 'framer-motion';
import { Car, FileText, Wrench, UserPlus } from 'lucide-react';

interface Activity {
  id: string;
  type: 'rental' | 'invoice' | 'maintenance' | 'client';
  title: string;
  description: string;
  time: string;
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'rental',
    title: 'Nuevo alquiler creado',
    description: 'Toyota Corolla (ABC-123) — María González',
    time: 'Hace 25 min',
  },
  {
    id: '2',
    type: 'invoice',
    title: 'Factura #0089 generada',
    description: '$450.00 — Contrato #0042',
    time: 'Hace 1 hora',
  },
  {
    id: '3',
    type: 'maintenance',
    title: 'Mantenimiento completado',
    description: 'Hilux (DEF-456) — Cambio de frenos',
    time: 'Hace 3 horas',
  },
  {
    id: '4',
    type: 'client',
    title: 'Nuevo cliente registrado',
    description: 'Carlos Pérez — V-12345678',
    time: 'Hace 5 horas',
  },
  {
    id: '5',
    type: 'rental',
    title: 'Devolución registrada',
    description: 'Fortuner (GHI-789) — Luis Herrera',
    time: 'Ayer, 4:30 PM',
  },
];

const iconMap = {
  rental: { icon: Car, bg: 'bg-blue-50', text: 'text-blue-500' },
  invoice: { icon: FileText, bg: 'bg-emerald-50', text: 'text-emerald-500' },
  maintenance: { icon: Wrench, bg: 'bg-amber-50', text: 'text-amber-500' },
  client: { icon: UserPlus, bg: 'bg-purple-50', text: 'text-purple-500' },
};

export const RecentActivityWidget = () => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-semibold text-gray-900">Actividad Reciente</h3>
        <button className="text-sm text-primary font-medium hover:underline">Ver todo</button>
      </div>
      <div className="space-y-1">
        {activities.map((item, i) => {
          const { icon: Icon, bg, text } = iconMap[item.type];
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className={`w-9 h-9 rounded-lg ${bg} ${text} flex items-center justify-center shrink-0 mt-0.5`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800">{item.title}</p>
                <p className="text-xs text-gray-500 mt-0.5 truncate">{item.description}</p>
              </div>
              <span className="text-xs text-gray-400 shrink-0 mt-1">{item.time}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
