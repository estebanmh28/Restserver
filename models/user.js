const { Schema, model } = require('mongoose');
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido'],

    },
    correo: {
        type: String,
        required: [true, 'El correo es requerido'],
        unique: true,
    },
    password: {
        type: String,
    },
    estado: {
        type: Boolean,
        default: true
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE'],
        default: 'USER_ROLE',


    }


})


module.exports = model('Usuario', UsuarioSchema)