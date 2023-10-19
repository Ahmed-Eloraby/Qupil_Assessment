const express = require("express");
const router = express.Router();
const StudentController = require("../controllers/studentController");

router.post("/", StudentController.createStudent);
router.post("/favorite", StudentController.createFav);

module.exports = router;
