const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  user: String,
  messeges: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Messege",
    },
  ],
});

const ChatModel = mongoose.model("Chat", chatSchema);

module.exports = { ChatModel };
