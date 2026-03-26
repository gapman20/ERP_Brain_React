# 📚 Modernización del Login – Brain ERP

Documentación técnica de los cambios realizados durante la sesión de desarrollo del **25 de marzo de 2026**. Esta guía explica qué se hizo, por qué, y cómo se relacionan los archivos entre sí.

---

## 🗂 Archivos Involucrados

| Archivo | Tipo | Acción |
|---|---|---|
| `src/assets/pages/Login/Login.jsx` | Componente React | Reescrito completamente |
| `src/assets/pages/Login/LoginOld.jsx` | Componente React | Backup del login original |
| `src/assets/pages/Login/LoginRazor.css` | Hoja de estilos | Creado nuevo |
| `src/assets/img/accounting_bg.png` | Imagen de fondo | Agregada |
| `src/assets/img/circuito.ico` | Logo Brain ERP | Reutilizado (preexistente) |
| `src/index.css` | Estilos globales | Agregado reset CSS |
| `.env.development` | Variables de entorno | Modificado |

---

## 🔄 Cambio 1: Variables de Entorno (`.env.development`)

### ¿Qué se cambió?
```diff
- VITE_ENABLE_MOCK_DATA=false
+ VITE_ENABLE_MOCK_DATA=true
```

### ¿Por qué?
El proyecto tiene un sistema de **doble modo de datos**:
- `VITE_ENABLE_MOCK_DATA=true` → Los datos vienen de archivos JSON locales en `/public/json/`
- `VITE_ENABLE_MOCK_DATA=false` → Los datos vienen de una API real (MySQL/Express)

Para que el login funcione **sin necesidad de un backend activo**, se activó el modo mock. Esto permite trabajar en desarrollo de UI sin depender de un servidor.

> **Dónde vive esto en el código:** `src/services/index.js` → detecta la variable y decide qué `service` usar (`mockService.js` vs `apiService.js`).

---

## 🌐 Cambio 2: Reset Global de CSS (`src/index.css`)

### ¿Qué se agregó?
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #root {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}
```

### ¿Por qué?
Los navegadores tienen **estilos por defecto** (user-agent stylesheet) que añaden `margin` y `padding` a elementos como `body`. Sin este reset, aparecen bordes blancos alrededor del contenido aunque el componente esté programado para ocupar toda la pantalla.

El `#root` es el contenedor raíz donde React inyecta toda la aplicación (definido en `index.html`). Al darle `height: 100%`, la cadena de altura llega hasta el componente de login.

---

## 🎨 Cambio 3: Hoja de Estilos del Login (`LoginRazor.css`)

### ¿Qué es?
Un archivo CSS **dedicado exclusivamente al login**, importado directamente en `Login.jsx`. Esto lo convierte en un CSS con alcance local (aunque no usa CSS Modules, la convención de importación directa es suficiente para componentes sencillos).

### CSS Variables (`:root` dentro de `.login-container`)
```css
.login-container {
  --primary: #4f46e5;      /* Indigo – color de acento */
  --secondary: #0284c7;    /* Azul claro */
  --text-primary: #0f172a; /* Casi negro – para textos principales */
  --text-secondary: #475569; /* Gris medio – para etiquetas */
  --border: rgba(0,0,0,0.08); /* Borde muy sutil */
}
```

### Clases principales

| Clase | Propósito |
|---|---|
| `.login-container` | Contenedor raíz: flex row, 100vh × 100vw |
| `.login-left` | Panel izquierdo (imagen de fondo) – `flex: 1` |
| `.login-right` | Panel derecho (formulario) – `flex: 1.2` |
| `.login-input` | Input estilizado con efecto de foco en indigo |
| `.btn-login` | Botón primary con gradiente y sombra |
| `.google-btn` | Botón outline para login social |
| `.text-gradient` | Texto con gradiente indigo→azul |
| `.animate-fade-in` | Animación de entrada con `translateY` |

### Diseño responsive
```css
@media (max-width: 900px) {
  .login-left { display: none !important; }
  .login-right { padding: 4rem 2rem !important; }
}
```
En pantallas pequeñas, el panel izquierdo (imagen) desaparece y solo se ve el formulario.

---

## ⚛️ Cambio 4: Componente Principal (`Login.jsx`)

### Estructura general

```
Login.jsx
├── Estado (useState)
│   ├── formData       → { email, password }
│   ├── rememberMe     → boolean (toggle visual)
│   ├── loading        → boolean (durante request)
│   ├── isRedirecting  → boolean (pantalla de carga post-login)
│   └── error          → string (mensaje de error)
│
├── Handlers
│   ├── handleChange()  → actualiza formData, limpia errores
│   └── handleSubmit()  → llama a dataService.auth.login()
│
└── Renders
    ├── [si isRedirecting] → Pantalla de carga azul con spinner
    └── [normal]           → <section className="login-container">
                                ├── .login-left  (imagen + overlay + texto)
                                └── .login-right (formulario)
```

