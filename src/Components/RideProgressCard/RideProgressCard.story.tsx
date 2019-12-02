import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import { RideProgressCard } from "../RideProgressCard";

const stories = storiesOf("Ride Progress Card", module);

const progress = 80;
const origin = {
  startTime: "08:15",
  startDay: "10 November",
  startCity: "Paris, France",
  startAdress: "84, Ave des Champs-Elisey",
};
const destination = {
  startTime: "16:45",
  startDay: "15 November",
  startCity: "Nantes, France",
  startAdress: "Paran 3, 615 A",
};

stories.add("Ride Progress Card", () => (
  <RideProgressCard origin={origin} destination={destination} progress={progress} />
));

export default stories;
