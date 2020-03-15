import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import RideInfo, { PureRideInfo } from "./RideInfo";
import RideProperty from "./Components/RideProperty";
import { DriverComponent, CallDriverComponent } from "./Components/RideProperty.story";
import { ViewStyle } from "react-native";
import { StyleSheet } from "react-native";
import ThemedText from "src/Components/ThemedText";

const stories = storiesOf("Ride|RideInfo", module).addParameters({ component: PureRideInfo });

const RideCard = (props: { style?: ViewStyle }) => (
  <RideInfo {...props}>
    <RideProperty label="Cargo type">
      <ThemedText>Containers, Grand Cube 40, Pallete</ThemedText>
    </RideProperty>
    <RideProperty label="Vehicle type">
      <ThemedText>Container Truck</ThemedText>
    </RideProperty>
    <RideProperty label="Size">
      <ThemedText>7 m</ThemedText>
    </RideProperty>
    <RideProperty label="Weight">
      <ThemedText>22kg/m3</ThemedText>
    </RideProperty>
    <RideProperty label="Quantity">
      <ThemedText>5</ThemedText>
    </RideProperty>
    <RideProperty label="Dangerous">
      <ThemedText>no</ThemedText>
    </RideProperty>
    <RideProperty label="License plate">
      <ThemedText>#SR-045-JD</ThemedText>
    </RideProperty>
    <RideProperty label="Notes:">
      <ThemedText>Here you can see some notes from customer</ThemedText>
    </RideProperty>
  </RideInfo>
);

stories.add("Cargo Info", () => <RideCard />);

stories.add("Cargo Info Card with width", () => <RideCard style={styles.rideContainer} />);

stories.add("Driver Info Card", () => (
  <RideInfo>
    <RideProperty label="Sender">
      <DriverComponent />
    </RideProperty>
    <RideProperty label="Receiver">
      <DriverComponent />
    </RideProperty>
  </RideInfo>
));

stories.add("Driver Info Card with call button", () => (
  <RideInfo>
    <RideProperty label="Sender">
      <CallDriverComponent />
    </RideProperty>
    <RideProperty label="Receiver">
      <CallDriverComponent />
    </RideProperty>
  </RideInfo>
));

const styles = StyleSheet.create({
  rideContainer: { width: 360 },
});

export { stories };
