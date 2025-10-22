# Documentación Completa del Código - Brain ERP

## Tabla de Contenidos

1. [Visión General](#visión-general)
2. [Arquitectura de la Aplicación](#arquitectura-de-la-aplicación)
3. [Flujo de Datos](#flujo-de-datos)
4. [Componentes Principales](#componentes-principales)
5. [Sistema de Routing](#sistema-de-routing)
6. [Sistema de Servicios](#sistema-de-servicios)
7. [Gestión de Estado](#gestión-de-estado)
8. [Sistema de Temas y Estilos](#sistema-de-temas-y-estilos)
9. [Configuración de Menús](#configuración-de-menús)
10. [Hooks Personalizados](#hooks-personalizados)
11. [Diagramas de Arquitectura](#diagramas-de-arquitectura)

---

## Visión General

Brain ERP es un sistema de planificación de recursos empresariales (ERP) modular desarrollado con tecnologías modernas de frontend.

### Stack Tecnológico

```javascript
{
  "framework": "React 18.2.0",
  "buildTool": "Vite 5.2.0",
  "ui": "Material-UI 7.2.0",
  "routing": "React Router DOM 7.8.2",
  "http": "Axios 1.11.0",
  "styling": "@emotion/react + @emotion/styled",
  "stateManagement": "Context API + Hooks"
}
```

### Características Clave

- **Arquitectura Modular:** 7 módulos independientes (Implementación, Nóminas, IMSS, etc.)
- **Sistema de Permisos:** Control granular basado en roles
- **Drawer Responsive:** Navegación lateral que se adapta al contenido
- **Dual Data Source:** Soporta datos mock (JSON) y API real (MySQL)
- **Tema Personalizado:** Sistema de diseño corporativo consistente

---

## Arquitectura de la Aplicación

### Estructura de Directorios

```
Brain/
├── src/
│   ├── main.jsx                    # Entry point de la aplicación
│   ├── App.jsx                     # Componente raíz con routing
│   ├── index.css                   # Estilos globales
│   │
│   ├── services/                   # Capa de servicios HTTP
│   │   ├── index.js               # Exportación unificada
│   │   ├── apiConfig.js           # Configuración de endpoints
│   │   ├── httpClient.js          # Cliente Axios
│   │   ├── mockService.js         # Datos simulados
│   │   └── apiService.js          # API real
│   │
│   ├── context/                    # Context API para estado global
│   │   └── AppContext.jsx         # Contexto de aplicación
│   │
│   └── assets/
│       ├── components/             # Componentes reutilizables
│       │   ├── MiniDrawer.jsx     # Drawer principal (591 líneas)
│       │   ├── MenuList.jsx       # Lista de menús
│       │   ├── SearchBar.jsx      # Barra de búsqueda
│       │   ├── ButtonUsage.jsx    # Componente de botones
│       │   ├── MiniDrawer/
│       │   │   ├── Drawer.styles.js      # Estilos del drawer
│       │   │   ├── SectionTitle.jsx      # Títulos de sección
│       │   │   ├── menuConfig.jsx        # Configuración de menús
│       │   │   └── hooks/
│       │   │       └── useUserData.js    # Hook de usuario
│       │   └── ejemplos/
│       │       └── EjemploUsoServicio.jsx
│       │
│       ├── pages/                  # Páginas individuales
│       │   ├── Login.jsx
│       │   └── Alianzas/
│       │       └── Alianzas.jsx
│       │
│       ├── views/                  # Layouts de módulos
│       │   ├── implementacion/
│       │   │   ├── Implementacion.jsx
│       │   │   └── ImplementacionDashboard.jsx
│       │   └── FacturacionView.jsx
│       │
│       ├── themes/                 # Sistema de temas
│       │   └── theme.jsx
│       │
│       ├── js/                     # Configuraciones JS
│       │   └── bottonConfig.jsx
│       │
│       ├── css/                    # Estilos adicionales
│       ├── img/                    # Imágenes y recursos
│       └── ...
│
├── public/
│   ├── json/                       # Datos mock
│   │   ├── usuario.json
│   │   ├── permisos.json
│   │   ├── alianzas.json
│   │   ├── nominas.json
│   │   └── facturas.json
│   └── ...
│
├── docs/                           # Documentación
│   ├── SERVICIOS.md
│   └── ARQUITECTURA_CODIGO.md
│
├── .env.example                    # Plantilla de variables
├── .env.development                # Variables de desarrollo
├── .env.production                 # Variables de producción
├── vite.config.js                  # Configuración de Vite
├── package.json                    # Dependencias
└── README.md                       # Documentación principal
```

---

## Flujo de Datos

### 1. Inicialización de la Aplicación

```
index.html
    ↓
main.jsx (ReactDOM.createRoot)
    ↓
App.jsx (Componente raíz)
    ├── ThemeProvider (Tema MUI)
    ├── AppContext.Provider (Estado global)
    └── Router (React Router)
        └── Routes
            └── MiniDrawer (Layout principal)
                └── Outlet (Renderiza sub-rutas)
```

**Código en main.jsx:**
```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

**¿Qué hace?**
- `ReactDOM.createRoot`: API moderna de React 18 para renderizado
- `React.StrictMode`: Modo estricto para detectar problemas en desarrollo
- Monta la app en el elemento `<div id="root">` de index.html

---

### 2. Componente App.jsx (Raíz)

```javascript
import "./App.css";
import { useState } from "react";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import MiniDrawer from "./assets/components/MiniDrawer";
import { ThemeProvider } from "@mui/material/styles";
import customTheme from "./assets/themes/theme";
import AlianzasPage from "./assets/pages/Alianzas/Alianzas";
import ImplementacionLayout from "./assets/views/implementacion/Implementacion.jsx";
import { AppContext } from "./context/AppContext";

function App() {
  // Estado global de la aplicación
  const [currentModule, setCurrentModule] = useState("implementacion");
  const [currentSection, setCurrentSection] = useState("alianzas");

  return (
    <ThemeProvider theme={customTheme}>
      <AppContext.Provider
        value={{
          currentModule,
          setCurrentModule,
          currentSection,
          setCurrentSection,
        }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<MiniDrawer />}>
              <Route path="implementacion/*" element={<ImplementacionLayout />}>
                <Route path="alianzas" element={<AlianzasPage/>}/>
              </Route>
            </Route>
          </Routes>
        </Router>
      </AppContext.Provider>
    </ThemeProvider>
  );
}

export default App;
```

**Análisis detallado:**

#### ThemeProvider
```javascript
<ThemeProvider theme={customTheme}>
```
- **Propósito:** Inyecta el tema personalizado de MUI a toda la aplicación
- **Beneficio:** Todos los componentes MUI heredan colores, tipografía y estilos
- **Tema:** Definido en `src/assets/themes/theme.jsx`

#### AppContext.Provider
```javascript
<AppContext.Provider
  value={{
    currentModule,      // Módulo actual (ej: "implementacion")
    setCurrentModule,   // Función para cambiar módulo
    currentSection,     // Sección actual (ej: "alianzas")
    setCurrentSection,  // Función para cambiar sección
  }}
>
```
- **Propósito:** Proporciona estado global a toda la aplicación
- **Uso:** Cualquier componente hijo puede acceder a estos valores
- **Patrón:** Context API de React

#### MemoryRouter
```javascript
<MemoryRouter as Router>
```
- **Diferencia con BrowserRouter:** No usa la URL del navegador
- **Ventaja:** Ideal para aplicaciones de escritorio o entornos sin navegador
- **Estado:** Mantiene el historial en memoria

#### Estructura de Rutas
```javascript
<Routes>
  <Route path="/" element={<MiniDrawer />}>           {/* Layout principal */}
    <Route path="implementacion/*" element={<ImplementacionLayout />}>  {/* Sub-layout */}
      <Route path="alianzas" element={<AlianzasPage/>}/>  {/* Página final */}
    </Route>
  </Route>
</Routes>
```

**Rutas anidadas:**
- `/` → Renderiza `MiniDrawer` (contiene el drawer lateral)
- `/implementacion/*` → Renderiza `ImplementacionLayout` dentro de MiniDrawer
- `/implementacion/alianzas` → Renderiza `AlianzasPage` dentro de ImplementacionLayout

**Outlet:**
Cada layout usa `<Outlet />` para renderizar sus rutas hijas:
```
MiniDrawer
  └── <Outlet /> → Renderiza ImplementacionLayout
        └── <Outlet /> → Renderiza AlianzasPage
```

---

## Componentes Principales

### 1. MiniDrawer.jsx - Drawer Principal

**Ubicación:** `src/assets/components/MiniDrawer.jsx` (591 líneas)

**Propósito:** Layout principal de la aplicación con navegación lateral expansible.

#### Estructura del Componente

```javascript
export default function MiniDrawer() {
  const theme = useTheme();
  const { user, permissions, error, loading } = useUserData();
  const [open, setOpen] = React.useState(true);
  const [expandedSections, setExpandedSections] = React.useState({
    implementacion: false,
    nominas: false,
    imss: false,
    facturacion: false,
    gastos: false,
    utilerias: false,
    soporte: false,
  });
```

#### Estados Principales

| Estado | Tipo | Propósito |
|--------|------|-----------|
| `open` | boolean | Controla si el drawer está abierto o colapsado |
| `expandedSections` | object | Controla qué secciones del menú están expandidas |
| `user` | object | Datos del usuario autenticado |
| `permissions` | object | Permisos del usuario por módulo |

#### Hooks Utilizados

```javascript
const theme = useTheme();                    // Hook de MUI para acceder al tema
const { user, permissions, error, loading } = useUserData(); // Hook personalizado
const [open, setOpen] = React.useState(true);
```

#### Lógica de Permisos

```javascript
// Cuenta cuántos módulos tiene habilitados el usuario
const enabledSectionCounts = useMemo(() => {
  return Object.keys(permissions).filter((key) => permissions[key] === true).length;
}, [permissions]);

// Lista de secciones habilitadas
const enabledSections = useMemo(() => {
  return Object.keys(permissions).filter((key) => permissions[key] === true);
}, [permissions]);
```

**¿Por qué useMemo?**
- Evita recalcular en cada render
- Optimiza performance cuando hay muchos módulos
- Solo recalcula si `permissions` cambia

#### Auto-expansión de Secciones

```javascript
React.useEffect(() => {
  setExpandedSections((prev) => {
    const newState = {};
    Object.keys(prev).forEach((key) => {
      if (enabledSectionCounts <= 2 && permissions[key]) {
        // Si tiene 2 o menos módulos, expandir todos
        newState[key] = true;
      } else {
        if (open) {
          // Drawer abierto: expandir solo módulos con permiso
          newState[key] = permissions[key];
        } else {
          // Drawer cerrado: expandir solo los primeros 2
          const firstTwoSections = enabledSections.slice(0, 2);
          newState[key] = firstTwoSections.includes(key);
        }
      }
    });
    return newState;
  });
}, [open, permissions, enabledSectionCounts, enabledSections]);
```

**Lógica:**
1. Si el usuario tiene ≤2 módulos → Expandir todos
2. Si drawer abierto → Expandir módulos con permiso
3. Si drawer cerrado → Expandir solo los primeros 2

#### Callbacks Optimizados

```javascript
// Toggle de sección con verificación de permisos
const toggleSection = useCallback((section) => {
  if (permissions[section] !== true) {
    return; // No permitir expandir si no tiene permiso
  }
  setExpandedSections((prev) => ({
    ...prev,
    [section]: !prev[section],
  }));
}, [permissions]);

// Toggle del drawer
const toggleDrawer = useCallback(() => {
  setOpen(!open);
}, [open]);
```

**¿Por qué useCallback?**
- Evita recrear funciones en cada render
- Previene re-renders innecesarios de componentes hijos
- Mejora performance en listas grandes

#### Estado de Carga

```javascript
if (loading) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <Typography>Cargando...</Typography>
    </Box>
  );
}
```

#### Estructura Visual del Drawer

```
┌─────────────────────────────────────────┐
│  AppBar (Barra superior)                │
│  [☰] Brain ERP    [🔔] [👤] [...]      │
├─────────────────────────────────────────┤
│ Drawer (Lateral)  │  Contenido         │
│                   │                     │
│ ▼ IMPLEMENTACIÓN  │  <Outlet />        │
│   • Alianzas      │                     │
│   • Empresas      │  (Aquí se renderizan│
│   • Clientes      │   las sub-rutas)   │
│                   │                     │
│ ▼ NÓMINAS         │                     │
│   • Nóminas       │                     │
│   • Recibos       │                     │
│                   │                     │
│ (Solo secciones   │                     │
│  con permiso)     │                     │
└───────────────────┴─────────────────────┘
```

#### AppBar (Barra Superior)

```javascript
<AppBar position="fixed" open={open}>
  <Toolbar>
    <IconButton onClick={toggleDrawer}>
      {open ? <MenuOpenIcon /> : <MenuIcon />}
    </IconButton>

    <Box component="img" src={BrainLogo} sx={{ width: 30, height: 30 }} />
    <Typography variant="h6">Brain ERP</Typography>

    {/* Iconos de la derecha */}
    <Box sx={{ display: "flex", gap: 1, ml: "auto" }}>
      <IconButton color="inherit">
        <NotificationsIcon />
      </IconButton>
      <IconButton color="inherit">
        <AccountCircle />
      </IconButton>
      <IconButton color="inherit">
        <HelpIcon />
      </IconButton>
      <IconButton color="inherit">
        <MoreVertIcon />
      </IconButton>
    </Box>
  </Toolbar>
</AppBar>
```

#### Renderizado de Secciones del Menú

```javascript
{permissions.implementacion && (
  <>
    <SectionTitle
      title="IMPLEMENTACIÓN"
      expanded={expandedSections.implementacion}
      onClick={() => toggleSection("implementacion")}
    />
    <Grow in={expandedSections.implementacion}>
      <Box>
        <MenuList items={menuImplementacion} />
      </Box>
    </Grow>
  </>
)}
```

**Componentes usados:**
- `SectionTitle`: Título expandible de la sección
- `Grow`: Animación de Material-UI para aparecer/desaparecer
- `MenuList`: Lista de opciones del menú

#### Área de Contenido Principal

```javascript
<Box component="main" sx={styles.mainContent(open)}>
  <DrawerHeader /> {/* Espaciador para la AppBar */}
  <Outlet />       {/* Renderiza las sub-rutas */}
</Box>
```

**Outlet:**
- Componente de React Router
- Renderiza el componente de la ruta activa
- Ej: Si la URL es `/implementacion/alianzas`, renderiza `AlianzasPage`

---

### 2. ImplementacionLayout.jsx - Layout de Módulo

**Ubicación:** `src/assets/views/implementacion/Implementacion.jsx`

**Propósito:** Layout específico para el módulo de Implementación.

```javascript
const ImplementacionLayout = () => {
  const location = useLocation();
  const currentSection = location.pathname.split("/").pop(); // Ej: "alianzas"
  const currentButtons = buttonConfig[currentSection] || [];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "90%" }}>
      {/* Header del módulo */}
      <Box sx={{ position: "sticky", top: 0, zIndex: 1100, bgcolor: "primary.light" }}>
        <Container maxWidth="xl">
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <WidgetsIcon sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="h4">Implementación</Typography>
                <Typography variant="subtitle1">
                  Gestión de alianzas, empresas y clientes
                </Typography>
              </Box>
            </Box>

            {/* Botones de acción dinámicos */}
            <Stack direction="row" spacing={2}>
              {currentButtons.map((button) => {
                const { label, ...buttonProps } = button;
                return (
                  <Button key={label} {...buttonProps}>
                    {label}
                  </Button>
                );
              })}
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Contenido scrollable */}
      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        <Container maxWidth="xl" sx={{ py: 3 }}>
          <Outlet /> {/* Renderiza la página específica */}
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ position: "fixed", bottom: 0, left: 0, right: 0, bgcolor: "grey.100" }}>
        <Container maxWidth="xl">
          <Typography variant="body2" color="textSecondary" align="center">
            Módulo de Implementación - Brain ERP
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};
```

**Características:**
- **Header sticky:** Permanece visible al hacer scroll
- **Botones dinámicos:** Cambian según la sección actual
- **Footer fijo:** Siempre visible en la parte inferior
- **Responsive:** Usa Container de MUI con maxWidth

---

### 3. AlianzasPage.jsx - Página Individual

**Ubicación:** `src/assets/pages/Alianzas/Alianzas.jsx`

```javascript
const AlianzasPage = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Alianzas
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Lista de Alianzas
        </Typography>
        <Button variant="contained" sx={{ mt: 2 }}>
          Nueva Alianza
        </Button>
      </Paper>
    </Box>
  );
};
```

**Estructura típica de una página:**
1. Título principal
2. Paper/Card con contenido
3. Botones de acción
4. (Futuro) Tabla o grid con datos

---

## Sistema de Routing

### Configuración de Rutas

```javascript
// App.jsx
<Router>
  <Routes>
    <Route path="/" element={<MiniDrawer />}>
      <Route path="implementacion/*" element={<ImplementacionLayout />}>
        <Route path="alianzas" element={<AlianzasPage/>}/>
        {/* Futuras rutas */}
        <Route path="empresas" element={<EmpresasPage/>}/>
        <Route path="clientes" element={<ClientesPage/>}/>
      </Route>
      {/* Futuros módulos */}
      <Route path="nominas/*" element={<NominasLayout />}>
        {/* ... */}
      </Route>
    </Route>
  </Routes>
</Router>
```

### Navegación entre Rutas

```javascript
import { useNavigate } from 'react-router-dom';

const MiComponente = () => {
  const navigate = useNavigate();

  const irAAlianzas = () => {
    navigate('/implementacion/alianzas');
  };

  return <Button onClick={irAAlianzas}>Ir a Alianzas</Button>;
};
```

### Obtener Información de la Ruta Actual

```javascript
import { useLocation } from 'react-router-dom';

const MiComponente = () => {
  const location = useLocation();

  console.log(location.pathname);  // "/implementacion/alianzas"
  const currentSection = location.pathname.split("/").pop(); // "alianzas"
};
```

---

## Sistema de Servicios

### Arquitectura de Servicios

```
Componente
    ↓
dataService (index.js)
    ↓
VITE_ENABLE_MOCK_DATA === "true" ?
    ├─ SÍ  → mockService.js → /public/json/*.json
    └─ NO  → apiService.js → httpClient.js → Backend MySQL
```

### apiConfig.js - Configuración

```javascript
export const USE_MOCK_DATA = import.meta.env.VITE_ENABLE_MOCK_DATA === 'true';
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
export const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000;

export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    me: '/auth/me',
  },
  implementacion: {
    alianzas: '/implementacion/alianzas',
    empresas: '/implementacion/empresas',
    // ...
  },
  // ...
};
```

**Variables de entorno (Vite):**
- Prefijo `VITE_`: Requerido para que Vite las exponga al cliente
- `import.meta.env`: API de Vite para acceder a variables

### httpClient.js - Cliente Axios

```javascript
import axios from 'axios';
import { API_BASE_URL, API_TIMEOUT, DEFAULT_HEADERS } from './apiConfig';

const httpClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: DEFAULT_HEADERS,
});

// Interceptor de Request
httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de Response
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      // Redirigir al login
    }
    return Promise.reject(error);
  }
);
```

**Interceptores:**
- **Request:** Agregan token JWT automáticamente
- **Response:** Manejan errores globalmente (401, 403, 500, etc.)

### mockService.js - Datos Simulados

```javascript
const mockSuccess = async (data, delayMs = 500) => {
  await delay(delayMs); // Simula latencia de red
  return {
    status: 200,
    data,
  };
};

export const mockService = {
  users: {
    getUserWithPermissions: async (userId) => {
      const [userResponse, permissionsResponse] = await Promise.all([
        fetch('/json/usuario.json'),
        fetch('/json/permisos.json'),
      ]);
      const userData = await userResponse.json();
      const permissionsData = await permissionsResponse.json();
      return mockSuccess({ ...userData, ...permissionsData });
    },
  },
  implementacion: {
    getAlianzas: async () => {
      const response = await fetch('/json/alianzas.json');
      const data = await response.json();
      return mockSuccess(data);
    },
    // ...
  },
};
```

### apiService.js - API Real

```javascript
import { http } from './httpClient';
import { API_ENDPOINTS } from './apiConfig';

export const apiService = {
  implementacion: {
    alianzas: {
      getAll: async (params = {}) => {
        const response = await http.get(API_ENDPOINTS.implementacion.alianzas, { params });
        return response;
      },
      create: async (alianzaData) => {
        const response = await http.post(API_ENDPOINTS.implementacion.alianzas, alianzaData);
        return response;
      },
      update: async (id, alianzaData) => {
        const response = await http.put(
          `${API_ENDPOINTS.implementacion.alianzas}/${id}`,
          alianzaData
        );
        return response;
      },
      delete: async (id) => {
        const response = await http.delete(`${API_ENDPOINTS.implementacion.alianzas}/${id}`);
        return response;
      },
    },
  },
};
```

### index.js - Servicio Unificado

```javascript
import { USE_MOCK_DATA } from './apiConfig';
import mockService from './mockService';
import apiService from './apiService';

// Selección automática según variable de entorno
export const dataService = USE_MOCK_DATA ? mockService : apiService;

export default dataService;
```

**Ventaja:** El código de componentes es idéntico sin importar la fuente de datos.

---

## Gestión de Estado

### Context API

**Definición del Contexto:**

```javascript
// src/context/AppContext.jsx
import { createContext } from "react";
export const AppContext = createContext();
```

**Proveedor en App.jsx:**

```javascript
function App() {
  const [currentModule, setCurrentModule] = useState("implementacion");
  const [currentSection, setCurrentSection] = useState("alianzas");

  return (
    <AppContext.Provider
      value={{
        currentModule,
        setCurrentModule,
        currentSection,
        setCurrentSection,
      }}
    >
      {/* Resto de la app */}
    </AppContext.Provider>
  );
}
```

**Consumir el Contexto:**

```javascript
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const MiComponente = () => {
  const { currentModule, setCurrentModule } = useContext(AppContext);

  const cambiarModulo = () => {
    setCurrentModule("nominas");
  };

  return (
    <div>
      Módulo actual: {currentModule}
      <button onClick={cambiarModulo}>Cambiar a Nóminas</button>
    </div>
  );
};
```

**Estado Global Disponible:**
- `currentModule`: Módulo activo ("implementacion", "nominas", etc.)
- `currentSection`: Sección activa ("alianzas", "empresas", etc.)
- `setCurrentModule`: Función para cambiar módulo
- `setCurrentSection`: Función para cambiar sección

---

## Sistema de Temas y Estilos

### theme.jsx - Tema Personalizado

```javascript
import { createTheme } from "@mui/material/styles";
import "@fontsource/inter/300.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#1E7FE3",      // Azul corporativo
      light: "#5DABFF",     // Azul claro
      dark: "#0057B0",      // Azul oscuro
      contrastText: "#FFFFFF",
    },
    customGrey: {
      main: "#D9DEDE",
    },
    background: {
      default: "#E9F5FE",   // Fondo general
      paper: "#FFFFFF",     // Fondo de cards/papers
      grey: "#D9DEDE",
      login: "#F3F9FF",
      icono: "#E9F5FE",
    },
  },
  typography: {
    fontFamily: `'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
    fontSize: 14,
    h1: {
      fontSize: "2.5rem",
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // Botones sin MAYÚSCULAS
        },
      },
    },
  },
});

export default customTheme;
```

**Aplicación del Tema:**

```javascript
// App.jsx
import { ThemeProvider } from "@mui/material/styles";
import customTheme from "./assets/themes/theme";

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      {/* Toda la app */}
    </ThemeProvider>
  );
}
```

**Uso en Componentes:**

```javascript
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

const MiComponente = () => {
  const theme = useTheme();

  return (
    <Box sx={{
      bgcolor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      p: 2
    }}>
      Contenido con colores del tema
    </Box>
  );
};
```

### Drawer.styles.js - Estilos del Drawer

```javascript
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";

const drawerWidth = 280;

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  }),
  ...(!open && {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
  }),
}));
```

**Emotion (styled):**
- Sistema de CSS-in-JS de Material-UI
- Permite estilos dinámicos basados en props
- Acceso al tema en los estilos

---

## Configuración de Menús

### menuConfig.jsx

```javascript
import HandshakeIcon from "@mui/icons-material/Handshake";
import BusinessIcon from "@mui/icons-material/Business";
// ... más iconos

export const menuImplementacion = [
  { text: "Alianzas", icon: <HandshakeIcon />, permissions: "alianzas" },
  { text: "Empresas", icon: <BusinessIcon />, permissions: "empresas" },
  { text: "Clientes", icon: <PersonIcon />, permissions: "clientes" },
  { text: "Remunerados", icon: <PeopleIcon />, permissions: "remunerados" },
  { text: "Layouts", icon: <FilePresentIcon />, permissions: "layouts" },
  { text: "Contratos", icon: <DescriptionIcon />, permissions: "contratos" },
];

export const menuNominas = [
  { text: "Nominas", icon: <PaymentsIcon />, permissions: "nominas" },
  { text: "Recibos", icon: <PictureAsPdfIcon />, permissions: "recibidos" },
  { text: "Reportes", icon: <LeaderboardIcon />, permissions: "reportes" },
  // ...
];

// ... más módulos
```

**Estructura de cada item:**
- `text`: Texto visible en el menú
- `icon`: Componente de icono de Material-UI
- `permissions`: Clave de permiso en el objeto `permissions`

**Uso en MiniDrawer:**

```javascript
import { menuImplementacion, menuNominas, /* ... */ } from "./MiniDrawer/menuConfig.jsx";

// En el render:
{permissions.implementacion && (
  <>
    <SectionTitle title="IMPLEMENTACIÓN" />
    <MenuList items={menuImplementacion} />
  </>
)}
```

### MenuList.jsx

```javascript
// Componente simplificado
const MenuList = ({ items }) => {
  return (
    <List>
      {items.map((item) => (
        <ListItem key={item.text} button>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  );
};
```

---

## Hooks Personalizados

### useUserData.js

**Ubicación:** `src/assets/components/MiniDrawer/hooks/useUserData.js`

```javascript
import { useState, useEffect, useRef } from "react";
import { dataService } from "../../../../services";

export const useUserData = () => {
  const [user, setUser] = useState({});
  const [permissions, setPermissions] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);

  useEffect(() => {
    // Prevenir doble carga en desarrollo (React.StrictMode)
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchData = async () => {
      try {
        setLoading(true);

        // Usar servicio unificado (mock o API real)
        const response = await dataService.users.getUserWithPermissions(32);

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
```

**Características:**
- **useRef:** Previene doble fetch en desarrollo (StrictMode)
- **Estados múltiples:** loading, error, user, permissions
- **Servicio unificado:** Usa `dataService` que cambia automáticamente
- **Manejo de errores:** Captura y expone errores

**Uso:**

```javascript
import { useUserData } from './hooks/useUserData';

const MiComponente = () => {
  const { user, permissions, error, loading } = useUserData();

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Hola, {user.name}</h1>
      {permissions.implementacion && <p>Tienes acceso a Implementación</p>}
    </div>
  );
};
```

---

## Diagramas de Arquitectura

### Flujo de Autenticación y Carga de Datos

```
Usuario abre la app
    ↓
main.jsx → App.jsx
    ↓
MiniDrawer se monta
    ↓
useUserData() hook se ejecuta
    ↓
dataService.users.getUserWithPermissions(32)
    ↓
¿VITE_ENABLE_MOCK_DATA === "true"?
    ├─ SÍ  → mockService.users.getUserWithPermissions()
    │           ↓
    │       fetch('/json/usuario.json')
    │       fetch('/json/permisos.json')
    │           ↓
    │       Combina datos
    │           ↓
    │       Retorna { user, permissions }
    │
    └─ NO  → apiService.users.getUserWithPermissions()
                ↓
            httpClient.get('/users/32')
            httpClient.get('/users/32/permissions')
                ↓
            Interceptor agrega token
                ↓
            Backend MySQL
                ↓
            Retorna { user, permissions }
    ↓
MiniDrawer recibe { user, permissions, loading, error }
    ↓
Si loading === false:
    - Renderiza AppBar
    - Renderiza Drawer con menús según permissions
    - Renderiza <Outlet /> con contenido
```

### Flujo de Navegación

```
Usuario hace clic en "Alianzas"
    ↓
MenuList.jsx dispara navegación
    ↓
navigate('/implementacion/alianzas')
    ↓
React Router actualiza:
    - location.pathname = "/implementacion/alianzas"
    ↓
Renderiza jerarquía de rutas:
    MiniDrawer
        ↓
    <Outlet /> → ImplementacionLayout
                    ↓
                <Outlet /> → AlianzasPage
    ↓
ImplementacionLayout lee location.pathname
    ↓
Extrae "alianzas" → Busca botones en buttonConfig["alianzas"]
    ↓
Renderiza header con botones específicos
    ↓
AlianzasPage se renderiza en el <Outlet />
```

### Flujo de Datos CRUD

```
Usuario hace clic en "Nueva Alianza"
    ↓
Componente llama a dataService.implementacion.createAlianza(data)
    ↓
¿VITE_ENABLE_MOCK_DATA === "true"?
    ├─ SÍ  → mockService.implementacion.createAlianza()
    │           ↓
    │       Simula delay (500ms)
    │           ↓
    │       Retorna { id: Date.now(), ...data }
    │
    └─ NO  → apiService.implementacion.alianzas.create()
                ↓
            httpClient.post('/implementacion/alianzas', data)
                ↓
            Interceptor agrega token
                ↓
            Backend MySQL inserta registro
                ↓
            Retorna { id, ...data }
    ↓
Componente recibe respuesta
    ↓
Actualiza estado local o recarga datos
    ↓
UI se actualiza con nueva alianza
```

---

## Mejores Prácticas del Código

### 1. Optimización con useMemo y useCallback

```javascript
// ❌ MAL: Recalcula en cada render
const enabledSections = Object.keys(permissions).filter(k => permissions[k]);

// ✅ BIEN: Solo recalcula si permissions cambia
const enabledSections = useMemo(() => {
  return Object.keys(permissions).filter(k => permissions[k] === true);
}, [permissions]);
```

### 2. Prevenir Re-renders con useCallback

```javascript
// ❌ MAL: Crea nueva función en cada render
const toggleSection = (section) => {
  setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
};

// ✅ BIEN: Reutiliza función si dependencies no cambian
const toggleSection = useCallback((section) => {
  setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
}, []);
```

### 3. Prevenir Doble Fetch en StrictMode

```javascript
// ❌ MAL: Se ejecuta dos veces en desarrollo
useEffect(() => {
  fetchData();
}, []);

// ✅ BIEN: Usa ref para ejecutar solo una vez
const hasFetched = useRef(false);
useEffect(() => {
  if (hasFetched.current) return;
  hasFetched.current = true;
  fetchData();
}, []);
```

### 4. Manejo Consistente de Errores

```javascript
// ✅ BIEN
try {
  const response = await dataService.getAlianzas();
  setData(response.data);
} catch (err) {
  console.error("Error:", err);
  setError(err.message);
} finally {
  setLoading(false);
}
```

### 5. Styled Components con Emotion

```javascript
// ✅ BIEN: Componentes reutilizables con estilos dinámicos
export const AppBar = styled(MuiAppBar)(({ theme, open }) => ({
  transition: theme.transitions.create(['width', 'margin']),
  ...(open && {
    marginLeft: drawerWidth,
  }),
}));
```

---

## Convenciones de Código

### Nomenclatura

- **Componentes:** PascalCase (`MiniDrawer.jsx`, `AlianzasPage.jsx`)
- **Hooks:** camelCase con prefijo `use` (`useUserData.js`)
- **Constantes:** UPPER_SNAKE_CASE (`API_BASE_URL`, `DRAWER_WIDTH`)
- **Variables:** camelCase (`currentModule`, `expandedSections`)

### Estructura de Archivos

```javascript
// 1. Imports externos
import React from 'react';
import { Box, Typography } from '@mui/material';

// 2. Imports internos
import { useUserData } from './hooks/useUserData';
import { dataService } from '@services';

// 3. Constantes
const DRAWER_WIDTH = 280;

// 4. Componente principal
const MiComponente = () => {
  // Estados
  const [state, setState] = useState();

  // Hooks
  const { user } = useUserData();

  // Efectos
  useEffect(() => {}, []);

  // Handlers
  const handleClick = () => {};

  // Render
  return <div>...</div>;
};

// 5. Export
export default MiComponente;
```

---

## Próximos Pasos de Desarrollo

### 1. Completar Páginas de Módulos

```javascript
// Crear páginas para:
- EmpresasPage.jsx
- ClientesPage.jsx
- RemuneradosPage.jsx
// ... etc
```

### 2. Implementar CRUD Completo

```javascript
// En cada página:
- Tabla con datos
- Formulario de creación
- Formulario de edición
- Confirmación de eliminación
- Paginación
- Búsqueda y filtros
```

### 3. Integrar Backend MySQL

```javascript
// 1. Crear API REST con Express
// 2. Cambiar VITE_ENABLE_MOCK_DATA=false
// 3. Probar endpoints
```

### 4. Agregar Autenticación Real

```javascript
// 1. Página de Login
// 2. JWT tokens
// 3. Refresh tokens
// 4. Protected routes
```

### 5. Testing

```javascript
// 1. Unit tests (Vitest)
// 2. Component tests (React Testing Library)
// 3. E2E tests (Playwright)
```

---

## Recursos Adicionales

- [React Docs](https://react.dev)
- [Material-UI Docs](https://mui.com)
- [React Router Docs](https://reactrouter.com)
- [Axios Docs](https://axios-http.com)
- [Vite Docs](https://vitejs.dev)

---

**Última actualización:** Octubre 2025
**Versión:** 1.0.0
