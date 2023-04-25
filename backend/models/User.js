const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email_id: {
      type: String,
      required: true,
      unique: true
    },
    links: [{
      type: String
    }]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model("User", userSchema);