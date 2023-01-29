const { Router } = require('express'); //isntacncia de rutas
const { check } = require('express-validator')
const {validarCampos} = require("../middlewares/validar-campos");
const {validarJWT} = require("../middlewares/validar-jwt");
const {crearPersonaje, personajesDelUsuario} = require("../controllers/personaje");

const router = Router();
//Crear usuario
router.post('',
    [
        validarJWT,
        check('nombre', "El nombre es Obligatorio").not().isEmpty(),
        check('especie', "El especie es Obligatorio").not().isEmpty(),
        check('genero', "El genero es obligatorio").not().isEmpty(),
        check('estado', "El estado es obligatorio").not().isEmpty(),
        validarCampos
    ]
    ,crearPersonaje);


router.get('/usuario',
    [
            validarJWT,
            validarCampos
    ]
    , personajesDelUsuario);



module.exports = router;
