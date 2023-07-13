import React, { useEffect, useState } from "react";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";    

function RegisterPage() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const navigate = useNavigate();

	const [user, setUser] = useState("");
	const [loading, setLoading] = useState(false);
	const handleNameChange = (e) => {
		setName(e.target.value);
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
		setLoading(true);
		try {
			const response = await axios.post("/api/register", {
				name,
				email,
				password,
			});
			setUser(response.data)
			console.log(response.data);
			
			setLoading(false);
			// alert("Registration successful!"); // Display success message
			// navigate("/login"); // Redirect to login page after successful registration
		} catch (error) {
			console.error("Error during registration:", error);
			alert("An error occurred during registration."); // Display error message
		}
	};
useEffect(() =>{
	if(user){
		 	navigate("/login");
		}
}, [user]);
	return (
		<div className="container">
			<h1>Study Buddies Page</h1>
			<h2>Register</h2>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="name">Name:</label>
					<input
						type="text"
						id="name"
						value={name}
						onChange={handleNameChange}
						placeholder="Enter your name"
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						id="email"
						value={email}
						onChange={handleEmailChange}
						placeholder="Enter your email"
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={handlePasswordChange}
						placeholder="Enter your password"
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="confirm-password">Confirm Password:</label>
					<input
						type="password"
						id="confirm-password"
						value={confirmPassword}
						onChange={handleConfirmPasswordChange}
						placeholder="Confirm your password"
						required
					/>
				</div>
				<button className="btn" type="submit" disabled={loading}>
					Register
				</button>
				{loading? (<p>Loading ...</p>): null}
			</form>
		</div>
	);
}

export default RegisterPage;
