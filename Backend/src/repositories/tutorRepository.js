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

async function addScheduleEntry(tutorId, day, startTime, endTime) {
  try {
    const tutor = await Tutor.findById(tutorId);

    if (!tutor) {
      throw new Error("Tutor not found");
    }

    // Create a new schedule entry
    const newScheduleEntry = {
      day,
      startTime,
      endTime,
    };

    tutor.schedule.push(newScheduleEntry);

    await tutor.save();

    return newScheduleEntry; // Return the added schedule entry
  } catch (error) {
    throw error;
  }
}

async function findTutor(data) {
  const subjectToFind = data.subject;
  const gradeToFind = data.grade;

  const tutorScores = new Map();

  const tutors = await Tutor.find({
    subjects: subjectToFind,
    grade: gradeToFind,
  });

  tutors.forEach((tutor) => {
    tutor.schedule.forEach((scheduleEntry) => {
      const { day, startTime, endTime } = scheduleEntry;
      data.slots.forEach((slot) => {
        if (
          day === slot.day &&
          startTime <= Number(slot.hour) * 60 + Number(slot.minute) &&
          endTime >=
            Number(slot.hour) * 60 + Number(slot.minute) + Number(slot.length)
        ) {
          const tutorId = tutor._id;
          // Add or update the tutor's score
          if (tutorScores.has(tutorId)) {
            tutorScores.set(tutorId, tutorScores.get(tutorId) + 1);
          } else {
            tutorScores.set(tutorId, 1);
          }
        }
      });
    });
  });

  console.log(tutorScores);

  const result = [];
  for (const [tutorId, score] of tutorScores) {
    const tutor = tutors.find((tutor) => tutor._id === tutorId);
    if (tutor) {
      result.push({
        id: tutorId,
        username: tutor.username,
        score,
      });
    }
  }

  return { tutors: result, grade: gradeToFind, subject: subjectToFind };
}

module.exports = { createTutor, findTutorById, addScheduleEntry, findTutor };
