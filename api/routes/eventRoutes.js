const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  fetchAllEvents,
  fetchEvent,
  createEvent,
  createEventUpdate,
  likeanEvent,
  dislike,
} = require("../Controllers/eventController");

const router = express.Router();

router.route("/all").post(fetchAllEvents);
router.route("/:event_id").get(fetchEvent);
router.route("/newEvent").post(createEvent);
router.route("/addEventUpdate").post(createEventUpdate);
router.route("/like").post(likeanEvent);
router.route("/dislike").post(dislike);

//router.route("/newProfile").post(protect, registerUser);

module.exports = router;
