import Application from "../models/Application.js";
import Job from "../models/Job.js";


export const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      fullDescription,
      responsibilities,
      location,
      salary,
      jobType,
      skills,
      experience,
      companyName,
      logo,
      requirements,
      workMode,
      expiryDate,
      sourceType,
      externalUrl,
      sourcePlatform
    } = req.body;

    if (!title || !description || !location || !jobType || !companyName) {
      return res.status(400).json({
        message: "Please enter all required fields."
      });
    }

    if (sourceType === "external" && !externalUrl) {
      return res.status(400).json({
        message: "External jobs must include externalUrl"
      });
    }

    if (!["internal", "external"].includes(sourceType)) {
      return res.status(400).json({
        message: "Invalid sourceType"
      });
    }


    const job = await Job.create({
      title,
      description,
      fullDescription,
      responsibilities,
      location,
      salary,
      jobType,
      skills,
      experience,
      companyName,
      logo,
      requirements,
      workMode,
      expiryDate,
      sourceType,
      externalUrl,
      sourcePlatform,
      recruiter: sourceType === "internal" ? req.user.id : undefined
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



export const getJobsForStudent = async (req, res) => {
  try {
    const {
      keyword,
      location,
      jobType,
      page = 1,
      datePosted,
      applicantLimit,
      limit = 10,
      expiryDate
    } = req.query;

    const query = { status: "open" };

    if (keyword) {
      query.title = { $regex: keyword, $options: "i" };
    }



    if (expiryDate) {
      query.$and = [
        {
          $or: [
            { expiryDate: { $gte: new Date() } },
            { expiryDate: null }
          ]
        }
      ];
    }

    if (datePosted) {
      const days = Number(datePosted);
      const fromDate = new Date();
      fromDate.setDate(fromDate.getDate() - days);
      query.createdAt = { $gte: fromDate };
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (jobType) {
      query.jobType = jobType;
    }

    const currentPage = Number(page);
    const perPage = Number(limit);
    const skip = (currentPage - 1) * perPage;

    const jobs = await Job.find(query)
      .populate("recruiter", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(perPage);

    const jobIds = jobs.map(job => job._id);

    const applications = await Application.aggregate([
      { $match: { job: { $in: jobIds } } },
      {
        $group: {
          _id: "$job",
          count: { $sum: 1 }
        }
      }
    ]);

    const applicationMap = {};
    applications.forEach(app => {
      applicationMap[app._id.toString()] = app.count;
    });

    let jobsWithCount = jobs.map(job => ({
      ...job.toObject(),
      applicationCount: applicationMap[job._id.toString()] || 0
    }));

    if (applicantLimit) {
      jobsWithCount = jobsWithCount.filter(
        job => job.applicationCount < Number(applicantLimit)
      );
    }

    const totalJobs = await Job.countDocuments(query);

    return res.status(200).json({
      success: true,
      totalJobs,
      currentPage,
      totalPages: Math.ceil(totalJobs / perPage),
      jobs: jobsWithCount
    });

  } catch (error) {
    console.error("Error fetching jobs:", error);
    return res.status(500).json({
      message: "Internal Server Error (Get Jobs)"
    });
  }
};


export const editJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    if (!jobId) {
      return res.status(400).json({ message: "Job ID is required" });
    }

    const job = await Job.findById(jobId);

    if (job.sourceType === "external") {
      return res.status(400).json({
        message: "External jobs cannot be edited"
      });
    }

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
      "fullDescription",
      "salary",
      "location",
      "experience",
      "skills",
      "status",
      "responsibilities",
      "requirements",
      "workMode",
      "logo"
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

export const getRecruiterPostedJobs = async (req, res) => {
  try {
    const { page, limit = 10 } = req.query;
    const recruiterId = req.user.id;

    const currentPage = Number(page) || 1;
    const skip = (currentPage - 1) * limit;

    const jobs = await Job.find({ recruiter: recruiterId, sourceType: "internal" })
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

export const deleteJob = async (req, res) => {
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

    if (job.sourceType === "internal") {
      await Application.deleteMany({ job: jobId });
    }

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
