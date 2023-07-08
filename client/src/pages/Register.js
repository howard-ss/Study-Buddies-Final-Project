// import React, { useState } from "react";
// import "./Register.css";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";


// function RegisterPage() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const navigate = useNavigate();

//   const handleNameChange = (e) => {
//     setName(e.target.value);
//   };

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   const handleConfirmPasswordChange = (e) => {
//     setConfirmPassword(e.target.value);
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//     const response = await axios.post("/api/register", {
//       name,
//       email,
//       password,
//       })
//       console.log(response.data);
//       alert("Registration successful!"); // Display success message
//     }catch (error){
//       console.error("Error during registration:", error);
//       alert("An error occurred during registration."); // Display error message
  
//     }
//   };
//     const handleDirect = () => {
// 			navigate("/AvailabilityForm");
// 		};


//   return (
//     <div className="container">
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="name">Name:</label>
//           <input type="text" id="name" value={name} onChange={handleNameChange} placeholder="Enter your name" required />
//         </div>
//         <div className="form-group">
//           <label htmlFor="email">Email:</label>
//           <input type="email" id="email" value={email} onChange={handleEmailChange} placeholder="Enter your email" required />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password:</label>
//           <input type="password" id="password" value={password} onChange={handlePasswordChange} placeholder="Enter your password" required />
//         </div>
//         <div className="form-group">
//           <label htmlFor="confirm-password">Confirm Password:</label>
//           <input type="password" id="confirm-password" value={confirmPassword} onChange={handleConfirmPasswordChange} placeholder="Confirm your password" required />
//         </div>
       
//         <button className="btn" type="submit" onClick={handleSubmit },{ handleDirect}>Register</button>
//       </form>
//     </div>
//   );
// }

// export default RegisterPage;
import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const navigate = useNavigate();

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
		try {
			const response = await axios.post("/api/register", {
				name,
				email,
				password,
			});
			console.log(response.data);
			alert("Registration successful!"); // Display success message
			navigate("/login"); // Redirect to login page after successful registration
		} catch (error) {
			console.error("Error during registration:", error);
			alert("An error occurred during registration."); // Display error message
		}
	};

	return (
		<div className="container">
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
				<button className="btn" type="submit">
					Register
				</button>
			</form>
		</div>
	);
}

export default RegisterPage;
