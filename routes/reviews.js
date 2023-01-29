const { Router } = require('express'); //isntacncia de rutas
const { check } = require('express-validator')
const {validarCampos} = require("../middlewares/validar-campos");
const {validarJWT} = require("../middlewares/validar-jwt");
const {crearReview} = require("../controllers/review");

const router = Router();
//Crear usuario
router.post('',
    [
        validarJWT,
        check('comentario', "El comentario es Obligatorio").not().isEmpty(),
        check('calificacion', "El calificacion es Obligatorio").not().isEmpty(),
        check('personaje', "El nombre del personaje es Obligatorio").not().isEmpty(),
        validarCampos
    ]
    ,crearReview);



module.exports = router;
