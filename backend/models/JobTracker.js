import mongoose from "mongoose";

const JobTrackerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true
  },

  status: {
    type: String,
    enum: ["Applied", "Interview", "Rejected", "Offer"],
    default: "Applied"
  },

  appliedExternally: {
    type: Boolean,
    default: true
  },

  notes: String
}, { timestamps: true });


const JobTracker = mongoose.Model('JobTracker',JobTrackerSchema);

export default JobTracker;