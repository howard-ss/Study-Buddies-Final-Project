
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: Handle login logic
  //   if (username === "admin" && password === "password") {
  //     navigate("/");
  //   } else {
  //     alert("Invalid username or password.");
  //   }
  // };
  };
  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <h1>Study Buddies Page</h1>
      <main>
        <section>
          <h2 className="login-title">Login</h2>
          <form className="login-form" onSubmit={handleLogin}>
            <label htmlFor="login-username" className="login-label">
              Username
            </label>
            <input
              type="text"
              id="login-username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="login-input"
            />

            <label htmlFor="login-password" className="login-label">
              Password
            </label>
            <input
              type="password"
              id="login-password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
            />
            <Link to="/forgot-password" className="forgot-password-link">
              Forgot Password?
            </Link>
            {/* Stay Logged In checkbox */}
            <div className="stay-logged-in-container">
              <input
                type="checkbox"
                id="stay-logged-in"
                name="stay-logged-in"
                checked={stayLoggedIn}
                onChange={(e) => setStayLoggedIn(e.target.checked)}
                className="stay-logged-in-checkbox"
              />
              <label htmlFor="stay-logged-in" className="stay-logged-in-label">
                Stay Logged In
              </label>
            </div>

            {/* Login button */}
            <button type="submit" className="login-button">
              Login
            </button>

            {/* Register link */}
            <div className="register-link-container">
              <span>Do not have an account? </span>
              <button
                type="button"
                className="register-link"
                onClick={handleRegister}
              >
                Register now
              </button>
            </div>
            <div className="social-login">
              <button className="social-button">Facebook</button>
              {/* Example: LinkedIn */}
              <button className="social-button"> LinkedIn</button>
              {/* Example: Twitter */}
              <button className="social-button">Twitter</button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default Login;
