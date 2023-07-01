import React, { useState } from "react";
import "./Register.css";
import axios from "axios";

function RegisterPage() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("/api/register", {
      userName,
      email,
      password,
      })
      console.log(response.data);
    // Perform registration logic here
    // You can access the form values: name, email, password, confirmPassword, and phone
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={userName} onChange={handleNameChange} placeholder="Enter your name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} placeholder="Enter your email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} placeholder="Enter your password" required />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input type="password" id="confirm-password" value={confirmPassword} onChange={handleConfirmPasswordChange} placeholder="Confirm your password" required />
        </div>
       
        <button className="btn" type="submit" onClick={handleSubmit}>Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
