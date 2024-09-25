const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: {
      values: ["chef", "waiter", "owner"], //  Restricts a string field to a set of allowed values.
      message: "{VALUE} is not supported",
    },
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },

  salary: {
    type: Number,
    required: true,
  },
  //Defining username and password for verification
  username: {
    type: String,
    unique: true,
    required: true,
    maxlength: 10,
  },
  password: {
    type: String,
    required: true,
    maxlength: 16,
  },
});

//pre middleware for genarating hashedPassword

personSchema.pre("save", async function (next) {
  const person = this; // Create a local reference to the current object context

  if (!person.isModified("password")) return next();

  try {
    //Creating the salt for hasing

    const salt = await bcrypt.genSalt(10);

    //Creating the hashed password
    const hashedPasswrd = await bcrypt.hash(person.password, salt);

    //Assigning the hashed password to passwrd to be saved in db
    person.password = hashedPasswrd;

    next();
  } catch (error) {
    return next(error);
  }
});

//creating the compare password function

personSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    //Using bcrypt to compare the password
    isMatch = await bcrypt.compare(candidatePassword, this.password);

    return isMatch;
  } catch (error) {
    throw error;
  }
};

// ---------How the compare password works

//reek --> anadnas382h3298bd923bd9 <hash>

//login --> rick

/* The process will happen like
rick+salt--> naiioj89hne8wb7wbewbw8b <new hash>

comparision will occur between the two hashes 

 */

// Creating the person model
const Person = mongoose.model("Person", personSchema);
module.exports = Person;
