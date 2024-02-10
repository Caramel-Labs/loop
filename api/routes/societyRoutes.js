const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  fetchSocity,
  createSocietyAccount,
  fetchAllSocity,
} = require("../Controllers/societyControllers");

const router = express.Router();

router.route("/all").get(fetchAllSocity);
router.route("/:society_id").get(fetchSocity);
router.route("/newsociety").post(createSocietyAccount);
//router.route("/newProfile").post(protect, registerUser);

module.exports = router;
