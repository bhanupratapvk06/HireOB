import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
      index: true
    },

    resume: {
      type: String,
      required: true
    },

    coverLetter: {
      type: String,
      default: ""
    },

    status: {
      type: String,
      enum: [
        "Submitted",
        "Viewed",
        "Shortlisted",
        "Interview",
        "Rejected",
        "Hired"
      ],
      default: "Submitted"
    },

    notes: {
      type: String,
      default: ""
    },

    appliedAt: {
      type: Date,
      default: Date.now
    },

    updatedByRecruiterAt: {
      type: Date
    }
  },
  { timestamps: true }
);

ApplicationSchema.index(
  { student: 1, job: 1 },
  { unique: true }
);

const Application = mongoose.model("Application", ApplicationSchema);

export default Application;
