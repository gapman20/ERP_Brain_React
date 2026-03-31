// Utilidades de autenticación y seguridad

export const decodeToken = (token) => {
  try {
    if (!token) return null;
    
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const getUserIdFromToken = () => {
  const token = localStorage.getItem('authToken');
  if (!token) return null;
  
  const decoded = decodeToken(token);
  if (!decoded) return null;
  
  return decoded.userId || decoded.sub || decoded.id || decoded.user?.id;
};

export const getUserFromStorage = () => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error parsing user from storage:', error);
    return null;
  }
};

export const isTokenValid = () => {
  const token = localStorage.getItem('authToken');
  if (!token) return false;
  
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;
  
  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp > currentTime;
};

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

export const clearAuthData = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
};
