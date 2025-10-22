/**
 * Configuración de la API para Brain ERP
 *
 * Este archivo centraliza todas las configuraciones relacionadas con la API,
 * incluyendo URLs base, timeouts y modo de simulación.
 */

// Modo de desarrollo (usa datos simulados cuando está en true)
export const USE_MOCK_DATA = import.meta.env.VITE_ENABLE_MOCK_DATA === 'true';

// URL base de la API (cuando se conecte a MySQL)
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Timeout para las peticiones HTTP (en milisegundos)
export const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000;

// Configuración de debug
export const DEBUG_MODE = import.meta.env.VITE_ENABLE_DEBUG === 'true';

// Endpoints de la API
export const API_ENDPOINTS = {
  // Autenticación
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    me: '/auth/me',
  },

  // Usuarios
  users: {
    base: '/users',
    byId: (id) => `/users/${id}`,
    permissions: (id) => `/users/${id}/permissions`,
  },

  // Módulo de Implementación
  implementacion: {
    alianzas: '/implementacion/alianzas',
    empresas: '/implementacion/empresas',
    clientes: '/implementacion/clientes',
    remunerados: '/implementacion/remunerados',
    layouts: '/implementacion/layouts',
    contratos: '/implementacion/contratos',
  },

  // Módulo de Nóminas
  nominas: {
    base: '/nominas',
    recibos: '/nominas/recibos',
    reportes: '/nominas/reportes',
    movimientos: '/nominas/movimientos',
    calendario: '/nominas/calendario',
  },

  // Módulo IMSS
  imss: {
    generales: '/imss/generales',
    cargos: '/imss/cargos',
    reportes: '/imss/reportes',
    obras: '/imss/obras',
  },

  // Módulo de Facturación
  facturacion: {
    facturas: '/facturacion/facturas',
    complementos: '/facturacion/complementos',
    notasCredito: '/facturacion/notas-credito',
    depositos: '/facturacion/depositos',
  },

  // Módulo de Gastos
  gastos: {
    solicitudes: '/gastos/solicitudes',
    proveedores: '/gastos/proveedores',
    archivos: '/gastos/archivos',
    concentrador: '/gastos/concentrador',
  },

  // Módulo de Utilería
  utileria: {
    lectorXml: '/utileria/lector-xml',
    bancos: '/utileria/bancos',
    cheques: '/utileria/cheques',
    conciliaciones: '/utileria/conciliaciones',
  },

  // Módulo de Soporte
  soporte: {
    usuarios: '/soporte/usuarios',
    tickets: '/soporte/tickets',
    notificaciones: '/soporte/notificaciones',
  },
};

// Headers por defecto para todas las peticiones
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

// Log de configuración en modo debug
if (DEBUG_MODE) {
  console.log('🔧 API Configuration:', {
    useMockData: USE_MOCK_DATA,
    apiBaseUrl: API_BASE_URL,
    timeout: API_TIMEOUT,
    debugMode: DEBUG_MODE,
  });
}
