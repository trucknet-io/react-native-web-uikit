import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import RideInfo, { PureRideInfo } from "./RideInfo";
import { View, Text } from "react-native";
import Avatar from "src/Components/Avatar";
import { Phone } from "src/Components/Icons";
import { StyleSheet } from "react-native";
import colors from "src/Themes/Colors";

const styles = StyleSheet.create({
  callCustomerContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  avatarContainer: { flexDirection: "row", alignItems: "center" },
  licenseContainer: { lineHeight: 28 },
  border: { borderWidth: 2 },
});

const stories = storiesOf("RideInfo", module).addParameters({ component: PureRideInfo });
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
    content: <Text style={styles.licenseContainer}># SR-045-JD</Text>,
  },
];

const callCustomerProperties = [
  {
    label: "Sender",
    content: (
      <View style={styles.callCustomerContainer}>
        <View style={styles.avatarContainer}>
          <Avatar accessibilityLabel="avatar" name="driver" size="small" />
          <Text>Sam Cooper</Text>
        </View>
        <Phone color={colors.themeColor} />
      </View>
    ),
  },
  {
    label: "Receiver",
    content: (
      <View style={styles.callCustomerContainer}>
        <View style={styles.avatarContainer}>
          <Avatar accessibilityLabel="avatar" name="driver" size="small" />
          <Text>Sam Cooper</Text>
        </View>
        <Phone color={colors.themeColor} />
      </View>
    ),
  },
];

stories.add("Cargo Info Big Card", () => (
  <View style={{ width: 800 }}>
    <RideInfo properties={cargoProperties} />
  </View>
));

stories.add("Cargo Info Medium Card with style", () => (
  <View style={{ width: 360 }}>
    <RideInfo properties={cargoProperties} style={styles.border} />
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

stories.add("Customer Info Card", () => <RideInfo properties={callCustomerProperties} />);

export { stories };
