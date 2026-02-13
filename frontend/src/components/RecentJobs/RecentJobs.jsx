import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import JobCard from '../JobCard/JobCard';
import { useJob } from '../../context/JobContext';
import Loader from '../Loader/Loader';
import './RecentJobs.css';

const RecentJobs = () => {
    const { jobs, loading, fetchJobs } = useJob();

    useEffect(() => {
        fetchJobs(1,4);
    }, []);

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
                {loading ? (
                    <div className="loader-wrapper">
                        <Loader />
                    </div>
                ) : jobs.length > 0 ? (
                    jobs.map((job) => (
                        <JobCard key={job._id} job={job} />
                    ))
                ) : (
                    <p>No jobs found.</p>
                )}
            </div>

        </div>
    );
}

export default RecentJobs;