const {response} = require("express");
const Usuario = require('../models/usuarios') // entity > mongoose
const bcryptjs = require('bcryptjs');
const {generarJWT} = require("../helpers/jwt");

const login = async (req, res = response) => {

    const { email, password } = req.body;


    try {
        //verificar email
        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            res.status(404).json({
                ok: false,
                msg: "El correo o contraseña son incorrectos (EM)"
            })
        }


        const validPassword = bcryptjs.compareSync(password, usuarioDB.password); //bollean


        if (!validPassword) {
            res.status(404).json({
                ok: false,
                msg: "El correo o contraseña son incorrectos (PW)"
            })
        }

        const token = await generarJWT(usuarioDB._id); // id or _id

        res.status(200).json({
            ok: true,
            token,
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })
    }
}






module.exports = {
    login
}