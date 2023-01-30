const Usuario = require('../models/usuarios')
const {response} = require("express");
const bcryptjs = require('bcryptjs')
const {generarJWT} = require("../helpers/jwt");


const crearUsuario = async (req, res = response) => {

    const {email, password, nombre, nickname} = req.body;

    try {
        //verificar si ya existe el email que es unico
        const existeEmail = await Usuario.findOne({email});

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        //verificar si ya existe el nickname que es unico
        const existeNickname = await Usuario.findOne({nickname});

        if (existeNickname) {
            return res.status(400).json({
                ok: false,
                msg: 'El nickname ya está registrado'
            });
        }

        //Generar ususiario si son nuevos datos
        const usuario = new Usuario(req.body);

        //encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);

        // Guardar usuario en db
        await usuario.save();

        const token = await generarJWT(usuario.id);

        return res.json({
            ok: true,
            usuario,
            token
        });


    } catch (error) {
        return  res.status(500).json({
            ok: false,
            msg: 'No se pudo crear el usuario'
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
        //datos desde el cliente
        const {nickname, nombre } = req.body;


        if (usuarioDB.nickname !== nickname) {
            const existeNickname = await Usuario.findOne({nickname});

            if (existeNickname) {
                return res.status(400).json({
                    ok: false, msg: "Ya existe un usuario con este nickname"
                })
            }
        }
        //actualizando nickname y nombre (imagen desde otro servicio rest)
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, {nickname, nombre}, {new: true});

        return res.status(200).json({
            ok: true,
            usuario: usuarioActualizado
        });

    } catch (e) {

        return res.status(500).json({
            ok: false,
            msg: "Error al intentar actualizar al usuario"
        });
    }

};

module.exports = {
    crearUsuario,
    actulizarUsuario
}
