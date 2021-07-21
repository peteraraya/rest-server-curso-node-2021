// Protegemos Rutas

const { response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');


const validarJWT = async (req, res = response, next) => {

  const token = req.header('X-token');

  if (!token) {
    return res.status(401).json({
      msg: 'No hay token en la petición',
    });
  }

  try {

    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    // leer el usuario que corresponde al uid
    const usuario = await Usuario.findById(uid);

    // Validación en caso que el usuario sea undefined
    if (!usuario) {
      return res.status(401).json({
        msg: 'Token no válido - usuario no existe en DB',
      });
    }


    // Preguntaremos si el usuario no ha sido borrado
    // Verificamos si el uid tiene el estado true al
    if (!usuario.estado) {
      return res.status(401).json({
        msg: 'Token no válido - usuario estado:false',
      });
    }

    req.usuario = usuario;

    next();

  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'Token no valido'
    });
  }

}


module.exports = {
  validarJWT
}