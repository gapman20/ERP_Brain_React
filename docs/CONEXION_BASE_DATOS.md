# Conexión de Brain React a Base de Datos MySQL

Esta guía documenta cómo conectar la aplicación Brain React (dockerizada) a una base de datos MySQL que corre en el servidor host.

---

## Arquitectura de Conexión

```
┌─────────────────────────────────────────────────────────┐
│                    Servidor Dell                        │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Contenedor Docker: brain-react                  │  │
│  │  - Frontend React (puerto 3000)                  │  │
│  │  - Nginx                                         │  │
│  └────────────────┬─────────────────────────────────┘  │
│                   │                                     │
│                   │ HTTP Request                        │
│                   ▼                                     │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Backend API (Node.js/PHP)                       │  │
│  │  - Puerto: 5000 (ejemplo)                        │  │
│  │  - Maneja lógica de negocio                      │  │
│  └────────────────┬─────────────────────────────────┘  │
│                   │                                     │
│                   │ host.docker.internal:3306           │
│                   ▼                                     │
│  ┌──────────────────────────────────────────────────┐  │
│  │  MySQL 8.0 (Host)                                │  │
│  │  - Puerto: 3306                                  │  │
│  │  - Base de datos: brain_db                       │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

> **Nota Importante:** El frontend React **NO se conecta directamente** a MySQL. La conexión es:
> `React → Backend API → MySQL`

---

## Prerrequisitos

- MySQL 8.0 instalado en el servidor
- Backend API (Node.js, PHP, Python, etc.)
- Contenedor Docker de Brain React corriendo
- Acceso root o sudo en el servidor

---

## Parte 1: Configurar MySQL para Aceptar Conexiones

Por defecto, MySQL solo acepta conexiones desde `localhost`. Necesitamos configurarlo para aceptar conexiones desde contenedores Docker.

### 1. Editar Configuración de MySQL

```bash
# Conectarse al servidor
ssh -p 2024 programacion10@189.206.165.237

# Editar archivo de configuración
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf
```

**Buscar y modificar:**

```ini
# ANTES (solo conexiones locales)
bind-address = 127.0.0.1

# DESPUÉS (acepta conexiones de cualquier IP)
bind-address = 0.0.0.0
```

**Guardar:** `Ctrl+O`, `Enter`, `Ctrl+X`

### 2. Reiniciar MySQL

```bash
# Reiniciar servicio
sudo systemctl restart mysql

# Verificar que esté escuchando en 0.0.0.0
sudo netstat -tlnp | grep 3306
```

**Salida esperada:**
```
tcp  0  0  0.0.0.0:3306  0.0.0.0:*  LISTEN  1234/mysqld
```

### 3. Crear Usuario para la Aplicación

```bash
# Conectarse a MySQL como root
sudo mysql -u root -p
```

**Dentro de MySQL:**

```sql
-- Crear usuario que puede conectarse desde cualquier host
CREATE USER 'brain_user'@'%' IDENTIFIED BY 'TuPasswordSeguro123!';

-- Dar permisos sobre la base de datos
GRANT ALL PRIVILEGES ON brain_db.* TO 'brain_user'@'%';

-- Aplicar cambios
FLUSH PRIVILEGES;

-- Verificar que el usuario se creó correctamente
SELECT User, Host FROM mysql.user WHERE User='brain_user';

-- Salir
EXIT;
```

### 4. Configurar Firewall (Seguridad)

**Importante:** El puerto 3306 **NO debe estar abierto públicamente** en internet.

```bash
# Verificar estado del firewall
sudo ufw status

# Si el puerto 3306 está abierto públicamente, cerrarlo
sudo ufw delete allow 3306

# Recargar firewall
sudo ufw reload
```

Esto permite que MySQL acepte conexiones en `0.0.0.0:3306` (necesario para Docker), pero el firewall bloquea conexiones externas.

---

## Parte 2: Configurar Docker para Acceder al Host

### 1. Verificar docker-compose.yml

El archivo `docker-compose.yml` ya debe tener configurado `extra_hosts`:

```yaml
services:
  brain-react:
    # ... otras configuraciones ...
    extra_hosts:
      - "host.docker.internal:host-gateway"
```

Esto permite que el contenedor acceda al host usando el hostname `host.docker.internal`.

### 2. Probar Conexión desde el Contenedor

```bash
# Entrar al contenedor
docker exec -it brain-react sh

# Probar conectividad al host
ping -c 3 host.docker.internal

