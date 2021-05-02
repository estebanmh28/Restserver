const { response, request } = require("express");

//const Usuario = require('../models/user');
//const existeRol = Usuario.findOne({ rol });

const validarRol = (req = request, res = response, next) => {
    const rols = req.header.Usuario.findOne(rol);
    console.log(rols);
    if (rols != 'ADMIN_ROLE') {
        return res.status(400).json({
            msg: 'Solo el Admin tiene permisos para este proceso'
        });
    }


}
module.exports = {
    validarRol
}