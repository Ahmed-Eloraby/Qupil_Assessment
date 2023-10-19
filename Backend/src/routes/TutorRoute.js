const express = require("express");
const router = express.Router();

const tutorController = require("../controllers/tutorController");

router.get("/:id", tutorController.findTutorById);
router.post("/", tutorController.createTutor);

module.exports = router;
