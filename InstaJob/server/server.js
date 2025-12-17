const mongoose = require("mongoose");

const connect_db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (e) {
    console.log("MongoDB connection error: ", e);
  }
};

module.exports = connect_db;
