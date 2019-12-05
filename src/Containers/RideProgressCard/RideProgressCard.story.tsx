import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import RideProgressCard from "./RideProgressCard";
import { View } from "react-native";
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
  {
    time: "14:20",
    day: "02 December",
    city: "Taumatawhakatangi­hangakoauauotamatea­turipukakapikimaunga­horonukupokaiwhen­uakitanatahu , North Island",
    address: "Llanfair­pwllgwyngyll­gogery­chwyrn­drobwll­llan­tysilio­gogo­goch 666, 13 Y",
  },
  {
    time: "11:11",
    day: "13 May",
    city: "Ibi, Spain",
  },
];

stories.add("No container", () => (
  <RideProgressCard origin={defaultProps[0]} destination={defaultProps[1]} currentProgress={10} />
));
stories.add("With container", () => (
  <View style={object("container", { height: 200, width: 300, borderWidth: 1 })}>
    <RideProgressCard origin={defaultProps[0]} destination={defaultProps[1]} currentProgress={70} />
  </View>
));
stories.add("Long names", () => (
  <RideProgressCard origin={defaultProps[2]} destination={defaultProps[2]} currentProgress={40} />
));
stories.add("Long names with container", () => (
  <View style={object("container", { height: 200, width: 400, borderWidth: 1 })}>
    <RideProgressCard origin={defaultProps[2]} destination={defaultProps[2]} currentProgress={82} />
  </View>
));
stories.add("Minimum props", () => <RideProgressCard origin={defaultProps[3]} destination={defaultProps[3]} />);

export default stories;
