import React from "react";
function sendNotification(userId, matchingTrainees) {
	if (matchingTrainees.length > 0) {
		// Match found, display the details of matched trainees
		const traineeDetails = matchingTrainees.map((trainee) => {
			return `Group: ${trainee.group}, Time: ${trainee.selected_time}, Topic: ${trainee.topic}`;
		});

		const notification = `Match found!\n\n${traineeDetails.join("\n")}`;
		alert(notification);
	} else {
		// No match found, display a notification on the screen
		alert("No match found.");
	}
}

export default sendNotification;