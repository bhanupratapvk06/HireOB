import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true },
    company: { type: String, trim: true },
    location: { type: String, trim: true },
    startDate: Date,
    endDate: Date,
    currentlyWorking: Boolean,
    description: { type: String, trim: true }
  },
  { _id: false }
);

const EducationSchema = new mongoose.Schema(
  {
    degree: { type: String, trim: true },
    institution: { type: String, trim: true },
    startYear: Number,
    endYear: Number
  },
  { _id: false }
);

const ProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    profilePhoto: String,

    bio: {
      type: String,
      maxlength: 500,
      trim: true
    },

    location: { type: String, trim: true },

    website: { type: String, trim: true },

    skills: {
      type: [String],
      default: []
    },

    resume: String,

    experience: {
      type: [ExperienceSchema],
      default: []
    },

    education: {
      type: [EducationSchema],
      default: []
    },

    companyName: { type: String, trim: true },
    companyWebsite: { type: String, trim: true },
    companyDescription: { type: String, trim: true },
    companyLogo: String
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", ProfileSchema);

export default Profile;
