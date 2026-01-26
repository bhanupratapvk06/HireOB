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
            .populate("recruiter", "name email")
            .skip(skip)
            .limit(Number(limit))
            .sort({ "createdAt": -1 });

        const totalJobs = await Job.countDocuments(query);

        return res.status(200).json({
            success: true,
            totalJobs,
            currentPage: Number(page),
            totalPage: Math.ceil(totalJobs / limit),
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
            return res.status(400).json({ message: "Need Job Id!" });
        }

        const {
            title,
            description,
            stipend,
            location,
            jobRole,
            experience,
            skills,
            status
        } = req.body;

        if (
            !title ||
            !description ||
            !jobRole ||
            !location ||
            stipend === undefined ||
            experience === undefined ||
            !Array.isArray(skills) ||
            skills.length === 0 ||
            !status
        ) {
            return res.status(400).json({
                message: "Please enter all required fields."
            });
        }

        const allowedStatus = ['open', 'closed'];
        const job = await Job.findById(jobId);

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid Status!" });
        }

        if (!job) {
            return res.status(404).json({
                message: "Job not found."
            });
        }

        if (job.recruiter.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not authorized to edit this job."
            });
        }

        job.title = title;
        job.description = description;
        job.stipend = stipend;
        job.location = location;
        job.jobRole = jobRole;
        job.experience = experience;
        job.skills = skills;
        job.status = status;

        await job.save();

        return res.status(200).json({
            message: "Job updated successfully.",
            job
        });

    } catch (error) {
        console.log("Edit job error:", error);
        return res.status(500).json({
            message: "Internal Server Error (Edit Job)"
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
    deleteJob
};
