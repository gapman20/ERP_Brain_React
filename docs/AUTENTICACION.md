# Documentación del Sistema de Autenticación - Brain ERP

## Tabla de Contenidos

1. [Visión General](#visión-general)
2. [Arquitectura de Autenticación](#arquitectura-de-autenticación)
3. [Componentes del Sistema](#componentes-del-sistema)
4. [Flujo de Autenticación](#flujo-de-autenticación)
5. [Protección de Rutas](#protección-de-rutas)
6. [Gestión de Sesión](#gestión-de-sesión)
7. [Integración con Servicios](#integración-con-servicios)
8. [Personalización](#personalización)

---

## Visión General

Brain ERP implementa un sistema completo de autenticación que incluye:

- ✅ Página de Login funcional
- ✅ Validación de credenciales
- ✅ Protección de rutas privadas
- ✅ Gestión de tokens JWT en localStorage
- ✅ Menú de usuario con logout
- ✅ Redirecciones automáticas
- ✅ URL constante (MemoryRouter)

---

## Arquitectura de Autenticación

### Diagrama de Flujo

```
Usuario → Login Page
           ↓
      Ingresa credenciales
           ↓
      dataService.auth.login()
           ↓
    ¿Credenciales válidas?
      ↙           ↘
    SÍ            NO
     ↓             ↓
Guarda token    Muestra error
     ↓
Redirige a dashboard
     ↓
ProtectedRoute verifica token
     ↓
Acceso a módulos
     ↓
Usuario → Menú Usuario → Logout
                           ↓
                    Limpia localStorage
                           ↓
                    Redirige a Login
```

---

## Componentes del Sistema

### 1. Login.jsx - Página de Inicio de Sesión

**Ubicación:** `src/assets/pages/Login/Login.jsx`

**Propósito:** Página principal de autenticación del sistema.

#### Código Completo

```javascript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Card, CardContent, TextField, Button, Typography,
  Alert, CircularProgress, Container, InputAdornment, IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import BrainLogo from '../../img/circuito.ico';
import { dataService } from '../../../services';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validar campos
      if (!formData.email || !formData.password) {
        setError('Por favor ingresa email y contraseña');
        setLoading(false);
        return;
      }

      // Llamar al servicio de autenticación
      const response = await dataService.auth.login({
        email: formData.email,
        password: formData.password,
      });

      // Guardar token y usuario
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      // Redirigir
      navigate('/implementacion/alianzas');
    } catch (err) {
      setError(err.response?.data?.message || 'Credenciales incorrectas');
    } finally {
      setLoading(false);
    }
  };

  // ... resto del componente con UI
}
```

#### Estados del Componente

| Estado | Tipo | Propósito |
|--------|------|-----------|
| `formData` | object | Almacena email y password |
| `showPassword` | boolean | Controla visibilidad de contraseña |
| `loading` | boolean | Indica si está procesando login |
| `error` | string | Mensaje de error a mostrar |

#### Funciones Principales

**handleChange:**
```javascript
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
  if (error) setError(''); // Limpiar error al escribir
};
```

**handleSubmit:**
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  // 1. Validar campos vacíos
  // 2. Llamar a dataService.auth.login()
  // 3. Guardar token en localStorage
  // 4. Redirigir al dashboard
  // 5. Manejar errores
};
```

#### Características UI

- **Card elevado** con diseño profesional
- **Header azul** con logo y nombre del sistema
- **Formulario validado** con feedback visual
- **Toggle de contraseña** para mostrar/ocultar
- **Loading state** con CircularProgress
- **Mensajes de error** con Alert de MUI
- **Credenciales de desarrollo** visibles en card gris

---

### 2. ProtectedRoute.jsx - Protección de Rutas

**Ubicación:** `src/assets/components/ProtectedRoute.jsx`

**Propósito:** Componente wrapper que protege rutas privadas.

#### Código Completo

```javascript
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  // Verificar si hay token
  const token = localStorage.getItem('authToken');

  // Sin token → redirigir al login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Con token → renderizar hijos
  return children;
}
```

#### ¿Cómo Funciona?

1. **Verifica** si existe `authToken` en localStorage
2. **Si NO hay token:** Redirige a `/login` con `replace` (no agrega al historial)
3. **Si hay token:** Renderiza los componentes hijos (la ruta protegida)

#### Uso

```javascript
// En App.jsx
<Route
  path="/*"
  element={
    <ProtectedRoute>
      <MiniDrawer />
    </ProtectedRoute>
  }
>
  <Route path="implementacion/*" element={<ImplementacionLayout />}>
    <Route path="alianzas" element={<AlianzasPage />} />
  </Route>
</Route>
```

**Resultado:** Todas las rutas dentro de `<ProtectedRoute>` requieren autenticación.

---

### 3. App.jsx - Configuración de Rutas

**Ubicación:** `src/App.jsx`

#### Configuración de Routing con Autenticación

```javascript
import { MemoryRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./assets/pages/Login/Login";
import ProtectedRoute from "./assets/components/ProtectedRoute";

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <AppContext.Provider value={{ /* ... */ }}>
        <Router initialEntries={['/login']} initialIndex={0}>
          <Routes>
            {/* Ruta pública de Login */}
            <Route path="/login" element={<Login />} />

            {/* Redirigir raíz a login */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Rutas protegidas */}
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <MiniDrawer />
                </ProtectedRoute>
              }
            >
              {/* Sub-rutas del sistema */}
            </Route>
          </Routes>
        </Router>
      </AppContext.Provider>
    </ThemeProvider>
  );
}
```

#### Explicación de Rutas

**MemoryRouter:**
```javascript
<Router initialEntries={['/login']} initialIndex={0}>
```
- **initialEntries:** Array de rutas iniciales (empieza en `/login`)
- **initialIndex:** Índice de la ruta actual (0 = primera ruta)
- **Ventaja:** La URL del navegador NO cambia, siempre permanece constante

**Rutas Públicas:**
```javascript
<Route path="/login" element={<Login />} />
<Route path="/" element={<Navigate to="/login" replace />} />
```
- `/login` → Página de Login (accesible sin autenticación)
- `/` → Redirige automáticamente a `/login`

**Rutas Protegidas:**
```javascript
<Route path="/*" element={<ProtectedRoute><MiniDrawer /></ProtectedRoute>}>
  <Route path="implementacion/*" element={<ImplementacionLayout />}>
    <Route path="alianzas" element={<AlianzasPage />} />
  </Route>
</Route>
```
- Todas las rutas que NO sean `/login` están protegidas
- `/*` captura todas las rutas restantes
- ProtectedRoute valida el token antes de renderizar

---

### 4. MiniDrawer.jsx - Menú de Usuario y Logout

**Ubicación:** `src/assets/components/MiniDrawer.jsx`

#### Código Agregado

**Importaciones:**
```javascript
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
```

**Estados:**
```javascript
const [anchorElUser, setAnchorElUser] = useState(null);
const openUserMenu = Boolean(anchorElUser);
const navigate = useNavigate();
```

**Funciones:**
```javascript
const handleOpenUserMenu = (event) => {
  setAnchorElUser(event.currentTarget);
};

const handleCloseUserMenu = () => {
  setAnchorElUser(null);
};

const handleLogout = () => {
  // Limpiar localStorage
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  // Cerrar menú
  handleCloseUserMenu();
  // Redirigir al login
  navigate('/login');
};
```

**UI del Menú:**
```javascript
<IconButton onClick={handleOpenUserMenu}>
  <AccountCircle />
</IconButton>

<Menu anchorEl={anchorElUser} open={openUserMenu} onClose={handleCloseUserMenu}>
  {/* Header con datos del usuario */}
  <Box sx={{ px: 2, py: 1 }}>
    <Typography variant="subtitle2">{user.name}</Typography>
    <Typography variant="caption">{user.email}</Typography>
  </Box>

  {/* Opción de Perfil */}
  <MenuItem onClick={handleCloseUserMenu}>
    <ListItemIcon><PersonIcon /></ListItemIcon>
    Perfil
  </MenuItem>

  <Divider />

  {/* Opción de Logout */}
  <MenuItem onClick={handleLogout}>
    <ListItemIcon><LogoutIcon /></ListItemIcon>
    Cerrar Sesión
  </MenuItem>
</Menu>
```

---

## Flujo de Autenticación

### Paso a Paso Detallado

#### 1. Usuario Abre la Aplicación

```
main.jsx → App.jsx
    ↓
MemoryRouter inicializa en /login
    ↓
Renderiza <Login /> component
```

#### 2. Usuario Ingresa Credenciales

```javascript
// Usuario escribe en los inputs
email: "correo@email"
password: "admin"

// handleChange actualiza formData
setFormData({
  email: "correo@email",
  password: "admin"
});
```

#### 3. Usuario Hace Submit

```javascript
handleSubmit(e) {
  e.preventDefault();
  setLoading(true);

  // Llamar al servicio
  const response = await dataService.auth.login({
    email: formData.email,
    password: formData.password
  });
}
```

#### 4. Servicio Valida Credenciales

```javascript
// En mockService.js
auth: {
  login: async (credentials) => {
    if (credentials.email === 'correo@email' &&
        credentials.password === 'admin') {
      return mockSuccess({
        user: { id: 32, name: "Jose Gabriel...", email: "correo@email" },
        token: "mock-jwt-token-12345"
      });
    }
    return mockError(401, 'Credenciales inválidas');
  }
}
```

#### 5. Guardar Token y Redirigir

```javascript
// Si login exitoso
if (response.data.token) {
  localStorage.setItem('authToken', response.data.token);
  localStorage.setItem('user', JSON.stringify(response.data.user));
}

navigate('/implementacion/alianzas');
```

#### 6. ProtectedRoute Verifica Token

```javascript
// ProtectedRoute.jsx
const token = localStorage.getItem('authToken');

if (!token) {
  return <Navigate to="/login" replace />;
}

// Token existe → renderiza MiniDrawer
return children;
```

#### 7. Usuario Navega por el Sistema

```
Usuario autenticado puede acceder a:
- /implementacion/alianzas
- /implementacion/empresas
- /nominas/*
- /facturacion/*
- Todos los módulos autorizados
```

#### 8. Usuario Cierra Sesión

```javascript
handleLogout() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  navigate('/login');
}
```

---

## Protección de Rutas

### Tipos de Rutas

#### Rutas Públicas
```javascript
// Accesibles sin autenticación
<Route path="/login" element={<Login />} />
```

#### Rutas Protegidas
```javascript
// Requieren token válido
<Route path="/*" element={<ProtectedRoute><MiniDrawer /></ProtectedRoute>}>
  <Route path="implementacion/*" element={<ImplementacionLayout />} />
</Route>
```

### Escenarios de Protección

| Escenario | Token | Acción |
|-----------|-------|--------|
| Usuario en /login | No | ✅ Acceso permitido |
| Usuario en /implementacion | No | ❌ Redirige a /login |
| Usuario en /implementacion | Sí | ✅ Acceso permitido |
| Usuario en / | No | ↩️ Redirige a /login |
| Usuario en / | Sí | ↩️ Redirige a /login |

---

## Gestión de Sesión

### localStorage

**Datos Guardados:**

```javascript
// Token de autenticación
localStorage.setItem('authToken', 'mock-jwt-token-12345');

// Datos del usuario
localStorage.setItem('user', JSON.stringify({
  id: 32,
  name: "Jose Gabriel Alvarez Perez",
  email: "correo@email",
  role: "admin"
}));
```

**Recuperar Datos:**

```javascript
// Obtener token
const token = localStorage.getItem('authToken');

// Obtener usuario
const userStr = localStorage.getItem('user');
const user = JSON.parse(userStr);
```

**Limpiar Sesión:**

```javascript
localStorage.removeItem('authToken');
localStorage.removeItem('user');
```

### Persistencia de Sesión

- ✅ Los datos persisten al cerrar/abrir el navegador
- ✅ Los datos persisten al refrescar la página
- ❌ Los datos NO persisten entre diferentes navegadores
- ❌ Los datos NO persisten en modo incógnito al cerrar

---

## Integración con Servicios

### dataService.auth

**Métodos Disponibles:**

```javascript
// Login
dataService.auth.login({ email, password })
  → Retorna: { user, token }

// Obtener usuario actual
dataService.auth.me()
  → Retorna: { user }

// Logout
dataService.auth.logout()
  → Retorna: { message }

// Refresh token
dataService.auth.refresh()
  → Retorna: { token }
```

### httpClient con Tokens

El `httpClient` agrega automáticamente el token a cada petición:

```javascript
// En httpClient.js
httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

**Resultado:** Todas las peticiones HTTP incluyen el token automáticamente.

---

## Personalización

### Cambiar Credenciales Mock

**Archivo:** `src/services/mockService.js`

```javascript
auth: {
  login: async (credentials) => {
    // Cambiar aquí las credenciales
    if (credentials.email === 'TU_EMAIL' &&
        credentials.password === 'TU_PASSWORD') {
      return mockSuccess({ user, token });
    }
    return mockError(401, 'Credenciales inválidas');
  }
}
```

### Cambiar Ruta de Redirección

**Archivo:** `src/assets/pages/Login/Login.jsx`

```javascript
// Cambiar la ruta después del login
navigate('/TU_RUTA_AQUI');
```

### Agregar Más Opciones al Menú

**Archivo:** `src/assets/components/MiniDrawer.jsx`

```javascript
<Menu>
  {/* Opción existente: Perfil */}
  <MenuItem onClick={handleProfile}>
    <ListItemIcon><PersonIcon /></ListItemIcon>
    Perfil
  </MenuItem>

  {/* NUEVA: Configuración */}
  <MenuItem onClick={handleSettings}>
    <ListItemIcon><SettingsIcon /></ListItemIcon>
    Configuración
  </MenuItem>

  {/* Logout */}
  <MenuItem onClick={handleLogout}>
    <ListItemIcon><LogoutIcon /></ListItemIcon>
    Cerrar Sesión
  </MenuItem>
</Menu>
```

### Cambiar Tiempo de Expiración del Token

**En Producción (API Real):**

Configurar en el backend:

```javascript
// Backend - Ejemplo con Express y JWT
const token = jwt.sign(
  { userId: user.id },
  process.env.JWT_SECRET,
  { expiresIn: '24h' }  // Cambiar aquí
);
```

---

## Mejores Prácticas

### Seguridad

✅ **Hacer:**
- Usar HTTPS en producción
- Tokens con expiración corta
- Refresh tokens para renovar sesión
- Validar tokens en el backend
- Sanitizar inputs del formulario

❌ **Evitar:**
- Guardar contraseñas en localStorage
- Tokens sin expiración
- Confiar solo en validación frontend
- Mostrar mensajes de error detallados en producción

### UX

✅ **Hacer:**
- Mostrar loading states
- Mensajes de error claros
- Auto-focus en campo de email
- Remember me (opcional)
- Redirección automática tras login

❌ **Evitar:**
- Bloquear UI sin feedback
- Errores genéricos
- Formularios sin validación
- Múltiples redirects

---

## Troubleshooting

### Error: "Navigate to /login" en bucle

**Causa:** ProtectedRoute no encuentra el token.

**Solución:**
```javascript
// Verificar en DevTools → Application → Local Storage
localStorage.getItem('authToken'); // ¿null?
```

### Error: Usuario logueado pero redirige a login

**Causa:** Token existe pero es inválido.

**Solución:**
```javascript
// Limpiar localStorage
localStorage.clear();
// Hacer login nuevamente
```

### Error: Datos del usuario no se muestran

**Causa:** user no está guardado en localStorage.

**Solución:**
```javascript
// En Login.jsx, asegurar que se guarde:
localStorage.setItem('user', JSON.stringify(response.data.user));
```

---

## Próximos Pasos

### Funcionalidades Pendientes

1. **Página de Perfil** - Ver/editar datos del usuario
2. **Cambiar Contraseña** - Formulario de cambio de password
3. **Remember Me** - Checkbox para mantener sesión
4. **Recuperar Contraseña** - Flujo de reset password
5. **Registro de Usuarios** - Formulario de sign up
6. **Roles y Permisos** - Granularidad en accesos
7. **Refresh Token** - Renovación automática de sesión
8. **2FA** - Autenticación de dos factores

---

**Última actualización:** Octubre 2025
**Versión:** 1.0.0
