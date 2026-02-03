import { Link } from "react-router-dom";
import { PiSuitcaseBold } from "react-icons/pi";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">

            <div className="footer-container">

                <div className="footer-brand">
                    <div className="logo">
                        <PiSuitcaseBold />
                        <h3>Job</h3>
                    </div>

                    <p>
                        Discover opportunities that match your skills and ambitions. We connect talented professionals with trusted companies to build meaningful careers and lasting success.
                    </p>

                </div>

                <div className="footer-links">
                    <h4>Company</h4>
                    <Link to="/about">About Us</Link>
                    <Link to="/team">Our Team</Link>
                    <Link to="/partners">Partners</Link>
                    <Link to="/candidates">For Candidates</Link>
                    <Link to="/employers">For Employers</Link>
                </div>

                <div className="footer-links">
                    <h4>Job Categories</h4>
                    <Link to="#">Telecommunications</Link>
                    <Link to="#">Hotels & Tourism</Link>
                    <Link to="#">Construction</Link>
                    <Link to="#">Education</Link>
                    <Link to="#">Financial Services</Link>
                </div>

                <div className="footer-newsletter">
                    <h4>Newsletter</h4>
                    <p>
                        Eu nunc pretium vitae platea. Non netus elementum vulputate.
                    </p>

                    <input type="email" placeholder="Email Address" />
                    <button>Subscribe now</button>
                </div>

            </div>
            <div className="footer-bottom">
                <p>© Copyright Job Portal 2024. Designed by Figma.guru</p>

                <div className="legal">
                    <Link to="#">Privacy Policy</Link>
                    <Link to="#">Terms & Conditions</Link>
                </div>
            </div>

        </footer>
    );
};

export default Footer;
