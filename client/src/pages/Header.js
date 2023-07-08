import React from "react";
import { NavLink } from "react-router-dom";

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
            <NavLink to="/about" activeclassname="active">
              About
            </NavLink>
          </li>
          <li>
            {hasAccount ? (
              <NavLink to="/login" activeclassname="active">
                Login
              </NavLink>
            ) : (
              <NavLink to="/register" activeclassname="active">
                Register
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
