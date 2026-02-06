import { Link } from 'react-router-dom';
import JobCard from '../JobCard/JobCard';
import assets from '../../assets/assets';
import './RecentJobs.css'

const RecentJobs = () => {
    return (
        <div className='recents'>
            <div className='opening'>
                <h1>Recent Jobs Available</h1>
                <div>
                    <p>Discover the latest opportunities from top companies and find a role that fits your skills, goals, and career growth.</p>
                    <Link to="/jobs">View All</Link>
                </div>
            </div>

            <div className="listings">
                {assets.jobs.map((job) => (
                   <JobCard job = {job}/>
                ))}
            </div>

        </div>
    );
}

export default RecentJobs;