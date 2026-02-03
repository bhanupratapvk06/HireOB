import { FaMeta, FaSlack, FaSpotify } from 'react-icons/fa6';
import JobCard from '../../components/JobCard/JobCard';
import SideBar from '../../components/SideBar/SideBar';
import './Jobs.css';
import { SiAdobe, SiAsana } from 'react-icons/si';
import { RiArrowDownSFill } from "react-icons/ri";
import { IoArrowDown } from 'react-icons/io5';

const Jobs = () => {

    const jobs = [
        {
            id: 1,
            title: "Frontend Developer",
            company: "Spotify",
            logo: <FaSpotify />,
            description: "Build modern UI using React and performance best practices.",
            jobType: "Full-Time",
            type: "Remote",
            experience: "1-3 yrs",
            salary: "$9,500",
            location: "Stockholm",
            tags: ["React", "JavaScript", "CSS"],
            posted_at: "2 days ago"
        },
        {
            id: 2,
            title: "Backend Engineer",
            company: "Adobe",
            logo: <SiAdobe />,
            description: "Design scalable APIs and microservices.",
            jobType: "Full-Time",
            type: "Hybrid",
            experience: "2-4 yrs",
            salary: "$11,000",
            location: "San Jose",
            tags: ["Node.js", "MongoDB", "REST"],
            posted_at: "1 day ago"
        },
        {
            id: 3,
            title: "Product Designer",
            company: "Asana",
            logo: <SiAsana />,
            description: "Create intuitive UX flows and design systems.",
            jobType: "Part-Time",
            type: "Remote",
            experience: "1-2 yrs",
            salary: "$7,200",
            location: "Remote",
            tags: ["Figma", "UX", "Prototyping"],
            posted_at: "3 days ago"
        },
        {
            id: 4,
            title: "SDE1",
            company: "Meta",
            logo: <FaMeta />,
            description: "Work on large-scale distributed systems.",
            jobType: "Full-Time",
            type: "Onsite",
            experience: "0-2 yrs",
            salary: "$12,500",
            location: "California",
            tags: ["C++", "Systems", "DSA"],
            posted_at: "5 days ago"
        },
        {
            id: 5,
            title: "QA Automation Engineer",
            company: "Slack",
            logo: <FaSlack/>,
            description: "Build automated test pipelines.",
            jobType: "Contract",
            type: "Remote",
            experience: "2 yrs",
            salary: "$8,000",
            location: "Remote",
            tags: ["Selenium", "Testing", "CI/CD"],
            posted_at: "4 days ago"
        }
    ];
    return (
        <>
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
                        {jobs.map((job)=>(
                            <JobCard job = {job}/>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Jobs;