const mongoose = require('mongoose')


const personSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number
    },
    work:{
        type:String,
        enum: {
         values: ['chef','waiter','owner'], //  Restricts a string field to a set of allowed values.
         message: '{VALUE} is not supported' 
        },
        required:true
    },
    mobile: {
        type: String,
        required :true,
        unique: true
    },
    email: {
        type: String,
        required :true,
        unique: true
    },
    address:{
        type: String,
        required: true
    },

    salary: {
        type: Number,
        required: true
    },
    //Defining username and password for verification 
    username :{
        type: String,
        required: true
    },
    password :{
        type :String,
        required: true,
        maxlength :16
    }
})

// Creating the person model 

const Person = mongoose.model('Person',personSchema);
module.exports = Person;