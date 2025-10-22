/**
 * Servicio de datos simulados (Mock Data)
 *
 * Este módulo simula las respuestas de la API real usando datos JSON.
 * Útil para desarrollo frontend sin necesidad de backend/MySQL activo.
 */

import { DEBUG_MODE } from './apiConfig';

/**
 * Simula un delay de red (para hacer más realista la simulación)
 * @param {number} ms - Milisegundos de delay
 * @returns {Promise} Promesa que se resuelve después del delay
 */
const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Simula una respuesta exitosa de la API
 * @param {any} data - Datos a retornar
 * @param {number} delayMs - Delay en milisegundos
 * @returns {Promise} Promesa con formato de respuesta HTTP
 */
const mockSuccess = async (data, delayMs = 500) => {
  await delay(delayMs);

  if (DEBUG_MODE) {
    console.log('🎭 Mock Response:', data);
  }

  return {
    status: 200,
    statusText: 'OK',
    data,
  };
};

/**
 * Simula un error de la API
 * @param {number} status - Código de estado HTTP
 * @param {string} message - Mensaje de error
 * @param {number} delayMs - Delay en milisegundos
 * @returns {Promise} Promesa rechazada con error
 */
const mockError = async (status = 500, message = 'Error simulado', delayMs = 500) => {
  await delay(delayMs);

  const error = new Error(message);
  error.response = {
    status,
    statusText: message,
    data: { message, error: true },
  };

  if (DEBUG_MODE) {
    console.error('🎭 Mock Error:', error.response);
  }

  throw error;
};

/**
 * Servicio Mock - Simula todas las operaciones de la API
 */
export const mockService = {
  /**
   * Autenticación
   */
  auth: {
    /**
     * Login de usuario
     * @param {object} credentials - { email, password }
     * @returns {Promise} Usuario y token
     */
    login: async (credentials) => {
      if (DEBUG_MODE) {
        console.log('🎭 Mock Login:', credentials);
      }

      // Simular validación
      if (credentials.email === 'correo@email' && credentials.password === 'admin') {
        return mockSuccess({
          user: {
            id: 32,
            name: 'Jose Gabriel Alvarez Perez',
            email: 'correo@email',
            role: 'admin',
            ip: '192.168.1.1',
          },
          token: 'mock-jwt-token-12345',
        });
      }

      return mockError(401, 'Credenciales inválidas');
    },

    /**
     * Obtener usuario actual
     * @returns {Promise} Datos del usuario
     */
    me: async () => {
      const response = await fetch('/json/usuario.json');
      const data = await response.json();
      return mockSuccess(data);
    },

    /**
     * Logout
     * @returns {Promise} Confirmación
     */
    logout: async () => {
      return mockSuccess({ message: 'Sesión cerrada exitosamente' }, 200);
    },
  },

  /**
   * Usuarios
   */
  users: {
    /**
     * Obtener datos del usuario y permisos
     * @param {number} userId - ID del usuario
     * @returns {Promise} Usuario y permisos
     */
    getUserWithPermissions: async (userId) => {
      try {
        const [userResponse, permissionsResponse] = await Promise.all([
          fetch('/json/usuario.json'),
          fetch('/json/permisos.json'),
        ]);

        const userData = await userResponse.json();
        const permissionsData = await permissionsResponse.json();

        return mockSuccess({
          ...userData,
          ...permissionsData,
        });
      } catch (error) {
        return mockError(500, 'Error al cargar datos del usuario');
      }
    },

    /**
     * Obtener solo permisos de un usuario
     * @param {number} userId - ID del usuario
     * @returns {Promise} Permisos
     */
    getPermissions: async (userId) => {
      const response = await fetch('/json/permisos.json');
      const data = await response.json();
      return mockSuccess(data);
    },
  },

  /**
   * Módulo de Implementación
   */
  implementacion: {
    /**
     * Obtener alianzas
     * @returns {Promise} Lista de alianzas
     */
    getAlianzas: async () => {
      try {
        const response = await fetch('/json/alianzas.json');
        const data = await response.json();
        return mockSuccess(data);
      } catch (error) {
        // Si no existe el archivo, retornar datos de ejemplo
        return mockSuccess({
          alianzas: [
            { id: 1, nombre: 'Alianza Demo 1', status: 'activo', createdAt: '2024-01-15' },
            { id: 2, nombre: 'Alianza Demo 2', status: 'activo', createdAt: '2024-02-20' },
          ],
        });
      }
    },

    /**
     * Crear nueva alianza
     * @param {object} alianzaData - Datos de la alianza
     * @returns {Promise} Alianza creada
     */
    createAlianza: async (alianzaData) => {
      return mockSuccess({
        id: Date.now(),
        ...alianzaData,
        createdAt: new Date().toISOString(),
      }, 800);
    },

    /**
     * Actualizar alianza
     * @param {number} id - ID de la alianza
     * @param {object} alianzaData - Datos actualizados
     * @returns {Promise} Alianza actualizada
     */
    updateAlianza: async (id, alianzaData) => {
      return mockSuccess({
        id,
        ...alianzaData,
        updatedAt: new Date().toISOString(),
      }, 800);
    },

    /**
     * Eliminar alianza
     * @param {number} id - ID de la alianza
     * @returns {Promise} Confirmación
     */
    deleteAlianza: async (id) => {
      return mockSuccess({
        message: `Alianza ${id} eliminada exitosamente`,
        id,
      }, 600);
    },
  },

  /**
   * Módulo de Nóminas
   */
  nominas: {
    /**
     * Obtener nóminas
     * @returns {Promise} Lista de nóminas
     */
    getNominas: async () => {
      return mockSuccess({
        nominas: [
          { id: 1, periodo: '2024-01', tipo: 'Quincenal', total: 150000, status: 'pagada' },
          { id: 2, periodo: '2024-02', tipo: 'Quincenal', total: 152000, status: 'pendiente' },
        ],
      });
    },
  },

  /**
   * Módulo IMSS
   */
  imss: {
    /**
     * Obtener datos generales IMSS
     * @returns {Promise} Datos IMSS
     */
    getGenerales: async () => {
      return mockSuccess({
        empresas: [],
        totales: { trabajadores: 0, cuotas: 0 },
      });
    },
  },

  /**
   * Módulo de Facturación
   */
  facturacion: {
    /**
     * Obtener facturas
     * @returns {Promise} Lista de facturas
     */
    getFacturas: async () => {
      return mockSuccess({
        facturas: [
          { id: 1, folio: 'FAC-001', cliente: 'Cliente A', total: 10000, status: 'pagada' },
          { id: 2, folio: 'FAC-002', cliente: 'Cliente B', total: 15000, status: 'pendiente' },
        ],
      });
    },
  },

  /**
   * Módulo de Gastos
   */
  gastos: {
    /**
     * Obtener solicitudes de gastos
     * @returns {Promise} Lista de solicitudes
     */
    getSolicitudes: async () => {
      return mockSuccess({
        solicitudes: [],
      });
    },
  },

  /**
   * Módulo de Utilería
   */
  utileria: {
    /**
     * Obtener bancos
     * @returns {Promise} Lista de bancos
     */
    getBancos: async () => {
      return mockSuccess({
        bancos: [],
      });
    },
  },

  /**
   * Módulo de Soporte
   */
  soporte: {
    /**
     * Obtener tickets
     * @returns {Promise} Lista de tickets
     */
    getTickets: async () => {
      return mockSuccess({
        tickets: [],
      });
    },
  },
};

export default mockService;
