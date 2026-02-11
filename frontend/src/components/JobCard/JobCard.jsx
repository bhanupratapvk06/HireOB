import { useEffect } from "react";

import { IoBookmarkOutline, IoNavigate, IoWalletOutline } from "react-icons/io5";
import { PiClock } from "react-icons/pi";
import { LuMapPin } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";


import './JobCard.css'

const JobCard = ({ job }) => {
    const navigate = useNavigate();
    const goToDetails = () => {
        navigate(`/job/${job.id}`, { state: job })
    };
    
    dayjs.extend(relativeTime);
    
    const formatted = dayjs(job.created_at).fromNow();



    return (
        <div className='card'>
            <div className='extras'>
                <div className='listed_at'>
                    <p>{formatted}</p>
                </div>

                <div className='bookmark'>
                    <IoBookmarkOutline size={20} />
                </div>
            </div>

            <div className='position-info'>
                <div>{job.logo}</div>
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
                        job.skills.map((tag) => (
                            <div className="tag">
                                <p>{tag}</p>
                            </div>
                        ))
                    }
                </div>


                <button onClick={goToDetails}>Job Details</button>
            </div>
        </div>
    );
}

export default JobCard;