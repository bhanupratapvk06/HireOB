import { useState } from "react";
import { RiUserCommunityLine } from "react-icons/ri";
import { PiSuitcaseBold } from "react-icons/pi";
import { FaRegBuilding } from "react-icons/fa";
import { FaSpotify } from "react-icons/fa";
import { SiAdobe } from "react-icons/si";
import { FaSlack } from "react-icons/fa";
import { SiAsana } from "react-icons/si";
import { FaMeta } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import './HeroSection.css';
import assets from "../../assets/assets";


const HeroSection = () => {
    const [filters,setFilters] = useState({
        keyword: "",
        location: "",
        category: ""
    });

    const stats = [
        { name: "Jobs", value: "25,800", logo: <PiSuitcaseBold size={30} color="white" /> },
        { name: "Candidates", value: "10,250", logo: <RiUserCommunityLine size={30} color="white" /> },
        { name: "Companies", value: "18,400", logo: <FaRegBuilding size={30} color="white" /> },
    ];

    const companies = [
        { logo: <FaSpotify size={40} />, name: "Spotity" },
        { logo: <FaSlack size={40} />, name: "slack" },
        { logo: <SiAdobe size={40} />, name: "Adobe" },
        { logo: <SiAsana size={40} />, name: "asana" },
        { logo: <FaMeta size={40} />, name: "Meta" }
    ];

    const handleChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    }

    const handleSearch = () => {
        // Implemented Later
        console.log("Searching with:", filters);
    }

    return (
        <main className="hero">

            <div className="content-box">
                <div className="content">
                    <h3>Find Your Dream Job Today!</h3>
                    <p>Connecting Talent with Oppurtunity. Your Gateway to Career Success</p>
                </div>

                <div className="search">

                    <input
                        name="keyword"
                        placeholder="Job Title or Company"
                        value={filters.keyword}
                        onChange={handleChange}
                    />

                    <select name="location" value={filters.location} onChange={handleChange}>
                        <option value="">Select Location</option>
                        <option>Remote</option>
                        <option>California</option>
                        <option>Stockholm</option>
                        <option>London</option>
                    </select>

                    <select name="category" value={filters.category} onChange={handleChange}>
                        <option value="">Select Category</option>
                        {assets.categories.map(cat => (
                            <option key={cat.id} value={cat.name}>
                                {cat.name}
                            </option>
                        ))}
                    </select>

                    <button onClick={handleSearch}>
                        <IoSearchSharp size={22} />
                        <p>Search Job</p>
                    </button>

                </div>


                <div className="stats">
                    {stats.map((stat) => {
                        return (
                            <div key={stat.name} className="stat-block">
                                <div className="logo">
                                    {stat.logo}
                                </div>

                                <div>
                                    <p>{stat.value}</p>
                                    <p>{stat.name}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>

            <div className="companies">
                {companies.map((company,index) => {
                    return (
                        <div key={index} className="company">
                            <div>
                                {company.logo}
                            </div>
                            <p>{company.name}</p>
                        </div>
                    );
                })}
            </div>
        </main>
    );
}

export default HeroSection;