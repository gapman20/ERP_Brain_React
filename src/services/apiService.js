/**
 * Servicio de API Real
 *
 * Este módulo maneja todas las peticiones HTTP reales hacia el backend MySQL.
 * Actualmente está preparado para conectar con la API cuando esté disponible.
 */

import { http } from './httpClient';
import { API_ENDPOINTS } from './apiConfig';

/**
 * Servicio de API - Peticiones reales al backend
 */
export const apiService = {
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
      const response = await http.post(API_ENDPOINTS.auth.login, credentials);
      return response;
    },

    /**
     * Obtener usuario actual
     * @returns {Promise} Datos del usuario autenticado
     */
    me: async () => {
      const response = await http.get(API_ENDPOINTS.auth.me);
      return response;
    },

    /**
     * Logout
     * @returns {Promise} Confirmación de logout
     */
    logout: async () => {
      const response = await http.post(API_ENDPOINTS.auth.logout);
      return response;
    },

    /**
     * Refrescar token
     * @returns {Promise} Nuevo token
     */
    refresh: async () => {
      const response = await http.post(API_ENDPOINTS.auth.refresh);
      return response;
    },
  },

  /**
   * Usuarios
   */
  users: {
    /**
     * Obtener datos del usuario con permisos
     * @param {number} userId - ID del usuario
     * @returns {Promise} Usuario y permisos
     */
    getUserWithPermissions: async (userId) => {
      const [userResponse, permissionsResponse] = await Promise.all([
        http.get(API_ENDPOINTS.users.byId(userId)),
        http.get(API_ENDPOINTS.users.permissions(userId)),
      ]);

      return {
        status: 200,
        data: {
          user: userResponse.data,
          permissions: permissionsResponse.data,
        },
      };
    },

    /**
     * Obtener permisos de un usuario
     * @param {number} userId - ID del usuario
     * @returns {Promise} Permisos del usuario
     */
    getPermissions: async (userId) => {
      const response = await http.get(API_ENDPOINTS.users.permissions(userId));
      return response;
    },

    /**
     * Obtener usuario por ID
     * @param {number} userId - ID del usuario
     * @returns {Promise} Datos del usuario
     */
    getById: async (userId) => {
      const response = await http.get(API_ENDPOINTS.users.byId(userId));
      return response;
    },

    /**
     * Actualizar usuario
     * @param {number} userId - ID del usuario
     * @param {object} userData - Datos del usuario
     * @returns {Promise} Usuario actualizado
     */
    update: async (userId, userData) => {
      const response = await http.put(API_ENDPOINTS.users.byId(userId), userData);
      return response;
    },
  },

  /**
   * Módulo de Implementación
   */
  implementacion: {
    /**
     * ALIANZAS
     */
    alianzas: {
      /**
       * Obtener todas las alianzas
       * @param {object} params - Parámetros de filtrado (page, limit, search, etc.)
       * @returns {Promise} Lista de alianzas
       */
      getAll: async (params = {}) => {
        const response = await http.get(API_ENDPOINTS.implementacion.alianzas, { params });
        return response;
      },

      /**
       * Obtener alianza por ID
       * @param {number} id - ID de la alianza
       * @returns {Promise} Datos de la alianza
       */
      getById: async (id) => {
        const response = await http.get(`${API_ENDPOINTS.implementacion.alianzas}/${id}`);
        return response;
      },

      /**
       * Crear nueva alianza
       * @param {object} alianzaData - Datos de la alianza
       * @returns {Promise} Alianza creada
       */
      create: async (alianzaData) => {
        const response = await http.post(API_ENDPOINTS.implementacion.alianzas, alianzaData);
        return response;
      },

      /**
       * Actualizar alianza
       * @param {number} id - ID de la alianza
       * @param {object} alianzaData - Datos actualizados
       * @returns {Promise} Alianza actualizada
       */
      update: async (id, alianzaData) => {
        const response = await http.put(
          `${API_ENDPOINTS.implementacion.alianzas}/${id}`,
          alianzaData
        );
        return response;
      },

      /**
       * Eliminar alianza
       * @param {number} id - ID de la alianza
       * @returns {Promise} Confirmación
       */
      delete: async (id) => {
        const response = await http.delete(`${API_ENDPOINTS.implementacion.alianzas}/${id}`);
        return response;
      },
    },

    /**
     * EMPRESAS
     */
    empresas: {
      getAll: async (params = {}) => {
        const response = await http.get(API_ENDPOINTS.implementacion.empresas, { params });
        return response;
      },
      getById: async (id) => {
        const response = await http.get(`${API_ENDPOINTS.implementacion.empresas}/${id}`);
        return response;
      },
      create: async (data) => {
        const response = await http.post(API_ENDPOINTS.implementacion.empresas, data);
        return response;
      },
      update: async (id, data) => {
        const response = await http.put(`${API_ENDPOINTS.implementacion.empresas}/${id}`, data);
        return response;
      },
      delete: async (id) => {
        const response = await http.delete(`${API_ENDPOINTS.implementacion.empresas}/${id}`);
        return response;
      },
    },

    /**
     * CLIENTES
     */
    clientes: {
      getAll: async (params = {}) => {
        const response = await http.get(API_ENDPOINTS.implementacion.clientes, { params });
        return response;
      },
      getById: async (id) => {
        const response = await http.get(`${API_ENDPOINTS.implementacion.clientes}/${id}`);
        return response;
      },
      create: async (data) => {
        const response = await http.post(API_ENDPOINTS.implementacion.clientes, data);
        return response;
      },
      update: async (id, data) => {
        const response = await http.put(`${API_ENDPOINTS.implementacion.clientes}/${id}`, data);
        return response;
      },
      delete: async (id) => {
        const response = await http.delete(`${API_ENDPOINTS.implementacion.clientes}/${id}`);
        return response;
      },
    },
  },

  /**
   * Módulo de Nóminas
   */
  nominas: {
    /**
     * Obtener nóminas
     * @param {object} params - Parámetros de filtrado
     * @returns {Promise} Lista de nóminas
     */
    getAll: async (params = {}) => {
      const response = await http.get(API_ENDPOINTS.nominas.base, { params });
      return response;
    },

    /**
     * Obtener recibos de nómina
     * @param {object} params - Parámetros de filtrado
     * @returns {Promise} Lista de recibos
     */
    recibos: {
      getAll: async (params = {}) => {
        const response = await http.get(API_ENDPOINTS.nominas.recibos, { params });
        return response;
      },
    },
  },

  /**
   * Módulo IMSS
   */
  imss: {
    /**
     * Obtener datos generales IMSS
     * @param {object} params - Parámetros de filtrado
     * @returns {Promise} Datos IMSS
     */
    getGenerales: async (params = {}) => {
      const response = await http.get(API_ENDPOINTS.imss.generales, { params });
      return response;
    },
  },

  /**
   * Módulo de Facturación
   */
  facturacion: {
    /**
     * Facturas
     */
    facturas: {
      getAll: async (params = {}) => {
        const response = await http.get(API_ENDPOINTS.facturacion.facturas, { params });
        return response;
      },
      getById: async (id) => {
        const response = await http.get(`${API_ENDPOINTS.facturacion.facturas}/${id}`);
        return response;
      },
      create: async (data) => {
        const response = await http.post(API_ENDPOINTS.facturacion.facturas, data);
        return response;
      },
      update: async (id, data) => {
        const response = await http.put(`${API_ENDPOINTS.facturacion.facturas}/${id}`, data);
        return response;
      },
      delete: async (id) => {
        const response = await http.delete(`${API_ENDPOINTS.facturacion.facturas}/${id}`);
        return response;
      },
    },
  },

  /**
   * Módulo de Gastos
   */
  gastos: {
    /**
     * Solicitudes de gastos
     */
    solicitudes: {
      getAll: async (params = {}) => {
        const response = await http.get(API_ENDPOINTS.gastos.solicitudes, { params });
        return response;
      },
    },
  },

  /**
   * Módulo de Utilería
   */
  utileria: {
    /**
     * Bancos
     */
    bancos: {
      getAll: async (params = {}) => {
        const response = await http.get(API_ENDPOINTS.utileria.bancos, { params });
        return response;
      },
    },
  },

  /**
   * Módulo de Soporte
   */
  soporte: {
    /**
     * Tickets
     */
    tickets: {
      getAll: async (params = {}) => {
        const response = await http.get(API_ENDPOINTS.soporte.tickets, { params });
        return response;
      },
      create: async (data) => {
        const response = await http.post(API_ENDPOINTS.soporte.tickets, data);
        return response;
      },
    },
  },
};

export default apiService;
