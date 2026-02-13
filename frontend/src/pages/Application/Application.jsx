import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import "./Application.css";

const Application = () => {
    const { id: jobId } = useParams();

    const [job, setJob] = useState(null);
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [appliedExternally, setAppliedExternally] = useState(false);

    const location = useLocation();

    useEffect(() => {
        if (location.state?.job) {
            setJob(location.state.job);
        } else {
            setMessage("Job data not found.");
        }
    }, [location.state]);

    useEffect(()=>{
        console.log(job);
    })


    const handleFileChange = (e) => {
        setResume(e.target.files[0]);
    };

    const handleInternalApply = async (e) => {
        e.preventDefault();

        if (!resume) return setMessage("Resume is required.");

        try {
            setLoading(true);
            setMessage("");

            const formData = new FormData();
            formData.append("resume", resume);

            const res = await axios.post(
                `http://localhost:5000/api/application/${jobId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                }
            );

            setMessage(res.data.message);
            setResume(null);
        } catch (error) {
            setMessage(
                error.response?.data?.message || "Application failed."
            );
        } finally {
            setLoading(false);
        }
    };

    const confirmExternalApply = async () => {
        try {
            setLoading(true);
            setMessage("");

            await axios.post(
                `http://localhost:5000/api/tracker/${jobId}`
            );

            setAppliedExternally(true);
            setMessage("Application tracked successfully.");
        } catch (error) {
            setMessage("Failed to track application.");
        } finally {
            setLoading(false);
        }
    };

    if (!job) {
        return <div className="apply-wrapper">Loading...</div>;
    }

    return (
        <div className="apply-wrapper">
            <div className="apply-card">

                <h2>{job.title}</h2>
                <p className="company-name">{job.companyName}</p>

                {job.sourceType === "internal" ? (
                    <>
                        <p className="apply-subtitle">
                            Upload your resume to apply.
                        </p>

                        <form onSubmit={handleInternalApply}>
                            <label>Upload Resume</label>

                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileChange}
                            />

                            {resume && (
                                <p className="file-name">{resume.name}</p>
                            )}

                            <button
                                type="submit"
                                className="apply-btn"
                                disabled={loading}
                            >
                                {loading ? "Submitting..." : "Submit Application"}
                            </button>
                        </form>
                    </>
                ) : (
                    <>
                        <p className="apply-subtitle">
                            This job is hosted externally.
                        </p>

                        <a
                            href={job.externalUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="redirect-btn"
                        >
                            Go to Original Website
                        </a>

                        {!appliedExternally && (
                            <button
                                className="confirm-btn"
                                onClick={confirmExternalApply}
                                disabled={loading}
                            >
                                {loading ? "Processing..." : "I have applied"}
                            </button>
                        )}
                    </>
                )}

                {message && (
                    <p className="apply-message">{message}</p>
                )}

            </div>
        </div>
    );
};

export default Application;
