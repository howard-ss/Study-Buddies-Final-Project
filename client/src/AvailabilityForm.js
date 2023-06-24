import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AvailabilityForm = () => {
	const [topic, setTopic] = useState("");
	const [timeSlot, setTimeSlot] = useState("");
	const [selectedDate, setSelectedDate] = useState(null);
	const [selectedTime, setSelectedTime] = useState(null);

	const handleAvailabilitySubmit = async () => {
		try {
			// Make an API call to submit trainee's availability, topic, and time slot
			// Send the topic, selectedDate, and selectedTime data to the server

			// Clear the input fields after submitting
			setTopic("");
			setTimeSlot("");
			setSelectedDate(null);
			setSelectedTime(null);
		} catch (error) {
			console.error("Error submitting availability:", error);
		}
	};

	return (
		<div>
			<h2>Enter Your Availability</h2>
			<DatePicker
				selected={selectedDate}
				onChange={(date) => setSelectedDate(date)}
				placeholderText="Select Date"
			/>
			<h2>Select Programming Topic</h2>
			<select value={topic} onChange={(e) => setTopic(e.target.value)}>
				<option value="">Select Topic</option>
				<option value="JavaScript">JavaScript</option>
				<option value="Python">Python</option>
				<option value="Java">Java</option>
				<option value="Java">Sql</option>
				{/* Add more options for other programming topics */}
			</select>
			<h2>Select Time Slot</h2>
			<select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)}>
				<option value="">Select Time Slot</option>
				<option value="Morning">Morning</option>
				<option value="Afternoon">Afternoon</option>
				<option value="Evening">Evening</option>
				{/* Add more options for other time slots */}
			</select>
			<DatePicker
				selected={selectedTime}
				onChange={(time) => setSelectedTime(time)}
				showTimeSelect
				showTimeSelectOnly
				timeIntervals={15}
				timeCaption="Time"
				dateFormat="h:mm aa"
				placeholderText="Select Time"
			/>
			<button onClick={handleAvailabilitySubmit}>Submit</button>
		</div>
	);
};

export default AvailabilityForm;
