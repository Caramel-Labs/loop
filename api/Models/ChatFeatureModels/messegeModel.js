const mongoose = require("mongoose");

const messegeSchema = new mongoose.Schema(
  {
    isbot: Boolean,
    content: { type: String },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
  },
  {
    timestamp: true,
  }
);
const MessegeModel = mongoose.model("Messege", messegeSchema);

module.exports = { MessegeModel };
