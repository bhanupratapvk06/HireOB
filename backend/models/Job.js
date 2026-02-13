import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    companyName: {
      type: String,
      required: true
    },

    logo: {
      type: String
    },

    description: {
      type: String,
      required: true
    },

    fullDescription: {
      type: String
    },

    responsibilities: {
      type: [String],
      default: []
    },

    skills: {
      type: [String],
      required: true
    },

    requirements: {
      experience: {
        type: String
      },
      degree: {
        type: String
      }
    },

    jobType: {
      type: String,
      required: true
    },

    workMode: {
      type: String,
      default: "Onsite"
    },

    experience: {
      type: Number,
      default: 0
    },

    salary: {
      type: String
    },

    location: {
      type: String,
      required: true
    },

    sourceType: {
      type: String,
      enum: ["internal", "external"],
      lowercase: true,
      required: true,
      index: true
    },


    externalUrl: {
      type: String,
      required: function () {
        return this.sourceType === "external";
      }
    },


    sourcePlatform: {
      type: String
    },

    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: function () {
        return this.sourceType === "internal";
      },
      index: true
    },


    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open"
    },

    expiryDate: {
      type: Date,
      index: true
    },

    views: {
      type: Number,
      default: 0
    },

    redirectClicks: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", JobSchema);
export default Job;
