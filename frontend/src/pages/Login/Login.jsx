import { useState } from "react";
import axios from 'axios';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { FaEye, FaEyeSlash, FaFacebook } from "react-icons/fa6";
import "./login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


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

    const endpoint = isRegister ? "register" : "login";

    try {
      const res = await axios.post(
        `http://localhost:5000/api/user/${endpoint}`,
        formData
      );

      if (res.status === 200 || res.status === 201) {
        console.log(res.data.message);
        if(res.data.token) localStorage.setItem('token',res.data.token);

        // optional: redirect or store token
        // localStorage.setItem("token", res.data.token);
        // navigate("/");
      }

    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";

      console.log(
        `${isRegister ? "Registration" : "Login"} failed: ${message}`
      );
    }
  };



  return (
    <div className="login-wrapper">
      <div className="login-container">


        <div className="login-left">
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
          <input
            name="email"
            type="email"
            placeholder="Johndoe@gmail.com"
            value={formData.email}
            onChange={handleChange}
          />

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

          <button onClick={handleSubmit} className="primary-btn">
            {isRegister ? "Create Account" : "Sign in"}
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



        <div className="login-right">
          <div className="testimonial">
            <h1>What’s our Jobseekers Said.</h1>

            <p className="quote">
              “Search and find your dream job is now easier than ever.
              Just browse a job and apply if you need to.”
            </p>

            <h3>Mas Parjono</h3>
            <span className="role">UI Designer at Google</span>

            <div className="arrows">
              <button className="arrow light"><HiArrowLeft /></button>
              <button className="arrow dark"><HiArrowRight /></button>
            </div>

            <div className="bottom-card">
              <h4>Get your right job and right place apply now</h4>
              <p>
                Be among the first founders to experience the easiest way to start
                run a business.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;
