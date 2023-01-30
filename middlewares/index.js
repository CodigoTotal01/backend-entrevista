const validarJWT = require('../middlewares/validar-jwt');
const validaCampos= require('../middlewares/validar-campos');
module.exports = {
    ...validaCampos,
    ...validarJWT,
}