const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = '/api/usuarios';

    // Conectar a la base de datos
    this.conectarDB();


    // Middlewares
    this.middlewares();

    // Rutas de la aplicación
    this.routes();
  }

  middlewares() {

    // Cors
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

    // Directorio público
    this.app.use(express.static('public'));

  }


  routes() {

    // Llamar las Rutas con middleware
    this.app.use(this.usuariosPath, require('../routes/usuarios'));

  }

  async conectarDB() {

    await dbConnection();

  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto http://localhost:${this.port}`);
    });
  }

}


module.exports = Server;