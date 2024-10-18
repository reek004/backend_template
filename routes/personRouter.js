const express = require("express");
const router = express.Router();
const Person = require("../models/person");
const { generateToken,jwtAuthMiddleware } = require("../middlewares/jwtAuthMiddleware");

//________________Person_________________

//Get method to fetch the person data
router.get("/",jwtAuthMiddleware,async (req, res) => {
  try {
    const personData = await Person.find();
    console.log("Data fetched");
    res.status(201).json(personData);
  } catch (error) {
    console.log("Internal server error");
    res.status(501).json({
      error: error.message,
    });
  }
});
//Profile route

router.get('/profile',jwtAuthMiddleware, async (req,res)=>{
  try {
  const user = req.userPayload;
  const userId = user.id;
  const profileDetails = await Person.findById(userId);
  res.status(201).json(profileDetails);
  
} catch (error) {
  res.status(501).json({
    error: error.message,
  });
}
  
})



//Posting the person data (Post Method adding a new data in the DB)
//SignUp
// Upon signup Genetating the token 
router.post("/signup", async (req, res) => {
  try {
    const data = req.body; //The request is stored in req.body

    //Creating person data using person model
    const newPerson = Person(data);

    //Saving the data in database
    const response = await newPerson.save();
    console.log("Data saved");

    //Generating the token 
    //sending the payload

    const payload = {
      id : response.id,
      username : response.username
    }

    console.log(JSON.stringify(payload))
    const token = generateToken(payload);// This genarate token function is written in /middlewares/jwtAuthMiddleware
    console.log('Token is :'+ token);


    res.status(200).json({Response : response , Token : token});
  } catch (error) {
    console.log("Error saving person:");
    res.status(501).json({
      error: error.message,
    });
  }
});


//Creating login route

router.post('/login',async (req,res)=>{
  //Taking the uname and password from req.body
  try {
  const {username,password} = req.body;
  const user = await Person.findOne({username : username});
  //Checking the user name and password
  if(!user || !(await user.comparePassword(password))){
    res.status(401).json("Invalid id or Password");
  }

  //Generating the token
  
  const payload ={
    id : user.id,
    username : user.username
  }

  const token = generateToken(payload)

  res.status(201).json({token : token})
} 
catch (error) {
    res.status(501).json(error.message)
}

})



//Put or Patch for put method id has to be specified

router.put("/:id", async (req, res) => {
  try {
    const customerId = req.params.id; // Use the customerId to retrieve customer data, perform operations, etc.

    // Updates the document in the 'Person' collection matching 'customerId' with the new data from 'req.body'.
    const newResult = await Person.updateOne({ _id: customerId }, req.body);

    console.log(newResult);
    res.status(201).json({
      updatedCount: newResult.modifiedCount,
    });
  } catch (err) {
    console.log("Error in updating");
    res.status(501).json({
      error: err.message,
    });
  }
});

//Deleting

router.delete("/:id", async (req, res) => {
  try {
    const customerId = req.params.id;
    //Delete the document with the same ID
    const result = await Person.deleteOne({ _id: customerId });
    console.log("Deleted Successfully");
    res.status(201).json({ deletedCount: result.deletedCount });
  } catch (error) {
    res.status(501).json({ Error: "User not found" });
  }
});

//:work is parameterised api calls specify the type of work after {{body}}/person/chef
router.get("/:work", async (req, res) => {
  try {
    //specifying the work type
    const workType = req.params.work;
    //
    if (workType == "chef" || workType == "waiter" || workType == "manager") {
      const workResponse = await Person.find({ work: workType });
      console.log("Response Fetched");

      //sending work response
      res.status(200).json(workResponse);
    } else {
      res.status(404).json({
        error: "Invalid work type",
      });
    }
  } catch (err) {
    res.status(501).json({
      Error: err.message,
    });
  }
});

module.exports = router;
