
import { IoBookmarkOutline, IoNavigate, IoWalletOutline } from "react-icons/io5";
import { PiClock } from "react-icons/pi";
import { LuMapPin } from "react-icons/lu";
import './JobCard.css'

const JobCard = ({ job }) => {
    return (
        <div className='card' key={job.id}>
            <div className='extras'>
                <div className='listed_at'>
                    <p>{job.posted_at}</p>
                </div>

                <div className='bookmark'>
                    <IoBookmarkOutline size={20} />
                </div>
            </div>

            <div className='position-info'>
                <div>{job.logo}</div>
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
                        job.tags.map(tag => (
                            <div className="tag">
                                <p>{tag}</p>
                            </div>
                        ))
                    }
                </div>


                <button>Job Details</button>
            </div>
        </div>
    );
}

export default JobCard;