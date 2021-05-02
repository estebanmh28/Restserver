const { response, request } = require("express");

const Usuario = require('../models/user');
//const existeRol = Usuario.findOne({ rol });
const { check, validationResult } = require('express-validator');

const validarRol = (req = request, res = response, next) => {
    const { rol } = req.body;
    const verificarol = Usuario.findOne({ rol });

    if (verificarol != 'ADMIN_ROLE') {
        return res.status(400).json({
            msg: 'Solo el Admin tiene permisos para este proceso'
        });
    }
    next();

}
module.exports = {
    validarRol
}