import { useState, useEffect, useRef } from "react";
import { dataService } from "../../../../services";

/**
 * Hook personalizado para cargar datos de usuario y permisos
 *
 * Automáticamente usa datos mock o API real según la configuración
 * en las variables de entorno (VITE_ENABLE_MOCK_DATA)
 *
 * @returns {Object} - { user, permissions, error, loading }
 */
export const useUserData = () => {
  const [user, setUser] = useState({});
  const [permissions, setPermissions] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchData = async () => {
      try {
        setLoading(true);

        // Usar el servicio unificado que selecciona mock o API real
        const response = await dataService.users.getUserWithPermissions(32);

        // Extraer datos de la respuesta
        const userData = response.data.user || response.data;
        const permissionsData = response.data.permissions || response.data;

        setUser(userData);
        setPermissions(permissionsData);
      } catch (err) {
        console.error("Error al cargar datos del usuario:", err);
        setError(err.message || "Error al cargar datos del usuario");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { user, permissions, error, loading };
};
