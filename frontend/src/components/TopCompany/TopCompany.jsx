import { SiAdobe, SiTesla } from "react-icons/si";
import { FaAmazon } from "react-icons/fa";
import { FaSpotify } from "react-icons/fa6";
import './TopCompany.css';

const TopCompany = () => {
    const topCompanies = [
        {
            icon: SiTesla,
            name: "Tesla",
            description: "Innovating in electric vehicles, energy storage, and sustainable technology.",
            jobCount: "32 Jobs"
        },
        {
            icon: FaAmazon,
            name: "Amazon",
            description: "Building products that organize the world’s information and make it accessible.",
            jobCount: "48 Jobs"
        },
        {
            icon: FaSpotify,
            name: "Spotify",
            description: "Connecting artists and listeners through music streaming and creative tools.",
            jobCount: "21 Jobs"
        },
        {
            icon: SiAdobe,
            name: "Adobe",
            description: "Leading digital creativity and document solutions for modern businesses.",
            jobCount: "27 Jobs"
        }
    ];

    return (
        <div className="top">
            <h1>Top Company</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, provident.</p>
            <div className="top-cards">
                {
                    topCompanies.map((tc) => (
                        <div className="top-card">
                            <div className="icon">
                                {<tc.icon size={30} color="white" />}
                            </div>
                            <h3>{tc.name}</h3>
                            <p>{tc.description}</p>
                            <div>{tc.jobCount}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default TopCompany;