const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        job: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            required: true
        },
        resume: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["Applied", "Rejected", "Shortlisted"],
            default: "Applied"
        },
        appliedAt: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
);

ApplicationSchema.index(
    { student: 1, job: 1 },
    { unique: true }
);

const Application = mongoose.model("Application", ApplicationSchema);



module.exports = Application;
