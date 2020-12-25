
const {response, request} = require('express'); 
const Evento = require('../models/Evento')

const getEventos = async (req = request, res = response) => {

    const eventos = await Evento.find({})
                                .populate('user', 'name');

    res.status(200).json({
        ok: true,
        eventos
    });

}

const crearEvento = async (req = request, res = response) => {

    const evento = new Evento(req.body);

    try {

        evento.user = req.uid;
        
        const newEvent = await evento.save();

        res.status(200).json({
            ok: true,
            evento: newEvent
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })
    }

}

const actualizarEvento = async (req = request, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {
        
        const evento = await Evento.findById(eventId);

        if(!evento){
            return res.status(404).json({
                ok: false,
                msg: `Evento no existe por este id ${eventId}`
            });
        }

        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            })
        }

        const newEventAct = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate( eventId, newEventAct, { new: true});

        return res.status(200).json({
            ok: true,
            evento: eventoActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }
}

const eliminarEvento = async (req = request, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {
        
        const evento = await Evento.findById(eventId);
    
        if(!evento){
            return res.status(404).json({
                ok: false,
                msg: `El evento con este id ${eventId} no existe`
            });
        }
    
        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tienes privilegios para hacer esta accion'
            })
        }
        
        const eventDeleted = await Evento.findByIdAndRemove(eventId);
    
        return res.status(200).json({
            ok: true,
            msg: 'Evento Eliminado',
            eventDeleted 
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error habla con el admin'
        })
    }
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}