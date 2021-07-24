# Aplicación WebServer + REST- SERVER

Para iniciar la ejecución del proyecto ``` npm install ``` para reconstruir los modulos de node.

Para inicializar el proyecto 

  ``` npm run start ```  
    ``` npm run start:dev ``` : inicializar con nodemon
### Descripción 

- Creación de un crud de Usuarios
  - endopoints GET, POST, PUT y DELETE 
  - Validaciones
  - Paginación
  - Generación de JWT 
  - Manejo de errores
- Utilización de MongoDB
   - [mongoose](https://www.npmjs.com/package/mongoose)
- Paquetes utilizados
  - [bcryptjs](https://www.npmjs.com/package/bcryptjs)
  - [cors](https://www.npmjs.com/package/cors)
  - [dotenv](https://www.npmjs.com/package/dotenv)
  - [express](https://www.npmjs.com/package/express)
  - [express-validator](https://www.npmjs.com/package/express-validator)
  - [mongoose](https://www.npmjs.com/search?q=mongoose)
  - [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- deploy en heroku
  ### Enlace de producción de backend en Heroku
    [app-node-rest-server-paraya.herokuapp.com](https://app-node-rest-server-paraya.herokuapp.com/)

- Google Sign in  
  - google-auth-library  : 
    `` npm install google-auth-library --save `` 



>Consideraciones importantes
  1. Crear archivo .env con las variables de entornos en el archivo ``` env.example ```
  2. Se generá proyecto con la versión <b>16.5.0</b> de Node.
  3. Se utiliza mongoDB para alamacenar usuarios.