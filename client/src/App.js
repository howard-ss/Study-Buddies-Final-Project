import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import About from "./pages/About";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AvailabilityForm from "./pages/AvailabilityForm";
import MatchingTrainees from "./MatchingTrainees";
import Dashboard from "./pages/Dashboard";
import SupportChat from "./components"

const App = () => {
  const [hasAccount, setHasAccount] = useState(false);

  return (
		<div>
		
			<Routes>
      <Route path="/" element={<Home  />} />
				<Route path="/booking" element={<AvailabilityForm  />} />
				<Route path="/dashboard" element={<Dashboard />} />  
				<Route path="/about" element={<About />} />
				<Route path="/login"
					element={<Login setHasAccount={setHasAccount} />} />
				<Route path="/register"
					element={<Register setHasAccount={setHasAccount} />} />
			</Routes>
			<Footer />
		</div>
	);
};

export default App;
