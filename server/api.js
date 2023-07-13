
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
// router.post("/login", async (req, res) => {
// 	try {
// 		const { email, password } = req.body;
// 		const selectQuery =
// 			"SELECT * FROM users WHERE email = $1 AND password = $2";
// 		const result = await db.query(selectQuery, [email, password]);
// 		const user = result.rows[0];
// 		if (user) {
// 			res.status(200).json({ user }); // Send the user data in the response
// 		} else {
// 			res.status(401).json("Invalid email or password");
// 		}
// 	} catch (error) {
// 		logger.error("Error logging in:", error);
// 		res.status(500).json({ error: "Internal server error" });
// 	}
// });

router.post("/login", async (req, res) => {
	try {
	  const { email, password } = req.body;
	  const selectQuery = "SELECT * FROM users WHERE email = $1";
	  const result = await db.query(selectQuery, [email]);
	  const user = result.rows[0];
  
	  if (user) {
		// Compare the provided password with the hashed password stored in the database
		const isPasswordValid = await bcrypt.compare(password, user.password);
  
		if (isPasswordValid) {
		  res.status(200).json({ user });
		} else {
		  res.status(401).json("Invalid email or password");
		}
	  } else {
		res.status(401).json("Invalid email or password");
	  }
	} catch (error) {
	  console.error("Error logging in:", error);
	  res.status(500).json({ error: "Internal server error" });
	}
  });
  


// Route for user availability
// router.post("/avail", async (req, res) => {
// 	try {
// 		const { user_id, selected_date, selected_time, topic } = req.body;
// 		await db.query(
// 			"INSERT INTO availability (user_id, selected_date, selected_time, topic) VALUES ($1, $2, $3, $4)",
// 			[user_id, selected_date, selected_time, topic]
// 		);

// 		const matchingTrainees = await getMatchingTrainees(
// 			user_id,
// 			selected_date,
// 			selected_time,
// 			topic
// 		);

// 		if (matchingTrainees.length > 3) {
// 			res.status(201).json({
// 				message: "Match found!",
// 				eventData: matchingTrainees,
// 			});
// 		} else {
// 			res.status(200).json({ message: "No match found." });
// 		}
// 	} catch (error) {
// 		logger.error("Error submitting availability:", error);
// 		res.status(500).json({ error: "Internal server error" });
// 	}
// });

// async function getMatchingTrainees(
// 	user_id,
// 	selected_date,
// 	selected_time,
// 	topic
// ) {
// 	const selectQuery =
// 		"SELECT * FROM availability WHERE user_id = $1 AND selected_date = $2 AND selected_time = $3 AND topic = $4";
// 	const result = await db.query(selectQuery, [
// 		user_id,
// 		selected_date,
// 		selected_time,
// 		topic,
// 	]);
// 	const matchingTrainees = result.rows;
// 	return matchingTrainees;
// }

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
  
	  if (matchingTrainees.length > 0) {
		res.status(201).json({
		  message: "Match found!",
		  eventData: matchingTrainees,
		});
	  } else {
		res.status(200).json({ message: "No match found." });
	  }
	} catch (error) {
	  console.error("Error submitting availability:", error);
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
  

  

export default router;
