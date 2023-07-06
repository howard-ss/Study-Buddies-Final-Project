require("dotenv").config();
const dayjs = require("dayjs");
const express = require("express");
const { google } = require("googleapis");
const { v4: uuid } = require("uuid");
const axios = require("axios");

const privatekey = require("./serviceAccount.json"); // Replace with your service account key JSON file
const calendar = google.calendar({ version: "v3", auth: process.env.API_KEY });

const app = express();
const PORT = process.env.PORT || 3000;
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

// // Set up authentication
// const jwtClient = new google.auth.JWT(
// 	privatekey.client_email,
// 	null,
// 	privatekey.private_key,
// 	["https://www.googleapis.com/auth/calendar"]
// );

// // Authorize the client
// jwtClient.authorize((err, tokens) => {
// 	if (err) {
// 		console.log("Authentication error:", err);
// 		return;
// 	}

// 	// Create a Meet link
// 	const calendar = google.calendar({ version: "v3", auth:process.env.APIKEY });

// 	const event = {
// 		summary: "Google I/O 2015",
// 		location: "800 Howard St., San Francisco, CA 94103",
// 		description: "A chance to hear more about Google's developer products.",
// 		start: {
// 			dateTime: "2023-07-06T09:00:00", // Replace with the start date and time in ISO 8601 format
// 			timeZone: "Europe/London", // Replace with the desired time zone
// 		},
// 		end: {
// 			dateTime: "2023-07-06T17:00:00", // Replace with the end date and time in ISO 8601 format
// 			timeZone: "Europe/London", // Replace with the desired time zone
// 		},
// 		conferenceData: {
// 			createRequest: {
// 				requestId: "random-string", // Provide a unique string here
// 			},
// 		},
// 	};

// 	calendar.events.insert(
// 		{
// 			calendarId: "primary",
// 			resource: event,
// 		},
// 		(err, res) => {
// 			if (err) {
// 				console.log("Error creating event:", err);
// 				return;
// 			}

// 			console.log("API Response:", res.data);
// 			const meetLink =
// 				res.data.hangoutLink ||
// 				(res.data.conferenceData &&
// 					res.data.conferenceData.entryPoints &&
// 					res.data.conferenceData.entryPoints[0].uri);

// 			const eventId = res.data.id;
// 			const videoCallName = eventId.replace(/[@]/g, "-").toLowerCase(); // Replace invalid characters with hyphens and convert to lowercase
// 			const finalMeetLink = `https://meet.google.com/${videoCallName}`;
// 			console.log("Event created:", finalMeetLink);
// 		}
// 	);
// });
