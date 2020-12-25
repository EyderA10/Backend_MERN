const express = require('express');

const { check } = require('express-validator');

const router = express.Router();

const { crearUsuario, revalidarToken, loginUsuarios } = require('../controllers/auth');
const validarCampos = require('../middlewares/validar-camps');
const {validarJWT} = require('../middlewares/validar-jwt');

router.post(
    '/sign-up',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario
);

router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuarios
);

router.get('/renew', validarJWT, revalidarToken);

module.exports = router;