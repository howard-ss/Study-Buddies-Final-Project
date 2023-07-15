import axios from 'axios';
import moment from 'moment-timezone';
import React, { useEffect, useState } from 'react'
import "./Dashboard.css";


function Dashboard() {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail"));
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [userBookings, setUserBookings] = useState("");
  const [matchingData, setMatchingData] = useState("");
  
  
  async function getUserBooking() {
    const response = await axios.post('/api/booking', { userId: userId })
    console.log(response.data.eventData)
    setUserBookings(response.data.eventData)
  }
  async function getMatchingData(date,time,topic) {
    const response = await axios.post('/api/matching', {selected_date: date, selected_time: time, topic: topic })
    console.log(response.data.eventData)
    setMatchingData(response.data.matchingData)
  }
 useEffect(() => {
  getUserBooking()
 },[])
  return (
    <div className="dashboard-container">
      <h3 className="dashboard-header">Welcome {userName}!</h3>
      <div className="dashboard-info">
        <h4>Your email is {userEmail}</h4>
        <h4>Your ID is {userId}</h4>
      </div>
      {userBookings && userBookings.map(booking => (
        <div className="dashboard-booking" key={booking.id}>
          <div className="dashboard-booking-topic">{booking.topic}</div>
          <div className="dashboard-booking-details">
            <span className="dashboard-booking-date">Date: {moment(booking.selected_date).format("YYYY-MM-DD")}</span>
            <span className="dashboard-booking-time">Time: {booking.selected_time}</span>
          </div>
          <div className="dashboard-booking-id">Booking ID: {booking.id}</div>
        </div>
      ))}
    </div>
  )
}
export default Dashboard;