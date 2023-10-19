const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = `mongodb+srv://ba3lol:${process.env.MONGODB_PASS}@qupil.vvmoj80.mongodb.net/?retryWrites=true&w=majority`;
  console.log("Connecting to DB................");
  mongoose
    .connect(uri, {
      //   these are options to ensure that the connection is done properly
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to DB ✔️"))
    .catch((error) => {
      console.log("Unable to connect to MongoDB Atlas!");
      console.error(error);
    });
};

module.exports = { connectDB };
