const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    jobRole: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    stipend: {
      type: Number,
      required: true
    },
    jobType: {
      type: String,
      required: true
    },
    skills: [
      {
        type: String
      }
    ],
    experience: {
      type: Number,
      default: 0
    },
    companyName: {
      type: String,
      required: true
    },
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", JobSchema);

module.exports = Job;
