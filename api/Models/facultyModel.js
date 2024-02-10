const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  facultyName: String,
  description: String,
  admin: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  societies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "society",
    },
  ],
});

const facultyModel = mongoose.model("faculty", facultySchema);

module.exports = { facultyModel };
