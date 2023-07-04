import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AvailabilityForm = () => {
	const [topic, setTopic] = useState("");
	const [timeSlot, setTimeSlot] = useState("");
	const [selectedDate, setSelectedDate] = useState(null);
	const [selectedTime, setSelectedTime] = useState(null);

	const generateTimeSlots = () => {
		const timeSlots = [];
		let hour = 10;
		let minute = 0;

		while (hour <= 18) {
			const formattedHour = hour.toString().padStart(2, "0");
			const formattedMinute = minute.toString().padStart(2, "0");
			const time = `${formattedHour}:${formattedMinute}`;
			const label = `${formattedHour}:${formattedMinute} - ${
				hour + 2
			}:${formattedMinute}`;

			timeSlots.push(
				<option key={time} value={time}>
					{label}
				</option>
			);

			hour += 2;
		}

		return timeSlots;
	};

	const handleAvailabilitySubmit = async (e) => {
		e.preventDefault(); // Prevent the default form submission behavior

		try {
			const availabilityData = {
				user_id: 2,
				selected_date: selectedDate,
				selected_time: selectedTime
					? selectedTime.toLocaleTimeString([], {
							hour: "2-digit",
							minute: "2-digit",
							hour12: false,
					  })
					: new Date().toLocaleTimeString([], {
							hour: "2-digit",
							minute: "2-digit",
							hour12: false,
					  }),
				topic,
			};

			await axios.post(
				"http://localhost:3000/api/avail",
				availabilityData
			);

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
			<form onSubmit={handleAvailabilitySubmit}>
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
					<option value="SQL">SQL</option>
					<option value="PM">PM</option>
					<option value="PHP">PHP</option>
					{/* Add more options for other programming topics */}
				</select>

				<h2>Select Time Slot</h2>
				<select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)}>
					<option value="">Select Time Slot</option>
					{generateTimeSlots()}
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
				<button type="submit" onClick={handleAvailabilitySubmit}>Submit</button>
			</form>
		</div>
	);
};

export default AvailabilityForm;
