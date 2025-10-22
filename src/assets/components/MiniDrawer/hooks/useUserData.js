import { useState, useEffect, useRef } from "react";

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

        // Fetch user data
        const userResponse = await fetch("/json/usuario.json");
        if (!userResponse.ok) throw new Error("Error loading user data");
        const userData = (await userResponse.json()).user;

        // Fetch permissions data
        const permissionsResponse = await fetch("/json/permisos.json");
        if (!permissionsResponse.ok)
          throw new Error("Error loading permissions data");
        const permissionsData = (await permissionsResponse.json()).permissions;

        setUser(userData);
        setPermissions(permissionsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { user, permissions, error, loading };
};
