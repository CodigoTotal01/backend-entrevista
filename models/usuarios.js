const {Schema, model} = require('mongoose')

//Nombre completo del usuario, nickname, email y contraseña.
const UsuarioSchema = Schema({
    nombre:{
        type: String,
        required: true
    },
    nickname:{
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    }
});


//Mostrar la informacion necesaria al consultar a la coleccion de usuarios
UsuarioSchema.method('toJSON', function (){
    const {_id, __v, password, ...object} = this.toObject();
    object.uid = _id;
    return object
});


module.exports = model("Usuario", UsuarioSchema);
