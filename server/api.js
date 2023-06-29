import { Router } from "express";
import logger from "./utils/logger";
import db from "./db";

const router = Router();

// Root route for welcoming everyone
router.get("/", (_, res) => {
	logger.debug("Welcoming everyone...");
	res.json({ message: "Hello, world!" });
});

// Route for user registration
router.post("/register", async (req, res) => {
	try {
		const { username, password, email, phone } = req.body;

		// Save the user details to the database (implement your logic here)
		await db.query(
			"INSERT INTO users (username, password, email, phone) VALUES ($1, $2, $3, $4)",
			[username, password, email, phone]
		);

		res.status(201).json({ message: "User registered successfully" });
	} catch (error) {
		logger.error("Error registering user:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

// Route for retrieving matching trainees based on availability and topic
router.get("/trainees", async (req, res) => {
	try {
		const { name, topics_of_interest, availability, time } = req.query;

		// Perform the necessary logic to fetch matching trainees based on availability, topic, and time
		const matchingTrainees = await getMatchingTrainees(
			name,
			topics_of_interest,
			availability,
			time
		);

		res.json({ matchingTrainees });
	} catch (error) {
		logger.error("Error retrieving matching trainees:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

// Function to retrieve matching trainees based on availability, topic, and time
async function getMatchingTrainees(name,topics_of_interest, availability, time) {
	// Implement the logic to fetch the matching trainees
	// Return an array of matching trainees

	// Example implementation:
	const result = await db.query(
		"SELECT * FROM trainees WHERE name=$1 And topics_of_interest = $3 AND availability = $2 AND time = $4",
		[name, topics_of_interest, availability, time]
	);
	const matchingTrainees = result.rows;

	return matchingTrainees;
}

export default router;
