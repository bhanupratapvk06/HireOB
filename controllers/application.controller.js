const Application = require("../models/Application");
const Job = require("../models/Job");


const appJob = async(req,res) => {
    try {
        const student = req.user.id;
        const {jobId} = req.params;

        if (req.user.role !== "student") {
            return res.status(403).json({
                message: "Only students can apply for jobs"
            });
        }

        if(!jobId){
            return res.status(400).json({message: "Need Job Id!"});
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

        return res.status(201).json({message: "Application Submitted Successfully.",application})
    } catch (error) {
        console.log("Application Failed: ",error);
        return res.status(500).json({message: "Internal Server Error!"});
    }
}


const viewApplication = async(req,res) => {

    try {
        const {jobId} = req.params;
        if(req.user.role != 'recruiter'){
            return res.status(403).json({message: "Only recruiters can view applications."});
        }

        if(!jobId){
            return res.status(400).json({message: "Need Job Id!"});
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

        const applications = await Application.find({job: jobId}).populate("student","name email").populate('job','title companyName');
        return res.status(200).json({
            total: applications.length,
            applications
        });

    } catch (error) {
        console.log("View Application Failed: ",error);
        return res.status(500).json({message: "Internal Server Error!"});
    }
}

module.exports = {
    appJob,
    viewApplication
};