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

app.post("/api/matching_trainees/availability", async (req, res) => {
	try {
		const { topic, timeSlot, selectedDate, selectedTime } = req.body;

		// Insert the availability data into the database
		await pool.query(
			`INSERT INTO availability (topic, time_slot, selected_date, selected_time) 
       VALUES ($1, $2, $3, $4)`,
			[topic, timeSlot, selectedDate, selectedTime]
		);

		res.status(200).json({ message: "Availability submitted successfully." });
	} catch (error) {
		console.error("Error submitting availability:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

app.get("/api/matching_trainees/availability", async (req, res) => {
	try {
		// Fetch the matched trainees from the database
		const queryResult = await pool.query("SELECT * FROM matching_trainees");
		const matchedTrainees = queryResult.rows;

		res.status(200).json(matchedTrainees);
	} catch (error) {
		console.error("Error fetching matched trainees:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

app.listen(config.port, () => {
	console.log(`Server is running on port ${config.port}`);
});
