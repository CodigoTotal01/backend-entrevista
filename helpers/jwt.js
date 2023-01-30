const jwt = require('jsonwebtoken')

const generarJWT = async (uid) => {

    return new Promise((resolve, reject) => {
        const payload = {
            uid
        }
        jwt.sign(payload, process.env.JWT_SCRET,{
            expiresIn: '12h'//duracion
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