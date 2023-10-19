const express = require("express");
const router = express.Router();
const { consultAI } = require("../ai");

router.post("/", async (req, res) => {
  try {
    const output = await consultAI(req.body.prompt);
    res.json(JSON.parse(output));
  } catch (error) {
    res.status(500).json({ error: "Could not create tutor" });
  }
});

module.exports = router;
