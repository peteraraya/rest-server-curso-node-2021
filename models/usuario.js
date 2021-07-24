
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
  },
  correo: {
    type: String,
    required: [true, 'El correo es obligatorio'],
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: [true],
    default: 'USER_ROLE',
    enum: ['ADMIN_ROLE', 'USER_ROLE'],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

// * Tiene que ser una función normal si no no funcionará*
UsuarioSchema.methods.toJSON = function () {
  // Ocultamos campos
  const { __v, password, _id, ...usuario } = this.toObject();
  usuario.uid = _id;
  return usuario;

}

module.exports = model('Usuario', UsuarioSchema);

/** Esto vamos
 * nombre : 'kdjdkjdlsf,
 * correo : 'hsdfjkdhksf@dfkjdfk.com,
 * password :'437382678342',
 * img:'jsdkjdskdfjksl',
 * rol:234234,
 * estado:false
 * google:false
 */