const jwt = require('jsonwebtoken')
const { response } = require("express");


const validarJWT = (req, res = response, next) => {
    const token = req.header('x-token');
    try {
        const { uid } = jwt.verify(token, process.env.JWT_SCRET);
        req.uid = uid;

        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            errors: "El token no es valido"
        });
    }

}

module.exports = { validarJWT }
