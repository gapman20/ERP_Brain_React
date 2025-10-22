# Documentación de Servicios - Brain ERP

## Tabla de Contenidos

1. [Introducción](#introducción)
2. [Arquitectura de Servicios](#arquitectura-de-servicios)
3. [Configuración](#configuración)
4. [Modo Simulación vs Producción](#modo-simulación-vs-producción)
5. [Uso Básico](#uso-básico)
6. [Ejemplos por Módulo](#ejemplos-por-módulo)
7. [Integración con MySQL](#integración-con-mysql)
8. [Troubleshooting](#troubleshooting)

---

## Introducción

Brain ERP cuenta con una arquitectura de servicios que permite **trabajar con datos simulados (JSON) durante el desarrollo** y **cambiar automáticamente a la API real de MySQL en producción** sin modificar el código de los componentes.

### Características principales:

- **Cambio automático** entre mock y API real mediante variables de entorno
- **Cliente HTTP centralizado** con Axios e interceptores configurados
- **Manejo de errores** unificado
- **Autenticación** mediante tokens JWT (preparado)
- **Logging en modo debug** para desarrollo
- **Datos mock completos** para todos los módulos del ERP

---

## Arquitectura de Servicios

```
src/services/
├── index.js              # Punto de entrada unificado (exporta dataService)
├── apiConfig.js          # Configuración de URLs, endpoints y variables
├── httpClient.js         # Cliente Axios con interceptores
├── mockService.js        # Servicio de datos simulados (JSON)
└── apiService.js         # Servicio de API real (MySQL)
```

### Flujo de datos:

```
Componente/Hook
    ↓
dataService (index.js)
    ↓
¿VITE_ENABLE_MOCK_DATA = true?
    ├─ SÍ → mockService.js → JSON files (/public/json/)
    └─ NO → apiService.js → httpClient.js → API Backend (MySQL)
```

---

## Configuración

### Variables de Entorno

Edita los archivos `.env.development` o `.env.production`:

```env
# Modo de datos (true = simulación, false = API real)
VITE_ENABLE_MOCK_DATA=true

# URL del backend (cuando uses API real)
VITE_API_URL=http://localhost:3000/api

# Timeout de peticiones HTTP (milisegundos)
VITE_API_TIMEOUT=10000

# Modo debug (logs en consola)
VITE_ENABLE_DEBUG=true
```

### Archivos JSON Mock

Los datos simulados están en `public/json/`:

- `usuario.json` - Datos del usuario
- `permisos.json` - Permisos por módulo
- `alianzas.json` - Datos de alianzas
- `nominas.json` - Nóminas y recibos
- `facturas.json` - Facturas, complementos y notas de crédito

---

## Modo Simulación vs Producción

### Modo Simulación (Desarrollo)

**Ventajas:**
- No requiere backend activo
- Respuestas instantáneas con delay simulado
- Datos consistentes para pruebas
- Sin dependencias de base de datos

**Configuración:**
```env
VITE_ENABLE_MOCK_DATA=true
```

### Modo Producción (API Real)

**Ventajas:**
- Datos reales desde MySQL
- CRUD completo
- Autenticación real
- Transacciones y validaciones del servidor

**Configuración:**
```env
VITE_ENABLE_MOCK_DATA=false
VITE_API_URL=https://api.brain-erp.com/api
```

---

## Uso Básico

### 1. Importar el servicio

```javascript
import { dataService } from '@/services';
// o
import dataService from '../services';
```

### 2. Usar en componentes o hooks

```javascript
// Ejemplo: Hook personalizado
import { useState, useEffect } from 'react';
import { dataService } from '@/services';

export const useAlianzas = () => {
  const [alianzas, setAlianzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlianzas = async () => {
      try {
        setLoading(true);
        const response = await dataService.implementacion.getAlianzas();
        setAlianzas(response.data.alianzas);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAlianzas();
  }, []);

  return { alianzas, loading, error };
};
```

### 3. Usar en componentes directamente

```javascript
import { useState } from 'react';
import { dataService } from '@/services';

function CrearAlianza() {
  const [formData, setFormData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await dataService.implementacion.createAlianza(formData);
      console.log('Alianza creada:', response.data);
      // Mostrar notificación de éxito
    } catch (error) {
      console.error('Error al crear alianza:', error);
      // Mostrar notificación de error
    }
  };

  return <form onSubmit={handleSubmit}>{/* ... */}</form>;
}
```

---

## Ejemplos por Módulo

### Autenticación

```javascript
import { dataService } from '@/services';

// Login
const login = async (email, password) => {
  try {
    const response = await dataService.auth.login({ email, password });
    const { user, token } = response.data;

    // Guardar token
    localStorage.setItem('authToken', token);

    return user;
  } catch (error) {
    console.error('Error de autenticación:', error);
    throw error;
  }
};

// Obtener usuario actual
const getCurrentUser = async () => {
  const response = await dataService.auth.me();
  return response.data.user;
};

// Logout
const logout = async () => {
  await dataService.auth.logout();
  localStorage.removeItem('authToken');
};
```

### Usuarios y Permisos

```javascript
// Obtener usuario con permisos
const getUserData = async (userId) => {
  const response = await dataService.users.getUserWithPermissions(userId);
  return response.data;
};

// Solo obtener permisos
const getPermissions = async (userId) => {
  const response = await dataService.users.getPermissions(userId);
  return response.data.permissions;
};
```

### Módulo de Implementación - Alianzas

```javascript
// Listar todas las alianzas
const alianzas = await dataService.implementacion.getAlianzas();

// Crear nueva alianza
const nuevaAlianza = await dataService.implementacion.createAlianza({
  nombre: 'Nueva Alianza',
  descripcion: 'Descripción de la alianza',
  tipo: 'corporativo',
  status: 'activo',
});

// Actualizar alianza
const actualizada = await dataService.implementacion.updateAlianza(1, {
  nombre: 'Alianza Actualizada',
  status: 'inactivo',
});

// Eliminar alianza
await dataService.implementacion.deleteAlianza(1);
```

### Módulo de Nóminas

```javascript
// Obtener nóminas
const nominas = await dataService.nominas.getNominas();

// Obtener recibos de nómina
const recibos = await dataService.nominas.recibos.getAll({
  periodo: '2024-12',
  empleado_id: 532,
});
```

### Módulo de Facturación

```javascript
// Listar facturas con filtros
const facturas = await dataService.facturacion.facturas.getAll({
  status: 'pendiente',
  fecha_inicio: '2024-12-01',
  fecha_fin: '2024-12-31',
});

// Crear nueva factura
const factura = await dataService.facturacion.facturas.create({
  cliente_id: 101,
  conceptos: [
    {
      descripcion: 'Servicio de Desarrollo',
      cantidad: 1,
      precio_unitario: 50000,
    },
  ],
});

// Obtener factura por ID
const detalle = await dataService.facturacion.facturas.getById(1);
```

---

## Integración con MySQL

### Paso 1: Configurar el Backend

Tu backend debe exponer endpoints REST que coincidan con los definidos en `apiConfig.js`:

**Ejemplo de endpoint en Node.js/Express:**

```javascript
// Backend - server.js
const express = require('express');
const mysql = require('mysql2/promise');
const app = express();

// Conexión a MySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'brain_erp',
});

// Endpoint: Obtener alianzas
app.get('/api/implementacion/alianzas', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM alianzas');
    res.json({ alianzas: rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint: Crear alianza
app.post('/api/implementacion/alianzas', async (req, res) => {
  try {
    const { nombre, descripcion, tipo, status } = req.body;
    const [result] = await pool.query(
      'INSERT INTO alianzas (nombre, descripcion, tipo, status) VALUES (?, ?, ?, ?)',
      [nombre, descripcion, tipo, status]
    );
    res.json({ id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('API corriendo en http://localhost:3000');
});
```

### Paso 2: Cambiar a modo API real

Edita `.env.production`:

```env
VITE_ENABLE_MOCK_DATA=false
VITE_API_URL=http://localhost:3000/api
```

### Paso 3: Reiniciar la aplicación

```bash
npm run dev
```

**Importante:** No necesitas cambiar ningún código en los componentes. El `dataService` cambia automáticamente entre mock y API real.

---

## Troubleshooting

### Error: "Cannot read property 'data' of undefined"

**Causa:** La estructura de respuesta del mock y la API real no coinciden.

**Solución:** Verifica que ambos servicios retornen el mismo formato:

```javascript
// Mock y API deben retornar:
{
  status: 200,
  data: {
    // tus datos aquí
  }
}
```

### Error: "Network Error" o "CORS Error"

**Causa:** El backend no permite peticiones desde el frontend.

**Solución:** Configura CORS en el backend:

```javascript
// Express
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
```

### Error: "401 Unauthorized"

**Causa:** Token de autenticación inválido o expirado.

**Solución:**

1. Verifica que el token esté en localStorage
2. Implementa refresh token
3. Redirige al login si el token expiró

```javascript
// Ya está implementado en httpClient.js
// Interceptor de response maneja errores 401 automáticamente
```

### Los datos no se actualizan

**Causa:** Estás usando cache o el servicio está en modo mock.

**Solución:**

1. Verifica `VITE_ENABLE_MOCK_DATA` en `.env`
2. Limpia cache del navegador
3. Reinicia el servidor de desarrollo

```bash
npm run dev
```

### Logs no aparecen en consola

**Causa:** Debug mode desactivado.

**Solución:**

```env
VITE_ENABLE_DEBUG=true
```

---

## Mejores Prácticas

### 1. Usa hooks personalizados

```javascript
// hooks/useDataFetch.js
export const useDataFetch = (fetchFn, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const response = await fetchFn();
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, deps);

  return { data, loading, error };
};
```

### 2. Maneja errores de forma consistente

```javascript
try {
  const response = await dataService.implementacion.getAlianzas();
  // Procesar datos
} catch (error) {
  if (error.response) {
    // Error del servidor
    console.error('Server error:', error.response.data);
  } else if (error.request) {
    // No hay respuesta
    console.error('Network error');
  } else {
    // Error de configuración
    console.error('Error:', error.message);
  }
}
```

### 3. Usa parámetros de filtrado

```javascript
// Paginación y filtros
const facturas = await dataService.facturacion.facturas.getAll({
  page: 1,
  limit: 20,
  status: 'pendiente',
  fecha_inicio: '2024-12-01',
  search: 'Cliente A',
});
```

---

## Recursos Adicionales

- [Documentación de Axios](https://axios-http.com/)
- [React Hooks](https://react.dev/reference/react)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

---

**Última actualización:** Octubre 2025
**Versión:** 1.0.0
