

const { response } = require('express');
const jwt = require('jsonwebtoken');

const generaJWT = ( uid, name) => {

    return new Promise((resolve, reject) => {

        const payload = { uid, name };

        jwt.sign( payload, process.env.JWT_SECRET_KEY, {
            expiresIn: '2h'
        }, (err, token) => {
            if(err){
                console.log(err);
                reject('no se pudo generar el token');

            }

            resolve(token);
        });

    })

}

module.exports= {
    generaJWT
}