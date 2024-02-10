const { facultyModel } = require("../Models/facultyModel");
const { EventModel } = require("../Models/eventModel");
const asyncHandler = require("express-async-handler");
const Joi = require("joi");

//******************************************* */
//@description     Fetch all faculties
//@route           GET /all
//@access          --
//******************************************* */
const fetchAllFaculties = asyncHandler(async (req, res) => {
  try {
    const faculty = await facultyModel.find({}).exec();

    if (faculty) {
      res.status(200).json(faculty);
    } else {
      res.status(404).json({
        message: "No Documents in the database faculty collection...",
      });
      console.log("No Documents in the database faculty collection...");
    }
  } catch (error) {
    res.status(400);
    console.log(error);
    throw new Error(error.message);
  }
});
//******************************************* */
//@description     Fetch a faculty
//@route           GET /:faculty_id
//@access          --
//******************************************* */
const fetchSingleFacultiy = asyncHandler(async (req, res) => {
  try {
    const faculty = await facultyModel
      .findOne({
        _id: req.params.faculty_id,
      })
      // .limit(10)
      // .sort({name: 1})
      // .select({name: 1, tags:1});
      .populate("admin", "username firstName LastName email")
      .populate("societies")
      .exec();

    const filteredEvents = await EventModel.find({
      selectedFaculties: faculty.facultyName,
    }).exec();

    if (faculty) {
      res.status(200).json({ faculty, filteredEvents });
      console.log(faculty);
    } else {
      res.status(404).json({ message: "faculty not found" });
      console.log("faculty not found");
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
const registerAFaculty = asyncHandler(async (req, res) => {
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
  const newfaculty = new facultyModel({
    facultyName: req.body.facultyName,
    description: req.body.description,
    admin: req.body.admin,
    societies: req.body.societies,
  });
  try {
    const result = await newfaculty.save();
    console.log("Faculty saved successfully:", result);
    res.status(200).send("Faculty saved successfully:");
  } catch (error) {
    console.error("Error saving Faculty:", error);
  }
});

module.exports = { fetchAllFaculties, fetchSingleFacultiy, registerAFaculty };
