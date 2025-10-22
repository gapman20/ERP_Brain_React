/**
 * Cliente HTTP centralizado usando Axios
 *
 * Este módulo proporciona una instancia configurada de Axios con:
 * - Interceptores de request y response
 * - Manejo automático de tokens de autenticación
 * - Manejo de errores centralizado
 * - Logging en modo debug
 */

import axios from 'axios';
import { API_BASE_URL, API_TIMEOUT, DEFAULT_HEADERS, DEBUG_MODE } from './apiConfig';

/**
 * Instancia de Axios configurada
 */
const httpClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: DEFAULT_HEADERS,
});

/**
 * Interceptor de Request
 * Agrega el token de autenticación a cada petición
 */
httpClient.interceptors.request.use(
  (config) => {
    // Obtener token del localStorage (cuando se implemente autenticación)
    const token = localStorage.getItem('authToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log en modo debug
    if (DEBUG_MODE) {
      console.log('📤 HTTP Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        baseURL: config.baseURL,
        params: config.params,
        data: config.data,
      });
    }

    return config;
  },
  (error) => {
    if (DEBUG_MODE) {
      console.error('❌ Request Error:', error);
    }
    return Promise.reject(error);
  }
);

/**
 * Interceptor de Response
 * Maneja respuestas exitosas y errores de forma centralizada
 */
httpClient.interceptors.response.use(
  (response) => {
    // Log en modo debug
    if (DEBUG_MODE) {
      console.log('📥 HTTP Response:', {
        status: response.status,
        statusText: response.statusText,
        data: response.data,
      });
    }

    return response;
  },
  (error) => {
    // Manejo de errores HTTP
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      const { status, data } = error.response;

      if (DEBUG_MODE) {
        console.error('❌ HTTP Error Response:', {
          status,
          statusText: error.response.statusText,
          data,
          url: error.config?.url,
        });
      }

      // Manejo específico de errores comunes
      switch (status) {
        case 401:
          // Token expirado o inválido
          console.warn('⚠️ Sesión expirada. Redirigiendo al login...');
          localStorage.removeItem('authToken');
          // Aquí podrías redirigir al login
          // window.location.href = '/login';
          break;

        case 403:
          console.warn('⚠️ Acceso denegado. Permisos insuficientes.');
          break;

        case 404:
          console.warn('⚠️ Recurso no encontrado.');
          break;

        case 500:
          console.error('❌ Error del servidor. Intenta más tarde.');
          break;

        default:
          console.error(`❌ Error ${status}: ${data?.message || 'Error desconocido'}`);
      }
    } else if (error.request) {
      // La petición se envió pero no se recibió respuesta
      console.error('❌ No se recibió respuesta del servidor:', error.message);
    } else {
      // Algo sucedió al configurar la petición
      console.error('❌ Error al configurar la petición:', error.message);
    }

    return Promise.reject(error);
  }
);

/**
 * Métodos helper para peticiones HTTP
 */
export const http = {
  /**
   * GET request
   * @param {string} url - URL del endpoint
   * @param {object} config - Configuración adicional de Axios
   * @returns {Promise} Promesa con la respuesta
   */
  get: (url, config = {}) => httpClient.get(url, config),

  /**
   * POST request
   * @param {string} url - URL del endpoint
   * @param {object} data - Datos a enviar
   * @param {object} config - Configuración adicional de Axios
   * @returns {Promise} Promesa con la respuesta
   */
  post: (url, data = {}, config = {}) => httpClient.post(url, data, config),

  /**
   * PUT request
   * @param {string} url - URL del endpoint
   * @param {object} data - Datos a enviar
   * @param {object} config - Configuración adicional de Axios
   * @returns {Promise} Promesa con la respuesta
   */
  put: (url, data = {}, config = {}) => httpClient.put(url, data, config),

  /**
   * PATCH request
   * @param {string} url - URL del endpoint
   * @param {object} data - Datos a enviar
   * @param {object} config - Configuración adicional de Axios
   * @returns {Promise} Promesa con la respuesta
   */
  patch: (url, data = {}, config = {}) => httpClient.patch(url, data, config),

  /**
   * DELETE request
   * @param {string} url - URL del endpoint
   * @param {object} config - Configuración adicional de Axios
   * @returns {Promise} Promesa con la respuesta
   */
  delete: (url, config = {}) => httpClient.delete(url, config),
};

export default httpClient;
