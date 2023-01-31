/*
* Ruta: /API/uploads
* */

const {Router} = require('express')
const {validarJWT} = require("../middlewares/validar-jwt");
const {fileUpload, retornaImagen, cargarArchivo, cargarImagen} = require("../controllers/uploads");
const expressFileUpload =require('express-fileupload')
const {check} = require("express-validator");
const {coleccionesPermitidas} = require("../helpers/db-validators");
const {validarCampos} = require("../middlewares/validar-campos");
const {validarArchivoSubir} = require("../middlewares/validar-archivo");



const router = Router();
router.use(expressFileUpload());
router.put('/:coleccion/:id',[
    validarJWT,
    validarArchivoSubir,
    check('id','El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios','personajes'] )),
    validarCampos
] ,fileUpload );




router.get('/:coleccion/:id', [
    check('id','El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios','personajes'] ) ),
    validarCampos
], cargarImagen  );

module.exports = router;
