# Arquitectura del Proyecto - Rental Cars Puerto Ordaz

## 🏗️ Clean Architecture

Este proyecto sigue los principios de **Clean Architecture** para mantener el código organizado, escalable y fácil de mantener.

## 📁 Estructura de Carpetas

```
src/
├── domain/                      # Capa de Dominio (Lógica de Negocio)
│   ├── entities/                # Entidades del negocio
│   │   ├── Car.ts              # Modelo de vehículo
│   │   ├── Booking.ts          # Modelo de reserva
│   │   └── User.ts             # Modelo de usuario
│   ├── repositories/            # Interfaces de repositorios
│   │   ├── CarRepository.ts    # Interfaz para gestión de vehículos
│   │   └── BookingRepository.ts # Interfaz para gestión de reservas
│   └── usecases/                # Casos de uso del negocio
│       ├── GetCars.ts          # Obtener lista de vehículos
│       ├── GetCarById.ts       # Obtener vehículo por ID
│       ├── CreateBooking.ts    # Crear reserva
│       └── GetBookings.ts      # Obtener reservas del usuario
│
├── infrastructure/              # Capa de Infraestructura (Implementaciones)
│   ├── api/                     # Configuración de API
│   │   ├── axiosClient.ts      # Cliente HTTP configurado
│   │   └── endpoints.ts        # Endpoints de la API
│   └── repositories/            # Implementaciones de repositorios
│       ├── CarRepositoryImpl.ts
│       └── BookingRepositoryImpl.ts
│
├── presentation/                # Capa de Presentación (UI/UX)
│   ├── components/              # Componentes reutilizables
│   │   ├── layout/              # Componentes de layout
│   │   │   ├── Navbar.tsx      # Barra de navegación
│   │   │   ├── Footer.tsx      # Pie de página
│   │   │   └── Layout.tsx      # Layout principal
│   │   └── ui/                  # Componentes UI genéricos
│   │       ├── CarCard.tsx     # Tarjeta de vehículo
│   │       ├── SearchForm.tsx  # Formulario de búsqueda
│   │       ├── TestimonialCard.tsx # Tarjeta de testimonio
│   │       └── Button.tsx      # Botón genérico
│   ├── pages/                   # Páginas de la aplicación
│   │   ├── Home.tsx            # Página principal
│   │   ├── Cars.tsx            # Lista de vehículos
│   │   ├── CarDetails.tsx      # Detalles de vehículo
│   │   ├── MyBookings.tsx      # Mis reservas
│   │   └── ListCar.tsx         # Publicar vehículo
│   ├── hooks/                   # Custom hooks
│   │   ├── useCars.ts          # Hook para gestión de vehículos
│   │   └── useBookings.ts      # Hook para gestión de reservas
│   └── router/                  # Configuración de rutas
│       └── AppRouter.tsx       # Router principal
│
├── shared/                      # Código compartido
│   ├── utils/                   # Utilidades
│   │   ├── formatters.ts       # Formateadores de datos
│   │   └── validators.ts       # Validadores
│   ├── constants/               # Constantes globales
│   │   ├── locations.ts        # Ubicaciones de Venezuela
│   │   └── carTypes.ts         # Tipos de vehículos
│   └── types/                   # Types compartidos
│       └── index.ts            # Exportación de types
│
├── assets/                      # Recursos estáticos
│   └── images/                 # Imágenes
│
├── App.tsx                      # Componente raíz
├── main.tsx                     # Punto de entrada
└── index.css                    # Estilos globales
```

## 🎯 Capas de la Arquitectura

### 1. Domain (Dominio)
**Propósito**: Contiene la lógica de negocio pura, independiente de frameworks y tecnologías.

- **Entities**: Modelos de datos del negocio
- **Repositories**: Interfaces que definen contratos para acceso a datos
- **Use Cases**: Lógica de negocio específica de cada operación

**Reglas**:
- No depende de ninguna otra capa
- No importa frameworks externos
- Solo lógica de negocio pura

