import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import RideInfo, { PureRideInfo } from "./RideInfo";
import RideProperty from "./Components/RideProperty";
import { DriverComponent, CallDriverComponent } from "./Components/RideProperty.story";
import { ViewStyle } from "react-native";
import { StyleSheet } from "react-native";

const stories = storiesOf("Ride|RideInfo", module).addParameters({ component: PureRideInfo });

const RideCard = (props: { style?: ViewStyle }) => (
  <RideInfo {...props}>
    <RideProperty label="Cargo type">Containers, Grand Cube 40, Pallete</RideProperty>
    <RideProperty label="Vehicle type">Container Truck</RideProperty>
    <RideProperty label="Size">7 m</RideProperty>
    <RideProperty label="Weight">22kg/m3</RideProperty>
    <RideProperty label="Quantity">5</RideProperty>
    <RideProperty label="Dangerous">no</RideProperty>
    <RideProperty label="License plate">#SR-045-JD</RideProperty>
    <RideProperty label="Notes:">Here you can see some notes from customer</RideProperty>
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
