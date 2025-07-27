# PSI Backend

Backend del proyecto PSI desarrollado con Node.js y NestJS Framework.

## 📋 Descripción

Este proyecto es una API REST construida con **NestJS** que proporciona los servicios backend para la aplicación PSI. Incluye una configuración completa con base de datos PostgreSQL utilizando Docker.

## 🛠️ Tecnologías

- **Node.js**
- **NestJS Framework**
- **PostgreSQL**
- **Docker & Docker Compose**

## 📦 Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Node.js](https://nodejs.org/) (versión 16 o superior)
- [npm](https://www.npmjs.com/)

## 🚀 Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd psi-backend
```

### 2. Levantar la base de datos

El proyecto incluye un archivo `docker-compose.yml` que configura automáticamente la base de datos PostgreSQL.

```bash
docker compose up -d
```

Una vez ejecutado este comando, la base de datos estará disponible con la siguiente configuración:
- **Host:** localhost
- **Puerto:** 5435
- **Base de datos:** psi_backend
- **Usuario:** postgres
- **Contraseña:** postgres

### 3. Instalar dependencias

```bash
npm install
```

### 4. Ejecutar el proyecto

Para ejecutar el proyecto en modo desarrollo:

```bash
npm run start:dev
```

El servidor estará disponible en `http://localhost:3000`

## 📚 Documentación de la API

Para facilitar las pruebas y el desarrollo, puedes acceder a la colección de Postman con todos los endpoints disponibles:

**[🔗 Colección de Postman](https://www.postman.co/workspace/My-Workspace~8189cc6c-4eb7-4aa9-8da5-b352c59f9363/collection/7086086-b34ce004-e434-456e-bfde-3c655fb68fab?action=share&creator=7086086)**

## 🐳 Comandos Docker útiles

```bash
# Levantar los contenedores
docker compose up -d

# Ver logs de los contenedores
docker compose logs

# Detener los contenedores
docker compose down

# Detener y eliminar volúmenes (elimina datos de la BD)
docker compose down -v
```

## 📝 Scripts disponibles

```bash
# Desarrollo
npm run start:dev

```

## 🗄️ Configuración de base de datos

La configuración de la base de datos se encuentra en el archivo `docker-compose.yml`. Si necesitas modificar algún parámetro, puedes hacerlo editando este archivo.

### Configuración actual:
- **Imagen:** PostgreSQL
- **Puerto:** 5435
- **Base de datos:** psi_backend
- **Usuario:** postgres
- **Contraseña:** postgres

