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