import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

// New import
import { useState } from "react";
import SupportChat from "../pages/SupportChat";

const Header = () => {
  
  //New state
  const [isOpenGPT, setIsOpenGPT] = useState(false);
  return (

<nav>
<ul className="navbar">
      <li><Link to="/">Home</Link></li>
        {/* <li><Link to="/about">About</Link></li> */}
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
        {/* <li><Link to="/SupportChat">Talk With Me</Link></li> */}
        
        <li>
          <button onClick={() => setIsOpenGPT(!isOpenGPT)}>
            Talk With Me
          </button>
        </li>
      </ul>

      
      {isOpenGPT && (
        <React.Fragment>
           <SupportChat />
        </React.Fragment> 
        )}
        

    </nav>
  );
};

export default Header;
