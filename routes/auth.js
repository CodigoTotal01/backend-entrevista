const { Router } = require('express'); //isntacncia de rutas
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares');
const router = Router();

router.post('/login',
    [
        check('correo', 'El correo es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        validarCampos
    ], login );

// login

module.exports = router;