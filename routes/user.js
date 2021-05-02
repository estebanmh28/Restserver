const { Router } = require('express');
const {
    usuariosGet,
    usuariosPost,
    usuriosPut,
    usuariosDelete
} = require('../controllers/user');

const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, usuariosGet);

router.post('/', validarJWT, [check('correo', 'El correo no es valido').isEmail()], usuariosPost);

router.put('/:id', usuriosPut);

router.delete('/:id', usuariosDelete);



module.exports = router;