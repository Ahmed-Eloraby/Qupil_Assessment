const mongoose = require("mongoose");

// Regular expression to validate the "HH:MM" time format
const timeFormatRegex = /^(0[0-9]|1[0-9]|2[0-3]):(00|30)$/;

// Define a schema for a time slot
const timeSlotSchema = new mongoose.Schema({
  time: {
    type: String,
    validate: {
      validator: function (value) {
        return timeFormatRegex.test(value);
      },
      message: "Invalid format.",
    },
  },
  status: {
    type: String,
    enum: ["Reserved", "Available"],
    default: "Available",
  },
});

const tutorScheduleSchema = new mongoose.Schema({
  tutor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tutor",
  },
  schedule: {
    Monday: {
      type: [timeSlotSchema],
      default: [],
    },
    Tuesday: {
      type: [timeSlotSchema],
      default: [],
    },
    Wednesday: {
      type: [timeSlotSchema],
      default: [],
    },
    Thursday: {
      type: [timeSlotSchema],
      default: [],
    },
    Friday: {
      type: [timeSlotSchema],
      default: [],
    },
    Saturday: {
      type: [timeSlotSchema],
      default: [],
    },
    Sunday: {
      type: [timeSlotSchema],
      default: [],
    },
  },
});

module.exports = mongoose.model("tutorScheduleSchema", tutorScheduleSchema);
