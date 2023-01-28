const express = require('express')
require('dotenv').config(); //permite acceder a las constates en el archivo .env
let cors = require('cors') //*
const { dbConnection } = require('../database/config');


class Server{
    constructor() {
        this.app = express()
        this.port = process.env.PORT;
        this.conectarDB();
        this.middlewares();
        this.routes();

        this.paths = {
            auth: '/api/auth',
            usuarios: '/api/usuarios',
            personajes: '/api/personajes',
            review: '/api/review.js',
            uploads: '/api/uploads'
        }


    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json());
    }

    listen(){
        this.app.listen(this.port, ()=> {
            console.log('Servidor corriendo ', this.port);
        })
    }


    routes() {
        //pero mira el path sera como la ruta inicial, fijate en el nombre que se concatena con las nuevas rutas
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        //ruta -> productos
        this.app.use(this.paths.productos, require('../routes/producto'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));

    }


}

module.exports = Server;
