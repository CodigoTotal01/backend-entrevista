const path = require('path');// pra construir un path completo
const fs = require('fs');
const Personaje = require('../models/personajes')
const Usuario = require('../models/usuarios')
const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');
const {subirArchivo} = require("../helpers/subir-archivo");



const fileUpload = async (req, res = response) => {

        const {id, coleccion} = req.params;
        let modelo;

        switch (coleccion) {
            case 'usuarios':
                modelo = await Usuario.findById(id);
                //
                // if (!model) {
                //     return res.status(400).json({msg: `No existe el usuario con el id: ${id}`})
                // }
                break;
            case 'personajes':
                modelo = await Personaje.findById(id);
                // if (!model) {
                //     return res.status(400).json({msg: `No existe el producto con el id: ${id}`})
                // }
                break;


            default:
                return res.status(500).json({msg: "se me olvido validar esto"})
        }

        //si existe, trae consigo la imagen -> eliminar la anterio

        if (modelo.img) {
            //Borrar de del servidor
            const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
            if (fs.existsSync(pathImagen)) {
                fs.unlinkSync(pathImagen); // la elimina en el servidor
            }
        }

        //! despues de eliminarlo recien se añade ña nueva
        try {

            modelo.img = await subirArchivo(req.files, undefined,coleccion);
        } catch (error) {
            console.log(error)
            return  res.status(400).json({error: "se malogro"})
        }

        await modelo.save();
    return res.json({modelo})
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

    //si existe, trae consigo la imagen -> eliminar la anterior
    if (modelo.img) {
        //Borrar de del servidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if (fs.existsSync(pathImagen)) {
            return res.sendFile(pathImagen) //retornar u narchivo
        }
    }
    const pathImagenNotFound = path.join(__dirname, '../uploads/no-image.jpg');

    return res.sendFile(pathImagenNotFound) //retornar u narchivo
}

module.exports = {
    fileUpload,
    cargarImagen
}