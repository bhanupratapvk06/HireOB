import { Link } from 'react-router-dom';
import './Adv.css'

const Adv = () => {
    const stats = [
        {
            numbers: "12K+",
            about: "Clients Worldwide",
            description: "Trusted by thousands of organizations across the globe, our platform helps businesses connect with skilled professionals, streamline hiring processes, and build strong teams faster and more efficiently."
        },
        {
            numbers: "25K+",
            about: "Active Resumes",
            description: "A growing pool of talented candidates actively updating their profiles, showcasing verified skills, and exploring new opportunities to advance their careers across multiple industries."
        },
        {
            numbers: "18K+",
            about: "Companies",
            description: "From innovative startups to established enterprises, companies rely on our platform to discover qualified candidates, post job openings, and manage recruitment with ease and confidence."
        }
    ];


    return (
        <div className="container">
            <div className='quote-block'>
                <div className='cover'>
                    {/* Cover Image */}
                </div>
                <div className='content'>
                    <div className='quote'>
                        <h1>Good Life Begins With A Good Company</h1>
                        <p>
                            Finding the right company is the first step toward building a fulfilling career. Explore opportunities where your skills are valued, your growth is supported, and your future truly begins.
                        </p>

                    </div>

                    <div className='cta'>
                        <button className='cta-btn'>
                            Search Jobs
                        </button>
                        <Link to='/about'>Learn more</Link>
                    </div>
                </div>
                <div className='cover'>
                    {/* Cover Image */}
                </div>
            </div>

            <div className='stats'>
                {
                    stats.map((stat) => (
                        <div className='stat-info'>
                            <h2>{stat.numbers}</h2>
                            <h3>{stat.about}</h3>
                            <p>{stat.description}</p>
                        </div>
                    ))
                }
            </div>
            <div className='jobs'>
                <div className='jobs-content'>
                    <h1>Create A Better Future For Yourself</h1>
                    <p>
                        Take the next step in your career with opportunities designed to help you grow, learn, and succeed. Find roles that align with your passion and start building the future you deserve today.
                    </p>

                    <button>Search Job</button>
                </div>
            </div>
        </div>
    );
}

export default Adv;