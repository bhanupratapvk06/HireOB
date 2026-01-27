const Application = require("../models/Application");
const Job = require("../models/Job");

const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      jobRole,
      location,
      stipend,
      jobType,
      skills,
      experience,
      companyName,
    } = req.body;

    if (
      !title ||
      !description ||
      !jobRole ||
      !location ||
      !jobType ||
      !companyName ||
      stipend === undefined ||
      experience === undefined ||
      !Array.isArray(skills) ||
      skills.length === 0
    ) {
      return res.status(400).json({
        message: "Please enter all required fields."
      });
    }

    if (
      typeof stipend !== "number" ||
      typeof experience !== "number"
    ) {
      return res.status(400).json({
        message: "Stipend and experience must be numbers."
      });
    }



    const job = await Job.create({
      title,
      description,
      jobRole,
      location,
      stipend,
      jobType,
      skills,
      experience,
      companyName,
      recruiter: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Job created successfully.",
      job
    });

  } catch (error) {
    console.log("Error while job creation:", error);
    return res.status(500).json({
      message: "Internal Server Error (Job Creation)."
    });
  }
};

const getJobsForStudent = async (req, res) => {
  try {

    const {
      keyword,
      location,
      jobType,
      page,
      limit = 10
    } = req.query;

    const query = { status: 'open' };

    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { jobRole: { $regex: keyword, $options: "i" } },
      ];
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (jobType) {
      query.jobType = jobType;
    }

    const currentPage = Number(page) || 1;
    const skip = (currentPage - 1) * limit;

    const jobs = await Job.find(query)
      .populate("recruiter", "name")
      .skip(skip)
      .limit(Number(limit))
      .sort({ "createdAt": -1 });

    const totalJobs = await Job.countDocuments(query);

    return res.status(200).json({
      success: true,
      totalJobs,
      currentPage,
      totalPages: Math.ceil(totalJobs / limit),
      jobs
    });

  } catch (error) {
    console.log("Error fetching jobs:", error);
    return res.status(500).json({
      message: "Internal Server Error (Get Jobs)"
    });
  }
};

const editJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    if (!jobId) {
      return res.status(400).json({ message: "Job ID is required" });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    if (job.recruiter.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to edit this job"
      });
    }

    const allowedStatus = ["open", "closed"];

    if (req.body.status && !allowedStatus.includes(req.body.status)) {
      return res.status(400).json({
        message: "Invalid status value"
      });
    }

    if (
      job.status === "closed" &&
      req.body.status !== "open"
    ) {
      return res.status(400).json({
        message: "Closed jobs cannot be edited"
      });
    }

    const allowedFields = [
      "title",
      "description",
      "stipend",
      "location",
      "jobRole",
      "experience",
      "skills",
      "status"
    ];

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        job[field] = req.body[field];
      }
    });

    await job.save();

    return res.status(200).json({
      message: "Job updated successfully",
      job
    });

  } catch (error) {
    console.error("Edit job error:", error);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
};


const getRecruiterPostedJobs = async (req, res) => {
  try {
    const { page, limit = 10 } = req.query;
    const recruiterId = req.user.id;

    const currentPage = Number(page) || 1;
    const skip = (currentPage - 1) * limit;

    const jobs = await Job.find({ recruiter: recruiterId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const jobIds = jobs.map(job => job._id);
    const applications = await Application.aggregate([
      {
        $match: {
          job: { $in: jobIds }
        }
      },
      {
        $group: {
          _id: "$job",
          count: { $sum: 1 }
        }
      }
    ]);

    const applicationCountMap = {};
    applications.forEach(app => {
      applicationCountMap[app._id.toString()] = app.count;
    });

    const jobsWithCount = jobs.map(job => ({
      ...job.toObject(),
      applications: applicationCountMap[job._id.toString()] || 0
    }));

    const totalJobs = await Job.countDocuments({ recruiter: recruiterId });


    return res.status(200).json({
      success: true,
      message: "Recruiter posted jobs fetched successfully.",
      totalJobs,
      currentPage,
      totalPages: Math.ceil(totalJobs / limit),
      jobs: jobsWithCount
    });


  } catch (error) {
    console.log("GetRecruiterPostedJobs() error:", error);
    return res.status(500).json({
      message: "Internal Server Error (GetRecruiterPostedJobs)"
    });
  }
};



const deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    if (!jobId) {
      return res.status(400).json({ message: "Job ID is required" });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    if (job.recruiter.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to delete this job"
      });
    }

    await Application.deleteMany({ job: jobId });

    await Job.findByIdAndDelete(jobId);

    return res.status(200).json({
      success: true,
      message: "Job and related applications deleted successfully"
    });

  } catch (error) {
    console.error("Delete job error:", error);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
};




module.exports = {
  createJob,
  getJobsForStudent,
  editJob,
  deleteJob,
  getRecruiterPostedJobs
};
