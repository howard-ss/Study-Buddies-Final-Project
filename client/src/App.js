import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./pages/About";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AvailabilityForm from "./pages/AvailabilityForm";
import MatchingTrainees from "./MatchingTrainees";

const App = () => {
  const [hasAccount, setHasAccount] = useState(false);

  return (
		<div>
			<Header hasAccount={hasAccount} />
			<Routes>
				<Route path="/dashboard" element={<AvailabilityForm  />} />
				 {/* <Route path="/" element={<MatchingTrainees />} />  */}
				<Route path="/about" element={<About />} />
				<Route
					path="/login"
					element={<Login setHasAccount={setHasAccount} />}
				/>
				<Route
					path="/register"
					element={<Register setHasAccount={setHasAccount} />}
				/>
			</Routes>
			<Footer />
		</div>
	);
};

// const Home = () => (
//   <div>
//     <h1>Welcome to the Main Page</h1>
//     <p>Choose an option from the navigation menu.</p>
//   </div>
// );

export default App;
