// *****************************************************
//                AUTHENTICATION MODULE
// *****************************************************
// This module handles all activities related to user
// authentication (for validating login attempts).
// This is done by searching the database for any users
// having the email entered during login, after which
// the module will check whether the password entered
// during login matches the password stored in the
// database for the user having that email address.
// *****************************************************

// IMPORTS AND OTHER REQUIREMENTS
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const router = express.Router();
const { ProfileModel } = require("../Models/usersModel");

router.post("/", async (req, res) => {
  // NOTE
  // The 'async' keyword is used as there are function calls
  // having the 'await' keyword appended to them inside this function.

  // 1. PRELIMINARY VALIDATION

  // schema to ensure that the request object meets the necessary
  // requirements and properties
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
  });

  // validating the request's body against the previously
  // prepared schema
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  // 2. EMAIL VALIDATION

  // This searches for users in the database having the same email
  // as the one in the request's body (i.e. the email entered
  // during login). The findOne() method will return true if such
  // a user is found, and false otherwise.
  let user = await ProfileModel.findOne({ email: req.body.email });
  if (!user) {
    console.log("EMAIL NOT FOUND!");
    console.log(
      `Cannot find user having "${req.body.email}" as their email address in the database!`
    );
    return res.status(400).send("Invalid email");
  }

  // console logs to be displayed when email validation is successful
  console.log("EMAIL FOUND!");
  console.log(`Entered email (${req.body.email}) is available in the database`);

  // 3. PASSWORD VALIDATION

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) {
    console.log("INVALID PASSWORD!");
    console.log(
      `${req.body.password} is not ${user.firstName} ${user.lastName}'s password!`
    );
    return res.status(400).send("Invalid password");
  }

  // console logs to be displayed when password validation is successful
  console.log("VALID PASSWORD!");
  console.log(
    `Yes, ${user.firstName} ${user.lastName}'s password is ${req.body.password}`
  );

  // console logs to display after:
  // 1. Email is found in database
  // 2. Entered password matches the password of the user having that email
  console.log("User authentication completed successsfully!");
  console.log("********************************************");

  // 4. JWT

  // JWT token

  const obj = { username: user.username };

  function generateAuthToken(obj) {
    const accessToken = jwt.sign(obj, process.env.JWT_KEY);

    return accessToken;
  }
  // token MUST be a JSON object
  const userObj = JSON.stringify({
    user_id: user._id,
    username: user.username,
    faculty: user.faculty,
    firstName: user.firstName,
    accessToken: generateAuthToken(obj),
  });
  res.send(userObj);
});

// EXPORTS OF THIS MODULE
module.exports = router;
