import { motion } from 'framer-motion';

interface CarType {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

const carTypes: CarType[] = [
  { name: 'Sedán', count: 5, percentage: 42, color: '#1a1a1a' },
  { name: 'Camioneta', count: 4, percentage: 33, color: '#c00c22' },
  { name: 'SUV', count: 2, percentage: 17, color: '#6B7280' },
  { name: 'Otros', count: 1, percentage: 8, color: '#D1D5DB' },
];

export const CarTypesWidget = () => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-semibold text-gray-900">Tipos de Vehículos</h3>
      </div>
      <div className="space-y-4">
        {carTypes.map((type, i) => (
          <motion.div
            key={type.name}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-4"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium text-gray-700">{type.name}</span>
                <span className="text-sm font-semibold text-gray-900">{type.percentage}%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${type.percentage}%` }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: type.color }}
                />
              </div>
            </div>
            <span className="text-xs text-gray-400 w-6 text-right shrink-0">{type.count}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
