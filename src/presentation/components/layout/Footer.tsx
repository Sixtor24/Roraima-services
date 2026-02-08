import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';
import logoVertical from '../../../assets/logo-vertical.avif';

export const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 mt-60 text-sm text-muted-foreground">
      {/* Accent line at top */}
      <div className="w-full h-px bg-linear-to-r from-transparent via-primary/20 to-transparent mb-12" />

      <div className="flex flex-wrap justify-between items-start gap-10 pb-8 border-border-color border-b">
        <div>
          <img 
            src={logoVertical} 
            alt="Roraima Services" 
            className="h-10 md:h-20 w-auto object-contain mb-4"
          />
          <p className="max-w-80 mt-3 leading-relaxed">
            Servicio premium de alquiler de vehículos en Puerto Ordaz con una amplia selección de carros de lujo y uso diario para todas tus necesidades.
          </p>
          <div className="flex items-center gap-4 mt-6">
            <a href="#" aria-label="Facebook" className="p-2 rounded-lg hover:bg-primary-subtle transition-all">
              <Facebook className="w-4 h-4 hover:text-primary transition-colors" />
            </a>
            <a href="#" aria-label="Instagram" className="p-2 rounded-lg hover:bg-primary-subtle transition-all">
              <Instagram className="w-4 h-4 hover:text-primary transition-colors" />
            </a>
            <a href="#" aria-label="Twitter" className="p-2 rounded-lg hover:bg-primary-subtle transition-all">
              <Twitter className="w-4 h-4 hover:text-primary transition-colors" />
            </a>
            <a href="#" aria-label="Email" className="p-2 rounded-lg hover:bg-primary-subtle transition-all">
              <Mail className="w-4 h-4 hover:text-primary transition-colors" />
            </a>
          </div>
        </div>

        <div className="flex flex-wrap justify-between w-full md:w-1/2 gap-8">
          <div>
            <h2 className="text-xs font-semibold text-primary tracking-[0.15em] uppercase mb-4">Enlaces Rápidos</h2>
            <ul className="flex flex-col gap-2.5">
              <li><Link to="/" className="hover:text-primary transition-colors">Inicio</Link></li>
              <li><Link to="/cars" className="hover:text-primary transition-colors">Ver Carros</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">Nosotros</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contacto</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold text-primary tracking-[0.15em] uppercase mb-4">Recursos</h2>
            <ul className="flex flex-col gap-2.5">
              <li><a href="#" className="hover:text-primary transition-colors">Centro de Ayuda</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Términos de Servicio</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Política de Privacidad</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Seguros</a></li>
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold text-primary tracking-[0.15em] uppercase mb-4">Contacto</h2>
            <ul className="flex flex-col gap-2.5">
              <li>Puerto Ordaz</li>
              <li>Estado Bolívar, Venezuela</li>
              <li>+58 0412-203-6693</li>
              <li>info@carrentalpo.com</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-2 items-center justify-between py-6 text-xs text-muted-foreground/70">
        <p>© 2026 Roraima Services. Todos los derechos reservados.</p>
        <ul className="flex items-center gap-4">
          <li><a href="#" className="hover:text-primary transition-colors">Privacidad</a></li>
          <li className="text-border-color">|</li>
          <li><a href="#" className="hover:text-primary transition-colors">Términos</a></li>
          <li className="text-border-color">|</li>
          <li><a href="#" className="hover:text-primary transition-colors">Cookies</a></li>
        </ul>
      </div>
    </footer>
  );
};
