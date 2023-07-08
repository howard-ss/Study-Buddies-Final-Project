import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment-timezone";
import sendNotification from "../sendNotification";
import "./AvailabilityForm.css"; // Import the CSS file

const AvailabilityForm = () => {
  const [topic, setTopic] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [matchEvent, setMatchEvent] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("user"));
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [userTimeZone, setUserTimeZone] = useState("");
  const [notification, setNotification] = useState("");
  const [matchedTrainees, setMatchedTrainees] = useState([]);

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
      const label = `${formattedHour}:${formattedMinute} - ${hour + 2}:${formattedMinute}`;

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

    try {
      const availabilityData = {
        user_id: userId,
        selected_date: selectedDate
          ? moment(selectedDate).format("YYYY-MM-DD")
          : moment().format("YYYY-MM-DD"),
        selected_time: timeSlot,
        topic,
      };

      const response = await axios.post("http://localhost:3000/api/avail", availabilityData);
      setMatchEvent(response.data.eventData);

      setTopic("");
      setTimeSlot("");
      setSelectedDate(null);
      setSelectedTime(null);
    } catch (error) {
      console.error("Error submitting availability:", error);
    }
  };

  const fetchMatchingTrainees = async (selectedDate, timeSlot, user_id) => {
    try {
      const response = await axios.get("/api/avail", {
        params: {
          user_id: userId,
          availability: selectedDate
            ? moment(selectedDate).format("YYYY-MM-DD")
            : moment().format("YYYY-MM-DD"),
          time: timeSlot,
          topic,
        },
      });

      const data = response.data;
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
          <option value="time">Select Time Slot</option>
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
        <button type="submit">Submit</button>
      </form>

      {notification && <p>{notification}</p>}

      {matchEvent?.length > 0 && (
        <div className="availability-form">
          <h2>Matched Trainees:</h2>
          <h3>We found {matchEvent?.length} trainees who selected this time and topic.</h3>
        </div>
      )}
    </div>
  );
};

export default AvailabilityForm;


