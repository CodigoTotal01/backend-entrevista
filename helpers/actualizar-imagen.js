const Usuario = require('../models/usuarios')
const Personaje = require('../models/personajes')
const fs = require("fs");

const borrarImagen = ( tipo, modelo ) => {
    const pathImagen = path.join(__dirname, '../uploads', tipo, modelo.img);
    if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen); // la elimina en el servidor
    }
}





