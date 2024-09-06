const express = require('express');
const router = express.Router();
//Importing menu model
const Menu = require("../models/menu");
const { find, updateOne } = require('../models/person');



//______________Menu___________________

//--------------READ-----------------

router.get("/", async (req, res) => {
    try {
      const MenuShow = await Menu.find();
      res.status(201).json(MenuShow);
      console.log("data fetched Successfully");
    } catch (error) {
      res.status(501).json({
        Error: error.message,
      });
      console.log("Internal Server Error");
    }
  });

// Get by taste

router.get("/:taste",async (req,res)=>{

    const itemTaste = req.params.taste;
    if(itemTaste=="Sweet"|| itemTaste=="Spicy" || itemTaste== "Sour"){
       try {
        const tasteResponse = await Menu.find({taste : itemTaste});
        res.status(200).json(tasteResponse.length + ` Nos ${itemTaste} item(s)`);
        console.log(tasteResponse);

       } catch (error) {
        res.status(501).json({
            Error : error.message
        })
       }    
    }
    else{
        res.status(401).json({
            "error":"Invalid menu item"
        })
    }
    
})
//------------Create------------------

router.post("/", async (req, res) => {
    try {
      const menuData = req.body; //takes the data from body-parser
  
      // Passed the data to a new object
      const newItem = Menu(menuData);
  
      //Saving the data to DB
      const menuResponse = await newItem.save();
      console.log("data Saved");
      //Sending the menu resposne
      res.status(201).json(menuResponse);
    } catch (error) {
      res.status(501).json({
        Error: error.message,
      });
      console.log("Internal Server Error");
    }
  });


//------------Update--------------
    //update menu item item sold

router.put('/:id',async (req,res)=>{

    const Itemid = req.params.id;
    const updatedData = req.body;
    try{
        // const updatedMenu = await Menu.updateOne({_id : Itemid},req.body);

        // Better approach
        const updatedMenu = await Menu.findByIdAndUpdate(Itemid,req.body,{
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose validation
        });
        if(!updatedMenu){
            return res.status(404).json("menuItem not found")
        }
        res.status(201).json( updatedMenu);
        console.log("Data Updated");
    }
    catch(err){
        res.status(501).json({
            Error : err.message
        });
    }
})

router.delete('/:id',async (req,res) =>{
    const deleteId = req.params.id;

    try {
        const deletedItem = await Menu.findByIdAndDelete(deleteId);
        res.status(200).json(deletedItem);
        console.log(`${deletedItem.name} is deleted form menu`)
    } catch (err) {
        res.status(501).json({
            Error : err.message
        });
    }

})

module.exports = router