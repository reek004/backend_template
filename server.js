const express = require("express");
const app = express();
const db = require("./db");
require('dotenv').config();

//bodyParser
const bodyParser = require("body-parser");
app.use(bodyParser.json()); //Stores the data in req.body

app.get("/", (req, res) => {
  res.send("index.html");
});

//Whole CRUD template \
//In routes

//--------------Person router files import--------------------
const PersonRoutes = require("./routes/personRouter");

// Use the routers
app.use("/person", PersonRoutes);

//----------------Menu router import-------------------

const menuRoutes = require("./routes/menuRouter");
// Use the routers
app.use("/menu", menuRoutes);

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log("App started listening on port 3000");
});
