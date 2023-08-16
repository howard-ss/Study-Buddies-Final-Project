import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

// New import
import { useState } from "react";

const Header = () => {
  
  //New state
  const [isOpenGPT, setIsOpenGPT] = useState(false);
  return (
		<nav>
			<ul className="navbar">
				<li>
					<Link to="/">Home</Link>
				</li>
				{/* <li><Link to="/about">About</Link></li> */}
				<li>
					<Link to="/login">Login</Link>
				</li>
				<li>
					<Link to="/register">Register</Link>
				</li>
			</ul>

		</nav>
	);
};

export default Header;
