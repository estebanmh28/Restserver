const { Router } = require('express');
const {
    ProductoGet,
    ProductoPost,
    ProductoPut,
    ProductoDelete,

} = require('../controllers/producto');

const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarRol } = require('../middlewares/validar-rol');

const router = Router();

router.get('/:id', validarJWT, ProductoGet);

router.post('/', validarJWT, ProductoPost);

router.put('/:id', validarJWT, ProductoPut);

router.delete('/:id', validarJWT, ProductoDelete);



module.exports = router;