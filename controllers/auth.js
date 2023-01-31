const {response} = require("express");
const Usuario = require('../models/usuarios');
const bcryptjs = require('bcryptjs');
const {generarJWT} = require("../helpers/jwt");

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        //verificar email
        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
           return res.status(404).json({
                ok: false,
                msg: "El correo o contraseña son incorrectos"
            })
        }

        //verificar contraseña
        const validPassword = bcryptjs.compareSync(password, usuarioDB.password); //bollean


        if (!validPassword) {
            res.status(404).json({
                ok: false,
                msg: "El correo o contraseña son incorrectos (PW)"
            })
        }

        const token = await generarJWT(usuarioDB._id);

        return res.status(200).json({
            ok: true,
            token,
            usuarioDB
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })
    }
}

//Encargada de renovar el token del usuario
const renewToken = async (req, res = response) => {
    const uid = req.uid;
    const token = await generarJWT(uid);
    try {
        const usuarioDB = await Usuario.findById(uid);
        return res.json({
            ok: true,
            token,
            usuarioDB
        })

    } catch (err) {
        return res.status(400).json({
            ok: false,
            msg: "No existe el cliente con ese id"
        })
    }
}





module.exports = {
    login,
    renewToken
}