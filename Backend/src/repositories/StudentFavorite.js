const mongoose = require("mongoose");
const StudentFavorite = require("./models/studentFavoriteSchema"); // Import your StudentFavorite model

// Function to create a new student favorite
async function createStudentFavorite(studentId, subject, favoriteTutors) {
  try {
    const studentFavorite = new StudentFavorite({
      student: studentId,
      subject,
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
    return await StudentFavorite.find({ student: studentId });
  } catch (error) {
    throw error;
  }
}

// Export the functions for use in your application
module.exports = {
  createStudentFavorite,
  getStudentFavorite,
};
