# sandersCRM

Este es un CRM (Customer Relationship Management) para la fundación Sanders.

Omar Sanchez
Nicole Davila
Sofia Moreno

## Requerimientos

Para instalar:

1. Clona el repositorio:
    ```sh
    git clone https://github.com/tu-usuario/sandersCRM.git
    cd sandersCRM
    ```

2. Instala las dependencias del servidor:
    ```sh
    cd api
    npm install
    ```

3. Configura las variables de entorno del servidor:
    - Crea un archivo `.env` en el directorio `api` con el siguiente contenido:
        ```env
        DB_HOST= tu host
PORT= tu puerto
DB_USER= tu usuario
DB_DATABASE= tu base de datos
DB_PASSWORD= tu contraseña
JWT_SECRET= tu secreto JWT
        ```

4. Inicia el servidor:
    ```sh
    npm run dev
    ```

5. Instala las dependencias del cliente:
    ```sh
    cd ../test-admin
    npm install
    ```

6. Configura las variables de entorno del cliente:
    - Crea un archivo `.env` en el directorio `test-admin` con el siguiente contenido:
        ```env
        VITE_JSON_SERVER_URL=https://jsonplaceholder.typicode.com
        VITE_API_URL=https://localhost:/tu_puerto/api
        ```

7. Inicia la aplicación cliente:
    ```sh
    npm run dev
    ```

8. Abre tu navegador y navega a `https://localhost:5173` para ver la aplicación en funcionamiento.

¡Y eso es todo! Ahora deberías tener el proyecto `sandersCRM` corriendo en tu máquina local.