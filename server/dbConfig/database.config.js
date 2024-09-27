const mongoose = require("mongoose");
const MONGO_URI = "mongodb://localhost:27017/paymentDB";

const mongoDBConnection = (app) => {
  mongoose.connect(MONGO_URI);
  mongoose.connection.on("connect", () => {
    console.log("database connected!");
  });
  mongoose.connection.on("error", (error) => {
    console.log(error);
  });
};

module.exports = mongoDBConnection;
