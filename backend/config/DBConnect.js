const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.DATABASE_URI)
  } catch (err) {
    console.log("mongodb connect error: ", err)
  }
}

module.exports = connectDB;