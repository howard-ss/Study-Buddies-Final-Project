import React, { useState, useEffect } from "react";

const MatchingTrainees = () => {
	const [matchingTrainees, setMatchingTrainees] = useState([]);

	useEffect(() => {
		const getMatchingTrainees = async () => {
			try {
				// Make an API call to retrieve matching trainees based on availability and topics of interest
				const response = await fetch("/api/matching-trainees"); // Adjust the API endpoint if needed
				const data = await response.json();

				// Update the state with the retrieved data
				setMatchingTrainees(data.matchingTrainees);
			} catch (error) {
				console.error("Error getting matching trainees:", error);
			}
		};

		getMatchingTrainees();
	}, []);

	return (
		<div>
			<h2>Matching Trainees</h2>
			{matchingTrainees.length > 0 ? (
				matchingTrainees.map((trainee) => (
					<div key={trainee.traineeId}>
						<h3>{trainee.name}</h3>
						<p>Availability: {trainee.availability}</p>
						<p>Topics of Interest: {trainee.topicsOfInterest}</p>
					</div>
				))
			) : (
				<p>No matching trainees found</p>
			)}
		</div>
	);
};

export default MatchingTrainees;
