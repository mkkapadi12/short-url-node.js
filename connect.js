const mongoose = require("mongoose");

const connectToMongoDb = async (url) => {
  return mongoose
    .connect(url)
    .then(() => {
      console.log("MongoDb connection successful !");
    })
    .catch((err) => console.log("Error", err));
};

module.exports = { connectToMongoDb };
