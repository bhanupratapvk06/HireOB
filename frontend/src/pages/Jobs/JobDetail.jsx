import { useLocation } from "react-router-dom";
import "./JobDetail.css";
import { IoBookmarkOutline, IoWalletOutline } from "react-icons/io5";
import { FaMeta, FaSlack, FaSpotify } from "react-icons/fa6";
import { SiAdobe, SiAsana } from "react-icons/si";
import { PiClock } from "react-icons/pi";
import { LuMapPin } from "react-icons/lu";
import assets from "../../assets/assets";
import JobCard from "../../components/JobCard/JobCard";
import { MdOutlineStars } from "react-icons/md";
import { LuGraduationCap } from "react-icons/lu";
import { TiTick } from "react-icons/ti";
import { FaRegUser } from "react-icons/fa6";

const JobDetail = () => {
    const location = useLocation();
    const job = location.state;

    if (!job) {
        return <h2>No Job Data Found</h2>;
    }


    const logoMap = {
        spotify: <FaSpotify />,
        adobe: <SiAdobe />,
        asana: <SiAsana />,
        meta: <FaMeta />,
        slack: <FaSlack />
    };

    const jobOverview = [
        { logo: <FaRegUser  color="#309689"/>, name: "Job Title", content: job.title },
        { logo: <PiClock  color="#309689"/>, name: "Job Type", content: job.jobType },
        { logo: <MdOutlineStars color="#309689" />, name: "Experience", content: job.requirements.experience },
        { logo: <LuGraduationCap  color="#309689"/>, name: "Degree", content: job.requirements.degree },
        { logo: <IoWalletOutline color="#309689" />, name: "Offered Salary", content: job.salary },
        { logo: <LuMapPin  color="#309689"/>, name: "Location", content: job.location },

    ];


    return (
        <div className="detail">
            <div className="opening">
                <h1>Job Details</h1>
            </div>

            <div className="detail-region">
                <div className='title-section'>
                    <div className='extras'>
                        <div className='listed_at'>
                            <p>{job.posted_at}</p>
                        </div>

                        <div className='bookmark'>
                            <IoBookmarkOutline size={20} />
                        </div>
                    </div>

                    <div className='position-info'>
                        <div>{logoMap[job.logo]}</div>
                        <div className="info">
                            <h3>{job.title}</h3>
                            <p>{job.company}</p>
                        </div>
                    </div>

                    <div className='job-details'>
                        <div>
                            <div className="detail">
                                <PiClock size={22} color="#309689" />
                                <p>{job.type}</p>
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
                                job.professionalSkills.map((tag) => (
                                    <div className="tag">
                                        <p>{tag}</p>
                                    </div>
                                ))
                            }
                        </div>


                        <button>Apply Job</button>
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
                            {job.responsibilities.map((res) => (
                                <div>
                                    <TiTick size={25} color="309689" />
                                    <p>{res}</p>
                                </div>
                            ))}
                        </div>
                        <div className="skills">
                            <h1>Professional Skills</h1>
                            <div className="tags">
                                {job.professionalSkills.map((skill) => (
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
                                {assets.jobs.map((job) => (<JobCard job={job} />))}
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
