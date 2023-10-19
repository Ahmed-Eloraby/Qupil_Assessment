const StudentRepository = require("../repositories/studentRepository");
const StudentFavRepository = require("../repositories/StudentFavoriteRepository");

async function createStudent(req, res) {
  try {
    console.log("Creating User");
    const newStudent = await StudentRepository.createStudent(
      req.body.username,
      req.body.email,
      req.body.password,
      req.body.gender
    );
    console.log(newStudent);
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ error: "Could not create Student" });
  }
}

async function createFav(req, res) {
  try {
    console.log("Creating Fav");
    // should be taken from user:
    const studentID = "6531c08f0dab29b7726b4af6";

    const newStudentFav = await StudentFavRepository.createStudentFavorite(
      studentID,
      req.body.subject,
      req.body.grade,
      req.body.tutors
    );
    console.log(newStudentFav);
    res.status(201).json(newStudentFav);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not create Favorite" });
  }
}

module.exports = { createStudent, createFav };
