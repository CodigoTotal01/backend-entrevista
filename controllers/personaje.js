const Personaje = require('../models/personajes')
const {response} = require("express");



const crearPersonaje = async (req, res = response) => {
    const uid = req.uid;


    const personaje = new Personaje({
        usuario: uid,
        ...req.body
    });

    try{
        //por si ya existe en la lista
        const existePersonaje = await Personaje.findOne({nombre: personaje.nombre, usuario: personaje.usuario});
        if (existePersonaje) {
            return res.status(400).json({
                ok: false,
                msg: `Ya se a añadido a tu lista ${personaje.nombre}`
            });
        }
        await personaje.save();

      return  res.json({
            ok: true,
            personaje
        })
    }catch (error){
       return res.status(500).json({
            ok: false,
            msg: "No se pudo agregar el personaje a tu lista"
        })
    }
}

const personajesDelUsuario = async (req, res = response) => {

    const uid = req.uid;

    try{
        const personajes = await Personaje.find({usuario: uid});

        return  res.json({
            ok: true,
            personajes
        })
    }catch (error){
        return res.status(400).json({
            ok: false,
            msg: "No se pudo mostrar los personajes"
        })
    }

}

const buscarPersonajesDelUsuario = async (req, res = response) => {
    const uid = req.uid;
    const { nombre  } = req.params;

    const regex = new RegExp(nombre, 'i');  //Expresion regular para ignorar mayusculas y minusculas

    try{
        const personajes = await Personaje.find({nombre: regex, usuario: uid});

        return  res.json({
            ok: true,
            personajes,
        })
    }catch (error){
        return res.status(400).json({
            ok: false,
            msg: "No se pudo mostrar los personajes"
        })
    }

}


module.exports = {
   crearPersonaje,
    personajesDelUsuario,
    buscarPersonajesDelUsuario
}