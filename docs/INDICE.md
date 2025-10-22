# Índice de Documentación - Brain ERP

Esta es la guía completa de navegación por toda la documentación del proyecto Brain ERP.

---

## Documentos Principales

### 📘 [README.md](../README.md)
**Propósito:** Guía de inicio rápido del proyecto

**Contenido:**
- Características del proyecto
- Arquitectura de servicios
- Inicio rápido (instalación, desarrollo, build)
- Datos mock disponibles
- Integración con MySQL
- Variables de entorno
- Scripts disponibles

**Para quién:** Desarrolladores que necesitan una vista rápida del proyecto

---

### 🏗️ [ARQUITECTURA_CODIGO.md](ARQUITECTURA_CODIGO.md)
**Propósito:** Explicación detallada de TODO el código del proyecto

**Contenido:**
- Visión general del stack tecnológico
- Arquitectura completa de la aplicación
- Flujo de datos detallado
- Explicación línea por línea de componentes principales
- Sistema de routing
- Sistema de servicios
- Gestión de estado con Context API
- Sistema de temas y estilos
- Configuración de menús
- Hooks personalizados
- Diagramas de flujo
- Mejores prácticas

**Para quién:** Desarrolladores que necesitan entender profundamente cómo funciona el código

---

### 🔌 [SERVICIOS.md](SERVICIOS.md)
**Propósito:** Guía completa de uso de servicios y API

**Contenido:**
- Arquitectura de servicios
- Configuración de variables de entorno
- Modo simulación vs producción
- Uso básico de servicios
- Ejemplos por módulo (Implementación, Nóminas, Facturación, etc.)
- Guía de integración con MySQL
- Troubleshooting
- Mejores prácticas

**Para quién:** Desarrolladores que trabajan con datos y API

---

### 🔐 [AUTENTICACION.md](AUTENTICACION.md)
**Propósito:** Documentación completa del sistema de autenticación

**Contenido:**
- Arquitectura de autenticación
- Componentes del sistema (Login, ProtectedRoute)
- Flujo de autenticación paso a paso
- Protección de rutas
- Gestión de sesión con localStorage
- Integración con servicios
- Menú de usuario y logout
- Personalización y mejores prácticas
- Troubleshooting

**Para quién:** Desarrolladores que trabajan con autenticación y seguridad

---

### 📋 [CAMBIOS_SERVICIOS.md](../CAMBIOS_SERVICIOS.md)
**Propósito:** Resumen de los cambios realizados en la implementación de servicios

**Contenido:**
- Archivos creados (servicios, datos mock, documentación)
- Archivos modificados (useUserData, vite.config)
- Configuración de variables de entorno
- Estructura de directorios actualizada
- Cómo usar los servicios
- Ejemplos de uso
- Endpoints preparados
- Ventajas de la arquitectura

**Para quién:** Desarrolladores que quieren entender qué se implementó y por qué

---

## Guías Rápidas por Tarea

### ¿Quiero empezar a desarrollar?
👉 Lee primero: [README.md](../README.md)
- Sección "Inicio Rápido"
- Instala dependencias: `npm install`
- Corre el proyecto: `npm run dev`

---

### ¿Necesito entender cómo funciona el código?
👉 Lee: [ARQUITECTURA_CODIGO.md](ARQUITECTURA_CODIGO.md)
- Ve directo a la sección "Componentes Principales"
- Estudia los diagramas de flujo
- Revisa el código con las explicaciones

---

### ¿Quiero trabajar con datos y API?
👉 Lee: [SERVICIOS.md](SERVICIOS.md)
- Sección "Uso Básico"
- Ejemplos por módulo
- Cómo cambiar entre mock y API real

---

### ¿Necesito agregar un nuevo módulo?
👉 Sigue estos pasos:

1. **Lee:** [ARQUITECTURA_CODIGO.md](ARQUITECTURA_CODIGO.md) - Sección "Sistema de Routing"
2. **Revisa:** `src/assets/components/MiniDrawer/menuConfig.jsx` - Para ver cómo se configuran los menús
3. **Copia:** La estructura de `ImplementacionLayout.jsx` para tu nuevo módulo
4. **Agrega:** Las rutas en `App.jsx`
5. **Configura:** Los permisos en `public/json/permisos.json`

---

### ¿Necesito agregar un endpoint de API?
👉 Sigue estos pasos:

1. **Lee:** [SERVICIOS.md](SERVICIOS.md) - Sección "Integración con MySQL"
2. **Agrega el endpoint en:** `src/services/apiConfig.js` - En `API_ENDPOINTS`
3. **Implementa en mockService:** `src/services/mockService.js` - Para desarrollo
4. **Implementa en apiService:** `src/services/apiService.js` - Para producción
5. **Crea datos mock (opcional):** `public/json/tu-modulo.json`

---

### ¿Necesito crear una nueva página?
👉 Sigue estos pasos:

1. **Crea el archivo:** `src/assets/pages/TuModulo/TuPagina.jsx`
2. **Usa como base:** `src/assets/pages/Alianzas/Alianzas.jsx`
3. **Agrega la ruta en:** `App.jsx`
4. **Usa servicios:** Importa `dataService` de `@services`

Ejemplo:
```javascript
import { Box, Typography, Paper } from '@mui/material';
import { useState, useEffect } from 'react';
import { dataService } from '@services';

const TuPagina = () => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      const response = await dataService.tuModulo.getTodos();
      setDatos(response.data);
    };
    cargarDatos();
  }, []);

  return (
    <Box>
      <Typography variant="h4">Tu Página</Typography>
      <Paper sx={{ p: 3 }}>
        {/* Tu contenido */}
      </Paper>
    </Box>
  );
};

export default TuPagina;
```

