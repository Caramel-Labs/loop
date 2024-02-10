const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: String,
  description: String,
  selectedFaculties: [String],
  date: String,
  time: String,
  venue: String,
  targetIntakes: [Number],
  society: String,
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  tickets: Boolean,
  hashtags: [String],
  likes: {
    type: Number,
    default: 0,
  },
  eventUpdates:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "eventUpdates",
  }]
});

const EventModel = mongoose.model("events", eventSchema);

module.exports = { EventModel };
