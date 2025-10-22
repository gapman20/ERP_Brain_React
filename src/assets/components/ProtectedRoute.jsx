import { Navigate } from 'react-router-dom';

/**
 * Componente ProtectedRoute
 *
 * Protege rutas que requieren autenticación. Si el usuario no está
 * autenticado (no tiene token), redirige al login.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Componentes hijos a renderizar si está autenticado
 * @returns {React.ReactNode}
 */
export default function ProtectedRoute({ children }) {
  // Verificar si hay token en localStorage
  const token = localStorage.getItem('authToken');

  // Si no hay token, redirigir al login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si hay token, renderizar los hijos (la ruta protegida)
  return children;
}
