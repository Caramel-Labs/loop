const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  intake: Number,
  faculty: String,
  eventId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "events",
    },
  ],
  date: { type: Date, default: Date.now },
  isAdmin: Boolean,
  favouriteEventIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "events",
    },
  ],
  interests: [String],
  likedEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "events",
    },
  ],
  degree: String,
  managedSociety: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "society",
  },
  notifications: [String]
});

const ProfileModel = mongoose.model("users", profileSchema);

module.exports = { ProfileModel };
