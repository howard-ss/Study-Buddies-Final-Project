
import { Router } from "express";
import logger from "./utils/logger";
import db from "./db";

const bcrypt = require('bcrypt');
const router = Router();

const express = require ('express');
// const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const app = express();
app.use(express.json());
// app.use(cors());
// const PORT = 8000;

// Do NOT deploy this API key or upload onto GitHub
const API_KEY = process.env.GPT_API_KEY;      // need GPT-4 API key token

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

// Route for GPT
router.post('/completions', async(req, res)=>{
    const options = {
         method: "POST",
         headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
            // "Content-Type": "application/x-www-form-urlencoded",
         },
         body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: req.body.message}],
            max_tokens: 100, 
         })

    }

    try {
       const response = await fetch ('https://api.openai.com/v1/chat/completions', options) 
       const data = await response.json()
       res.send(data)
    }catch(error) {
        console.error(error)
    }
} )
// app.listen(PORT, () => console.log('server is running on PORT ' + PORT));

//Route for availability
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
  
  // Route for booking slot
  router.post("/booking", async (req, res) => {
    const {userId} = req.body;
    console.log(userId)
    const selectQuery = "SELECT * FROM availability WHERE user_id = $1";
    const result = await db.query(selectQuery, [userId]);
    const userBooking = result.rows;
    console.log(userBooking);
    res.status(200).json({
        message: "Booking found!",
        eventData: userBooking,
    })
  })
  

export default router;
