const express = require("express");
const { connectDB } = require("./Loader/DataBaseLoader");
const cors = require("cors");
const bodyParser = require("body-parser");

const studentRouter = require("./routes/StudentRoute");
const tutorRouter = require("./routes/TutorRoute");
const aiRoute = require("./routes/generativeAIRoute");

require("dotenv").config();
const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(`/api/v1/student`, studentRouter);
app.use(`/api/v1/tutor`, tutorRouter);
app.use("/api/v1/ai", aiRoute);

connectDB();

// Define routes and middleware here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
