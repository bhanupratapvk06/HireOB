const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      minlength: 10,
      maxlength: 10
    },
    role: {
      type: String,
      enum: ["student", "recruiter"],
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