# Salir
exit
```

---

## Parte 3: Configurar el Backend API

El backend es el intermediario entre React y MySQL. Aquí hay ejemplos para diferentes tecnologías:

### Opción A: Backend con Node.js (Express)

#### Instalar Dependencias

```bash
npm install express mysql2 dotenv cors
```

#### Archivo `.env` del Backend

```env
DB_HOST=host.docker.internal
DB_PORT=3306
DB_USER=brain_user
DB_PASSWORD=TuPasswordSeguro123!
DB_NAME=brain_db
PORT=5000
```

#### Configuración de Conexión (`db.js`)

```javascript
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
```

#### Endpoint de Login (`routes/auth.js`)

```javascript
const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query(
      'SELECT * FROM usuarios WHERE email = ? AND password = ?',
      [email, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const user = rows[0];
    res.json({
      user: {
        id: user.id,
        name: user.nombre,
        email: user.email,
        role: user.rol
      },
      token: 'jwt-token-aqui' // Implementar JWT
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

module.exports = router;
```

### Opción B: Backend con PHP

#### Archivo de Conexión (`config/database.php`)

```php
<?php
class Database {
    private $host = "host.docker.internal";
    private $port = "3306";
    private $db_name = "brain_db";
    private $username = "brain_user";
    private $password = "TuPasswordSeguro123!";
    public $conn;

    public function getConnection() {
        $this->conn = null;

        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . 
                ";port=" . $this->port . 
                ";dbname=" . $this->db_name,
                $this->username,
                $this->password
            );
            $this->conn->exec("set names utf8");
        } catch(PDOException $exception) {
            echo "Error de conexión: " . $exception->getMessage();
        }

        return $this->conn;
    }
}
?>
```

#### Endpoint de Login (`api/login.php`)

```php
<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

$email = $data->email;
$password = $data->password;

$query = "SELECT * FROM usuarios WHERE email = :email AND password = :password";
$stmt = $db->prepare($query);
$stmt->bindParam(":email", $email);
$stmt->bindParam(":password", $password);
$stmt->execute();

if($stmt->rowCount() > 0) {
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
    http_response_code(200);
    echo json_encode(array(
        "user" => array(
            "id" => $row['id'],
            "name" => $row['nombre'],
            "email" => $row['email'],
            "role" => $row['rol']
        ),
        "token" => "jwt-token-aqui"
    ));
} else {
    http_response_code(401);
    echo json_encode(array("message" => "Credenciales inválidas"));
}
?>
```

---

## Parte 4: Configurar el Frontend React

### 1. Actualizar Variables de Entorno

Modificar `docker-compose.yml` para apuntar al backend real:

```yaml
services:
  brain-react:
    build:
      args:
        VITE_ENABLE_MOCK_DATA: "false"  # ← Cambiar a false
        VITE_API_URL: "http://189.206.165.237:5000/api"  # ← URL del backend
        # ... otras variables ...
```

### 2. Reconstruir el Contenedor

```bash
cd /var/www/html/brainReact-docker
docker compose down
docker compose build --no-cache
docker compose up -d
```

---

## Verificación de la Conexión

### 1. Probar Conexión MySQL desde el Servidor

```bash
# Conectarse con el usuario de la aplicación
mysql -h 127.0.0.1 -P 3306 -u brain_user -p brain_db

# Dentro de MySQL
SHOW TABLES;
SELECT * FROM usuarios LIMIT 5;
EXIT;
```

### 2. Probar Endpoint del Backend

```bash
# Desde el servidor
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"correo@email","password":"admin"}'
```

### 3. Probar desde el Frontend

Abrir navegador en `http://189.206.165.237:3000` e intentar login.

---

## Estructura de Base de Datos Ejemplo

### Tabla de Usuarios

```sql
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(50) DEFAULT 'user',
    ip VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertar usuario de prueba
INSERT INTO usuarios (nombre, email, password, rol, ip) 
VALUES ('Jose Gabriel Alvarez Perez', 'correo@email', 'admin', 'admin', '192.168.1.1');
```

---

## Solución de Problemas

### Error: "Can't connect to MySQL server"

```bash
# Verificar que MySQL esté corriendo
sudo systemctl status mysql

# Verificar puerto
sudo netstat -tlnp | grep 3306

# Ver logs de MySQL
sudo tail -f /var/log/mysql/error.log
```

### Error: "Access denied for user"

```sql
-- Verificar permisos del usuario
SHOW GRANTS FOR 'brain_user'@'%';

-- Recrear usuario si es necesario
DROP USER 'brain_user'@'%';
CREATE USER 'brain_user'@'%' IDENTIFIED BY 'NuevaPassword';
GRANT ALL PRIVILEGES ON brain_db.* TO 'brain_user'@'%';
FLUSH PRIVILEGES;
```

### Error: "Connection timeout"

```bash
# Verificar firewall
sudo ufw status

# Verificar que bind-address esté en 0.0.0.0
grep bind-address /etc/mysql/mysql.conf.d/mysqld.cnf
```

---

## Seguridad y Mejores Prácticas

### 1. Usar Contraseñas Seguras

```bash
# Generar contraseña segura
openssl rand -base64 32
```

### 2. Implementar JWT para Autenticación

```javascript
const jwt = require('jsonwebtoken');

// Generar token
const token = jwt.sign(
  { userId: user.id, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: '24h' }
);
```

### 3. Hashear Contraseñas

```javascript
const bcrypt = require('bcrypt');

// Al registrar usuario
const hashedPassword = await bcrypt.hash(password, 10);

// Al verificar login
const isValid = await bcrypt.compare(password, user.password);
```

### 4. Usar Variables de Entorno

**Nunca** hardcodear credenciales en el código. Usar siempre archivos `.env`.

---

## Resumen de Credenciales

| Componente | Host | Puerto | Usuario | Password |
|------------|------|--------|---------|----------|
| MySQL | host.docker.internal | 3306 | brain_user | TuPasswordSeguro123! |
| Backend API | localhost | 5000 | - | - |
| Frontend | 189.206.165.237 | 3000 | - | - |

---

## Referencias

- [MySQL 8.0 Documentation](https://dev.mysql.com/doc/refman/8.0/en/)
- [Docker Networking](https://docs.docker.com/network/)
- [Express.js](https://expressjs.com/)
- [JWT](https://jwt.io/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)

---

**Última actualización:** Noviembre 2025  
**Mantenido por:** Equipo Brain ERP
