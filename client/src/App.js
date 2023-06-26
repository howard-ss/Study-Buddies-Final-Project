import React from "react";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AvailabilityForm from "./AvailabilityForm";
import MatchingTrainees from "./MatchingTrainees";

const App = () => {
  const [hasAccount, setHasAccount] = useState(false);


  return (
      <div>
         <Header hasAccount={hasAccount} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login setHasAccount={setHasAccount} />} />
        <Route path="/register" element={<Register setHasAccount={setHasAccount} />} />
      <AvailabilityForm />
      <MatchingTrainees />
      </Routes>
    </div>
  );
};

const Home = () => (
  <div>
    <h1>Welcome to the Main Page</h1>
    <p>Choose an option from the navigation menu.</p>
  </div>
);

export default App;
