const { ProfileModel } = require("../Models/usersModel");
const { EventModel } = require("../Models/eventModel");
const { societyModel } = require("../Models/societyModel");
const asyncHandler = require("express-async-handler");

//******************************************* */
//@description     Search a user
//@route           GET /explore/user
//@access          --
//******************************************* */
const searchUser = asyncHandler(async (req, res) => {
  try {
    const { searchName } = req.query;

    const searchResult = await ProfileModel.find({
      $or: [
        { username: { $regex: new RegExp(searchName, "i") } },
        { firstName: { $regex: new RegExp(searchName, "i") } },
        { lastName: { $regex: new RegExp(searchName, "i") } },
      ],
    });

    res.status(200).json(searchResult);
    console.log(searchResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "User not found" });
  }
});

//******************************************* */
//@description     Search a event
//@route           GET /explore/event
//@access          --
//******************************************* */
const searchEvent = asyncHandler(async (req, res) => {
  try {
    const { searchName } = req.query;

    const searchResult = await EventModel.find({
      name: { $regex: new RegExp(searchName, "i") },
    });

    res.status(200).json(searchResult);
    console.log(searchResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Event not found" });
  }
});
//******************************************* */
//@description     Search a user
//@route           GET /explore/user
//@access          --
//******************************************* */
const searchSociety = asyncHandler(async (req, res) => {
  try {
    const { searchName } = req.query;

    const searchResult = await societyModel.find({
      societyName: { $regex: new RegExp(searchName, "i") },
    });

    res.status(200).json(searchResult);
    console.log(searchResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Society not found" });
  }
});

module.exports = { searchUser, searchEvent, searchSociety };
