const TutorRepository = require("../repositories/tutorRepository");
const TutorScheduleRepository = require("../repositories/tutorScheduleRepository");

// Create a new tutor
async function createTutor(req, res) {
  try {
    console.log("Creating User");
    const tutor = await TutorRepository.createTutor(req.body);
    await TutorScheduleRepository.createTutorSchedule(tutor._id);
    res.status(201).json(tutor);
  } catch (error) {
    res.status(500).json({ error: "Could not create tutor" });
  }
}

//   // Find a tutor by their email
//   async findTutorByEmail(req, res) {
//     try {
//       const tutor = await TutorRepository.findTutorByEmail(req.params.email);
//       if (!tutor) {
//         res.status(404).json({ message: 'Tutor not found' });
//       } else {
//         res.status(200).json(tutor);
//       }
//     } catch (error) {
//       res.status(500).json({ error: 'Could not retrieve tutor' });
//     }
//   }

//   // Find a tutor by their username
//   async findTutorByUsername(req, res) {
//     try {
//       const tutor = await TutorRepository.findTutorByUsername(req.params.username);
//       if (!tutor) {
//         res.status(404).json({ message: 'Tutor not found' });
//       } else {
//         res.status(200).json(tutor);
//       }
//     } catch (error) {
//       res.status(500).json({ error: 'Could not retrieve tutor' });
//     }
//   }

// Find a tutor by their ID
async function findTutorById(req, res) {
  try {
    const tutor = await TutorRepository.findTutorById(req.params.id);
    if (!tutor) {
      res.status(404).json({ message: "Tutor not found" });
    } else {
      res.status(200).json(tutor);
    }
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve tutor" });
  }
}

async function findTutorById(req, res) {
  try {
    const tutor = await TutorRepository.findTutorById(req.params.id);
    if (!tutor) {
      res.status(404).json({ message: "Tutor not found" });
    } else {
      res.status(200).json(tutor);
    }
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve tutor" });
  }
}

async function add(req, res) {
  try {
    const tutor = await TutorRepository.findTutorById(req.params.id);
    if (!tutor) {
      res.status(404).json({ message: "Tutor not found" });
    } else {
      res.status(200).json(tutor);
    }
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve tutor" });
  }
}

module.exports = { findTutorById, createTutor };