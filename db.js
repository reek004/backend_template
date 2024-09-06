const mongoose = require('mongoose');

//Define the mongoDB connection URL
const mongoURL = 'mongodb://127.0.0.1:27017/hotel';

//To set up the mongoDB connection
mongoose.connect(mongoURL, {})

//Get the default connection
//MongoDB maintains a default connection object representing the MongoDB connection.
//This is the object
const db = mongoose.connection;

//Define EventListners

db.on('connected',()=>{
    console.log("MongoDB server connected");
})

db.on('error',(err)=>{
    console.log("MongoDB connection error");
})

db.on('disconnected',()=>{
    console.log("MongoDB server disconnected");
})

//export the database connection by exporting the db object

module.exports = db;