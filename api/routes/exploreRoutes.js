const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  searchUser,
  searchEvent,
  searchSociety,
} = require("../Controllers/exploreControllers");

const router = express.Router();

router.route("/user").get(searchUser);
router.route("/event").get(searchEvent);
router.route("/society").get(searchSociety);
//router.route("/newProfile").post(protect, registerUser);

module.exports = router;
