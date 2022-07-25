const mongoose = require("mongoose");

const mongoDbConnection = () => {
  // mongoose.connect(process.env.MONGODB_URI + "&w=majority");
  mongoose.connect(
    "mongodb+srv://lucas_tamaya:Lucas2003@linkedincloneapp.4qysj.mongodb.net/InstagramClone?retryWrites=true"
  );

  mongoose.connection.once("open", () => console.log("MONGODB connected"));
};

module.exports = mongoDbConnection;
