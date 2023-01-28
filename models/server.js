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

        this.app.use('/api/auth', require('../routes/auth'));
        this.app.use('/api/usuarios', require('../routes/usuarios'));
    }


}

module.exports = {Server};
