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
  'summary': 'Google I/O 2015',
  'location': '800 Howard St., San Francisco, CA 94103',
  'description': 'A chance to hear more about Google\'s developer products.',
  'start': {
    'dateTime': '2015-05-28T09:00:00-07:00',
    'timeZone': 'America/Los_Angeles',
  },
  'end': {
    'dateTime': '2015-05-28T17:00:00-07:00',
    'timeZone': 'America/Los_Angeles',
  },
};

calendar.events.insert({
  auth: jwtClient,
  calendarId: 'primary',
  resource: event,
}, function(err, event) {
  if (err) {
    console.log('There was an error contacting the Calendar service: ' + err);
    return;
  }
  const eventId = event.data.id;

	const videoCallName = eventId.replace(/[@]/g, "-").toLowerCase(); // Replace invalid characters with hyphens and convert to lowercase
	const meetLink = `https://meet.google.com/${videoCallName}`;
  console.log('Event created: %s', meetLink);

});
});


