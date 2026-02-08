import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface TestimonialCardProps {
  name: string;
  location: string;
  rating: number;
  comment: string;
  avatar: string;
  index?: number;
}

export const TestimonialCard = ({ 
  name, 
  location, 
  rating, 
  comment, 
  avatar,
  index = 0 
}: TestimonialCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white p-7 rounded-2xl border border-border-color hover:-translate-y-1.5 transition-all duration-500 hover:shadow-xl hover:border-primary/15 relative overflow-hidden"
    >
      {/* Subtle top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="flex items-center gap-4">
        <img className="w-13 h-13 rounded-full object-cover ring-2 ring-primary/10 ring-offset-2" alt={name} src={avatar} />
        <div>
          <p className="text-lg font-semibold text-gray-900">{name}</p>
          <p className="text-muted-foreground text-sm">{location}</p>
        </div>
      </div>

      <div className="flex items-center gap-1 mt-5">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
        ))}
      </div>

      <p className="text-muted-foreground max-w-90 mt-4 font-light leading-relaxed italic">"{comment}"</p>
    </motion.div>
  );
};
