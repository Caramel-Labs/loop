const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  messege: String,
  timesstamp: { type: Date, default: Date.now() },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "events",
  },
});

const notificationModel = mongoose.model("notification", notificationSchema);

module.exports = { notificationModel };
