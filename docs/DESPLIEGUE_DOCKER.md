# Despliegue de Brain React con Docker

Esta guía documenta el proceso completo para desplegar la aplicación Brain React usando Docker en un servidor.

---

## Requisitos Previos

- Servidor Linux con acceso SSH
- Docker y Docker Compose instalados en el servidor
- Git instalado en el servidor
- Acceso al repositorio del proyecto

---

## Arquitectura del Despliegue

```
┌─────────────────────────────────────────┐
│         Máquina Local (Windows)         │
│                                         │
│  1. Desarrollo del código               │
│  2. git commit                          │
│  3. git push brainDell main             │
└────────────────┬────────────────────────┘
                 │
                 │ SSH (puerto 2024)
                 ▼
┌─────────────────────────────────────────┐
│           Servidor (Dell)               │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  Git Bare Repository            │   │
│  │  /var/repos/brain-react.git     │   │
│  └──────────┬──────────────────────┘   │
│             │                           │
│             │ post-receive hook         │
│             ▼                           │
│  ┌─────────────────────────────────┐   │
│  │  Directorio de Trabajo          │   │
│  │  /var/www/html/brainReact-docker│   │
│  └──────────┬──────────────────────┘   │
│             │                           │
│             │ docker compose build      │
│             ▼                           │
│  ┌─────────────────────────────────┐   │
│  │  Contenedor Docker              │   │
│  │  - Node.js (build)              │   │
│  │  - Nginx (production)           │   │
│  │  Puerto: 3000 → 80              │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

---

## Configuración Inicial del Servidor

### 1. Crear el Repositorio Git Bare

```bash
# Conectarse al servidor
ssh -p 2024 programacion10@189.206.165.237

# Crear directorio para el repositorio bare
sudo mkdir -p /var/repos/brain-react.git
sudo chown -R programacion10:programacion10 /var/repos/brain-react.git

# Inicializar repositorio bare
cd /var/repos/brain-react.git
git init --bare
```

### 2. Crear el Directorio de Trabajo

```bash
# Crear directorio donde vivirá el código
sudo mkdir -p /var/www/html/brainReact-docker
sudo chown -R programacion10:programacion10 /var/www/html/brainReact-docker
```

### 3. Configurar el Hook Post-Receive

Este hook automatiza el despliegue cada vez que haces `git push`.

```bash
# Crear el archivo hook
nano /var/repos/brain-react.git/hooks/post-receive
```

**Contenido del hook:**

```bash
#!/bin/bash

WORK_TREE="/var/www/html/brainReact-docker"
GIT_DIR="/var/repos/brain-react.git"

echo "=========================================="
echo "🚀 Desplegando Brain React con Docker..."
echo "=========================================="

# Checkout del código
git --work-tree="$WORK_TREE" --git-dir="$GIT_DIR" checkout -f

cd "$WORK_TREE"

echo "📦 Reconstruyendo contenedor Docker..."

# Detener contenedor si existe
docker compose down 2>/dev/null || true

# Reconstruir imagen
docker compose build --no-cache

# Iniciar contenedor
docker compose up -d

echo "=========================================="
echo "✅ Despliegue completado!"
echo "=========================================="
docker compose ps
```

**Dar permisos de ejecución:**

```bash
chmod +x /var/repos/brain-react.git/hooks/post-receive
```

---

## Configuración en la Máquina Local

### 1. Agregar el Remote del Servidor

```bash
cd c:\Users\Usuario-\Documents\Prueba_git_ec2\Brain

# Agregar remote con puerto SSH personalizado
git remote add brainDell ssh://programacion10@189.206.165.237:2024/var/repos/brain-react.git

# Verificar
git remote -v
```

### 2. Primer Despliegue

```bash
# Hacer push al servidor
git push brainDell main
```

Esto ejecutará automáticamente el hook post-receive y desplegará la aplicación.

---

## Archivos de Configuración Docker

### docker-compose.yml

```yaml
version: '3.8'

services:
  brain-react:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        VITE_ENABLE_MOCK_DATA: "true"
        VITE_API_URL: "http://localhost:3000/api"
        VITE_API_TIMEOUT: "10000"
        VITE_APP_NAME: "Brain ERP"
        VITE_APP_VERSION: "1.0.0"
        VITE_ENABLE_DEBUG: "false"
    container_name: brain-react
    ports:
      - "3000:80"
    restart: unless-stopped
    networks:
      - brain-network
    extra_hosts:
      - "host.docker.internal:host-gateway"

networks:
  brain-network:
    driver: bridge
```

**Explicación de componentes clave:**

- **`args`**: Variables de entorno pasadas durante el build
- **`ports`**: Mapeo de puertos (3000 del servidor → 80 del contenedor)
- **`extra_hosts`**: Permite acceder al host desde el contenedor
- **`networks`**: Red privada para comunicación entre contenedores

### Dockerfile

```dockerfile
# Etapa 1: Build
FROM node:18-alpine AS build

WORKDIR /app

# Argumentos de build (recibidos desde docker-compose.yml)
ARG VITE_ENABLE_MOCK_DATA
ARG VITE_API_URL
ARG VITE_API_TIMEOUT
ARG VITE_APP_NAME
ARG VITE_APP_VERSION
ARG VITE_ENABLE_DEBUG

# Convertir argumentos a variables de entorno para que Vite las lea
ENV VITE_ENABLE_MOCK_DATA=$VITE_ENABLE_MOCK_DATA
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_API_TIMEOUT=$VITE_API_TIMEOUT
ENV VITE_APP_NAME=$VITE_APP_NAME
ENV VITE_APP_VERSION=$VITE_APP_VERSION
ENV VITE_ENABLE_DEBUG=$VITE_ENABLE_DEBUG

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Construir la aplicación (Vite leerá las variables ENV)
RUN npm run build

