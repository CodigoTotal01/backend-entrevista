
const jwt = require('jsonwebtoken')



//debemos esperar este proceso antes de continuar
const generarJWT = async (uid) => {


    return new Promise((resolve, reject) => {
        const payload = {
            uid
        }
        jwt.sign(payload, process.env.JWT_SCRET,{
            //duracion
            expiresIn: '12h'
        }, (err, token) => {
            if(err){
                reject(err);
            }else{
                resolve(token);
            }
        });
    })

}

module.exports = {
    generarJWT
}