//una simple funcion con enex -> si se cumple pasa al controllador
//! ellos si pueden enviar las respuestas, al cambio las validaciones empleancdo el check por lo generar retornan un boejeto disitnto con errrores
const { request, response } = require("express")
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarios')


const validarJWT = async(req = request, res = response, next) => {
    //header re, prams-en el enlace, body req
    const token = req.header('x-token'); //! token debe ser siempre enviado por el header -> leer header, iniicdica el nombre
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }
    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById(uid);

        if(!usuario){
            return res.status(401).json({
                msg: "Usuario no existe"
            })
        }

        if(!usuario.estado){
            return res.status(401).json({
                msg: "token no valido - usuario con estado false "
            })
        }
        req.usuario = usuario;

        next();
    } catch (error) {

        return res.status(401).json({
            msg: 'El token enviado no es valido'
        });
    }
}

module.exports = {
    validarJWT
}
