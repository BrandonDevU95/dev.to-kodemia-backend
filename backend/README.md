# Proyecto de Backend del Clon de Dev.to

Este repositorio contiene el código del backend para un clon de la plataforma Dev.to, desarrollado con Node.js, Express y MongoDB. El objetivo es proporcionar una API robusta para gestionar usuarios, publicaciones y marcadores, utilizando técnicas modernas de autenticación y manejo de datos.

## Instalación

Sigue estos pasos para instalar y ejecutar el proyecto en tu entorno local:

1. **Clona el repositorio**:

    ```bash
    git clone https://github.com/BrandonDevU95/dev.to-kodemia-backend.git
    cd dev.to-kodemia-backend
    ```

2. **Instala las dependencias**:

    ```bash
    npm install
    ```

3. **Configura las variables de entorno**:

    Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables:

    ```env
    DB_USER=
    DB_PASS=
    DB_HOST=
    DB_NAME=
    PORT=
    IP_SERVER=
    JWT_SECRET=
    ```

4. **Inicia el servidor**:

    ```bash
    npm run dev
    ```

    El servidor estará corriendo en `http://localhost:3000` o el puerto que hayas configurado en tu archivo `.env`.

## Endpoints Disponibles

### Autenticación

-   **POST /signup**: Registra un nuevo usuario.

    ```json
    {
    	"name": {
    		"firstname": "jimmie",
    		"lastname": "klein"
    	},
    	"password": "klein*#%*",
    	"email": "jimmie@gmail.com",
    	"username": "jimmie_k",
    	"phone": "1-570-236-7033",
    	"address": {
    		"city": "fort wayne",
    		"street": "oak lawn ave",
    		"number": 526,
    		"zipcode": 102564532
    	},
    	"avatar": "https://avataaars.io/?avatarStyle=Circle&topType=WinterHat3&accessoriesType=Round&hatColor=PastelGreen&hairColor=BrownDark&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=BlazerShirt&clotheColor=Blue02&eyeType=Happy&eyebrowType=DefaultNatural&mouthType=Grimace&skinColor=Tanned",
    	"about": "Ingeniero de software enfocado en la seguridad informática y la criptografía || Me fascina resolver problemas complejos con Python, C++ y Java || Aficionado a los retos de programación y los juegos de mesa."
    }
    ```

    ```

    ```

-   **POST /login**: Autentica a un usuario y genera un token JWT.

    ```json
    {
    	"username": "ejemplo",
    	"password": "contraseña"
    }
    ```

    o

    ```json
    {
    	"username": "ejemplo@correo.com",
    	"password": "contraseña"
    }
    ```

### Publicaciones

-   **POST /posts**: Crea una nueva publicación.

    ```json
    {
    	"title": "Introducción a React Hooks: Cómo utilizar useState y useEffect",
    	"description": "Aprende los conceptos básicos de React Hooks y cómo utilizar useState y useEffect para gestionar el estado y los efectos en tus aplicaciones React.",
    	"category": "React",
    	"tags": ["React", "Hooks", "useState", "useEffect"],
    	"readingTime": "8 minutos",
    	"image": "https://picsum.photos/id/66/650/275",
    	"numReactions": 42,
    	"numComments": 8,
    	"relevant": false
    }
    ```

-   **GET /posts**: Obtiene todas las publicaciones.

-   **GET /posts/:id**: Obtiene una publicación específica por ID.

-   **PATCH /posts/:id**: Actualiza una publicación por ID.

    ```json
    {
    	"relevant": false,
    	"updated_at": 1717868961832
    }
    ```

-   **DELETE /posts/:id**: Elimina una publicación por ID.

### Usuarios

-   **GET /user/:id**: Obtiene la información de un usuario específico por ID.

### Marcadores

-   **POST /bookmarks**: Crea un nuevo marcador.

    ```json
    {
    	"post_id": "66630abcc026c7cd77fc2bb4"
    }
    ```

-   **GET /bookmarks**: Obtiene todos los marcadores del usuario autenticado.

-   **GET /bookmarks/:post_id**: Obtiene un marcador específico por ID del post.

-   **DELETE /bookmarks/:post_id**: Elimina un marcador por ID del post.

## Tecnologías Utilizadas

-   **Node.js**: Entorno de ejecución para JavaScript en el servidor.
-   **Express**: Framework para Node.js que facilita la creación de aplicaciones web.
-   **MongoDB y Mongoose**: Base de datos NoSQL y ODM (Object Data Modeling) para MongoDB.
-   **JWT (JSON Web Tokens)**: Para la autenticación basada en tokens.
-   **Bcrypt**: Para el hashing de contraseñas.
-   **Zod**: Para la validación de esquemas.

## Contribución

¡Siéntete libre de contribuir al proyecto! Puedes abrir un problema para informar sobre errores o sugerir nuevas características. También puedes enviar solicitudes de extracción con mejoras o correcciones de código.

## Licencia

Este proyecto está bajo la licencia ISC, lo que significa que puedes utilizarlo, modificarlo y distribuirlo libremente, siempre y cuando se mantenga el aviso de licencia original.

---

¡Esperamos que encuentres útil esta API para tu clon de Dev.to! Si tienes alguna pregunta o sugerencia, no dudes en ponerte en contacto con nosotros. ¡Gracias por tu interés en nuestro proyecto!
