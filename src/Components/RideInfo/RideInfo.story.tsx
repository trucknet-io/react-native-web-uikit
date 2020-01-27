import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import RideInfo from "./RideInfo";
import { View, Text } from "react-native";
import Avatar from "src/Components/Avatar";

const stories = storiesOf("RideInfo", module);
const cargoProperties = [
  { label: "Cargo type", content: "Containers, Grand Cube 40, Pallete" },
  { label: "Vehicle type", content: "Container Truck" },
  { label: "Size", content: "7 m" },
  { label: "Weight", content: "22kg/m3" },
  { label: "Qiantity", content: "5" },
  { label: "Dangerous", content: "no" },
  { label: "License plate", content: "#SR-045-JD" },
  {
    label: "Notes:",
    content: "Here you can see some notes from customer",
  },
];

const driverProperties = [
  {
    label: "Driver name",
    content: (
      <React.Fragment>
        <Avatar accessibilityLabel="avatar" name="driver" size="small" />
        <Text>Sam Cooper</Text>
      </React.Fragment>
    ),
  },
  {
    label: "License plate",
    content: <Text style={{ lineHeight: 28 }}># SR-045-JD</Text>,
  },
];

stories.add("Cargo Info Big Card", () => (
  <View style={{ width: 800 }}>
    <RideInfo properties={cargoProperties} />
  </View>
));

stories.add("Cargo Info Medium Card with style", () => (
  <View style={{ width: 360 }}>
    <RideInfo properties={cargoProperties} style={{ borderWidth: 2 }} />
  </View>
));

stories.add("Cargo Info Small Card", () => (
  <View style={{ width: 250 }}>
    <RideInfo properties={cargoProperties} />
  </View>
));

stories.add("Driver Info Medium Card", () => (
  <View style={{ width: 360 }}>
    <RideInfo properties={driverProperties} />
  </View>
));

stories.add("Driver Info Small Card", () => (
  <View style={{ width: 200 }}>
    <RideInfo properties={driverProperties} />
  </View>
));

export default stories;
