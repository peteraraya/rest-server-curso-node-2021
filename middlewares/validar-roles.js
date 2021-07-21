const { response } = require('express');


const esAdminRole = (req, res = response, next) => {

  // validación en caso de que falle 
  if (!req.usuario) {
    return res.status(500).json({
      msg: 'Se requiere verificar que el role sin validar el token'
    });
  }

  const { rol, nombre } = req.usuario;

  if (rol != 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `${rol} no tiene los privilegios suficientes para realizar esta acción`
    });
  }

  next();
}

const tieneRole = (...roles) => {

  return (req, res = response, next) => {

    // validación en caso de que falle 
    if (!req.usuario) {
      return res.status(500).json({
        msg: 'Se requiere verificar que el role sin validar el token'
      });
    }

    if (!roles.includes(req.usuario.rol)) {
      return res.status(401).json({
        msg: `El servicio requiere uno de estos roles ${roles}`
      });
    }




    next();
  }

}

module.exports = {
  esAdminRole,
  tieneRole
}