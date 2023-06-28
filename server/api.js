import { Router } from "express";
import logger from "./utils/logger";

const router = Router();

router.get("/", (_, res) => {
  logger.debug("Welcoming everyone...");
  res.json({ message: "Hello, world!" });
});

// //mock users data
// const users = [
//   { id: 1, username: "admin", password: "password" },
//   // Add more user objects as needed
// ];


// // Login route
// router.post("/login", (req, res) => {
//   const { username, password } = req.body;

//   // Find the user with the matching username
//   const user = users.find((user) => user.username === username);

//   if (!user) {
//     // User not found
//     res.status(401).json({ error: "Invalid credentials" });
//     return;
//   }

//   if (user.password !== password) {
//     // Passwords do not match
//     res.status(401).json({ error: "Invalid credentials" });
//     return;
//   }
//   // Login successful
//   res.json({ message: "Login successful" });
// });

// Define the route for retrieving matching trainees based on availability and topics of interest
router.get("/matching-trainees", (req, res) => {
  try {
    // Retrieve the availability and topics of interest from the request query parameters
    const availability = req.query.availability;
    const topicsOfInterest = req.query.topicsOfInterest;

    // Perform the necessary logic to fetch the matching trainees based on availability and topics of interest
    const matchingTrainees = getMatchingTrainees(availability, topicsOfInterest);

    // Return the matching trainees as the response
    res.json({ matchingTrainees });
  } catch (error) {
    logger.error("Error retrieving matching trainees:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Function to retrieve matching trainees based on availability and topics of interest
function getMatchingTrainees(availability, topicsOfInterest) {
  // Implement the logic to fetch the matching trainees
  // Return an array of matching trainees

  // Example implementation:
  const matchingTrainees = trainees.filter((trainee) => {
    const hasMatchingAvailability = trainee.availability.includes(availability);
    const hasMatchingTopic = trainee.topicsOfInterest.includes(topicsOfInterest);
    return hasMatchingAvailability && hasMatchingTopic;
  });

  return matchingTrainees;
}

// Sample trainees data
const trainees = [
  {
    name: "John",
    availability: ["Monday", "Tuesday"],
    topicsOfInterest: ["JavaScript", "Python"],
  },
  {
    name: "Alice",
    availability: ["Tuesday", "Wednesday"],
    topicsOfInterest: ["Java", "Ruby"],
  },
  // Add more trainee objects as needed
];

export default router;
