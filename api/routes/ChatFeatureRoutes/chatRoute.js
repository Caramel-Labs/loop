const express = require("express");
const {
  accessChat,
} = require("../../Controllers/ChatFeatureControllers/chatController");

const router = express.Router();

router.route("/").post(accessChat);

module.exports = router;
