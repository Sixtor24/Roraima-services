# 🚗 CarRental Puerto Ordaz

Sistema de alquiler de vehículos para Puerto Ordaz, Venezuela. Aplicación web moderna construida con React, TypeScript y TailwindCSS siguiendo Clean Architecture.

## 📍 Ubicación

**Puerto Ordaz, Estado Bolívar, Venezuela**

## ✨ Características

- 🎨 Interfaz moderna y responsiva con TailwindCSS
- ⚡ Animaciones fluidas con Framer Motion
- 🏗️ Arquitectura limpia y escalable
- 📱 Diseño mobile-first
- 🔍 Búsqueda y filtrado de vehículos
- 📅 Sistema de reservas
- 💼 Publicación de vehículos para alquiler
- 🌟 Sección de testimonios

## 🛠️ Tecnologías

- **React 19** - Biblioteca UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool
- **TailwindCSS** - Framework CSS
- **Framer Motion** - Animaciones
- **React Router DOM v7** - Navegación
- **Lucide React** - Iconos
- **pnpm** - Gestor de paquetes

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+ 
- pnpm (instalado globalmente)

### Instalación

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev

# Compilar para producción
pnpm build

# Vista previa de producción
pnpm preview
```

El servidor de desarrollo estará disponible en `http://localhost:5173`

## 📁 Estructura del Proyecto

Ver [ARCHITECTURE.md](./ARCHITECTURE.md) para documentación detallada de la arquitectura.

```
src/
├── domain/              # Lógica de negocio
│   ├── entities/        # Entidades (Car, Booking, User)
│   ├── repositories/    # Interfaces de repositorios
│   └── usecases/        # Casos de uso
├── infrastructure/      # Implementaciones
│   ├── api/            # Cliente HTTP
│   └── repositories/   # Implementaciones de repos
├── presentation/        # UI/UX
│   ├── components/     # Componentes React
│   ├── pages/          # Páginas
│   ├── hooks/          # Custom hooks
│   └── router/         # Configuración de rutas
└── shared/             # Código compartido
    ├── constants/      # Constantes
    ├── data/          # Datos mock
    └── utils/         # Utilidades
```

## 📄 Páginas

- **Home** (`/`) - Página principal con búsqueda y vehículos destacados
- **Cars** (`/cars`) - Lista completa de vehículos con filtros
- **Car Details** (`/cars/:id`) - Detalles de vehículo específico
- **My Bookings** (`/my-bookings`) - Gestión de reservas
- **List Car** (`/list-car`) - Formulario para publicar vehículo

## 🎨 Sistema de Diseño

### Colores Principales

- **Primary**: `#0558FE` - Azul principal
- **Primary Dull**: `#0447D9` - Azul oscuro (hover)
- **Light**: `#FCFCFD` - Fondo claro
- **Border**: `#E5E7EB` - Bordes
- **Muted**: `#6B7280` - Texto secundario

## 🔧 Scripts Disponibles

```bash
pnpm dev          # Servidor de desarrollo
pnpm build        # Compilar para producción
pnpm preview      # Vista previa de build
pnpm lint         # Ejecutar ESLint
```

## 📝 Notas sobre CSS Warnings

Los warnings de `@tailwind` y `@apply` en el archivo CSS son normales y esperados. Son directivas de TailwindCSS que se procesan durante el build. No afectan la funcionalidad de la aplicación.

## 🌟 Características Futuras

- [ ] Integración con API backend
- [ ] Autenticación de usuarios
- [ ] Sistema de pagos
- [ ] Chat en vivo
- [ ] Panel de administración
- [ ] Notificaciones en tiempo real

## 👥 Contribuir

Las contribuciones son bienvenidas. Por favor abre un issue o pull request.

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la Licencia MIT.

---

**Desarrollado con ❤️ para Puerto Ordaz, Venezuela**
