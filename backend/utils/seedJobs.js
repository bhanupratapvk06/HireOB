import mongoose from "mongoose";
import dotenv from "dotenv";
import Job from "../models/Job.js";
import User from "../models/User.js";
import dummyJobs from './Dummy.js';
dotenv.config();


const seedJobs = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    const recruiter = await User.findOne({ role: "recruiter" });

    if (!recruiter) {
      console.log("No recruiter found. Create one first.");
      process.exit();
    }

    await Job.deleteMany({});

    const jobsWithRecruiter = dummyJobs.map(job => ({
      ...job,
      recruiter: recruiter._id
    }));

    await Job.insertMany(jobsWithRecruiter);

    console.log("Dummy jobs inserted successfully");
    process.exit();

  } catch (error) {
    console.log("Seeding error:", error);
    process.exit(1);
  }
};

seedJobs();
