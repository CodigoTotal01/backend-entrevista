const {Schema, model} = require('mongoose')

//Nombre completo del usuario, nickname, email y contraseña.
const PersonajesSchema = Schema({
    nombreSerie: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    ocupaciones: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    review: {
        ref: 'Review',
        type: Schema.Types.ObjectId,
    },
    usuario: {
        required: true,
        ref: 'Usuario',
        type: Schema.Types.ObjectId,
    }
});


//Mostrar la informacion necesaria al consultar a la coleccion de usuarios
PersonajesSchema.method('toJSON', function () {
    const {__v, ...object} = this.toObject();
    return object
});


module.exports = model("Personajes", PersonajesSchema);