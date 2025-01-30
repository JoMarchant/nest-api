# API - NoSQL - Docker

## Descripción

Proyecto de API con NestTS, MongoDB y Docker.

## Setup

Se require tener instalado Docker y Docker Compose, posiblemente WSL2 corriendo si estás en Windows.

También hay que crear un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

```bash
MONGO_URI=mongodb://database:27017
MONGO_DB_NAME={nombre de la base de datos}
MONGO_USER={usuario}
MONGO_PASSWORD={contraseña}

PORT={puerto de la api}
```

## Para correr localmente

Con este comando el proyecto se ejecutará en modo development con hot-reload para los cambios en el código.

```bash
# development
$ docker-compose up
```

## Para ejecutar tests

```bash
# unit tests
$ docker-compose run --rm api npm run test

# test coverage
$ docker-compose run --rm api npm run test:cov
```

## API

### /

#### GET

Obtiene un mensaje de bienvenida.

### /messages

Algunos endpoint que dispone la API.

#### GET

Obtiene todos los mensajes.

#### POST

Crea un nuevo mensaje.

- Ejemplo de body:

```json
{
  "content": "Hello World",
  "authorEmail": "john@example.com"
}
```
