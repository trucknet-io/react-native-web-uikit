import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import { RideProgressCard } from "../RideProgressCard";

const stories = storiesOf("Ride Progress Card", module);

const origin = {
  startTime: "08:15",
  startDay: "10 November",
  startCity: "Paris, France",
  startAdress: "84, Ave des Champs-Elisey",
};
const destination = {
  endTime: "16:45",
  endDay: "02 December",
  endCity: "Nantes, France",
  endAdress: "Paran 3, 615 A",
};
const progress = 73;
stories.add("Ride Progress Card", () => (
  <RideProgressCard origin={origin} destination={destination} currentProgress={progress} />
));

export default stories;
