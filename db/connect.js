const mongoose = require("mongoose");

const connectDB = (uri) => {
  return new mongoose.connect(uri, {
    useNewUrlParser: true,
    autoIndex: true,
    serverSelectionTimeoutMS: 5000,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
