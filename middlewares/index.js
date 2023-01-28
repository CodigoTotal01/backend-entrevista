const validarJWT = require('../middlewares/validar-jwt');
const validaCampos= require('../middlewares/validar-campos');

//constantes que importan tood lo de estos archivos

module.exports = {
    ...validaCampos,
    ...validarJWT,
}