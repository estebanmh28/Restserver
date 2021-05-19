const { Router } = require('express');
const {
    CategoriaGet,
    CategoriaPost,
    CategoriaPut,
    CategoriaDelete,

} = require('../controllers/categoria');

const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/:id', validarJWT, CategoriaGet);

router.post('/', validarJWT, CategoriaPost);

router.put('/:id', validarJWT, CategoriaPut);

router.delete('/:id', validarJWT, CategoriaDelete);
module.exports = router;