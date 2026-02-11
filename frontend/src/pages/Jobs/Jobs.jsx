import JobCard from '../../components/JobCard/JobCard';
import SideBar from '../../components/SideBar/SideBar';
import { RiArrowDownSFill } from "react-icons/ri";
import TopCompany from '../../components/TopCompany/TopCompany';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Jobs.css';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [pageData, setPageData] = useState({
        current: 1,
        total: 0
    });


    const FetchJobs = async (page = 1,limit = 6) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/job/getStudentJobs?page=${page}&limit=${limit}`);

            if (res.status == 200) {
                console.log(res);
                setJobs(res.data.jobs);
                setPageData({
                    current: res.data.currentPage,
                    total: res.data.totalPages
                });
            }
        } catch (error) {
            console.log('Fetching the Jobs Failed!', error);
        }
    }

    useEffect(() => {
        FetchJobs();
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
                        {jobs.map((job) => (
                            <JobCard job={job} />
                        ))}
                    </div>

                    <div className='pagination'>
                        {
                            Array.from({ length: pageData.total || 0 }, (_, i) => i + 1).map((page) => (
                                <div
                                    key={page}
                                    className={`pageNo ${page === pageData.current ? "active" : ""}`}
                                    onClick={() => FetchJobs(page)}
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