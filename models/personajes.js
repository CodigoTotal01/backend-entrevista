const {Schema, model} = require('mongoose')

//Nombre completo del usuario, nickname, email y contraseña.
const PersonajesSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    calificacion: {
        required: true,
        type: Number,
    },
    comentario: {
        required: true,
        type: String,
    },
    img: {
        type: String,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});


//Mostrar la informacion necesaria al consultar a la coleccion de usuarios
PersonajesSchema.method('toJSON', function () {
    const {__v, ...object} = this.toObject();
    return object
});


module.exports = model("Personaje", PersonajesSchema);