import { Link } from "react-router-dom";
import "./NavBar.css";


const NavBar = () => {
    return (
        <nav>
            <div className="container">
                <div className="logo">
                    HireOB
                </div>

                <ul className="links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/jobs">Jobs</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/contact">Contact Us</Link></li>
                </ul>

                <div className="navButtons">
                    <button>Login</button>
                    <button>Get Hired</button>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
