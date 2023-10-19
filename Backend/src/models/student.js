const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String, // Hashed and salted password
  gender: {
    type: String,
    enum: ["Male", "Female"],
  },
});

module.exports = mongoose.model("Student", studentSchema);
