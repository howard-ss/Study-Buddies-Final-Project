const { google } = require("googleapis");
const privatekey = require("./serviceAccount.json"); // Replace with your service account key JSON file

// Set up authentication
const jwtClient = new google.auth.JWT(
	privatekey.client_email,
	null,
	privatekey.private_key,
	["https://www.googleapis.com/auth/calendar"]
);

// Authorize the client
jwtClient.authorize((err, tokens) => {
	if (err) {
		console.log("Authentication error:", err);
		return;
	}

	// Create a Meet link
	const calendar = google.calendar({ version: "v3", auth: jwtClient });

	const event = {
		summary: "Google I/O 2015",
		location: "800 Howard St., San Francisco, CA 94103",
		description: "A chance to hear more about Google's developer products.",
		start: {
			dateTime: "2023-07-06T09:00:00", // Replace with the start date and time in ISO 8601 format
			timeZone: "Europe/London", // Replace with the desired time zone
		},
		end: {
			dateTime: "2023-07-06T17:00:00", // Replace with the end date and time in ISO 8601 format
			timeZone: "Europe/London", // Replace with the desired time zone
		},
		conferenceData: {
			createRequest: {
				requestId: "random-string", // Provide a unique string here
			},
		},
	};

	calendar.events.insert(
		{
			calendarId: "primary",
			resource: event,
		},
		(err, res) => {
			if (err) {
				console.log("Error creating event:", err);
				return;
			}

			console.log("API Response:", res.data);
			const meetLink =
				res.data.hangoutLink ||
				(res.data.conferenceData &&
					res.data.conferenceData.entryPoints &&
					res.data.conferenceData.entryPoints[0].uri);

			const eventId = res.data.id;
			const videoCallName = eventId.replace(/[@]/g, "-").toLowerCase(); // Replace invalid characters with hyphens and convert to lowercase
			const finalMeetLink = `https://meet.google.com/${videoCallName}`;
			console.log("Event created:", finalMeetLink);
		}
	);
});
