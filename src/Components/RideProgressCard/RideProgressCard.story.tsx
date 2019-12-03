import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import { RideProgressCard } from "../RideProgressCard";

const stories = storiesOf("Ride Progress Card", module);

const origin = {
  time: "08:15",
  day: "10 November",
  city: "Paris, France",
  address: "84, Ave des Champs-Elisey",
};
const destination = {
  time: "16:45",
  day: "02 December",
  city: "Nantes, France",
  address: "Paran 3, 615 A",
};
const progress = 10;

stories.add("Ride Progress Card", () => (
  <RideProgressCard origin={origin} destination={destination} currentProgress={progress} />
));

export default stories;
