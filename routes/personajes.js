/*
* Ruta: /api/personajes
*/
const {Router} = require('express');
const {check} = require('express-validator')
const {validarCampos} = require("../middlewares/validar-campos");
const {validarJWT} = require("../middlewares/validar-jwt");
const {
    crearPersonaje,
    personajesDelUsuario,
    buscarPersonajesDelUsuario
} = require("../controllers/personaje");

const router = Router();


router.post('/',
    [
        validarJWT,
        check('nombre', "El nombre es obligatorio").not().isEmpty(),
        check('calificacion', "La calificación es obligatoria").not().isEmpty(),
        check('comentario', "El comentario es obligatorio").not().isEmpty(),
        check('img', "La imagen es obligatorio").not().isEmpty(),
        validarCampos
    ]
    , crearPersonaje);


router.get('/',
    [
        validarJWT,
        validarCampos
    ]
    , personajesDelUsuario);

router.get('/buscar/:nombre', [validarJWT, validarCampos], buscarPersonajesDelUsuario);


module.exports = router;
