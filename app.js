require('dotenv').config();
const Server = require('./models/server');


// LLamamos nuestra clase
const server = new Server();


server.listen();