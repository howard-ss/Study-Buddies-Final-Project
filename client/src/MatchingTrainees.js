import React, { useEffect, useState } from "react";
import axios from "axios";

const MatchingTrainees = () => {
	const [matchedTrainees, setMatchedTrainees] = useState([]);

	useEffect(() => {
		const fetchMatchedTrainees = async () => {
			try {
				const response = await axios.get("/api/matching_trainees");
				const data = response.data;
				setMatchedTrainees(data);
			} catch (error) {
				console.error("Error fetching matched trainees:", error);
			}
		};

		fetchMatchedTrainees();
	}, []);

	return (
		<div>
			<h2>Matched Trainees</h2>
			{matchedTrainees.length === 0 ? (
				<p>No trainees matched at the moment.</p>
			) : (
				<ul>
					{matchedTrainees.map((trainee) => (
						<li key={trainee.id}>
							Trainee ID: {trainee.trainee_id}, Name: {trainee.name},
							Availability: {trainee.availability}, Topics of Interest:{" "}
							{trainee.topics_of_interest}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default MatchingTrainees;
