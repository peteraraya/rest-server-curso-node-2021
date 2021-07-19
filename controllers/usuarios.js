const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


// GET
const usuariosGet = async (req = request, res = response) => {

  // const { q, nombre = 'no tiene nombre', apikey = 'sin información', page = 1, limit = 1 } = req.query;

  //  estado: true  --> solo regresa usuarios activos

  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  // const usuarios = await Usuario.find(query)
  //   .skip(Number(desde))
  //   .limit(Number(limite));

  // // total de registros
  // const total = await Usuario.countDocuments(query);


  // Solución para enviar una colección de promesas
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
      .skip(Number(desde))
      .limit(Number(limite))
  ]);


  res.status(200).json({
    ok: true,
    msg: 'get Usuarios',
    // resp
    total,
    usuarios
  });
};

// POST
const usuariosPost = async (req = request, res = response) => {

  // extraigo los campos obligatorios
  const { nombre, correo, password, rol } = req.body;

  // Creamos instancia de mongo
  const usuario = new Usuario({ nombre, correo, password, rol });

  // Encriptar la contraseña | genSaltSync : vueltas de dificultad
  const salt = bcryptjs.genSaltSync();
  // aplicamos el hash
  usuario.password = bcryptjs.hashSync(password, salt);


  // Grabamos en bd
  await usuario.save();

  res.status(201).json({
    ok: true,
    msg: 'post API - Controlador',
    usuario
  });
};

const usuariosPut = async (req = request, res = response) => {

  const { id } = req.params;
  // extraigo ( pass, google, correo) que no sufriran modificaniones al actualizar
  const { _id, password, google, correo, ...resto } = req.body;

  // TODO: validar contra bd
  if (password) {
    // Encriptamos la contraseña 
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  // Actualizamos el registro
  const usuario = await Usuario.findByIdAndUpdate(id, resto);


  res.json({
    ok: true,
    msg: 'put API - Controlador',
    id,
    usuario
  });
};

const usuariosPatch = (req = request, res = response) => {
  res.status(500).json({
    ok: true,
    msg: 'patch API - Controlador'
  });
};


const usuariosDelete = async (req = request, res = response) => {

  const { id } = req.params;

  // Fisicamente lo borramos - no se recomienda 
  // const usuario = await Usuario.findByIdAndDelete(id); 

  // se recomienda cambiar estado por temas de integridad
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  res.status(200).json({
    usuario
  });
};





module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete
}