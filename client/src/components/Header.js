import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = ({ hasAccount }) => {
   return (
//     <header>
//       <nav>
//         <ul>
//           <li>
//             <NavLink to="/" activeclassname="active" exact>
//               Home
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/about" activeclassname="active" exact>
//               About
//             </NavLink>
//           </li>
//           {hasAccount ? (
//             <li>
//               <NavLink to="/login" activeclassname="active" exact>
//                 Login
//               </NavLink>
//             </li>
//           ) : (
//             <li>
//               <NavLink to="/register" activeclassname="active" exact>
//                 Register
//               </NavLink>
//             </li>
//           )}
//         </ul>
//       </nav>
//     </header>
//   );
// };

<nav>
<ul className="navbar">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
      </ul>
    </nav>
  );
};

export default Header;
