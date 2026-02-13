import mongoose from "mongoose";

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
      default: undefined,
      unique: true,
      sparse: true
    },
    role: {
      type: String,
      enum: ["jobseeker", "recruiter"],
      required: true
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