# Etapa 2: Production
FROM nginx:alpine

# Copiar los archivos construidos desde la etapa de build
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar configuración personalizada de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 80

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]
```

**Características:**

- **Multi-stage build**: Reduce el tamaño de la imagen final
- **Etapa 1 (Build)**: Compila la aplicación React con Node.js
- **Etapa 2 (Production)**: Sirve archivos estáticos con Nginx

### nginx.conf

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Configuración para SPA (Single Page Application)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Configuración de caché para assets estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Desactivar caché para index.html
    location = /index.html {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # Configuración de compresión
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

### .dockerignore

```
node_modules
dist
.git
.gitignore
.claude
*.md
.vscode
.env.local
npm-debug.log
```

---

## Flujo de Trabajo Diario

### Desarrollo y Despliegue

```bash
# 1. Hacer cambios en tu código local
# ... editar archivos ...

# 2. Commit de cambios
git add .
git commit -m "feat: descripción de cambios"

# 3. Push al servidor (despliegue automático)
git push brainDell main
```

El hook post-receive automáticamente:
1. ✅ Hace checkout del código
2. ✅ Reconstruye la imagen Docker
3. ✅ Reinicia el contenedor

---

## Comandos Útiles en el Servidor

### Ver Estado del Contenedor

```bash
# Ver contenedores corriendo
docker ps

# Ver estado con docker-compose
cd /var/www/html/brainReact-docker
docker compose ps
```

### Ver Logs

```bash
# Logs en tiempo real
docker compose logs -f

# Últimas 50 líneas
docker compose logs --tail=50

# Logs de un servicio específico
docker compose logs -f brain-react
```

### Reiniciar Contenedor

```bash
# Reinicio rápido (sin reconstruir)
docker compose restart

# Detener y eliminar
docker compose down

# Reconstruir y reiniciar
docker compose down
docker compose build --no-cache
docker compose up -d
```

### Entrar al Contenedor

```bash
# Acceder al shell del contenedor
docker exec -it brain-react sh

# Ver variables de entorno
docker exec -it brain-react env | grep VITE

# Salir
exit
```

### Ver Uso de Recursos

```bash
# Estadísticas en tiempo real
docker stats brain-react

# Uso de disco
docker system df
```

---

## Verificación del Despliegue

### 1. Verificar que el Contenedor Está Corriendo

```bash
docker compose ps
```

**Salida esperada:**
```
NAME          STATUS    PORTS
brain-react   Up        0.0.0.0:3000->80/tcp
```

### 2. Acceder a la Aplicación

Abrir navegador en:
```
http://189.206.165.237:3000
```

### 3. Credenciales de Prueba (Modo Mock)

- **Email:** `correo@email`
- **Password:** `admin`

---

## Solución de Problemas

### El contenedor no inicia

```bash
# Ver logs detallados
docker compose logs

# Verificar configuración
docker compose config

# Reconstruir sin caché
docker compose build --no-cache
```

### Error de permisos en git push

```bash
# En el servidor, arreglar permisos
sudo chown -R programacion10:programacion10 /var/repos/brain-react.git
sudo chown -R programacion10:programacion10 /var/www/html/brainReact-docker
```

### Puerto 3000 ocupado

```bash
# Ver qué está usando el puerto
sudo netstat -tlnp | grep 3000

# Cambiar puerto en docker-compose.yml
ports:
  - "8080:80"  # Usar puerto 8080 en lugar de 3000
```

### Variables de entorno no se aplican

Las variables de entorno de Vite se leen **durante el build**, no en runtime:

```bash
# Siempre reconstruir después de cambiar variables
docker compose down
docker compose build --no-cache
docker compose up -d
```

---

## Mantenimiento

### Actualizar Dependencias

```bash
# En tu máquina local
npm update
git add package*.json
git commit -m "chore: actualizar dependencias"
git push brainDell main
```

### Limpiar Imágenes Antiguas

```bash
# En el servidor
docker image prune -a

# Limpiar todo (cuidado)
docker system prune -a
```

### Backup del Contenedor

```bash
# Guardar imagen
docker save brain-react:latest -o brain-react-backup.tar

# Restaurar imagen
docker load -i brain-react-backup.tar
```

---

## Seguridad

### Recomendaciones

1. **No exponer puertos innecesarios**
   ```bash
   sudo ufw status
   sudo ufw allow 3000/tcp  # Solo si es necesario
   ```

2. **Usar HTTPS en producción**
   - Configurar certificado SSL
   - Usar reverse proxy (Nginx/Apache)

3. **Mantener Docker actualizado**
   ```bash
   sudo apt update
   sudo apt upgrade docker-ce docker-compose
   ```

4. **Limitar recursos del contenedor**
   ```yaml
   deploy:
     resources:
       limits:
         cpus: '0.5'
         memory: 512M
   ```

---

## Resumen de Puertos

| Servicio | Puerto Servidor | Puerto Contenedor | Acceso |
|----------|----------------|-------------------|--------|
| Brain React | 3000 | 80 | http://189.206.165.237:3000 |
| SSH | 2024 | - | ssh -p 2024 programacion10@189.206.165.237 |

---

## Referencias

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Nginx Configuration](https://nginx.org/en/docs/)

---

**Última actualización:** Noviembre 2025  
**Mantenido por:** Equipo Brain ERP
