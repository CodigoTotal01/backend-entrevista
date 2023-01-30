const { Router } = require('express'); //isntacncia de rutas
const { check } = require('express-validator')
const {validarCampos} = require("../middlewares/validar-campos");
const {crearUsuario, actulizarUsuario} = require("../controllers/usuarios");

const router = Router();
//Crear usuario
router.post('',
    [
        //ponemos los campos que deben de venir
        check('nombre', "El nombre es Obligatorio").not().isEmpty(),
        check('nickname', "El nickname es Obligatorio").not().isEmpty(),
        check('password', "El password es obligatorio").not().isEmpty(),
        check('email', "El email es obligatorio").isEmail(),
        validarCampos
    ]
    ,crearUsuario);


router.put('/:id',
    [
        //ponemos los campos que deben de venir
        check('id', 'No es un id valido').isMongoId(),
        check('nombre', "El nombre es obligatorio").not().isEmpty(),
        check('nickname', "El nickname es obligatorio").not().isEmpty(),
        validarCampos
    ]
    , actulizarUsuario);

module.exports = router;