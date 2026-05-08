import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const api = axios.create({ baseURL: API_BASE });

// ── Vehículos ──
export interface Vehiculo {
  id: number;
  marca: string;
  tipo: string;
  ano: number;
  modelo: string;
  color: string;
  placa: string;
  serialMotor: string;
  kilometrajeActual: number;
  estado: string;
  precioPorDia: number;
  transmision: string;
  asientos: number;
  tipoCombustible: string;
  imagen: string | null;
  descripcion: string | null;
  velocidadMaxima: string | null;
  aceleracion: string | null;
  autonomia: string | null;
  caracteristicas: string[];
}

export interface CreateVehiculoPayload {
  marca: string;
  tipo: string;
  ano: number;
  modelo: string;
  color: string;
  placa: string;
  serialMotor: string;
  kilometrajeActual?: number;
  estado?: string;
  precioPorDia?: number;
  transmision?: string;
  asientos?: number;
  tipoCombustible?: string;
  imagen?: string;
  descripcion?: string;
  velocidadMaxima?: string;
  aceleracion?: string;
  autonomia?: string;
  caracteristicas?: string[];
}

export const getVehiculos = () => api.get<Vehiculo[]>('/vehiculos').then((r) => r.data);
export const getVehiculo = (id: number) => api.get<Vehiculo>(`/vehiculos/${id}`).then((r) => r.data);
export const createVehiculo = (data: CreateVehiculoPayload) => api.post<Vehiculo>('/vehiculos', data).then((r) => r.data);

// ── Clientes ──
export interface Cliente {
  id: number;
  nombreCompleto: string;
  cedula: string;
  direccion: string | null;
  telefono: string | null;
  email: string | null;
}

export const getClientes = () => api.get<Cliente[]>('/clientes').then((r) => r.data);
export const buscarClientePorCedula = (cedula: string) =>
  api.get<Cliente>(`/clientes?cedula=${encodeURIComponent(cedula)}`).then((r) => r.data);
export const createCliente = (data: Omit<Cliente, 'id'>) => api.post<Cliente>('/clientes', data).then((r) => r.data);

// ── Contratos ──
export interface Contrato {
  id: number;
  vehiculoId: number;
  clienteId: number;
  fechaInicio: string;
  fechaFin: string;
  dias: number;
  canonDiarioUsd: number;
  depositoUsd: number;
  kilometrajeInicio: number;
  kilometrajeFin: number | null;
  estado: string;
  observaciones: string | null;
  createdAt: string;
  vehiculo: Vehiculo;
  cliente: Cliente;
}

export interface CreateContratoPayload {
  vehiculoId: number;
  cliente: {
    cedula: string;
    nombreCompleto: string;
    direccion?: string;
    telefono?: string;
    email?: string;
  };
  fechaInicio: string;
  fechaFin: string;
  canonDiarioUsd: number;
  depositoUsd: number;
  kilometrajeInicio: number;
}

export const crearContrato = (data: CreateContratoPayload) =>
  api.post<Contrato>('/contratos', data).then((r) => r.data);

export const getContratosActivos = () =>
  api.get<Contrato[]>('/contratos/activos').then((r) => r.data);

export const getContratos = () =>
  api.get<Contrato[]>('/contratos').then((r) => r.data);

export const finalizarContrato = (id: number, data: { kilometrajeFin: number; observaciones?: string }) =>
  api.patch<Contrato>(`/contratos/${id}/finalizar`, data).then((r) => r.data);

export const getContratoPdfUrl = (id: number) => `${API_BASE}/contratos/${id}/pdf`;
