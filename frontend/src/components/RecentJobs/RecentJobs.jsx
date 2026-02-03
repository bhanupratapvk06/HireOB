import { Link } from 'react-router-dom';
import { SiAdobe, SiAsana } from "react-icons/si";
import { PiSuitcaseBold } from "react-icons/pi";
import './RecentJobs.css'
import { FaBookBookmark, FaMeta } from 'react-icons/fa6';
import { FaSlack, FaSpotify } from 'react-icons/fa';
import JobCard from '../JobCard/JobCard';

const RecentJobs = () => {

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
            logo: <FaSlack />,
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
        <div className='recents'>
            <div className='opening'>
                <h1>Recent Jobs Available</h1>
                <div>
                    <p>Discover the latest opportunities from top companies and find a role that fits your skills, goals, and career growth.</p>
                    <Link to="/jobs">View All</Link>
                </div>
            </div>

            <div className="listings">
                {jobs.map((job) => (
                   <JobCard job = {job}/>
                ))}
            </div>

        </div>
    );
}

export default RecentJobs;