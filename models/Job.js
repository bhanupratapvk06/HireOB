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
        skills: {
            type: [String],
            required: true
        },
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
        status: {
            type: String,
            enum: ["open", "closed"],
            default: "open"
        },
        expiryDate: {
            type: Date,
            index: true
        },
        savedJobs: [{
            type: ObjectId,
            ref: 'Job'
        }]
    },
    { timestamps: true }
);

const Job = mongoose.model("Job", JobSchema);

module.exports = Job;
