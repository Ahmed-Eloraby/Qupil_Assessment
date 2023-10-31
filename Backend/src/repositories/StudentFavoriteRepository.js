const mongoose = require("mongoose");
const StudentFavorite = require("../models/studentFavorite"); // Import your StudentFavorite model

// Function to create a new student favorite
async function createStudentFavorite(
  studentId,
  subject,
  grade,
  favoriteTutors
) {
  try {
    const studentFavorite = new StudentFavorite({
      student: studentId,
      subject,
      grade,
      favoriteTutors,
    });
    return await studentFavorite.save();
  } catch (error) {
    throw error;
  }
}

// Function to retrieve a student favorite by student ID and subject
async function getStudentFavorite(studentId) {
  try {
    return await StudentFavorite.find({ student: studentId })
      .select("subject grade favoriteTutors")
      .sort({ timeCreated: -1 })
      .exec();
  } catch (error) {
    throw error;
  }
}

// Export the functions for use in your application
module.exports = {
  createStudentFavorite,
  getStudentFavorite,
};
