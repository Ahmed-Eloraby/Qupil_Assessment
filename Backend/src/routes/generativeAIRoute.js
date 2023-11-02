const express = require("express");
const router = express.Router();
const { consultAI } = require("../ai");
const { consultGPT } = require("../gpt");
const { findAllTutors } = require("../repositories/tutorRepository");

router.post("/google", async (req, res) => {
  try {
    const output = await consultAI(req.body.prompt);
    res.json(JSON.parse(output));
  } catch (error) {
    res.status(500).json({ error: "Could not create tutor" });
  }
});

router.post("/gpt", async (req, res) => {
  try {
    const tutors = await findAllTutors();

    const output = await consultGPT(tutors, req.body.prompt);
    console.log(tutors);
    res.status(200).send(output);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not create tutor" });
  }
});

module.exports = router;
