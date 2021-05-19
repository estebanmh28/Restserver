const { response, request } = require('express');
const Producto = require('../models/producto');

const { check, validationResult } = require('express-validator');


const ProductoGet = async(req = request, res = response) => {
    const producto = await Producto.find();
    res.json({
        msg: 'API - GET - PRODUCTS',
        producto,
    });
}

const ProductoPost = async(req = request, res = response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors,
        })
    }

    const { nombre, disponibilidad, usuario, precio, categoria, descripcion } = req.body;
    const producto = new Producto({ nombre, disponibilidad, usuario, precio, categoria, descripcion });

    //const salt = bcrypt.genSaltSync();
    //usuario.password = bcrypt.hashSync(password, salt);

    //Correo existe
    //  const existeEmail = await Usuario.findOne({ correo });
    //if (existeEmail) {
    //   return res.status(400).json({
    //      msg: 'Usuario ya existe en la base de datos',
    //  });
    // }

    producto.save();
    res.json({
        msg: 'API - POST',
        producto
    });
}


const ProductoPut = async(req = request, res = response) => {

    const id = req.params.id;
    const { nombre, ...resto } = req.body;

    const producto = await Producto.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'API - PUT',
        id,
        producto,
    });

}
const ProductoDelete = async(req = request, res = response) => {
    const id = req.params.id;
    const producto = await Producto.findByIdAndUpdate(id, { disponibilidad: false });
    res.json({
        msg: 'API - DELETE',
        producto,
    });
}
module.exports = {
    ProductoGet,
    ProductoPost,
    ProductoPut,
    ProductoDelete
}