
import { Router } from "express";
import logger from "./utils/logger";
import db from "./db";

const bcrypt = require('bcrypt');
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
			res.status(200).json({ email: user.email, id: user.id, name: user.name }); // Send the user data in the response
		} else {
			res.status(401).json("Invalid email or password");
		}
	} catch (error) {
		logger.error("Error logging in:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});




router.post("/avail", async (req, res) => {
	try {
	  const { user_id, selected_date, selected_time, topic } = req.body;
	  await db.query(
		"INSERT INTO availability (user_id, selected_date, selected_time, topic) VALUES ($1, $2, $3, $4)",
		[user_id, selected_date, selected_time, topic]
	  );
  
	  const matchingTrainees = await getMatchingTrainees(
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
	selected_date,
	selected_time,
	topic
  ) {
	const selectQuery =
	  "SELECT * FROM availability WHERE  selected_date = $1 AND selected_time = $2 AND topic = $3";
	const result = await db.query(selectQuery, [
	  selected_date,
	  selected_time,
	  topic,
	]);
	const matchingTrainees = result.rows;
	return matchingTrainees;
  }
  

  

export default router;
