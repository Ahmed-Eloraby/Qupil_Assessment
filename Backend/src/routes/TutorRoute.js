const express = require("express");
const router = express.Router();

const tutorController = require("../controllers/tutorController");

router.get("/:id", tutorController.findTutorById);
router.put("/:id/schedule", tutorController.addSlot);
router.post("/", tutorController.createTutor);
router.post("/search", tutorController.searchForTutors);

module.exports = router;
