const Review = require('../models/review')
const Personaje = require('../models/personajes')
const {response} = require("express");




const crearReview = async (req, res = response) => {
    const uid = req.uid;
    const {personaje} = req.body

    console.log(personaje)




    try{
        //por si ya existe en la lista
        const personajeBD = await Personaje.findOne({nombre: personaje});
        if (!personajeBD) {
            return res.json({
                ok: false,
                msg: "No existe el personaje, añadir uno valido"
            })
        }
        //si existe el usuario y el personaje


        const review = new Review(
            {
                usuario: uid,
                ...req.body,
                personaje: personajeBD
            }
        )


        await review.save();

        res.json({
            ok: true,
            review
        })
    }catch (error){

        res.status(500).json({
            ok: false,
            msg: "No se pudo agregar la review a tu personaje",

        })
    }
}


module.exports = {
    crearReview
}