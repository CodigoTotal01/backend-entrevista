const path = require('path');// pra construir un path completo
const fs = require('fs');
const Personaje = require('../models/personajes')
const Usuario = require('../models/usuarios')
const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const {subirArchivo} = require("../helpers/subir-archivo");



const fileUpload = async (req, res = response) => {

        const {id, coleccion} = req.params;

        let modelo;

        switch (coleccion) {
            case 'usuarios':
                modelo = await Usuario.findById(id);

                if (!modelo) {
                    return res.status(400).json({msg: `No existe el usuario con el id: ${id}`})
                }
                break;
            case 'personajes':
                modelo = await Personaje.findById(id);
                if (!modelo) {
                    return res.status(400).json({msg: `No existe el producto con el id: ${id}`})
                }
                break;


            default:
                return res.status(500).json({msg: "se me olvido añadir  una nueva colleccion, hablar con el jefe de proyecto"})
        }

        //Si tiene imagen, borrarla del servidor para sustituirlo con la nueva
        if (modelo.img) {
            const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
            if (fs.existsSync(pathImagen)) {
                fs.unlinkSync(pathImagen);
            }
        }

        // cuando ya no esta la iamgen en el servidor, subir la imagen
        try {
            modelo.img = await subirArchivo(req.files, undefined,coleccion);
        } catch (error) {
            return  res.status(400).json({ok: false, error})
        }

        await modelo.save();
        return res.json({
            ok: true,
            modelo
        })
    }



const cargarImagen= async (req, res = response) => {

    const {id, coleccion} = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({msg: `No existe el usuario con el id: ${id}`})

            }
            break;
        case 'personajes':
            modelo = await Personaje.findById(id);
            if (!modelo) {
                return res.status(400).json({msg: `No existe el personaje con el id: ${id}`})
            }
            break;


        default:
            return res.status(500).json({msg: "se me olvido validar esto"})
    }


    if (modelo.img) {
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if (fs.existsSync(pathImagen)) {
            return res.sendFile(pathImagen)
        }
    }
    //si el modelo no tiene aun una imagen, mostrar una por defecto
    const pathImagenNotFound = path.join(__dirname, '../assets/no-image.jpg');
    return res.sendFile(pathImagenNotFound)
}

module.exports = {
    fileUpload,
    cargarImagen
}