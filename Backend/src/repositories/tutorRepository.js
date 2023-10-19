const Tutor = require("../models/tutor");

// Create a new tutor
async function createTutor(data) {
  try {
    const tutor = new Tutor(data);
    return await tutor.save();
  } catch (error) {
    throw error;
  }
}

// // Find a tutor by their email
// async function findTutorByEmail(email) {
//   return Tutor.findOne({ email });
// }

// // Find a tutor by their username
// async function findTutorByUsername(username) {
//   return Tutor.findOne({ username });
// }

async function findTutorById(id) {
  return Tutor.findById(id);
}

module.exports = { createTutor, findTutorById };
