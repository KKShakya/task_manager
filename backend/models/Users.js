const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: { type: String, required: true, unique: true },

  password: { type: String }, // Optional if user signs up via email/password

  googleId: { type: String, unique: true, sparse: true }, // Store Google OAuth user ID

  avatar: { type: String }, // Optional profile picture URL

  createdAt: { type: Date, default: Date.now },

  // You can add other provider IDs here for Facebook, GitHub, etc.
});

module.exports = mongoose.model("User", userSchema);
