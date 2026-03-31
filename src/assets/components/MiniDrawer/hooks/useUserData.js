import { useState, useEffect, useRef } from "react";
import { dataService } from "../../../../services";

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

        let userId = null;
        const token = localStorage.getItem('authToken');
        
        if (token) {
          const savedUser = localStorage.getItem('user');
          if (savedUser) {
            const userData = JSON.parse(savedUser);
            userId = userData.id;
          }
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
