// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const MatchingTrainees = () => {
// 	const [matchedTrainees, setMatchedTrainees] = useState([]);

// 	useEffect(() => {
// 		const fetchMatchedTrainees = async () => {
// 			try {
// 				const response = await axios.get("/api/trainees");
// 				const data = response.data;
// 				setMatchedTrainees(data.matchingTrainees);
// 			} catch (error) {
// 				console.error("Error fetching matched trainees:", error);
// 			}
// 		};

// 		fetchMatchedTrainees();
// 	}, []);

// 	return (
// 		<div>
// 			<h2>Matched Trainees</h2>
// 			{matchedTrainees.length === 0 ? (
// 				<p>No trainees matched at the moment.</p>
// 			) : (
// 				<ul>
// 					{matchedTrainees.map((trainee) => (
// 						<li key={trainee.id}>
// 							Trainee ID: {trainee.id}, Name: {trainee.username}, Availability:{" "}
// 							{trainee.availability}, Topics of Interest:{" "}
// 							{trainee.topics_of_interest}
// 						</li>
// 					))}
// 				</ul>
// 			)}
// 		</div>
// 	);
// };

// export default MatchingTrainees;
