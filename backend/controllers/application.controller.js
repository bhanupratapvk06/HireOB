import Application from "../models/Application.js";
import Job from "../models/Job.js";


export const appJob = async (req, res) => {
    try {
        const student = req.user.id;
        const { jobId } = req.params;

        if (!jobId) {
            return res.status(400).json({ message: "Need Job Id!" });
        }

        if (!req.file) {
            return res.status(400).json({
                message: "Resume is required"
            });
        }

        const resumePath = req.file.path;

        const jobExists = await Job.findById(jobId);
        if (!jobExists) {
            return res.status(404).json({
                message: "Job not found"
            });
        }
        if (jobExists.status === "closed") {
            return res.status(400).json({
                message: "This job is no longer accepting applications"
            });
        }

        if (jobExists.recruiter.toString() === student) {
            return res.status(400).json({
                message: "You cannot apply to your own job"
            });
        }


        const alreadyApplied = await Application.findOne({
            student: student,
            job: jobId
        });

        if (alreadyApplied) {
            return res.status(400).json({
                message: "You have already applied for this job"
            });
        }
        const application = await Application.create({
            student: student,
            job: jobId,
            resume: resumePath
        });

        return res.status(201).json({ message: "Application Submitted Successfully.", application })
    } catch (error) {
        console.log("Application Failed: ", error);
        return res.status(500).json({ message: "Internal Server Error!" });
    }
}

export const listAppliedJobs = async (req, res) => {
    try {
        const student = req.user.id;

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const totalApplications = await Application.countDocuments({ student });

        const applications = await Application.find({ student })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate({
                path: "job",
                select: "title description location stipend appliedAt"
            });


        return res.status(200).json({
            success: true,
            message: "Fetched applications successfully",
            totalApplications,
            currentPage: page,
            totalPages: Math.ceil(totalApplications / limit),
            applications
        });

    } catch (error) {
        console.error("Fetch applications error:", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

export const viewApplicants = async (req, res) => {

    try {
        const { jobId } = req.params;

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;



        if (!jobId) {
            return res.status(400).json({ message: "Need Job Id!" });
        }

        const job = await Job.findOne({
            _id: jobId,
            recruiter: req.user.id
        });

        if (!job) {
            return res.status(403).json({
                message: "You are not allowed to view applications for this job"
            });
        }

        const applications = await Application.find({ job: jobId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit))
            .populate("student", "username email")

        const totalApplications = await Application.countDocuments({ job: jobId });

        return res.status(200).json({
            success: true,
            job: {
                id: job._id,
                title: job.title
            },
            applicationCount: totalApplications,
            currentPage: page,
            totalPages: Math.ceil(totalApplications / limit),
            applications
        });

    } catch (error) {
        console.log("View Application Failed: ", error);
        return res.status(500).json({ message: "Internal Server Error!" });
    }
}

export const updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;
        const allowedStatus = ["Submitted","Shortlisted", "Rejected", "Hired"];

        if (!applicationId) {
            return res.status(403).json({ message: 'Need Application ID to proceed.' });
        }

        if (!status) {
            return res.status(400).json({ message: 'Fill the status.' });
        }

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid application status." });
        }

        const application = await Application.findById(applicationId).populate('job');

        if (!application) {
            return res.status(404).json({
                message: "Application not found."
            });
        }

        if (application.job.recruiter.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not authorized to update this application"
            });
        }

        application.status = status;
        await application.save();

        return res.status(200).json({
            message: "Application status updated successfully.",
            application
        });


    } catch (error) {
        console.log("Update application error:", error);
        return res.status(500).json({
            message: "Internal Server Error (Update Application)"
        });
    }
}
