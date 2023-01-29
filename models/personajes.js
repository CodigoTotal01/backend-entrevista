const {Schema, model} = require('mongoose')

//Nombre completo del usuario, nickname, email y contraseña.
const PersonajesSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    especie: {
        type: String,
        required: true,
    },
    genero: {
        type: String,
        required: true,
    },
    estado: {
        type: String,
        required: true,
    },
    usuario: {
        required: true,
        ref: 'Usuario',
        type: Schema.Types.ObjectId,
    },
    review: {
        ref: 'Review',
        type: Schema.Types.ObjectId,
    },
    img: {
        type: String,
    },
});


//Mostrar la informacion necesaria al consultar a la coleccion de usuarios
PersonajesSchema.method('toJSON', function () {
    const {__v, ...object} = this.toObject();
    return object
});


module.exports = model("Personaje", PersonajesSchema);