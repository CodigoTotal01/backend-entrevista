const path = require('path');
const { v4: uuidv4 } = require('uuid');
//sube el archivo hacia nuestro servidor
const subirArchivo = ( files, extensionesValidas = ['png','jpg','jpeg'], carpeta = '' ) => {

    return new Promise( (resolve, reject) => {

        const { imagen } = files;
        const nombreCortado = imagen.name.split('.');
        const extension = nombreCortado[ nombreCortado.length - 1 ];


        if ( !extensionesValidas.includes( extension ) ) {
            return reject(`La extensión ${ extension } no es permitida - ${ extensionesValidas }`);
        }

        const nombreTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join( __dirname, '../uploads/', carpeta, nombreTemp );

        imagen.mv(uploadPath, (err) => {

            if (err) {
                reject(err);
            }
            resolve( nombreTemp );

        });

    });

}



module.exports = {
    subirArchivo
}