

const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPost, usuariosPut, usuariosPatch, usuariosDelete } = require('../controllers/usuarios');
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
// optimización de importaciones
const {
  validarCampos, validarJWT, esAdminRole, tieneRole
} = require('../middlewares')



const router = Router();

// GET
router.get('/', usuariosGet);

// POST
router.post('/', [
  // arreglo de middlewares
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password debe ser de más de 6 letras').isLength({ min: 6 }),
  check('correo', 'El correo no es válido').isEmail(),
  check('correo').custom(emailExiste),
  // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('rol').custom(esRolValido), // como es un callback con un argumento se puede obviar
  validarCampos
], usuariosPost);

// PUT
router.put('/:id', [
  check('id', 'No es un id válido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  check('rol').custom(esRolValido), // como es un callback con un argumento se puede obviar
  validarCampos
], usuariosPut);

// DELETE
router.delete('/:id', [
  validarJWT,
  // esAdminRole,
  tieneRole('ADMIN_ROLE', 'USER_ROLE', 'OTRO_ROL'),
  check('id', 'No es un id válido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  validarCampos
], usuariosDelete);



// Patch
router.patch('/', usuariosPatch);





module.exports = router;