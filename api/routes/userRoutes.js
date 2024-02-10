const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  fetchProfile,
  joinEvent,
  registerUser,
  addToFavourite,
  fetchFavourites,
  removeFromFavourites,
  resetPassword,
} = require("../Controllers/userControllers");

const router = express.Router();

router.route("/:username").get(fetchProfile);
router.route("/join").post(joinEvent);
router.route("/newProfile").post(registerUser);
router.route("/addToFavourite").post(addToFavourite);
router.route("/userFavourites").get(fetchFavourites);
router.route("/removeFromFavourites").get(removeFromFavourites);
router.route("/reset-password").post(resetPassword);

module.exports = router;
