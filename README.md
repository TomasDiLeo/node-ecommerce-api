# Node.js E-Commerce API

API RESTful completa desarrollada con Node.js y Express para la gestión de productos de e-commerce. Este proyecto implementa un sistema backend con autenticación JWT, integración con Firebase Firestore y una arquitectura escalable en capas.

## Descripción del Proyecto

Este es el proyecto final de Backend desarrollado para TechLab, cuyo objetivo es proporcionar una API RESTful segura y escalable para la administración completa del catálogo de productos de una tienda en línea. La aplicación permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los productos, con una capa de autenticación que protege el acceso a los datos almacenados en Firebase Firestore.

La aplicación está desplegada en Vercel: [https://node-ecommerce-api-zeta.vercel.app/](https://node-ecommerce-api-zeta.vercel.app/)

## Características principales

- API RESTful con arquitectura en capas (rutas, controladores, servicios, modelos)
- Autenticación y autorización mediante JWT (JSON Web Tokens)
- Base de datos en la nube con Firebase Firestore
- Gestión completa de productos (CRUD)
- Manejo de errores (404, 401, 403, 400, 500)
- Soporte para CORS (peticiones de origen cruzado)
- Código modular y escalable siguiendo mejores prácticas

## Tecnologías utilizadas

- **Node.js**: Entorno de ejecución de JavaScript
- **Express**: Framework web para Node.js
- **Firebase Firestore**: Base de datos NoSQL en la nube
- **JWT (jsonwebtoken)**: Autenticación basada en tokens
- **CORS**: Middleware para habilitar peticiones de origen cruzado
- **body-parser**: Middleware para parsear el body de las peticiones
- **dotenv**: Gestión de variables de entorno

## Arquitectura del proyecto

El proyecto sigue una arquitectura en capas que separa responsabilidades:

```
node-ecommerce-api
├── .postman
│   └── config.json
├── postman
│   ├── collections
│   │   └── TechLab Products API.postman_collection.json
│   └── globals
│       └── workspace.postman_globals.json
├── src
│   ├── config
│   │   ├── firebase.js
│   │   └── jwt.js
│   ├── controllers
│   │   ├── auth.controller.js
│   │   └── products.controller.js
│   ├── middleware
│   │   ├── auth.middleware.js
│   │   ├── errorHandler.js
│   │   └── errors.middleware.js
│   ├── models
│   │   └── product.model.js
│   ├── routes
│   │   ├── auth.routes.js
│   │   └── products.routes.js
│   ├── services
│   │   ├── auth.service.js
│   │   └── products.service.js
│   └── utils
│       └── errors.js
├── .gitignore
├── index.js
├── package-lock.json
├── package.json
├── TechLab Products API.postman_test_run.json
└── vercel.json

```
## Uso de la API

### Autenticación

Antes de usar los endpoints protegidos, necesitas autenticarte y obtener un token JWT.

**Login**
```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "tu_password"
}
```

Respuesta exitosa:
```json
{
    "message": "Login successful",
    "token": "token",
    "expiresIn": "3600",
    "user": {
        "localId": "Ej7IyHWVnGTQCjSX0kH95Wa9YTo2",
        "email": "admin@admin.com"
    },
    "sucess": true
}
```

### Endpoints de Productos

Todos los endpoints de productos requieren autenticación. Incluye el token en el header:
```
Authorization: Bearer tu_token_jwt
```

**Obtener todos los productos**
```http
GET /api/products
```

Respuesta:
```json
{
    "count": 0,
    "products": [{
	    PRODUCTS
    }],
    "success": true
}
```

**Obtener un producto por ID**
```http
GET /api/products/:id
```

**Crear un nuevo producto**
```http
POST /api/products/create
Content-Type: application/json
Authorization: Bearer tu_token_jwt

{
  "name": "Nuevo Producto",
  "description": "Descripción detallada",
  "price": 149.99,
  "stock": 30,
  "category": "Electrónica",
  "imageUrl": "https://ejemplo.com/imagen.jpg"
}
```

**Eliminar un producto**
```http
DELETE /api/products/:id
Authorization: Bearer tu_token_jwt
```
## Seguridad

### Autenticación con JWT

La aplicación implementa autenticación basada en tokens JWT:

1. El usuario se autentica enviando credenciales al endpoint `/auth/login`
2. Si las credenciales son válidas, se genera un token JWT
3. El cliente debe incluir este token en el header `Authorization` de las peticiones subsiguientes
4. El middleware de autenticación valida el token antes de permitir el acceso a rutas protegidas
5. Firebase se encarga de la autentificación

### Middleware de Autenticación

El middleware verifica:
- Presencia del token en el header Authorization
- Validez del token JWT
- Expiración del token

### Protección de rutas

Las siguientes rutas están protegidas y requieren autenticación:
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products/create`
- `DELETE /api/products/:id`

## Autor

**Tomas Di Leo**
- GitHub: [@TomasDiLeo](https://github.com/TomasDiLeo)
- Proyecto desarrollado como parte del curso de Backend en TechLab

## Agradecimientos

Agradecimientos especiales a TechLab y a los instructores por su guía durante el desarrollo de este proyecto final.

---

Si este proyecto te resulta útil o te sirve de referencia para aprender, no dudes en darle una estrella en GitHub.
