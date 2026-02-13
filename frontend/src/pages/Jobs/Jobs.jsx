import JobCard from '../../components/JobCard/JobCard';
import SideBar from '../../components/SideBar/SideBar';
import { RiArrowDownSFill } from "react-icons/ri";
import TopCompany from '../../components/TopCompany/TopCompany';
import { useJob } from '../../context/JobContext';
import Loader from '../../components/Loader/Loader';
import './Jobs.css';
import { useEffect } from 'react';

const Jobs = () => {
    const { jobs, pageData, fetchJobs, loading } = useJob();

    useEffect(() => {
        fetchJobs();
    }, []);

    return (
        <div className='job-page'>
            <div className="opening">
                <h1>Jobs</h1>
            </div>

            <div className='job-region'>
                <SideBar />
                <div className='search-region'>
                    <div className='options'>
                        <p>{`Showing ${pageData.current} of ${pageData.total} results`}</p>
                        <div className='sort-btn'>
                            <p>Sort By Latest</p>
                            <RiArrowDownSFill size={30} />
                        </div>
                    </div>

                    <div className='display-jobs'>
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



                    <div className='pagination'>
                        {
                            Array.from({ length: pageData.total || 0 }, (_, i) => i + 1).map((page) => (
                                <div
                                    key={page}
                                    className={`pageNo ${page === pageData.current ? "active" : ""}`}
                                    onClick={() => fetchJobs(page)}
                                >
                                    {page}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

            <TopCompany />
        </div>
    );
}

export default Jobs;