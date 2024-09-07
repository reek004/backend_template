const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();

//bodyParser 
const bodyParser = require("body-parser");
app.use(bodyParser.json()); //Stores the data in req.body 


//Middleware function in express is a basic function that runs after the req is made and before the res is given
//Middleware has a next() fuction returned as callback.

//Defining the midddleware
//Logging function---- to log the user logging time and the Url on which the req is made
const logRequest = (req,res,next)=>{
    console.log(`Time : ${new Date().toLocaleString()}` + ` Url : ${req.originalUrl}`);
    next(); //next indicates that the middleware fn is complete proceed to the next fn
}

//Using middleware
//app.use(logRequest);  // indicates that this middleware will be used in every server requests
//to make it routes specific use it in between the routes


app.get("/", (req, res) => {
  res.send("index.html");
});

//Whole CRUD template \
//In routes

//--------------Person router files import--------------------
const PersonRoutes = require("./routes/personRouter");
//----------------Menu router import-------------------
const menuRoutes = require("./routes/menuRouter");



// Use the routers
//logRequest will only be used when /person got hit
app.use("/person",logRequest,PersonRoutes);
//app.use("/person", PersonRoutes);
app.use("/menu", menuRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("App started listening on port 3000");
});
