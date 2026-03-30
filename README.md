# Brain ERP

Sistema ERP modular desarrollado con React + Vite, Material-UI y preparado para integración con MySQL.

## Características

- **Framework:** React 19 + Vite 7
- **UI:** Material-UI (MUI) 7.2
- **Routing:** React Router DOM 7.8
- **HTTP Client:** Axios 1.11
- **Estado:** Context API
- **Estilos:** Emotion
- **Docker:** Preparado para despliegue en contenedor

## Arquitectura de Servicios

Brain ERP cuenta con una arquitectura de servicios flexible que permite:

- **Desarrollo con datos simulados (JSON)** - No requiere backend activo
- **Producción con API real (MySQL)** - Cambio automático mediante variables de entorno
- **Cliente HTTP centralizado** con Axios e interceptores
- **Manejo de errores unificado**
- **Sistema de autenticación completo** - Login, protección de rutas y logout

## Sistema de Autenticación

Brain ERP incluye un sistema completo de autenticación:

- **Página de Login** - Diseño profesional con validación de credenciales
- **Protección de rutas** - ProtectedRoute component para rutas privadas
- **Gestión de sesión** - Token JWT guardado en localStorage
- **Menú de usuario** - Información del usuario y opción de logout
- **URL constante** - MemoryRouter mantiene la URL sin cambios

**Flujo de autenticación:**
1. Usuario inicia en página de Login
2. Ingresa credenciales y valida con el servicio
3. Sistema guarda token en localStorage
4. Muestra pantalla de carga con animación
5. Redirige al Dashboard de bienvenida (sin módulo preseleccionado)
6. Usuario elige manualmente qué módulo visitar según sus permisos
7. Cierra sesión desde el menú de usuario

### Estructura de servicios

```
src/services/
├── index.js          # Punto de entrada (dataService)
├── apiConfig.js      # Configuración y endpoints
├── httpClient.js     # Cliente Axios con interceptores
├── mockService.js    # Datos simulados (JSON)
└── apiService.js     # API real (MySQL)
```

### Cambiar entre Mock y API Real

Edita `.env.development` o `.env.production`:

```env
# Modo simulación (datos mock JSON)
VITE_ENABLE_MOCK_DATA=true

# Modo producción (API real MySQL)
VITE_ENABLE_MOCK_DATA=false
VITE_API_URL=http://localhost:3000/api
```

### Uso básico

```javascript
import { dataService } from '@services';

// Obtener datos (funciona igual con mock o API real)
const response = await dataService.implementacion.getAlianzas();
const alianzas = response.data.alianzas;

// Crear registro
await dataService.implementacion.createAlianza({ nombre: 'Nueva Alianza' });

// Actualizar registro
await dataService.implementacion.updateAlianza(1, { nombre: 'Actualizada' });

// Eliminar registro
await dataService.implementacion.deleteAlianza(1);
```

## Módulos del ERP

| Módulo | Estado | Descripción |
|--------|--------|-------------|
| **IMPLEMENTACIÓN** | Parcial | Alianzas (CRUD funcional) |
| **NÓMINAS** | Mock | Datos de ejemplo |
| **IMSS** | Mock | Datos de ejemplo |
| **FACTURACIÓN** | Mock | Datos de ejemplo |
| **GASTOS** | Mock | Datos de ejemplo |
| **UTILIDADES** | Mock | Datos de ejemplo |
| **SOPORTE** | Mock | Datos de ejemplo |

### Funcionalidades Completadas
- Login/logout con JWT
- Dashboard principal
- Menú lateral con permisos por usuario
- CRUD de Alianzas (Implementación)
- Arquitectura de servicios mock/API dual
- Docker preparado para despliegue

## Inicio Rápido

### Instalación

```bash
npm install
```

### Desarrollo (modo simulación)

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

**Credenciales de desarrollo:**
- Email: `correo@email`
- Contraseña: `admin`

### Build para producción

```bash
npm run build
```

### Preview de producción

```bash
npm run preview
```

### Docker

```bash
# Construir imagen
docker-compose build

# Ejecutar contenedor
docker-compose up -d

# Ver logs
docker-compose logs -f
```

## Datos Mock Disponibles

Los datos simulados están en `public/json/`:

- `usuario.json` - Datos del usuario y sesión
- `permisos.json` - Permisos por módulo
- `alianzas.json` - Alianzas estratégicas (5 registros)
- `nominas.json` - Nóminas y recibos (4 períodos)
- `facturas.json` - Facturas, complementos y notas (4 facturas)

## Integración con MySQL

### 1. Configura tu backend

Crea endpoints REST que coincidan con la configuración en `src/services/apiConfig.js`.

**Ejemplo con Express:**

```javascript
const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
app.use(express.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'brain_erp',
});

app.get('/api/implementacion/alianzas', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM alianzas');
  res.json({ alianzas: rows });
});

app.listen(3000, () => console.log('API en http://localhost:3000'));
```

### 2. Cambia el modo en `.env`

```env
VITE_ENABLE_MOCK_DATA=false
VITE_API_URL=http://localhost:3000/api
```

### 3. Reinicia la app

```bash
npm run dev
```

**No necesitas cambiar código** - El `dataService` se adapta automáticamente.

## Documentación Completa

- **[Arquitectura del Código](docs/ARQUITECTURA_CODIGO.md)** - Explicación detallada de todo el código del proyecto
- **[Sistema de Autenticación](docs/AUTENTICACION.md)** - Guía completa de login, protección de rutas y logout
- **[Documentación de Servicios](docs/SERVICIOS.md)** - Guía completa de uso de servicios y API
- **[Índice de Documentación](docs/INDICE.md)** - Navegación rápida por toda la documentación

## Variables de Entorno

```env
VITE_API_URL=http://localhost:3000/api
VITE_API_TIMEOUT=10000
VITE_APP_NAME=Brain ERP
VITE_APP_VERSION=1.0.0
VITE_ENABLE_MOCK_DATA=true
VITE_ENABLE_DEBUG=true
```

## Alias de Rutas

Usa alias para importaciones más limpias:

```javascript
import Component from '@components/Component';
import { dataService } from '@services';
import { useUserData } from '@hooks/useUserData';
import Page from '@pages/Login';
```

| Alias | Ruta |
|-------|------|
| `@` | `/src` |
| `@components` | `/src/assets/components` |
| `@pages` | `/src/assets/pages` |
| `@views` | `/src/assets/views` |
| `@services` | `/src/services` |
| `@context` | `/src/context` |
| `@hooks` | `/src/assets/components/MiniDrawer/hooks` |
| `@themes` | `/src/assets/themes` |
| `@img` | `/src/assets/img` |

## Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run preview      # Preview del build
npm run lint         # Ejecutar ESLint
```

## Tecnologías

- **React** 19.2.3
- **Vite** 7.3.1
- **Material-UI** 7.2.0
- **React Router** 7.8.2
- **Axios** 1.11.0
- **Emotion** (styled components)
- **Toolpad** 0.1.55 (MUI powered tools)

## Contribuir

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Licencia

Este proyecto es parte de Brain ERP.

---

## Estado del Proyecto

| Componente | Estado |
|------------|--------|
| Frontend (React) | En desarrollo |
| Autenticación | Completo |
| Dashboard | Completo |
| Menú/Permisos | Completo |
| Módulo Implementación | Parcial (Alianzas) |
| Backend (API) | Pendiente |
| Base de datos | Pendiente (MySQL) |

**Última actualización:** Marzo 2026
