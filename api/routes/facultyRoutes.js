const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  fetchAllFaculties,
  fetchSingleFacultiy,
  registerAFaculty,
} = require("../Controllers/facultyControllers");

const router = express.Router();

router.route("/all").get(fetchAllFaculties);
router.route("/:faculty_id").get(fetchSingleFacultiy);
router.route("/newFaculty").post(registerAFaculty);
//router.route("/newProfile").post(protect, registerUser);

module.exports = router;
