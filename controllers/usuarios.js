const Usuario = require('../models/usuarios')
const {response} = require("express");
const bcryptjs = require('bcryptjs')
const {generarJWT} = require("../helpers/jwt");


const crearUsuario = async (req, res = response) => {

    const {email, password, nombre, nickname} = req.body;

    try {

        const existeEmail = await Usuario.findOne({email});

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }


            //verificar si ya existe el nickname
        const existeNickname = await Usuario.findOne({nickname});

        if (existeNickname) {
            return res.status(400).json({
                ok: false,
                msg: 'El nickname ya está registrado'
            });
        }

        //si todo pasa entonces generar usuarios
        const usuario = new Usuario(req.body);


        //encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);

        // Guardar usuario
        await usuario.save();

        //segun lo interpresa moongose
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }

};

const actulizarUsuario = async (req, res = response) => {
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }
        //campos enviados desde el cliente, extraer campos
        const {nickname, nombre } = req.body;


        if (usuarioDB.nickname !== nickname) {
            //cambiar a un correo electronico que existe en mi base de datos
            const existeNickname = await Usuario.findOne({nickname});

            if (existeNickname) {
                return res.status(400).json({
                    ok: false, msg: "Ya existe un usuario con este nickname"
                })
            }
        }

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, {nickname, nombre}, {new: true});


        res.status(200).json({
            ok: true,
            usuario: usuarioActualizado
        });

    } catch
        (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: "Error al intentar actualizar al usuario"
        });
    }

};

module.exports = {
    crearUsuario,
    actulizarUsuario
}
