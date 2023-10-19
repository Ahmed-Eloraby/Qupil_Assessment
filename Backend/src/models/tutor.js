const mongoose = require("mongoose");

const DailyScheduleSchema = new mongoose.Schema({
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
        return value >= this.attribute1;
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
    Monday: {
      type: { DailyScheduleSchema },
    },
    Tuesday: {
      type: { DailyScheduleSchema },
    },
    Wednesday: {
      type: { DailyScheduleSchema },
    },
    Thursday: {
      type: { DailyScheduleSchema },
    },
    Friday: {
      type: { DailyScheduleSchema },
    },
    Saturday: {
      type: { DailyScheduleSchema },
    },
    Sunday: {
      type: { DailyScheduleSchema },
    },
  },
});

module.exports = mongoose.model("Tutor", tutorSchema);
