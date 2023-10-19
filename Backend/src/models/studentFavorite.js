const mongoose = require("mongoose");

const studentFavoriteSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  subject: String,
  favoriteTutors: [
    {
      tutor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tutor",
      },
      score: Number,
    },
  ],

  timeCreated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("StudentFavorite", studentFavoriteSchema);
