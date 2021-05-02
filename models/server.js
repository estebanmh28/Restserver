const express = require('express');
const cors = require('cors');
const { dbConectar } = require('../db/config');
//const bodyParser=require('body')
class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/usuarios'
        this.authPath = '/auth'
        this.productosPath = '/productos'
        this.categoriasPath = '/categorias'
            //conectar mongo    
        this.dbConexion();
        // Middlewares
        this.middlewares();
        // Rutas
        this.routes();
    }
    async dbConexion() {
        await dbConectar();

    }
    middlewares() {

        // CORS
        this.app.use(cors());

        //Permite realizar un encoded al traer la data en type text
        this.app.use(express.urlencoded({ extended: true }));

        // Permitir que el body obtenga desde json
        this.app.use(express.json());

        // Servir carpeta publica
        // this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/user'));
        this.app.use(this.productosPath, require('../routes/producto'));
        this.app.use(this.categoriasPath, require('../routes/categoria'))

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }
}
//this.app.use(this.app.router);
//routes.inizialize(this.app);

module.exports = Server;