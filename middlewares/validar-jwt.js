const {response, request} = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req = request, res = response, next) => {

    //x-token headers
    const token = req.header('x-token');

    if(!token) {
        return res.status(401).json({
            ok: false,
            msg: 'no hay token en la peticion'
        })
    }

    try {

        const {uid, name} = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.uid = uid;
        req.name = name;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'token no valido'
        });
    }

    next();
}

module.exports = {
    validarJWT
}
