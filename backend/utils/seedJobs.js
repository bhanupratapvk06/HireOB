import mongoose from "mongoose";
import dotenv from "dotenv";
import Job from "../models/Job.js";
import User from "../models/User.js";

dotenv.config();

const dummyJobs = [
  {
    title: "QA Automation Engineer",
    companyName: "Slack",
    logo: "slack",
    description: "Build automated test pipelines.",
    fullDescription:
      "We are seeking a QA Automation Engineer to improve product reliability through automated testing and CI pipelines.",
    responsibilities: [
      "Develop automated test scripts",
      "Integrate tests into CI/CD",
      "Collaborate with developers",
      "Ensure release readiness"
    ],
    skills: ["Selenium", "Automation Testing", "CI/CD", "JavaScript"],
    requirements: {
      experience: "2+ years",
      degree: "Computer Science or related field"
    },
    jobType: "Contract",
    workMode: "Remote",
    experience: 2,
    salary: "$8,000",
    location: "Remote"
  },

  {
    title: "Frontend Developer",
    companyName: "Airbnb",
    logo: "airbnb",
    description: "Build modern UI applications.",
    fullDescription:
      "Looking for a React developer to build scalable frontend systems.",
    responsibilities: [
      "Build reusable components",
      "Optimize UI performance",
      "Collaborate with backend team"
    ],
    skills: ["React", "JavaScript", "CSS", "Redux"],
    requirements: {
      experience: "1+ years",
      degree: "B.Tech / BCA / MCA"
    },
    jobType: "Full-Time",
    workMode: "Hybrid",
    experience: 1,
    salary: "$6,000",
    location: "Bangalore"
  },

  {
    title: "Backend Developer",
    companyName: "Stripe",
    logo: "stripe",
    description: "Build secure APIs and backend systems.",
    fullDescription:
      "Seeking a Node.js backend engineer to build scalable APIs.",
    responsibilities: [
      "Develop REST APIs",
      "Integrate databases",
      "Write secure backend code"
    ],
    skills: ["Node.js", "MongoDB", "Express", "JWT"],
    requirements: {
      experience: "3+ years",
      degree: "Computer Science"
    },
    jobType: "Full-Time",
    workMode: "Onsite",
    experience: 3,
    salary: "$10,000",
    location: "Hyderabad"
  }
];


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
