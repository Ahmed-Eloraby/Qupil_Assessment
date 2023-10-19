const mongoose = require("mongoose");

const DailyScheduleSchema = new mongoose.Schema({
  day: {
    type: String,
  },
  startTime: {
    type: Number,
    required: true,
    min: 0, // Minimum value is 0
    max: 1439, // Maximum value is 1439
    default: 0,
  },
  endTime: {
    type: Number,
    required: true,
    min: 0, // Minimum value is 0
    max: 1439, // Maximum value is 1439
    default: 0,
    validate: {
      validator: function (value) {
        // Ensure attribute2 is greater than or equal to attribute1
        return value >= this.startTime;
      },
      message: "endTime must be greater than or equal to startTime",
    },
  },
});

const tutorSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String, // Hashed and salted password
  subjects: [String], // Array of subjects the tutor can teach
  grade: [Number],
  gender: {
    type: String,
    enum: ["Male", "Female"],
  },
  schedule: {
    type: [DailyScheduleSchema],
    default: [],
  },
});

module.exports = mongoose.model("Tutor", tutorSchema);
