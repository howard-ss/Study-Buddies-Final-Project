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
		const { name, email, password } = req.body;

		// Save the user details to the database (implement your logic here)
		await db.query(
			"INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
			[name, email, password]
		);

		res.status(201).json({ message: "User registered successfully" });
	} catch (error) {
		logger.error("Error registering user:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

// Route for user login
router.post("/login", async (req, res) => {
	const {  email, password } = req.body;
	console.log(req.body);

	// Assuming the user data is sent in the request body

	// Construct the SQL query to insert the user data
	const insertQuery =
		"SELECT  * FROM users  WHERE email=$1 AND password=$2";
	const insertValues = [ email, password ];

	try{
	// Execute the query to insert the user data and get the inserted record
	const selectedResult = await db.query(insertQuery, insertValues)
	
		if (selectedResult.rows.length===1) {
			const user = selectedResult.rows[0]
			res.json ({user})
		} else {
			res.status(401).json("Invalid email or password");
    }
  } catch (error) {
    console.log("Database error:", error);
    res.status(500).json("An error occurred during login");
}
	});


router.post("/avail", async (req, res) => {
	 
		const { user_id, selected_date, selected_time, topic } = req.body;
		console.log(req.body)
		try{
	
		// Save the user details to the database (implement your logic here)
		await db.query(
			"INSERT INTO availability (user_id, selected_date, selected_time, topic) VALUES ($1, $2, $3, $4)",
			[user_id, selected_date, selected_time, topic]
		);

		res.status(201).json({ message: "User registered successfully" });
	} catch (error) {
		logger.error("Error registering user:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});
// Route for retrieving matching trainees based on availability and topic
// router.get("/trainees", async (req, res) => {
// 	try {
// 		const { name, topics_of_interest, availability, time } = req.query;

		// Perform the necessary logic to fetch matching trainees based on availability, topic, and time
// 		const matchingTrainees = await getMatchingTrainees(
// 			name,
// 			topics_of_interest,
// 			availability,
// 			time
// 		);

// 		res.json({ matchingTrainees });
// 	} catch (error) {
// 		logger.error("Error retrieving matching trainees:", error);
// 		res.status(500).json({ error: "Internal server error" });
// 	}
// });

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
