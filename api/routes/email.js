const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { ProfileModel } = require("../Models/usersModel");
const emailrouter = express.Router();

//generate random integer otp
function generateOTP(length) {
  const min = 100000;
  const max = 999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: " caramellabs1@gmail.com",
    pass: " vzvdqlvfzblbrnyw",
  },
});
//Database Schema of the OTP Collection
const otpSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  otp: Number,
  date: Date,
});
const otpModel = mongoose.model("otp", otpSchema);

//******************************************* */
//@description     Send OTP to user via email
//                 save OTP to the database
//@route           GET /email//send-otp
//@access          --
//******************************************* */
emailrouter.post("/send-otp", (req, res) => {
  const useremail = req.body.email;

  // Generate OTP
  const otp = generateOTP(6);

  // Email details
  const mailOptions = {
    from: "caramellabs1@gmail.com",
    to: useremail,
    subject: "Verify Your Email - Caramel",
    text: `Your OTP for email verification is: ${otp}`,
  };
  async function sendOtpToDatabase() {
    const newOtp = new otpModel({
      email: useremail,
      otp: otp,
      date: Date.now(),
    });
    try {
      await newOtp.save();
      console.log("OTP saved successfully in the Database..");
    } catch (error) {
      console.error("Error saving OTP in the Database..");
    }
  }

  // Send OTP via email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email (in the transporter):", error);
      res.status(500).json({ message: "Error sending OTP via email." });
    } else {
      console.log("Email sent:", info.response);
      res.json({ message: "OTP sent to email successfully." });
      sendOtpToDatabase();
    }
  });
});

//******************************************* */
//@description     Verify OTP
//@route           GET /email//send-otp
//@access          --
//******************************************* */
emailrouter.post("/verify-otp", async (req, res) => {
  const enteredOTP = req.body.otp;

  try {
    const result = await otpModel.findOne({ email: req.body.email });

    if (!result) {
      console.log("no result found");
      return res
        .status(400)
        .json({ message: "Email not found or OTP expired." });
    }

    const storedOTP = result.otp;

    if (enteredOTP == storedOTP) {
      // TODO: Update your database with the email verification status here
      res.json({ message: "Email verified successfully." });
    } else {
      res.status(400).json({ message: "Invalid OTP. Please try again." });
    }
  } catch (error) {
    console.log("Error in the verifying OTP function", error);
    res.status(500).json({ message: "Error verifying OTP." });
  }
});

//******************************************* */
//@description     Send OTP when reset password
//                 save OTP to the database
//@route           GET /email//send-otp
//@access          --
//******************************************* */
emailrouter.post("/reset-mail-otp", async (req, res) => {
  const useremail = req.body.email;
  const username = req.body.username;

  const user = await ProfileModel.findOne({
    $or: [{ email: useremail }, { username: username }],
  });
  if (user) {
    // Generate OTP
    const otp = generateOTP(6);

    // Email details
    const mailOptions = {
      from: "caramellabs1@gmail.com",
      to: useremail,
      subject: "Reset Your Password - Caramel",
      text: `Your OTP to reset your password is: ${otp}`,
    };
    async function sendOtpToDatabase() {
      const newOtp = new otpModel({
        email: user.email,
        otp: otp,
        date: Date.now(),
      });
      try {
        await newOtp.save();
        console.log("OTP saved successfully in the Database..");
      } catch (error) {
        console.error("Error saving OTP in the Database..");
      }
    }

    // Send OTP via email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email (in the transporter):", error);
        res.status(500).json({ message: "Error sending OTP via email." });
      } else {
        console.log("Email sent:", info.response);
        res.json({ message: "OTP sent to email successfully." });
        sendOtpToDatabase();
      }
    });
  } else {
    res.status(404).json({ message: "User is not registered" });
  }
});

// EXPORTS OF THE EVENTS MODULE
module.exports = emailrouter;
