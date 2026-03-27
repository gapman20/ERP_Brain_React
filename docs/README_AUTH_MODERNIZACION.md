# 🔐 Sistema de Autenticación Modernizado — Brain ERP

Documentación técnica de los componentes y cambios realizados el **26 de marzo de 2026**. Se ha completado el flujo de autenticación (Login, Registro y Recuperación) con un diseño premium y uniforme de 50/50.

---

## 🛠 Nuevos Componentes Creados

### 1. Registro (`Register.jsx` / `Register.css`)
**Propósito:** Permitir a nuevos usuarios darse de alta en el sistema con validaciones completas.
- **Funcionamiento:**
  - Formulario extenso que incluye: Usuario, Email (doble validación), Contraseña y **RFC** (formato mexicano).
  - Checkboxes legales para Términos y Condiciones y Aviso de Privacidad.
  - **Scroll Independiente:** El formulario derecho tiene scroll propio, mientras que la imagen izquierda permanece fija (`sticky`).
  - **Seguridad:** Integra un widget de CAPTCHA simulado antes del envío.

### 2. Olvidaste tu Contraseña (`ForgotPassword.jsx` / `ForgotPassword.css`)
**Propósito:** Recuperación de acceso mediante identidad fiscal (RFC).
- **Funcionamiento:**
  - Solicita el RFC registrado.
  - Al validar, simula el envío de un enlace de restablecimiento al correo asociado.
  - Pantalla de éxito con feedback visual claro y opción de retorno al Login.

---

## 🔄 Mejoras en Componentes Existentes

### Login (`Login.jsx`)
- **Limpieza de UI:** Se eliminó la opción "Recordarme", el botón de Google y la caja de credenciales de desarrollo para un aspecto más limpio y corporativo.
- **Integración de Seguridad:** Se añadió el widget de CAPTCHA obligatorio antes de permitir el inicio de sesión.
- **Navegación:** Enlaces actualizados para redirigir correctamente a `/register` y `/forgot-password`.

### Enrutador (`App.jsx`)
- Registro de las nuevas rutas públicas:
  - `/register` → `Register.jsx`
  - `/forgot-password` → `ForgotPassword.jsx`

---

## 📐 Cambios en el Diseño (UI/UX)

### Distribución 50/50
Se modificó la rejilla (grid) en las tres vistas para que la imagen visual de la izquierda y el formulario de la derecha ocupen exactamente el **50% del ancho** de la pantalla cada uno, logrando un equilibrio visual perfecto.

### Sistema de CAPTCHA Unificado
Se implementó un componente visual `reCAPTCHA` simulado en todos los formularios para:
1.  **Prevención de bots:** Simula un paso de verificación humana.
2.  **Consistencia visual:** El mismo widget interactivo aparece en Login, Registro y Recuperación.

### Relación con el Proyecto
- **Estilos:** Todos los nuevos CSS reutilizan las variables de diseño (`--primary`, `--secondary`, etc.) definidas originalmente en el Login, asegurando coherencia visual.
- **Rutas:** Los componentes se integran dentro del `MemoryRouter` existente, permitiendo una navegación fluida entre vistas sin recarga de página.

---

## 📂 Estructura de Archivos Actualizada

```text
src/assets/pages/
├── Login/
│   ├── Login.jsx
│   └── LoginRazor.css
├── Register/
│   ├── Register.jsx
│   └── Register.css
└── ForgotPassword/
    ├── ForgotPassword.jsx
    └── ForgotPassword.css
```

---
*Documentación generada el 26/03/2026 para el equipo de Brain ERP.*
