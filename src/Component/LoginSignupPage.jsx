import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Style/Login.css';

const LoginSignupPage = () => {
  const [isSignupComplete, setIsSignupComplete] = useState(false);
  const [signupDetails, setSignupDetails] = useState({ name: "", email: "", password: "" });
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSignup = () => {
    const { name, email, password } = signupDetails;

    if (name && email && password) {
      alert("Signup successful! Please login.");
      setIsSignupComplete(true);
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleLogin = () => {
    const { email, password } = loginDetails;

    if (email && password) {
      if (email === signupDetails.email && password === signupDetails.password) {
        alert("Login successful!");
        navigate("/dashboard");
      } else {
        alert("Invalid email or password.");
      }
    } else {
      alert("Please enter both email and password.");
    }
  };

  return (
    <div className="login-signup-container">
      <div className="form-container">
        {/* Left Side (Image/Background Section) */}
        <div className="left-section">
          <div className="text-center">
            <h1 className="title">Welcome Back!</h1>
            <p>Join us to access the best services tailored for you.</p>
          </div>
        </div>

        {/* Right Side (Form Section) */}
        <div className="right-section">
          {isSignupComplete ? (
            <>
              <h2 className="form-title">Login</h2>
              <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    value={loginDetails.email}
                    onChange={(e) => setLoginDetails({ ...loginDetails, email: e.target.value })}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    value={loginDetails.password}
                    onChange={(e) => setLoginDetails({ ...loginDetails, password: e.target.value })}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <button type="submit" className="btn">Login</button>
              </form>
            </>
          ) : (
            <>
              <h2 className="form-title">Sign Up</h2>
              <form onSubmit={(e) => { e.preventDefault(); handleSignup(); }}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={signupDetails.name}
                    onChange={(e) => setSignupDetails({ ...signupDetails, name: e.target.value })}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    value={signupDetails.email}
                    onChange={(e) => setSignupDetails({ ...signupDetails, email: e.target.value })}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    value={signupDetails.password}
                    onChange={(e) => setSignupDetails({ ...signupDetails, password: e.target.value })}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <button type="submit" className="btn">Sign Up</button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignupPage;
