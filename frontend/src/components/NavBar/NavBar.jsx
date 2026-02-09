import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";


const NavBar = () => {
    const navigate = useNavigate();
    return (
        <nav>
            <div className="container">
                <div onClick={()=>navigate('/')} className="logo">
                    HireOB
                </div>

                <ul className="links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/jobs">Jobs</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/contact">Contact Us</Link></li>
                </ul>

                <div className="navButtons">
                    <button onClick={()=> navigate('/login')}>Login</button>
                    <button onClick={()=> navigate('/hire')}>Get Hired</button>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
