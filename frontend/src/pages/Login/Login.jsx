import React, { useState } from "react";
import "./login.css";

import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaFacebookF } from "react-icons/fa";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { FaFacebook } from "react-icons/fa6";

const Login = () => {

  const [isRegister, setIsRegister] = useState(false);

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
              <input type="text" placeholder="Your name" />
            </>
          )}

          <label>Email</label>
          <input type="email" placeholder="Johndoe@gmail.com" />

          <label>Password</label>
          <input type="password" placeholder="••••••••" />

          {!isRegister && <p className="forgot">Forgot Password</p>}

   
          <button className="primary-btn">
            {isRegister ? "Create Account" : "Sign in"}
          </button>

          <div className="socials">
            <div className="circle"><FcGoogle size={20} /></div>
            <div className="circle"><FaGithub color="black" size={20} /></div>
            <div className="circle"><FaFacebook size={20} color="#1575eb"/></div>
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
