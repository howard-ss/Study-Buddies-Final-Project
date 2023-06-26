import React, { useState } from "react";
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