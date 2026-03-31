import { useState, useEffect, useRef } from "react";
import { dataService } from "../../../../services";
import { getUserIdFromToken, getUserFromStorage, isTokenValid } from "../../../../utils/auth";

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

        // Verificar si el token es válido
        if (!isTokenValid()) {
          setError('Sesión expirada');
          setLoading(false);
          return;
        }

        // Obtener userId del token JWT (más seguro)
        const userId = getUserIdFromToken();
        
        // Si no se pudo obtener del token, intentar del storage
        let userData = getUserFromStorage();
        if (!userId && userData) {
          userData = userData;
        }

        const response = await dataService.users.getUserWithPermissions(userId);

        const userResponse = response.data.user || response.data;
        const permissionsData = response.data.permissions || response.data;

        setUser(userResponse);
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
