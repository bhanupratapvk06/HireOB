import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useJob } from "../../context/JobContext";
import { IoBookmarkOutline, IoWalletOutline } from "react-icons/io5";
import { PiClock } from "react-icons/pi";
import { LuMapPin } from "react-icons/lu";
import { MdOutlineStars } from "react-icons/md";
import { LuGraduationCap } from "react-icons/lu";
import { TiTick } from "react-icons/ti";
import { FaRegUser } from "react-icons/fa6";
import relativeTime from "dayjs/plugin/relativeTime";
import Loader from "../../components/Loader/Loader";
import dayjs from "dayjs";
import "./JobDetail.css";

dayjs.extend(relativeTime);

const JobDetail = () => {
    const { jobs, loading, fetchJobs, applyJob} = useJob();
    const [applied, setApplied] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const job = location.state;

    if (!job) {
        return <h2>No Job Data Found</h2>;
    }

    const formatted = dayjs(job.createdAt).fromNow();

    const jobOverview = [
        { logo: <FaRegUser color="#309689" />, name: "Job Title", content: job.title },
        { logo: <PiClock color="#309689" />, name: "Job Type", content: job.jobType },
        { logo: <MdOutlineStars color="#309689" />, name: "Experience", content: job.requirements?.experience || "Not specified" },
        { logo: <LuGraduationCap color="#309689" />, name: "Degree", content: job.requirements?.degree || "Not specified" },
        { logo: <IoWalletOutline color="#309689" />, name: "Offered Salary", content: job.salary },
        { logo: <LuMapPin color="#309689" />, name: "Location", content: job.location },

    ];

    const handleApply = async () => {
        if (job.sourceType === "external") {
            window.open(job.externalUrl, "_blank");
            return;
        }

        try {
            await applyJob(job._id);
            setApplied(true);
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        fetchJobs(1, 8);
    }, []);

    return (
        <div className="detail">
            <div className="opening">
                <h1>Job Details</h1>
            </div>

            <div className="detail-region">
                <div className='title-section'>
                    <div className='extras'>
                        <div className='listed_at'>
                            <p>{formatted}</p>
                        </div>

                        <div className='bookmark'>
                            <IoBookmarkOutline size={20} />
                        </div>
                    </div>

                    <div className='position-info'>
                        <div><img src={job.logo} alt={job.companyName} />
                        </div>
                        <div className="info">
                            <h3>{job.title}</h3>
                            <p>{job.companyName}</p>
                        </div>
                    </div>

                    <div className='job-details'>
                        <div>
                            <div className="detail">
                                <PiClock size={22} color="#309689" />
                                <p>{job.workMode}</p>
                            </div>
                            <div className="detail">
                                <IoWalletOutline size={22} color="#309689" />
                                <p>{job.salary}</p>
                            </div>
                            <div className="detail">
                                <LuMapPin size={22} color="#309689" />
                                <p>{job.location}</p>
                            </div>

                        </div>

                        <div className="tags">
                            {
                                job.skills.map((tag, i) => (
                                    <div key={i} className="tag">
                                        <p>{tag}</p>
                                    </div>
                                ))
                            }
                        </div>

                        <button
                            disabled={applied}
                            onClick={handleApply}
                        >
                            {applied ? "Applied" : "Easy Apply"}
                        </button>




                    </div>
                </div>

                <div className="job-about">
                    <div className="jd">
                        <div className="description">
                            <h1>Job Description</h1>
                            <p>{job.fullDescription}</p>
                        </div>
                        <div className="responsibilities">
                            <h1>Job Responsibilities</h1>
                            {job?.responsibilities.map((res, i) => (
                                <div key={i}>
                                    <TiTick size={25} color="#309689" />
                                    <p>{res}</p>
                                </div>
                            ))}
                        </div>
                        <div className="skills">
                            <h1>Professional Skills</h1>
                            <div className="tags">
                                {job?.skills.map((skill) => (
                                    <div>
                                        <p>{skill}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Need to be implemented */}
                        {/* <div className="share">
                            <h3>Share Job: 
                                <span>
                                    {contact.map()}
                                </span>
                            </h3>
                        </div> */}
                        <div className="related">
                            {/* Api will be called for related jobs */}
                            <h1>Related Jobs</h1>
                            <p>Some similar jobs are listed below.</p>
                            <div className="holder">
                                {loading ? (
                                    <div className="loader-wrapper">
                                        <Loader />
                                    </div>
                                ) : jobs.length > 0 ? (
                                    jobs.map((related) => (
                                        <div
                                            key={related._id}
                                            className="related-card"
                                            onClick={() =>
                                                navigate(`/job/${related._id}`, {
                                                    state: related
                                                })
                                            }
                                        >
                                            <div className="rc-top">
                                                <div className="rc-logo">{related.logo}</div>
                                                <IoBookmarkOutline size={16} />
                                            </div>

                                            <h4>{related.title}</h4>
                                            <p className="rc-company">{related.companyName}</p>

                                            <div className="rc-meta">
                                                <span><PiClock size={14} /> {related.workMode}</span>
                                                <span><LuMapPin size={14} /> {related.location}</span>
                                            </div>

                                            <div className="rc-tags">
                                                {related.skills?.slice(0, 3).map((s, i) => (
                                                    <span key={i}>{s}</span>
                                                ))}
                                            </div>

                                            <button
                                                className="rc-apply"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleApply(related);
                                                }}
                                            >
                                                {related.sourceType === "external" ? "External Apply" : "Easy Apply"}
                                            </button>
                                        </div>
                                    ))

                                ) : (
                                    <p>No related jobs found.</p>
                                )}
                            </div>

                        </div>
                    </div>
                    <div className="jo">
                        <h3>Job Overview</h3>
                        <div className="overview">
                            {jobOverview.map((over) => (
                                <div className="over-card">
                                    <div className="logo">
                                        {over.logo}
                                    </div>
                                    <div>
                                        <h4>{over.name}</h4>
                                        <p>{over.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="msg"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetail;
