
const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const {generaJWT} = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {

    const { name, email, password } = req.body;

    try {

        let usuario = await Usuario.findOne({ email: email });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: `El usuario ${usuario.email} ya existe con este correo`
            })
        }

        const newUsuario = new Usuario(req.body);

        //encriptar contraseña
        const salt =  bcrypt.genSaltSync(10);
        newUsuario.password = bcrypt.hashSync(password, salt);
        

        await newUsuario.save();

        //generar token
        const token = await generaJWT(newUsuario._id, newUsuario.name);

        return res.status(201).json({
            ok: true,
            uid: newUsuario._id,
            name: newUsuario.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el admin'
        })
    }

}

const loginUsuarios = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email: email });

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: `El usuario no existe con este email`
            })
        }

        //confirmar los password
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            })
        }

        //generea Token
        const token = await generaJWT(usuario._id, usuario.name);

        res.status(200).json({
            ok: true,
            uid: usuario._id,
            name: usuario.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el admin'
        })
    }
}

const revalidarToken = async (req, res = response) => {

    const uid = req.uid;
    const name = req.name;

    //generar un nuevo JWT y retornarlo en esta peticion
    const token = await generaJWT(uid, name); 

    res.json({
        ok: "true",
        uid,
        name,
        token
    });
}

module.exports = {
    crearUsuario,
    revalidarToken,
    loginUsuarios
}