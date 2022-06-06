const mongoose = require("mongoose");

const mongoDbConnection = () => {
  mongoose.connect(
    "mongodb+srv://lucas_tamaya:Lucas2003@linkedincloneapp.4qysj.mongodb.net/InstagramClone?retryWrites=true&w=majority"
  );

  mongoose.connection.once("open", () => console.log("MONGODB connected"));
};

module.exports = mongoDbConnection;
