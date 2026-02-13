import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import "./NavBar.css";



const NavBar = () => {
    const navigate = useNavigate();
    const { logout, isAuthenticated } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <nav>
            <div className="container">
                <div onClick={() => navigate('/')} className="logo">
                    HireOB
                </div>

                <ul className="links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/jobs">Jobs</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/contact">Contact Us</Link></li>
                </ul>

                <div className="navButtons">
                    {isAuthenticated ? (
                        <button onClick={handleLogout}>
                            Logout
                        </button>
                    ) : (
                        <button onClick={() => navigate('/login')}>
                            Login
                        </button>
                    )}

                    <button onClick={() => navigate('/hire')}>
                        Get Hired
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
