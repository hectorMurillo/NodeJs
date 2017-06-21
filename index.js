'use strict'
const mongoose = require ('mongoose');
const app = require('./app');
const port = process.env.port || 3001


mongoose.connect('mongodb://localhost:27017/shop', (err, res) => {
    if (err) {
        console.log(`ERRROR AL CONECTAR A LA BD ${err}`)
    } else {
        console.log('CONEXION DE LA BD ESTABLECIDA...');
        app.listen(port, () => {
            console.log(`API REST corriendo en http://localhost:${port}`);
        });
    }
})