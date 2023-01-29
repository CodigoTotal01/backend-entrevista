const {response} = require("express");


const validarArchivoSubir= (req, res = response, next) =>  {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.imagen) {
        res.status(400).json({ msg: 'No files were uploaded No hay archivos en la peticion' })
        return;
    }

    next();
}


module.exports = {
    validarArchivoSubir
}