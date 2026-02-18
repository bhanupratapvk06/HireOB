import JobCard from '../../components/JobCard/JobCard';
import { RiArrowDownSFill } from "react-icons/ri";
import TopCompany from '../../components/TopCompany/TopCompany';
import { useJob } from '../../context/JobContext';
import Loader from '../../components/Loader/Loader';
import './Jobs.css';
import { useEffect } from 'react';
import JobSideBar from '../../components/JobSideBar/JobSideBar';
import ResumeMatch from '../../components/ResumeMatch';

const Jobs = () => {
    const { jobs, pageData, fetchJobs, loading } = useJob();

    useEffect(() => {
        console.log(pageData);
        fetchJobs(1, 6);
    }, []);

    const handlePageChange = (page) => {
        fetchJobs(page, 6);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };


    return (
        <div className='job-page'>
            <div className="opening">
                <h1>Jobs</h1>
            </div>

            <div className='job-region'>
                <JobSideBar />
                <div className='search-region'>
                    <div className='options'>
                        <p>{`Page ${pageData.current} of ${pageData.total}`}</p>

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
                                <div className="job-row" key={job._id}>
                                    <JobCard job={job} />
                                    <ResumeMatch job={job} />
                                </div>
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
                                    onClick={() => handlePageChange(page)}
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