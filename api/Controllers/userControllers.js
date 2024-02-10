const { ProfileModel } = require("../Models/usersModel");
const { EventModel } = require("../Models/eventModel");
const { degreeModel } = require("../Models/degreeModel");
//const generateToken = require("../config/generateToken");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const Joi = require("joi");

//******************************************* */
//@description     Register a user
//@route           POST /profiles/newProfile
//@access          --
//******************************************* */
const registerUser = asyncHandler(async (req, res) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
    eventId: Joi.array().items(Joi.number().integer()),
    isAdmin: Joi.boolean(),
  });

  const result = schema.validate(req.body);
  if (result.error) {
    return res
      .status(400)
      .send({ errors: result.error.details.map((detail) => detail.message) });
  }

  const email = req.body.email;
  const regex = /^(\d+)-([a-z]+)-\d+@/;
  const match = email.match(regex);

  if (!match) {
    return res.status(400).send("Enter a valid KDU email address");
  }

  const userintake = match[1];
  const userdegreecode = match[2];

  let degree, userfaculty, userDegreeName;

  try {
    degree = await degreeModel
      .findOne({ code: userdegreecode })
      .populate("faculty");

    if (!degree || !degree.faculty || degree.faculty.length === 0) {
      throw new Error("Faculty information not found");
    }
    console.log(degree);
    userfaculty = degree.faculty.facultyName;
    userDegreeName = degree.name;
  } catch (error) {
    console.error("Error retrieving degree:", error);
    return res
      .status(500)
      .send("Error fetching Data from the Degree Collection");
  }

  // check whether the user is already registered
  const user = await ProfileModel.findOne({ email: req.body.email });
  if (user) {
    console.log(`${req.body.email} is already registered`);
    return res.status(400).send("Email already registered");
  }

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(req.body.password, salt);

  const newprofile = new ProfileModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    password: hashpassword,
    intake: userintake,
    faculty: userfaculty,
    eventId: req.body.eventId,
    isAdmin: req.body.isAdmin,
    degree: userDegreeName,
  });

  try {
    const result = await newprofile.save();
    console.log("Profile saved successfully:", result);
    res.status(200).send("Profile saved successfully");
  } catch (error) {
    console.error("Error saving profile:", error);
    res.status(500).send("Error saving profile");
  }
});

//******************************************* */
//@description     Join a user to an event
//@route           POST /profiles/join
//@access          --
//******************************************* */
const joinEvent = asyncHandler(async (req, res) => {
  const user_id = req.body.user_id;
  const event_id = req.body.event_id;

  try {
    const updatedUser = await ProfileModel.findByIdAndUpdate(
      user_id,
      { $addToSet: { eventId: event_id } },
      { new: true }
    );
    const updatedEvent = await EventModel.findByIdAndUpdate(
      event_id,
      { $addToSet: { participants: user_id } },
      { new: true }
    );
    res.status(200).json(updatedUser);
    console.log(updatedUser);
    console.log(updatedEvent);
  } catch (error) {
    console.error("Error joining user to user document:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//******************************************* */
//@description     fetch a profile
//@route           GET /profiles/thurunu2001
//@access          --
//******************************************* */
const fetchProfile = asyncHandler(async (req, res) => {
  try {
    const user = await ProfileModel.findOne({
      username: req.params.username,
    })
      // .limit(10)
      // .sort({name: 1})
      // .select({name: 1, tags:1});
      .populate("eventId")
      .exec();

    if (user) {
      res.status(200).json(user);
      console.log(user);
    } else {
      res.status(404).json({ message: "user object not found" });
      console.log("user object not found");
    }
  } catch (error) {
    res.status(400);
    console.log(error);
    throw new Error(error.message);
  }
});

//******************************************* */
//@description     Add a event to favourites
//@route           POST /profiles/addToFavourite
//@access          --
//******************************************* */
const addToFavourite = asyncHandler(async (req, res) => {
  const user_id = req.body.user_id;
  const event_id = req.body.event_id;

  try {
    const updatedUser = await ProfileModel.findByIdAndUpdate(
      user_id,
      { $addToSet: { favouriteEventIds: event_id } },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error joining user to user document:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//******************************************* */
//@description     Get favourite events
//@route           POST /profiles/addToFavourite
//@access          --
//******************************************* */
const fetchFavourites = asyncHandler(async (req, res) => {
  const user_id = req.body.user_id;

  try {
    const user = await ProfileModel.findById(user_id)
      .select("favouriteEventIds username")
      .populate("favouriteEventIds");
    res.status(200).json(user);
    console.log(user);
  } catch (error) {
    console.error("Error joining user to user document:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//******************************************* */
//@description     romove a event from favourites
//@route           POST /profiles/addToFavourite
//@access          --
//******************************************* */
const removeFromFavourites = asyncHandler(async (req, res) => {
  const user_id = req.body.user_id;
  const event_id = req.body.event_id;

  try {
    const updatedUser = await ProfileModel.findByIdAndUpdate(
      user_id,
      { $pull: { favouriteEventIds: event_id } },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error joining user to user document:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//******************************************* */
//@description     romove a event from favourites
//@route           POST /profiles/addToFavourite
//@access          --
//******************************************* */
const resetPassword = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const newPassword = req.body.newPassword;

  const user = await ProfileModel.findById(userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Hash the new password
  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(newPassword, salt);

  user.password = hashpassword;

  await user.save();

  res.status(200).json({ message: "Password reset successfully" });
});

module.exports = {
  registerUser,
  joinEvent,
  fetchProfile,
  addToFavourite,
  fetchFavourites,
  removeFromFavourites,
  resetPassword,
};
