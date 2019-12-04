import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import { RideProgressCard } from "../RideProgressCard";
import { View } from "react-native";
import Colors from "src/Themes/Colors";
import { object } from "@storybook/addon-knobs/react";

const stories = storiesOf("Ride Progress Card", module);

const defaultProps = [
  {
    time: "08:15",
    day: "10 November",
    city: "Paris, France",
    address: "84, Ave des Champs-Elisey",
  },
  {
    time: "16:45",
    day: "02 December",
    city: "Nantes, France",
    address: "Paran 3, 615 A",
  },
];

stories.add("No container", () => (
  <RideProgressCard origin={defaultProps[0]} destination={defaultProps[1]} currentProgress={10} />
));
stories.add("With container", () => (
  <View style={object("container", { height: 100, width: 300, backgroundColor: Colors.subBackground })}>
    <RideProgressCard origin={defaultProps[0]} destination={defaultProps[1]} currentProgress={70} />
  </View>
));

export default stories;
