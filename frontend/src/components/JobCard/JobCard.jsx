import { IoBookmarkOutline, IoWalletOutline } from "react-icons/io5";
import { PiClock } from "react-icons/pi";
import { LuMapPin } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import './JobCard.css'

dayjs.extend(relativeTime);

const JobCard = ({ job }) => {
    const navigate = useNavigate();

    const goToDetails = () => {
        navigate(`/job/${job.id}`, { state: job })
    };

    const formatted = dayjs(job.created_at).fromNow();

    return (
        <div className='job-card'>

            {/* LEFT SIDE */}
            <div className="left">
                <div className="company-logo">
                    {typeof job.logo === "string"
                        ? <img src={job.logo} alt={job.companyName} />
                        : job.logo
                    }
                </div>

                <div className="title-block">
                    <h3>{job.title}</h3>
                    <p className="company">{job.companyName}</p>

                    <div className="meta">
                        <span><PiClock /> {job.workMode}</span>
                        <span><IoWalletOutline /> {job.salary}</span>
                        <span><LuMapPin /> {job.location}</span>
                    </div>

                    <div className="tags">
                        {job.skills?.slice(0,4).map((tag, i) => (
                            <span key={i} className="tag">{tag}</span>
                        ))}
                    </div>
                </div>
            </div>


            {/* RIGHT SIDE */}
            <div className="right">
                <div className="book">
                    <span className="time">{formatted}</span>
                    <IoBookmarkOutline size={20} className="bookmark"/>
                </div>

                <button className="details-btn" onClick={goToDetails}>
                    Job Details
                </button>
            </div>

        </div>
    );
}

export default JobCard;
