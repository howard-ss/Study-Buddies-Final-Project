import React from "react";
import AvailabilityForm from "./AvailabilityForm";
import MatchingTrainees from "./MatchingTrainees";

const App = () => {
  return (
    <div>
      <h1>Study Buddies</h1>
      <AvailabilityForm />
      <MatchingTrainees />
    </div>
  );
};

export default App;
