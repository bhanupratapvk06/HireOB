import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import "./NavBar.css";
import { useState } from "react";



const NavBar = () => {
    const [open, setOpen] = useState(false);
    const { logout, isAuthenticated } = useAuth();

    return (
        <nav className={`NavBar ${open ? "open" : ""}`}>


            <div className="container">
                <button className="menu-toggle" onClick={() => setOpen(!open)}>☰</button>

                <Link to="/" className="logo">HireOB</Link>

                <ul className="links">

                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/jobs">Jobs</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/contact">Contact Us</Link></li>

                </ul>

                <div className="navButtons">
                    {isAuthenticated ? (
                        <>
                            <div className="user-actions">
                                <Link className="secondary" to="/dashboard">Dashboard</Link>

                                <button className="ghost" onClick={logout}>
                                    Logout
                                </button>
                            </div>

                            <Link className="primary" to='/hire'>
                                Get Hired
                            </Link>
                        </>
                    ) : (
                        <Link className="ghost" to='/login'>
                            Login
                        </Link>
                    )}
                </div>


            </div>
        </nav>
    );
};

export default NavBar;