---

### ¿Necesito modificar el tema (colores, fuentes)?
👉 Lee: [ARQUITECTURA_CODIGO.md](ARQUITECTURA_CODIGO.md) - Sección "Sistema de Temas y Estilos"

**Archivo a modificar:** `src/assets/themes/theme.jsx`

Ejemplo de cambio de color primario:
```javascript
palette: {
  primary: {
    main: "#TU_COLOR_AQUI", // Cambia el color principal
  },
}
```

---

### ¿Necesito agregar un hook personalizado?
👉 Lee: [ARQUITECTURA_CODIGO.md](ARQUITECTURA_CODIGO.md) - Sección "Hooks Personalizados"

**Ejemplo:** `src/assets/components/MiniDrawer/hooks/useUserData.js`

Crea tu hook:
```javascript
// src/hooks/useTuHook.js
import { useState, useEffect } from 'react';
import { dataService } from '@services';

export const useTuHook = () => {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const response = await dataService.tuModulo.getTodos();
      setDatos(response.data);
      setLoading(false);
    };
    fetch();
  }, []);

  return { datos, loading };
};
```

---

### ¿Tengo errores con los servicios?
👉 Lee: [SERVICIOS.md](SERVICIOS.md) - Sección "Troubleshooting"

**Errores comunes:**
- Network Error → Verifica CORS en el backend
- 401 Unauthorized → Token inválido o expirado
- "Cannot read property 'data'" → Verifica formato de respuesta

---

## Estructura de la Documentación

```
Brain/
├── README.md                       # 📘 Guía de inicio rápido
├── CAMBIOS_SERVICIOS.md           # 📋 Resumen de cambios
│
├── docs/
│   ├── INDICE.md                  # 📑 Este documento
│   ├── ARQUITECTURA_CODIGO.md     # 🏗️ Explicación del código
│   └── SERVICIOS.md               # 🔌 Guía de servicios y API
│
├── src/
│   ├── services/                  # Código de servicios
│   │   ├── index.js              # Ver SERVICIOS.md
│   │   ├── apiConfig.js          # Ver SERVICIOS.md
│   │   ├── httpClient.js         # Ver ARQUITECTURA_CODIGO.md
│   │   ├── mockService.js        # Ver SERVICIOS.md
│   │   └── apiService.js         # Ver SERVICIOS.md
│   │
│   ├── components/
│   │   ├── MiniDrawer.jsx        # Ver ARQUITECTURA_CODIGO.md - Sección "MiniDrawer"
│   │   └── ejemplos/
│   │       └── EjemploUsoServicio.jsx  # Código de ejemplo funcional
│   │
│   └── ...
│
└── public/
    └── json/                      # Datos mock - Ver SERVICIOS.md
```

---

## Preguntas Frecuentes

### ¿Cómo cambio entre datos mock y API real?

**Respuesta en:** [SERVICIOS.md](SERVICIOS.md) - Sección "Modo Simulación vs Producción"

TL;DR: Cambia `VITE_ENABLE_MOCK_DATA` en `.env.development` o `.env.production`

---

### ¿Dónde están los datos de ejemplo?

**Respuesta en:** [README.md](../README.md) - Sección "Datos Mock Disponibles"

**Ubicación:** `public/json/`
- `usuario.json`
- `permisos.json`
- `alianzas.json`
- `nominas.json`
- `facturas.json`

---

### ¿Cómo funciona el sistema de permisos?

**Respuesta en:** [ARQUITECTURA_CODIGO.md](ARQUITECTURA_CODIGO.md) - Sección "MiniDrawer - Lógica de Permisos"

TL;DR: El objeto `permissions` controla qué módulos ve cada usuario. Se carga desde `useUserData` hook.

---

### ¿Qué es el Context API y cómo se usa?

**Respuesta en:** [ARQUITECTURA_CODIGO.md](ARQUITECTURA_CODIGO.md) - Sección "Gestión de Estado"

TL;DR:
```javascript
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const { currentModule, setCurrentModule } = useContext(AppContext);
```

---

### ¿Cómo agrego un nuevo icono al menú?

**Respuesta en:** [ARQUITECTURA_CODIGO.md](ARQUITECTURA_CODIGO.md) - Sección "Configuración de Menús"

**Archivo:** `src/assets/components/MiniDrawer/menuConfig.jsx`

```javascript
import NuevoIcon from "@mui/icons-material/NuevoIcon";

export const menuTuModulo = [
  { text: "Opción", icon: <NuevoIcon />, permissions: "opcion" },
];
```

---

### ¿Dónde puedo ver ejemplos de código?

**Código de ejemplo funcional:**
- `src/assets/components/ejemplos/EjemploUsoServicio.jsx`

**Documentación con ejemplos:**
- [SERVICIOS.md](SERVICIOS.md) - Ejemplos de uso de API
- [ARQUITECTURA_CODIGO.md](ARQUITECTURA_CODIGO.md) - Explicación de código real

---

## Contribuir

Si agregas nueva funcionalidad, por favor:

1. **Actualiza esta documentación** según corresponda
2. **Agrega comentarios** en el código
3. **Sigue las convenciones** del proyecto (ver ARQUITECTURA_CODIGO.md - Sección "Convenciones")
4. **Crea ejemplos** si introduces nuevos patrones

---

## Contacto y Soporte

- **Issues del proyecto:** (Agregar link cuando esté disponible)
- **Wiki del equipo:** (Agregar link cuando esté disponible)
- **Chat del equipo:** (Agregar link cuando esté disponible)

---

**Última actualización:** Octubre 2025
**Mantenido por:** Equipo Brain ERP
