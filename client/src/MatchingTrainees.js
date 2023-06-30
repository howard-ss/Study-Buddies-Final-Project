import React, { useEffect, useState } from "react";
import axios from "axios";

const MatchingTrainees = () => {
	const [matchedTrainees, setMatchedTrainees] = useState([]);

	useEffect(() => {
		fetchMatchedTrainees();
	}, []);

	const fetchMatchedTrainees = async () => {
		try {
			// Make an API call to fetch the matched trainees
			const response = await axios.get("/api/matched-trainees");

			// Update the state with the fetched matched trainees
			setMatchedTrainees(response.data);
		} catch (error) {
			console.error("Error fetching matched trainees:", error);
		}
	};

	return (
		<div>
			<h2>Matched Trainees</h2>
			{matchedTrainees.length > 0 ? (
				<ul>
					{matchedTrainees.map((trainee) => (
						<li key={trainee.id}>{trainee.name}</li>
					))}
				</ul>
			) : (
				<p>No matched trainees found.</p>
			)}
		</div>
	);
};

export default MatchingTrainees;
