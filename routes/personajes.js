const {Router} = require('express'); //isntacncia de rutas
const {check} = require('express-validator')
const {validarCampos} = require("../middlewares/validar-campos");
const {validarJWT} = require("../middlewares/validar-jwt");
const {
    crearPersonaje,
    personajesDelUsuario,
    buscarPersonajeDelUsuario
} = require("../controllers/personaje");

const router = Router();
//Crear usuario
router.post('',
    [
        validarJWT,
        check('nombre', "El nombre es Obligatorio").not().isEmpty(),
        check('calificacion', "La calificacion es Obligatorio").not().isEmpty(),
        check('comentario', "El comentario es obligatorio").not().isEmpty(),
        validarCampos
    ]
    , crearPersonaje);


router.get('/personajes_usuario',
    [
        validarJWT,
        validarCampos
    ]
    , personajesDelUsuario);

router.get('/buscar/:nombre', [validarJWT], buscarPersonajeDelUsuario);


module.exports = router;
