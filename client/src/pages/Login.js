import React, { useState } from "react";
//import { Link } from "react-router-dom";
import "./Login.css";

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
    <div className="login-container">
    <h1>Story Page</h1>
    {/* <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/my-stories">My Stories</Link></li>
      </ul>
    </nav> */}

<main>
        <section>
          <h2 className="login-title">Login</h2>
          <form className="login-form" onSubmit={handleLogin}>
            <label htmlFor="login-username" className="login-label">Username</label>
            <input
              type="text"
              id="login-username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="login-input"
            />

            <label htmlFor="login-password" className="login-label">Password</label>
            <input
              type="password"
              id="login-password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
            />

            <button type="submit" className="login-button">Login</button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default Login;