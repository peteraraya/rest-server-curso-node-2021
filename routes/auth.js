const { Router } = require('express');
const { check } = require('express-validator');
// Controller
const { login } = require('../controllers/auth');

const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();


// POST
router.post('/login', [
  check('correo', 'El correo es obligatorio').isEmail(),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
  validarCampos
], login);


module.exports = router;