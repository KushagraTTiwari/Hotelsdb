const mongoose = require('mongoose');
require('dotenv').config();
const mongoURL = process.env.MONGODB_URL_GLOBAL
mongoose.connect(mongoURL)


const db = mongoose.connection;

db.on('connected', ()=> {
    console.log('connected to mongoDb server')
})
db.on('error', (err)=> {
    console.log('MongoDB connection error: ', err)
})
db.on('disconnected', ()=> {
    console.log('Disconnected to mongoDb server')
})

module.exports= db;