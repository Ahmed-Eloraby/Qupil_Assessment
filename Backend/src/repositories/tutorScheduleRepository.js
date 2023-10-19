const mongoose = require("mongoose");
const TutorSchedule = require("../models/tutorSchedule"); // Import your TutorSchedule model

// Function to create a new tutor schedule
async function createTutorSchedule(tutorId) {
  try {
    const tutorSchedule = new TutorSchedule({
      tutor: tutorId,
    });
    return await tutorSchedule.save();
  } catch (error) {
    throw error;
  }
}

// Function to add a time slot to a specific day in a tutor's schedule
async function addTimeSlot(tutorId, day, timeSlot) {
  try {
    const tutorSchedule = await TutorSchedule.findOne({ tutor: tutorId });
    if (!tutorSchedule) {
      throw new Error("Tutor schedule not found.");
    }

    if (tutorSchedule.schedule[day]) {
      tutorSchedule.schedule[day].push(timeSlot);
      return await tutorSchedule.save();
    } else {
      throw new Error("Invalid day value.");
    }
  } catch (error) {
    throw error;
  }
}

// Function to retrieve a tutor's schedule
async function getTutorSchedule(tutorId) {
  try {
    return await TutorSchedule.findOne({ tutor: tutorId });
  } catch (error) {
    throw error;
  }
}

// Function to change the status of a time slot to "Reserved" if it exists
async function reserveTimeSlot(tutorId, day, timeSlot) {
  try {
    const tutorSchedule = await TutorSchedule.findOne({ tutor: tutorId });
    if (!tutorSchedule) {
      throw new Error("Tutor schedule not found.");
    }

    const daySchedule = tutorSchedule.schedule[day];
    if (daySchedule) {
      const slotIndex = daySchedule.findIndex((slot) => slot.time === timeSlot);

      if (slotIndex !== -1) {
        daySchedule[slotIndex].status = "Reserved";
        await tutorSchedule.save();
      } else {
        throw new Error("Time slot not found.");
      }
    } else {
      throw new Error("Invalid day value.");
    }
  } catch (error) {
    throw error;
  }
}

// Function to change the status of a time slot to "Available" if it exists
async function makeTimeSlotAvailable(tutorId, day, timeSlot) {
  try {
    const tutorSchedule = await TutorSchedule.findOne({ tutor: tutorId });
    if (!tutorSchedule) {
      throw new Error("Tutor schedule not found.");
    }

    const daySchedule = tutorSchedule.schedule[day];
    if (daySchedule) {
      const slotIndex = daySchedule.findIndex((slot) => slot.time === timeSlot);

      if (slotIndex !== -1) {
        daySchedule[slotIndex].status = "Available";
        await tutorSchedule.save();
      } else {
        throw new Error("Time slot not found.");
      }
    } else {
      throw new Error("Invalid day value.");
    }
  } catch (error) {
    throw error;
  }
}

// Export the updated repository with the new methods
module.exports = {
  createTutorSchedule,
  addTimeSlot,
  getTutorSchedule,
  reserveTimeSlot,
  makeTimeSlotAvailable,
};
