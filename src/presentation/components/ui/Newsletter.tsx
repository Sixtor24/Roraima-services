import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';

export const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2 max-md:px-4 my-10">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="md:text-4xl text-2xl"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        ¡Nunca te pierdas una oferta!
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="md:text-lg text-muted-foreground pb-2"
      >
        Suscríbete para recibir las últimas ofertas, nuevos vehículos y descuentos exclusivos
      </motion.p>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="w-12 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent mb-4"
      />
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        onSubmit={handleSubmit}
        className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12 mt-4"
      >
        <input
          className="border border-border-color rounded-l-xl h-full border-r-0 outline-none w-full px-4 text-gray-700 bg-cream/50 focus:border-primary transition-colors"
          placeholder="Ingresa tu correo electrónico"
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="md:px-12 px-8 h-full text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer rounded-r-xl font-medium tracking-wide"
        >
          Suscribirse
        </button>
      </motion.form>
    </div>
  );
};