### Estados detallados

#### `formData`
```jsx
const [formData, setFormData] = useState({ email: '', password: '' });
```
Guarda los valores de los inputs de forma controlada. Cada `<input>` tiene `value={formData.email}` y `onChange={handleChange}`, formando un **controlled component** en React.

#### `isRedirecting`
```jsx
if (isRedirecting) {
  return <PantallaDeEspera />;
}
```
Cuando el login es exitoso, se activa este estado y se muestra una pantalla de transición por 1.5 segundos antes de navegar al dashboard. Esto mejora la UX al dar feedback visual.

### Flujo de autenticación

```
Usuario llena el form
       ↓
handleSubmit() se ejecuta
       ↓
dataService.auth.login({ email, password })
       ↓ (éxito)
localStorage.setItem('authToken', token)
localStorage.setItem('user', JSON.stringify(user))
       ↓
setIsRedirecting(true)  →  muestra loader
       ↓ (1.5s)
navigate('/dashboard')
```

> El `authToken` guardado en `localStorage` es leído por `ProtectedRoute.jsx` para decidir si el usuario puede acceder a rutas privadas.

### Panel Izquierdo – Imagen a pantalla completa

```jsx
<div className="login-left" style={{ 
  backgroundImage: `url(${accountingBg})`,
  backgroundSize: 'cover',       // ocupa todo sin deformar
  backgroundPosition: 'center',  // centra la imagen
  backgroundRepeat: 'no-repeat', // sin repetición
  overflow: 'hidden'
}}>
  {/* Overlay oscuro para legibilidad del texto */}
  <div style={{ 
    position: 'absolute', inset: 0, 
    background: 'linear-gradient(rgba(15,23,42,0.75), rgba(15,23,42,0.45))',
    zIndex: 1
  }} />
  
  {/* Contenido: logo + frase */}
  <div style={{ position: 'relative', zIndex: 10, padding: '4rem' }}>
    ...
  </div>
</div>
```

**Técnica del overlay:** El `div` con `position: absolute, inset: 0` cubre exactamente el mismo espacio que su padre. Al poner un fondo con `rgba` semitransparente encima de la imagen, el texto blanco se puede leer sin importar la imagen de fondo.

### Toggle de "Recuérdame" (sin librería)
```jsx
<div 
  onClick={() => setRememberMe(!rememberMe)}
  style={{ 
    background: rememberMe ? 'var(--primary)' : '#cbd5e1',
    // ... estilos del track
  }}
>
  <div style={{ 
    left: rememberMe ? '18px' : '2px',
    transition: 'left 0.3s'
    // ... estilos del thumb
  }} />
</div>
```
Se construyó un toggle CSS puro sin librerías. El estado `rememberMe` cambia el color del fondo y la posición del círculo interno mediante estilos condicionales.

---

## 🖼 Imagen de Fondo (`accounting_bg.png`)

La imagen fue **generada con IA** mediante un prompt específico:
> *"A professional, high-end, and immersive full-bleed background of an accounting and financial data environment..."*

Se guardó en `src/assets/img/accounting_bg.png` y se importa en el componente:
```jsx
import accountingBg from '../../img/accounting_bg.png';
```

Vite procesa este import y lo transforma en una URL optimizada al hacer build.

---

## 🔗 Diagrama de Relaciones

```
App.jsx
 └── Router (MemoryRouter)
      └── Route path="/login"
           └── Login.jsx  ← componente principal
                ├── LoginRazor.css  ← estilos propios
                ├── accounting_bg.png  ← imagen de fondo
                ├── circuito.ico  ← logo Brain ERP
                └── dataService (services/index.js)
                     ├── [dev] mockService.js → public/json/usuario.json
                     └── [prod] apiService.js → API HTTP real
```

---

## 🧠 Conceptos Clave Aprendidos

| Concepto | Aplicación en este proyecto |
|---|---|
| **Controlled Components** | Inputs ligados a `useState` con `value` y `onChange` |
| **CSS Variables** | Paleta de colores definida en `.login-container` y usada con `var()` |
| **Overlay pattern** | `div` absoluto semitransparente sobre imagen para legibilidad |
| **CSS Reset** | `index.css` elimina márgenes por defecto del navegador |
| **Conditional Rendering** | Pantalla de carga con `if (isRedirecting) return ...` |
| **Async/Await con try-catch** | Manejo de errores de red en `handleSubmit` |
| **localStorage** | Persistencia del token JWT entre recargas |
| **Vite env variables** | `VITE_ENABLE_MOCK_DATA` controla el modo de datos |

---

## 🚀 Cómo Ejecutar

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo (modo mock activado)
npm run dev

# 3. Abrir en el navegador
# http://localhost:3000

# Credenciales de desarrollo:
# Email: correo@email
# Password: admin
```

---

*Documentación generada el 25/03/2026.*
