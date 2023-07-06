require("dotenv").config();
const dayjs = require("dayjs");
const express = require("express");
const { google } = require("googleapis");
const { v4: uuid } = require("uuid");
const axios = require("axios");

const privatekey = require("./serviceAccount.json"); // Replace with your service account key JSON file
const calendar = google.calendar({ version: "v3", auth: process.env.API_KEY });

const app = express();
const PORT = process.env.NODE_ENV || 8000;
const oauth2Client = new google.auth.OAuth2(
	process.env.CLIENT_ID,
	process.env.CLIENT_SECRET,
	process.env.REDIRECT_URL
);
const scopes = ["https://www.googleapis.com/auth/calendar"];
const token = "";

app.get("/google", (req, res) => {
	const url = oauth2Client.generateAuthUrl({
		access_type: "offline",
		scope: scopes,
	});
	res.redirect(url);
});

app.get("/google/redirect", async (req, res) => {
	const code = req.query.code;

	const { tokens } = await oauth2Client.getToken(code);
	oauth2Client.setCredentials(tokens);

	res.send({
		msg: "You have successfully logged in",
	});
});

app.get("/schedule_event", async (req, res) => {
	await calendar.events.inserts({
		calendarId: "primary",
		auth: oauth2Client,
		conferenceDataVersion: 1,
		requestBody: {
			summary: "This is an important invitation",
			description: "Some important and amazing events",
			start: {
				dateTime: dayjs(new Date()).add(1, "day").add(1, "hour").toISOString(),
				timezone: "Europe/London",
			},
			end: {
				dateTime: dayjs(new Date()).add(1, "day").add(1, "hour").toISOString(),
				timezone: "Europe/London",
			},
			conferenceData: {
				createRequest: {
					request: uuid(),
				},
			},
			attendees: [
				{
					email: "ebrahimbeiaty@gmail.com",
				},
			],
		},
	});
	res.send({
		msg: "Done",
	});
});

app.listen(PORT, () => {
	console.log("server starts on port", PORT);
});
