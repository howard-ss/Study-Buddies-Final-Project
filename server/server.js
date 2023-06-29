import express from "express";
import config from "./utils/config";
import cors from "cors";
import { pool } from "./db";

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
	res.send("Server is running.");
});

app.post("/api/register", async (req, res) => {
	try {
		const { username, password, email, phone } = req.body;

		// Save the user details to the database (implement your logic here)
		await pool.query(
			"INSERT INTO users (username, password, email, phone) VALUES ($1, $2, $3, $4)",
			[username, password, email, phone]
		);

		res.status(201).json({ message: "User registered successfully" });
	} catch (error) {
		console.error("Error registering user:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

app.get("/api/trainees", async (req, res) => {
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
		console.error("Error retrieving matching trainees:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

async function getMatchingTrainees(
	name,
	topics_of_interest,
	availability,
	time
) {
	// Implement the logic to fetch the matching trainees
	// Return an array of matching trainees

	// Example implementation:
	const result = await pool.query(
		"SELECT * FROM trainees WHERE name=$1 AND topics_of_interest = $2 AND availability = $3 AND time = $4",
		[name, topics_of_interest, availability, time]
	);
	const matchingTrainees = result.rows;

	return matchingTrainees;
}

app.listen(config.port, () => {
	console.log(`Server is running on port ${config.port}`);
});
