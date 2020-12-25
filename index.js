
const express = require('express');
require('dotenv').config();
const {dbConnection} = require('./database/config');
const cors = require('cors');
const morgan = require('morgan');
//crear el servidor de express
const app = express();

//base de datos
dbConnection();

//cors
app.use(cors());
app.use(morgan('dev'));

//directorio publico
app.use( express.static('public'));


//lectura y parseo del body
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

//escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
})

