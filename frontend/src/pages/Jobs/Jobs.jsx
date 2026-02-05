import JobCard from '../../components/JobCard/JobCard';
import SideBar from '../../components/SideBar/SideBar';
import { RiArrowDownSFill } from "react-icons/ri";
import TopCompany from '../../components/TopCompany/TopCompany';
import assets from '../../assets/assets';
import './Jobs.css';

const Jobs = () => {
    return (
        <div className='job-page'>
            <div className="opening">
                <h1>Jobs</h1>
            </div>

            <div className='job-region'>
                <SideBar />
                <div className='search-region'>
                    <div className='options'>
                        <p>Showing 6-6 of 10 results</p>
                        <div className='sort-btn'>
                            <p>Sort By Latest</p>
                            <RiArrowDownSFill size={30}/>
                        </div>
                    </div>

                    <div className='display-jobs'>
                        {assets.jobs.map((job)=>(
                            <JobCard job = {job}/>
                        ))}
                    </div>
                </div>
            </div>

            <TopCompany/>
        </div>
    );
}

export default Jobs;