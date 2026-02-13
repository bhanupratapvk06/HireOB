import { useState } from "react";
import axios from 'axios';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FaArrowRightLong, FaEye, FaEyeSlash, FaFacebook } from "react-icons/fa6";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loader from "../../components/Loader/Loader";


const Auth = () => {
  const navigate = useNavigate();
  const { login, register, loading } = useAuth();


  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");


  const handleSendOtp = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/otp/sendOTP", {
        email: formData.email
      });

      if (res.status === 200) {
        setOtpSent(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/otp/verifyOTP", {
        email: formData.email,
        otp
      });

      if (res.status === 200) {
        setEmailVerified(true);
        setOtpSent(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isRegister) {
        await register(formData);
      } else {
        await login(formData.email, formData.password);
      }

      navigate("/");

    } catch (err) {
      console.log(err);
    }
  };




  return (
    <div className="login-wrapper">
      <div className="login-container">

        <div className="left-portion">
          <div className="overlay-content">

            <div className="top">
              <div className="logo">
                <h2>HireOB</h2>
              </div>

              <div onClick={() => navigate('/')} className="back-btn">
                <p>Back to Home</p>
                <FaArrowRightLong color="white" size={16} />
              </div>
            </div>

            <div className="down">
              <h1>
                Capturing Moments,<br />
                Creating Memories
              </h1>
            </div>

          </div>
        </div>


        <div className="right-portion">
          <h2 className="logo">HireOB</h2>

          <p className="subtitle">
            {isRegister
              ? "Create your account to get started"
              : "Please Enter your Account details"}
          </p>

          {isRegister && (
            <>
              <label>Name</label>
              <input
                name="username"
                type="text"
                placeholder="Your name"
                value={formData.username}
                onChange={handleChange}
              />


              <label>Role</label>
              <div className="role-select">
                <button
                  type="button"
                  className={`role-btn ${formData.role === "jobseeker" ? "active" : ""}`}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, role: "jobseeker" }))
                  }
                >
                  Job Seeker
                </button>

                <button
                  type="button"
                  className={`role-btn ${formData.role === "recruiter" ? "active" : ""}`}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, role: "recruiter" }))
                  }
                >
                  Recruiter
                </button>
              </div>
            </>
          )}

          <label>Email</label>

          <div className="email-wrapper">
            <input
              name="email"
              type="email"
              placeholder="Johndoe@gmail.com"
              value={formData.email}
              disabled={emailVerified}
              onChange={handleChange}
            />

            {isRegister && !emailVerified && (
              <button
                type="button"
                className="verify-btn"
                onClick={handleSendOtp}
                disabled={!formData.email}
              >
                Verify
              </button>
            )}
          </div>

          {isRegister && emailVerified && (
            <p className="verified-text">Email Verified ✓</p>
          )}


          {otpSent && !emailVerified && (
            <>
              <label>Enter OTP</label>
              <input
                type="text"
                placeholder="6-digit code"
                onChange={(e) => setOtp(e.target.value)}
              />

              <button
                type="button"
                className="verify-otp-btn"
                onClick={handleVerifyOtp}
              >
                Confirm OTP
              </button>
            </>
          )}



          <label>Password</label>
          <div className="password-wrapper">
            <input
              name="password"
              type={!showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
            <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </span>
          </div>

          {!isRegister && <p className="forgot">Forgot Password</p>}


          <button onClick={handleSubmit} className="primary-btn" disabled={loading}>
            {loading ? <Loader /> : (isRegister ? "Register" : "Login")}
          </button>



          <div className="socials">
            <div className="circle"><FcGoogle size={20} /></div>
            <div className="circle"><FaGithub color="black" size={20} /></div>
            <div className="circle"><FaFacebook size={20} color="#1575eb" /></div>
          </div>



          <button
            className="toggle-auth"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister
              ? "Already have an account? Sign in"
              : "Create an account"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;
