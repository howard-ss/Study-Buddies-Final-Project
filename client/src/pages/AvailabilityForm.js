import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment-timezone";
import sendNotification from "../sendNotification";
import "./AvailabilityForm.css";
import mainImage from "../public/study.jpg";
import { useNavigate } from "react-router-dom"; // Import navigate
import Header from "../components/Header";
const AvailabilityForm = () => {
	const [topic, setTopic] = useState("");
	const [timeSlot, setTimeSlot] = useState("");
	const [matchEvent, setMatchEvent] = useState([]);
	const [userId, setUserId] = useState(localStorage.getItem("userId"));
	const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail"));
	const [userName, setUserName] = useState(
		localStorage.getItem("userFirstName")
	);
	const [selectedDate, setSelectedDate] = useState(null);
	const [selectedTime, setSelectedTime] = useState(null);
	const [userTimeZone, setUserTimeZone] = useState("");
	const [notification, setNotification] = useState("");
	const [matchedTrainees, setMatchedTrainees] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		const detectUserTimeZone = () => {
			const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
			setUserTimeZone(timeZone);
		};
		detectUserTimeZone();
	}, []);
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
		e.preventDefault();
		if (!timeSlot) {
			console.error("Invalid time slot");
			return;
		}
		try {
			const availabilityData = {
				user_id: userId,
				selected_date: selectedDate
					? moment(selectedDate).format("YYYY-MM-DD")
					: moment().format("YYYY-MM-DD"),
				selected_time: timeSlot,
				topic,
			};
			const response = await axios.post("/api/avail", availabilityData);
			setMatchEvent(response.data.eventData);
			console.log(response.data);
			setTopic("");
			setTimeSlot("");
			setSelectedDate(null);
			setSelectedTime(null);
			// Redirect to the dashboard
			// navigate("/dashboard");
		} catch (error) {
			console.error("Error submitting availability:", error);
		}
	};
	const fetchMatchingTrainees = async (selectedDate, timeSlot, userId) => {
		try {
			const response = await axios.get("/api/matching-trainees", {
				params: {
					user_id: userId,
					availability: selectedDate
						? moment(selectedDate).format("YYYY-MM-DD")
						: moment().format("YYYY-MM-DD"),
					selected_time: timeSlot,
					topic,
				},
			});
			const data = response.data;
			console.log(data);
			setMatchedTrainees(data.matchingTrainees);
			if (data.matchingTrainees.length > 0) {
				setNotification("Match found!");
			} else {
				setNotification("No match found.");
			}
		} catch (error) {
			console.error("Error fetching matched trainees:", error);
		}
	};
	return (
		<div className="availability-form">
			<Header />
			<div className="image-container">
				<img src={mainImage} alt="Study" />
			</div>
			<div className="form-container">
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
					<select
						value={timeSlot}
						onChange={(e) => setTimeSlot(e.target.value)}
					>
						<option value="time">Select Time Slot</option>
						{generateTimeSlots()}
					</select>
					<button type="submit">Submit</button>
				</form>
				{notification && <p>{notification}</p>}
				{matchEvent?.length > 0 ? (
					<div className="matched-trainees-container">
						<h2>Matched Trainees:</h2>
						<h3>
							We found {matchEvent?.length} trainees who selected this time and
							topic.Please check your <a href="/dashboard">Dashboard</a>
						</h3>
					</div>
				) : (
					<div className="matched-trainees-container">
						<h2>Matched Trainees:</h2>
						<h3>
							We could not find any trainees. Please check your{" "}
							<a href="/dashboard">Dashboard</a>
						</h3>
					</div>
				)}
			</div>
		</div>
	);
};
export default AvailabilityForm;
