import { Router } from "express";
import logger from "./utils/logger";
import db from "./db";
import sendNotification from "./utils/notification";



const router = Router();

// Root route for welcoming everyone
router.get("/", (_, res) => {
	logger.debug("Welcoming everyone...");
	res.json({ message: "Hello, world!" });
});

// //mock users data
// const users = [
//   { id: 1, username: "admin", password: "password" },
//   // Add more user objects as needed
// ];


// Login route
// router.post("/login", (req, res) => {
//   const { username, password } = req.body;
//   console.log(req.body);

  // Find the user with the matching username
//   const user = users.find((user) => user.username === username);

//   if (!user) {
//     // User not found
//     res.status(401).json({ error: "Invalid credentials" });
//     return;
//   }

//   if (user.password !== password) {
//     // Passwords do not match
//     res.status(401).json({ error: "Invalid credentials" });
//     return;
//   }
//   // Login successful
//   res.json({ message: "Login successful" });
// });


// Route for user registration
// router.post("/register", async (req, res) => {
	
// 		const { userName, password, email } = req.body;
// 		console.log(req.body)

// 		// Save the user details to the database (implement your logic here)
// 		await db.query(
// 			"INSERT INTO users (name, password, email) VALUES ($1, $2, $3)",
// 			[userName, password, email],(error, result)=>{
// 				if (error) {
// 					res.status(500).json({message:"An error happened"
			
// 				})} else {
// 					console.log(result.rows)
// 					const squery = `select * from users where id=${req.body.id}`
// 					db.query(squery, (serror, sresult)=>{
// 						if (serror){
// 							res.status(500).json({message:"An error happened"})
// 						} else{
// 							const rows = sresult.rows 
// 							console.log(rows)
// 							res.status(201).json({userInfo: rows})
// 						}
// 					}
// 		)}	
// 			})
// });

router.post("/register",  async (req, res) => {
	const { userName, email, password } = req.body;
	
	 // Assuming the user data is sent in the request body

	// Construct the SQL query to insert the user data
	const insertQuery =
		"INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *";
	const insertValues = [userName, email, password];

	// Execute the query to insert the user data and get the inserted record
	 await db.query(insertQuery, insertValues, (insertError, Result) => {
		if (insertError) {
			console.error("Error executing insert query:", insertError);
			res
				.status(500)
				.json({ error: "An error occurred while registering the user." });
		} else {
			const user = Result.rows[0];
			console.log(user);
			console.log("User registered successfully:");

			res.status(200).json({ email: user.email, name: user.name, id: user.id });
		}
	});
});


router.post("/login", async (req, res) => {
	const {  email, password } = req.body;
	console.log(req.body);

	// Assuming the user data is sent in the request body

	// Construct the SQL query to insert the user data
	const insertQuery =
		"SELECT  * FROM users  WHERE email=$1 AND password=$2";
	const insertValues = [ email, password ];

	// Execute the query to insert the user data and get the inserted record
	const selectedResult = await db.query(insertQuery, insertValues)
	
		if (selectedResult.rows.length===1) {
			const user = selectedResult.rows[0]
			res.json ({user})
		} else {
			res.json("Invalid user")
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
