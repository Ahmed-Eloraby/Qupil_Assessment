const mongoose = require("mongoose");

const studentFavoriteSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  subject: String,
  grade: Number,
  favoriteTutors: {
    type: [
      {
        tutor: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Tutor",
        },
        name: String,
        score: Number,
      },
    ],
    default: [],
  },

  timeCreated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("StudentFavorite", studentFavoriteSchema);
