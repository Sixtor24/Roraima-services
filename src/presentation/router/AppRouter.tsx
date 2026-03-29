import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { ScrollToTop } from '../components/utils/ScrollToTop';
import { Home } from '../pages/Home';
import { Cars } from '../pages/Cars';
import { CarDetails } from '../pages/CarDetails';
import { About } from '../pages/About';
import { Contact } from '../pages/Contact';
import { DashboardHome } from '../pages/admin/DashboardHome';
import { BookingsPage } from '../pages/admin/BookingsPage';
import { VehiclesPage } from '../pages/admin/VehiclesPage';
import { VehicleDetailsPage } from '../pages/admin/VehicleDetailsPage';
import { PlaceholderPage } from '../pages/admin/PlaceholderPage';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="cars" element={<Cars />} />
          <Route path="cars/:id" element={<CarDetails />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* Admin routes */}
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="vehicles" element={<VehiclesPage />} />
          <Route path="vehicles/new" element={<PlaceholderPage title="Agregar Vehículo" />} />
          <Route path="vehicles/:id" element={<VehicleDetailsPage />} />
          <Route path="rentals" element={<BookingsPage />} />
          <Route path="rentals/calendar" element={<PlaceholderPage title="Calendario de Reservas" description="Vista de disponibilidad de vehículos por día, semana y mes." />} />
          <Route path="rentals/new" element={<PlaceholderPage title="Nuevo Alquiler" />} />
          <Route path="rentals/:id" element={<PlaceholderPage title="Detalle del Contrato" />} />
          <Route path="clients" element={<PlaceholderPage title="Clientes" description="Registro y gestión de clientes con historial de alquileres." />} />
          <Route path="clients/:id" element={<PlaceholderPage title="Perfil del Cliente" />} />
          <Route path="invoices" element={<PlaceholderPage title="Facturas" description="Generación y gestión de facturas en bolívares y dólares." />} />
          <Route path="invoices/:id" element={<PlaceholderPage title="Detalle de Factura" />} />
          <Route path="payments" element={<PlaceholderPage title="Pagos" description="Historial de pagos recibidos y saldos pendientes." />} />
          <Route path="maintenance" element={<PlaceholderPage title="Mantenimiento" description="Registro de mantenimientos preventivos, correctivos e inspecciones." />} />
          <Route path="maintenance/new" element={<PlaceholderPage title="Registrar Mantenimiento" />} />
          <Route path="maintenance/:id" element={<PlaceholderPage title="Detalle del Mantenimiento" />} />
          <Route path="workshops" element={<PlaceholderPage title="Talleres" description="Directorio de talleres externos y su historial de servicios." />} />
          <Route path="documents" element={<PlaceholderPage title="Documentos" description="Control de documentos vehiculares, vencimientos y alertas." />} />
          <Route path="reports/fleet" element={<PlaceholderPage title="Reporte de Disponibilidad" />} />
          <Route path="reports/km" element={<PlaceholderPage title="Reporte de Km Recorridos" />} />
          <Route path="reports/revenue" element={<PlaceholderPage title="Reporte de Ingresos/Costos" />} />
          <Route path="settings" element={<PlaceholderPage title="Configuración" description="Ajustes generales del sistema y preferencias." />} />
          <Route path="settings/rates" element={<PlaceholderPage title="Configuración de Tarifas" />} />
          <Route path="settings/users" element={<PlaceholderPage title="Gestión de Usuarios" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
