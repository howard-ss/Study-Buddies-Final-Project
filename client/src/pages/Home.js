import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AvailabilityForm from "./AvailabilityForm";
import "./Home.css";
import logoImage from "../public/cyf-image.jpg";


export function Home() {
	const [message, setMessage] = useState("Loading...");

	useEffect(() => {
		fetch("/api")
			.then((res) => {
				if (!res.ok) {
					throw new Error(res.statusText);
				}
				return res.json();
			})
			.then((body) => {
				setMessage("Study Buddies");
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	return (
		<main role="main">
      		<div className="container">
			  <div className="header">
        	   <h1 className="heading">Study Buddies</h1>
               <Link to="/login">Login</Link>
         	 </div>
        	<div className="content">
         	 <div className="left">
           	 <img
              className="cyf-image"
              src={logoImage}
              alt="Code Your Future study session"
            />
          </div>
        </div>
	  </div>
	</main>
   );
}

export default Home;
