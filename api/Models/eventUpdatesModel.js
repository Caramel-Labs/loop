const mongoose = require("mongoose");

const eventUpdatesSchema = new mongoose.Schema({
  description: String,
  timestamp: { type: Number, default: Date.now() },
  imageURL: String,
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "events",
  },
});

const EventUpdatesModel = mongoose.model("eventUpdates", eventUpdatesSchema);

module.exports = { EventUpdatesModel };
