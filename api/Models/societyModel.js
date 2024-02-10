const mongoose = require("mongoose");

const societySchema = new mongoose.Schema({
  societyName: String,
  description: String,
  executiveCommittee: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  volunteers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "events",
    },
  ],
  relatedFaculties: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "faculty",
    },
  ],
});

const societyModel = mongoose.model("society", societySchema);

module.exports = { societyModel };
