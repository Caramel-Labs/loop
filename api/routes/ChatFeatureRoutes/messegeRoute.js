const express = require("express");
const {
  allMessages,
  sendMessage,
} = require("../../Controllers/ChatFeatureControllers/messegeController");

const router = express.Router();

router.route("/:chatId").get(allMessages); //fetch all messeges of a chat
router.route("/").post(sendMessage); //send a messege

module.exports = router;
