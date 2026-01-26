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
      isActive
    } = req.body;

    if (
      !title ||
      !description ||
      !jobRole ||
      !location ||
      !stipend ||
      !jobType ||
      !companyName
    ) {
      return res.status(400).json({
        message: "Please enter all required fields."
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
      company: companyName,
      recruiter: req.user.id,
      isActive: isActive ?? true
    });

    return res.status(201).json({
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

const getJobs = async (req, res) => {
    
  try {

    const {
        keyword,
        location,
        jobType,
        page,
        limit = 10
    } = req.query;

    const query = {isActive: true};

    if(keyword){
        query.$or = [
            {title: {$regex: keyword, $options: "i"}},
            {jobRole: {$regex: keyword, $options: "i"}},
        ];
    }

    if(location){
        query.location = {$regex: location, $options: "i"};
    }

    if(jobRole){
        query.jobType = jobType;
    }

    const skip = (page - 1) * limit;

    const jobs = await Job.find(query)
      .populate("recruiter", "name email")
      .skip(skip)
      .limit(Number(limit))
      .sort({"createdAt":-1});

    const totalJobs = await Job.countDocuments(query);

    return res.status(200).json({
      success: true,
      totalJobs,
      currentPage: Number(page),
      totalPage: Math.Ceil(totalJobs/limit),
      jobs
    });

  } catch (error) {
    console.log("Error fetching jobs:", error);
    return res.status(500).json({
      message: "Internal Server Error (Get Jobs)"
    });
  }
};


module.exports = {
  createJob,
  getJobs
};
