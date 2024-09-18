//----------------Authentication using Passportjs-------------------

//importing passport for authentication and authorization
const passport = require("passport");
const localStratagy = require("passport-local");
const Person = require("./models/person");

//Authentication logic written below
/*Verifcation function :
    takes three parameter username password and done as a call back*/
passport.use(
  new localStratagy(async (USRNAME, PSSWRD, done) => {
    try {
      console.log("Recived Credentials : ", USRNAME, PSSWRD);
      const user = await Person.findOne({ username: USRNAME });
      if (!user) {
        return done(null, false, { message: "Invalid User name" });
      }
      const isPasswordMatch = user.password == PSSWRD ? true : false;

      //done is a callback provided in passport
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect Password" });
      }
    } catch (error) {
      return done(error);
    }
  })
);

module.exports = passport; //export configured passport
