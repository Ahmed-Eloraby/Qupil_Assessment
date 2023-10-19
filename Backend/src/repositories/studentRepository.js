const Student = require("./models/student");

async function createStudent(username, email, password, gender) {
  const newStudent = new Student({
    username,
    email,
    password,
    gender,
  });

  const savedStudent = await newStudent.save();
  return savedStudent;
}

async function findStudentByEmail(email) {
  try {
    const student = await Student.findOne({ email });
    return student;
  } catch (error) {
    throw error;
  }
}

async function findStudentByUsername(username) {
  try {
    const student = await Student.findOne({ username });
    return student;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createStudent,
  findStudentByEmail,
  findStudentByUsername,
};
