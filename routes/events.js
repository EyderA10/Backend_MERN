

const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const {isDate} = require('../helpers/isDate');
const validarCampos  = require('../middlewares/validar-camps');
const {validarJWT} = require('../middlewares/validar-jwt')
const {getEventos, crearEvento, actualizarEvento, eliminarEvento} = require('../controllers/events');

router.use(validarJWT);

router.get('/', getEventos);

router.post(
    '/', 
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de Inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
        validarCampos
    ],  
    crearEvento
    )

router.put('/:id', actualizarEvento)

router.delete('/:id', eliminarEvento)

module.exports = router

