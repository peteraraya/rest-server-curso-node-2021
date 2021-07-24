const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
// Models
const Usuario = require('../models/usuario');
// helpers
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');


const login = async (req = request, res = response) => {

  const { correo, password } = req.body;

  try {

    // Verificar si el Email existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - correo '
      });
    }

    // Verificar si el usuario está activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - estado:false '
      });
    }

    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - password '
      });
    }

    // Generar el JWT
    const token = await generarJWT(usuario.id);


    res.json({
      usuario,
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Hable con el administrador'
    });
  }
}

const googleSignIn = async (req, res = response) => {
  const id_token = req.body.id_token || '';

  try {
    const { correo, nombre, img } = await googleVerify(id_token);

    let usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      // Tengo que crearlo
      const data = {
        nombre,
        correo,
        password: ':p',
        img,
        goole: true,
      };

      usuario = new Usuario(data);
      await usuario.save();
    }

    // Si el usuario en db tiene su estado en false vamos a negar su autenticación
    if (!usuario.estado) {
      return res.status(401).json({
        msg: 'Hable con el administrador, usuario bloqueado'
      });
    }

    // Generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token
    });

  } catch (error) {
    res.status(400).json({
      msg: 'Token de google no válido'
    });
  }

}

module.exports = {
  login,
  googleSignIn,
};

