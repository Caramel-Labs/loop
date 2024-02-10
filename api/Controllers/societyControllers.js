const { societyModel } = require("../Models/societyModel");
const asyncHandler = require("express-async-handler");
const Joi = require("joi");
const { facultyModel } = require("../Models/facultyModel");

//******************************************* */
//@description     Fetch all society
//@route           post /society/
//@access          --
//******************************************* */
const fetchAllSocity = asyncHandler(async (req, res) => {
  try {
    const society = await societyModel.find({}).exec();

    if (society) {
      res.status(200).json(society);
      console.log(society);
    } else {
      res.status(404).json({
        message: "No Documents in the database society collection...",
      });
      console.log("No Documents in the database society collection...");
    }
  } catch (error) {
    res.status(400);
    console.log(error);
    throw new Error(error.message);
  }
});
//******************************************* */
//@description     Fetch a society
//@route           post /society/
//@access          --
//******************************************* */
const fetchSocity = asyncHandler(async (req, res) => {
  try {
    const society = await societyModel
      .findOne({
        _id: req.params.society_id,
      })
      // .limit(10)
      // .sort({name: 1})
      // .select({name: 1, tags:1});
      .populate(
        "executiveCommittee",
        "_id firstName lastName username faculty intake"
      )
      .populate("volunteers", "_id firstName lastName username faculty intake")
      .populate("events")
      .exec();

    if (society) {
      res.status(200).json(society);
      console.log(society);
    } else {
      res.status(404).json({ message: "society not found" });
      console.log("society not found");
    }
  } catch (error) {
    res.status(400);
    console.log(error);
    throw new Error(error.message);
  }
});

//******************************************* */
//@description     Create a Society
//@route           POST /society/newsociety
//@access          --
//******************************************* */
const createSocietyAccount = asyncHandler(async (req, res) => {
  //   const schema = Joi.object({
  //     // name: Joi.required(),
  //   });

  //   // Joi is used to validate the request's body (req.body)
  //   const result = schema.validate(req.body);
  //   if (result.error) {
  //     res.status(400).send(result.error.details[0].message);
  //     console.log("Joi validation failed...");
  //     return;
  //   }
  const newsociety = new societyModel({
    societyName: req.body.societyName,
    description: req.body.description,
    executiveCommittee: req.body.executiveCommittee,
    volunteers: req.body.volunteers,
    events: req.body.events,
    relatedFaculties: req.body.relatedFaculties,
  });
  try {
    const result = await newsociety.save();
    console.log("Society saved successfully:", result);
    res.status(200).send("Society saved successfully:");
  } catch (error) {
    console.error("Error saving Society:", error);
  }
});

module.exports = { fetchSocity, createSocietyAccount, fetchAllSocity };
