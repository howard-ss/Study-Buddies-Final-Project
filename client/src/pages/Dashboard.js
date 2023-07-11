import React from "react";

const Dashboard = () => {
//   const availability = [
//     { date: "2023-07-15", time: "1-3pm" },
//     { date: "2023-07-17", time: "4-6pm" },
//   ];

//   const matchedTrainees = [
//     { date: "2023-07-17", time: "4-6pm", trainee: "Laxmi" },
//   ];
const [availability, setAvailability] = useState([]);

  useEffect(() => {
    // Fetch availability data from API
    const fetchAvailability = async () => {
      try {
        const response = await axios.get("http://example.com/api/availability");
        setAvailability(response.data);
      } catch (error) {
        console.error("Error fetching availability:", error);
      }
    };

    fetchAvailability();
  }, []);

  return (
    <div>
      <h2>Welcome to the Dashboard!</h2>
      <h3>Dora AI Saadi</h3>
      <h4>Dates Available:</h4>
      <ul>
        {availability.map((item, index) => (
          <li key={index}>
            Date: {item.date}, Time: {item.time}
          </li>
        ))}
      </ul>

      <h4>Matched Trainees:</h4>
      <ul>
        {matchedTrainees.map((item, index) => (
          <li key={index}>
            Date: {item.date}, Time: {item.time}, Trainee: {item.trainee}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
