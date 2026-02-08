import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';

const CONTACT_INFO = [
  {
    icon: MapPin,
    title: 'Ubicación',
    details: ['Puerto Ordaz, Estado Bolívar', 'Venezuela'],
  },
  {
    icon: Phone,
    title: 'Teléfono',
    details: ['+58 0412-203-6693'],
  },
  {
    icon: Mail,
    title: 'Email',
    details: ['info@roraimaservices.com'],
  },
  {
    icon: Clock,
    title: 'Horario',
    details: ['Lun - Sáb: 8:00 AM - 6:00 PM', 'Dom: Cerrado'],
  },
];

export const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const phone = '5804122036693';
    const whatsappMessage = `Hola, soy *${name}*%0AEmail: ${email}%0A%0A${message}`;
    window.open(`https://wa.me/${phone}?text=${whatsappMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative pt-32 pb-20 px-6 md:px-16 lg:px-24 xl:px-32 bg-linear-to-br from-gray-950 via-gray-900 to-primary-dull/40 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(192,12,34,0.15),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-primary-light text-sm font-semibold tracking-[0.2em] uppercase mb-4"
          >
            Estamos para ayudarte
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Contáctanos
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            ¿Tienes alguna pregunta o necesitas ayuda? Nuestro equipo está listo para asistirte.
          </motion.p>
        </div>
      </div>

      {/* Content */}
      <div className="py-20 md:py-28 px-6 md:px-16 lg:px-24 xl:px-32">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            <div>
              <h2
                className="text-2xl md:text-3xl font-bold mb-3"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Información de Contacto
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                No dudes en comunicarte con nosotros por cualquiera de estos medios.
              </p>
            </div>

            <div className="space-y-5">
              {CONTACT_INFO.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary-subtle flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-1">{item.title}</p>
                    {item.details.map((detail, j) => (
                      <p key={j} className="text-sm text-muted-foreground">{detail}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Direct WhatsApp */}
            <motion.a
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              href="https://wa.me/5804122036693"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#25D366] hover:bg-[#1fb855] text-white hover:text-white px-5 py-3 rounded-xl font-semibold transition-all hover:-translate-y-0.5 shadow-lg w-fit"
            >
              <MessageCircle className="w-5 h-5" />
              Escríbenos por WhatsApp
            </motion.a>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 md:p-8 rounded-2xl border border-border-color shadow-sm"
            >
              <h3 className="text-xl font-semibold mb-6">Envíanos un mensaje</h3>

              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-2 block">Nombre</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Tu nombre"
                      className="w-full px-4 py-3 bg-cream/50 border border-border-color rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-gray-700 font-medium text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-2 block">Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      className="w-full px-4 py-3 bg-cream/50 border border-border-color rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-gray-700 font-medium text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600 mb-2 block">Mensaje</label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="¿En qué podemos ayudarte?"
                    className="w-full px-4 py-3 bg-cream/50 border border-border-color rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-gray-700 font-medium text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary hover:bg-primary-dull text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  Enviar Mensaje
                </button>

                <p className="text-xs text-muted-foreground text-center">
                  Al enviar, serás redirigido a WhatsApp para completar tu consulta.
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