### 2. Infrastructure (Infraestructura)
**Propósito**: Implementaciones concretas de las interfaces definidas en Domain.

- **API**: Configuración de clientes HTTP y endpoints
- **Repositories**: Implementaciones de los repositorios usando API externa

**Reglas**:
- Implementa interfaces de Domain
- Puede usar librerías externas (axios, etc.)
- No conoce la capa de Presentation

### 3. Presentation (Presentación)
**Propósito**: Interfaz de usuario y lógica de presentación.

- **Components**: Componentes React reutilizables
- **Pages**: Páginas completas de la aplicación
- **Hooks**: Custom hooks para lógica de componentes
- **Router**: Configuración de rutas

**Reglas**:
- Usa casos de uso de Domain
- No accede directamente a Infrastructure
- Maneja estado local y global
- Implementa animaciones con Framer Motion

### 4. Shared (Compartido)
**Propósito**: Código compartido entre todas las capas.

- **Utils**: Funciones utilitarias
- **Constants**: Constantes globales
- **Types**: Tipos TypeScript compartidos

## 🛠️ Tecnologías Utilizadas

### Core
- **React 19** - Biblioteca UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server

### Styling
- **TailwindCSS** - Framework CSS utility-first
- **Framer Motion** - Animaciones fluidas

### Routing & Icons
- **React Router DOM v7** - Navegación
- **Lucide React** - Sistema de iconos

### Package Manager
- **pnpm** - Gestor de paquetes rápido y eficiente

## 📄 Páginas de la Aplicación

1. **Home** (`/`) - Página principal con hero section, búsqueda y vehículos destacados
2. **Cars** (`/cars`) - Lista completa de vehículos con filtros
3. **Car Details** (`/cars/:id`) - Detalles de un vehículo específico
4. **My Bookings** (`/my-bookings`) - Reservas del usuario
5. **List Car** (`/list-car`) - Formulario para publicar vehículo

## 🎨 Sistema de Diseño

### Colores
- **Primary**: `#0558FE` - Azul principal
- **Primary Dull**: `#0447D9` - Azul oscuro (hover)
- **Light**: `#FCFCFD` - Fondo claro
- **Border**: `#E5E7EB` - Bordes
- **Muted**: `#6B7280` - Texto secundario

### Características Visuales
- Sombras suaves en cards
- Hover effects con transiciones
- Animaciones de entrada con Framer Motion
- Diseño responsive (mobile-first)
- Gradientes para secciones destacadas

## 🔄 Flujo de Datos

```
User Interaction
      ↓
Presentation (Component/Page)
      ↓
Custom Hook
      ↓
Use Case (Domain)
      ↓
Repository Interface (Domain)
      ↓
Repository Implementation (Infrastructure)
      ↓
API Call
      ↓
External Service
```

## 🚀 Beneficios de esta Arquitectura

1. **Separación de Responsabilidades**: Cada capa tiene una responsabilidad clara
2. **Testeable**: Fácil de hacer unit testing en cada capa
3. **Mantenible**: Cambios en una capa no afectan otras
4. **Escalable**: Fácil agregar nuevas features
5. **Independiente de Framework**: La lógica de negocio no depende de React
6. **Adaptable**: Ubicación específica para Puerto Ordaz, Venezuela

## 📍 Contexto Local

**Ubicación**: Puerto Ordaz, Estado Bolívar, Venezuela

### Adaptaciones Locales
- Ubicaciones de pickup/return adaptadas a Puerto Ordaz
- Precios en moneda local
- Soporte para español como idioma principal
- Tipos de vehículos comunes en Venezuela

## 🔐 Buenas Prácticas

- Usar TypeScript para todo
- Componentes funcionales con hooks
- Props tipados con interfaces
- Custom hooks para lógica reutilizable
- Constantes para valores mágicos
- Nombres descriptivos en inglés
- Comentarios en español cuando sea necesario

---

**Versión**: 1.0.0  
**Última actualización**: Enero 2026
