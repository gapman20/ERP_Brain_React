/**
 * Servicio Unificado
 *
 * Este módulo actúa como punto de entrada único para todos los servicios.
 * Automáticamente selecciona entre datos mock (JSON) o API real según la configuración.
 *
 * Uso:
 * import { dataService } from '@/services';
 *
 * // El servicio se adapta automáticamente según VITE_ENABLE_MOCK_DATA
 * const alianzas = await dataService.implementacion.alianzas.getAll();
 */

import { USE_MOCK_DATA, DEBUG_MODE } from './apiConfig';
import mockService from './mockService';
import apiService from './apiService';

/**
 * Servicio de datos que cambia automáticamente entre mock y real
 */
export const dataService = USE_MOCK_DATA ? mockService : apiService;

/**
 * Exportaciones individuales para casos específicos
 */
export { mockService } from './mockService';
export { apiService } from './apiService';
export { http } from './httpClient';
export { API_ENDPOINTS, USE_MOCK_DATA, DEBUG_MODE } from './apiConfig';

// Log del modo activo
if (DEBUG_MODE) {
  console.log(
    USE_MOCK_DATA
      ? '🎭 Modo SIMULACIÓN activado (usando datos mock)'
      : '🌐 Modo PRODUCCIÓN activado (usando API real)'
  );
}

/**
 * Servicio por defecto
 */
export default dataService;
