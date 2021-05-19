const { response, request } = require('express');
const Usuario = require('../models/user');
const bcrypt = require('bcryptjs');

const { check, validationResult } = require('express-validator');


const usuariosGet = async(req = request, res = response) => {
    const usuarios = await Usuario.find();
    res.json({
        msg: 'API - GET',
        usuarios,
    });
}

const usuariosPost = async(req = request, res = response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors,
        })
    }

    const { nombre, correo, password, estado, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, estado, rol });
    /* const { role } = Usuario({ rol });
     if (role != 'ADMIN_ROLE' || 'USER_ROLE') {
         return res.status(400).json({
             msg: 'Rol no valido',
         })


     }*/

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    //Correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        return res.status(400).json({
            msg: 'Usuario ya existe en la base de datos',
        });
    }
    //ValidaRol
    const token = req.header('x-token');
    const rolValidar = await Usuario.findOne(token, { rol });
    if (rolValidar != 'ADMIN_ROLE') {
        return res.status(400).json({
            msg: 'Rol no valido para crear usuarios'
        });
    }




    usuario.save();
    res.json({
        msg: 'API - POST',
        existeEmail,
        usuario,
    });
}

const usuriosPut = async(req = request, res = response) => {
    const id = req.params.id;
    let { password, ...resto } = req.body;

    const salt = bcrypt.genSaltSync();
    password = bcrypt.hashSync(password, salt);
    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'API - PUT',
        id,
        usuario,
    });
}
const usuariosDelete = async(req = request, res = response) => {
    // const usuario = await Usuario.findByIdAndDelete(id);
    const id = req.params.id;
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
    res.json({
        msg: 'API - DELETE',
        usuario,
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuriosPut,
    usuariosDelete
}