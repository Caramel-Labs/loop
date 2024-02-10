const mongoose = require("mongoose");

const degreeSchema = new mongoose.Schema({
  name: String,
  code: {
    type: String,
    unique: true,
  },
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "faculty",
  },
});

const degreeModel = mongoose.model("degree", degreeSchema);

module.exports = { degreeModel };
