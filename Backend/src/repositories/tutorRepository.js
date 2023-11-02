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

// Get All Tutors
async function findAllTutors() {
  const tutors = await Tutor.find().maxTimeMS(20000);
  console.log(tutors);
  const tutorSentences = tutors.map((tutor) => tutorToSentence(tutor));
  return tutorSentences;
}

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

  console.log(tutors);

  tutors.forEach((tutor) => {
    console.log("__________________________");
    console.log("__________________________");
    console.log("Tutor: " + tutor.username);
    tutor.schedule.forEach((scheduleEntry) => {
      const { day, startTime, endTime } = scheduleEntry;
      console.log(`${day} ${startTime} ${endTime}`);
      data.slots.forEach((slot) => {
        const slotStartTime = Number(slot.hour) * 60 + Number(slot.minute);
        const slotEndTime =
          Number(slot.hour) * 60 + Number(slot.minute) + Number(slot.length);
        console.log(`>>>>${slot.day} ${slotStartTime} -> ${slotEndTime}`);
        console.log(
          `${day === slot.day} ${startTime <= slotStartTime} ${
            endTime >= slotEndTime
          }`
        );
        if (
          day === slot.day &&
          startTime <= slotStartTime &&
          endTime >= slotEndTime
        ) {
          console.log("**************SUCCESS**************");
          const tutorId = tutor._id;
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
  for (const [tutorId, count] of tutorScores) {
    const tutor = tutors.find((tutor) => tutor._id === tutorId);
    if (tutor) {
      const score = count / data.slots.length;
      result.push({
        id: tutorId,
        username: tutor.username,
        score,
      });
    }
  }
  console.log({ tutors: result, grade: gradeToFind, subject: subjectToFind });
  return { tutors: result, grade: gradeToFind, subject: subjectToFind };
}

// Function to convert a Tutor document to a sentence
function tutorToSentence(tutor) {
  const { _id, username, subjects, grade, gender, schedule } = tutor;

  const genderSentence = gender === "Male" ? "He" : "She";

  const scheduleInfo =
    schedule.length > 0
      ? `Availability: ${schedule
          .map(
            (day) =>
              `${day.day}: ${Math.floor(day.startTime / 60)}:${Math.floor(
                day.startTime % 60
              )}-${Math.floor(day.endTime / 60)}:${Math.floor(
                day.endTime % 60
              )}}`
          )
          .join(", ")}`
      : "No availability information available";

  return `Tutor ID: ${_id}, ${username} is ${gender}. ${genderSentence} teaches ${subjects.join(
    ", "
  )} for grades ${grade.join(", ")}. ${scheduleInfo}`;
}

module.exports = {
  createTutor,
  findTutorById,
  addScheduleEntry,
  findTutor,
  findAllTutors,
};
