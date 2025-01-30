# API - NoSQL - Docker

## Descripción

Proyecto de API con NestTS, MongoDB y Docker.

## Setup

Se require tener instalado Docker y Docker Compose, posiblemente WSL2 corriendo si estás en Windows.

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
