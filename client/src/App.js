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
import SupportChat from "./components/SupportChat";

const App = () => {
  const [hasAccount, setHasAccount] = useState(false);
  const [isOpenGPT, setIsOpenGPT] = useState(false);

  const openGPT = () => {
	setIsOpenGPT(true)
  }

  return (
		<div>
			<div isOpenGPT>
				<SupportChat/>
			</div>
			<div onclick={openGPT}>Chat With Me for Anything Else</div>
			<Routes>
      			<Route path="/" element={<Home  />} />
				<Route path="/booking" element={<AvailabilityForm  />} />
				<Route path="/dashboard" element={<Dashboard />} />  
				<Route path="/about" element={<About />} />
				<Route path="/login"
					element={<Login setHasAccount={setHasAccount} />} />
				<Route path="/register"
					element={<Register setHasAccount={setHasAccount} />} />
				<Route path="/completions" element={<SupportChat/>}/>
			</Routes>
			<Footer />
		</div>
	);
};

export default App;
