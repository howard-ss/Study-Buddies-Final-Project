import React, { useState } from "react";
<<<<<<< HEAD
import { Link } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
     //const history = useHistory();

    const handleLogin = (e) => {
      e.preventDefault();
    //   if (username === "admin" && password === "password") {
    //     history.push("/");
    //   } else {
    //     alert("Invalid username or password.");
    //   }
    };
  return (
    <div>
    <h1>Story Page</h1>
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/my-stories">My Stories</Link></li>
      </ul>
    </nav>

  <main>
    <section>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="login-username">Username</label>
        <input
          type="text"
          id="login-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
             <br />
            <label htmlFor="login-password">Password</label>
            <input
              type="password"
              id="login-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br />
            <button type="submit">Login</button>
          </form>
        </section>
      </main>

      <footer>
        <p>© 2023 Your Story Page. All rights reserved.</p>
      </footer>
    </div>
  );
  }
 export default Login;
=======
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const navigate = useNavigate();

const handleLogin = async (e) => {
	e.preventDefault();
	try {
		const response = await axios.post("/api/login", {
			email,
			password,
		});
		console.log(response.data);

		if (response.data.user) {
			// Successful login, navigate to the desired page
			navigate("/AvailabilityForm");
		} else {
			// Handle unsuccessful login, show an error message
			alert("Invalid email or password.");
		}
	} catch (error) {
		// Handle any errors that occurred during the login request
		console.log("Error occurred during login:", error);
		alert("An error occurred during login.");
	}
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
            <label htmlFor="login-email" className="login-label">
              Username
            </label>
            <input
              type="text"
              id="login-email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          </form>
        </section>
      </main>
    </div>
  );
}

export default Login;
>>>>>>> 9298b6827015c0dc0046017e9a39d0e4fee0b3da
