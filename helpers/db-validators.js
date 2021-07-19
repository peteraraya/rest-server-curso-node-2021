const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async (rol = '') => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado en la base de datos `);
  }

}

const emailExiste = async (correo = '') => {

  // Verificar si el correo existe
  const existeEmail = await Usuario.findOne({ correo });

  if (existeEmail) {
    throw new Error(`El correo ${correo} ya está registrado en la aplicación`);
  }

}

const existeUsuarioPorId = async (id) => {
  // Verifica si el usuario existe
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El id ${id} no existe en la aplicación`);
  }
}

module.exports = {
  esRolValido,
  emailExiste,
  existeUsuarioPorId
}