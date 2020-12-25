

const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(`${process.env.DB_CNN}://${process.env.DB_HOST}:${process.env.DB_PORT}/mern_calendar`, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

        console.log('Conectado a la base de datos exitosamente!')
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar de base de datos')
    }
}

module.exports = {
    dbConnection
}