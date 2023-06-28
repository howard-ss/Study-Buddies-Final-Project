import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = ({ hasAccount }) => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to="/" activeclassname="active" exact>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" activeclassname="active" exact>
              About
            </NavLink>
          </li>
          {hasAccount ? (
            <li>
              <NavLink to="/login" activeclassname="active" exact>
                Login
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink to="/register" activeclassname="active" exact>
                Register
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
