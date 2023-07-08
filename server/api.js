// import { Router } from "express";
// import { google } from "googleapis";
// import logger from "./utils/logger";
// import db from "./db";


// const router = Router(); 

// // Root route for welcoming everyone
// router.get("/", (_, res) => {
// 	logger.debug("Welcoming everyone...");
// 	res.json({ message: "Hello, world!" });
// }); 

// // Route for user registration

// router.post("/register", async (req, res) => {
// 	try {
// 	  const { name, email, password } = req.body;
// 	  // Define the insertQuery variable
// 	  const insertQuery =
// 		"INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING email, name, id";
// 	  // Execute the query to insert the user data and get the inserted record
// 	  const result = await db.query(insertQuery, [name, email, password]);
// 	  const user = result.rows[0];
// 	  // Exclude the password from the response
// 	  const response = {
// 		email: user.email,
// 		name: user.name,
// 		id: user.id,
// 	  };
// 	  res.status(201).json({ message: "User registered successfully" });
// 	} catch (error) {
// 		console.error("Error registering user:", error);
// 		res.status(500).json({ error: "Internal server error" });
// 	}

// // Route for user login
// router.post("/login", async (req, res) => {
// 	const {  email, password } = req.body;
// 	console.log(req.body);

// 	// Assuming the user data is sent in the request body,
// 	// Construct the SQL query to insert the user data

// 	const insertQuery =
// 		"SELECT  * FROM users  WHERE email=$1 AND password=$2";
// 	const insertValues = [ email, password ];

// 	try{
// 	// Execute the query to insert the user data and get the inserted record
// 	const selectedResult = await db.query(insertQuery, insertValues)
	

// 		if (selectedResult.rows.length === 1) {
// 			const user = selectedResult.rows[0];
// 			res.json ({ id:user.id, email:user.email })
// 		} else {
// 			res.status(401).json("Invalid email or password");
//     }
//   } catch (error) {
//     console.log("Database error:", error);
//     res.status(500).json("An error occurred during login");
// }
// 	});

// // Route for user availability
// router.post("/avail", async (req, res) => {
// 	const { user_id, selected_date, selected_time, topic } = req.body;
// 	 console.log(req.body);
// 	try {
// 		// Save the user details to the database (implement your logic here)
// 		await db.query(
// 			"INSERT INTO availability (user_id, selected_date, selected_time, topic) VALUES ($1, $2, $3, $4)",
// 			[user_id, selected_date, selected_time, topic]
// 		);
		
// 		 const matchingTrainees = await getMatchingTrainees(
// 				user_id,
// 				selected_date,
// 				selected_time,
// 				topic,
// 		 )

// 			if (matchingTrainees.length > 3) {
// 				// Match found, send a notification to the user
				
// 				res.status(201).json({ message: "We found a match",eventData:matchingTrainees });
// 			} else {
// 				res.status(200).json({ message: "No match found" });
// 			}
// 	} catch (error) {
// 		logger.error("Error registering user:", error);
// 		res.status(500).json({ error: "Internal server error" });
// 	}
// });

// // Function to retrieve matching trainees based on availability, topic, and time
// async function getMatchingTrainees(selected_date, selected_time, topic) {
// 	// Implement the logic to fetch the matching trainees
// 	// Return an array of matching trainees

// 	// Example implementation:
// 	console.log(selected_date, selected_time);
// 	const result = await db.query(
// 		"SELECT * FROM availability WHERE  selected_date  = $1 AND selected_time = $2 AND topic = $3",

// 		[selected_date, selected_time, topic ]
// 	);
	
// 	const matchingTrainees = result.rows;

// 	return matchingTrainees;
// }
// })
// export default router;

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
		const insertQuery =
			"INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING email, name, id";
		const result = await db.query(insertQuery, [name, email, password]);
		const user = result.rows[0];
		const response = {
			email: user.email,
			name: user.name,
			id: user.id,
		};
		res.status(201).json(response);
	} catch (error) {
		logger.error("Error registering user:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

// Route for user login
router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		const selectQuery =
			"SELECT * FROM users WHERE email = $1 AND password = $2";
		const result = await db.query(selectQuery, [email, password]);
		const user = result.rows[0];
		if (user) {
			res.status(200).json({ user }); // Send the user data in the response
		} else {
			res.status(401).json("Invalid email or password");
		}
	} catch (error) {
		logger.error("Error logging in:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});


// Route for user availability
router.post("/avail", async (req, res) => {
	try {
		const { user_id, selected_date, selected_time, topic } = req.body;
		await db.query(
			"INSERT INTO availability (user_id, selected_date, selected_time, topic) VALUES ($1, $2, $3, $4)",
			[user_id, selected_date, selected_time, topic]
		);

		const matchingTrainees = await getMatchingTrainees(
			user_id,
			selected_date,
			selected_time,
			topic
		);

		if (matchingTrainees.length > 3) {
			res.status(201).json({
				message: "Match found!",
				eventData: matchingTrainees,
			});
		} else {
			res.status(200).json({ message: "No match found." });
		}
	} catch (error) {
		logger.error("Error submitting availability:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

async function getMatchingTrainees(
	user_id,
	selected_date,
	selected_time,
	topic
) {
	const selectQuery =
		"SELECT * FROM availability WHERE user_id = $1 AND selected_date = $2 AND selected_time = $3 AND topic = $4";
	const result = await db.query(selectQuery, [
		user_id,
		selected_date,
		selected_time,
		topic,
	]);
	const matchingTrainees = result.rows;
	return matchingTrainees;
}
});

export default router;
