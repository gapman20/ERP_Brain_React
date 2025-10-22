# Brain ERP

Sistema ERP modular desarrollado con React + Vite, Material-UI y preparado para integración con MySQL.

## Características

- **Framework:** React 18.2 + Vite 5.2
- **UI:** Material-UI (MUI) 7.2
- **Routing:** React Router DOM 7.8
- **HTTP Client:** Axios 1.11
- **Estado:** Context API
- **Estilos:** Emotion

## Arquitectura de Servicios

Brain ERP cuenta con una arquitectura de servicios flexible que permite:

- **Desarrollo con datos simulados (JSON)** - No requiere backend activo
- **Producción con API real (MySQL)** - Cambio automático mediante variables de entorno
- **Cliente HTTP centralizado** con Axios e interceptores
- **Manejo de errores unificado**
- **Autenticación JWT preparada**

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

1. **IMPLEMENTACIÓN** - Alianzas, Empresas, Clientes, Remunerados, Layouts, Contratos
2. **NÓMINAS** - Nóminas, Recibos, Reportes, Movimientos, Calendario
3. **IMSS** - Generales, Cargos, Reportes, Obras
4. **FACTURACIÓN** - Facturas, Complementos, Notas de crédito, Depósitos
5. **GASTOS** - Solicitudes, Proveedores, Archivos, Concentrador
6. **UTILERÍA** - Lector XML, Bancos, Cheques, Conciliaciones
7. **SOPORTE** - Usuarios, Tickets, Notificaciones

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

### Build para producción

```bash
npm run build
```

### Preview de producción

```bash
npm run preview
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
- **[Documentación de Servicios](docs/SERVICIOS.md)** - Guía completa de uso de servicios y API

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
```

## Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run preview      # Preview del build
npm run lint         # Ejecutar ESLint
```

## Tecnologías

- **React** 18.2.0
- **Vite** 5.2.0
- **Material-UI** 7.2.0
- **React Router** 7.8.2
- **Axios** 1.11.0
- **Emotion** (styled components)

## Contribuir

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Licencia

Este proyecto es parte de Brain ERP.

---

**Última actualización:** Octubre 2025
