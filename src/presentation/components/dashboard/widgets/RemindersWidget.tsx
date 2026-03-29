import { Plus, Wrench, DollarSign, FileWarning } from 'lucide-react';
import { motion } from 'framer-motion';

interface Reminder {
  id: string;
  type: 'maintenance' | 'document' | 'payment';
  title: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
}

const reminders: Reminder[] = [
  {
    id: '1',
    type: 'maintenance',
    title: 'Cambio de aceite — Toyota Corolla (ABC-123)',
    date: '2026-03-25',
    priority: 'high',
  },
  {
    id: '2',
    type: 'document',
    title: 'Seguro por vencer — Hilux (DEF-456)',
    date: '2026-04-02',
    priority: 'high',
  },
  {
    id: '3',
    type: 'payment',
    title: 'Pago pendiente — Contrato #0042',
    date: '2026-03-28',
    priority: 'medium',
  },
  {
    id: '4',
    type: 'document',
    title: 'Revisión técnica — Fortuner (GHI-789)',
    date: '2026-04-10',
    priority: 'medium',
  },
];

const iconMap = {
  maintenance: Wrench,
  document: FileWarning,
  payment: DollarSign,
};

const priorityColors = {
  high: 'text-red-500 bg-red-50',
  medium: 'text-amber-500 bg-amber-50',
  low: 'text-blue-500 bg-blue-50',
};

export const RemindersWidget = () => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-semibold text-gray-900">Recordatorios</h3>
        <button className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors">
          <Plus className="w-4 h-4 text-gray-500" />
        </button>
      </div>
      <div className="space-y-3">
        {reminders.map((item, i) => {
          const Icon = iconMap[item.type];
          const colors = priorityColors[item.priority];
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group"
            >
              <div className={`w-9 h-9 rounded-lg ${colors} flex items-center justify-center shrink-0 mt-0.5`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700 font-medium leading-snug group-hover:text-gray-900 transition-colors">
                  {item.title}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(item.date).toLocaleDateString('es-VE', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
